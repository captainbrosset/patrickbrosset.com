#!/usr/bin/env node

/**
 * Gets a new Spotify refresh token with the Authorization Code flow.
 * Reads SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET from .env, writes the new
 * SPOTIFY_REFRESH_TOKEN back to .env, and copies it to the clipboard so it can be
 * pasted into the GitHub Actions secret. See README-SPOTIFY.md.
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const crypto = require('crypto');
const { execFileSync, spawn } = require('child_process');

require('dotenv').config();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const PORT = 8888;
// Spotify requires loopback redirect URIs to use 127.0.0.1, not localhost.
const REDIRECT_URI = `http://127.0.0.1:${PORT}/callback`;
const SCOPES = ['user-library-read', 'playlist-read-private', 'playlist-read-collaborative', 'user-top-read'];
const ENV_FILE = path.join(__dirname, '.env');

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env first.');
  process.exit(1);
}

const state = crypto.randomBytes(16).toString('hex');
const authorizeUrl = 'https://accounts.spotify.com/authorize?' + new URLSearchParams({
  response_type: 'code',
  client_id: CLIENT_ID,
  scope: SCOPES.join(' '),
  redirect_uri: REDIRECT_URI,
  state,
  show_dialog: 'true',
});

async function exchangeCode(code) {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
    },
    body: new URLSearchParams({ grant_type: 'authorization_code', code, redirect_uri: REDIRECT_URI }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.refresh_token) {
    throw new Error(`Token exchange failed (HTTP ${response.status}${data.error ? `, ${data.error}` : ''}).`);
  }
  const missing = SCOPES.filter((scope) => !data.scope?.split(' ').includes(scope));
  if (missing.length) console.warn(`Warning: the token is missing these scopes: ${missing.join(', ')}`);
  return data.refresh_token;
}

function saveToEnv(token) {
  const line = `SPOTIFY_REFRESH_TOKEN=${token}`;
  const content = fs.existsSync(ENV_FILE) ? fs.readFileSync(ENV_FILE, 'utf8') : '';
  const updated = /^SPOTIFY_REFRESH_TOKEN=.*$/m.test(content)
    ? content.replace(/^SPOTIFY_REFRESH_TOKEN=.*$/m, line)
    : `${content.trimEnd()}\n${line}\n`;
  fs.writeFileSync(ENV_FILE, updated);
}

function copyToClipboard(text) {
  const command = { win32: ['clip'], darwin: ['pbcopy'] }[process.platform] ?? ['xclip', '-selection', 'clipboard'];
  try {
    execFileSync(command[0], command.slice(1), { input: text });
    return true;
  } catch {
    return false;
  }
}

function openBrowser(url) {
  const [command, args] = {
    win32: ['cmd', ['/c', 'start', '""', url.replaceAll('&', '^&')]],
    darwin: ['open', [url]],
  }[process.platform] ?? ['xdg-open', [url]];
  spawn(command, args, { stdio: 'ignore', detached: true }).on('error', () => {}).unref();
}

function respond(res, status, message) {
  res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end(message);
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT_URI);
  if (url.pathname !== '/callback') return respond(res, 404, 'Not found');

  try {
    if (url.searchParams.get('state') !== state) throw new Error('State mismatch, ignoring this request.');
    if (url.searchParams.get('error')) throw new Error(`Authorization denied: ${url.searchParams.get('error')}`);

    const token = await exchangeCode(url.searchParams.get('code'));
    saveToEnv(token);
    const copied = copyToClipboard(token);

    respond(res, 200, 'Done! You can close this tab and go back to the terminal.');
    console.log('\nNew refresh token saved to .env.');
    if (copied) {
      console.log('It was also copied to your clipboard.');
    } else {
      console.log(`Copy it from .env (SPOTIFY_REFRESH_TOKEN).`);
    }
    console.log('Next: paste it into the SPOTIFY_REFRESH_TOKEN secret at');
    console.log('https://github.com/captainbrosset/patrickbrosset.com/settings/secrets/actions');
    server.close();
  } catch (error) {
    respond(res, 400, error.message);
    console.error(error.message);
    if (!error.message.startsWith('State mismatch')) server.close();
  }
});

server.on('error', (error) => {
  console.error(`Could not start the local server on port ${PORT}: ${error.message}`);
  process.exit(1);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Make sure ${REDIRECT_URI} is listed under Redirect URIs in your app settings:`);
  console.log('https://developer.spotify.com/dashboard\n');
  console.log('Opening Spotify in your browser. If it does not open, visit:');
  console.log(authorizeUrl.toString());
  openBrowser(authorizeUrl.toString());
});
