#!/usr/bin/env node

/**
 * Spotify Albums Backup Script
 * Fetches your saved albums from Spotify and saves them as JSON
 */

const fs = require('fs');
const path = require('path');

require('dotenv').config();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

// JSON file paths
const ALBUMS_FILE = path.join(__dirname, 'content', 'data', 'spotify-albums.json');
const PLAYLISTS_FILE = path.join(__dirname, 'content', 'data', 'spotify-playlists.json');
const TOP_FILE = path.join(__dirname, 'content', 'data', 'spotify-top.json');

// Spotify's time ranges for top items: ~4 weeks, ~6 months, and ~1 year.
const TOP_TIME_RANGES = ['short_term', 'medium_term', 'long_term'];
const TOP_LIMIT = 50;

if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
  console.error('Missing required environment variables:');
  console.error('- SPOTIFY_CLIENT_ID');
  console.error('- SPOTIFY_CLIENT_SECRET');
  console.error('- SPOTIFY_REFRESH_TOKEN');
  console.error('\nSee README-SPOTIFY.md for setup instructions.');
  process.exit(1);
}

/**
 * Get a new access token using the refresh token
 */
async function getAccessToken() {
  const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN,
    }),
  });

  if (!response.ok) {
    let message = `Failed to get access token: ${response.status} ${response.statusText}`;
    let data;
    try {
      data = JSON.parse(await response.text());
    } catch (error) {
      if (!(error instanceof SyntaxError)) {
        throw error;
      }
    }

    // Only log known OAuth error codes, never raw responses or credentials.
    const oauthErrors = [
      'invalid_request', 'invalid_client', 'invalid_grant',
      'unauthorized_client', 'unsupported_grant_type', 'invalid_scope',
    ];
    if (oauthErrors.includes(data?.error)) {
      message += ` (${data.error})`;
    }
    if (data?.error === 'invalid_grant') {
      message += '. The refresh token is expired, revoked, or invalid. Reauthorize the Spotify app and replace the SPOTIFY_REFRESH_TOKEN GitHub Actions secret. See README-SPOTIFY.md.';
    } else if (data?.error === 'invalid_client') {
      message += '. Check that SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET match the Spotify app that issued the refresh token.';
    }
    throw new Error(message);
  }

  const data = await response.json();
  if (typeof data?.access_token !== 'string' || !data.access_token) {
    throw new Error('Spotify token response did not contain an access token.');
  }
  return data.access_token;
}

/**
 * Fetch all albums (handles pagination)
 */
async function fetchAllAlbums(accessToken) {
  const albums = [];
  let offset = 0;
  const limit = 50; // Max allowed by Spotify API

  console.log('Fetching albums from Spotify...');

  while (true) {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/me/albums?limit=${limit}&offset=${offset}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch albums: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Extract album info (with added_at timestamp)
      albums.push(...data.items.map(item => ({
        added_at: item.added_at,
        album: {
          id: item.album.id,
          name: item.album.name,
          artists: item.album.artists.map(a => ({
            id: a.id,
            name: a.name,
          })),
          release_date: item.album.release_date,
          total_tracks: item.album.total_tracks,
          external_urls: item.album.external_urls,
          href: item.album.href,
          images: item.album.images,
          uri: item.album.uri,
        },
      })));

      console.log(`Downloaded ${albums.length} albums so far...`);

      // Check if there are more pages
      if (!data.next) {
        break;
      }

      offset += limit;
    } catch (error) {
      console.error('Error fetching albums:', error.message);
      process.exit(1);
    }
  }

  return albums;
}

/**
 * Fetch all playlists (handles pagination)
 */
