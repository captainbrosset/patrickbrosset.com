---
layout: article.njk
title: A release note for the web platform
tags: article
date: 2024-09-04
excerpt: "What's available on the web platform today? What became available with the latest version of all major browsers? Do you know? How do you track? In this blog post, I explore why the web platform needs a release note, how it can be done, and how you can help make it happen."
thumbnail: "/assets/web-release-notes.png"
altText: "A drawing of a loudspeaker with the text What's New on the Web on it."
---
tl;dr: the [WebDX Community Group](https://www.w3.org/community/webdx/) is working hard on cataloging the features of the web platform, and mapping them to their availability in browsers, which is making it possible to create a release note for the web platform. Check out our work in progress [web platform release release notes](https://web-platform-dx.github.io/web-features-explorer/release-notes/).

---

As a web developer, do you know what's available for you to use on the web platform today? Also, do you know what's new since the last version of all major browsers? If you do, then please do share with the dev community. I think keeping track of what's available on the web has been a hard problem for a long time.

Most dev marketing and dev relation teams tend to focus on the bleeding edge features. I get it, after product managers and engineers have spent major efforts in designing and implementing a new feature on the web, they want to call it a day, and pass the baton to devrels to handle the communication.

Unfortunately, this way of communicating about the web platform isn't what developers really need. A feature is simply not a web platform feature until it exists in all the implementations (i.e. browsers) that users care about.

Talking about bleeding edge features is still important. Talking early leads to early developer engagement, and therefore feedback which may help shape the feature. But the developers who can afford to engage early in the process are a minority. The majority of developers are busy solving their day to day issues, and may not always have the luxury to follow the latest features that a given browser just implemented.

Sites like [caniuse.com](https://caniuse.com) and [MDN](https://developer.mozilla.org) are amazing resources for developers. They provide a lot of information about what's available on the web platform. But, they are not shaped as a release note. They don't give you information about what's new this month, or what's coming soon.

Other application platforms have release notes. If you develop apps for Android for example, you can check the different versions of Android, their release dates, and list of new features and bug fixes for each. Same on iOS, Windows, etc.

The web platform is different. It doesn't have a version number, or just one core SDK. It's a multi-implementation platform that's, by nature, very fragmented. It grows bigger in multiple directions at the same time, without much concerted efforts from implementers to move in the same direction at the same time. This makes a release note for the web a hard problem to solve.

---

The recent work that we've been doing on the [WebDX Community Group](https://www.w3.org/community/webdx/) is a step in the right direction. We are trying to create a community-driven effort to index all of the _features_ of the web platform, give them unique identifiers, and track their availability across all major browsers. This, in turn, lets us track what features are available in browsers in which versions, and at which dates. Based on this data, we can create a release note style document that tells you what's new on the web for any given month.

If you want to see a preview of our work in progress, check out the [list of monthly release notes](https://web-platform-dx.github.io/web-features-explorer/release-notes/) on the web-features-explorer website.

If we take [July 2024](https://web-platform-dx.github.io/web-features-explorer/release-notes/july-2024/) as an example, here's what happened:

* [The `font-synthesis` CSS property](https://web-platform-dx.github.io/web-features-explorer/features/font-synthesis/) became **Baseline widely available**, which means it's been support for more than 30 months on all core browsers. This means that, since July 2024, using this property in your project should be very low risk. You should always check which browsers your actual users have, but your confidence in using this property should be high.
* Several other features became **Baseline newly available**, which means that, since July 2024, they're now available across all core browsers. This means that if your users all have the latest versions of the core browsers, then you can safely use these features. But, again, always check which browsers, and which versions of these browsers your actual users have. In any case, it's a good time to at least learn about these features:
  * [Alt text for generated content](https://web-platform-dx.github.io/web-features-explorer/features/alt-text-generated-content/).
  * The [`font-size-adjust`](https://web-platform-dx.github.io/web-features-explorer/features/font-size-adjust/) CSS property.
  * [Unsanitized HTML parsing methods](https://web-platform-dx.github.io/web-features-explorer/features/parse-html-unsafe/).
  * [Registered custom properties](https://web-platform-dx.github.io/web-features-explorer/features/registered-custom-properties/).
  * [Relative colors](https://web-platform-dx.github.io/web-features-explorer/features/relative-color/).
  * [Resizable buffers](https://web-platform-dx.github.io/web-features-explorer/features/resizable-buffers/).

The web-features-explorer website is generated nightly, based on the latest information that's available in the [web-features](https://github.com/web-platform-dx/web-features/) and [browser-compat-data](https://github.com/mdn/browser-compat-data/) repositories. You can keep an eye on the list of release notes to see what's coming in the current month.

I hope this prototype of a web platform release note is useful for you to keep track of what's available, and what's coming. If you have any feedback, please open an issue on the [web-features-explorer repo](https://github.com/web-platform-dx/web-features-explorer). And, ff you want to get involved, join the [WebDX Community Group](https://www.w3.org/community/webdx/), and help us make this a reality.
