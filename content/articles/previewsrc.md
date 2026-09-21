---
layout: article.njk
title: Bringing image previews to the web platform
tags: article
date: 2026-09-20
excerpt: "Showing blurred previews while images are loading on the web is a very common pattern which we'd love to standardize at the platform level, so that all developers can use it with very little code and complexity. What do you think?"
thumbnail: "/assets/blurhash.png"
altText: "Two images side by side, on the left a blurry preview, on the right, the full image, showing the Louvre pyramid in Paris"
hideThumbnail: true
hasCode: true
draft: true
---

You've likely seen this common pattern in action already: a blurred version of an image appears immediately and then, a moment later, the full image replaces it.

![Two images side by side, on the left a blurry preview, on the right, the full image, showing the Louvre pyramid in Paris](/assets/blurhash.png)

This pattern has become so common that many image CDNs, frameworks, and libraries support it out of the box. But every implementation has to reimplement the same pieces:

* Fetch both the preview and final images.
* Display the preview while the final image loads.
* Swap the preview and final images.
* Clean up after the transition.

**We are [proposing](https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/ImagePreview/explainer.md) to make this a built-in capability of the web, and we'd love to know if this is worth pursuing and what the exact scope should be.**

Before diving into the proposal, let's first look at how this pattern is typically implemented today.

## How to do this today?

There's currently no standard way to provide a preview for an image, so the solution depends on the framework or library you are using.

For example, Next.js can generate a blurred placeholder when an image is imported, by using the [placeholder=blur](https://nextjs.org/docs/app/api-reference/components/image#placeholder) property:

```jsx
import mountain from "./mountain.jpg";

<Image src={mountain} alt="A mountain" placeholder="blur" />
```

Libraries such as [BlurHash](https://github.com/woltapp/blurhash) encode a tiny preview as a short string, which your application can then decode to show the preview while the real image is loading:

```js
// First, create blurhash strings for your images.
import { encode } from "blurhash";
async function encodeImageToBlurhash(width, height, imagePixelData) {
  return encode(imagePixelData, width, height, 4, 4);
};
```

```js
// At runtime, while the image is loading, decode the string to display a preview.
import { decode } from "blurhash";
const pixels = decode("<the blurhash string>", 32, 32);
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const imageData = ctx.createImageData(width, height);
imageData.data.set(pixels);
ctx.putImageData(imageData, 0, 0);
document.body.append(canvas);
```

You can also use your own custom implementation, for example by creating image previews at build-time, and sending them as data URLs to display as CSS background images while the final image is loading:

```html
<div class="image" style="background-image: url(data:image/png;base64,....)">
  <img src="image.jpg" alt="A mountain">
</div>
```

These approaches differ, but they all have to coordinate the preview and final image themselves.

## Why a native solution?

This preview effect is well established, and for good reasons. It allows your UI to come to life much sooner, giving the impression of a more responsive site which lets users access to the rest of the content while images are still loading.

The idea is not to change this pattern, but instead to implement it in the browser so that you don't need to write, maintain, **and** run as much code, and you can instead let the browser handle most of the complexity for you.

## What's in the proposal?

There are really three pieces to the pattern:

1. Load and display a preview image and replace it with the final image once it's ready.
1. Customize the transition between the preview and the final image (e.g. fade).
1. Support compact formats such as BlurHash directly.

Currently, our proposal is focused on the first piece only, and introduces a new attribute for the `<img>` element called `previewsrc`:

```html
<img previewsrc="tiny-blurry-preview.png" src="full-image.avif">
```

With the `previewsrc` attribute, the browser would:

* Load the preview and final images, always giving priority to the final image.
* Display the preview.
* Replace the preview with the final image when it becomes ready.

This already simplifies the process of handling image previews a lot because you don't need to use or write code to load the preview, handle cases where the preview doesn't exist or fail to load before the final image is ready, and handle the image swap yourself.

We'd love your feedback on this first piece. **Would you consider it a valuable addition to the web platform?**

As for the two other pieces, we're currently considering them as optional enhancements that could be added in the future, but your feedback on their importance would help us prioritize them. Let's review what they are next.

### Optional enhancements

* Making the swap between the preview and final images look nice, but letting you customize the transition.

  With our minimal proposal, when the final image becomes ready to paint, the browser directly replaces the preview with the final image.

  However, many sites today want a fade between the two images. So an option here would be to integrate the `previewsrc` attribute with View Transitions so you can customize the transition using CSS only.

* Supporting compact formats.

  BlurHash and ThumbHash are two libraries which generate very compact string representations of images. These strings are typically a lot smaller than regular image files, even when those files are small blurred previews.

  These strings are however not natively supported by browsers, and you must use client-side code to decode the strings into real images.

  So, another option would be for browsers to support these formats

**What constitutes a minimum viable implementation for you to use the `previewsrc` attribute?**

## Common questions

You might be wondering about the following questions, so let me provide some answers below.

### Doesn't a preview image create a second request?

Sure, if you set `previewsrc` to another image URL, then an additional network request will be made, which potentially will consume bandwidth. However, consider this:

- The final image loading would never be delayed by the preview.
- The browser would always treat preview loading as "best effort".
- The browser would assign a lower priority to preview fetches and decodes.
- The browser would, in fact, completely skip previews when they are unlikely to be useful.
- And you could still continue to use blurhash strings or data URLs for previews, avoiding a second network request altogether.

It's important top keep in mind that this is _not_ a replacement for proper image optimization, and not a performance feature.

### Does this avoid abuse?

It doesn't. There is actually no enforcement mechanism in the proposal for ensuring that developers use the `previewsrc` attribute responsibly.

The proposal depends on developer discipline, the same discipline they apply when using existing image preview techniques.

However, this is important: the browser may skip the preview altogether if it determines that it is unlikely to be useful before the final image is loaded or if resources are constrained. That's definitely a plus compared to today's solutions.

### Why not use progressive image delivery instead then?

JPEG images can be progressively delivered, whereby the image is loaded in multiple passes, gradually increasing in quality. This allows users to see a low-quality version of the image almost immediately, while waiting for the full-quality image to load.

In the end, this depends on your use case. A progressive JPEG may be preferable for sites where more fidelity is required, where seeing the real image, even if in low quality, is more important than having an instant, but very blurry preview.

Generally speaking, blurred placeholders seem to be favored for providing a quick visual indication, responsiveness, and layout stability. I feel like developers have mostly moved away from progressive images.

But also, not all sites generate progressive image versions at all.

### What about responsive images?

They keep working as before.

An `<img>` inside a `<picture>` element can still use the `previewsrc` attribute. The existing `<picture>`, `srcset`, and `sizes` algorithms continue selecting the final image.

## Would you use this?

Let us know how you feel about this [proposal](https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/ImagePreview/explainer.md).

Is the problem worth solving at the web platform level? What would consitute the minimal viable solution for you to adopt this API?

You can send your feedback by opening a new issue on our [GitHub repository](https://github.com/MicrosoftEdge/MSEdgeExplainers/issues/new?template=image-preview.md).
