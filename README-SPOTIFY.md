# Spotify albums and playlist backup

## Overview

The `spotify-backup.js` script fetches my saved albums and playlists from Spotify and stores them as JSON data in `content/data/`.

## Usage

### Manual backup

```bash
node spotify-backup.js
```

### Automated weekly backups

The `.github/workflows/spotify-backup.yml` workflow runs once a week.

## Learn more

- [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api)
- [OAuth 2.0 Authorization Guide](https://developer.spotify.com/documentation/web-api/concepts/authorization)
- [Get User's Saved Albums Endpoint](https://developer.spotify.com/documentation/web-api/reference/get-users-saved-albums)
