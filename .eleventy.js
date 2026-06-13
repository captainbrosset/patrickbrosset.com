const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const embedYouTube = require("eleventy-plugin-youtube-embed");
const tabify = require("./tabify.js");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("content/assets");
  eleventyConfig.addPassthroughCopy("content/slides/AC-2025");
  eleventyConfig.addPassthroughCopy("content/slides/breakouts-day-2025");
  eleventyConfig.addPassthroughCopy("content/slides/Icons");
  eleventyConfig.addPassthroughCopy("content/slides/Tools");
  eleventyConfig.addPassthroughCopy("content/slides/2025-09-CSS-Gap-Decorations.pdf");
  eleventyConfig.addPassthroughCopy("content/slides/2025-10-CSS-Masonry.pdf");
  eleventyConfig.addPassthroughCopy("content/slides/2026-01-FOSDEM.pdf");
  eleventyConfig.addPassthroughCopy("content/slides/CSSDay-2026/**/*.{png,jpg,gif,GIF,svg,webp,avif,mp4,css,js,json}");
  eleventyConfig.addWatchTarget("content/slides/CSSDay-2026/");
  eleventyConfig.addPassthroughCopy("content/lab/**/*");
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
