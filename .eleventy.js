const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const embedYouTube = require("eleventy-plugin-youtube-embed");
const tabify = require("./tabify.js");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const path = require("path");
const { listDecks } = require("./slide-decks.js");
const { listAlbums } = require("./album-wall.js");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("content/assets");
  
  eleventyConfig.addPassthroughCopy("content/slides/AC-2025");
  eleventyConfig.addPassthroughCopy("content/slides/breakouts-day-2025");
  eleventyConfig.addPassthroughCopy("content/slides/Icons");
  eleventyConfig.addPassthroughCopy("content/slides/Tools");

  // Assets for every slide deck (and the PDF decks). Deck data files stay private.
  eleventyConfig.addPassthroughCopy("content/slides/**/!(*.11tydata).{png,jpg,jpeg,gif,GIF,svg,webp,avif,mp4,webm,mp3,woff2,css,js,json,pdf}");
  eleventyConfig.addWatchTarget("content/slides/");
  
  // Generate a presenter board (with its #printout view) at /slides/<deck>/ for every deck.
  eleventyConfig.addGlobalData("slideDecks", listDecks);
  eleventyConfig.addTemplate("slide-presenter-boards.njk", "", {
    layout: "slide-index.njk",
    pagination: { data: "slideDecks", size: 1, alias: "deck" },
    permalink: "{{ deck.url }}",
    eleventyExcludeFromCollections: true,
  });

  // Spotify albums, with precomputed sort ranks, for the /lab/spotify-albums/ page.
  eleventyConfig.addGlobalData("albums", listAlbums);

  // The albums page is a template; a raw copy would shadow /lab/spotify-albums (no trailing slash).
  eleventyConfig.addPassthroughCopy("content/lab/**/!(spotify-albums.html)");
  eleventyConfig.addPassthroughCopy(
    "content/lab/notification-lab-manifest.json"
  );
  eleventyConfig.addPassthroughCopy("content/robots.txt");
  eleventyConfig.addPassthroughCopy("content/android-chrome-192x192.png");
  eleventyConfig.addPassthroughCopy("content/android-chrome-512x512.png");
  eleventyConfig.addPassthroughCopy("content/apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy("content/favicon.ico");
  eleventyConfig.addPassthroughCopy("content/favicon-16x16.png");
  eleventyConfig.addPassthroughCopy("content/favicon-32x32.png");
  eleventyConfig.addPassthroughCopy("content/site.webmanifest");
  eleventyConfig.addPassthroughCopy("content/.well-known");
  eleventyConfig.addPassthroughCopy("content/tracks/*.gpx");
  eleventyConfig.addPassthroughCopy("content/ads.txt");

  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(embedYouTube);
  eleventyConfig.addPlugin(tabify);
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Returns the slides of `deck` (from its _deck.yml), in presentation order.
  eleventyConfig.addFilter("deckSlides", function (collection, deck) {
    const slidesBySlug = new Map();

    for (const item of collection) {
      if (path.resolve(path.dirname(item.inputPath)) === deck.dir) {
        slidesBySlug.set(path.basename(item.inputPath, path.extname(item.inputPath)), item);
      }
    }

    return deck.slides.map((slug) => {
      const slide = slidesBySlug.get(slug);
      if (!slide) {
        console.warn(`[slides] ${path.join(deck.dir, "_deck.yml")} lists "${slug}", but there is no ${slug}.html slide.`);
      }
      return { slug, title: slide?.data.title, notes: slide?.data.notes };
    });
  });

  eleventyConfig.addFilter("dateTime", function (date) {
    date = new Date(date);
    // Format as YYY-MM-DD
    return date.toISOString().split("T")[0];
  });
  
  eleventyConfig.addFilter("formattedDateTime", function (date) {
    date = new Date(date);
    // Format as Month DDth, YYYY
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  eleventyConfig.addFilter("externalDomain", function (url) {
    // Return just the domain name, for a quick preview of where a link goes.
    try {
      // Special case for https://blogs.windows.com/msedgedev/...
      // For these, we don't want only blogs.windows.com cause that's misleading.
      // We want the /msedgedev/ part too
      if (url.startsWith("https://blogs.windows.com/msedgedev/")) {
        return "blogs.windows.com/msedgedev";
      }

      const parsedUrl = new URL(url);
      return parsedUrl.hostname;
    } catch (error) {
      console.error(`Error parsing URL: ${url}`, error);
      return url; // Return the original URL if parsing fails
    }
  });

  eleventyConfig.addFilter("superSlug", function (value) {
    return value
      .toLowerCase()
      .replace(/\(/g, "")
      .replace(/\)/g, "")
      .replace(/#/g, "")
      .replace(/:/g, "")
      .replace(/!/g, "")
      .replace(/'/g, "");
  });

  eleventyConfig.addTransform("link-article-images", function (content) {
    if (this.inputPath.includes("/articles/")) {
      // Replace images with linked images.
      content = content.replace(
        /<img src="([^"]+)" alt="([^"]+)">/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer"><img src="$1" alt="$2" title="[Click to open image] $2"/></a>'
      );
    }

    return content;
  });

  return {
    templateFormats: ["md", "njk", "html", "liquid"],

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",

    dir: {
      input: "content",
      includes: "includes",
      data: "data",
      output: "_site",
    },
  };
};
