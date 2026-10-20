# patrickbrosset.com

This is the source code for [Patrick Brosset's personal website](https://patrickbrosset.com) - a technical blog and portfolio showcasing articles, talks, labs, and experiments related to web development, browser DevTools, and CSS.

## Technical stack

The site is built using modern static site generation tools:

- **[Eleventy (11ty)](https://www.11ty.dev/)** v3.0 - Static site generator
- **Template engines**: Nunjucks, Liquid, and Markdown
- **Plugins**:
  - `@11ty/eleventy-plugin-rss` - RSS feed generation
  - `@11ty/eleventy-plugin-syntaxhighlight` - Code syntax highlighting
  - `eleventy-plugin-youtube-embed` - YouTube video embeds

## Project structure

```
.
├── content/                 # Source content
│   ├── articles/           # Blog articles (Markdown)
│   ├── lab/                # Interactive demos and experiments
│   ├── slides/             # Conference presentation slides
│   ├── data/               # JSON data files (labs, talks)
│   ├── includes/           # Nunjucks templates and layouts
│   └── assets/             # Images and static assets
├── _site/                  # Generated site output (git-ignored)
└── .eleventy.js            # Eleventy configuration
```

## Key features

### Content types

1. **Articles**: Technical blog posts written in Markdown with support for:
   - External article links (using `external:` frontmatter field)
   - Automatic image linking in article content
   - Syntax highlighting for code blocks
   - YouTube video embeds

2. **Lab**: Interactive web experiments and tools, including:
   - CSS visualization tools (transforms, gradients, box-shadow, etc.)
   - Developer tool prototypes
   - Web API demonstrations

3. **Talks**: Conference presentations with metadata stored in `data/talks.json`

### Template features

- **Custom filters**:
  - `dateTime`: Formats dates as YYYY-MM-DD
  - `formattedDateTime`: Formats dates as "Month DDth, YYYY"
  - `superSlug`: Creates URL-friendly slugs

- **Automatic image linking**: All images in articles are automatically wrapped in links for opening in new tabs

- **RSS feed generation**: Available for content syndication

## Development

### Prerequisites

- Node.js (compatible with npm)
- npm or your preferred package manager

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/captainbrosset/patrickbrosset.com.git
   cd patrickbrosset.com
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Commands

- **Local development with live reload**:
  ```bash
  npm run serve
  ```
  This starts a local server (typically at http://localhost:8080) with automatic browser refresh on file changes.

- **Build the site**:
  ```bash
  npm run build
  ```
  Generates the static site in the `_site` directory.

- **Watch mode** (build on file changes without server):
  ```bash
  npm run watch
  ```

## Content creation

### Adding a new article

1. Create a new Markdown file in `content/articles/` with frontmatter:
   ```markdown
   ---
   layout: article.njk
   title: "Your Article Title"
   tags: article
   date: YYYY-MM-DD
   excerpt: "Brief description"
   thumbnail: "/assets/your-image.png"
   ---
   
   Your content here...
   ```

2. For external articles (published elsewhere), add the `external:` field:
   ```markdown
   ---
   layout: article.njk
   title: "External Article"
   tags: article
   date: YYYY-MM-DD
   excerpt: "Description"
   thumbnail: "/assets/image.png"
   external: https://example.com/article-url
   ---
   ```

### Adding assets

Place images and other assets in `content/assets/`. They will be automatically copied to the output directory.

### Creating a new slide deck

1. Create a folder in `content/slides/`, for example `content/slides/my-talk-2027/`.
2. Add a `_deck.yml` file with the deck title and the slide file names (without `.html`) in presentation order. The build warns about listed slides that don't exist.
   ```yaml
   title: My talk - Some conference 2027
   slides:
     - title
     - ajax
     # - cut-for-time
   ```
3. Add one HTML file per slide, with a short title (the deck title is prepended automatically) and speaker notes:
   ```html
   ---
   title: Ajax
   notes: |
     What I'll say during this slide.
   ---
   <main>…</main>
   ```

That's it: the presenter board at `/slides/my-talk-2027/` is generated from `_deck.yml` (see `slide-presenter-boards.njk` in `.eleventy.js`). The slide layout and deck data come from `content/slides/slides.11tydata.mjs` and `slide-decks.js`, which apply to every deck.

Images, CSS, JS, and other assets in the deck folder are copied automatically. Raw HTML pages that are embedded in slides with iframes need `layout: false` in their front matter (or in a `*.11tydata.json` file for a whole subfolder).

The deck's presenter board is at `/slides/my-talk-2027/`. Link to `/slides/my-talk-2027/#printout` to share the slides and notes; it works without JavaScript and links back to the presenter board.

Both the presenter board and presentation window support Left/Right and PageUp/PageDown for navigation. If a slide's demo needs arrow keys, add `usesArrowKeys: true` to that slide's front matter. This reserves arrows for the demo throughout the slide, regardless of focus; PageUp/PageDown still navigate, and the presenter board's shortcuts are unchanged.

## Deployment

The site is generated as static files in the `_site` directory and can be deployed to any static hosting service.
