---
layout: main-layout.njk
subtitle: articles
pagetitle: Building desktop apps without native code
tags: article
---
<link href="https://unpkg.com/prismjs@1.20.0/themes/prism-okaidia.css" rel="stylesheet">

## Building desktop apps without native code

<time datetime="2022-10-06">October 6th, 2022</time>

I've had a passion for the web ever since the end of the 90's and have been working with web technologies since. In fact, here is a photo of me surfing the web like a cool kid on Netscape 2 in 1996 😀.

![A photo of me, in front of an old Macintosh computer, surfing the web with Netscape Navigator 2, in 1996](/assets/me-in-96.jpg)

But I've never formally studied computer science. I'm really bad at implementing complex algorithms, I don't really know any system-level programming, and I've never built anything else than web sites/apps. I just picked up some web dev skills along the way.

I sometimes wish I knew more, and especially I wish I knew how to code "real" <sup id="note-1">[1](#footnote-1)</sup> desktop applications. Why? Well, I use a desktop computer for work, and most people with office jobs do too, so I use desktop apps all the time.

Beside a quick introduction to [Delphi](https://en.wikipedia.org/wiki/Delphi_(software)) many years ago, I never learnt the languages, libraries, and frameworks that one seems to require to build a desktop application.

But with the web constantly evolving, I ask myself: what makes a web and a desktop app different? Do I really need to learn C++ to implement a desktop app? How far could I go with just the web?

So I created an app to test this! And, in this article, I'll go over how I used as many of the technologies available to make it feel like it really belongs on a desktop operating system.

### PWAmp

Here's the app we'll use in this article: PWAmp (pronounced P-W-Amp), _a skinable music player app that plays your favorite local audio files_.

![The main user interface of the PWAmp app, showing a playlist of songs and the usual play, pause, next, previous buttons](https://raw.githubusercontent.com/MicrosoftEdge/Demos/main/pwamp/screenshot-playlist.png)

You can **[access the app live here](https://microsoftedge.github.io/Demos/pwamp/)**, and **[check out the code here](https://github.com/MicrosoftEdge/Demos/tree/main/pwamp)**.

⚠️ **This is a demo app only. Even though I took some care in making sure it works on different browsers and devices, I still mostly tested it on Chromium-based browsers, and on desktop operating systems. Expect bugs elsewhere.**

### But what defines a desktop app exactly?

Before we start, think of the apps you usually use on your desktop computer, and compare them to browser-based web apps. You'll likely notice a few key differences, such as:

* You install, not navigate to, desktop apps on your computer, and you can access them from an icon somewhere.
* They have their own separate windows, and they can display their own content anywhere within these windows.
* Your desktop apps always work, whether you have access to the internet or not. At the very least, they start and show something.
* They can handle local files natively.
* They integrate with other apps and with the operating system in some ways.
* They perform non-trivial computing tasks.
* You can find them on app stores.

So, our goal here is to make an app, using only standard web technologies, that has the same general traits.

### Making the app installable and have its own icon

For this, we'll need to make the app a [Progressive Web App](https://developer.mozilla.org/docs/Web/Progressive_web_apps) (or PWA).

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
      "src": "/favicon-96.png",
      "sizes": "96x96"
    },
    {
      "src": "/favicon-128.png",
      "sizes": "128x128"
    },
    {
      "src": "/favicon-256.png",
      "sizes": "256x256"
    },
    {
      "src": "/favicon-512.png",
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

With this done, we can install the app on desktop, using a supporting browser <sup id="note-2">[2](#footnote-2)</sup>, by clicking on the app installation button in the address bar:

![PWAmp, loaded in Microsoft Edge, showing the install app button in the address bar, and the app installation prompt](/assets/edge-install-dialog.png)

Once installed, PWAmp can be accessed from the Taskbar and the Start menu, and it also appears in the app switcher when using <kbd>alt+tab</kbd>. Basically, everywhere you expect to find apps in the operating system (Windows, macOS, Linux).

### Controlling the entire app's window

Now when we launch the app, it opens in its own separate window, not in the browser window. And its window doesn't have any navigation buttons, URL bar, or tabs. Perfect!

![PWAmp in its own window, showing the app with only a title bar at the top](/assets/pwamp-default-window.png)

But the default system title bar at the top is a bit out of place. I don't think we need the title of the app to be visible, desktop apps don't really do that anymore. Plus the color of the titlebar contrasts with the color of the app and I don't really like that, and really, I'd love to be able to use this entire titlebar area for my own web content.

First, let's change the color of the titlebar. It turns out that the web app manifest allows to define a [theme color](https://developer.mozilla.org/docs/Web/Manifest/theme_color). This color is used by different operating systems in different ways, but on desktop it's used as the titlebar color. So let's add this to our `manifest.json` file:

```json
{
  ...
  "theme_color": "#181c25",
}
```

And after re-installing the app, here's what we get:

![PWAmp in its own window, with the titlebar of the same color as the app, blending in](/assets/pwamp-titlebar-theme.png)

That's much better, but we can go even further with a new feature called [Window Controls Overlay](https://developer.mozilla.org/docs/Web/API/Window_Controls_Overlay_API) <sup id="note-3">[3](#footnote-3)</sup>.

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

The Window Controls Overlay feature works this way: it removes the default titlebar, provides the app access to the entire surface area of the app window, and displays the system critical buttons (close, maximize, minimize, etc.) as an overlay on top of the web content. A bit like when dealing with a mobile device notch in your CSS code <sup id="note-4">[4](#footnote-4)</sup>, you also need to deal with the overlay so as not to overlap with your app content.

If this wasn't clear, here is the illustration from MDN about it:

![Illustration of a PWA installed on desktop with the Window Controls Overlay feature, with window control buttons, no title bar, and web content spanning the whole window](https://developer.mozilla.org/docs/Web/API/Window_Controls_Overlay_API/desktop-pwa-window-wco.png)

To work with this, we can use the new [`titlebar-area-*` CSS environment variables](https://developer.mozilla.org/docs/Web/CSS/env#using_env_to_ensure_content_is_not_obscured_by_window_control_buttons_in_desktop_pwas). In our case, we only want to make sure the first DOM element at the top of the app doesn't overlap with the titlebar, so we can use something like this:

```css
.player {
  padding: 1rem;
  /* If WCO is enabled, push the player down a little to avoid overlapping the titlebar area.
     Otherwise, fall back to 1rem. */
  padding-block-start: env(titlebar-area-height, 1rem);
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

So we can implement a cache-first strategy where we:

1. First cache all of the resources we need when the app is first accessed.
1. And then intercept all requests to resources and respond to them by getting the corresponding resources from the cache.

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

Now, that should be enough to make our app always work, just like a "real" desktop app. No need for an internet connection to load the app and play our songs since when the app was first accessed, all of its resources got downloaded in the cache.

In fact, let's check by switching the app to offline from the DevTools Network tool.

![PWAmp with DevTools next to it, in offline mode, showing that requests still succeed and are all fulfilled by the Service Worker](/assets/offline-pwamp.png)

This is only the tip of the iceberg however. Service workers can do much more, and there are some subtle use cases to take into account. One example is app updates. Let's say we want to roll out a new version of PWAmp. How do we make sure all clients get the updated resources instead of always loading the old ones from the cache?

There are solutions to this, and one common way is to add a suffix to the file names that depends on the version (like a hash of the file content for example). But in the interest of keeping this article simpler, let's not dive into this topic.

I would strongly encourage you to use a library specifically for this though. [Workbox](https://developer.chrome.com/docs/workbox/) is probably the most used service worker tool and library that should make implementing whatever strategy you want much simpler.

### Handling local files

PWAmp plays local audio files, that's the whole point of the app. So it'd be great if it could handle these audio files natively.

If you double-click on an mp3 file on your computer right now, what do you think happens? The operating system looks up what app (or apps) is (or are) associated with this particular file type, and then launches the associated app with your file.

Can we register PWAmp as one off the handlers for a particular file type? Well, yes, it turns out we can! File handling is a recent PWA feature that can be used in Chromium browsers now!

To learn more, check out [Handling files on the Web](/articles/2021-10-22-handling-files-on-the-web/#handling-files-like-compiled-apps-with-pwas).

To make it work, we need two main pieces of code. First, let's define the file handler in our web app manifest (`manifest.json`), so that the operating system (OS) knows to register the app as a handler when the app is installed:

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

In the above code snippet, we're asking the OS to add PWAmp as one of the handlers for a number of audio file formats, and to launch the app at its root URL (the `action` property) when a file is opened.

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

In order to make our app feel like it really belongs in the operating system, it needs to integrate more deeply into it. There are many ways to do this, and not all apps have the same needs, but here are a few examples of things desktop apps commonly do:

* Handling custom links. When you share a Spotify link with a friend and they click on it, then the app opens up, not the website.
* Sharing files and other content to and from other apps. Apps can share things with each other without knowing anything about the other app. The shared content goes through the OS sharing dialog.
* Exposing common tasks as shortcuts. Right-clicking on an app icon (or long tapping, on mobile) usually displays common tasks. This helps make the app easier to use and more naturally integrated in the OS.
* Exposing widgets. Most OSs have widget dashboards that contain useful little pieces of apps that let you do common tasks quickly.

For PWAmp, let's add support for link handling and file sharing. And then we'll talk about the two other ones.

#### Handling links and protocols

Our PWA app can handle links in two ways:

* **Handle http links to the app**. The app lives at [https://microsoftedge.github.io/Demos/pwamp/](https://microsoftedge.github.io/Demos/pwamp/) and clicking on a link that belongs to the app scope will open the app, and not the web browser. This way you can easily deep link to any place in the app by just clicking on a URL. Now, I'm a bit fuzzy on the support for this. I know that with Microsoft Edge on Windows, this just works, but I'm not sure about other browsers and operating systems.
* **Handle protocols**. We can add support for existing or custom protocols to the app. Let's add support for the `web+amp:` custom protocol.

To do this, we need to add a new manifest member in our `manifest.json` web app manifest file:

```json
{
  ...
  "protocol_handlers": [
    {
      "protocol": "web+amp",
      "url": "/?cmd=%s"
    }
  ]
}
```

This will tell the operating system to register PWAmp as a handler for any link that uses the `web+amp` protocol. The `url` property tells the OS to start our app at this url, and the `%s` placeholder will get replaced with the full custom protocol link that was used.

For example, say we want to handle links such as `web+amp:remote-song:https://example.com/song.mp3` to add new songs to the library from the internet in our app, then upon handling, our app will be opened at the following url: `/?cmd=web+amp:remote-song:https://example.com/song.mp3`. And all we need to do now is, when the app starts, check if the `cmd` parameter is present and parse it. Let's do this now:

```javascript
// When the app starts, let's parse the current location.
const commandUrl = new URL(document.location.href).searchParams.get('cmd');

if (commandUrl) {
  // The link is expected to be in the form of web+amp:command:arguments.
  // Remove the web+amp: custom protocol part, and split the rest around the colon character.
  const commandAndArg = commandUrl.substring('web+amp:'.length);
  const [command, arg] = commandAndArg.split(/:(.+)/);

  if (command === 'remote-song') {
    // arg is the link to a song on the internet, let's add it to the library.
  }
}
```

And now people can share links to the app with each other. You could send a link to some song hosted somewhere to a friend via a chat message, and when they click on it, the app would open up and add the song, making the whole thing feel much more seamless.

#### Sharing to and from the app

Now, let's add some file sharing to the app as well. It's common to be able to share links, photos, or files from an app and send them to another app. Think of a mobile device for example, where you want to share a photo on Twitter. One common way to do this is to first go in the photos app, select the photo and tap **Share**. And from there, select the Twitter app. The Twitter app then opens up and preloads the photo in a draft tweet, ready to send.

Could we do this with PWAmp as well? You've guessed it, yes we can!

Sharing from the app is quite straightforward as the `navigator.share` API has been supported by most browsers for some time already <sup id="note-5">[5](#footnote-5)</sup>. So we can use it to share audio songs with other apps:

```javascript
shareButton.addEventListener("click", () => {
  // Retrieve the JavaScript File object for the song we want to share.
  const file = getCurrentSongFile();
  const dataToShare = {
    title: getCurrentSongTitle(),
    files: [
      file,
      file.name,
      { type: file.type }
    ]
  };
  
  if (!navigator.share ||
      !navigator.canShare || 
      !navigator.canShare(dataToShare)) {
    // We can't share this file. Bail out.
    return;
  }

  // Let's go ahead and share the data. This will make the operating
  // system share dialog appear, showing apps that can receive the
  // shared data.
  navigator.share(dataToShare);
});
```

Great, we can share from the app! Notice in the screenshot below that Windows suggests Mail, Teams, and Outlook as possible targets for the shared song.

![The Windows share dialog, shown above the PWAmp app, with several apps that can receive the shared file](/assets/pwamp-sharing.png)

Now let's do the other way around and become a share target for audio files by using the [Web Share Target API](https://web.dev/web-share-target/)! For this, we need to add a new manifest member again:

```json
{
  ...
  "share_target": {
    "action": "/handle-shared-song",
    "method": "POST",
    "enctype": "multipart/form-data",
    "params": {
      "title": "title",
      "files": [
        {
          "name": "audioFiles",
          "accept": [
            "audio/wav",
            "audio/mpeg",
            "audio/mp4",
            "audio/aac",
            "audio/ogg",
            "audio/webm",
            "audio/flac"
          ]
        }
      ]
    }
  }
}
```

This member is a little bit more complicated than the ones we saw before. Here is how being a share target works: we tell the operating system that we want to be a target for shared data by adding the `share_target` member. We then say what type of shared data we want to handle with the `params` property. And we then define how we want to handle the shared data.

It's important to understand that the OS share dialog with send the shared data to your app as if it was a form submission. That's why we need to define an `action`, a `method`, and a potential `enctype` just like when using the HTML `<form>` element. In our case, because we want to handle shared files, we need to use the `POST` method and `multipart/form-data` encoding, which makes it a little more complicated.

When a file is shared and PWAmp is selected as the target for it, the OS will launch our app at `handle-shared-song` with a POST request and some form data attached to it. Now, remember, our app doesn't really have a server. It does have a simple static server that contains the resources for the app, but it can't receive POST requests. Not only that, but we want this to also work offline. So let's reach out to our service worker once again:

```javascript
// Let's add a special fetch handler for song file sharing.
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Only care about POST requests on the /handle-shared-song URL.
  if (event.request.method !== 'POST' || !url.pathname.includes('/handle-shared-song')) {
    return;
  }

  // First, let's immediately redirect to the start URL, we'll be
  // handling the file in the background, in the service worker, but
  // there's no special page to load here, just go back to the root.
  event.respondWith(Response.redirect('/'));

  // And now, handle the shared data.
  event.waitUntil(async function () {
    const data = await event.request.formData();
    const files = data.getAll('audioFiles');

    // That's it, we've got the shared audio files now.
    // Let's add them to our local indexedDB storage
    ...
  }());
});
```

After re-installing the app, and sharing audio files from somewhere else, PWAmp shows up in the share dialog as a possible target!

![The Windows share dialog, showing that PWAmp is part of the target apps](/assets/pwamp-share-target.png)

#### Adding shortcuts and widgets

As I mentioned earlier, shortcuts and widgets are two other things desktop apps commonly use to more meaningfully integrate in their host operating system.

Progressive Web Apps can do this too. In the interest of keeping the article not too long, we won't implement this in PWAmp, but only quickly mention them.

First, shortcuts. These are common tasks that can be accessed usually from an app's icon. If you haven't tried this yet, try to long press an app icon on your mobile device home screen. Or, if you're on a desktop computer, try right-clicking on an app icon in the Dock or Taskbar. Chances are that the app you clicked on will display a few tasks that are possible to do right from the icon.

You can do this in a PWA too by using the `shortcuts` manifest member. Here is a good resource on this topic: [Creating application shortcuts](https://microsoft.github.io/win-student-devs/#/30DaysOfPWA/advanced-capabilities/02).

And, second, widgets. This is way more on the bleeding edge as, right now, no operating system and browser combination allows you to do it, but it's coming soon to Windows and Edge. The idea here is to let apps, including PWAs, insert their own custom widgets in the operating system's widget dashboard. If you want to find out more, check out the [PWA-driven Widgets Explainer](https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md).

### Doing non-trivial work

Desktop apps are usually associated with heavy-duty tasks, things that require a bigger screen, access to hardware, and more processing power. Can the web compete with this?

Well, it depends. Our little music player app isn't necessarily a great example of this, but it does use [IndexedDB](https://developer.mozilla.org/docs/Web/API/IndexedDB_API) to store the audio files for offline playback, the [Web Audio API](https://developer.mozilla.org/docs/Web/API/Web_Audio_API) for analyzing the playing music, and the [Canvas API](https://developer.mozilla.org/docs/Web/API/Canvas_API) for drawing the visualizer, so it's definitely more than just a website at least.

But can things like word processors, image manipulation, or 3D modelling apps exist as Web apps? Not all apps will make sense as Web apps, but consider the following points:

* Adobe is bringing Photoshop to the Web <sup id="note-6">[6](#footnote-6)</sup>.
* [WASM](https://webassembly.org/) is a great way to execute large computing tasks at near-native speeds by cross-compiling C/C++ and other languages to the Web.
* Hardware access is no longer limited to native apps only. Now, browser support is very uneven here, and most things are very experimental, but consider the following APIs: [WebUSB](https://developer.mozilla.org/docs/Web/API/WebUSB_API), [WebSerial](https://developer.mozilla.org/docs/Web/API/Web_Serial_API), [WebHID](https://developer.mozilla.org/docs/Web/API/WebHID_API), [WebGPU](https://developer.chrome.com/docs/web-platform/webgpu/), [WebBluetooth](https://developer.mozilla.org/docs/Web/API/Web_Bluetooth_API), [WebNFC](https://web.dev/nfc/).

So my thought here is that you shouldn't ignore the Web as a potential target for your next app just because you think what you want to do is too complex. The web is no longer just a medium to read text documents. It has grown way past this.

Instead, think of the pros and cons. Will it be easier for you to hire web developers than native app developers? Does the Web support the features you want to do? Have you really checked the latest available features in modern web browsers?

Even though I've been in this industry for a long time, I keep being amazed by what people manage to build with web technologies, and what the platform is capable of doing.

### App stores

At the beginning of the article, I said that "real" apps could be found in app stores. We're very used to this model on locked down devices such as a iPhones where that's the only way to install apps. But app stores also exist on desktop operating systems. They're less used there because we usually download apps from the internet. Nevertheless, being on an app store conveys a sense of trust to users that just accessing a website on a random URL doesn't. It's going to be hard for PWAs to compete if users have to first navigate to the site, and then find the right little button to install the app.

[PWABuilder](https://www.pwabuilder.com/) is a great solution to this. It's both a PWA validation tool that helps you check the quality of your code, and a packaging tool. Give it the URL to your PWA and it will create packages for you to distribute your app on:

* The Microsoft Store, for Windows.
* The Google Play Store, for Android.
* The App Store, for iOS.

Even if those stores don't support PWA by default, you can use PWABuilder to create packages made specifically for those stores and distribute your apps to users this way!

In fact, I've already gone ahead and published [PWAmp in the Microsoft Store](https://www.microsoft.com/store/productId/9PHQQ40MZ10L)!

![The Microsoft Store app, showing the PWAmp app screen](/assets/pwamp-store.png)

---

We're done! 🎉

We've gone over all the things we said were characteristics of desktop applications, and showed that Progressive Web Apps could share the same traits. It's possible to create great desktop app experiences with PWA nowadays. There's so much capabilities that make it possible to create pretty much anything you have mind.

I'm not saying everything absolutely needs to be based on web technologies and distributed as a PWA. But more and more is possible these days. And my hope is that, now, you understand that PWA **is** an option and you'll think of it the next time you to make a decision for which technology to use.

---

**Footnotes**

<sup id="footnote-1">[1](#note-1)</sup> I've used the word "real" between quotes here, because [I've learned](/articles/2022-09-08-state-of-pwa/#1-pwas-are-not-real-apps-🔍) a lot of people think of platform-specific (or native) apps as real apps, as opposed to web apps. I, myself, don't really make a difference. I've been using web-based apps for decades to do professional work and whether an app uses web technologies or some OS-specific libraries and a system-level programming language doesn't make a difference, as long as it does the job.

<sup id="footnote-2">[2](#note-2)</sup> On mobile iOS devices, Safari supports installing PWAs locally by using the **Add to home screen** option. On Android, you can also install PWAs locally. On desktop, for now, only Chromium-based browsers (such as Edge and Chrome) support installing PWAs.

<sup id="footnote-3">[3](#note-3)</sup> I've also written a bunch of other things about Window Controls Overlay, if you're interested: [Breaking Out of the Box](https://alistapart.com/article/breaking-out-of-the-box/), [Display content in the title bar](https://learn.microsoft.com/microsoft-edge/progressive-web-apps-chromium/how-to/window-controls-overlay), and [Closing a 30 pixels gap between native and web](https://blogs.windows.com/msedgedev/2022/09/27/closing-pixel-gap-native-web-window-controls-overlay/).

<sup id="footnote-4">[4](#note-4)</sup> When the iPhone X came out 5 years ago, web developers had to learn how to deal with the "notch" making their web pages look awkward. Check out ["The Notch" and CSS](https://css-tricks.com/the-notch-and-css/) on css-tricks.com.

<sup id="footnote-5">[5](#note-5)</sup> To learn more about how to use the `navigator.share` API, check out [Navigator.share()](https://developer.mozilla.org/docs/Web/API/Navigator/share) on MDN. Note, however, that sharing files isn't supported everywhere yet. But there's a very useful [`navigator.canShare()`](https://developer.mozilla.org/docs/Web/API/Navigator/canShare) function you can use to test whether sharing files works.

<sup id="footnote-6">[6](#note-6)</sup> From [Adobe's MAX 2021 announcements](https://blog.adobe.com/en/publish/2021/10/26/photoshop-ships-major-updates-across-desktop-ipad-apps-extends-light-editing-collaboration-features-web-beta): _Today we are extending Photoshop to the web as a beta (running in Chrome and Edge browsers). In it, you can try out the commenting workflow and test some early Photoshop editing features we are piloting on the web_.

