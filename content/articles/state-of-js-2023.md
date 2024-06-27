---
layout: article.njk
title: My web platform analysis of the State of JS 2023 results
tags: article
date: 2024-06-27
excerpt: "The State of JS 2023 results have been available for a few days, here's my short analysis of some of the results, specifically focused on the web platform."
thumbnail: "/assets/stateofjs2023.png"
altText: "The State of JS 2023 intro illustration"
---

Here's my quick summary of the [State of JS 2023 results](https://2023.stateofjs.com/).

Let me get this out of the way first: in this blog post, I don't care about frameworks, libraries, and build tools. I know, a large part of the State of JS series of surveys is about those, but I'm more interested in the **web platform** itself. So I'm going to focus on the questions that are about the web platform.

## Browser APIs interop

To no one's surprise, **lack of interoperability** is still the number 1 pain point that developers have with browser APIs. 33% of the people who responded to the browser API pain point question did mention browser support.

The second most common, albeit with only 6% of responses, was **Safari**. Specifically, people shared their frustrations with things that were either missing or that behaved differently in Safari. Many people voiced their frustration about the fact that Safari is lagging behind and slowing down the web platform. Some of the examples people mentioned are: PWAs, WebCodecs, WebGL, Web USB, and Web Bluetooth. No surprises there either.

## Static typing

The most common thing that people said they felt pain with is the **lack of static typing** (33% of respondents). This is confirmed by another question about the missing JavaScript features where 57% of the respondents mentioned static typing.

My intuition is that many people come from other languages that have static types, and they miss the authoring help this provides them when coding in JavaScript.

## PWA APIs get used a lot

Out of a list of 12 specific browser APIs, such as Web Sockets, WebGL, Web Animations, Web RTC, WebXR, and more, **PWA** was chosen by 50% of the respondents as a set of APIs that they have used. This is the second most popular API, after Web Sockets (60%).

It's pretty cool to see that **out of 20,000 people, 10,000 have used PWA APIs**.

## Dealing with dates

The pain of dealing with dates in JavaScript is real. 40% of the people who responded to the question about missing features mentioned the **need for better date management**.

Date management was also a common answer to a question that asked people to rank aspects of JavaScript that they struggled with the most.

Thankfully, [Temporal](https://tc39.es/proposal-temporal/docs/) is coming ([Firefox bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1839673), [Safari bug](https://bugs.webkit.org/show_bug.cgi?id=223166), [Chromium bug](https://issues.chromium.org/issues/42201538)).
