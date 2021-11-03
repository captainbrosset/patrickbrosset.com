---
layout: main-layout.njk
subtitle: articles
pagetitle: When does white space matter in HTML?
tags: article
---
<link href="https://unpkg.com/prismjs@1.20.0/themes/prism-okaidia.css" rel="stylesheet">

## When does white space matter in HTML?

<time datetime="2016-10-21">October 21st, 2016</time>

As a web developer, you don’t often spend time thinking about white space, right? I mean, how often do they actually matter?
Well, hopefully with this article, you’ll think of them more often, or at least will know when they do matter and know how to track them down!

### What is white space?

White space is any string of text composed only of spaces, tabs or line breaks (to be precise, either CRLF sequences, carriage returns or line feeds).

As someone who writes code, you probably know the vital importance of these characters. They allow you to format your code in a way that will make it easily readable by yourself and other people. In fact much of our source code is full of these white space characters (that is, unless you write obfuscated code). They’re most often used for breaking the code on multiple lines and indenting lines to represent the nesting of elements.

But, because these characters are important for people who read the code doesn’t mean they’re important for people who visit your web page. These formatting-only characters wouldn’t look too good if they did impact the layout of your page, right?

Let’s take a simple example:

```html
<!DOCTYPE html>
    <h1>   Hello World! </h1>
```

This source code contains a line feed after the DOCTYPE and a bunch of space characters before and inside the h1 tag, but the browser doesn’t seem to care at all and just shows the words _Hello World!_ as if these characters didn’t exist at all!

![What the above HTML snippet looks like when rendered in a browser](/assets/8HMhC1n8AXXOAeyMmqUSSw.png)

Unlike a word processing application, the browser seems to completely ignore white spaces (most of the time at least).

{% include in-article-ad.njk %}

### How does CSS process white spaces?

If most white space characters are ignored, not all of them are. In the previous example the space between Hello and World! still exists when the page is rendered in a browser. So there must be something in the browser engine that decides which white space characters are useful and which aren’t.

