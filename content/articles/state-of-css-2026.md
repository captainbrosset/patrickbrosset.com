---
layout: article.njk
title: State of CSS 2026
tags: article
date: 2026-08-07
excerpt: "The results to the State of CSS 2026 survey are now available. Here's my summary from the parts of the survey that are most relevant to my work on the web platform."
thumbnail: "/assets/stateofcss26.avif"
altText: "State of cSS 2026 logo"
---

The [results to the State of CSS 2026 survey](https://2026.stateofcss.com/en-US) are now available. Here's my summary from the parts of the survey that are most relevant to my work on the web platform. My findings are almost entirely based on the free form comments which developers left in the survey.

## Features developers love

Before we get all depressed and dive into pain points and missing features, let's start with some positive stuff.

### Favorite new features

([Results](https://2026.stateofcss.com/en-US/usage/#favorite_new_features))

Developers really like the following new CSS features:

* **Anchor positioning**

  Not surprising, knowing how much positioning and layout pain this feature removes.

* **:has()**

  Funny how developers still consider this feature to be _new_, considering that it's been available across all browsers since 2023. But that's not surprising, considering how long developers tend to wait before adopting new features.

* **Container size queries**

  A revolution to responsive design, giving you much more flexibility and control than simply the size of the viewport. Components can now adapt to their surroundings.

  Again, this feature has been available since 2023, so not _that_ new anymore, but still a favorite.

* **CSS nesting**

  This one also gained cross-browser support in 2023. (Was 2023 an exceptional year? Or is it that 3 years is how long it takes for developers to discover and adopt features?)

* **Grid**

  Talk about old features! This one has been supported by all major engines since 2017. But it still made the list of favorite new features. A testament to how much developers love this mature layout system and its responsive powers.

  Beyond grid, many of the responses suggest that people actually like the following newer grid-related features:

  * Subgrid.
  * Grid lanes, which you might know better as Masonry layout. Interest is emerging! (Check out my [talk](https://patrickbrosset.com/slides/CSSDay-2026/).)

### Most loved features

([Results](https://2026.stateofcss.com/en-US/features/#all_features))

Based on sentiment, here are the features which developers love the most, new or not, and why:

* **:has()**

  * Game-changing and long-awaited.
  * Enables powerful parent- and state-based styling patterns.
  * Reduces the need for JavaScript.
  * Useful to solve complex UI, layout, focus, and dynamic styling problems.

* **CSS nesting**

  * Also game-changing and long-awaited.
  * Improves readability, organization, and maintainability.
  * Reduces the need for Sass/SCSS.

* **aspect-ratio**

  * Incredibly useful for consistent proportions without needing to specify both width and height.
  * Simplifies responsive image and media sizing (replacing older JS, `calc()`, and pseudo-element workarounds).
  * Very powerful relative to how little code it requires.

* **calc-size()**

  * Finally solves CSS sizing and animation problems that used to require JS.
  * Makes it possible to transition to intrinsic sizes.
  * Cleaner alternative to common hacks like animating `max-height`.

* **Anchor positioning**

  * Game-changing and long-awaited for tooltips, menus, dropdowns, popovers, and other floating elements.
  * Enables powerful, creative UI patterns.
  * Replaces complex JS positioning libraries and workarounds.

## Pain points

Enough of the good stuff, let's go to pain points, and see what needs improving in the CSS ecosystem.

### Layout pain points

([Results](https://2026.stateofcss.com/en-US/pain-points/#layout_pain_points))

* **Grid**

  * Overly complex and unintuitive, requiring cheat sheets to remember syntax.
  * Choosing between Grid and Flexbox is confusing.
  * Subgrid is a pain point (limited capabilities, difficult debugging, and browser support concerns).
  * Still hard to build layouts, especially when dealing with variable content, centering incomplete rows, fluid sizing, spans, and layouts that would otherwise require media queries.
  * Developers want better interoperability, grid-lanes support, non-rectangular layouts, gap/border styling, animation, and reading-flow integration.

* **Flexbox**

  * Hard to remember and reason about Flexbox's alignment model (shifting meaning of `align-*`, `justify-*`).
  * Missing wrapping support: developers want `flex-wrap: balance` and selectors for wrapped rows or first/last items in a row.
  * Choosing between Grid and Flexbox is confusing.
  * Complex responsive layouts require hacks, nesting, extra DOM, etc.

* **Element sizing**

  * Height sizing is the biggest pain point (making elements fill available space, handling dynamic/auto heights, and avoiding the need for ancestor height chains, or JavaScript workarounds).
  * Hard to create layouts that size correctly based on content, balancing intrinsic sizing, min/max constraints, responsive behavior, and preventing wrapping or overflow.
  * `aspect-ratio` is unreliable, difficult to understand, and inconsistent across browsers.
  * Animating between fixed and auto sizes is hard (limited support for features like `calc-size()` and `interpolate-size()`).

* **Interop issues**

  * The main pain point is inconsistent browser support and behavior.
  * Developers are frustrated that many modern layout features are not yet Baseline.
  * Anchor positioning is a source of frustration due to missing support and browser-specific bugs.
  * Other examples developers mentioned include grid-lanes, style queries, `calc-size()` and `interpolate-size()`, subgrid, `margin-trim`, and `flex-wrap: balance`.

* **Cognitive overload**

  * The sheer number of layout systems, properties, units, and new features is overwhelming.
  * The growing number of ways to solve similar layout problems creates confusion.

These pain points are consistent with my earlier article: [What's missing in CSS layout](/articles/2026-05-20-whats-missing-in-css-layout/).

### Shapes and graphics pain points

([Results](https://2026.stateofcss.com/en-US/pain-points/#shapes_graphics_pain_points))

* **SVG**

  * SVG and CSS don't integrate easily, making SVG difficult to style or theme (especially for external SVGs).
  * The syntax for SVG paths, shapes, and points is complex to write and maintain.
  * Sizing and aligning embedded SVGs is hard.
  * Interop is a major pain point with developers repeatedly calling out Safari-specific issues, inconsistent support, and differing SVG implementations across browsers.

  See also my early article [What's missing from SVG](/articles/2026-06-22-whats-missing-from-svg/).

* **Complex element shapes**

  * It's still hacky to create non-rectangular shapes, often requiring combinations of clip-path, pseudo-elements, transforms, SVG, etc.
  * There's a need for arbitrary border shapes and borders that correctly follow custom shapes (`border-radius` and `corner-shape` are too limited).
  * Custom shapes can break with responsive resizing, scaling, zooming, etc.
  * Developers need better support for text flow inside shapes (`shape-inside`) and support for `shape-outside` beyond floated elements.
  * Authoring (and maintaining) complex shapes is difficult.
  * Rendering quality isn't always great: incorrect shadow or border rendering, aliasing, blurry edges, seams, etc.
  * Interop is, unsurprisingly again, an issue: newer features like `corner-shape`, `border-shape`, `text-box-trim`, and SVG capabilities are not implemented everywhere and consistently.

* **Other**

  * Poor cross-browser support and interoperability for graphics and shape is the main pain point.
  * Graphics and shapes APIs are perceived as complex with a steep learning curve.
  * Syntax is hard to remember, especially for `clip-path`, `shape()`, gradients, and SVG paths.
  * Developers tend to rely on external tools, or SVG, instead of writing CSS shapes directly.

### Colors pain points

([Results](https://2026.stateofcss.com/en-US/pain-points/#colors_pain_points))

* **Accessibility**

  * Ensuring enough color contrast between foreground and background colors requires manual checks and tools.
  * It's hard to maintain that contrast in dynamic contexts too (dark/light themes, user-selected colors, gradients, etc.)
  * Strong demand for built-in support for accessible contrasting colors.

* **Theming**

  * Supporting light/dark mode is difficult, developers struggle to work with system preferences, manual theme selection, and duplicated theme definitions.
  * Devs want native support for more than two themes.
  * Managing color palettes, tokens, variables, and design-system scales is hard.

* **Relative colors**

  * Devs want built-in support for related colors (shades, tints, hover/focus states, etc.) without needing a preprocessor or `color-mix()`.
  * Relative color syntax is difficult to remember, verbose, and error-prone.
  * Gaps in browser support slow down adoption of relative colors.

* **Color spaces**

  * OKLCH is powerful but more difficult to understand and use than RGB or HSL.
  * Out-of-gamut color handling is a big pain point.
  * Browser support is, again, a barrier.
  * Converting between color spaces is painful, which is needed when designers, tools, and codebases don't agree on spaces.
  * Tooling lags behind new color models.

* **Other**

  * Uneven browser support for modern color features.
  * Devs struggle with fallbacks and progressive enhancement.
  * Devs feel overwhelmed with the many new color spaces, formats, functions, and options.
  * Understanding newer color spaces and their trade-offs, particularly OKLCH and wide-gamut workflows is difficult.
  * The syntax is verbose, inconsistent, and difficult to remember.

## Browser incompatibilities

([Results](https://2026.stateofcss.com/en-US/usage/#css_interoperability_features))

Browser incompatibility already appeared in the pain points above, but there's also a specific section in the survey about it. Let's take a look at the features which developers mentioned as being blocked by browser support issues, and why.

* **Anchor positioning**

  * Missing browser support (with Firefox mentioned a few times).
  * Inconsistent browser support (Firefox marker-related failures, transform-related issues, Safari performance problems, and general differences or edge-case bugs).

* **View transitions API**

  * Inconsistent browser support: devs mention Firefox lagging on newer capabilities and Safari-specific bugs.
  * Problems when combined with other features like Navigation API, scrolling, and SPA/MPA navigation scenarios.

* **if() and @function**

  * Missing browser support (Safari and Firefox).

* **Scroll-driven animations**

  * Missing browser support (Firefox).

  This feature is actually part of the [Interop 2026 project](https://wpt.fyi/interop-2026?feature=interop-2026-scroll-driven-animations), and Firefox's passing score has been increasing steadily since the beginning of the year. Let's cross fingers that the feature ships in Firefox before the end of 2026.
  
## Missing features

([Results](https://2026.stateofcss.com/en-US/usage/#css_missing_features))

Below are the top features which developers said were missing from CSS.

Note that this question was free-form, so respondents were free to mention anything, including features that don't exist yet. Of course, inventing a new feature for a problem you have is very hard, so the top answers are things that are already coming to the web. But I do think we need more of this kind of feedback, low barrier, no constraints, just kind of "if you had a magic wand, what would you add". Food for thought for our community to put new feedback mechanisms in place.

* **Mixins**

  * Devs want to reuse groups of declarations without duplication.
  * Devs want this popular capability from Sass in CSS.
  * This is seen as improving modularity and maintainability and making large codebases easier to manage.

  This feature has been in the top 3 list for a few years, so I'm really happy that my team at Microsoft Edge is working on it now.

* **Form element styling**

  * Devs want full control over elements such as inputs, selects, date pickers, color pickers, file inputs, checkboxes, number spinners.
  * Currently, devs often have to replace them with custom widgets, using JavaScript and fragile tricks (especially for more complex widgets like autocomplete, autosuggest, combobox, or searchable fields).
  * Devs want to retain native functionality while customizing appearance (styling internal parts of controls, customizing default text/placeholder, theming icons, exposing additional pseudo-elements, etc.)

* **Animations**

  * Devs want more capable cross-page and in-page transitions.
  * Devs want to animate layout changes directly (grid changes, element resizing, opening/closing UI components) without JS.
  * Many want to animate elements as they appear or disappear (transitions from `display:none`, removal from the DOM, `<details>`, dialogs, and popovers).
  * Requests for animation sequences, triggers, chaining, presets.

* **Typography**

  * There's strong demand for better text truncation and overflow control (start or middle truncation, appending custom content such as "Read more", and CSS hooks to detect when truncation actually occurred).
  * Devs want text that automatically fills a container (`text-fit`).
  * There's a need for simpler fluid typography primitives, to make responsive type scales easier to write.
  * Devs also want better control for vertical rhythm, baseline alignment, and fallback font metrics.
  * Additional capabilities: text on a path, gradient text without background-clipping hacks, custom text-transform rules, and new selectors like `:nth-col` and `:nth-row`.

* **Layout**

  * The most common request is for native masonry layouts (aka Grid Lanes).
  * Devs also want grids that adapt more naturally to available space, similar to Flexbox.
  * There's a need for layouts that work when the amount, size, or shape of content is unknown in advance.
  * Also content flowing between grid cells.
  
* **Control flow**

  * To avoid writing the same selectors, custom properties, or rules over and over with only small variations.
  * To replace common preprocessor use cases.
  * To generate design-system tokens dynamically.
  * To enable more powerful styling based on media queries, feature support, and other conditions.
  * And to improve maintainability and scalability.

## Conclusion

As always, lots of things to improve. Thanks to Sacha Greif ([Devographics](https://www.devographics.com/)) for running these surveys. They keep providing valuable insights that help us steer the web platform in the right direction.

A few meta observations:

It's always saddening to see so much pain being felt by developers with _existing_ features that have shipped a long time ago. These features, such as Grid or relative colors, are much harder to change now that they're part of the platform. That goes to show how valuable it is to get early testers and people giving feedback during the early steps of the design process, before a feature ships. That's why we must keep shipping experiments instead of working on specs in a vacuum.

I'm hopeful though, that for every negative sentiment with a feature, there's 10 times as many positive experiences that are just not being reported. Even this survey shows this duality, with features like anchor positioning being mentioned as both a favorite new feature and most loved feature, and a big pain point.

The other thing worth concluding on here is that interoperability is still the biggest pain point, across the board. I mean, the web is a multi-vendor platform, so of course we can never have 100% interoperability for everything. In fact, it's by design that browsers are allowed to experiment with new features, test them and get feedback, so that we can keep pushing for a better, more capable, platform. We must keep filling the pipe with new features, because user and developer needs always evolve. Over time, these features can become standards, and eventually interoperable, based on actual usage and feedback.

It does mean, though, that developers living on the edge feel the pain of having to deal with inconsistent support.

But! Use [Baseline](https://web-platform-dx.github.io/baseline/) to your advantage, to simplify the decision making process for using a feature. But [don't consider it a ceiling either](https://bsky.app/profile/patrickbrosset.com/post/3msgkfpujzc2m). Go and use those bleeding edge features as progressive enhancements, and let us know what works!

And also, [the Interop project](https://wpt.fyi/interop) is a great way to push for better interoperability. I will definitely be sharing the above with my teams and will use it to make good cases for focus area proposals for Interop 2027. And you should too! Whenever [the window for submitting proposals opens](https://github.com/web-platform-tests/interop/blob/main/2027/selection-process.md), go and ask for your favorite features to be part of the next Interop project, and back it up with good arguments and data.
