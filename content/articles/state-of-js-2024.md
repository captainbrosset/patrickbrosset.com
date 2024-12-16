---
layout: article.njk
title: My very short and incomplete analysis of the State of JS 2024 survey results
tags: article
date: 2024-12-16
excerpt: "Here are my quick highlights from the State of JS 2024 survey results. There's much more data to be analyzed in the survey, but here are the things that stood out to me, from the perspective of someone working on a web browser engine."
thumbnail: "/assets/state-of-js-24.png"
altText: "A close up of the State of JS 2024 logo, showing the letter J and S, stylized, against a pink background."
---

Here are my quick highlights from [the State of JS 2024 survey results](https://2024.stateofjs.com/). There's much more data to be analyzed in the survey, but here are the things that stood out to me, from the perspective of someone working on a web browser engine:

## There are many new features of the language that people don't know about, but find useful

For example, there are many new Array, String, or Set methods that could make developers' lives easier, and might even make it possible to drop a library dependency. However, respondents said they didn't necessarily knew about these features, highlighting a lack of clear communication or documentation. And, when they did, they said they couldn't always use the new features because of browser support issues.

## The lack of types in JavaScript is still a major pain point

When asked about pain points of the language, 32% or respondents mentioned the lack of static typing. This is confirmed by the fact that more than 80% of the respondents write at least half of their code in TypeScript, and a whopping 34% write all of their code in TypeScript. This ratio is on the rise too (in 2022, only 54% of the respondents wrote at least half of their code in TypeScript).

## When using JavaScript in the browser, inconsistent browser support is still the main pain point

Nothing new under the sun. Survey after survey, developers still complain about inconsistencies between browsers. While the majority of the feedback is high-level, there are some comments that point to specific issues, such as: the lack of PWA support, the different module formats and runtimes, Safari being too far behind, and some specific features like File System.

## Temporal cannot come soon enough

Temporal is the most anticipated new JavaScript proposal. When asked to rank some of the new language proposals, Temporal came out first, with 74% of the votes. The second, decorators, being far behind with 38%. This is also confirmed by the free-form responses to the language pain point question, where date management was mentioned in third place, after static typing and browser support.

## Better documentation of browser APIs, based on real-world usage examples, are missing

This came out in the browser API features section of the survey. The lack of good documentation came out as the third most mentioned pain point. In this domain, MDN is the number one source of reliable reference documentation, but it seems like it's not enough and people are looking for longer guides, tutorials, and real-world usage examples.

Unfortunately, there aren't a lot of comments that mention specific features for which documentation is lacking, but the following points came up: there are too many new APIs to document, when documentation exists, the examples are too contrived, better guides for IndexedDB or Service Workers are needed.
