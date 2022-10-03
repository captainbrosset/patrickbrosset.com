---
layout: main-layout.njk
subtitle: articles
pagetitle: Building desktop apps without native code
tags: article
---
<link href="https://unpkg.com/prismjs@1.20.0/themes/prism-okaidia.css" rel="stylesheet">

## Building desktop apps without native code

<time datetime="2022-10-04">October 4th, 2022</time>

I've had a passion for the web ever since the end of the 90's and have been working with web technologies since. In fact, as a proof, here is a photo of me surfing the web like a cool kid on Netscape 2 in 1996 😀

![A photo of me, in front of an old Macintosh computer, surfing the web with Netscape Navigator 2, in 1996](/assets/me-in-96.jpg)

But I've never formally studied computer science. I'm really bad at implementing complex algorithms, I don't really know any system-level programming, and I've never built anything else than web sites/apps. I just picked up some web dev skills along the way.

I sometimes wish I knew more, and especially I wish I knew how to code "real"<sup>[1](#footnote-1)</sup> desktop apps. I use a desktop computer for work, and most people with office jobs do too, so I use desktop apps all the time.

Beside a quick introduction to [Delphi](https://en.wikipedia.org/wiki/Delphi_(software)) many years ago, I never learnt the languages, libraries, and frameworks that one seems to require to build a desktop application.

But with the web constantly evolving, I ask myself: what makes a web and a desktop app different? Do I really need to learn C++ to implement a desktop app? How far could I go with just the web?

So I created an app to test this! And, in this article, I'll go over how I used as many of the technologies available to make it feel like it really belongs on a desktop operating system.

### PWAmp

Here's the app we'll use in this article: PWAmp (pronounced P-W-Amp), _a skinable music player app that plays your favorite local audio files_.

![The main user interface of the PWAmp app, showing a playlist of songs and the usual play, pause, next, previous buttons](https://raw.githubusercontent.com/MicrosoftEdge/Demos/main/pwamp/screenshot-playlist.png)

You can **[access the app live here](https://microsoftedge.github.io/Demos/pwamp/)**, and **[check out the code here](https://github.com/MicrosoftEdge/Demos/tree/main/pwamp)**.

⚠️ **This is a demo app only. Even though I took some care in making sure it works on different browsers and devices, I still mostly tested it on Chromium-based browsers, and on desktop operating systems. Expect bugs elsewhere.**

### What defines a desktop app exactly?

Before we start, think of the apps you usually use on your desktop computer, and compare them to browser-based web apps. You'll likely notice a few key differences, such as:

* You install, not navigate to, desktop apps on your computer, and you can access them from an icon somewhere.
* They have their own separate windows, and they can display their own content anywhere within these windows.
* Your desktop apps always work, whether you have access to the internet or not.
* They can handle local files natively.
* They integrate with other apps and with the operating system in some ways.
* They perform non-trivial computing tasks.
* You can find them on app stores.

So, our goal here is to make an app, using only standard web technologies, but that has the same general traits.

### Making the app installable and have its own icon

For this, we'll need to make the app a [Progressive Web App](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) (or PWA).

PWA is a mix of different web features, but one thing that it makes possible is to install web apps on devices. This originated on mobile as a way to pin websites to your home screen. People love app icons on their home screens, and so a natural evolution of the web was to, also, have access to the home screen.

Years have passed, the technology has matured, browser support has improved, and now PWA is a great option for building installable cross-browser/cross-device web apps. And it's an awesome way to build desktop apps too.

To do this, three building blocks are needed:

1. A secure connection.
1. A web app manifest.
1. A service worker.

We can quickly get the first building block out of the way. It means the app needs to be served over the `HTTPS` protocol. But while developing with a local web server and the `localhost` domain, that's not even needed.

Let's move on to the web app manifest. Let's create a file called `manifest.json` at the root of the web project and fill it with the following content:

```json
{
  "name": "PWAmp music player",
  "short_name": "PWAmp",
  "description": "A skinable music player app to play your favorite mp3 files",
  "lang": "en-US",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "icons": [
    {
      "src": "./favicon-96.png",
      "sizes": "96x96"
    },
    {
      "src": "./favicon-128.png",
      "sizes": "128x128"
    },
    {
      "src": "./favicon-256.png",
      "sizes": "256x256"
    },
    {
      "src": "./favicon-512.png",
      "sizes": "512x512"
    }
  ]
}
```

And then, reference this file in the `index.html` home page:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    ...
    <link rel="manifest" href="manifest.json" />
    ...
  </head>
  <body>
    ...
  </body>
</html>
```

This tells the browser that the PWAmp website is actually an app, what's its name, description, the icon it wants to use, and so on. There's more we could do here, but this is a good start.

And the last thing to turn the app into a PWA is to add a Service Worker. We'll talk more about this special type of worker later, but for now, this is a mandatory step to make sure the app can be installed by the browser.

So let's create a JavaScript file at the root of the project, called `sw.js`:

```javascript
self.addEventListener("fetch", event => {
  // For now let's not do anything.
});
```

And let's load this file at the end of `index.html` home page too:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    ...
  </head>
  <body>
    ...
    <script>
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./sw.js");
      }
    </script>
  </body>
</html>
```

That's it, those are the only three mandatory technical pieces we need to make the website a PWA. Now, our goal is to go much further of course, and we'll see this in the rest of the article. But for now, this is enough to make supporting browsers realize that PWAmp is an installable app.

With this done, we can install the app on desktop, using a supporting browser<sup>[2](#footnote-2)</sup>, by clicking on the app installation button in the address bar:

![PWAmp, loaded in Microsoft Edge, showing the install app button in the address bar, and the app installation prompt](/assets/edge-install-dialog.png)

Once installed, PWAmp can be accessed from the Taskbar and the Start menu, and it also appears in the app switcher when using <kbd>alt+tab</kbd>. Basically, everywhere you expect to find apps in the operating system (Windows, macOS, Linux).

### Controlling the entire app's window

Now when we launch the app, it opens in its own separate window, not in the browser window. And its window doesn't have any navigation buttons, URL bar, or tabs. Perfect!

![PWAmp in its own window, showing the app with only a title bar at the top](/assets/pwamp-default-window.png)

But the default system title bar at the top is a bit out of place. I don't think we need the title of the app to be visible, desktop apps don't really do that anymore. Plus the color of the titlebar contrasts with the color of the app and I don't really like that, and really, I'd love to be able to use this entire titlebar area for my own web content.

First, let's change the color of the titlebar. It turns out that the web app manifest allows to define a [theme color](https://developer.mozilla.org/en-US/docs/Web/Manifest/theme_color). This color is used by different operating systems in different ways, but on desktop it's used to as the titlebar color. So let's add this to our `manifest.json` file:

```json
{
  ...
  "theme_color": "#181c25",
}
```

And after re-installing the app, here's what we get:

![PWAmp in its own window, with the titlebar of the same color as the app, blending in](/assets/pwamp-titlebar-theme.png)

That's much better, but we can go even further with a new feature called [Window Controls Overlay](https://developer.mozilla.org/en-US/docs/Web/API/Window_Controls_Overlay_API)<sup>[3](#footnote-3)</sup>.

Let's add this to our web app manifest:

```json
{
  ...
  "display_override": [
    "window-controls-overlay"
  ]
}
```

This enables the Window Controls Overlay feature in the installed app. Now, to take advantage of it we need two other things:

1. Users need to opt-in. This feature is, by default, off. Once they install the app, the only difference is that they'll have a new chevron icon in the titlebar allowing them to opt-in to the feature.
1. And we need to add the necessary code to handle the feature properly in our layout.

The Window Controls Overlay feature works this way: it removes the default titlebar, provides the app access to the entire surface area of the app window, and displays the system critical buttons (close, maximize, minimize, etc.) as an overlay on top of the web content. A bit like when dealing with a mobile device notch in your CSS code<sup>[4](#footnote-4)</sup>, you also need to deal with the overlay so as not to overlap with your app content.

If this wasn't clear, here is the illustration from MDN about it:

![Illustration of a PWA installed on desktop with the Window Controls Overlay feature, with window control buttons, no title bar, and web content spanning the whole window](https://developer.mozilla.org/en-US/docs/Web/API/Window_Controls_Overlay_API/desktop-pwa-window-wco.png)

To work with this, we can use the new [`titlebar-area-*` CSS environment variables](https://developer.mozilla.org/en-US/docs/Web/CSS/env#using_env_to_ensure_content_is_not_obscured_by_window_control_buttons_in_desktop_pwas). In our case, we only want to make sure the first DOM element at the top of the app doesn't overlap with the titlebar, so we can use something like this:

```css
.player {
  padding: 1rem;
  /* If WCO is enabled, push the player down a little to avoid overlapping the titlebar area */
  padding-top: env(titlebar-area-height, 1rem);
}
```

This gives the element a `1rem` padding all around when the app is not installed, or installed but on a device that does not support Window Controls Overlay, or when the user hasn't opted-in to the feature. But when the user opts-in, then the top padding will be `titlebar-area-height` instead.

![To player part of PWAmp, with its padding area highlighting, showing that the top padding is bigger than the other padding](/assets/wco-top-padding.png)

The above image shows that the top padding is bigger than on the other sides, and it matches exactly the size of the system critical button overlay.

### Making the app always work

This is where the Service worker we made before comes in. A Service worker is a special type of web worker. Like other web workers, it runs in a thread that's separate from the webpage. But unlike other web workers, its lifecycle is mostly managed by the browser.

The service worker really acts as a proxy between the webpage and the web server, and as such can intercept requests made from the page to the server and respond in its place.

This is very interesting for implementing great offline support for the app. Because the worker runs in the browser, it's always available even when the network can't be accessed, and it can therefore be used to return previously cached responses.

Now, our app is pretty simple in that it doesn't require any dynamic resources from the server. It's a client-side app to start with. So all it needs is a few JavaScript and CSS files and then songs are played locally in the browser.

So we can implement a simple cache-first strategy where we:

1. First cache all of the resources we need when the app is first accessed.
1. And then intercept all requests to resources and respond to them by getting the corresponding resources in the cache.

So let's cache our resources first:

```javascript
const VERSION = "v1";
const CACHE_NAME = `pwamp-${VERSION}`;

// Those are all the resources our app needs to work.
// We'll cache them on install.
const INITIAL_CACHED_RESOURCES = [
  "/",
  "/skins/default.css",
  "/about.css",
  "/album-art-placeholder.png",
  "/app.js",
  ...
];

// On install, fill the cache with all the resources we know we need.
// Install happens when the app is used for the first time, or when a
// new version of the SW is detected by the browser.
self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll(INITIAL_CACHED_RESOURCES);
  })());
});
```

And then let's respond to requests with the cached resources:

```javascript
// A cache-first strategy is used, with a fallback to the network.
self.addEventListener("fetch", event => {
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(event.request.url});

    if (cachedResponse) {
      return cachedResponse;
    } else {
      // If the response couldn't be found in the cache, try the network.
      const fetchResponse = await fetch(event.request);
      cache.put(event.request, fetchResponse.clone());
      return fetchResponse;
    }
  })());
});
```

Now, that should be enough to make our app always work, just like a "real" desktop app. No need for an internet connection to load the app and play our songs.

This is only the tip of the iceberg. Service workers can do so much more, and there are some subtle use cases to take into account. One example is app updates. Let's say we want to roll out a new version of PWAmp. How do we make sure all clients get the updated resources instead of always loading the old ones from the cache?

There are solutions to this, and one common way is to add a suffix to the file names that depends on their content (like a hash of the file content). But I won't write anything about this here. This is an intro article, not a deep dive.

I would strongly encourage you to use a library specifically for this though. [Workbox](https://developer.chrome.com/docs/workbox/) is probably the most used service worker tool and library that should make implementing whatever strategy you want much simpler.

### Handling local files

PWAmp plays local audio files, that's the whole point of the app. So it'd be great if it could handle these audio files natively.

If you double-click on an mp3 file on your computer right now, what do you think happens? The operating system looks up what app (or apps) is (or are) associated with this particular file type, and then launches the associated app with your file.

Can we register PWAmp as one off the handlers for a particular file type? Well, yes, it turns out we can! File handling is a recent PWA feature that can be used in Chromium browsers now!

You can check out my other article about this: [Handling files on the Web](/articles/2021-10-22-handling-files-on-the-web/#handling-files-like-compiled-apps-with-pwas).

To make it work, we need two main pieces of code. First, let's define the file handler in our web app manifest, so that the OS knows to register the app as a handler when the app is installed:

```json
{
  ...
  "file_handlers": [
    {
      "action": "/",
      "accept": {
        "audio/wav": [
          ".wav"
        ],
        "audio/mpeg": [
          ".mp3"
        ],
        "audio/mp4": [
          ".mp4"
        ],
        "audio/aac": [
          ".adts"
        ],
        "audio/ogg": [
          ".ogg"
        ],
        "audio/webm": [
          ".webm"
        ],
        "audio/flac": [
          ".flac"
        ]
      }
    }
  ]
}
```

In the above code snippet, we're asking the OS to add PWAmp as one of the handlers for a number of audio file formats, and to launch the app at its root URL when a file is opened.

Now, we actually need to handle the file, and we can do this with the `launchQueue` JavaScript API:

```javascript
async function handleFiles(files) {
  // Do something with files here
  ...
}

// Check that the launchQueue API is supported.
if ('launchQueue' in window) {
  launchQueue.setConsumer(launchParams => {
    handleFiles(launchParams.files);
  });
}
```

And that's all we need! Now when we re-install the app locally, we can right-click on an audio file on the desktop for example, and choose "Open with PWAmp"!

![A Windows explorer window with mp3 files, and the Open With context menu showing that PWAmp is part of the list](/assets/open-song-with-pwamp.png)

### Integrating with other apps and the operating system



protocol_handlers, sharing, share_targets, widgets, shortcuts

### Doing non-trivial work

Example wami, photoshop, wasm

### App stores

PWABuilder

---

**Footnotes**

<sup id="footnote-1">1</sup> I've used the word "real" between quotes here, because [I've learned](/articles/2022-09-08-state-of-pwa/#1-pwas-are-not-real-apps-🔍) a lot of people think of platform-specific (or native) apps as real apps, as opposed to web apps. I, myself, don't really make a difference. I've been using web-based apps for decades to do professional work and whether an app uses web technologies or some OS-specific libraries and a system-level programming language doesn't make a difference, as long as it does the job.

<sup id="footnote-2">2</sup> On mobile iOS devices, Safari supports installing PWAs locally by using the **Add to home screen** option. On Android, you can also install PWAs locally. On desktop, for now, only Chromium-based browsers (such as Edge and Chrome) support installing PWAs.

<sup id="footnote-3">3</sup> I've also written a bunch of other things about Window Controls Overlay, if you're interested: [Breaking Out of the Box](https://alistapart.com/article/breaking-out-of-the-box/), [Display content in the title bar](https://learn.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/how-to/window-controls-overlay), and [Closing a 30 pixels gap between native and web](https://blogs.windows.com/msedgedev/2022/09/27/closing-pixel-gap-native-web-window-controls-overlay/).

<sup id="footnote-4">4</sup> When the iPhone X came out 5 years ago, web developers had to learn how to deal with the "notch" making their web pages look awkward. Check out ["The Notch" and CSS](https://css-tricks.com/the-notch-and-css/) on css-tricks.com.