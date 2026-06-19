---
layout: article.njk
title: Alignment in CSS Grid Lanes
tags: article
date: 2026-06-19
hasCode: true
excerpt: "One part of CSS Grid Lanes I didn't talk about during my presentation at CSS Day is how alignment works. In this article, let's quickly go over how alignment will eventually work in CSS Grid Lanes."
thumbnail: "/assets/grid-lanes-alignment.png"
altText: "Small thumbnail versions of the alignment diagrams in this article."
---

Last week, at [CSS Day](https://cssday.nl/), I [presented](/slides/CSSDay-2026/) on the topic of CSS Grid Lanes, an exciting new CSS layout feature coming to the web.

One part, which I _didn't_ talk about during the presentation, is how alignment works in CSS Grid Lanes. The reason I didn't talk about it is that alignment is still being implemented in Chromium, and after some quick testing, I believe it's also not fully implemented in Safari.

In this article, let's quickly go over how alignment will eventually work in CSS Grid Lanes.

## Two axes of alignment

Like in other layout systems, there are two axes to consider when aligning items in Grid Lanes, and the way we refer to them isn't very intuitive, at least to me, so let's go over them quickly:

* The _grid_ axis

  That's the axis along which the lanes are laid out. In a column-orientation grid lanes layout (and assuming a left-to-right, top-to-bottom writing mode), this axis is horizontal.

* The _stacking_ axis

  That's the axis along which the items are stacked within a lane. In a column-orientation grid lanes layout (still assuming a left-to-right, top-to-bottom writing mode), that's the vertical axis.

This diagram of a column-orientation layout should help clarify the two axes:

![A 3 column grid lanes layout, going down. The grid axis is horizontal. The stacking axis is vertical.](/assets/grid-lanes-axes.png)

## Grid axis alignment

Let's first align things along the grid axis. Sort of easy, because this works exactly the same as in a regular CSS Grid layout.

Who am I kidding though, who can even remember whether to use `justify-*` or `align-*`? Well, here it is:

* To align a column-orientation grid lanes layout along the grid axis, use `justify-*`.
* To align a row-orientation grid lanes layout along the grid axis, use `align-*`.

Said differently, use `justify-*` to align horizontally, and `align-*` to align vertically.

And then, it depends on what you want to do:

* Either align the _entire_ grid lanes layout, in which case you use the `-content` suffix for these properties.
* Or, align the _items_ within their lanes, in which case you use the `-items` suffix (or the equivalent `-self` suffix on the individual items).

### Aligning the entire layout

For example, let's imagine a column-orientation layout, and let's say we want to align the entire set of grid lanes to the center of the container:

```css
.layout {
  /* Create the layout. */
  display: grid-lanes;
  
  /* Create the column lanes. */
  grid-template-columns: 20rem 1fr 10rem 100px;

  /* Center the set of lanes in the container. */
  justify-content: center;
}
```

![3 column grid lanes layout in a container that's wider than the lanes. The lanes are centered in the container, with red arrows showing that there's an equal amount of space to either sides of the lanes.](/assets/grid-lanes-justify-content.png)

For a row-orientation layout, the equivalent would be to use `align-content` instead of `justify-content`.

### Aligning items within their lanes

Now, if you instead want to align each individual item within its lane, you would use `justify-items`. For example, to align items to the right (or end) of their lanes, you would do this:

```css
.layout {
  /* Create the layout. */
  display: grid-lanes;
  
  /* Create the column lanes. */
  grid-template-columns: 20rem 1fr 10rem 100px;

  /* Center the items in their lanes. */
  justify-items: end;
}
```

![3 column grid lanes layout where items are stuck to the right edge of their lanes, which is highlighted in yellow.](/assets/grid-lanes-justify-items.png)

To do the same in a row-orientation layout, you would use `align-items` instead of `justify-items` here.

Note that you can also use `justify-self` (or `align-self` in a row-orientation layout) on individual items to override the alignment for that specific item.

For example, let's say we want the first item to always stretch instead of being aligned to the right, we could do this:

```css
.layout {
  /* Same as above, aligning all items to the right */
  display: grid-lanes;
  grid-template-columns: 20rem 1fr 10rem 100px;
  justify-items: end;
}

.layout > *:first-child {
  /* Override the alignment for the first item. */
  justify-self: stretch;
}
```

And we'd get this:

![3 column grid lanes layout where the first item stretches to fill its lane, while the other items are stuck to the right edge of their lanes.](/assets/grid-lanes-justify-self.png)

## Stacking axis alignment

Now on to alignment along the stacking axis. This is where things will become more interesting because grid lanes has a magic feature that will allow you to fill leftover space, if any.

But first, let's review the alignment properties you'll be using along the stacking axis:

* To align a column-orientation grid lanes layout along the stacking axis, use `align-*`.
* To align a row-orientation grid lanes layout along the stacking axis, use `justify-*`.

Said differently, use `align-*` to align vertically, and `justify-*` to align horizontally. Hey, that's the same as for grid axis alignment! So, again, assuming left-to-right, top-to-bottom writing mode, alwauys use `align-*` to align vertically, and `justify-*` to align horizontally.

### Aligning the entire layout

Nothing too special here, this is similar to the other (grid) axis: you can align the entire layout within its container, along the stacking axis, if there's space to do so.

For example, to align a column-orientation layout to the center of its container, you would do this:

```css
.layout {
  /* Create the layout. */
  display: grid-lanes;
  
  /* Create the column lanes. */
  grid-template-columns: 20rem 1fr 10rem 100px;

  /* Center the layout vertically in the container. */
  align-content: center;
}
```

Which would give you this:

![3 columns grid lanes layout, in a slightly taller container, the items are centered vertically, with red arrows at top and bottom to highlight the centering.](/assets/grid-lanes-align-content.png)

For a row-orientation layout, the equivalent would be to use `justify-content` instead of `align-content`.

### Aligning items within their lanes

And now here is the really interesting part, aligning individual items along the stacking axis.

At first sight, this might seem surprising. After all, CSS Grid Lanes fills any available space along the stacking axis. That's the whole point, right? When a lane is shorter than the other lanes, the next item to be placed goes in that lane, filling the space. So, when can you end up with leftover space in a lane? Well, here are two ways:

1. When you start spanning items across multiple lanes, that might create gaps in the layout, where no items can be.

   ![3 columns grid lanes layout, one item spans 2 columns, some empty space above this item in column 2.](/assets/grid-lanes-empty-space-spanning.png)

2. Once all items have been placed, you usually end up with a ragged end edge, with some lanes taller than others.

   ![3 columns grid lanes layout, with a ragged bottom edge, with empty space highlighted at the bottom of columns 1 and 3.](/assets/grid-lanes-empty-space-end.png)

What stacking axis alignment allows you to do is fill that gap!

For example, in a column-orientation layout, with some gap above a spanning item, you could set `align-items: stretch` to force all items to fill the remaining space in their lanes:

```css
.layout {
  /* Create the layout. */
  display: grid-lanes;
  
  /* Create the column lanes. */
  grid-template-columns: 20rem 1fr 10rem 100px;

  /* Stretch items to fill their lanes. */
  align-items: stretch;
}

.large-item {
  /* Make one of the items span 2 columns. */
  grid-column: span 2;
}
```

Which would give you this, effectively filling the gap above the spanning item with the item above it, and filling the rest of the lanes with the bottom items:

![3 columns grid lanes layout, one item spans two columns, but the empty space is filled by an item above.](/assets/grid-lanes-fill-gap.png)

Again, this is for a column-orientation layout. For a row-orientation layout, you would use `justify-items: stretch` instead of `align-items: stretch`.

And with this, I think we've covered all the alignment options in CSS Grid Lanes. I hope this article has helped clarify how things work in this new layout.

Last thing, my team at Microsoft Edge tells me they're very close to getting alignment working in all cases, in Chromium, so I'm very excited by the possibilities, and will probably be posting demos about this in the future. Stay tuned!
