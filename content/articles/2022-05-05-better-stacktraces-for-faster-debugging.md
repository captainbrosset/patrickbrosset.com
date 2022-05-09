---
layout: main-layout.njk
subtitle: articles
pagetitle: Better error stacktraces for faster debugging
tags: article
---
<link href="https://unpkg.com/prismjs@1.20.0/themes/prism-okaidia.css" rel="stylesheet">

## Better error stacktraces for faster debugging

<time datetime="2022-05-05">May 5th, 2022</time>

### The problem

Web devs debug their code in different ways. Some people will tell you that stepping debuggers and breakpoints are better, more powerful, ways to find the root cause of a problem. But let's face it, most of us just console.log our way out of it, and it's fine!

I've been on the fence myself, I started my career with alert() debugging, and these days I do a mix of using breakpoints and just writing logs in the my code. Sometimes, when I remember this feature even exists, I use [logpoints](https://devtoolstips.org/tips/en/use-logpoints/) too, and this saves me a trip to my editor and shame when I realize I committed a leftover `console.log()`.

But whichever debugging technique you use, I believe both are limited and there should be a better way. Let's review a quick example that will help make the point.

Let's imagine we have a function that retrieves a collection of items and then highlights them.

```javascript
function start() {
  const els = getAllItems();
  els.forEach(highlightItem);
}
```

Now the highlighting function is quite simple: it is given a DOM element and adds a background color to it:

```javascript
function highlightItem(el) {
  const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  el.style.backgroundColor = color;
}
```

Now let's imagine that the `getAllItems` function calls through to other functions which, themselves call yet other functions. The idea here is the process is not straightforward. Few codebases are. These could be spread across many files, authored by different people, with lots of complexity involved, such that bugs can creep in unnoticed.

In the example below, I've just added 4 extra functions to make my point. Even just 20 or so lines of code make it hard to spot the problem at a glance, so imagine if this was a much more complicated code base.

```javascript
function getAllItems() {
  return getAppItems();
}

function getAppItems() {
  return [...getWrapperItems(), ...getListItems()];
}

function getWrapperItems() {
  return [
    document.querySelector("ul"),
    document.querySelector("body"),
    getMiscEl(),
    document.querySelector("html"),
  ];
}

function getMiscEl() {
  return undefined;
}

function getListItems() {
  return [...document.querySelectorAll("li")];
}
```

Here the problem is that `getMiscEl` returns `undefined`, and that this values ends up in the list of items returned by `getAllItems`. So one of the items that we'll try to highlight later will cause a runtime error.

Opening DevTools and checking the console would produce an error stack trace similar to this:

```text
Uncaught TypeError: Cannot read properties of undefined (reading 'style')
    at highlightItem (test.html:112)
    at Array.forEach (<anonymous>)
    at start (test.html:81)
    at test.html:115
```

The error message is quite clear, we know the `highlightItem` function failed and we know exactly where it failed and why.

But this trace doesn't tell us anything about where the root cause actually is. We know `highlightItem` was called in a `forEach` loop, but which item failed? Which of our many functions returned `undefined`? Where did we go wrong?

At this point, whether you're a breakpoint kind of developer or a console.log one, you're faced with the same problem: reading your code backwards from where it failed, randomly pocking at it, adding more breakpoints and logs hoping they're in a place near enough the actual root cause to make you see the problem.

[Replay](https://www.replay.io/) takes a really interesting, and very different approach to this by constantly recording and letting you just "step back" through your code at any point, reviewing variables. You can just add logs after the fact and get immediate results without re-running the code. It removes the need from setting breakpoints or altering your code with more logs. But to some extent, it's still a bit of a shot in the dark. You're still hunting for the root cause.

### Stack traces

All errors that originate from the JavaScript engine you use come with a stacktrace. The engine collects information about the most recent functions that have been called so that when an error occurs, it can give you this information.

You, as a developer, can even access this via the non-standard [Error.stack](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error/stack) API. Learn more about the [stack trace API in V8 here](https://v8.dev/docs/stack-trace-api).

In fact, this stack trace is what the DevTools in your browser use to display errors in the console. They somehow parse the string returned by the API to give you a more interesting representation of it.

Because JavaScript engines are finely tuned machines that are trying to go as fast as possible, not all function calls are recorded, and only a minimal amount of information about them is recorded: there is no information about arguments and returned values.

Moreover, and this is crucial here, the engine only cares about the functions that correspond to the current call stack. In our case, `highlightItem` failed, and we only get information about what called it: `forEach`, and before that `start`. We have no information whatsoever about the fact that `getAllItems` was called before. That call worked fine and returned, it's long been popped from the stack.

### Tracing instead?

What if we could move beyond the error stack trace performance limitation and add more information to it?

What if we could also keep previous stacks in memory, so that the information about `getAllItems` having been called is still here when the error occurs.

And what if we also recorded the arguments and return values for each function in the trace.

We don't want to slow down the engine at all, so that's a concern. But I want to believe that in a "developer" mode we could get to a trace like this:

```text
start (test.html:81), args '[]'
    getAllItems (test.html:84), args '[]', return '[Node,Node,undefined,Node,Node]'
      getAppItems (test.html:88), args '[]', return '[Node,Node,undefined,Node,Node]'
          getWrapperItems (test.html2), args '[]', return '[Node,Node,undefined,Node]'
              getMiscEl (test.html:101), args '[]', return 'udefined'
          getListItems (test.html:105), args '[]', return '[Node]'
    Array.forEach (<anonymous>)
        highlightItem (test.html:112), args '[Node,Node,undefined,Node,Node]
            /!\ Uncaught TypeError: Cannot read properties of undefined (reading 'style')
```

In this trace, not only do we have the same information we have in normal error stack traces (i.e. the fact that `highlightItem` failed because the provided element was undefined), but we also see preceding calls and their return values.

We can clearly see that `getAllItems` returns a list that contains one undefined item, but we can also track this undefined item all the way down to `getMiscEl`, and that's our root cause!

No more need to hunt for places to put breakpoints and console.logs in, we can zero in on our root cause much quicker.

This is nothing more than a trace. Tracing debugging is already a thing, but unfortunately not often used in our JavaScript ecosystem. I vaguely remember Firefox having a tracing debugging feature back in the days, but it got removed at some point.

The Performance profiler in Chromium browsers comes close, it records the entire execution of a program and provides a nice visualization of it, but it's not possible to get the arguments or return values.

![Screenshot of part of a performance profile in Edge's Performance tool, showing a visual trace of the program execution](/assets/performance-profile.png)

I'm not saying we should introduce (or rather re-introduce) tracing debuggers, but I do think we should mix traces and error stacks together when errors are logged to the console by the JavaScript engine. Because tracing has performance impacts on the engine, we should only do this if DevTools was already opened before. Perhaps we should even only do it when an option is turned on. And I don't think we should trace everything (like the Performance tool does) but instead only capture the most recent traces since those are likely to contain our root cause anyway.

The Console is one of the most used tools by JavaScript frontend developers. Teaching everyone about breakpoints isn't necessarily the way to go, we've tried it and not only does it not seem to work but it's not the best debugging experience either. I believe there are other ways in which we can improve the JavaScript debugging experience that doesn't rely on making people feel dumb for not using a real debugger.

Sure, what I'm proposing here might not always be THE way, and it may not always be helpful. But hey, if it helps in even 50% of cases, I think it's a huge win for everyone.
