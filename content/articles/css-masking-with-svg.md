---
layout: article.njk
title: Making puzzle pieces with CSS mask-image and SVG masks
tags: article
date: 2023-12-06
hasCode: true
excerpt: "What I learned by trying to draw puzzle pieces with CSS masking and SVG masks"
thumbnail: "/assets/css-svg-mask.png"
altText: "A mask drawing, with the words CSS and SVG where the eyes should be"
---

This week, I was working on a little demo page to learn more about CSS masking with SVG. The page is a puzzle game where each piece is a single DOM element, and is masked with an SVG mask, to give it the shape of a puzzle piece.

If you want to see the final result, you can check out the [demo page](/lab/2023-12-06-puzzle) (_warning_: this doesn't seem to work in all browsers. Use Firefox or Chrome/Edge 120+).

I won't go into the details of how the game works here. However, I found out the hard way about how to make the SVG masks work. So, I thought I'd share what I learned, in case it can help someone else.

### The SVG shapes

The first thing I did was to create the SVG shapes that I wanted to use as masks. I didn't want to waste too much time on this because this wasn't the main point of the demo. So I opted for a simple shape that I made by using one `<rect>` and 0 or more `<circle>` elements around it. Here are a few examples of the shapes:

<div style="background:black;padding:1rem;display:grid;gap:1rem;grid-template-columns:repeat(auto-fit, 100px);">
  <svg viewBox="0 0 80 80">
    <rect x="10" y="10" width="60" height="60" fill="white"></rect>
    <circle cx="40" cy="10" r="10" fill="white"></circle>
  </svg>
  <svg viewBox="0 0 80 80">
    <rect x="10" y="10" width="60" height="60" fill="white"></rect>
    <circle cx="40" cy="10" r="10" fill="black"></circle>
    <circle cx="70" cy="40" r="10" fill="white"></circle>
    <circle cx="10" cy="40" r="10" fill="white"></circle>
    <circle cx="40" cy="70" r="10" fill="white"></circle>
  </svg>
  <svg viewBox="0 0 80 80">
    <rect x="10" y="10" width="60" height="60" fill="white"></rect>
    <circle cx="70" cy="40" r="10" fill="white"></circle>
    <circle cx="40" cy="70" r="10" fill="white"></circle>
  </svg>
  <svg viewBox="0 0 80 80">
    <rect x="10" y="10" width="60" height="60" fill="white"></rect>
    <circle cx="40" cy="10" r="10" fill="black"></circle>
    <circle cx="40" cy="70" r="10" fill="white"></circle>
    <circle cx="10" cy="40" r="10" fill="white"></circle>
  </svg>
  <svg viewBox="0 0 80 80">
    <rect x="10" y="10" width="60" height="60" fill="white"></rect>
    <circle cx="40" cy="10" r="10" fill="black"></circle>
    <circle cx="40" cy="70" r="10" fill="black"></circle>
    <circle cx="70" cy="40" r="10" fill="black"></circle>
    <circle cx="10" cy="40" r="10" fill="black"></circle>
  </svg>
</div>

Each piece is a square, and each side of the square can either be flat (if it's a side of the puzzle), or have a little bump, or a little hole. I drew the bumps and holes with circles. Holes are black circles, so they blend in with the black background, giving the illusion of a hole. And bumps are white circles. We'll see later why these colors are important.

If you're wondering, there are 81 total possible shapes (3 possible states per side of a shape: either a flat surface, a hole, or a bump).

### The SVG masks

In order to be able to use the above shapes as masks from CSS, I needed to create SVG masks that could be accessed from CSS. I opted for just having the SVG code right in the document.

To make the masks available, I used the `<defs>` and `<mask>` elements, kind of like this (_don't copy this code just yet, we'll see later that there are two important things to change_):

```html
<svg>
  <defs>
    <mask>
      <rect x="10" y="10" width="60" height="60" fill="white"></rect>
      <circle cx="40" cy="10" r="10" fill="black"></circle>
      <circle cx="40" cy="70" r="10" fill="black"></circle>
      <circle cx="70" cy="40" r="10" fill="black"></circle>
      <circle cx="10" cy="40" r="10" fill="black"></circle>
    </mask>
    <mask>
      <rect x="10" y="10" width="60" height="60" fill="white"></rect>
      <circle cx="70" cy="40" r="10" fill="white"></circle>
      <circle cx="40" cy="70" r="10" fill="white"></circle>
    </mask>
    <!-- ... -->
  </defs>
</svg>
```

### Masks colors

I'm using the SVG shapes above as masks on DOM elements. A mask works by only allowing the parts of the element that are covered by the mask to be visible. For this to work, there needs to be information in the mask to say which parts of the element should be visible, and which parts should be hidden.

This is achieved by using colors. In my masks above, anything that's white will be visible, and anything that's black will be hidden.

### Mask IDs

There are a couple of ways to use the above masks from CSS. I could convert the SVG code to a data-uri, and use it inside a `url()` function in the CSS `mask-image` property.

But, it turns out I could also just refer to the ID of a mask element, if that element is available in the same document as the DOM elements I want to mask. Like this: `mask-image: url(#the-id-of-the-mask);`.

So, that's what I did. I added a unique  ID to each `<mask>` element like this:

```html
<svg>
  <defs>
    <mask id="mask-1">
      <!-- ... -->
    </mask>
    <mask id="mask-2">
      <!-- ... -->
    </mask>
  </defs>
</svg>
```

### Mask coordinates

This is the part that took me a long time to figure out. At first, I just couldn't see anything from the masked DOM elements, as if they were getting completely hidden by the masks.

I finally figured out that the masks needed to be in a particular coordinate system to map well to the target DOM elements. To do this, I needed to use the `maskContentUnits` attribute on the `<mask>` elements, and set all of the shapes' coordinates to be from `0` to `1` (instead of from `0` to `80` in my case).

Here's the new code:

```html
<svg>
  <defs>
    <mask id="mask-1" maskContentUnits="objectBoundingBox">
      <rect x="0.125" y="0.125" width="0.75" height="0.75" fill="white"></rect>
      <circle cx="0.5" cy="0.125" r="0.125" fill="black"></circle>
      <circle cx="0.5" cy="0.875" r="0.125" fill="black"></circle>
      <circle cx="0.875" cy="0.5" r="0.125" fill="black"></circle>
      <circle cx="0.125" cy="0.5" r="0.125" fill="black"></circle>
    </mask>
    <mask id="mask-2" maskContentUnits="objectBoundingBox">
      <rect x="0.125" y="0.125" width="0.75" height="0.75" fill="white"></rect>
      <circle cx="0.875" cy="0.5" r="0.125" fill="white"></circle>
      <circle cx="0.5" cy="0.875" r="0.125" fill="white"></circle>
    </mask>
    <!-- ... -->
  </defs>
</svg>
```

### Applying the mask to DOM elements with CSS masking

The final piece of the puzzle (pun intended) was to actually apply the SVG masks to my DOM elements. I did this by using the `mask-image` CSS property, like this:

```css
.piece-1 {
  mask-image: url(#mask-1);
}
.piece-2 {
  mask-image: url(#mask-2);
}
/* ... */
```

---

That's it for this short article. If you're ever in the same situation as I was, hopefully you'll find this article and it will save you some time!