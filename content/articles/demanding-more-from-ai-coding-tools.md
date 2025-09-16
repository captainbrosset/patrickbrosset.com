---
layout: article.njk
title: Demanding more from our AI coding tools
tags: article
date: 2025-09-16
excerpt: "AI can often be very shitty, and it comes with very real risks for the world. But it seems like it's here to stay, and it also seems like developers really like using it as a tool for coding. So, if we're going to continue using AI as a coding tool, we should do this in a responsible manner, and demand more from it."
thumbnail: "/assets/ai-illustration.png"
altText: "An abstract illustration showing a blob, labeled AI, and its many tentacles spreading around it."
---

AI can often be pretty shitty, and this technology comes with very real risks for the world. But it seems like it's here to stay, and it also seems like developers really like using it as a tool for coding (see the [State of JS 2024's AI tools question](https://2024.stateofjs.com/en-US/other-tools/#ai_tools) and the [State of AI 2025's opinions question](https://2025.stateofai.dev/en-US/opinions/)).

If we're to continue using AI as a coding tool, we absolutely should do this in a responsible manner, and we should demand more of this tool. We should find ways for it to start generating code that actually makes sense, adheres to best practices, is current, leads to accessible experiences, and even more.

---

It's fair to say that Large Language Models (LLMs) often get stuff wrong. LLMs are very good at writing text which feels like it was written by an actual person, at least at first sight. But they can also be really bad at saying correct and up to date things. To be fair, they're trained on the entire web content. How often do you encounter correct and up to date content on the web?

We need to bring the human back into the loop. Letting LLMs do all the work based on a prompt isn't going to cut it. We can do better. We shouldn't let a model do everything for us, especially when that model has been trained on millions of questionable quality, outdated, and contradictory content.

Not all content on the web is bad though. There are a few corners of the web where good, dare I say great, content still exists. [MDN Web Docs](https://developer.mozilla.org/) is one of these places. If you do any kind of web front-end work (which, if you're reading this site, you probably are), you most likely read MDN multiple times a day. It's one of the most valuable sets of docs for web developers out there. MDN content is manually written and reviewed, endlessly updated and corrected by passionate technical writers and [a big community of contributors](https://developer.mozilla.org/community).
There are many other high-quality developer resources on the web too, including blogs, newsletters, Q&As, tips and tricks, release notes, and more.

Sure, language models are trained on all this content, so you could argue that they already know the correct answers to web development-related questions. But LLMs are also trained on millions of other web development-related resources which freshness, quality, and relevance are sometimes questionable. Plus, that training is always outdated. Training models is very expensive, so doesn't happen very frequently.

## Being responsible developers

As developers, the very least we can do is be mindful of the above problems, and question the output of our AI tools.

Vibe coding our ways through every problem we face isn't a very responsible thing to do. If we're going to use these tools, we should at least verify and correct what they generate.

To illustrate this, I used VS Code's Copilot in agent mode, and asked it to generate an TODO list web app. Maybe not a great example, knowing how often TODO lists are used in tutorials and docs (see [TodoMVC](https://todomvc.com/)), but I think it still illustrates my point.

The result wasn't too bad at first sight. The app worked. You can see a screenshot of the app here:

![The TODO list app. The header says TODO List. There's an input and button to add new tasks. And then three tasks below that.](/assets/ai-todo-list.png)

But looking at it with a more critical eye revealed a few things:

* Color values were hard-coded throughout the file.
* Physical properties, such as `border-bottom`, were used instead of the corresponding logical properties, such as `border-block-end`.
* A mix of `rem` and `px` values were used for margins and paddings.
* No dark theme was created.
* The layout didn't really use the extra space when available, and also didn't particularly work great on a very narrow screen.
* Marking a task as done wasn't accessible. It used a `<span>` element and an `onclick` event listener, which weren't exposed to assistive technologies in any way.
* The delete task button's hover state didn't have a high enough contrast ratio.

Keep in mind, this was for a very simple example, and I only reviewed the code for a few minutes. Things can easily get worse in more involved or sensitive situations.

AI coding tools aren't silver bullets. We still need to be responsible developers and ensure the experiences we deliver are good, accessible, run fast, are [secure](https://www.youtube.com/watch?v=24VZT855OhI), private, that the code adheres to our style guide and best practices, is maintainable and so on. So, like, actually do the work.

## Demanding more

We should also demand more from our AI coding tools. An AI tool that spits out whatever the underlying LLM generated only based on a question isn't a great AI tool. We can do better than this.

We need to start seeing LLMs for what they are: machines that are good at generating text based on some context. So let's use them for that and provide the correct, comprehensive, and up to date context.

In my previous TODO list example, perhaps the problems I found could have been avoided if the AI tool knew about the importance of color contrast, coherent units, accessible user actions, or newer CSS properties.

[Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro) might be useful here. Perhaps MCP can be used as an intermediate layer that's responsible for checking MDN, and other trusted sources, for best practices.

Various experiments along those lines already exist:

* [MDN Lookup](https://mcp.so/server/mdn-lookup)
* [MCP Servers for MDN Web Docs](https://glama.ai/mcp/servers/integrations/mdn-web-docs)

These MCP servers fetch live MDN docs based on a user's query and then provide either the response to the LLM for it to summarize or extract whatever the user wanted. This is a great start, but we need to go further than this.

The true value lies in deeply understanding the user intent, and in finding the right information from the right places. This information might be spread across multiple pages. The key here is that it's no enough to fetch an API reference page from MDN and return it. The key is to understand the problem you're facing, and fetch relevant sections of docs from multiple trusted and up to date sources.

Indeed, users of AI coding tools will rarely ask _what's the syntax of this property already?_ They're more likely to ask more intricate questions, which might require looking up multiple web features and responding in a way that points the user in the right direction, taking multiple factors into consideration, instead of merely spitting out an API reference page.

Given the right context, LLMs can be pretty good at articulating a summarized, but also comprehensive response.

To be clear, what I'm saying is there needs to be two layers involved in an AI tool responding to a coding task:

1. The first layer, which is _not_ (or rather _not only_)provided by an LLM, takes care of understanding what the developer is looking for, and actually finding the corresponding resources.
2. And the second layer is where the LLM really comes in. Once the right context was found, we can shove it down the LLM's throat and let it do its magic: providing a clear step-by-step guide of how to solve the issue, or even do the right code changes on its own.

Layer 1, above, takes a lot of work.

I like the [learn.microsoft.com MCP server](https://learn.microsoft.com/training/support/mcp), which Microsoft recently launched. This server uses a vector search and retrieval service that finds chunks of content, from the learn.microsoft.com site, which are relevant to the user query. This is a great way to provide the AI coding tool with the context it needs. Well, at least if what you're looking for is documented within one of Microsoft's documentation websites.

I hope someone does the same for web development-related resources such as MDN, and others!