If you’re the kind of person who likes reading specifications, you might like [the CSS Text Module Level 3 spec](https://www.w3.org/TR/css-text-3), and especially the parts about [the CSS white-space property](https://www.w3.org/TR/css-text-3/#white-space-property) and [white space processing details](https://www.w3.org/TR/css-text-3/#white-space-processing), but then again, if you’re that type of person, you’re probably not reading this article right now.

Let’s take another really simple example (to make it easy, I’ve illustrated all spaces with ◦, all tabs with ⇥ and all line breaks with ⏎):

```html
<h1>◦◦◦Hello◦⏎
⇥⇥⇥⇥<span>◦World!</span>⇥◦◦</h1>
```

That’s how this example markup is rendered in a browser:

![What the above HTML snippet looks like when rendered in a browser](/assets/8HMhC1n8AXXOAeyMmqUSSw.png)

The h1 element contains only inline elements. In fact it contains a text node (consisting of some spaces, the word _Hello_ and some tabs), an inline element (the span, which contains a space, and the word _World!_) and another text node (consisting only of tabs and spaces).

Because of this, it establishes what is called [an inline formatting context](https://www.w3.org/TR/CSS21/visuren.html#inline-formatting). This is one of the possible layout rendering contexts that browser engines work with.

Inside this context, white space characters are processed as followed (this is overly simplified, the specification goes into much more details):

* first, all spaces and tabs immediately before and after a line break are ignored so, if we take our example markup from before and apply this first rule, we get:

```html
<h1>◦◦◦Hello⏎
<span>◦World!</span>⇥◦◦</h1>
```

* then, all tab characters are handled as space characters, so the example becomes:

```html
<h1>◦◦◦Hello⏎
<span>◦World!</span>◦◦◦</h1>
```

* next, line breaks are converted to spaces:

```html
<h1>◦◦◦Hello◦<span>◦World!</span>◦◦◦</h1>
```

* then, any space immediately following another space (even across two separate inline elements) is ignored, so we end up with:

```html
<h1>◦Hello◦<span>World!</span>◦</h1>
```

* and finally, sequences of spaces at the beginning and end of a line are removed, so we finally get this:

```html
<h1>Hello◦<span>World!</span></h1>
```

Which is why people visiting the web page will simply see the phrase _Hello World!_ nicely written at the top of the page, rather than a weirdly indented _Hello_ followed by an even more weirdly indented _World!_ on the line below that.

![Comparison screenshot of what users see in a browser today vs. what they would see if whitespace wasn't handled the way it is](/assets/lx56kLIuWir6-iDEI57shA.png)

In fact, using [Firefox DevTools](https://developer.mozilla.org/en-US/docs/Tools) (since version 52 which now supports highlighting text nodes), you can see how the space separating the 2 words is part of the node that contains _Hello_ just like the markup we ended up with after applying the white space processing rules:

```html
<h1>Hello◦<span>World!</span></h1>
```

![Animation showing how Firefox DevTools lets you highlight text nodes, and showing that the space is inside the same text node as the word Hello](/assets/hNSUVhhTZDvu6-B7DlQ06w.gif)

Now we know how white space is processed within an inline formatting context (which, remember, is basically an element that contains only inline elements).

You might be wondering how white space is processed in other types of contexts and what these contexts even are.
Well, if an element contains at least one block element, then it establishes what is called a [block formatting context](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context)!

Within this context, white space is treated very differently. Let’s take a look at this example (see live at https://captainbrosset.github.io/white-space-article/example3.html):

```html
<body>⏎
⇥<div>◦◦Hello◦◦</div>⏎
⏎
◦◦◦<div>◦◦World!◦◦</div>◦◦⏎
</body>
```

We have 3 text nodes in there that contain only white spaces, one before the first div, one between the 2 divs, and one after the second div.

Browser engines may be optimizing this differently, but for the sake of understanding, I’ll go with the following explanation:

Because we’re inside a block formatting context, everything must be a block, so our 3 text nodes also become blocks, just like the 2 divs.
Blocks occupy the full width available and are stacked on top of each other, which means that we end up with a layout composed of this list of blocks:

```html
<block>⏎⇥</block>
<block>◦◦Hello◦◦</block>
<block>⏎◦◦◦</block>
<block>◦◦World!◦◦</block>
<block>◦◦⏎</block>
```

We can simplify it further by applying the processing rules for white space in inline formatting contexts:

```html
<block></block>
<block>Hello</block>
<block></block>
<block>World!</block>
<block></block>
```

The 3 empty blocks we now have are just not going to occupy any space in the final layout, because they just don’t contain anything, so we’ll indeed end up positioning 2 blocks in the page only. And people viewing the web page will see the words Hello and then World! on 2 separate lines as you’d expect 2 divs to be laid out.

So in this case, the browser engine has essentially ignored all of the white space that was added in the source code.

![Animation showing how the browser has removed all whitespaces](/assets/qrp3VcKiYZEBVJ-hZ4CNLQ.gif)

### Why don’t we see white spaces in devtools?

We’ve seen in the previous section how white space was often ignored when rendering the layout, but we’ve said that it still played a role in the DOM tree. Text nodes are still being created in the DOM tree of the page, so the following code:

```html
<body>⏎
⇥<div>◦◦Hello◦◦</div>⏎
⏎
◦◦◦<div>◦◦World!◦◦</div>◦◦⏎
</body>
```

still generates the following tree:

```html
element node: <body>
 ∟ text node: ⏎⇥
 ∟ element node: div
    ∟ text node: ◦◦Hello◦◦
 ∟ text node: ⏎⏎◦◦◦
 ∟ element node: div
    ∟ text node: ◦◦World!◦◦
 ∟ text node: ◦◦⏎
```

And the primary job of any inspector panel in any devtools out there is to display the DOM tree, but if you try for yourself, you’ll see that these text nodes are just not there.

![Showing that firefox devtools does not show the whitespace text nodes](/assets/psIbuiT-ckAHBBGr8F0m5g.png)

![Showing that chrome devtools also does not show the whitespace text nodes](/assets/i7luPjjD1x7M5oWVXpYnVA.png)

The reason being that if the browser engine ignores these white space only text nodes when creating the layout, then it’s probably safe for devtools to ignore them too. After all, authors only use them for formatting, and visitors don’t see them. So there’s no real need for devtools to show them.

Now, there are in fact cases where showing white space text nodes in devtools could be useful. The following sections will describe what they are.

### Spaces between inline and inline-block elements

In fact, we’ve seen this already with the very first example in this article, when we described how white space was processed inside inline formatting contexts.

We said that there were rules to ignore most characters but that certain spaces staid in order to, basically, separate words.

So, when you’re actually dealing with text only, paragraphs that may contain inline elements such as em, strong, span, etc. you don’t normally care about this because the extra white spaces that do make it to the layout are actually helpful to separate the words.

But it gets more interesting when you start using inline-block elements. These elements appear as inline elements from the outside, but behave like blocks on the inside, so they are very often used to display more complex pieces of UI than just text side by side on the same line (just like if you floated blocks).

I think the expectation from web developers is that because they are blocks, they will behave as such, and just stack side by side (rather than on top of each other), but really they don’t. If there is formatting white space in the markup between them, then that will create space in the layout just like between text.

Consider this example:

```html
<style>
  .people-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  .people-list li {
    display: inline-block;
    width: 2em;
    height: 2em;
    background: #f06;
    border: 1px solid;
  }
</style>

<ul class="people-list">⏎
                        
◦◦<li></li>⏎
                        
◦◦<li></li>⏎
                        
◦◦<li></li>⏎
                        
◦◦<li></li>⏎
                        
◦◦<li></li>⏎
                        
</ul>
```

If you open this in a browser, you’ll see the following result:

![Showing the line with the list items from the code above, separated by some space](/assets/_OCThEatQqzndeqgJN9Fzw.png)

Which is most probably not what you intended. Let’s assume this is a list of people’s avatars and you wanted them displayed like this instead:

![The line of list items, with no space in between](/assets/Vly3EOAPmBSsupOQsT_Nzw.png)

Well, this is a very common CSS layout problem and [questions](http://stackoverflow.com/questions/5078239/how-to-remove-the-space-between-inline-block-elements) and [articles](https://css-tricks.com/fighting-the-space-between-inline-block-elements/) have been written about this. There exist solutions, things like getting rid of the white space altogether, setting your font-size to 0, or using negative margin, etc.

What is interesting here isn’t really the solution to this common problem, but the fact that this is a common problem at all, and that many web developers have spent at least a little bit of time confronted to.
Suddenly white space does show up in your layout in a way you didn’t expect and it may take you a while to figure out the problem.

Because the corresponding text nodes aren’t in devtools, people loose time on this common problem if they haven’t faced it before. They’ll check if there is margin somewhere but won’t find any.

So that’s one example of when showing white space text nodes in devtools would actually be useful. Let’s see another one.

### Controlling white space rendering

Using the CSS `white-space` property, you can control how white space characters are processed when a given inline formatting context is laid out.

css-tricks.com has a [nice article about this property](https://css-tricks.com/almanac/properties/w/whitespace/).

The important thing is that if you set this property to `pre`, `pre-wrap` or `pre-line`, this will actually honor some or all of the white space character in the source HTML code, and they will start taking space in the layout.

If we take a simple example from earlier:

```html
<h1>◦◦◦Hello◦⏎
⇥⇥⇥⇥<span>◦World!</span>⇥◦◦</h1>
```

But add the following CSS rule:

```css
h1 { white-space: pre; }
```

We then end up with the following layout:

![Animation showing how Firefox DevTools shows where the whitespace has been assigned](/assets/Dz-vnOLt_eG0vweIkaJMoQ.gif)

Using Firefox DevTools to highlight text nodes, you can see exactly what space is occupied by the “Hello” text node. See live at https://captainbrosset.github.io/white-space-article/example5.html.

As you can see above, the layout inside the h1 element respects the formatting of the source HTML file. There is some space before the word _Hello_, then a line break, then more space and the word _World!_.

In fact, as you can see, the first node shown in devtools inside the h1 element is a text node and hovering over it does highlight the space taken by that node in the page.

Hovering over the span element also highlights the space taken in the page, and in particular, you can see the space before the word World! coming from:

```html
<span>◦World!</span>
```

Therefore, that’s a second reason why devtools should show white space text nodes. Indeed, someone trying to understand the layout and not knowing about the `white-space` property may be confused.

### Firefox DevTools to the rescue!

Starting with version 52 of Firefox, [the inspector panel shows white space text nodes](https://blog.nightly.mozilla.org/2016/10/17/devtools-now-display-white-space-text-nodes-in-the-dom-inspector/) when they do have an impact on the layout and also highlights them in the page.

How does the inspector know when a node impacts the layout? It simply checks if that white space text node has a size. When a text node is ignored, it’ll have a width and height of 0, but when it participate in the layout, it’ll have some dimension.
So, using this simple heuristic, Firefox DevTools can show the white space text nodes that are important.

![Animation showing how Firefox DevTools displayed whitespace text nodes when they matter](/assets/FxrkWgJ9axNWk-BdvZyHbQ.gif)

As you can see above, the white space text nodes that do have a size in the page are now shown in the inspector panel and, if you hover over them, they are also highlighted in the page so you know exactly where they are and how big they are.

This way, if you were originally confused about why the avatars in the page didn’t sit next to each other, it will now be very obvious why that is. No more loosing time looking for margins that aren’t there or crafting the right google search query that will give you the answer.

In fact, you can even remove these text nodes and see that the inline-block elements are now displayed exactly as you wanted them to.

![Animation showing how you can remove the whitespace text nodes in the inspector](/assets/lDvyOw-qUrt8S9KHPlV3WQ.gif)

[Firefox 52 is now available as a Nightly build](https://nightly.mozilla.org/), so go ahead and grab it and take it for a spin.

Hopefully this new feature and this article have been helpful, thanks for reading!