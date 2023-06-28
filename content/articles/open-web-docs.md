---
layout: article.njk
title: What's Open Web Docs?
tags: article
date: 2023-06-24
permalink: /articles/2023-06-24-open-web-docs/index.html
excerpt: "You may have not heard of OWD. But if you're a web developer and use MDN on a regular basis, they're one of the most important organizations behind it. Read on for more details about OWD and ways you can help!"
thumbnail: "/assets/owd.png"
altText: "The OWD logo"
---
**tl;dr: [Open Web Docs](https://openwebdocs.org/) is awesome. It's one of the biggest contributors to [MDN Web Docs](https://developer.mozilla.org/). If you use MDN on a regular basis, consider [supporting OWD](https://opencollective.com/open-web-docs) (💵) so they can continue doing the work that makes all of our web dev jobs easier.**

If you're a web developer you have most likely heard and used the [MDN Web Docs](https://developer.mozilla.org/en-US/) website. Heck, even if you don't call yourself a web dev, but still write some web code every now and then, you've probably used it.

MDN is an invaluable resource for people using HTML, CSS, JavaScript, SVG, or any other aspect of the web such as security, accessibility, performance, virtual or augmented reality on the web, and so on.

Maybe you don't think about it too much, but pause for a second, and realize how many times you've used MDN to look something up today (or any other day on the job). Take a look at your browser history if you need to. Here is mine, notice how small the scrollbar is, the list goes on and on and on:

![The Firefox browser history management tool, filtered on developer.mozilla.org, showing a very long list of pages](/assets/mdn-browser-history.png)

If this matches your experience, then take a minute to read this article. It's important to understand how the things we rely on so much actually exist.

### Quick history recap

Let's not spend too much time on this, but just for context: MDN was started by Mozilla around 2005. It was then called the Mozilla Developer Network, and it was a wiki used to centralize the documentation for the various Mozilla projects, as well as for the web platform itself (check out [this snapshot of MDN in late 2005](https://web.archive.org/web/20051201012755/http://developer.mozilla.org/)).

Over time, more and more of the web platform APIs and features got documented on MDN, and it started becoming the de-facto documentation for many web developers. So much that in the late 2010s, other big tech companies, who had their own documentation websites, started redirecting their users to MDN instead and contributing to it. Microsoft, in particular, used to have a lot of web platform documentation over on [MSDN](https://wikipedia.org/wiki/Microsoft_Developer_Network), which no longer exists (or rather is now called [Microsoft Learn](https://learn.microsoft.com/)).

The idea was simple: MDN is where people go for web platform documentation, let's focus our collective efforts there instead of duplicating the content and making it harder for people to find what they need.

This led to [the creation](https://hacks.mozilla.org/2018/01/introducing-the-mdn-product-advisory-board/) of the [MDN Product Advisory Board](https://developer.mozilla.org/docs/MDN/MDN_Product_Advisory_Board) in 2018, a group of representative from various member organizations who contribute to MDN, and who meet on a regular basis to discuss the future of the project and provide guidance to ensure MDN continues providing unbiased, browser-agnostic, high-quality documentation. The PAB still exists today.

In 2020, Mozilla unfortunately had to go through a pretty big round of [layoffs](https://blog.mozilla.org/mozilla/readying-for-the-future-at-mozilla/). The MDN team, in particular, was hit pretty hard. At this point, the MDN team was the one responsible not only for maintaining the website infrastructure, but also for writing a lot of the content, and managing the active community of volunteer doc contributors. The layoffs was a big blow to the project.

Today, Mozilla has a small team of writers and engineers who write content and maintain the website's infrastructure.

### Enter Open Web Docs

High-quality documentation for the web platform is **critically important** so, with a bunch of really talented technical writers now out of a job, and so many devs out there who relied on MDN for their day to day jobs, it was clear that something had to be done.

[Open Web Docs was created](https://opencollective.com/open-web-docs/updates/introducing-open-web-docs) in January 2021 by the people involved in MDN at the time, including the PAB.

OWD is an independent, vendor-neutral, organization that is responsible for ensuring the long-term health of web platform documentation. It spends all of its resources writing new docs, maintaining existing ones, and managing the community of contributors on today's de-facto web platform documentation website: MDN Web Docs.

OWD is composed of a small team of technical writers (4 full-time employees and 1 part-time contractor) who spend their time maintaining the content, which includes writing new docs, updating existing ones, maintaining the [browser compatibility data tables](https://github.com/mdn/browser-compat-data) (which, by the way, are also used by [caniuse.com](https://caniuse.com/)), doing code reviews for the community, and so on. Take a look at their [2022 impact report](https://openwebdocs.org/content/reports/2022/) from more details.

So how can OWD do this work? The organization needs to pay those 4,5 people for their work. And to do this, because it's a non-profit organization, it relies on donations! It's funded by a mix of corporate sponsors, Google and Microsoft being the two biggest, and a bunch of individual contributors.

---

**And that's where you come in! If you use MDN on a regular basis, and would find it considerably harder to do your job without it, then consider financially [supporting OWD](https://opencollective.com/open-web-docs). You can become a backer for as little as $5 per month.**

---

It's simple, without money, OWD can't employ technical writers to continue making MDN as great as it is. Sure, OWD isn't the only contributor to MDN. Mozilla has a team of writers too, other companies contribute docs, and there are a lot of volunteers. But if you haven't done so yet, do take a look at the [2022 impact report](https://openwebdocs.org/content/reports/2022/). This should give you perspective on how much work OWD does, and how negatively impacted MDN would be if OWD didn't exist. On top of this, OWD isn't just a big part of MDN, it's also a vendor-neutral part of it. When Microsoft, Google, Mozilla, or Apple write their own docs on MDN, they always come with their own lens and biases.

### It's not just about the MDN website

Sure the MDN website is very important and if you've read this far you probably use it a lot. But OWD's impact goes further than this.

I mentioned it already, but OWD also contributes a lot to the [browser compatibility data tables](https://github.com/mdn/browser-compat-data) (BCD) which appear at the bottom of almost every MDN page. But this data is also available as [a package on NPM](https://www.npmjs.com/package/@mdn/browser-compat-data), which is used by many other tools, sites, and IDEs which you might also rely on! Here is a few examples:

* [caniuse.com](https://caniuse.com/), which maintains its own data and mixes it in with the BCD tables.

  ![caniuse.com, showing a mention to BCD in the footer](/assets/caniuse-bcd.png)

* Chrome DevTools' [Styles pane MDN tooltips](https://developer.chrome.com/blog/new-in-devtools-112/#css) which displays MDN data for CSS properties.

  ![The Chrome Devtools Styles panel, showing a tooltip with documentation](/assets/chromedevtools-mdn.png)

* Firefox DevTools' [compatibility panel](https://firefox-source-docs.mozilla.org/devtools-user/page_inspector/how_to/examine_and_edit_css/index.html#css-compatibility) which uses the BCD data to show you which browsers support the CSS properties you're using.

  ![The Firefox Devtools Compatibility panel](/assets/ffdevtools-bcd.png)

* [Webhint](https://webhint.io/) and the [Issues tool in Edge DevTools](https://learn.microsoft.com/microsoft-edge/devtools-guide-chromium/issues/) (which relies on WebHint) which use BCD to give you warnings about APIs that might not be supported in all browsers.

  ![The Edge Devtools Issues panel, showing a CSS property is incompatible on Safari](/assets/edge-issues-bcd.png)

* ESLint and its [eslint-plugin-compat](https://www.npmjs.com/package/eslint-plugin-compat) plugin.

  ![An ESLint error tooltip in a piece of code, showing that this ESLint plugin can tell you when APIs are not supported](/assets/eslint-bcd.png)

* VSCode, which displays browser compat info in its HTML and CSS [intellisense](https://code.visualstudio.com/docs/editor/intellisense) feature.

  ![VSCode, with the intellisense tooltip visible on a CSS property, showing the MDN docs and browser compat details](/assets/vscode-bcd.png)

Other websites also display MDN documentation. After all the [mdn/content GitHub repository](https://github.com/mdn/content/), where the docs are stored, is public and open-source, and anyone can use the content or even fork it. That's how [devdocs.io](https://devdocs.io/) is able to display CSS reference documentation for example.

In fact, in a future where the MDN website is no longer the de-facto place where people go to learn about the web, that doesn't change a thing for OWD. OWD's mission is to ensure the long-term health of this critical infrastructure that's web platform documentation, wherever people may be consuming it from.

### I don't really want to pay, but my company relies on MDN, what can I do?

If your company has made a big bet on the web, it might not be such a bad idea for the company to financially contribute to ensure the web documentation's future is bright. After all, if the documentation of the browser APIs you're using is a bit outdated, or if the tools you rely on start to be incorrect, your teams are going to have a much harder time doing their jobs.

The less reliable the web platform documentation is, the more experts your company will probably need to hire to reverse-engineer browsers and figure out what works and what doesn't. On the other hand, if high-quality and up-to-date documentation is always there when you need it, **you can focus on building your own products**.

Here are a few ways you can inform your company about OWD and try to convince them to contribute:

* Tell them how much you use MDN content through the website and other tools you use daily. Show the impact these resources have on your teams and show usage numbers.
* Show them this blog post.
* Show them the OWD [2021](https://openwebdocs.org/content/reports/2021/) and [2022](https://openwebdocs.org/content/reports/2022/) impact reports to clarify to what extent OWD contributes to these resources.
* Show them the [OWD membership](https://openwebdocs.org/membership/) page, which contains details about the various sponsorship levels and the benefits that come with them. As a Gold sponsor, for example, your company would get its logo on the website, and a seat on the OWD Steering Committee to discuss with the OWD community and help shape the future of web documentation.

You can get in touch with OWD by using the **Contact** button on the [Open Collective page](https://opencollective.com/open-web-docs).

---

And that's it! I hope this post has helped you understand the importance of OWD and why you should consider supporting it. If you have any questions, feel free to reach out to me on [Twitter](https://twitter.com/patrickbrosset) or [Mastodon](https://mas.to/@patrickbrosset). I'm part of the OWD Governing Committee, and I'll be happy to answer your questions.
