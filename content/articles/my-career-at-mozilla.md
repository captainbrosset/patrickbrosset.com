---
layout: article.njk
title: My career at Mozilla
tags: article
date: 2020-03-18
excerpt: "A look back at some of the things I helped build while working on DevTools at Mozilla."
thumbnail: "https://www.mozilla.org/media/protocol/img/logos/mozilla/logo-word-hor.e20791bb4dd4.svg"
altText: "The Mozilla logo"
---
Over the past 6,5 years, while working at Mozilla, I was involved in a lot of different projects related to Firefox DevTools.

During that time, a lot happened, and so much of it was really amazing to be a part of. I had a lot of fun, met so many wonderful people who shared my passion for web tooling.

### My career in numbers

* I filed more than 1100 new bugs on [bugzilla](https://bugzilla.mozilla.org/).
* I commented 15000 times over 5400 different bugs.
* I fixed almost 500 bugs.
* I reviewed about 1800 commits that landed in [the mozilla-central repository](https://hg.mozilla.org/mozilla-central/).

### My different roles

I started as a software engineer, moved on to become one of the leads for the Inspector part, and then the [DevTools module owner](https://wiki.mozilla.org/Modules/All#DevTools) (in Mozilla linguo, this means the technical decision maker for the entire DevTools codebase).
I finally ended up as an engineering manager for a few years. 

I have been involved in pretty much all of the phases that make up the product engineering lifecycle and I have learned so much from each of them. 
I implemented new features, fixed bugs, fixed tests, worked with other engineers, ideated on new user features, ran user tets, built prototypes, communicated with designers, QA, management, product managers, and managed amazing engineers. 

### The things I helped build

The list below is, by no means, a list of the things I, personally, implemented. I did do some of them myself, but for a large part, they were team efforts, and I only contributed to them in some way or other (managing the team, reviewing patches, etc.).
This list is also not complete. A lot of the work that happened (and this is true for any codebase) was hidden: fixing tests, fixing bugs, cleaning things up, etc. 

#### A bunch of smaller features

*  Color picker for CSS
* `<img>`, `<canvas>` and CSS `background-image` preview on hover (in Rules, Computed and DOM)
* `.cls` panel in the Rules sidebar to edit classes
* Flashing of elements in the DOM when mutations occur
* Ability to highlight all elements matched by CSS selectors in the Rules sidebar
* Displaying whitespace text nodes when they impact layout ([more about this here](https://patrickbrosset.com/articles/2016-10-21-when-does-white-space-matter-in-HTML.html))
* Highlighter for text nodes
* Copy images as data-uri strings
* Copy various css paths and xpath for elements
* Highlight DOM nodes from properties in the Console and Debugger panels
* Expand all nodes in Inspector with `alt+click`
* Display non-rendered nodes differently in Inspector
* Make URLs clickable in Inspector
* Highlight the corresponding box-model region in the page on hover of Box-Model panel
* Button to insert new DOM nodes
* Paused debugger page overlay
* Display offset parents for positioned elements in Box-Model panel
* Reveal font usage on the page on hover in the Fonts sidebar
* New scroll badge in Inspector to find elements with overflows

#### The bigger features

* New cross-browser Compatibility sidebar to show all compat issues on the page
* Wysiwyg editor for positioned nodes
* Tooltip to edit CSS filters
* Tooltip to edit animation cubic-bezier timing functions
* Grid Inspector
* Flexbox Inspector
* Fonts Editor
* Shapes Path Editor
* CSS Changes sidebar
* Inactive CSS
* CSS Transform visualizer
* 3-pane layout
* Animation Inspector
* First version of the Performance monitoring panel
* RDM <meta viewport> handling
* Accessibility Inspector panel
* Valence, a protocol adapter to debug Chrome and Safari from Firefox DevTools
