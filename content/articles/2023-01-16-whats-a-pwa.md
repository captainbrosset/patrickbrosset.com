---
layout: main-layout.njk
subtitle: articles
pagetitle: What's a Progressive Web App exactly?
tags: article
---
## What's a Progressive Web App exactly?

<time datetime="2023-01-16">January 16th, 2023</time>

The most common way that I hear people define Progressive Web App (PWA) is: _"it's just a website with a manifest file and a service worker"_.

Although there is technical truth to this, I don't like this definition very much. In this article, I'll go over how I think about PWA. I hope this will be helpful to you, especially if you're getting started in this field.

To me, **a PWA is an application that you build by using web technologies.** It's an app you write using HTML, CSS, and JavaScript, and that can be installed on all devices, from just one codebase.

Even though a PWA is written in the same languages used to build websites, it has access to features that are normally reserved to "native" apps. Now, a PWA doesn't need to use these features, as long as it meets the install criteria (which, today, are: https, service worker, and web app manifest), then it's a PWA. But these native-like features can make a PWA feel a lot more natural to users and better integrated in the operating system it's installed on.

Finally, a PWA can also run inside web browsers, just like websites.

### Is PWA just a website?

It's built like a website, and it can run in a web browser just like any other websites. In fact, this ability to run like a website gives a PWA several advantages over other traditional ways to build apps:

* It can be indexed by search engines, which means people can find the app by just googling it.
* You can give someone else the link to a PWA, which they can use to access it without even installing it first.
* The PWA's ability to adapt to any screen size, orientation, input method, etc. is part of its DNA. After all, it's built like a website, and websites can be used on all devices.
* It runs using the HTTPS protocol, which guarantees that communications between the app and the servers it uses are secure.
* To update your PWA, you deploy new files to a web server.

But it's also more than a website. See below.

### Is PWA a real app?

Tough question, what does ["real"](/articles/2022-10-06-building-desktop-apps-without-native-code/#footnote-1) even mean?

What I _can_ say is a PWA can be installed like any other app on a device, for example on an Android phone, an iOS device, or a laptop computer. When installed on a device, a PWA functions pretty much like any other app:

* The PWA has its own application icon, and its own dedicated window.
* It can be launched automatically when associated files are opened.
* It can be launched when the user signs in.
* It can continue to work even when the device is offline.
* It can support push notifications.
* It can run background tasks, like performing periodic updates, even if the application window or screen is not open.

Does that make it a "real" app for you? For me, as long as the app lets me perform the tasks I installed it for, in a reliable way, and as long as I can launch the app whenever I need it, then it's definitely a real app!

A PWA can also be published on stores such as the Google Play Store or the App Store.

### But surely, a PWA can't do as much as a native app?

If you're in the business of building a new application, you probably have very specific scenarios and you're trying to choose the technology that's right for them.

In this situation, it's very easy to default to using operating system-specific technologies (aka "native" code). You're likely thinking that your scenarios just can't be built with web code, and that there's no limit to what native code will let you do.

To be clear, there are definitely cases where a PWA will not be the right choice for you. But before making a quick decision, check what PWA can do for you. If the capabilities available to PWA are up to the task, it would be a shame not to benefit from its web-related advantages and single code base.

Keep in mind that a PWA has a much lower cross-platform development cost than operating system-specific apps since it doesn't require a separate codebase for each platform.

### Find out more, and get started

* What can the web do today: check out [the Fugu API tracker](https://fugu-tracker.web.app/).
* [What PWA can do today](https://whatpwacando.today/).
* [PWA, on MDN](https://developer.mozilla.org/docs/Web/Progressive_web_apps).
* [Learn PWA, on web.dev](https://web.dev/learn/pwa/).
* [PWA documentation from Microsoft Edge](https://learn.microsoft.com/microsoft-edge/progressive-web-apps-chromium/).
* [PWABuilder](https://pwabuilder.com) is a tool to help you publish your PWA to app stores. They also have great [docs](https://docs.pwabuilder.com/) and tools to help you get started writing your PWA.
