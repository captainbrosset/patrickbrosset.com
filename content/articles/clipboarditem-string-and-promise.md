---
layout: article.njk
title: Constructing ClipboardItems from strings and Promises
tags: article
hasCode: true
date: 2025-02-12
excerpt: "Starting with Edge and Chrome 133, it's now a bit easier to work with the Clipboard API, as you can now pass strings and Promises directly to the ClipboardItem constructor. This quality of life improvement brings Chromium up to par with other browsers."
thumbnail: "/assets/clipboard.png"
altText: "A clipboard"
---
If you need to work with the system clipboard in your web app, either to read from or write to it, or both, then the [Async Clipboard API](https://developer.mozilla.org/docs/Web/API/Clipboard_API) is your friend. It makes it easy to read or write to the system clipboard, by using modern promise-based methods, and respecting the user's permissions.

One thing just changed in Chromium-based browsers that's worth calling out. Up until this point, browsers such as Chrome or Edge only allowed `Blob` objects to be written to the clipboard. This is how you would typically write text into the clipboard:

```js
const blob = new Blob(["Hello world!"], { type: "text/plain" });
const item = new ClipboardItem({ "text/plain": blob });

navigator.clipboard.write([item]).then(() => {
  console.log("Copied to clipboard");
});
```

Even for simple plain text scenarios, you must first create a `Blob` object. That's not an issue when dealing with other type of data, such as when copying an image or a file. But for plain text, it's a bit of a hassle.

## Creating ClipboardItems from strings

Now, starting with Chrome 133 and Edge 133, you can simplify this code a little bit and just pass a string:

```js
const item = new ClipboardItem({ "text/plain": "Hello string!" });

navigator.clipboard.write([item]).then(() => {
    console.log("Copied to clipboard");
});
```

This might seem like a small change, but it's a nice quality of life improvement, and it brings Chromium up to par with other browsers, therefore improving interoperability.

## Creating ClipboardItems from promises

But that's not all, the spec also allows for Promises to be passed to the `ClipboardItem` constructor, and this now also works in Chromium:

```js
async function fetchSomeText() {
  // Imagine this method asynchronously returns some text content,
  // perhaps from a server, using fetch().
  // For the sake of this sample code, let's just return the text now.
  return "Hello async!";
}

const item = new ClipboardItem({ "text/plain": fetchSomeText() });

navigator.clipboard.write([item]).then(() => {
  console.log("Copied to clipboard");
});
```

This might be very useful in cases where you need to fetch some content from a server first. The Promise you pass when constructing the `ClipboardItem` can resolve to a string or a `Blob`.

That's it for today, happy clipboarding!
