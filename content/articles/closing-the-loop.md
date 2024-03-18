---
layout: article.njk
title: Closing the loop - From developer signals to browser maker decisions
tags: article
date: 2024-03-15
excerpt: "Musings about sharing a common language between web developers and browser makers to talk about web features, and how to close the loop from developer signals to browser maker decisions."
thumbnail: "/assets/loop.png"
altText: "An abstract illustration of a loop"
---

## Problem statement

The way I see it, our (web) industry has two problems when it comes to web developer feedback:

1. **Web developers have a hard time keeping track with the web platform and sharing feedback**.

   There's a general lack of transparency about how the "sausage is made", and the whole thing feels too intimidating and opaque for web developers to get involved and stay up to date.

   More specifically, when a web feature is not implemented in a browser, it's hard to know the reason for it to be missing and whether it will be implemented at some point, as well as where progress can be tracked.

1. **Browser makers have a hard time basing new feature decisions on developer signals**.

   Surveying developers helps, but survey fatigue is a real thing, and we can't always ask developers about their needs across a wide variety of web development areas. Prioritization is often based on internal priorities, and gut feelings about what the ecosystem needs.

   The [Interop](https://wpt.fyi/interop) [focus area selection process](https://github.com/web-platform-tests/interop/blob/main/2024/selection-process.md#focus-area-selection-process) is a specific instance of this. The process seems opaque from the outside, and it's hard to know if clear signals from developers feed into the process.

## Could a common language be part of the solution?

One thing that doesn't help both of the previous problems is the **lack of a common language between web developers and browser makers to talk about web features**.

I believe the following would help:

1. Agree on a nomenclature for the web.

   The two parties don't speak the same language. What's a feature? Do web developers think of features in terms of specifications? Do they think of them as individual browser increments? Even MDN and Can I Use don't always agree on what a feature is, how coarse or fine grain it is. Browser makers and web developers definitely don't always share the same understanding of what a feature is.
   
   A common language could provide much needed common grounds. If everyone starts calling features the same way, we get clarity on both sides. Web developers can more easily track the development of a feature. Browser makers can more easily track signals from developers.

2. Create a virtuous circle where web features and how well they're supported is clearly documented, and where sending feedback about your needs is easy and rewarding.

## About a common nomenclature

The [WebDX web-features repository](https://github.com/web-platform-dx/web-features/) is shaping up to be a really useful catalog of web features, designed from a web developer's perspective, complete with hierarchical groups of features.

While not that useful on its own, the catalog has the potential of becoming an interesting missing link when added to places that developers go to, and to places that browser makers communicate status on.

For example, the feature names that the WebDX web-features repository defines are linked to specifications, and to [Browser Compatibility Data (BCD)](https://github.com/mdn/browser-compat-data/). This is a good start.

The feature catalog can also be used for a better information architecture on MDN, as well as to provide simplified browser compatibility information on MDN and Can I Use.

On the other side of the spectrum, the WebDX web-features names are also starting to be used to tag [Web Platform Tests](https://wpt.fyi/), and it would be great if they were also used by browser bug trackers, by standards position websites ([Mozilla](https://mozilla.github.io/standards-positions/), [WebKit](https://webkit.org/standards-positions/)), or on [chromestatus.com](https://chromestatus.com).

Hopefully, with this kind of interconnectedness, when a developer asks themselves:

> What's going on with feature X?

They'd be able to find the answer easily:

> Oh, it's spec'd here, documented here, and implemented in browsers A and B, but not in browser C, because of this bug which is linked here and which I can comment or vote on.

## About developer signals

Surveys are useful, and tell us a lot about developer needs. But referring to survey results over time or comparing between them isn't always easy. Using web feature identifiers in surveys might help a little bit too.

But also, developer signals don't have to be in the form of surveys. Browser maker bug trackers often accept votes or, at least, comments. Mapping web features to their corresponding implementation bugs would provide an easy way for developers to go and vote on these bugs. Right now, I don't think many developers know where to go to signal their needs.

## About rewarding developer signals

Going out of your way to tell a browser maker that you need a feature takes time and energy. We need to fix this by making it rewarding to do so.

If developers' feedback clearly feeds into browsers' prioritization process, people are more likely to engage. It would also be great to make the Interop process more transparent. If vote/comment counts on bugs are used to feed into the Interop focus area selection process, developers are also more likely to engage.

## The `impl_url` field in BCD

The [Browser Compat Data](https://github.com/mdn/browser-compat-data/) open-source project, on top of maintaining a database of browser compatibility data, also has some information about the browser bugs that are blocking the implementation of a feature.

For example, the [Web MIDI API](https://developer.mozilla.org/docs/Web/API/Web_MIDI_API#browser_compatibility) isn't implemented in Safari (at the time of writing), and the BCD data about it has a [link](https://github.com/mdn/browser-compat-data/blob/16df68556803e30b10b19782819aa432a031a30d/api/Navigator.json#L4024-L4027) to the [bug in WebKit](https://webkit.org/b/107250) that's tracking its implementation.

This is great, because it means that other projects that use BCD, such as MDN itself, can show the lack of support **and** point developers to the right place to signal their need for the feature:

![The Navigator.requestMIDIAccess() MDN page, showing that the feature is missing on Safari, and showing a link to the tracking WebKit bug](/assets/mdn-midi-safari.png)

I think this link has a lot of potential when it comes to "closing the loop", and I've recently spent some time adding more of these links to BCD.

Adding links for existing features isn't straightforward. It takes a lot of research through bug trackers, standards positions, specs, mailing lists, etc. But it's definitely worth it because of the impact it will keep on having on web developers, who will now be one step closer to actually being able to influence the web platform.

The web is this wonderful (mostly) open platform. Let's keep it as open and transparent as we can. Let's give everyone a voice, and a common language to speak with.
