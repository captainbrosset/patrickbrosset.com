// Prepares the Spotify albums backup (content/data/spotify-albums.json) for the albums lab page.
// Every album gets a precomputed rank per sort criterion, so the page can sort
// in CSS (via the `order` property) without shipping the data as JSON.
const fs = require("fs");
const path = require("path");

const BACKUP_FILE = path.join(__dirname, "content", "data", "spotify-albums.json");
const COLORS_FILE = path.join(__dirname, "content", "data", "spotify-album-colors.json");
const TOP_FILE = path.join(__dirname, "content", "data", "spotify-top.json");

const TOP_TRACKS = 50;
const TOP_ARTISTS = 10;

const TOP_RANGES = [
  { id: "weeks", key: "short_term", label: "4 weeks", short: "4 wk" },
  { id: "months", key: "medium_term", label: "6 months", short: "6 mo" },
  { id: "year", key: "long_term", label: "year", short: "1 yr" },
];

const readJson = (file, fallback) => (fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : fallback);

const collator = new Intl.Collator("en", { sensitivity: "base", numeric: true });
const sortableName = (name) => name.trim().replace(/^the\s+/i, "");

function rankBy(albums, key, ...compareFns) {
  const sorted = [...albums].sort((a, b) => {
    for (const compare of compareFns) {
      const result = compare(a, b);
      if (result) return result;
    }
    return 0;
  });
  sorted.forEach((album, index) => (album.ranks[key] = index + 1));
}

const byAdded = (a, b) => a.added.localeCompare(b.added);
const byRelease = (a, b) => a.releaseDate.localeCompare(b.releaseDate);
const byArtist = (a, b) => collator.compare(sortableName(a.artist), sortableName(b.artist));
const byTitle = (a, b) => collator.compare(sortableName(a.name), sortableName(b.name));
const byTracks = (a, b) => a.tracks - b.tracks;

function listAlbums() {
  const { created_at: updated, albums: savedAlbums = [] } = readJson(BACKUP_FILE, {});
  const colors = readJson(COLORS_FILE, {});
  const top = readJson(TOP_FILE, null);
  const topRanges = top ? TOP_RANGES.filter((range) => top[range.key]) : [];

  const albums = savedAlbums
    .filter(({ album }) => album?.name)
    .map(({ added_at, album }) => {
      const images = [...(album.images || [])].sort((a, b) => a.width - b.width);
      const year = Number.parseInt(album.release_date, 10) || null;
      return {
        id: album.id,
        name: album.name.trim(),
        artists: album.artists.map((artist) => artist.name.trim()),
        artist: album.artists.map((artist) => artist.name.trim()).join(", "),
        year,
        releaseDate: album.release_date || "",
        added: added_at,
        tracks: album.total_tracks,
        url: album.external_urls?.spotify,
        image: images.find((image) => image.width >= 300) || images.at(-1),
        largeImage: images.at(-1),
        color: /^#[0-9a-f]{6}$/i.test(colors[album.id]) ? colors[album.id] : null,
        top: topRanges
          .map((range) => ({ ...range, reason: topReason(album, top[range.key]) }))
          .filter((range) => range.reason),
        ranks: {},
      };
    });

  rankBy(albums, "added", byAdded, byTitle);
  rankBy(albums, "year", byRelease, byArtist, byTitle);
  rankBy(albums, "artist", byArtist, byRelease, byTitle);
  rankBy(albums, "title", byTitle, byArtist);
  rankBy(albums, "tracks", byTracks, byArtist, byTitle);

  // Default document order: most recently added first.
  albums.sort((a, b) => b.ranks.added - a.ranks.added);

  return {
    list: albums,
    decades: listDecades(albums),
    topRanges: topRanges.map((range) => ({
      ...range,
      count: albums.filter((album) => album.top.some((albumRange) => albumRange.id === range.id)).length,
    })),
    updated,
    total: albums.length,
    artists: new Set(albums.flatMap((album) => album.artists)).size,
    firstYear: Math.min(...albums.map((album) => album.year).filter(Boolean)),
    lastYear: Math.max(...albums.map((album) => album.year).filter(Boolean)),
  };
}

// Why an album is in the user's top items for a time range: one of its tracks is
// a top track, or one of its artists is a top artist. Returns null otherwise.
// Slicing also guards against older backups that contain the full listening history.
function topReason(album, { artists = [], tracks = [] }) {
  tracks = tracks.slice(0, TOP_TRACKS);
  artists = artists.slice(0, TOP_ARTISTS);
  const trackRank = tracks.findIndex((track) => track.album?.id === album.id);
  if (trackRank !== -1) return `#${trackRank + 1} top track: ${tracks[trackRank].name}`;

  const artistRank = artists.findIndex((artist) => album.artists.some(({ id }) => id === artist.id));
  if (artistRank !== -1) return `#${artistRank + 1} top artist: ${artists[artistRank].name}`;

  return null;
}

// Decade headings shown when sorting by release year. Albums are laid out at
// even `order` values (rank * 2), so a heading sits at an odd value right before
// the first album of its decade, in both sort directions.
function listDecades(albums) {
  const decades = new Map();
  for (const album of albums) {
    album.decade = album.year ? Math.floor(album.year / 10) * 10 : "unknown";
    const decade = decades.get(album.decade) || { id: album.decade, count: 0, minRank: Infinity, maxRank: 0 };
    decade.count++;
    decade.minRank = Math.min(decade.minRank, album.ranks.year);
    decade.maxRank = Math.max(decade.maxRank, album.ranks.year);
    decades.set(album.decade, decade);
  }

  return [...decades.values()]
    .sort((a, b) => a.minRank - b.minRank)
    .map((decade) => ({
      ...decade,
      label: decade.id === "unknown" ? "Unknown year" : `${decade.id}s`,
      ascOrder: decade.minRank * 2 - 1,
      descOrder: -(decade.maxRank * 2 + 1),
    }));
}

module.exports = { listAlbums };
