---
layout: article.njk
title: An informal state of PWA, 2022
tags: article
date: 2022-09-08
permalink: /articles/2022-09-08-state-of-pwa/index.html
excerpt: "I ran a little Twitter survey to learn more about what the current blockers were when building PWAs. This article shows what the answers were."
thumbnail: "/assets/pwa-logo.png"
altText: "The PWA logo"
---
Progressive Web Apps (or PWA) is a topic I find myself quite interested in lately.

> If you don't know what a PWA is: it's a way to build an app that can be used cross-platforms, in browsers, or installed locally on operating systems (mobile and desktop) with just one code base, using web technologies. PWAs are like websites: easy to discover and reach, secure, responsive, etc. but also like apps: installable, work offline, with access to advanced features.\
To learn more, check out [MDN](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps), [web.dev](https://web.dev/progressive-web-apps/), or [docs.microsoft.com](https://docs.microsoft.com/microsoft-edge/progressive-web-apps-chromium/).

I love web technologies and to me, being able to use HTML, CSS, and JavaScript, to build real apps that can be installed feels like a super power. **But, I also hear complaints about PWAs**.

Not having built a PWA in a professional context yet (apart from demo apps), I wanted to understand where these complaints were coming from. So I ran a little survey on Twitter. This was very informal but I got a lot of interesting qualitative feedback.

Here was my original tweet:

https://twitter.com/patrickbrosset/status/1567503909110824962

So, for the rest of this article, I'll go over what people said were the main blockers. Feel free to check the actual responses to the tweet yourself. I'll just **summarize the findings** below. I'll also just **state the facts**, not draw any conclusions or image any solutions.

### 1. PWAs are not "real apps" 🔍

Users don't seem to perceive PWAs as real apps. Even when a lot of care is taken in creating native-looking app, there are minute differences in the look and feel, and users can often tell the difference. Browser vendors are always closing the gap, but this is still a problematic area.

One factor that doesn't help is that many PWAs out there are "just websites" with a manifest and a service worker. They don't really try to be more than this and are far from being up to par with their equivalent native apps.

### 2. Steep learning curve 🏔️

PWAs are attractive to both web developers (because they know the platform already) and native app developers (because they see a potentially low-cost way to target all platforms with one codebase).

Unfortunately, PWAs seem to be hard to learn for both groups.

Native app developers come from a very different development model, and all tutorials out there just assume that people know web development.

Web developers also seem to be having a hard time learning the APIs and understanding how to use service workers for example.

### 3. Safari 🍏

Safari seems to remain a major blocker in PWA adoption with people complaining that the browser does not support all functionalities, and that getting into the store is impossible.

[PWABuilder.com](https://pwabuilder.com) is a big help nowadays, but doesn't solve the [compatibility gap](https://firt.dev/notes/pwa-ios/).

### 4. Offline 🔌

Apps just work™️, whether you are connected to the internet or not. They usually know how to gracefully handle offline mode even if the content they provide comes from the internet.

To create a convincing app with PWA technology requires creating an awesome offline experience, and this seems to be a major pain point as well.

Understanding how service workers work, handling spotty connections, knowing if what is stored locally will be available over time aren't easy things to do.

### 5. Testing 🧪

PWAs are hard to test. The main pattern I found here was about testing PWA features.

People complain that changes to the web app manifest (for example when using the share target API) are really hard to test and require uninstalling and reinstalling the app.

### 6. Icons 🖼️

Generating icons for all kinds of devices seems to be a pain point too. Multiple sizes are required per operating systems, and especially on Apple devices.

<hr>

That's it for now. I hope this quick survey can help inform some decisions out there. I think a lot of it is addressable, and in fact, being addressed now already. But there is still room for a lot of improvements: better features, better docs, better development and testing tools, more libraries, simpler APIs, and more.
