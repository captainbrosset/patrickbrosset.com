// Helpers to find slide decks: any folder in content/slides/ with a _deck.yml file.
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const slidesRoot = path.resolve(__dirname, "content", "slides");

function readDeck(dir) {
  const file = path.join(dir, "_deck.yml");
  const { title, slides = [] } = yaml.load(fs.readFileSync(file, "utf8")) || {};
  const relativeDir = path.relative(slidesRoot, dir).split(path.sep).join("/");

  return {
    title,
    slides: slides.map(String),
    dir,
    url: `/slides/${relativeDir}/`,
  };
}

// The deck that contains the given template, or null.
function findDeck(inputPath) {
  let dir = path.resolve(path.dirname(inputPath));

  while (dir.startsWith(slidesRoot) && dir !== slidesRoot) {
    if (fs.existsSync(path.join(dir, "_deck.yml"))) {
      return readDeck(dir);
    }
    dir = path.dirname(dir);
  }

  return null;
}

// All decks: top-level folders of content/slides/ that have a _deck.yml file.
function listDecks() {
  return fs
    .readdirSync(slidesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(slidesRoot, entry.name, "_deck.yml")))
    .map((entry) => readDeck(path.join(slidesRoot, entry.name)));
}

module.exports = { findDeck, listDecks };
