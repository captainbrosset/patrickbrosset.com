---
layout: article.njk
title: "What's missing from SVG"
tags: article
date: 2026-06-22
excerpt: "I asked around and analyzed a few different sources of developer signals on the topic of SVG, and here are the recurring themes I found."
thumbnail: "/assets/missing-svg.png"
altText: "The SVG logo, with pieces of it separated and floating away, like a puzzle with missing pieces."
---

SVG is very cool for displaying graphics on the web but, like any web technology, there's always more we could be doing with it, whether it's fixing bugs and browser inconsistencies, adding new features to unlock new use cases, or improving performance.

I wanted to learn more, so I asked around and analyzed a few different sources of developer signals on the topic.

Here are the sources I used:

* SVG tickets from the Chromium bug tracker.
* Interop focus area proposals about SVG.
* Comments left on the _"SVG issues"_ response to the graphics pain points question in the State of CSS 2025 survey.
* Free-form responses to a question I asked on social media.

## What's missing from SVG - The short version

Here's the short version of what web developers feel is missing from SVG:

1. **Styling and theming external SVG assets**

   Developers want SVGs used via `<img>`, `background-image`, favicons, and sprites to be as styleable as inline SVGs: pass theme values, use `currentColor` and custom properties, without duplicating markup or inlining every icon.

   Good news, [CSS Linked Parameters](https://drafts.csswg.org/css-link-params/) is meant to solve this problem. And look at that: [Firefox just landed support for it](https://bugzilla.mozilla.org/show_bug.cgi?id=2022783), and my team at Microsoft is working on implementing in Chromium too. So this is coming for sure!

   ---

1. **Consistent SVG/CSS integration and platform parity**

   Developers expect SVG to behave like the rest of the platform: CSS support (`z-index`, geometry properties, `calc()`, filters, blend/backdrop effects), clearer feature overlap with CSS graphics, and fewer surprises across browsers.

   ---

1. **Reliable text layout and typography in graphics**

   Developers need real text support for charts and diagrams: wrapping, overflow handling, sizing, alignment, etc. so localization and accessibility do not require manual line-breaking or path outlines.

   ---

1. **Performance**

   Developers tend to avoid SVG features because rendering, animation, and filter performance is unpredictable or expensive. They need fast, battery-friendly behavior for common effects and complex scenes so SVG is safe to use beyond static icons.

   ---

1. **Smoother animation and morphing workflows**

   Beyond raw performance, developers find SVG animation harder to author than it should be. They want easier animations and shape/path morphing.

   ---

1. **Responsive sizing, scaling, and viewBox control**

   Developers struggle to make SVGs adapt cleanly to layouts and containers: they want CSS-driven scaling, responsive or container-query-aware `viewBox` behavior, sensible sizing when width/height or `viewBox` are missing, and non-uniform scaling that preserves stroke widths.

   ---

1. **Robust reuse, linking, and resource boundaries**

   Developers want `<use>`, symbols, external references, fonts, gradients, and resources to work reliably across files, components, and Shadow DOM without ID collisions, CORS/caching edge cases, or broken references that make design-system reuse fragile.

   ---

1. **Better programmability and geometry ergonomics**

   Developers need modern APIs and better authoring for paths and geometry (path data manipulation, accurate boxes/lengths, stroke alignment, markers, multiple strokes).

   ---

1. **Interop stability and steady SVG evolution**

   Developers see long-standing spec and implementation gaps as a trust issue. They want better interoperability, clearer specs, and visible progress on long-requested features. Choosing SVG should not feel risky.

   ---

1. **Accessibility and semantics for complex graphics**

   Developers need better, consistent support for semantic relationships, ARIA graphics roles, and assistive-technology behavior across embedding modes, so accessible charts and diagrams can be created in SVG without workarounds.

   ---

1. **Reliable `foreignObject` and embedded HTML**

   Developers want to mix HTML layout inside SVG graphics via `foreignObject`, but inconsistent positioning and rendering across browsers makes this too unreliable.

   ---

If you want to read the full analysis, check out the sections below.

## SVG tickets from the Chromium bug tracker

The Chromium bug tracker lets users upvote tickets, which can be a good signal of developer needs and pain points. I looked at [all the open tickets in the SVG component](https://issues.chromium.org/issues?q=componentid:1456414%20status:open&s=vote_count:desc&s=status:asc&s=seven_day_view_count:desc), sorted them by number of votes, and only kept those that had at least 5 upvotes.

Looking at votes alone can be dangerous. Some bugs are much older, and have collected more votes over time. Some feature proposals are new and mostly unknown even if they solve a common developer problem. That being said, using this to filter down the list of tickets is a good starting point to avoid being overwhelmed by too much data.

The most important signal here is not any single issue, but the concentration of votes around a few recurring themes:

1. **SVG as a reusable, themeable web asset**

   Developers want to treat SVG files like the modern web assets they should be: cacheable, reusable, stylable, to unlock design systems, icons, theming, etc.

   * `<use>` cross-origin/CORS issue
   * Raster image loading in SVG
   * Caching/reload bugs
   * Resources in `display:none`
   * Nested external references
   * CSS Linked Parameters
   * CSS styling of `<use>`/`<symbol>`
   * CSS presentation-attribute mapping issues

1. **SVG as a first-class web platform citizen**

   Developers want use the same CSS and layout concepts they already known. SVG should behave like the rest of the platform.

   * Support `z-index`
   * Support `calc()` lengths
   * Trade geometry properties for CSS
   * presentation attributes
   * Support `backface-visibility`
   * Fix `mix-blend-mode`

1. **SVG programmability**

   Developers don't only want to display graphics, they want to manipulate them.

   * Path Data API
   * `getBBox(options)`
   * Bounding-box correctness
   * `pathLength`
   * Geometry APIs
   * Coordinate/length correctness

1. **Modern text and layout in SVG**

   Developers need real text, not outlines, because accessibility and localization matter. SVG text still feels like a separate platform in many ways.

   * Support `inline-size`
   * Support `white-space`
   * Support `text-overflow`
   * Improve `<textPath>`
   * Kerning issues
   * Font metrics issues
   * Decoration handling
   * Support `shape-inside`

1. **SVG performance**

   Developers need SVG to be reliable.

   * Expensive re-layouts
   * Animation performance

<details>
  <summary>The full list of open tickets</summary>

* [[Bug] SVG `<use>` element blocking cross-domain requests, with no option to use CORS](https://issues.chromium.org/issues/41164645) (59 votes)
* [[Feature Request] [svg2] Implement new path data API](https://issues.chromium.org/issues/40441025) (44 votes)
* [[Bug] Raster image in SVG images are blocked from downloading](https://issues.chromium.org/issues/41008453) (30 votes)
* [[Bug] Improve tainting behavior for filter types](https://issues.chromium.org/issues/41359663) (24 votes)
* [[Feature Request] Implement SVG2's getBBox(optional SVGBoundingBoxOptions)](https://issues.chromium.org/issues/40330718) (22 votes)
* [[Bug] SetMediaFeatureOverride doesn't affect media queries in SVG favicons](https://issues.chromium.org/issues/40108320) (21 votes)
* [[Bug] Painting SVG images can spent a lot of time doing layout if it has multiple embed points](https://issues.chromium.org/issues/41254969) (20 votes)
* [[Bug] SVG Caching Issue in Chrome: Updates Not Reflecting After Refresh](https://issues.chromium.org/issues/360599258) (20 votes)
* [[Feature Request] [SVG2] Implement additional vector-effect values (non-scaling-size, non-rotation, fixed-position)](https://issues.chromium.org/issues/40506103) (20 votes)
* [[Feature Request] [SVG2] Support 'inline-size' for text-wrapping in `<text>`](https://issues.chromium.org/issues/40362375) (20 votes)
* [[Bug] SVG resource don't work in display: none subtrees](https://issues.chromium.org/issues/40324398) (17 votes)
* [[Feature Request] Support the 'z-index' property on SVG elements](https://issues.chromium.org/issues/40496046) (16 votes)
* [[Feature Request] [SVG2] Support 'white-space' in svg and start phasing out xml:space](https://issues.chromium.org/issues/40362378) (15 votes)
* [[Feature Request] [SVG2] `<textPath>` additions/changes](https://issues.chromium.org/issues/40362379) (14 votes)
* [[Feature Request] [SVGnext] Support mesh gradients](https://issues.chromium.org/issues/40362938) (14 votes)
* [[Feature Request] [SVG2]  Support text-overflow on `<text>` elements](https://issues.chromium.org/issues/40362374) (14 votes)
* [[Feature Request] [svg2] Support calc() for SVG `<length>` values](https://issues.chromium.org/issues/40445451) (13 votes)
* [[Feature Request] Implement CSS Linked Parameters](https://issues.chromium.org/issues/41482962) (12 votes)
* [[Bug] SVG getBBox() produces incorrect results for transformed children](https://issues.chromium.org/issues/41110123) (11 votes)
* [[Bug] External SVG content referenced by `<use>` in an HTML page is not updated on page reload](https://issues.chromium.org/issues/353259715) (10 votes)
* [[Bug] Wrong kerning for text in scaled SVG image with large viewBox (when in an `<img>` context)](https://issues.chromium.org/issues/40496285) (10 votes)
* [[Bug] preserveAspectRatio on `<svg:image>` does not override preserveAspectRatio in a referenced SVG image](https://issues.chromium.org/issues/41182162) (10 votes)
* [[Feature Request] [SVG2] Support media fragment identifiers](https://issues.chromium.org/issues/40362942) (10 votes)
* [[Feature Request] Implement the 'path-length' property](https://issues.chromium.org/issues/40670251) (9 votes)
* [[Feature Request] [SVG2] Make x,y,width,height attributes as presentation attributes on `<svg>`, `<rect>`, `<image>`, `<foreignObject>`, `<use>` and `<symbol>` elements](https://issues.chromium.org/issues/40377919) (9 votes)
* [[Bug] Significant performance degradation when using animated SVGs](https://issues.chromium.org/issues/40919070) (8 votes)
* [[Bug] Minimum font size is applied to HTML embedded as foreignObject in SVG](https://issues.chromium.org/issues/40662884) (8 votes)
* [[Bug] CSS backface-visibility doesn't apply on SVG elements](https://issues.chromium.org/issues/41453839) (8 votes)
* [[Bug] Referenced SVG all wibbly-wobby when nothing is supposed to change](https://issues.chromium.org/issues/41338294) (8 votes)
* [[Bug] foreignObject children go out from the SVG mask](https://issues.chromium.org/issues/41096530) (8 votes)
* [[Feature Request] Support SVG2 fill/stroke `<image>` syntax(includes gradients)](https://issues.chromium.org/issues/40345584) (8 votes)
* [[Task] Move SVG relative length handling to the layout tree](https://issues.chromium.org/issues/40514551) (8 votes)
* [[Bug] CSS animated inline SVG very slow/expensive compared to CSS animated HTML](https://issues.chromium.org/issues/41273770) (8 votes)
* [[Bug] SMIL animations on descendants of a display:none SVG should not cause style recalculations](https://issues.chromium.org/issues/40493107) (7 votes)
* [[Bug] Incorrect handling of userSpaceOnUse relative lengths for SVG resources](https://issues.chromium.org/issues/41055285) (7 votes)
* [[Bug] SVG Text visual overflow does not account for decorations](https://issues.chromium.org/issues/40266518) (7 votes)
* [[Bug] shape-rendering=“crispEdges” depends on the SVG width](https://issues.chromium.org/issues/40685528) (7 votes)
* [[Feature Request] [svg2] Support text-decoration-{fill,stroke}](https://issues.chromium.org/issues/40604506) (7 votes)
* [[Feature Request] [svg2] Support shape-inside (and potentially other shape-* properties?) for SVG text](https://issues.chromium.org/issues/40589910) (7 votes)
* [[Bug] mix-blend-mode doesn't blend correctly with background in SVG](https://issues.chromium.org/issues/41378759) (7 votes)
* [[Bug] getBoundingClientRect returns "object bounding box"](https://issues.chromium.org/issues/40434942) (7 votes)
* [[Bug] 'white-space', 'text-overflow', 'font-size-adjust' not being mapped as presentation attributes](https://issues.chromium.org/issues/40676629) (7 votes)
* [[Bug] stroke length not equal to pathLength with stroke-dasharray: pathLength](https://issues.chromium.org/issues/40727576) (7 votes)
* [[Bug] SVG fill urls fail if display:none is set to ancestor](https://issues.chromium.org/issues/40209403) (6 votes)
* [[Bug] backdrop-filter doesn't work on SVG child elements](https://issues.chromium.org/issues/40721696) (6 votes)
* [[Bug] Printing SVG to PDF rescales stuff arbitrarily](https://issues.chromium.org/issues/40659334) (6 votes)
* [[Bug] SVG SMIL syncbase values are not interpreted correctly](https://issues.chromium.org/issues/40653160) (6 votes)
* [[Bug] rx, ry set via SVG attribute should also use the new SVG2 behavior](https://issues.chromium.org/issues/41457350) (6 votes)
* [[Bug] SVG background images do not always repeat uniformly.](https://issues.chromium.org/issues/41434132) (6 votes)
* [[Bug] Caching `<object>` images](https://issues.chromium.org/issues/41357904) (6 votes)
* [[Task] Convert svg tests from js-test.js to testharness.js](https://issues.chromium.org/issues/41269302) (6 votes)
* [[Feature Request] [SVGnext] Support hatches](https://issues.chromium.org/issues/40362939) (6 votes)
* [[Bug] Setting 'resize' event on document element `<svg>` tag via script fails to work](https://issues.chromium.org/issues/41302766) (6 votes)
* [[Bug] Spinner does layout from the RenderView instead of from the SVGRoot](https://issues.chromium.org/issues/40420363) (6 votes)
* [[Feature Request] [SVG Strokes] Support stroke-alignment property](https://issues.chromium.org/issues/369111074) (5 votes)
* [[Bug] `<animate>` nodes not present when embedding SVGs via `<use href>`](https://issues.chromium.org/issues/40853412) (5 votes)
* [[Bug] Priority not correct for elements with same begin time and syncbase dependencies](https://issues.chromium.org/issues/40661487) (5 votes)
* [[Bug] Adding an svg `<use>` element referring image, an unwarranted image reload is triggered](https://issues.chromium.org/issues/40654125) (5 votes)
* [[Bug] SVG dominant-baseline=hanging fails of font size is small](https://issues.chromium.org/issues/40652861) (5 votes)
* [[Bug] SVG renders wrong on different sizes](https://issues.chromium.org/issues/40650563) (5 votes)
* [[Bug] feFuncA type=table is not correctly inverting fully transparent shapes with color fills](https://issues.chromium.org/issues/41477147) (5 votes)
* [[Bug] Inner `<svg>` doesn't support geometry property](https://issues.chromium.org/issues/41461015) (5 votes)
* [[Task] Top-level navigation to SVG documents isn't restricted like `<img src>` embedding of same image](https://issues.chromium.org/issues/40094872) (5 votes)
* [[Bug] [WPT] New failures introduced in external/wpt/svg by import https://crrev.com/c/1356639](https://issues.chromium.org/issues/41429196) (5 votes)
* [[Task] SVG: Geometry properties should not accept unitless lengths](https://issues.chromium.org/issues/40599763) (5 votes)
* [[Bug] SVG xml:space preserve is not inherited to text elements](https://issues.chromium.org/issues/40509580) (5 votes)
* [[Bug] SVG Image in border-image zooms horribly](https://issues.chromium.org/issues/41244863) (5 votes)
* [[Feature Request] [SVGnext] Support the 'solidColor' element and 'solid-color' / 'solid-color-opacity'](https://issues.chromium.org/issues/40362935) (5 votes)
* [[Feature Request] [SVG Markers] Support marker-pattern](https://issues.chromium.org/issues/40362915) (5 votes)
* [[Feature Request] [SVG Markers] Support positioned markers](https://issues.chromium.org/issues/40362913) (5 votes)
* [[Bug] SVG in `<object>` tag reports itself as window.top, though not](https://issues.chromium.org/issues/41267580) (5 votes)
* [[Bug] SVG rect rounds differently to SVG root when zoomed](https://issues.chromium.org/issues/40083973) (5 votes)
* [[Feature Request] SVG script elements should support async, defer and type=module](https://issues.chromium.org/issues/40067618) (5 votes)
* [[Bug] [WPT] New failures introduced in external/wpt/svg by import https://crrev.com/c/2055704](https://issues.chromium.org/issues/40118791) (5 votes)
* [[Bug] Differing font/glyph metrics images/color-profile-svg-fill-text.html](https://issues.chromium.org/issues/40115170) (5 votes)
* [[Bug] nested SVG ‘use’ elements across several files don’t work](https://issues.chromium.org/issues/41452091) (5 votes)
* [[Bug] Speed: SVGSMILElement::addBeginTime using up excessive CPU](https://issues.chromium.org/issues/41438515) (5 votes)
* [[Bug] SVG use and symbol elements cannot be styled with width and height CSS properties](https://issues.chromium.org/issues/41413321) (5 votes)
* [[Bug] focus event listener on arbitrary SVGElement makes it focusable](https://issues.chromium.org/issues/41150362) (5 votes)
* [[Bug] SVG beginElementAt start animation before passed offset](https://issues.chromium.org/issues/41126968) (5 votes)
* [[Bug] feGaussianBlur shows banding under certain circumstances](https://issues.chromium.org/issues/41007781) (5 votes)

</details>

## Interop focus area proposals about SVG

1. **SVG styling, theming, and reuse**

   Developers want to use SVG the easy way (`<img>`, `background-image`, `favicons`), but that's exactly where SVG becomes least flexible.

   * Link parameters for styling non-inline SVG
   * Dark mode for SVG
   * SVG favicons

1. **SVG rendering and effects**

   SVG should be capable of rich visual effects, but cross-browser behavior is inconsistent, buggy, or incomplete.

   * SVG filters
   * CSS filters on inline SVG elements
   * SVG interoperability bugs

1. **SVG reuse and `<use>` consistency**

   Developers experience friction around SVG reuse.

   * Allow omission of fragment when using `<use>`
   * CSS selectors should not pierce the shadow root created by `<use>`

<details>
<summary>All SVG interop focus area proposals</summary>

* [SVG filters](https://github.com/web-platform-tests/interop/issues/756)
  SVG filters should allow us to a achieve a lot of effects that otherwise involve content duplication or using external images or JS (canvas, whether 2D or WebGL). That is, if they worked properly. This is an area of the web that has been long neglected. There are lots of bugs, some of them over a decade and a half old. A lot of things don't work properly in one browser or another or they're slow or they don't work at all.

* [SVG favicons](https://github.com/web-platform-tests/interop/issues/745)
  Cross-browser support for SVG favorite icons (`<link rel="icon">`).

* [Dark mode for SVG](https://github.com/web-platform-tests/interop/issues/1058)
  For inline SVG currentcolor and CSS variables are simple ways to implement dark mode. When SVG is used like a typical image format as the src for an <img>, neither of those approaches work. There are two solutions: the light-dark() function or the prefers-color-scheme media query.

* [Link parameters for styling non-inline SVG](https://github.com/web-platform-tests/interop/issues/996)
  The simplest approach to using SVG is the HTML img element. Unfortunately this approach is the most limited when it comes to styling with CSS, a situation that would be remedied by CSS link parameters. Developers need to be able to change the fill or stroke color for hover/focus/disabled states, for example.

* [SVG](https://github.com/web-platform-tests/interop/issues/821)
  SVG is an important standard enabling developers to describe 2D graphics that can be rendered at any size without loss of quality. Implementations in browsers today suffer from many interoperability issues causing developer frustration, with examples in the following links.

* [Allow omission of fragment when using SVG `<use>`](https://github.com/web-platform-tests/interop/issues/1045)
  SVG 2 allows `<use>` to reference entire files by omitting the fragment. Unfortunately this is only implemented in Chrome/Edge.

* [Standardize CSS Filters on Inline SVG Elements](https://github.com/web-platform-tests/interop/issues/1104)
  Applying CSS filter properties to inline SVG elements like `<rect>`, `<path>`, and `<text>` is inconsistent across browsers. While Chrome and Firefox render these filters correctly, Safari fails to apply them, leading to interoperability issues. Elements inside `<svg>` cannot reliably use CSS filters, despite support for filters on the root <svg> element as a whole.

* [CSS selectors should not pierce the shadow root created by the SVG `<use>` element](https://github.com/web-platform-tests/interop/issues/852)
  Some implementations do not encapsulate styles in the SVG `<use>` element, as they do for other shadow trees.
  This is an issue with observed webcompat breakage.

* [Clipboard API: SVG and custom types](https://github.com/web-platform-tests/interop/issues/241)

</details>

## SVG issues in the State of CSS 2025 survey

In the State of CSS 2025 survey is a free-form question titled [Shapes and graphics pain points](https://2025.stateofcss.com/en-US/features/#shapes_graphics_pain_points).

Many of the responses mention SVG. In the results, an _"SVG issues"_ category was created to group them all together, and it ended up in 2nd place, meaning that SVG is the second most common pain point for developers using graphics in CSS.

Below is my interpretation of the free-form comments in this category. I've grouped them by theme, and sorted by the number of comments in each theme.

1. **Better CSS styling and coloring of external SVGs**

   Developers want SVGs to behave more like regular HTML/CSS content:

   * Style SVGs loaded via `<img>`, `background-image`, or external files.
   * Use `currentColor` and CSS custom properties (`var(--*)`) in external SVGs.
   * Easily recolor SVGs from CSS.
   * Apply CSS styles consistently regardless of how SVGs are embedded.
   * Access SVG markup for styling even when SVGs are referenced externally.
   * Reduce differences between SVG color mechanisms (`fill`, `stroke`) and CSS (`color`).

1. **SVG vs. CSS feature overlap, integration, and choosing the right tool**

   Developers find the relationship between SVG, CSS Shapes, masks, clip-paths, gradients, and other graphics features confusing and inconsistent:

   * Better integration between SVG and CSS.
   * More SVG capabilities available directly in CSS.
   * Ability to create arbitrary shapes in CSS without resorting to SVG.
   * Clearer guidance on when to use SVG vs clip-path vs masks vs CSS shapes.
   * Consistency between equivalent SVG and CSS features.

1. **Easier creation and editing of complex shapes and paths**

   Creating custom shapes is difficult without dedicated vector design tools.

   * Easier authoring of SVG paths and arcs.
   * Better tooling for creating complex shapes.
   * Improved support for reusing vector-defined shapes in CSS.
   * Less reliance on Illustrator/Figma for shape generation.

1. **Responsive sizing, scaling, and viewBox control**

   Developers struggle to make SVGs adapt cleanly to different layouts and containers.

   * Control SVG scaling behavior with CSS.
   * Change `viewBox` responsively.
   * Container-query-like behavior for SVG viewports.
   * Better sizing rules when width/height or viewBox are missing.
   * Non-uniform scaling while preserving stroke widths.

1. **Browser interoperability and inconsistent behavior**

   SVG behavior still varies too much across browsers and embedding modes.

   * Consistent CSS support across browsers.
   * Consistent handling of CSS custom properties.
   * Fix Safari-specific SVG issues.
   * Reduce rendering artifacts and positioning inconsistencies.

1. **Better SVG filter support and CSS access to filter features**

   Filters are powerful but difficult to use.

   * More complete SVG filter support across browsers.
   * Control SVG filter parameters from CSS.
   * Make SVG filters available directly as CSS features.
   * Improve filter support for `backdrop-filter`.

1. **Animation and morphing**

   SVG animation is perceived as harder than it should be.

   * Easier SVG animations.
   * Better support for shape/path morphing.
   * Clearer animation workflows.

1. **SVG layout and rendering limitations**

   Some SVG-specific layout features feel outdated compared to HTML/CSS.

   * Ability to control rendering order with concepts like z-index.
   * Better CSS control of SVG coordinates (x, y).
   * Improved interaction between SVG elements and surrounding content.

<details>
  <summary>All comments</summary>
  <ul>
  <li>Ability to use currentColor and css variables for SVG set using background-image</li>
  <li>Absense of Linked Parameters for passing data into SVGs</li>
  <li>adaptive svg icons</li>
  <li>animated svgs</li>
  <li>Animation and morphing (mostly SVG related, hopefully some tasks can be solved with CSS in the near future)</li>
  <li>animations using svgs can be....difficult. Progress circles etc.</li>
  <li>Being able to control how svg scale depending upon context</li>
  <li>Being able to style multicolored svg as background (not inline)</li>
  <li>Browser inconsistencies when styling SVGs</li>
  <li>Cannot use currentColor in svg image, only inline svg.</li>
  <li>Canvas and SVG seem like better fits for the problem?</li>
  <li>coloring svg's</li>
  <li>complex masking, would love to be able to specify complex shapes without svg.</li>
  <li>Complex SVGs with CSS transforms</li>
  <li>Creating complex or irregular shapes can be difficult if not using a vector graphics program. In which case, I prefer SVG anyways.</li>
  <li>Creating rounded SVG-esque shapes/masks is such a pain without an external editor.</li>
  <li>css created shapes feel clunky in comparison to svgs, but then that gives up a lot of control on the page.</li>
  <li>Data URI SVGs cannot use CSS variables :(</li>
  <li>Differences between css shapes/gradients and SVGs.</li>
  <li>differences between what's available in css and what's available in svg</li>
  <li>Different standards for SVG</li>
  <li>Don't need to use them that often as shapes are usually provided as SVGs by our designers</li>
  <li>dont undestand path and shape of svg</li>
  <li>feeling the need to use SVG for shapes</li>
  <li>Figure out what’s possible regarding text styling in svgs</li>
  <li>fonts in svgs inside a file loaded with `<img>`</li>
  <li>Hard to know when I should use CSS shapes, when SVG, when others.</li>
  <li>I find that shape, polygon... would be interesting outside the scope of clip-path as a way to draw custom areas with background-colors etc. Similar to how you could do an SVG and then pass it as base64 but in css syntax</li>
  <li>i would like to change SVG viewbox attribute depending on container or window size. i want viewbox css attribute or container query</li>
  <li>I would love to see all the SVG filters added to CSS to affect regular elements without needing to rely on SVG</li>
  <li>In general I tend to use SVG to solve that. I miss best practices as when should you try them programatically like: when or what are the benefits of using clip-path or shape over a regular SVG for a simple thing like a star shape, as an example. Consider a big product page with star reviews all over the products. Which is better?</li>
  <li>inconsistencies between SVG and CSS: parallel features, some things work and some don't in different contexts</li>
  <li>Inconsistent behaviour between browsers wrt. CSS custom properties applying to external SVGs</li>
  <li>inline SVG in CSS needs encoding in specific usecases (the # character for example)</li>
  <li>Inverting the color of an statically positioned SVG graphic based on anything which scrolls behind it - e.g. images, text, etc, which are not backgrounds of the graphics container itself.</li>
  <li>It's really strange how the different ways of embedding SVGs sometimes prevent CSS styles from applying to them. It would be nice to be able to override the default functionality.</li>
  <li>Lack of standardisation between colouring SVG and font icons (fill vs color)</li>
  <li>Lack of SVG filters alternatives</li>
  <li>lack of SVG parameters</li>
  <li>Lacking a nicer way than `::before`/`::after` `content: ""` hacks for adding inline SVG, for e.g icons (I am a major contributor to Lucide icons…)</li>
  <li>Limited CSS support in SVG</li>
  <li>Limited SVG Filter Support in backdrop-filter across browsers</li>
  <li>Need better understanding of SVG as it is a fundamental source for shapes in CSS</li>
  <li>Not being able to (easily) change the stroke-/fill-color of an SVG background-image</li>
  <li>not being able to control SVG filter attributes from the CSS</li>
  <li>Not being able to control x and y properties of SVGs with CSS</li>
  <li>Not easily being able to recolor SVG files in CSS.</li>
  <li>Poor support for SVG, and SVG objects being rendered too much in isolation from each other producing sub-pixel seams and positioning issues.</li>
  <li>Remembering what CSS actually works in SVG and what doesn't</li>
  <li>Scaling path() paths used in masks, clip-paths and offset-path.  I get that shape will sort of help, but not really because how am I going to "draw" the shapes if I can't do that in something that supports creating SVGs like Figma or Illustrator.</li>
  <li>Scaling svg containing foreign object in Safari is broken</li>
  <li>scaling svg's unproportionally but with stable line width</li>
  <li>Shapes are easier with svg libraries or graphics.</li>
  <li>Styling (external) SVGs</li>
  <li>Styling embedded SVGs</li>
  <li>Styling svg</li>
  <li>Styling SVG is still a bit of a pain</li>
  <li>Styling SVGs</li>
  <li>svg and aspect ration in safari,</li>
  <li>SVG and CSS integration</li>
  <li>Svg coloring</li>
  <li>svg colors</li>
  <li>SVG elements render order(no z-index).</li>
  <li>SVG filter support</li>
  <li>SVG is easier to work with shapes but hard to style with CSS</li>
  <li>SVG pains</li>
  <li>SVG paths</li>
  <li>svg paths are hard to construct, esp. the arcs</li>
  <li>svg shapes and patterns for dynamic color assignations (ie as pseudo shapes)</li>
  <li>SVG sizing</li>
  <li>SVG support, stale development</li>
  <li>SVG’s viewbox can’t be changed through CSS</li>
  <li>syntax (svg, clip-path, gradients)</li>
  <li>the complexities of svg interop in html. I would like to be able to create a "div" shaped as a polygon or circle, and be able to style it with css as usual, without having to resort to svg.</li>
  <li>Use SVG coords as is in css to create dynamic shapes. And they should scale properly as well.</li>
  <li>Using CSS to affect imported .SVG files</li>
  <li>Using SVG vs clippaths vs masks</li>
  <li>when to use css on html vs svg</li>
  <li>width and height properties for the SVG elements without or with wrong viewBox</li>
  <li>Would love for an svg to have the markup available for styling when included as an img.</li>
  <li>Writing out complex shapes such as built in an SVG editor is not possible (`shape()` is not cross-browser compatible)</li>
  </ul>
</details>

## Social media question about SVG

To complement the above results, I also asked what was missing from SVG on <a href="https://mas.to/@patrickbrosset/116792761131396334">Mastodon</a>, <a href="https://bsky.app/profile/patrickbrosset.com/post/3mougylahrk2d">Bluesky</a>, and <a href="https://www.linkedin.com/posts/patrickbrosset_quick-svg-survey-what-are-your-pain-points-share-7474736772242046976-ndku/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAABm63wB9NIFWK7Z8l7ky8iGh6Y2nJRE5dY">LinkedIn</a>.

Developers love SVG's potential, but they feel it is trapped between HTML/CSS integration gaps, poor performance, and a lack of evolution. The highest-impact work would likely be making SVG assets easier to use as normal web assets: styleable, themeable, accessible, performant, and interoperable across embedding modes.

1. **CSS integration and styling external SVGs**

   Developers want to use SVG as an ordinary external asset, via the `<img>` tag or CSS `background-image` while still being able to style and theme it from the page.
   
   This affects icons, design systems, theming, dark mode, component libraries, charts, etc.

1. **Performance: animations, filters, and rendering cost**

   Developers perceive SVG as risky for production when animation, filters, or complex rendering are involved. Developers will avoid using SVG features entirely if they believe the features are expensive, unpredictable, or battery-hostile.

   There are two sub-themes here:
   
   * General SVG rendering/animation performance (transforms, path animations, CSS animations, SMIL animation, `d` animation, and graph/data-viz animation).
   * Filter performance. Filter performance is specifically called out. This is important because SVG filters are one of SVG's most unique capabilities compared to CSS.

1. **Text layout, wrapping, and flow**

   SVG text is too low-level. Developers want "real text in a box", with wrapping, flow, sizing, and containers that adapt naturally.

   This is a long-standing SVG usability gap that affects charts and data visualizations, diagrams, localization, and responsive graphics.

1. **Interop, spec gaps, and stagnation**

   Developers see SVG as under-specified, inconsistently implemented, and not evolving fast enough. This comes down to platform trust, just like the performance theme above, pushing developers to avoid SVG features entirely.

1. **Linking and reusing**

   SVG reuse mechanisms are powerful but full of edge cases: IDs collide, resources cannot cross boundaries, gradients fail in sprites, fonts and stylesheets do not behave predictably, and Shadow DOM integration is painful.

   Developers want reusable SVG assets that do not break when used in components, sprites, Shadow DOM, or design systems.

1. **Accessibility**

   Developers building accessible charts and diagrams struggle to express relationships, roles, and semantics inside SVG in a way assistive technologies understand consistently.

1. **Geometry, paths, strokes, markers, and authoring ergonomics**

   Several SVG primitives are awkward or underspecified from an authoring perspective.

   * Stroke alignment and position
   * Multiple strokes on one element
   * Markers
   * Path syntax

   Some of which are very old, indicating strong frustration.

1. **ForeignObject / embedded HTML behavior**

   `foreignObject` is useful because it lets developers mix HTML layout with SVG graphics, but interop issues prevent reliable use.

<details>
<summary>All responses</summary>

* Just performance inside browsers, really. Animating anything feels like a bad idea right now: websites shouldn’t be making people’s phones heat up or laptop fans spin up. Do SVG and CSS animations _really_ need to run so much slower than the equivalent custom implementations in WebGL/WebGPU?

* SVG scripts and links and probably style elements having essentially no spec.

* Figuring out which SVG features are supported can be really tricky (and makes the BCD Collector choke). I think a better (specified) SVG DOM would help. Happy to look into details.

* Accessibility for the relationships between parts of the SVG. Right now, I think you can assign a title and description to any elements, but I don't think you can say "these elements are linked" in a way that AT can understand. You can manually make `<a>` elements in both directions, but IIRC that's broken in Safari.

* Low hanging fruit: add a `hidden` attribute/property at least to the `<svg>` element that works like HTML.

* Probably forgetting a bunch of things but here's what comes to mind:

  * Performance!
  * Rendering is not always consistent (mainly filters, sometimes more subtle things like text position/sizing)
  * Linked SVGs are not customisable (CSS stroke/fill colours, stroke widths, filter params…)
  * Also wouldn't be opposed to a text box element to allow wrapping

* I wish I could create hover states for an SVG inside an `<img>` without being forced to inline the SVG.

  I wish SVGs would inherit the custom fonts added to the site. When showing SVG text inside an `<img>`, the fonts break unless you add font-face CSS to the SVG.
  
  Basically if a designer provides an SVG icon, I don't love all the extra work I have to do as a dev to make that SVG asset usable. I just want to drop it in and starting using it.

* Paths always following the center. I wish I could align them to one side of the paths.

* text wrapping / text flow would be my biggest pain point.

* It’s been a couple of years since I did some heavy SVG stuff but I had a hankering for external CSS for SVGs.

* A more graceful way for text -- real text, not paths which look like text, to flow and for containers around them to stretch or shrink to size without having to calculate their heights.

* A way to reach inside a SVG used as a CSS background image or img tag. Now we are forced to inline it, which is fine until you have ids as someone already mentioned. (I think it makes sense to have just one scope for ids, but it does cause some headaches.)

  On the flip side, an easy way to refer to an inline SVG as a background image. Very useful for https://github.com/axe312ger/sqip.

  img is replaced content, but only if the image is loaded. Until then you can add a pseudo element with the SQIP background to not disturbe transparent images. However, when I implemented this a few years back I encountered a fair amount of trouble. I ended up with an inline style setting a CSS variable to the SVG's data URI (not base 64 encoded).

* What if I could treat an img of a SVG as an element with a shadow DOM. So be able to set CSS variables and have them cross the boundary, or something like `::part` (or whatever the current way of interacting with shadow DOM in CSS looks like).

* A filter for gradient mapping. Component transfer is sort of close but its table mode only allows linear interpolation and points are evenly spaced. So if gradient happens to be different (and most are) the closest option is sampled analogue with a lot of points. And this is while SVG has fairly good gradients otherwise. Let me use gradients for color transfer.

* Hands down `ForeignElement` positioning context. Blink deals with it pretty well, but other engines don’t. 😅

  I know this isn’t specific to SVG as a language, but I still think it’s a huge bug that prevents some pretty cool use cases. 😊

  Otherwise, multiple strokes on the same element would be nice, I think. 🤔

* Lack of support for conic gradients (as available in CSS) is the thing I've run up against most recently.

* In general feature parity with CSS, like how stroke can be both an attribute and CSS property.

* Most of this SVG wish list I wrote nine (!!) years ago is still relevant (first item’s quite a bit better today, though) https://cloudfour.com/thinks/svg-wish-list/

* This is a silly one, but it annoys me that ids in SVGs inlined in HTML are scoped to that HTML file and can conflict. My designers often give me SVGs with ids that I can't remove (because they need to reference some shape as a clip path or gradient as a background), and I can't put that in a static SVG file. I need to put it in my framework's component file and add logic that generates a random id for those elements, so that this SVG can be inlined multiple times on the same page. Once I forgot to do this and I was pulling my hair out why some icons turned out invisible.

* Path syntax is INSANE.

  xml is ordered. We have concept of nesting. "Let's invent a completely different, separate syntax and put it into an attribute string".

  WHAT.

  Also I tried messing around with animations with... not satisfactory results. Too intuitive, breaks to easily.

  My vote would be to refactor the path syntax into tags and to remove animations completely and spin them out into different standard and format. Maybe interpolate between svgs as frames or something.

* Performance (!)

* Linked Parameters

* Linked Parameters (but nice that they are coming!)

* Filters performance (I’d love to use @anatudor’s effects in production haha), alongside general performance.

* Just it being stagnant, and not really evolving. Yes, some things might be better to do in CSS, but I can still see benefits of SVG as a separate markup language for complex graphic.

* Not all CSS applying inside. Including an ability to use more dynamic values for any coordinates and shapes.

* SVG filter performance in browsers is really poor, which is a shame because you can get some really unique effects with them.

* SVG filters in general.

* There are also implementation gaps (see `edgeMode` for `feGaussianBlur`), spec gaps, which may lead to every browser engine having a wildly different implementation (see relative displacement on non-square inputs) and a ton of bugs, some old enough to buy alcohol legally.

* In order:

  1. Passing colors to SVG (for icons etc)

  1. External resources:

     1. `<use>` for sharing paths
     1. Fonts (talk to the @excalidraw.com falks about the pains they went through with their SVG export)
     1. Stylesheets (e.g. to share design tokens)

  1. Poor integration of CSS primitives into SVG:

     * CSS gradients should be paint servers and allowed everywhere an SVG gradient is
     * shape() cannot be used in `<path>`
     * Not all geometry attributes are properties

  1. Poor integration of SVG primitives into CSS:

     * fill-stroke module still not supported, need crazy hacks for basic things like stroking text drafts.csswg.org/fill-stroke/

  This is just off the top of my head! The pain is real 😫

* Markers. Implementation gaps and bugs.

* Being able to specify stroke position (in/ out/ half in, half out). I first wrote an article about workarounds over a decade ago: https://css-tricks.com/tight-fitting-svg-shapes/ - the "future" solution still isn't a thing.

* The current markers spec is so annoying to use that I always end up abandoning using it any time I try to. Futzing with magic-numbering manual offsets and angles on the ends and not having marker transparency affect the line underneath are super annoying.

* The need to use inline SVG for passing CSS colors to SVG sprites that's leading to noisy and bloated markup.

* Broken support for gradients in SVG symbol-based sprites in Chrome and Safari that limits the kinds of SVG graphics you can use in sprites. See a demo: https://codepen.io/pepelsbey/pen/PwWmPZX

* I would like link parameters ASAP. There’s a dark mode bug in Safari that drives me crazy. https://bugs.webkit.org/show_bug.cgi?id=316640

* Better integration with CSS (e.g. using CSS gradients).

* Text layout! I have to resort to manually placing line breaks or other weird trickery.

  Sometimes I just want to put text in a box like I would with HTML.

* Missing: Changing the viewbox of an inlined SVG via CSS.

* `currentColor` (and bonus css custom props) when using them with the img tag, please.

* Animating SVGs. Sometimes the `<animate>` element is required but sometimes you can set `d: path(...)` in CSS and animate it.

  And it doesn’t work consistently. Had problems animating a graph in on load.

* No access from shadow-DOM to light-DOM hosted resources, for `<use>` and other same-doc href.

* My favorite is this from 2009

  It feels like Safari genuinely does not give sh… about anything or anyone https://bugs.webkit.org/show_bug.cgi?id=23113

* Still a missing feature, SVG Parameters: https://www.w3.org/TR/SVGParamPrimer/

* I’ve been frustrated by browser support for ARIA roles in SVG, especially the ARIA Graphics Module / AAM, and forced-colors / WHCM behavior across contexts (inline, embedded, referenced, via `<img>`). These have made accessible charts & graphs harder.

* Not releasing SVG 2.0 which was the version of SVG intended to make the use of SVG as an ARIA host language legit.

* Not sure if it is directly related, but it would be amazing to be able to control SVG more with CSS when one cannot embed the SVG directly in HTML. For example, when used as the value of `src` or as a background image in CSS.

* SVG custom elements and slot support has been on my wishlist for a long time.

</details>

