---
layout: main-layout.njk
subtitle: articles
pagetitle: How I built an Eye Dropper browser extension
tags: article
---
<link href="https://unpkg.com/prismjs@1.20.0/themes/prism-okaidia.css" rel="stylesheet">

## How I built an Eye Dropper browser extension

<time datetime="2021-11-24">November 24th, 2021</time>

<img alt="The eyedropper icon" src="/assets/eyedropper-icon.png" class="mini">

I recently [wrote about the EyeDropper API](https://web.dev/eyedropper/), this great new little JavaScript API that allows users to pick colors from anywhere on their screens.

In a few words, by executing just a couple of JS lines of code, web devs can make an eye dropper tool appear, letting users click on a pixel, and the color of the pixel is returned to the code, for the devs to use.

The API was implemented in Chromium-based browsers, including Edge and Chrome, in version 96. This version is now available to all! No need to install a pre-release channel of the browser, or turn on any flags. You can just use it! Of course, this is only Chromium, so don't rely on it in production just yet, but it's definitely a great time to experiment with it.

Back when I worked on the article, I got interested in whether the API would also work in browser extensions, which it does! So I built a small extension that lets you grab colors from your screen, and store them locally for later reuse. It's great to build a color palette from an image for example, and always have those colors handy.

➡️ **Get the extension [here](https://chrome.google.com/webstore/detail/eye-dropper/fjnpfdnpkpdccebgadceaieifiiblabh) (for both Chrome and Edge)** (it's for Chromium-browsers only for now because [the EyeDropper API only works there](https://caniuse.com/?search=eyedropper)).

➡️ **And browse [the source code](https://github.com/captainbrosset/eye-dropper-ext).**

![Gif demo of the eyedropper browser extension](/assets/eyedropper-demo.gif)

There are of course other existing software that do this, but since web developers spend most of their time in the browser, I figured having an icon right there, in the browser toolbar, would be quite handy. After using myself for a while, I have to say it is very useful, at least to me.

Now, let's dive into some of the interesting details behind this extension.

### Building a browser extension

If you're interested in building one, but don't quite know where to start, I think the most important thing to know is that they're built using HTML, CSS, and JavaScript! So you can reuse the knowledge you already have.

There's a bunch of specific extension stuff added on top too, but if you're looking to create an extension like this one, it's really not that much.

The entry point of any extension is its manifest file. This file is used by the browser to know what the name, description, author, icons, etc. of the extension are.

Here is the manifest of the Eyedropper extension:

```json
{
    "name": "Eye Dropper",
    "description": "A browser extension to copy colors from your screen",
    "homepage_url": "https://github.com/captainbrosset/eye-dropper-ext/",
    "author": "Patrick Brosset",
    "version": "0.1",
    "manifest_version": 2,
    "icons": {
        "16": "icons/icon16.png",
        "32": "icons/icon32.png",
        ...
    },
    "browser_action": {
        "default_icon": {
            "16": "icons/icon16.png",
            "32": "icons/icon32.png",
            ...
        },
        "default_title": "Pick a color!",
        "default_popup": "popup/popup.html"
    }
}
```

It is also used to list the various entry points of the extension. In particular, my extension shows an icon in the toolbar. To do this, I used the `browser_action` property in the manifest file as seen above. This property needs an icon, and either an action to execute on click, or a popup to display on click.

Adding the popup.html file and this `browser_action` property was all I needed to have the icon in the toolbar. It's therefore quite simple to use, and we can then focus on the HTML of the popup and the CSS and JS code embedded in it.

As for many other things, MDN is a great place to learn more about writing extensions in the browser. The main documentation entry point can be found here: [Browser Extensions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions). You there's documentation about the [manifest](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json), and the [browser_action](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_action) property.

### Using the EyeDropper API

The core part of the extension is the eye dropper. To make it work, I used the new EyeDropper API (which I [documented on MDN](https://developer.mozilla.org/docs/Web/API/EyeDropper) recently too).

It takes just a few lines of JS code to use the EyeDropper API. This API doesn't have a lot of extra features for now, and that's good. This may change in the future depending on the [feedback received on the specification](https://github.com/WICG/eyedropper-api/issues) but, for now, here is the code I'm using the display the eye dropper on click:

```javascript
async function pickNewColor() {
  let result = null;
  try {
    const ed = new EyeDropper();
    result = await ed.open();
  } catch (e) {
    return;
  }

  if (result) {
    const color = result.sRGBHex;

    // after this, store the color, copy in clipboard, etc.
  }
}

document.querySelector('button').addEventListener('click', pickNewColor);
```

So, using the eye dropper requires to:

1. Instantiate the `EyeDropper` class.
1. Call the `open` method.

Now, `open` returns a promise. It's useful because the promise will resolve when the user has picked a color. If the user decides to not pick a color after all and presses ESCAPE on the keyboard, the promise rejects.

In the code sample above, I'm using an `aync` function which makes working with promise-based asynchronous code really nice. It reads like synchronous code, and avoid the nested callback hell we normally deal with when using promises with the `.then` handler. Learn more [about `async` functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) here.

When the promise resolves, it returns an object with the `sRGBHex` property on it. This property is a string containing the color value in hex format.

### Using the Clipboard API

The second most useful piece of code in the extension is its use of the [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API). That's what makes the extension useful. Without it, you'd only be able to pick colors, but not use them anywhere.

The extension uses the API to store the color value of a newly picked color, and also when you click on a previously picked color, in the popup.

There are 2 steps to doing this with the API:

1. Requesting permission.
1. Writing text in the clipboard.

Here is the code I used to do it:

```javascript
async function sendToClipboard(color) {
  const result = await navigator.permissions.query({ name: "clipboard-write" });
  if (result.state == "granted" || result.state == "prompt") {
    try {
      await navigator.clipboard.writeText(color);
    } catch (e) {
      // Failed to write to the clipboard.
    }
  }
}
```

As you can see, the first line is used to request the user's permission to write to the clipboard using the [Permissions API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API).

This part is asynchronous and returns a promise. This is because asking for the user's permission requires them to manually interact with a popup, which takes time. The promise returned by the `query` method does not resolve before this happens, and the returned value contains the state of the user's permission.

I used an `async` function here again to make dealing with this asynchronous code easier.

The second part is using the Clipboard API. In my case, I need to write to the clipboard, so I used the `navigator.clipboard.writeText` function ([documented here](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText)), but there are [other methods](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard#methods) to read too.

{% include in-article-ad.njk %}

<hr>

In terms of code, that's about it. The extension does only one thing, and it relies on APIs to do the heavy lifting, so its code is pretty short. I hope the extension helps you! Let me know on [the GitHub repo](https://github.com/captainbrosset/eye-dropper-ext) if it does, or if you have bugs.
