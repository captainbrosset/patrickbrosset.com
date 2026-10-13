# Spotify albums and playlist backup

## Overview

The `spotify-backup.js` script fetches my saved albums and playlists from Spotify and stores them as JSON data in `content/data/`.

## Usage

Set `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, and `SPOTIFY_REFRESH_TOKEN` in a local `.env` file for manual backups, or in the repository's **Settings > Secrets and variables > Actions** for automated backups. Never commit these credentials.

### Manual backup

```bash
node spotify-backup.js
```

### Automated weekly backups

The `.github/workflows/spotify-backup.yml` workflow runs once a week.

## Troubleshooting token refresh failures

An HTTP `400 Bad Request` alone does not identify the cause. The script reports Spotify's OAuth error code when available:

- `invalid_grant`: the refresh token has expired, been revoked, or is otherwise invalid. Reauthorize the app and replace `SPOTIFY_REFRESH_TOKEN`; retrying the old token will not fix this.
- `invalid_client`: check that `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` belong to the same Spotify app used to obtain the refresh token.

[Spotify's refresh token documentation](https://developer.spotify.com/documentation/web-api/tutorials/refreshing-tokens) specifies a **six-month lifetime** for refresh tokens issued to apps registered in the Developer Dashboard. Getting new access tokens each week does not extend that lifetime. Plan to reauthorize before six months have elapsed.

### Renew the refresh token

1. Open the existing app in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard). Use the same client ID and secret as the GitHub Actions secrets.
2. Follow Spotify's [Authorization Code Flow](https://developer.spotify.com/documentation/web-api/tutorials/code-flow) to authorize your Spotify account again. Request the `user-library-read`, `playlist-read-private`, and `playlist-read-collaborative` scopes. The `redirect_uri` must exactly match an allowed redirect URI in the app settings. Generate and verify the `state` parameter as described in that guide.
3. Exchange the returned authorization `code` at `https://accounts.spotify.com/api/token` with `grant_type=authorization_code`, that `code`, and the same `redirect_uri`. Use HTTP Basic authentication with the app's client ID and secret and a form-encoded request body. Do this locally, not in workflow logs or through a third-party token generator.
4. Copy the response's **`refresh_token`**, not its `access_token`, into the repository's `SPOTIFY_REFRESH_TOKEN` Actions secret. Update the local `.env` value too if you run manual backups.
5. Go to **Actions > Weekly Spotify Backup > Run workflow** to confirm backups resume.

## Learn more

- [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api)
- [OAuth 2.0 Authorization Guide](https://developer.spotify.com/documentation/web-api/concepts/authorization)
- [Get User's Saved Albums Endpoint](https://developer.spotify.com/documentation/web-api/reference/get-users-saved-albums)
