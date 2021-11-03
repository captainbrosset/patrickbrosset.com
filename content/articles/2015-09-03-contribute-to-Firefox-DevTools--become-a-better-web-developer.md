---
layout: main-layout.njk
subtitle: articles
pagetitle: Contribute to Firefox DevTools, become a better web developer
tags: article
---

## Contribute to Firefox DevTools, become a better web developer

<time datetime="2015-09-03">September 3rd, 2015</time>

If you’re a web developer and you’re interested in open source projects and you commonly use browser devtools in your activities then you might want to read on.

In this article, I’ll go over some of the things that make the Firefox DevTools open source project special, and how those things can make you better at web development.

_(If you’re already convinced and just want to get started right away, scroll to the bottom for the list of links)_

### It feels like Web Development anyway

The whole thing is written as a client-server application. It has a front-end part that’s all written in HTML, CSS and JavaScript, and it connects to a server that’s written in JavaScript too.

Those two parts communicate via a TCP protocol but from JavaScript, it’s encapsulated in a way that you just end up calling asynchronous functions.

The client-server separation comes from the fact that DevTools is not only able to debug your local browser tab, but also a tab on a remote device (maybe you have a FirefoxOS phone you want to test an app on, or need to fix a bug on a site on Firefox for Android, etc.), and so the front-end isn’t guaranteed to have access to the page it’s inspecting.

Reasoning about this is simple if you think of it this way:

* the front-end is the toolbox UI: the panels, the things you click one, where you see previews of DOM nodes, and script breakpoints, etc.
* the back-end however is what runs on the page/device/tab you are targeting. It’s a series of JavaScript objects that live next to the content page you are inspecting, so it has access to DOM nodes, stylesheets, scripts that are running, can listen in on network requests, etc.

As I said earlier, the whole code is written using the languages of the web, so you’ll feel right at home.

Fun fact: we actually use DevTools to debug DevTools! In fact you can use DevTools to debug the whole Firefox UI, because that’s written in HTML, JavaScript, CSS too!

https://www.youtube.com/watch?v=nxB1hj3UC4w

That’s a really cool way to test your own work. Because DevTools is an app for developers, you’re not such a bad user to test it on!
Knowing the complexity and volume of the Firefox UI, if the tool you work on is up to the task when debugging it, then that’s a pretty good field test too.

In terms of code management, whether you’ve used Git or Mercurial in the past, that’s no problem, the project can be contributed to using any of them, and tools and procedures exist for both:

