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

## Deployment

The site is generated as static files in the `_site` directory and can be deployed to any static hosting service.
