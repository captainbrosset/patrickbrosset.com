---
layout: article.njk
title: "Blurry before beautiful: image previews for the web"
tags: article
date: 2026-09-21
excerpt: "Showing blurry previews while images are loading on the web is a very common pattern which we'd love to standardize at the browser level, so that all developers can use it with very little code and complexity. Let us know what you think!"
thumbnail: "/assets/blurry-beautiful.png"
altText: "Abstract illustration of a multi-color blur with a line passing through it, extending past the blur, with colored dots along it."
hasCode: true
draft: true
---

You've probably already seen this common pattern in action: blurry versions of the images of a site appear immediately and, moments later, their full versions replace them.

This pattern has become so common that many image CDNs, frameworks, and libraries support it out of the box. But every implementation has to do the same thing:

* Fetch both the preview and the final images.
* Display the preview while the final image loads.
* Swap the preview and final images.
* Clean up after the transition.

Below is an example of the effect, which shows a blurry preview image. Click the button below to load and display the final image:

<button>Load the final image</button>

<style>
  .image-preview-sample {
    padding: 1rem;
    border: 1px solid;

    img {
      margin: 1rem;
      margin-inline-start: 0;
      margin-block-start: 0;
      float: left;
    }

    p {
      line-height: 2;
      margin: 0;
    }

    &::after {
      content: "";
      display: table;
      clear: both;
    }
  }
</style>
<div class="image-preview-sample">
<img src="/assets/blurhash-preview.png" alt="The Louvre pyramid in Paris.">
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum volutpat accumsan tristique. Phasellus sit amet mauris odio. Aenean urna felis, laoreet vel ipsum ut, dignissim fermentum mi. Fusce posuere efficitur laoreet. Donec lacinia massa cursus eros ultrices maximus. Proin sit amet vestibulum nibh. Nulla luctus eleifend nisl. Aliquam vel orci a nisl maximus bibendum ut sit amet turpis. Curabitur sodales risus placerat nulla congue bibendum. Aliquam ut mi et dui efficitur semper. Donec tempus nibh eget est aliquet bibendum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
<script>
const btn = document.querySelector("button");
const img = document.querySelector(".image-preview-sample img");
function displayPreview() {
  img.src = "/assets/blurhash-preview.png";
}
function displayFinal() {
  img.src = "/assets/blurhash-final.png";
}
btn.addEventListener("click", () => {
  displayPreview();
  setTimeout(() => {
    if (!document.startViewTransition) {
      displayFinal();
      return;
    }
    // With View Transitions:
    const transition = document.startViewTransition(() => {
      displayFinal();
    });
  }, 500);
});
</script>
</div>

**We are [proposing](https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/ImagePreview/explainer.md) to make this a built-in capability of the web, and we'd love to know if this is worth pursuing and what the exact scope should be.**

Before diving into the proposal, let's take a look at how this pattern is typically implemented today.

## How to do this today?

There's currently no standard way to provide a preview for an image, so the solution depends on the framework or library you're using.

For example, Next.js can generate a blurred placeholder when an image is imported, by using the [placeholder=blur](https://nextjs.org/docs/app/api-reference/components/image#placeholder) property:

```jsx
import mountain from "./mountain.jpg";

<Image src={mountain} alt="A mountain" placeholder="blur" />
```

Libraries such as [blurhash](https://github.com/woltapp/blurhash) encode a tiny preview as a short string, which your application can then decode to show the preview while the real image is loading:

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

You can also use write your own custom implementation, for example by creating image previews at build-time, and sending them as data URLs used in CSS background images, while the final image is loading:

```html
<div class="image" style="background-image: url(data:image/png;base64,....)">
  <img src="image.jpg" alt="A mountain">
</div>
```

These approaches differ, but they all have to coordinate the preview and final image themselves.

## Why a native solution?

This preview effect is well established, and for good reasons. It allows your UI to come to life much sooner, giving the impression of a more responsive site which lets users access the rest of the content while images are still loading.

We don't want to change this pattern, but instead implement it in the browser so that you don't need to write, maintain, **and** run as much code. With a solution that's built-in, you let the browser handle most of the complexity.

## What's in the proposal?

For now, our proposal focuses only on loading, displaying, and replacing the preview image. To achieve this, we propose to introduce a new attribute for the `<img>` element called `previewsrc`:

```html
<img previewsrc="tiny-blurry-preview.png" src="full-image.avif">
```

With the `previewsrc` attribute, the browser would:

* Load the preview and final images, always giving priority to the final image.
* Display the preview.
* Replace the preview with the final image when it becomes ready.

This already simplifies the process of handling image previews a lot because you don't need to use or write code to load the preview, handle cases where the preview doesn't exist or fails to load before the final image is ready, and handle the image swap yourself.

We'd love your feedback on this first piece: **do you consider this a valuable addition to the web platform, and would you use it?**

If you're using a library or framework to handle previews, your solution might already handle the following additional features:

1. Customize the transition between the preview and the final image, for example by adding a fade effect.
1. Support compact formats such as blurhash directly.

We're currently considering them as optional enhancements that could be added in the future, but your feedback on their importance would help us prioritize them. Let's review what they are next.

### Optional enhancements

* Making the swap between the preview and final images look nice, by letting you customize the transition.

  With our minimal proposal, when the final image becomes ready to paint, the browser directly replaces the preview with the final image.

  However, many sites today want a fade between the two images. So an option here would be to integrate the `previewsrc` attribute with View Transitions API to let you customize the transition using CSS.

* Supporting compact formats.

  [blurhash](https://github.com/woltapp/blurhash) and [thumbhash](https://github.com/evanw/thumbhash) are two libraries which generate very compact string representations of images. These strings are typically a lot smaller than regular image files, even when those files are small blurry previews.

  However, the strings are not supported by browsers, and you must use client-side code to convert the strings to real images.

  Therefore, another option would be to add browser support for these formats.

We'd love your feedback on this: **would you use `previewsrc` alone, or would you require support for these optional enhancements (and if so, which ones) before adopting it?**

## Let us know!

Let us know how you feel about this [proposal](https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/ImagePreview/explainer.md).

Is the problem worth solving at the web platform level? What would consitute the minimal viable solution for you to adopt the API?

Please send your feedback by opening a new issue on our [GitHub repository](https://github.com/MicrosoftEdge/MSEdgeExplainers/issues/new?template=image-preview.md).

---

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

