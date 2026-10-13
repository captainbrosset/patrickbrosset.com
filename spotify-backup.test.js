const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, 'spotify-backup.js'), 'utf8');

async function runBackup(tokenResponse) {
  const requests = [];
  const errors = [];
  const writes = [];
  const exits = [];
  const env = {
    SPOTIFY_CLIENT_ID: 'test-client',
    SPOTIFY_CLIENT_SECRET: 'test-secret',
    SPOTIFY_REFRESH_TOKEN: 'test+refresh/token=&%',
  };
  const completion = vm.runInNewContext(source, {
    __dirname,
    Buffer,
    URLSearchParams,
    process: { env, exit: code => exits.push(code) },
    console: { log() {}, error: (...args) => errors.push(args.join(' ')) },
    require(name) {
      if (name === 'dotenv') return { config() {} };
      if (name === 'path') return path;
      if (name === 'fs') {
        return {
          existsSync: () => true,
          writeFileSync: (file, data) => writes.push({ file, data: JSON.parse(data) }),
        };
      }
      throw new Error(`Unexpected module: ${name}`);
    },
    async fetch(url, options) {
      requests.push({ url, options });
      if (requests.length === 1) return tokenResponse;
      return new Response(JSON.stringify({ items: [], next: null }));
    },
  });
  await completion;
  return { requests, errors, writes, exits, env };
}

test('form-encodes the refresh token and preserves successful backups', async () => {
  const result = await runBackup(new Response(JSON.stringify({ access_token: 'test-access' })));
  const { options } = result.requests[0];
  assert.equal(options.method, 'POST');
  assert.equal(options.headers.Authorization,
    `Basic ${Buffer.from('test-client:test-secret').toString('base64')}`);
  assert.equal(options.headers['Content-Type'], 'application/x-www-form-urlencoded');
  const body = new URLSearchParams(options.body.toString());
  assert.equal(body.get('grant_type'), 'refresh_token');
  assert.equal(body.get('refresh_token'), result.env.SPOTIFY_REFRESH_TOKEN);
  assert.equal([...body].length, 2);
  assert.equal(result.requests.length, 3);
  assert.deepEqual(result.exits, []);
  assert.deepEqual(result.errors, []);
  assert.equal(result.writes.length, 2);
  assert.equal(result.writes[0].data.total_albums, 0);
  assert.deepEqual(result.writes[0].data.albums, []);
  assert.equal(result.writes[1].data.total_playlists, 0);
  assert.deepEqual(result.writes[1].data.playlists, []);
});

test('invalid_grant explains how to recover without exposing credentials', async () => {
  const result = await runBackup(new Response(JSON.stringify({
    error: 'invalid_grant',
    error_description: 'test-secret test+refresh/token=&%',
  }), { status: 400, statusText: 'Bad Request' }));
  const error = result.errors.join('\n');
  assert.match(error, /400 Bad Request \(invalid_grant\)/);
  assert.match(error, /Reauthorize.*SPOTIFY_REFRESH_TOKEN/);
  assert.doesNotMatch(error, /test-secret|test\+refresh/);
  assert.deepEqual(result.exits, [1]);
  assert.equal(result.requests.length, 1);
  assert.equal(result.writes.length, 0);
});

test('invalid_client identifies the client secrets to check', async () => {
  const result = await runBackup(new Response(JSON.stringify({
    error: 'invalid_client',
  }), { status: 401, statusText: 'Unauthorized' }));
  assert.match(result.errors.join('\n'), /invalid_client.*SPOTIFY_CLIENT_ID.*SPOTIFY_CLIENT_SECRET/);
  assert.deepEqual(result.exits, [1]);
  assert.equal(result.writes.length, 0);
});

test('non-JSON errors retain the HTTP status without logging the body', async () => {
  const result = await runBackup(new Response('test-secret', {
    status: 502, statusText: 'Bad Gateway',
  }));
  assert.match(result.errors.join('\n'), /502 Bad Gateway/);
  assert.doesNotMatch(result.errors.join('\n'), /test-secret|SyntaxError/);
  assert.deepEqual(result.exits, [1]);
  assert.equal(result.writes.length, 0);
});

test('unknown error codes and descriptions are not logged', async () => {
  const result = await runBackup(new Response(JSON.stringify({
    error: 'test-secret', error_description: 'test+refresh/token=&%',
  }), { status: 400, statusText: 'Bad Request' }));
  assert.match(result.errors.join('\n'), /400 Bad Request/);
  assert.doesNotMatch(result.errors.join('\n'), /test-secret|test\+refresh/);
  assert.deepEqual(result.exits, [1]);
});

test('a successful response without an access token fails before fetching data', async () => {
  const result = await runBackup(new Response('{}'));
  assert.match(result.errors.join('\n'), /did not contain an access token/);
  assert.deepEqual(result.exits, [1]);
  assert.equal(result.requests.length, 1);
  assert.equal(result.writes.length, 0);
});
