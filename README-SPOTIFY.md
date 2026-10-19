# Spotify albums and playlist backup

## Overview

The `spotify-backup.js` script fetches my saved albums and playlists from Spotify and stores them as JSON data in `content/data/`. It also saves my top 50 artists and tracks over the last 4 weeks, 6 months, and year to `spotify-top.json`. This requires the `user-top-read` scope; without it, the script logs a warning and skips the top items.

The `spotify-album-colors.js` script extracts the dominant color of each album cover and caches it in `spotify-album-colors.json`. Only new albums are processed.

The albums are displayed at `/lab/spotify-albums/`. `album-wall.js` prepares them at build time (exposed as the `albums` global data in `.eleventy.js`), so a new backup shows up on the next site build. Cover colors are used as image placeholders. An album is marked as top in a time range when one of its tracks is in my top 50 tracks, or one of its artists is in my top 10 artists.

## Usage

Set `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, and `SPOTIFY_REFRESH_TOKEN` in a local `.env` file for manual backups, or in the repository's **Settings > Secrets and variables > Actions** for automated backups. Never commit these credentials.

### Manual backup

```bash
node spotify-backup.js
node spotify-album-colors.js
```

### Automated weekly backups

The `.github/workflows/spotify-backup.yml` workflow runs once a week. When the backup data changes, it commits it and starts the "Build site" workflow (`main.yml`), so the albums page is redeployed.

## Troubleshooting token refresh failures

An HTTP `400 Bad Request` alone does not identify the cause. The script reports Spotify's OAuth error code when available:

- `invalid_grant`: the refresh token has expired, been revoked, or is otherwise invalid. Reauthorize the app and replace `SPOTIFY_REFRESH_TOKEN`; retrying the old token will not fix this.
- `invalid_client`: check that `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` belong to the same Spotify app used to obtain the refresh token.

[Spotify's refresh token documentation](https://developer.spotify.com/documentation/web-api/tutorials/refreshing-tokens) specifies a **six-month lifetime** for refresh tokens issued to apps registered in the Developer Dashboard. Getting new access tokens each week does not extend that lifetime. Plan to reauthorize before six months have elapsed.

### Renew the refresh token

Refresh tokens expire after about six months, so this needs to be done twice a year.

1. In the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard), open the app whose client ID and secret are in `.env` and the GitHub secrets. Under **Edit settings > Redirect URIs**, make sure `http://127.0.0.1:8888/callback` is listed (Spotify doesn't accept `localhost`).
2. Run `node spotify-auth.js`. It opens Spotify in your browser. Approve access, and the script saves the new refresh token to `.env` and copies it to your clipboard. It requests the `user-library-read`, `playlist-read-private`, `playlist-read-collaborative`, and `user-top-read` scopes.
3. Paste the token into the `SPOTIFY_REFRESH_TOKEN` secret under **Settings > Secrets and variables > Actions** in the repository.
4. Go to **Actions > Weekly Spotify Backup > Run workflow** to confirm backups resume.

Never share the token or paste it into third-party token generators.

## Learn more

- [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api)
- [OAuth 2.0 Authorization Guide](https://developer.spotify.com/documentation/web-api/concepts/authorization)
- [Get User's Saved Albums Endpoint](https://developer.spotify.com/documentation/web-api/reference/get-users-saved-albums)
