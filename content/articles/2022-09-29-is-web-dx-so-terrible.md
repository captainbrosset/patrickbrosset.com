---
layout: main-layout.njk
subtitle: articles
pagetitle: Is the developer experience on the Web so terrible?
tags: article
---

## Is the developer experience on the Web so terrible?

<time datetime="2022-09-29">September 29th, 2022</time>

![Me, doing a face, in front of my computer where a bunch of code is written](/assets/bad-web-dx.jpg)

Let me start with a caveat: I've not done actual professional web development for about 10 years I think. I used to work in companies where we'd do big fancy web apps for clients, and we'd have a backend and a frontend and some database or whatever, the whole thing. But ever since I started working in browser maker companies, even thought I use web technologies all the time, I'm using them very differently than most web devs out there.

The most development I do today is limited to front-end only, and very focused and small scale demo apps. And to do these apps, I absolutely never rely on frameworks, and very rarely on libraries.

Again, these apps are small, and I probably just don't need external libraries at all. But I've also come to greatly appreciate the power that comes with the web platform alone.

So I keep wondering, **what is it with the web that people find so awful that they keep inventing new frameworks every year**? What is it with vanilla JavaScript, HTML, and CSS that people prefer inventing different languages and entire paradigms to avoid writing them?

Is the web platform really so awful that you can't do any professional development without first adding a big abstraction over it?

---

Over the past 10 years or so, we've slowly but very surely transitioned to a state where frameworks are the norm, and I think it's a problem.

**Strong opinion loosely held time!**

* Web devs don't take the time to learn the web platform and understand what's possible with it alone anymore. They learn frameworks first.
* Learning a framework runs the risk of not being able to easily adapt when switching teams, or when your team switches to the new flavor of the year.
* Because of these frameworks, the webpages grew in size by a whole lot.
* It's common to encounter front-end performance issues that are really hard to fix because you don't really have access to the underlying mechanics of the framework.

The [2022 HTTP Archive Web Almanac](https://almanac.httparchive.org/en/2022/) is, once again this year, pretty depressing:

> _In the 10-year period between June 2012 to June 2022, the median page weight increased by 221%, or 1.6 MB, for desktop page loads, **594%**, or 1.7 MB for mobile page loads._\
> \
> Source: [https://almanac.httparchive.org/en/2022/page-weight#request-bytes](https://almanac.httparchive.org/en/2022/page-weight#request-bytes).

> _While magnificent when used in moderation, the intoxicating allure of JavaScript can also lead to serious performance, search engine optimization, and user experience issues._\
> \
> Source: [https://almanac.httparchive.org/en/2022/page-weight#javascript](https://almanac.httparchive.org/en/2022/page-weight#javascript).

Now I'm not saying that all JavaScript is bad, but using a framework inherently ties you to JavaScript, even for the things that you might have been able to do with just HTML and CSS.

---

One of the reasons that frameworks are so popular these days is the promise they make to web developers: _"use me and you'll have a much better experience than if you don't"_.

So, **developers choose frameworks in part due to their developer experience (or DX), and often don't really take the final user experience (or UX) into account**.

Sure, when you spend 8 hours a day in front of the computer writing code for an app, DX is important. You need efficient tools, pleasant languages, fast turn around times. But at the end of the day, who pays the bill? Your users do! It's too easy to get blinded by amazing DX and forget that what really matters is the final experience that your users will have (and I say even if I work on a team which name contains "developer experience").

---

**Please, please, don't get blinded!** Use the frameworks and libraries that make sense for you to deliver the best UX possible. But also learn the web platform from the ground up. Take time to understand how web browsers work and render webpages. Learn HTML, CSS, JavaScript. And keep an eye, if you can, on the new things.

The web platform keeps evolving all the time. More and more things get added to fill gaps that web developers find along the way. JQuery was (still is in fact) such a great JavaScript library, and it pushed the web platform forward so much that one might not need JQuery anymore today.

The web platform is never at rest, there are always new things coming up that make it easier and easier to work with.

---

Before closing, I want to list some examples of things you can do with the web that I consider great DX and which maybe people aren't that aware of just yet:

* [The Dialog element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog): this element isn't exactly new, but its browser support recently got a whole lot better and you can use it pretty much everywhere now. It gives you a way to display a dialog box on top of your regular web content without having to include a component library to it, without the z-index nightmare, and with all of the right accessibility semantics built-in. Check it out!

* [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) are definitely not new, but are very well supported too, and they give you a built-in way to create configurable, isolated, reusable UI components in your app. Sure, if you've used frameworks that make it easy to use components before, there will be a learning curve. But they come with everything you need as a developer. A really simple way to include them in a webpage, super simple props passing, templating, and isolation of styles.

* [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules). Yes, modules just work by default on the web today! You can load them with `<script type="module">` in a page, and then deal with dependencies with the `import ... from ...` statement and `export` statement. What's even better? Modules are available in workers too (except on Firefox, but this is [coming soon](https://bugzilla.mozilla.org/show_bug.cgi?id=1247687)), and [CSS](https://chromestatus.com/feature/5948572598009856) and [JSON](https://chromestatus.com/feature/5749863620804608) modules are coming soon too.
