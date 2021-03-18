This is the source code to [my personal website](https://patrickbrosset.com).

* To run 11ty and generate new content: `npx @11ty/eleventy`
* To run 11ty in watch mode: `npx @11ty/eleventy --watch` (useful when hosting the site from a local webserver, e.g. running `python -m http.server` from `_site`).

Articles that contain code snippets should include the following CSS:

```css
<link href="https://unpkg.com/prismjs@1.20.0/themes/prism-okaidia.css" rel="stylesheet">
```
