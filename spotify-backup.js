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
  
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=refresh_token&refresh_token=' + REFRESH_TOKEN,
    });

    if (!response.ok) {
      throw new Error(`Failed to get access token: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error.message);
    process.exit(1);
  }
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
    
    console.log('\n✓ Backup complete!');
  } catch (error) {
    console.error('Fatal error:', error.message);
    process.exit(1);
  }
}

main();
