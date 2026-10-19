#!/usr/bin/env node

/**
 * Spotify album colors
 * Computes the dominant color of each saved album's artwork (used as a placeholder
 * while covers load on /lab/spotify-albums/). Spotify's API doesn't provide colors,
 * so the smallest cover image is downloaded and analyzed with sharp. Results are
 * cached in content/data/spotify-album-colors.json, so only new albums are processed.
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ALBUMS_FILE = path.join(__dirname, 'content', 'data', 'spotify-albums.json');
const COLORS_FILE = path.join(__dirname, 'content', 'data', 'spotify-album-colors.json');
const CONCURRENCY = 8;

const toHex = ({ r, g, b }) => `#${[r, g, b].map((value) => value.toString(16).padStart(2, '0')).join('')}`;

async function getDominantColor(imageUrl) {
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  const { dominant } = await sharp(Buffer.from(await response.arrayBuffer())).stats();
  return toHex(dominant);
}

async function main() {
  const { albums } = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));
  const previous = fs.existsSync(COLORS_FILE) ? JSON.parse(fs.readFileSync(COLORS_FILE, 'utf8')) : {};

  const colors = {};
  const missing = [];
  for (const { album } of albums) {
    if (previous[album.id]) {
      colors[album.id] = previous[album.id];
    } else {
      const smallest = [...(album.images || [])].sort((a, b) => a.width - b.width)[0];
      if (smallest) missing.push({ id: album.id, url: smallest.url });
    }
  }

  console.log(`Computing colors for ${missing.length} new albums...`);
  let failures = 0;
  const queue = [...missing];
  await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length) {
      const { id, url } = queue.shift();
      try {
        colors[id] = await getDominantColor(url);
      } catch (error) {
        failures++;
        console.warn(`Could not compute the color of album ${id}: ${error.message}`);
      }
    }
  }));

  const sorted = Object.fromEntries(Object.entries(colors).sort(([a], [b]) => a.localeCompare(b)));
  fs.writeFileSync(COLORS_FILE, `${JSON.stringify(sorted, null, 2)}\n`);
  console.log(`✓ Saved ${Object.keys(sorted).length} album colors to ${COLORS_FILE}`);
  if (failures) console.warn(`  ${failures} albums failed and will be retried next time.`);
}

main().catch((error) => {
  console.error('Fatal error:', error.message);
  process.exit(1);
});