async function fetchAllPlaylists(accessToken) {
  const playlists = [];
  let offset = 0;
  const limit = 50; // Max allowed by Spotify API

  console.log('Fetching playlists from Spotify...');

  while (true) {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch playlists: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Extract playlist info
      playlists.push(...data.items.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        public: item.public,
        collaborative: item.collaborative,
        owner: {
          id: item.owner.id,
          display_name: item.owner.display_name,
          external_urls: item.owner.external_urls,
        },
        tracks: {
          total: item.tracks.total,
          href: item.tracks.href,
        },
        external_urls: item.external_urls,
        href: item.href,
        images: item.images,
        uri: item.uri,
      })));

      console.log(`Downloaded ${playlists.length} playlists so far...`);

      // Check if there are more pages
      if (!data.next) {
        break;
      }

      offset += limit;
    } catch (error) {
      console.error('Error fetching playlists:', error.message);
      process.exit(1);
    }
  }

  return playlists;
}

/**
 * Fetch the user's top artists and tracks for every time range.
 * Returns null (and keeps the previous backup) if they can't be fetched, for
 * example when the refresh token lacks the user-top-read scope.
 */
async function fetchTopItems(accessToken) {
  console.log('Fetching top artists and tracks from Spotify...');
  const top = {};

  for (const timeRange of TOP_TIME_RANGES) {
    top[timeRange] = {};
    for (const type of ['artists', 'tracks']) {
      const items = [];
      // Only fetch the first page. Following `next` pages through the whole listening
      // history (thousands of items), which isn't a "top" list anymore.
      const url = `https://api.spotify.com/v1/me/top/${type}?time_range=${timeRange}&limit=${TOP_LIMIT}`;

      {
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          let message = `Skipping top items: failed to fetch top ${type}: ${response.status} ${response.statusText}`;
          if (response.status === 401 || response.status === 403) {
            message += '. Reauthorize the Spotify app with the user-top-read scope. See README-SPOTIFY.md.';
          }
          console.warn(message);
          return null;
        }

        const data = await response.json();
        items.push(...data.items.map(item => type === 'artists'
          ? { id: item.id, name: item.name }
          : {
            id: item.id,
            name: item.name,
            album: { id: item.album?.id, name: item.album?.name },
            artists: item.artists.map(a => ({ id: a.id, name: a.name })),
          }));
      }

      top[timeRange][type] = items;
      console.log(`Downloaded ${items.length} top ${type} (${timeRange})`);
    }
  }

  return top;
}

/**
 * Save albums backup to JSON file
 */
function saveAlbumsBackup(albums) {
  const dataDir = path.dirname(ALBUMS_FILE);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const backup = {
    created_at: new Date().toISOString(),
    total_albums: albums.length,
    albums: albums,
  };

  fs.writeFileSync(ALBUMS_FILE, JSON.stringify(backup, null, 2));
  console.log(`✓ Album backup saved to ${ALBUMS_FILE}`);
  console.log(`  Total albums: ${albums.length}`);
}

/**
 * Save playlists backup to JSON file
 */
function savePlaylistsBackup(playlists) {
  const dataDir = path.dirname(PLAYLISTS_FILE);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const backup = {
    created_at: new Date().toISOString(),
    total_playlists: playlists.length,
    playlists: playlists,
  };

  fs.writeFileSync(PLAYLISTS_FILE, JSON.stringify(backup, null, 2));
  console.log(`✓ Playlist backup saved to ${PLAYLISTS_FILE}`);
  console.log(`  Total playlists: ${playlists.length}`);
}

/**
 * Save top artists and tracks to JSON file
 */
function saveTopBackup(top) {
  const backup = {
    created_at: new Date().toISOString(),
    ...top,
  };

  fs.writeFileSync(TOP_FILE, JSON.stringify(backup, null, 2));
  console.log(`✓ Top artists and tracks saved to ${TOP_FILE}`);
}

/**
 * Main function
 */
async function main() {
  try {
    console.log('Starting Spotify backup...\n');
    
    const accessToken = await getAccessToken();
    
    const albums = await fetchAllAlbums(accessToken);
    saveAlbumsBackup(albums);
    
    console.log();
    
    const playlists = await fetchAllPlaylists(accessToken);
    savePlaylistsBackup(playlists);

    console.log();

    const top = await fetchTopItems(accessToken);
    if (top) {
      saveTopBackup(top);
    }
    
    console.log('\n✓ Backup complete!');
  } catch (error) {
    console.error('Fatal error:', error.message);
    process.exit(1);
  }
}

main();
