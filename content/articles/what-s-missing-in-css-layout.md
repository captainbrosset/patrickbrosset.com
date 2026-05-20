---
layout: article.njk
title: "What's missing in CSS layout"
tags: article
date: 2026-05-20
excerpt: "An interpretation of the pain points and missing features which developers face with CSS layout, based on the 2025 State of CSS survey and a mini survey I ran on social media."
thumbnail: "/assets/missing-css.png"
altText: "Missing CSS"
---

I recently spent time asking for and reviewing feedback about CSS layout.

I'm interested in learning more about pain points which developers face with layout in CSS, and what they're missing.

For the first part, pain points, I went over the results of the [2025 State of CSS survey](https://2025.stateofcss.com/en-US/), and focused specifically on grid and flexbox, which are the topmost responses to the **Layout Pain Points** question.

For the second part, what's missing, I ran a mini survey of my own on [Mastodon](https://mas.to/@patrickbrosset/116596273406427954), [Bluesky](https://bsky.app/profile/patrickbrosset.com/post/3mm56qmgnjc2d), and [LinkedIn](https://www.linkedin.com/posts/patrickbrosset_css-webdev-activity-7462161545737785345-NOhd?utm_source=shareandutm_medium=member_desktopandrcm=ACoAAABm63wB9NIFWK7Z8l7ky8iGh6Y2nJRE5dY), asking people what they were missing in CSS layout.

Let's dive into my findings.

## CSS Grid pain points

This is my interpretation of the free-form responses on [Layout Pain Points - State of CSS 2025](https://2025.stateofcss.com/en-US/features/#layout_pain_points).

* **Learning grid**:

  * Grid is perceived as hard to learn, non-intuitive, and verbose.
  * Developers struggle to:
    * Remember syntax (`grid-template-*`, shorthands, long property names, complex shorthands).
    * Understand mental models (tracks, areas, implicit vs explicit grid, template areas vs columns/rows).
    * Know which properties apply to parent containers and children.
  * Naming inconsistencies (e.g., `justify-*` vs `align-*`, overlap with flexbox) add confusion and require frequent lookup even for experienced developers.

* **Using grid**:

  * Even simple layouts feel overly verbose.
  * Common real-world layouts are still hard:
    * Full-height layouts with scrollable areas.
    * Dashboards with fixed + fluid regions.
    * Carousels / sliders aligned to grid.
    * Reusable design systems.
    * Nested, CMS-driven content layouts.
  * Complex setups needed for:
    * Fluid grids.
    * Responsive column counts.
    * Auto-fitting layouts.
  * Developers struggle to decide:
    * When to use Grid vs Flexbox. Significant feature overlap but different mental models.
    * Which system is "correct" for a given layout.
  * Grid + flex + other layout modes interact unpredictably.
  * Common frustrations:
    * Centering remaining/last-row items.
    * Aligning items to arbitrary/global grid lines.
    * Handling gaps (styling, collapsing, consistency).
    * Spanning rows vs columns symmetry.
  * Poor integration with:
    * Container queries.
    * Subgrid across multiple levels.

* **Missing grid concepts**:

  * Grid doesn't "naturally wrap" like Flexbox.
  * "max column count with wrapping".
  * Intrinsic responsiveness without breakpoints.
  * Lack of selectors like: `:nth-column`, `:first-in-row`, `:last-in-row`.
  * Cannot easily animate:
    * Grid track sizes (especially `fr` to/from `px`).
    * Movement between grid cells.

* **Accessibility concerns**:

  * Visual reordering leads to differences with the DOM order.
  * Hard to reconcile layout flexibility with accessibility best practices.

* **Performance concerns**:

  * Nested grids without subgrid.

## Flexbox pain points

This is my interpretation of the free-form responses on [Layout Pain Points - State of CSS 2025](https://2025.stateofcss.com/en-US/features/#layout_pain_points).

* **Learning flexbox**:

  * Syntax is hard to remember and not "muscle memory friendly":
    * Frequent need to look up property combinations.
    * Trial-and-error is common even for experienced developers.
    * Feels verbose or unintuitive.
  * Direction and alignment mental model is confusing:
    * `flex-direction`, main axis vs cross axis hard to internalize.
    * `justify-*` vs `align-*` is non-obvious and direction-dependent.

* **Using flexbox**:

  * Flexbox is easy for basics but breaks down quickly for intermediate/advanced use.
  * Common real-world layouts are still difficult:
    * Responsive wrapping with dynamic content.
    * Sliders aligned to a grid system.
    * Consistent spacing across rows.
    * Large nested layout trees.
  * Centering remains harder than expected, especially partial or contextual alignment.
  * Sizing and shrinking behavior is unpredictable:
    * `flex-grow`, `flex-shrink`, `flex-basis` interactions are hard to reason about.
    * Items shrink below content size unexpectedly.
    * Hacks required: `min-width: 0`.
    * Equal-height / equal-width items in dynamic content are difficult.
    * Mixing fixed and flexible sizes doesn't work cleanly.
  * Developers struggle to choose between Flex and Grid:
    * Significant overlap but different capabilities and mental models.
  * Spacing and gap interactions: `flex-basis` + `gap` + margins interact inconsistently.
  * Overflow and height issues:
    * Flex containers not taking full height.
    * Nested flex layouts + scroll areas break easily.
    * Hard to get scrolling working without overflow bugs.
  * Mixing flex with other layout modes (grid, inline/block, intrinsic sizing) is hard to predict.

* **Missing flexbox concepts**:

  * Wrapping is limited:
    * No way to detect wrapping (no selector for rows/lines, can't react to wrap events).
    * Poor control over layout after wrap.
    * Widowed items, uneven rows, balancing content across lines.
    * No per-line alignment or styling control.
  * Gap decorations (lines between items).
  * Per-item spacing control.

* **Accessibility concerns**:

  * Visual reordering breaks logical/tab order (same as Grid).

* **Debugging**:

  * Hard to diagnose sizing issues or understand layout decisions.
  * Nested layouts are especially hard to debug.

## What's missing in CSS layout?

This is my interpretation of the responses to a question I asked on [Mastodon](https://mas.to/@patrickbrosset/116596273406427954), [Bluesky](https://bsky.app/profile/patrickbrosset.com/post/3mm56qmgnjc2d), and [LinkedIn](https://www.linkedin.com/posts/patrickbrosset_css-webdev-activity-7462161545737785345-NOhd?utm_source=shareandutm_medium=member_desktopandrcm=ACoAAABm63wB9NIFWK7Z8l7ky8iGh6Y2nJRE5dY), sorted by number of mentions.

1. **Overflow and wrap detection** (~12 mentions)

   No way to know, in CSS alone, when content overflows or wraps to a new line. People need to adapt layouts reactively (e.g. collapse nav items that don't fit, show a "+3" badge, add scroll affordances, style wrapped rows differently). Currently requires JS.

2. **CSS Regions / flowing content across elements** (~5 mentions)

   No way to have text content flow from one layout box into another (like InDesign linked text frames). Needed for editorial/article layouts with pull quotes, sidebars, multi-column magazine-style designs.

3. **CSS Exclusions and non-rectangular text wrapping** (~5 mentions)

   Cannot wrap text fully around an element (all sides), wrap inside a shape, or have text flow around elements with clip-paths/border-radii. Editorial layouts that print handles easily are impossible on the web.

4. **Repositioning elements independent of DOM structure** (~5 mentions)

   Cannot move an element to a different visual position without changing the DOM or duplicating markup. Needed for responsive reordering (e.g. TOC in sidebar on desktop, above content on mobile) and assigning children to grid areas across nesting boundaries.

5. **Content-aware grid sizing and spanning** (~3 mentions)

   Grid items can't automatically span columns based on their content size or snap to column edges. Developers resort to JS to calculate spans dynamically.

6. **Page/column floats** (~2 mentions)

   Cannot float an element to the top or bottom of a column or page/section — a basic print-layout feature missing from CSS.

7. **Anchor positioning extensions** (~2 mentions)

   Anchor positioning doesn't yet work relative to cursors, selected text, or text-line start/end positions.

8. **Shadow DOM / slot styling** (~2 mentions)

   New CSS features don't consider shadow DOM boundaries; no :has-slotted or proper slot-level layout control.

9. **Text fit-to-width / dynamic text scaling** (~2 mentions)

   No native way to scale text to fill its container width without JS hacks.

10. **Per-line flex-wrap control** (~2 mentions)

    Cannot apply different alignment or styles to individual wrapped lines in a flex container.

11. **Grid gap and empty cell styling** (~2 mentions)

    No way to style grid gaps or empty cells directly; requires extra wrapper divs.

12. **Other single mentions**

    * masonry layout
    * inline icon attachment to words
    * soft line-break indication
    * decimal-aligned columns
    * circular/polar layout
    * curved text
    * connectors/flow-chart arrows between boxes
    * mesh/non-linear transforms
    * safe-area-aware expansion
    * sticky table columns without JS
    * virtual keyboard viewport handling
    * border-offset
    * editable context menus

## Conclusion

There's a lot of things in this list that could lead to significant improvements for web developers. If I had to start with one, it would be overflow and wrapping detection, as it would unlock a lot of responsive design possibilities without needing JS.
