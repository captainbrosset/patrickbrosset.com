---
layout: main-layout.njk
subtitle: articles
pagetitle: A few web console tricks
---
<link href="https://unpkg.com/prismjs@1.20.0/themes/prism-okaidia.css" rel="stylesheet">

## A few web console tricks

<time datetime="2020-12-22">December 22nd, 2020</time>

The console panel in your favorite browser's DevTools can be a very powerful ally when troubleshooting problems in a web app.
Log data, send requests, manipulate DOM elements, you name it, the console can do it all!

There are so many ways to get interesting information out of the console, and I know I use only a few of them. So I asked around for what made people more productive in this tool, and I'm sharing the results with everyone here.

Note that there are many resources online already about tips and tricks with devtools, but I hope this one will prove useful to you because:

* rather than being a complete and overwhelming reference to all the features, it's a small subset of the things some people agreed were the most useful to them, and
* it's not just a list of the built-in commands, but also some code snippets that you may find useful.

### $ and friends

`$` and its friends are probably the most used tricks in the console. It pays off to know some of them as they can really help you get more out the tools.

`$()` is a function that's essentially a shortcut to the longer [`document.querySelector()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) native function. It's nice and short, and for those of you who worked with jQuery in the past, it will feel familiar.

`$$()` acts as a shortcut to [`document.querySelectorAll()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) but returns an array of nodes rather than a [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) which means you can use things like `map()` or `filter()` right away on the returned list of elements.

I often use it to retrieve all elements on the current page and then filter it depending on what I'm looking for:

```js
$$('*').filter(n => getComputedStyle(n).display.endsWith('flex'));
```

In this example, you'd end up with the list of all of the elements on the page that are Flexbox containers. Pretty handy right!

`$0` is a super useful reference to the element that's currently selected in the Elements panel (in Edge or Chrome) or Inspector panel (in Firefox). If you want to know things about the element that aren't available to you in one of the other tools, then `$0` is your friend.

`$_` is a cool shortcut that accesses the last result that got printed out in the console.

### Make HTTP requests with fetch

[The `fetch` API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) (which is basically `XMLHTTPRequest` but easier to use) makes it really easy to go and get resources from the network.
What's really nice is that the console (both in Firefox and Chromium-based browsers) now supports top-level await statements, which means you can write something like this:

```js
await (await fetch('https://api.github.com/repos/microsoft/vscode/issues?state=all&per_page=100&page=1')).json();
```

And you'll have the parsed JSON from that github API call straight in your console!

Normally, you'd have to wrap the `await` statement in an `async` function, but for convenience, you don't have to do here in the console.

![Screenshot of chrome devtools console panel showing the result of the fetch call](/assets/console-fetch.png)

### Format data like a pro

Dealing with lot's of data on the console isn't particularly easy. DevTools does a nice job at formatting objects, arrays, strings, numbers, etc. in useful ways, but sometimes you need more.
And for those times, `console.table` might be what you need.

`console.log(array)` displays the provided array as a sortable table, expanding properties of items on multiple columns if possible.

If we take the `fetch` example from above, the call returns 100 objects, in an array, each with a lot of properties.
But let's imagine you're only interested in a few properties (the number, title and state). The `console.table` function accepts a handy second argument that allows you to list which properties of the items you want to see in the resulting table:

```js
await (await fetch('https://api.github.com/repos/microsoft/vscode/issues?state=all&per_page=100&page=1')).json();
console.table($_, ['number', 'title', 'state']);
```

![Screenshot of the console panel in Firefox showing the result of the previous commands: a table with the 3 columns for number, title and state properties](/assets/console-filtered-table.png)

### Copy things

This is probably one of the lesser known console tricks. Sometimes you need to copy the result of something you just did in the console. Maybe you need to send it to someone, or paste it in a text editor.
You can, of course, use your mouse to select text and then hit ctrl/cmd+C to copy the selection, but there's also a built-in function that might make your life easier: `copy()`.

This function copies whatever you pass to it to your clipboard, as a string.

For me, it comes in very handy when I spent time listing elements or objects in the console, and massaging the data to find what I'm interested in.

Let's assume I was looking for all flexbox containers on the page:

```js
$$('*').filter(n => getComputedStyle(n).display.endsWith('flex'));
```

and then wanted to list all of the classes that these elements have:

```js
// Get all individual classes from classList
$_.map(e => [...e.classList]).flat();

// Reduce the list to unique classes only using a Set
[...new Set($_)]
```

and now I want to copy the result out to paste it in some code I'm working on:

```js
copy($_)
```

At that point, my clipboard will contain the following content:

```js
[
    "_23tra1HsiiP6cT-Cka-ycB",
    "c-uhfh-gcontainer-st",
    "c-uhfh-actions",
    "mectrl_header",
    "m-page-bar",
    "pagebar-module",
    "c-sequence-indicator",
    "c-group",
    "drawerheader",
    "c-glyph",
    "glyph-chevron-right",
    "cli_default_focus",
    "tileproductplacement",
    "mini",
    "f-sticky"
]
```

### Debug JavaScript functions with `debug()` (⚠ only in Edge and Chrome)

Sometimes you need a little more help when troubleshooting an issue, and need to step into the code to inspect what's going wrong.
Logging data from the code using `console.log` is often enough, but sometimes using a debugger is requires.

If you're a heavy console user and spend most of your debugging time there, you might enjoy the `debug()` function.

If the function you are trying to debug is accessible from the console, then you can just pass a reference to it to the `debug` helper, like `debug(path.to.my.Function)`.

The next time your function gets executed, the JavaScript debugger will pause its execution and DevTools will switch to the Sources panel.

### Advanced screenshot features with `:screenshot` (⚠ only in Firefox)

Nowadays there are many ways to take screenshots of the viewport, the full page, or a DOM node. But none of these methods really compare to the advanced features the `:screenshot` built-in command give you in Firefox.

You can simply type `:screenshot` in the console and it will go ahead and grab a screenshot of the page with the default configuration.
If you have a specific need you can:

* either take a full page screnshot with `--fullpage` or just an element with `--selector`,
* either save to a file and specify the name with `--filename` or copy the image to the clipboard with `--clipboard`,
* grab the screenshot only after some amount of time with `--delay`,
* set the image resolution with `--dpr`.

You can read the full [documentation on MDN](https://developer.mozilla.org/en-US/docs/Tools/Taking_screenshots#Taking_screenshots_with_the_web_console) or learn more from [Eric Meyer](https://twitter.com/meyerweb)'s [blog post](https://meyerweb.com/eric/thoughts/2018/08/24/firefoxs-screenshot-command-2018/).

### Know when data gets evaluated

This one isn't a trick but more a gotcha that may save you a lot of time lost if you don't know about it.

The gist of it is that when you expand a property of an object in the console (by clicking on the little triangle next to it), that property gets evaluated __when you click__. As a result, what you are going to see then might not match what the value of that property was at the time the parent object was logged.

Let's go through an example to understand what that means.

Let's assume you have a function that deals with some object, and you need to log that object out at some point to check what the properties are:

```js
function someFunction() {
  const obj = {
    foo: 42,
  };
  console.log(obj);
  
  return obj;
}
```

When the function gets executed, you'll see a nice little log in your console showing you a preview of that object.

Now, if, later on in the execution of your program that same object gets updated like this:

```js
obj.foo++;
```

And let's assume you click the object in the console to expand its properties only at that point, you'll be seeing something that might surprised you:

![Screenshot of the console panel in Edge DevTools showing that when the property is expanded, its value is 43, even if it used to be 42 when logged](/assets/console-evaluate-property.png)

The reason is the properties of that object got read 2 times by the console. First when the object was logged, and the console printed the preview of the object. And secondly when you clicked on the expander icon. Knowing that the value of the `foo` property changed between these 2 points in time, you get this weird result.

If this becomes a problem for you, one solution is to create a copy of the object when logging it, like this:

```js
function someFunction() {
  const obj = {
    foo: 42,
  };
  console.log({ ...obj });
  
  return obj;
}
```

Now, when you click, even if the original `obj` object was changed, what you're expanding is only a copy of that object that hasn't been modified since it was logged.

### Write on multiple lines

If you're feeling adventurous, you might want to write longer pieces of code in the console to execute more complex code. There are a few ways that will make your life easier if so:

* Use `shift+Enter` to create a new line without executing the expression.
* Use Firefox's multiline editor:

![Screenshot of the Firefox console panel showing where the multiline icon is located](/assets/console-multiline-firefox.png)

* Create code snippets in Edge or Chrome's Sources panel. The added advantage of this technique is that code snippets are saved on your disk, and therefore can be used even after you've restarted the browser:

![Screenshot of Edge DevTools showing the Sources panel, and within it the Snippets pane that allows creating new code snippets and executing them](/assets/snippets-edge.png)

### Access your history

This last trick really made a huge difference for me a while back.
I often use similar pieces of code in the console over and over again, and typing these commands every time is getting tedious.

Thankfully, the console panel maintains a history and you can access it. Here's how:

* The simplest but also most limiting way is pressing the `Up` arrow on your keyboard. This will cycle through all of the latest commands you've entered, one by one, and you can stop pressing when you found the one you were looking for. Simple, fast, and very useful for repeating things over and over again. However if you're looking for something you used a long time ago, this method will prove very time consuming.
* If you know (at least part of) what you're looking for, just start typing it in Chrome or Edge and the autocomplete suggestion box that appears will contain all of the past commands you typed that match:

![Screenshot of Edge DevTools showing the autocomplete suggestion list in the console panel that contains past commands matching what you typed](/assets/console-history-autocomplete.png)

* Firefox also has a useful [reverse history search](https://developer.mozilla.org/en-US/docs/Tools/Web_Console/The_command_line_interpreter#Execution_history) that mimicks Bash's `ctrl+R` reverse search. Pressing `F9` on Windows/Linux or `ctrl+R` on Mac lets you type text and displays the matching results based on that.

---

That's it for now! I hope these were useful to you. If you know other tricks, I'd be happy to edit this article to include them. You can find me on [twitter](https://twitter.com/patrickbrosset).