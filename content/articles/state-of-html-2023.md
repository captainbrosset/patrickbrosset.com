---
layout: article.njk
title: My analysis of the State of HTML 2023 results
tags: article
date: 2024-06-10
excerpt: "The State of HTML 2023 results have been available for a few weeks, here's my short analysis of some of the results."
thumbnail: "/assets/stateofhtml2023.png"
altText: "The State of HTML 2023 intro illustration"
---

As someone who works on web browsers, I take web development survey results very seriously. They're a way for us, browser makers, to understand what you, web developers, need from us. The pain points you feel, the features you use, the features you need, and a bit of a general trend of the web development ecosystem.

As far as surveys go, the State of _&lt;thing&gt;_ survey series is a really good one to keep an eye on. The [State of JS](https://stateofjs.com), [State of CSS](https://stateofcss.com), and [State of HTML](https://stateofhtml.com) run yearly and allow us to compare results year over year. There are other places to get developer signals about the web out there, of course, but the State Of _&lt;thing&gt;_ is one of the major ones.

For more information about how the State of _&lt;thing&gt;_ survey series started, see [Sacha Greig](https://sachagreif.com/)'s [devographics website](https://www.devographics.com/).

## The State of HTML 2023

You can see the results for yourself on the [State of HTML 2023 website](https://2023.stateofhtml.com/).

Last year was the first time the State of HTML survey ran. Because it was the first time, the questions were a little more open-ended than other State of _&lt;thing&gt;_ surveys, simply because there were no previous surveys to compare to, and therefore more free-text answers were needed.

This led to a lot of free-text answers that needed to be categorized, which was a lot of work. This explains that the results took a little longer to come out than the other State of _&lt;thing&gt;_ surveys.

Note that _HTML_, in State of HTML, really means: everything that's not already captured in State of JS and State of CSS. HTML, as a language, was not the only thing surveyed here.

## My analysis

The sections below are based on the results of the survey, and are my own, personal, analysis of the results. I'm only speaking for myself, and only focused on the areas of the survey that were of interest to me. You migth find other interesting insights in the survey results, so I encourage you to go check them out for yourself.

### Interoperability issues

The lack of browser support for the features that people want is a common theme throughout the survey, and this is true of other web-related developer surveys. The web is fragmented, and this has always been a big pain for web developers. But one question in particular focuses on this specific topic: [Which existing HTML features or browser APIs are you unable to use because of browser differences or lack of support?](https://2023.stateofhtml.com/en-US/usage/#html_interoperability_features). Here are some of the top issues:

- Form input elements is the top group.

  It's actually presented as a group of 15 sub-features, none of which are as high as the other features in the results. But, combined as a form input group, they are the top issue.
  
  In particular, web developers complain about the lack of date/time pickers.
  Additionally, many people requested a stylable `<select>`.

- The [Popover API](https://developer.mozilla.org/docs/Web/API/Popover_API) is high in the list too.

  Thankfully, the API has now shipped in all browsers (Firefox recently added support for it in Firefox 125, which became available in April 2024, after the survey ran).

- There are many complaints about the [`<dialog>` element](https://developer.mozilla.org/docs/Web/HTML/Element/dialog).

  This was surprising to me at first, knowing that the element has been available across browsers since the beginning of 2022 (Safari and Firefox shipped it in March 2022 with 15.4 and 98, respectively).

  My understanding now, is that the element is known to have accessibility and usability issues. I think people generally think that it's not entirely usable across browsers yet. The [dialog element](https://a11y-dialog.netlify.app/further-reading/dialog-element/) on the a11y-dialog website summarizes the remaining problems well.

- [View Transitions](https://developer.mozilla.org/docs/Web/API/View_Transitions_API) is also very high in the list.

  Respondents seem to generally want View Transitions to be supported in multi-page apps (MPA) too (i.e. across page navigation). I can totally understand this. Using View Transitions to easily animate between DOM changes is nice, but support for MPA is real promise here. And, in many cases, might make it possible for web developers to ditch their client-side JS rendering frameworks in favour of server-side HTML rendering, which performs better.

- The functional [`:has()`](https://developer.mozilla.org/docs/Web/CSS/:has) CSS pseudo-class is also very high in the results.

  This is not surprising considering that it shipped in Firefox in December 2023 (Firefox 121), after the survey ran.

  But also, my feeling is that web developers tend to be very careful with using new features, even when those features are supposedly available in all browser engines. I think web developers have a sense of caution, where, even if a feature is implemented everywhere, they'll just wait for more time before they use it.

  The nature of the web platform is such that this is the safest approach to take. Unfortunately, without actually knowing what browsers your users have when accessing your website, it's also the _only_ approach you have. You can never be sure if all your users have up to date browsers.

- [Progressive Web Apps](https://developer.mozilla.org/docs/Web/Progressive_web_apps) is in the top 7 on this question.

  This shows interest in PWAs, and frustration that developers still can't use them everywhere.
  
  One of the most frequent complaint is related to the PWA install prompt, especially that it's not possible to invite the installation of a PWA on all browsers.
  
  The other most frequent answer is about the lack of PWA support on iOS, and on Firefox on desktop OSes.

  More about PWAs in the [Progressive Web Apps](#progressive-web-apps) section, below.

- [CSS Subgrid](https://developer.mozilla.org/docs/Web/CSS/CSS_grid_layout/Subgrid) is high too.

  Also understandable, because it became available on all browsers only after Chrome/Edge implemented it in version 117, in September 2023, after the survey ran.

  Looking into the results more, it also became apparent that web developers want more/better documentation about subgrid, and aren't completely convinced that there is a need for this feature.

- The last one I want to highlight is [Web Components](https://developer.mozilla.org/docs/Web/API/Web_components). 

  Many of the complaints are about the lack of [declarative shadow DOM](https://developer.mozilla.org/docs/Web/HTML/Element/template#shadowrootmode), which allows you to define create a shadow root for you components without using JavaScript. The good news is, it's now available across browsers (as of Firefox 123, which shipped in February 2024).

  Respondents also complain about the lack of support for [customized built-in elements](https://developer.mozilla.org/docs/Web/API/CustomElementRegistry/define#defining_a_customized_built-in_element), which allow you to extend any HTML element by using the `is` attribute (instead of having to define your own custom element). This feature is still missing in Safari, because [WebKit opposes the feature](https://github.com/WebKit/standards-positions/issues/97).

  More on Web Components in the [Web Components](#web-components) section, below.

### Limited support

The survey contains another question, similar to the above: [Which existing HTML features or browser APIs are you unable to use for other reasons (and why)?](https://2023.stateofhtml.com/en-US/usage/#html_functionality_features). This question led to answers that more or less confirm the previous question, with some of the top features being:

- Input element
- Dialog
- Form inputs
- Web Components
- Popover
- Stylable select/drop-down menu

But the question also led to some new insights:

- `<details>` and `<summary>` elements.

  Respondents complain about the element's poor accessibility, lack of animations, and lack of mutually exclusive accordion behavior.

  Indeed, by using the `name` attribute of the `<details>` element, you can make a series of `<details>` element act as an accordion where, when one is opened, the others are closed. Unfortunately, this feature isn't available on Firefox yet. You can [see the bug here](https://bugzilla.mozilla.org/show_bug.cgi?id=1856460), and maybe vote for it to be implemented.

### Sentiment on existing features

One nice thing that the State of HTML survey results allow us to do is to sort features by sentiment. For example, on the [HTML features and other browser APIs](https://2023.stateofhtml.com/en-US/features/#all_features) question, respondents were asked to say whether they have used, heard of, or never heard of a feature, but they could also optionally leave a positive, neutral, or negative sentiment about the feature. This is useful to understand the developer ergonomics of a feature. People could also leave free-form text comments, and going through those is sometimes quite eye-opening.

For example, of the features that have the highest negative sentiment, and which people have used, the following features stand out:

- Shadow DOM
- Defining Custom Elements
- Using Custom Elements

Basically, developing and using Web Components feels hard, and people don't like it. More about this in [Web Components](#web-components).

There are more things to be extracted from this question's results, in particular a bunch of app-related features that people commented about. I'll come back to these later in the post, when talking about PWA. See [Progressive Web Apps](#progressive-web-apps) below.

### Web Components

One of the question is about [Web Components](https://2023.stateofhtml.com/en-US/features/web_components/). In it, developers were asked their experience, and sentiment about a number of Web Components-related features.

The result is quite clear: there's a big need for a native component system, and developers are not happy with the current solutions, especially with the Shadow DOM feature.

When it comes to making Web Components, respondents complain about:

- The lack of documentation, knowledge, best practices, and the fact that the technology is complex and is hard to learn.
- About the inconsistent browser support, generally, and also specifically about the lack of support for customized built-in components in Safari.
- The complexity, style encapsulation issues, and poor accessibility of Shadow DOM.

When it comes to using Web Components, developers say that:

- Styling Web Components is hard.
- Getting them to work with frameworks like React is hard.
- Documentation was missing.
- Browser support was inconsistent.

### Progressive Web Apps

There are two questions that I want to highlight here. The first is [HTML features and other browser APIs](https://2023.stateofhtml.com/en-US/features/#all_features), which contains a bunch of PWA-related (or, really, app-related) features, which respondents have interesting things to say about:

- [Web Share API](https://developer.mozilla.org/docs/Web/API/Web_Share_API)
  
  People complain about:
  
  - The poor state of support for this API across browsers.
  - The lack of good file sharing support.
  - The fact that the API was too limited.
  - And that the browser-based share dialogs weren't good enough.

- [File System Access API](https://wicg.github.io/file-system-access/)

  This API extends the [File System API](https://developer.mozilla.org/docs/Web/API/File_System_API) by allowing developers to programmatically open file pickers to get access to files on disk. The main complaint here is about the lack of browser support for this API.

  Interestingly, an origin-private version of this API, called [Origin Private File System API](https://developer.mozilla.org/docs/Web/API/File_System_API/Origin_private_file_system) (OPFS) is now available in all browsers (since 15.2 for Safari, 102 for Chrome and Edge, and 111 for Firefox). OPFS doesn't give you access to the file system, but instead to a place on disk for your website to store and read files. So it's a good step forward for file handling, but it doesn't solve the need that some web apps (like text editors) have to give access to any file on the user's disk.

- [Window Controls Overlay](https://developer.mozilla.org/docs/Web/API/Window_Controls_Overlay_API)

  Two thirds of the people have never heard of this feature, so the feedback here is not very actionable. One interesting comment is about the fact that macOS gives native apps control over the position and the spacing of the window controls, and that this feature would be nice to have in PWAs too.

- [Badging API](https://developer.mozilla.org/docs/Web/API/Badging_API)

  Developers complain about browsers' poor support of this API, which, to me, is mostly related to the poor support of PWAs in general.

The second question which highlights PWA-related features is [What are your biggest pain points around making web apps that feel native?](https://2023.stateofhtml.com/en-US/features/mobile-web-apps/#mobile_web_apps_pain_points). This is a free-form question. Here are some of the top pain points that people noted:

- The top pain point for developers is Apple iOS' lack of support for PWAs.

- Installability is high on the list too.

  People complain that the UX to install a PWA is bad. It's hard for users to use, and some simply don't know they can install PWAs at all. The lack of installability on iOS and on Firefox for desktop is a common complaint in the results.

- There are some mentions of stores and how hard, or impossible, getting a PWA in an app store is. And how web stores are generally untrusted.

- The lack of cross-browser support also ranks high in the results.

  While this is mostly related to the installability topic, some specific features are also mentioned:

  - File handling is a big one.

    Developers want to be able to handle files natively in their apps and complain about inconsistencies between browsers, and about the lack of real file system access API in non-chromium.

  - Developers need a real client-side database solution (such as SQLLite).

    This reminds me of an interesting Chrome experiment: [SQLite Wasm in the browser backed by the Origin Private File System](https://developer.chrome.com/blog/sqlite-wasm-in-the-browser-backed-by-the-origin-private-file-system).

  - Storage APIs, Background Fetch API, and Push notifications are mentioned as features that suffer from cross-browser issues.

- One of the pain point in this question is around the fact that PWAs don't look and/or feel "native". 

  No matter how many web apps everyone already use on a daily basis to do work, it seems that this complaint is still very much alive. Developers would like PWAs to be like native apps. Specifically, developers complain that:

  - OS-native controls are missing and it's impossible to truly match the platform's look and feel.
  - Animations are less fluid and more janky. Animating smoothly between pages is impossible (thankfully, View Transitions for page navigation is coming).
  - Web apps are in this uncanny valley, where they almost feel like "real" apps, but not quite.
  - Handling gestures, on touch screen, is very far from what you can do in a native app.

- Developers also would like better docs.

  The technology feels hard to learn, and a lot of work, and docs are not always available or up to date.
  
  Over the past few years, I've spent a lot of time making sure the PWA documentation on [MDN](https://developer.mozilla.org/docs/Web/Progressive_web_apps) and [learn.microsoft.com](https://learn.microsoft.com/microsoft-edge/progressive-web-apps-chromium/) was up to date, so I feel bad. But I can totally understand this, especially for developers who have worked on native apps before. On the web, there's no one vendor, there's no SDK, and docs have to accommodate all browsers, and usually only show the lowest common denominator.

- Service Workers appears as a pain point too.

  Service Workers are too complicated. One person said that they're _"basically rocket science"_. The following aspects are thought to be hard:
  
  - Writing service workers in the first place.
  - Updating service workers on new app versions.
  - Figuring out the right caching strategy.
  - Debugging service worker issues.

- The final pain point I want to highlight is related to native API access.

  The replies are quite vague, and it seems like respondents generally wish that PWAs offered the same capabilities that native apps do. There are some specific mentions though:
  
  - File system access. Mostly that it's only in chromium, but also that even in chromium, you can't access all locations on disk.
  - Accessing device functionalities, like camera.
  - Lack of MIDI support.

### Stylable select

Responses to multiple questions of the survey mention the ability to style `<select>` HTML elements. It seems like a lot of people are passionate about not inventing a new element, but extending the existing `<select>` element instead.

The [Open UI Community Group](https://open-ui.org/) has been working on this for a few years. It originally started as a new element called `<selectmenu>`, to avoid breaking the existing `<select>` element. It, later, got renamed to `<selectlist>`, but is still a separate element. My understanding is that the latest discussions on the group are heading towards extending the existing `<select>` element instead.

In any case, many respondents say that they need this capability in the web platform. In fact, more generally, people say that they need to be able to style all form controls more than they can today.

---

There are more responses and more comments that can be read, and more filtering that can be done on the survey results. The above are just the few things that stood out as interesting to me. I encourage you to go check out the [State of HTML 2023 results](https://2023.stateofhtml.com/) for yourself, and see what you can find in there.

Looking forward the next State of _&lt;thing&gt;_ surveys.