* Here are [the docs for using Mercurial](https://mozilla-version-control-tools.readthedocs.org/en/latest/hgmozilla/index.html)
* Mozilla has a long history of using the Mercurial MQ extension. While it’s useful, it’s not recommended anymore and instead [you should use the much more git-like workflow](http://gregoryszorc.com/blog/2014/06/23/please-stop-using-mq/) with branching, bookmarks, rebases and history rewriting.
* If you want to use git, there’s a [mirror repository on GitHub](https://github.com/mozilla/gecko-dev/) and hear that [the git-cinnabar tool](https://github.com/glandium/git-cinnabar) is really useful for working with Mercurial repositories directly from Git.

### Live on the edge — Learn the newest technologies

One of the great parts about working on a piece of the browser is that you can take full advantage of that browser’s functionalities. DevTools run in a sort of a privileged mode that makes it possible to use all the new and shiny web platform features.

If you’ve wanted to try new implementations of the EcmaScript standard, know that the DevTools code makes use of pretty much all the new syntaxes introduced in ES2015 supported in Firefox. Just looking at the code is a great opportunity to learn.

The project makes extensive use of things like modules (with a common-JS like module loader), promises (as well as tasks which is an awesome way to write asynchronous code using `yield` and generator functions). Of course things like [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let), [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const), [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set), [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator), and more, get used a lot too.

DevTools is also uniquely place to make use of all the latest CSS features that are implemented in Firefox. Some of these are CSS variables (extensively used for theming the app), Flexbox layout, CSS filters, animations, transforms, etc.

And if you’ve wanted to learn about [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG), DevTools also makes use of those for pretty much all the icons in the app now, and [Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial) is used quite a lot for drawing graphs in places like the [performance tools](https://developer.mozilla.org/en-US/docs/Tools/Performance).

### Go over the edge — Learn how browsers work

Why stop there when you can go even further?
Working on DevTools is a unique opportunity to learn the web _from the inside_.

The web platform evolves rapidly, new APIs and features are specified and implemented on a regular basis, and most of them need some sort of tooling support. Something that helps users debug problems when using these APIs or features for the first time.
And so, working on DevTools means that you not only get to learn about these new things early, but also get to know more about how they work. Three examples come to mind:

* [DOM Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) are new, and they’re not particularly easy to debug, so there’s some work going on right now about adding a new promise debugging panel.
The people working on this panel not only have the chance to learn more about promises, but also get to work with the very people that are implementing them in Firefox (in C++). A promise debugging panel needs some special platform APIs to list promises and their status, which is a sure way to dive into interesting implementation discussions.
* [Web animations are getting a whole new API](https://w3c.github.io/web-animations/) specified and implemented at the moment that will change the way animations are created, sequenced, dynamically changed and provide a much more compelling way to animate things on the web.
Similarly to the previous example, working on a tool to list, inspect and edit animations means that you get to use this new API, but also get into low-level discussions about how it’s implemented and how specific platform APIs can be added to allow the tool to dig in more useful information about them for developers.
* Working on the [performance tool](https://developer.mozilla.org/en-US/docs/Tools/Performance) is also a great way to learn how browsers work. Especially what the rendering pipeline of a browser is like, and this has direct consequences on the way you’ll approach web development in the future (also note that browsers share an almost identical rendering pipeline, so you wouldn’t be learning things that only apply to Firefox).
This tool shows the internal operations the browser executes when rendering a page, and so you get to learn about things like restyles, reflows, compositing and painting and what takes time, as well as what can be optimized.

Generally, working on DevTools means that you’re writing code that’s at the frontier between the content code (the code that runs in the page) and the browser C++ APIs that are exposed to JavaScript.

Maybe C++ is already your thing, maybe it’s not but you’d like to find out more. Well, at the very least you’d come upon C++ APIs you’ll need to use, which will give you gradually more knowledge on how browsers work which will, in turn, make you a better web developer.
And if you want more, there are always DevTools features that require some sort of C++ platform support which you can get mentored to hack on yourself.

### Get involved in an awesome community

Mozilla is known for its really big and active community of Mozillians, and DevTools, being a Mozilla project, is no exception.

This means you get to work with both Mozilla staff and volunteers, distributed all over the world, reporting and fixing bugs and landing awesome features in DevTools. And you can get in touch in various ways:

* Come and join the #devtools channel on [IRC](https://wiki.mozilla.org/IRC)
* Join the conversations happening on the [mailing list](https://lists.mozilla.org/listinfo/dev-developer-tools)
* Tweet at [@FirefoxDevTools](https://twitter.com/FirefoxDevTools)
* Report ideas and vote for existing ideas on the [uservoice site](https://ffdevtools.uservoice.com/)
* Tell the world about your cool new feature on the [Mozilla Hacks blog](https://hacks.mozilla.org/)
* Or even meet some of the DevTools people in person by getting invited to Mozilla events (there are 2 bigs ones per year, and an important number of volunteers get invited).

If you’re not too sure yet but feel like looking to get an idea, I highly suggest joining IRC and/or the mailing list and just getting a feel for the types of conversations that happen there.

Remember, it’s open source which means everything is done in the open, you can tell the world what you’re working on, share early demos and get quick feedback. That is a powerful motivation tool right there.

### How hard is it to get started?

It’s not that hard at all. It comes down to:

* reading some docs
* checking out a repository
* building Firefox
* making changes to DevTools
* posting patches on bugzilla

Of course I’m not going to lie, like any reasonably sized project that has been going on for a few years, there are complexities attached to that. Docs may sometimes be scattered around, the first build may take a long while, posting patches requires some preliminary configurations, etc. But it’s not rocket science either, and there are always people on the mailing list or #devtools or #introduction IRC channels that can help.

Also, there’s an ongoing project aiming at removing even more barriers to entry for new contributors. In the end, getting the code, building and making DevTools changes that can be reloaded in Firefox will be even quicker and simpler.

### Alright, I’m convinced, where do I start?

* First things first, go through our (short) [wiki page](https://wiki.mozilla.org/DevTools/GetInvolved), especially take a look at our [hacking guide](https://wiki.mozilla.org/DevTools/Hacking)
* Then [find a bug to work on](http://firefox-dev.tools/) (or ask on IRC)
* Ping [people](https://wiki.mozilla.org/DevTools/GetInvolved#Communication) on bugzilla if you need mentoring or just pointers to get started
* Learn [how to submit a patch](https://developer.mozilla.org/en-US/docs/Mozilla/Developer_guide/How_to_Submit_a_Patch) for it

That’s it! Welcome on board!