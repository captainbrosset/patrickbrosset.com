---
layout: article.njk
title: "Making complex web apps faster"
tags: article
date: 2025-12-09
excerpt: "Complex web apps which rely on multiple windows, workers, or iframes can sometimes suffer from performance issues due to delays and congestion in the message-passing system (i.e. when using <code>postMessage</code>). In this article, the Edge team introduces a new API: the Delayed Message Timing API, to deal with this problem. The API provides developers with insights into why messagess got delayed, helping you optimize your app's performance."
thumbnail: "/assets/slowdown-1.png"
altText: "Diagram showing two web app contexts (a main document and worker thread). The main document sends a message to the worker thread, but that thread is blocked on a long task and the message gets delayed."
external: https://blogs.windows.com/msedgedev/2025/12/09/making-complex-web-apps-faster/
---