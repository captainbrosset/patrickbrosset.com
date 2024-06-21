---
layout: article.njk
title: Invasion of the border snappers
tags: article
date: 2024-06-21
hasCode: true
excerpt: "A look into how CSS pixels and device pixels differ, and why borders might not always be the width you expect them to be."
thumbnail: "/assets/border-snapping/invasion-of-the-body-snatchers.jpg"
altText: "A scene from the movie Invasion of the Body Snatchers, which this article's name is based on, as a play on words."
---

## CSS and device pixels

On the web, a CSS pixel might be different than a device pixel. While CSS lengths that are expressed in pixels can sometimes map directly to lengths on the device screen, this is not always the case. In fact, it's less and less the case.

CSS pixels, as a concept, are a way to abstract the physical pixels of the device screen. This is useful to deal with the wide variety of screen resolutions available today. One CSS pixel is not necessarily equal to one device pixel. For example, on the monitor that I'm using right now, the value of `window.devicePixelRatio` is `1.5`, which means that 1 CSS pixel is equal to 1.5 device pixels. This is a common value for high-density displays, but it can be different on other devices. For example, my iPhone has a `window.devicePixelRatio` value of `3`, where 1 CSS pixel is equal to 3 device pixels. If you think about it, this makes sense, you wouldn't want your button with `width:100px;` to look much smaller on a higher pixel-density screen than it does on a lower pixel-density screen.

## Enter the border snappers

This is all well and good, until your start using borders in CSS. In fact, what I'll describe next applies to the `border`, `outline`, and `column-rule-width` CSS properties.

When you specify a border width in CSS, the browser will try to render the border as closely as possible to the width you specified. However, in doing so, the browser may round the border width to the nearest device pixel value, which can result in borders that are slightly thicker or thinner than the width you wanted.

Let's take an example: `border: 1px solid black`.

On my 1.5 device pixel ratio monitor, this should result in a device pixel border of `1.5px`, right? After all, this is what happens for all other CSS properties that accept lengths, like `width`. However, what does happen instead is that the browser changes my authored length, when computing styles, to be `0.666667px` instead. Once multiplied by my 1.5 device pixel ratio, this results in a border that's exactly 1 device pixel wide, which is smaller than what I wanted.

Don't believe me? Take a look at the authored and computed styles values in DevTools:

![The Elements tool in Edge DevTools, showing the authored style value of 1px, and the computed style value of 0.666667px](/assets/border-snapping/computed-devtools.png)

Why does this happen? Because it was decided that borders (and outlines, and column rules) should look as crisp as possible. This is known as **border snapping** (hence the play on word for this article's title, based on the movie "Invasion of the body snatchers").

**Border snapping** is the process by which the browser engine changes the computed border width so that it aligns with the nearest device pixel value.

This behavior has been standardized recently in the [CSS Values and Units Module Level 4 spec](https://drafts.csswg.org/css-values-4/#snap-a-length-as-a-border-width), which you can find a discussion about in the 
[Define when border rounding happens, and to which properties it applies](https://github.com/w3c/csswg-drafts/issues/5210) GitHub issue, and all browsers have implemented this behavior.

Let's test this with this sample code:

```html
<style>
div {
  width: 100px;
  aspect-ratio: 1;
  box-shadow: inset 0 0 0 5px green;
  border: 5px solid blue;
  outline: 5px solid red;
}
</style>
<div></div>
```

The above example draws a single `<div>` element, which is `100px` wide and tall and has, from the inside out, a `5px` green inset shadow, a `5px` blue border, and a `5px` red outline.
On my 1.5 device pixel ratio monitor, in theory, this should result in a `150px` wide element, with a `7.5px` shadow, a `7.5px` border, and a `7.5px` outline. Here is the result:

![A div element with a 5px shadow, 5px border, and 5px outline](/assets/border-snapping/div.png)

The area that's inside the blue border is indeed `150px` in width and height. Now let's zoom in on the colored lines around the element:

![Zoomed in on the shadow, border, and outline](/assets/border-snapping/border.png)

* The green area, which corresponds to the shadow, is `5px * 1.5 = 7.5px` tall, as expected (note how the half pixel is rendered as a semi-transparent pixel).
* However, the blue and red areas, which correspond to the border and outline, are `7px` tall instead. This shows the border snapping behavior in action.

Here, the rendering engine decided to snap the `7.5` device pixel value to `7`, so that the border, and the outline, would appear as crisp as possible.

If your device's screen has a different device pixel ratio, you will see different results. Also, if your device pixel ratio is an integer, no snapping will need to occur. For example, on my iPhone, which has a device pixel ratio of `3`, the shadow, border, and outline would all be `15px` thick, and there would be no need to snap the border and outline values to the nearest device pixel.

## When can border snapping be a problem?

Border snapping is useful in that it helps us to create clean user interfaces, but it can sometimes cause confusion, as illustrated by this Stack Overflow question: [css border: 1px appear as 0.667px or 1px depending on the computer / display resolution (?)](https://stackoverflow.com/questions/42710882/css-border-1px-appear-as-0-667px-or-1px-depending-on-the-computer-display-res).

But, I've also seen cases where it became a layout problem. The scenario involved calculating an element's height based on various factors, including the thickness of the border. This was a problem because `height` is not subject to border snapping, but `border` is. So, if you're not careful and write something like `height: calc(3rem - 1px)`, assuming that the border will be `1px` thick, you might end up with a border that's `0.666667px` thick instead, on some devices, and therefore a broken layout.

If this ever happens to you, you can use the `box-sizing:border-box` on the element, which will include the border in the element's dimensions, and therefore avoid the problem altogether.
