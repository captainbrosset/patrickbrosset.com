---
layout: article.njk
title: DevTools interop
tags: article
date: 2022-05-10
excerpt: "DevTools can play a big role in users' adoption of new and existing web platform features. In this article, I argue that browser vendors should get together and align forces with efforts like Interop 2022 to bring a common set of tools across browsers that help adoption."
thumbnail: "https://web-dev.imgix.net/image/RYmV5NPuMZRoF3PVwIXTUpdYeQ23/xv75zUKa4jUR2xGMZ7Xb.jpg?auto=format&w=500"
altText: "A brick wall"
---
As the [MDN Web Developer Assessment (Web DNA) surveys](https://insights.developer.mozilla.org/) showed, the number one frustration web developers have is due to incompatibilities of the web platform between browser. New features don't usually get implemented at the same time in all browsers, and existing features are not supported in exactly the same in all browsers. This makes it often really hard for developers to know exactly what is safe to use and whether they'll have an easy time using a particular feature across their target browsers.

Efforts like [Compat 2021](https://web.dev/compat2021/) and [Interop 2022](https://web.dev/interop-2022/) are great collaborative projects where browser vendors and other stakeholders are coming together to address this top pain point. Using the findings of the Web DNA surveys (and other criteria), they identified specific areas of the web that suffered from compatibility problems and worked (and are working) together to fix them.

This is great and needs to continue happening. Going forward, we absolutely need to find ways to continue capturing what the top pain points are and address them in order to create a platform that's more enjoyable and welcoming to work with.

Another aspect that shapes a developer's experience of the web platform is the discoverability and debuggability of its features. It's great for features to be available, and to be consistently implemented between browsers, but people need to know about them, and have the right type of support when they try to use them.

### Following in the footsteps of CSS Grid

CSS Grid was both very long in the making and really fast.

It was long because the time it took between the first ideation and prototype (by Internet Explorer), and the time it actually appeared in a CSS spec implemented in major browsers was somewhere between 5 to 10 years.
But it was also really fast because the time between when people starting hearing about grid and the time it became available in all browsers felt instant.

This really hasn't happened many times. New web features typically get implemented in each browser engine depending on their own priorities, and those vary.

Recently, CSS Cascade Layers had similar luck (although it's not luck at all, but the hard work of many people working together) and got implemented in Chrome, Edge, Firefox and Safari almost at the same time.

But, coming back to Grid, it's available everywhere, has great docs, articles, and conference talks, and great debugging tools as well!

Open Firefox, Chrome, Edge, or Safari DevTools now and take a look at any element on a page that uses CSS Grid. You'll quickly realize that there's a tool in there specific to grid which helps with finding out where grid lines are, what their numbers or names are, etc.

This tooling is awesome for discoverability, easy to find, and makes it much easier to understand the concept of grid at a glance. And it's great for debuggability as well. With the grid lines overlay, it's much easier to try things out and take risks. You're not trying to fix bugs in the dark.

I remember when the first Grid tooling appeared in Firefox, it was a huge success. For some time, all we could see at CSS conferences were screenshots of the Firefox Inspector. And now every browser has something like this.

### Tooling as a part of the feature

A web feature isn't only about its implementation in browsers. The implementation is half of the story only.

There are various other aspects to a successful feature: to what extent it is implemented, whether documentation exists (often on MDN), whether people have spent time creating learning material (blogs, conference talks, tutorials, demos, etc.), whether the browser compatibility information is available (on MDN and can I use), and whether development and/or debugging tooling exists.

With regards to the browser implementation aspect, projects like Interop 2022 help a lot.
With regards to documentation, things are pretty great thanks to MDN which everybody, especially browser vendors, can contribute to directly, and thanks to the Open Web Docs support.

But tooling is a whole other story. The various DevTools teams know each other and sometimes work together. It's a very small world. They mostly agree on the basic feature that every DevTools should have. But it's all non-standard and DevTools is sometimes a place where fierce competition happens. And this leads to sometimes very different tools being available across browsers.

From a developer's point of view, it makes very little sense. Developers mostly don't choose DevTools, they choose a browser and use the DevTools that comes with it. So this fragmentation between browser is once more a source of frustration. When a developer needs to switch to another browser to test something, it can be frustrating that the same tools don't just exist.

DevTools is a big part of a developer experience with the web, and is uniquely place to boost adoption of new features too. It can help developers discover features, debug them, and find help about them (most DevTools link to MDN from their UIs in some way).

### Proposal

I would love for DevTools to be part of efforts like Interop 2022 or/and future similar endeavors.

There are 15 areas of focus in Interop 2022, almost all of them have to do with CSS. Turns out CSS is an ideal technology for DevTools to help with because of the real-time nature of its debugging loop. DevTools can provide contextual help on CSS features, help adoption with user-friendly wysiwyg-style playful UI, and surface layout engine information when needed.

While DevTools teams tend to agree on a basic level of feature parity, there's no concerted effort to bring the same tooling for these important compat features yet, and I'd love for this to change.

We probably shouldn't go to the other extreme side of the spectrum either and standardize DevTools. DevTools is a complex user product, not an API, it makes little sense to standardize every aspects of it. It might even kill the existing sane competition that pushes the state of web debugging forward.

However, it would be beneficial for all the DevTools teams to get together as a group and agree on high-level product UI descriptions for how the debug a number of web features such as the ones identified in the Interop 2022 project.

An important role tooling can play in this context is one of documentation, adoption, and compatibility. Tooling that helps developers understand what's available, and how to use it would go a long way.

The Flexbox tool in Chromium and Safari is a great example because it teaches developers about the various kinds of alignments and how they work.
The Flexbox tool in Firefox goes even further and surfaces some insights about how the flex algorithm works. This is great, but should probably not be in scope for this proposal. Browser vendors should feel free to innovate and go further on their own.

### Examples

- The `color-mix()` function could use some DevTools support to at least show a color swatch next to the nested colors, and one next to the result.
- The `color-contrast` function is in a similar case. Showing color swatches and an indication of which color won, and what the contrast for each was seems important for the developer experience.
- Scroll snapping is also an area of improvement and adoption could benefit from tooling. There is some in Chromium already and it would be good to standardize on the basic user-stories that have tooling needs.
- Subgrid might also benefit from new tools.
- ...
