const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const embedYouTube = require("eleventy-plugin-youtube-embed");
const tabify = require("./tabify.js");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("content/assets");
  eleventyConfig.addPassthroughCopy("content/robots.txt");
  eleventyConfig.addPassthroughCopy("content/android-chrome-192x192.png");
  eleventyConfig.addPassthroughCopy("content/android-chrome-512x512.png");
  eleventyConfig.addPassthroughCopy("content/apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy("content/favicon.ico");
  eleventyConfig.addPassthroughCopy("content/favicon-16x16.png");
  eleventyConfig.addPassthroughCopy("content/favicon-32x32.png");
  eleventyConfig.addPassthroughCopy("content/site.webmanifest");
  eleventyConfig.addPassthroughCopy("content/web-app-origin-association");
  eleventyConfig.addPassthroughCopy("content/tracks/*.gpx");

  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(embedYouTube);
  eleventyConfig.addPlugin(tabify);

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  return {
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid",
    ],

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",

    dir: {
      input: "content",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
