---
layout: article.njk
title: A language model in your browser, accessible as a Web API?
tags: article
date: 2024-07-04
hasCode: true
excerpt: "What if you could call a method, from the JavaScript code of a webpage, and get AI-generated text from a language model that's running in your device? That's what Google has started to experiment with. Read on for more details."
thumbnail: "/assets/web-slm.png"
altText: "Hand drawing showing the words Web and SLM, with SLM being in a computer chip"
---
AI, these days, is all about cloud services. You chat with a bot, you ask a voice assistant for something, etc. All of which happens to be powered by some AI model that's running on a server somewhere. But on-device AI is a thing too. It's just maybe less popular, less well-known. On-device AI refers to running AI models on the same device where the user is consuming the result of the model.

Running an AI model on your device comes with important benefits:

* It's private by default, meaning that whatever data you give the model (be it an image, or some text), it stays on your device, and never needs to be sent to a server.
* It costs nothing, apart from the electricity and data consumption needed to originally download the model and then run it. AI cloud services usually come with a price tag.
* It can work offline. If you have the model on your device, then you don't need an internet connection to use it.
* It can be faster in some cases. There's no network round trip to wait for. The model can generate whatever it needs to generate right away, with the caveat that it's probably much less powerful than a cloud model, and therefore might generate slower or more inaccurate results.

There's nothing very new here, and many apps, and devices already come with AI models built-in. In the world of web browsers, it's worth noting that some things are starting to happen:

* Firefox announced [experimenting with local alt-text generation](https://hacks.mozilla.org/2024/05/experimenting-with-local-alt-text-generation-in-firefox-nightly/).
* Brave announced the ability to [bring your own model](https://brave.com/blog/byom-nightly/).
* But also, web developers can already make use of models on web pages by using [WebNN](https://webmachinelearning.github.io/webnn-intro/). This has also been possible for some time with WebGL and WebGPU too.

When it comes to web developers getting access to AI models, it still comes at the price of downloading your own models, and using frameworks such as ONNX web runtime to run them. What if there was a simpler way?

## Simpler on-device AI for web pages?

That's what Google has started to experiment with. At Google I/O earlier this year, they announced their ["built-in" AI](https://developer.chrome.com/docs/ai/built-in) plans, which involve shipping a small language model (Gemini Nano) as part of Chrome, and making it available to web developers as a series of Web APIs. More recently, they published an [explainer document for their Prompt API](https://github.com/explainers-by-googlers/prompt-api), which goes deeper into the details of how this works.

The main benefits of this approach, over what you can already do with WebGL, WebGPU, and WebNN, are:

* The model is already provided for you by the browser, no need to download it yourself along with the necessary framework code. **Note**: the model is downloaded on-demand, the first time you need it. That's a 1.7GB download which, obviously, doesn't come bundled with the browser installer.
* The model is shared across all web pages. With WebNN, each origin needs to download the model, and run it in its own context.
* You can just call a method to get generated text from the model.

The drawback I can see far is that you don't get to choose the model.

Now, this is all very new and experimental. The only API that Google has made available so far is the `prompt` API, which allows you to access the model pretty directly. Here's a short code snippet showing the intended usage of the prompt API:

```javascript
const session = await window.ai.createTextSession();
const result = session.promptStreaming(inputText);

for await (const chunk of result) {
  textarea.value = chunk;
}
```

You can already use this today in Chrome Canary, by first enabling the `chrome://flags/#optimization-guide-on-device-model` and `chrome://flags/#prompt-api-for-gemini-nano` flags.

## The risks

Exposing a language model directly to web pages is certainly exciting, but also comes with risks:

* **Interoperability**

  Web APIs are designed to work across products and to endure the passage of time. Language models pose a fundamental challenge here in that models are non-deterministic. Different models respond differently to the same prompt and require different prompt engineering techniques. The results that a model generates now may be different tomorrow as the model evolves and will be different from another model. Can we even make an interoperable prompt API?

* **Safety**

  I think websites are far easier to access than native apps, which require an install and, often, permissions. The risk of web apps making malicious use of AI is therefore greater.
  
  Should web browsers warn users and request their permissions first?

What do you think? I'm personally reassured by this part of the explainer document:

> Even more so than many other behind-a-flag APIs, the prompt API is an experiment, designed to help us understand web developers' use cases to inform a roadmap of purpose-built APIs.

Purpose-built APIs could be very useful to web developers, and would come with far fewer risks attached. Imagine being able to call `summarize(text)` or `translate(text, "en-us", "fr-fr")` from your webpage.

## Feedback

At this early stage, if you have feedback about any of this, I think the most useful thing to do is to engage with Google by submitting an issue on the [prompt API explainer repo](https://github.com/explainers-by-googlers/prompt-api/issues).
