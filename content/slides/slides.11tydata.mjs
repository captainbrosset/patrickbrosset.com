// Shared data for every slide deck in content/slides/ (see /slide-decks.js).
import slideDecks from "../../slide-decks.js";

export default {
  layout: "slide.njk",
  eleventyComputed: {
    deck: (data) => slideDecks.findDeck(data.page.inputPath),
  },
};
