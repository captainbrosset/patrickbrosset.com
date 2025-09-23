---
layout: article.njk
title: What's wrong with this, and is this valid HTML?
tags: article
date: 2025-09-23
hasCode: true
excerpt: "..."
thumbnail: "..."
altText: "..."
draft: true
---

# What's wrong with this, and is this valid HTML?

Behold this magnificient HTML document:

```html
<html>
  <body marginheight=150 marginwidth=300 bgcolor=black text=white>
    <marquee>
      <b>Hello <i>HTML</b> World!</i>
    </marquee>
  </body>
```

To try it in your browser, copy the following line and paste it into the address bar:

`data:text/html,<html><body marginheight=150 marginwidth=300 bgcolor=black text=white><marquee><b>Hello <i>HTML</b> World!</i></marquee></body>`

## What's wrong with it?

Everything? I mean, this HTML looks like it was written in 1998. Here's everything that's wrong with it:

1. The document is in quirks mode because it lacks a proper `DOCTYPE`. Maybe you're lucky enough to have started your web developer career after quirks mode was a thing. But, suffice to say it's weird.
   Examples of weird rendering issues include:
   * The box model behaves differently, affecting layout and spacing.
   * Some CSS properties may not work as expected.
   * _TODO: give specific examples here_

1. The `<head>` tag is missing, which means the document has no `<title>` either, which is bad for accessibility.
   A common thing that assistive technology users do is to read the title of a page first to know if they want to spend more time reading the page's content. Without a descriptive title, folks are forced to start reading the content to know if that's the content they wanted to read in the first place, which is time-consuming and potentially confusing.

1. The `<body>` tag uses deprecated attributes: `marginheight`, `marginwidth`, `bgcolor`, and `text`.
   These attributes are obsolete and discouraged by the spec itself.

1. The `<marquee>` tag is obsolete and should be avoided in favor of CSS animations.
   Plus, if you really must animate scrolling text, then please use the `prefers-reduced-motion` media query to respect user preferences.

1. The `<b>` and `<i>` tags look like they're used for styling used for styling. That's wrong, right?
   More on that later.

1. The `<b>` and `<i>` tags are improperly nested. The nesting is `<b><i></b></i>` which is out of order.

1. The closing `</html>` tag is missing.

## Is this valid HTML?

Well, yes and no:

* No: if you send this to the [W3C HTML validator](https://validator.w3.org/nu/), it'll be pretty angry at you and list the above errors.
* But also, yes: the resulting page just loads and works fine in browsers.

Before discussing about each point in details, don't you think this is just beautiful? HTML is so self-correcting that you just breaking a browser only with HTML is really hard. Also, HTML code which looks like it was written two decades ago still works! _TODO: give an example of sites which still work fine today_.

Now let's review the above list of problems and go into some details about why they're not actually causing any issues:

1. Quirks mode can lead to weird rendering issues, sure, but it's still implemented in browsers.
   _TODO: give some history on what it is, and why it's different, also show how much it's still used today._

1. The `<head>` tag can definitely be omitted. Neither the HTML spec, nor browser implementations require the tag to be present.
   It's bad for accessibility reasons if you omit it, again because you probably also won't have a `<title>` tag, but it works.
   In fact, you can also omit `<html>` and `<body>` too. Personally, I commonly use this for quick tests. When I need to test something quickly in a browser, instead of creating a new HTML file on my computer which takes more time, I just type some HTML in the address bar directly. For example: `data:text/html,<div>something`. No html, no head, no body elements. And I don't even close HTML tags, as either, as the parser will do that for me.

1. The deprecated presentational attributes are still implemented in browsers, for backward compatibility reasons, even if they're discouraged.
   Here are other similar attributes: `alinkColor`, `vlinkColor`, _TODO: add others, and detail what they do._
   These presentational attributes act as 0-specificity CSS properties. _TODO: add more content here._

1. The `<marquee>` element still animates text in browsers. In fact you even can go crazy with it:
   ```html
   <marquee
      direction="down"
      width="250"
      height="200"
      behavior="alternate"
      class="outlined">
      <marquee behavior="alternate">This text will bounce</marquee>
    </marquee>
   ```
   _TODO: show a GIF or live embed of what it looks like._
   _TODO: Point to a codepen, or something else, which scrolls text via CSS instead, and respects user motion preferences._

1. Using `<b>` and `<i>` is perfectly valid. They use to be meant for making the text bold and italic, hence their names. But they were deprecated in HTML4, and the meaning of the tags was changed to mean: "bring attention" and "idiomatic text" instead. 
   `<b>` is now used to markup keywords, product names, or other spans of text whose typical presentation would be boldfaced, but not including any special importance.
   `<i>` is now used to markup text that is set off from the normal prose for readability reasons.
   More semantic tag names have since been invented: `<strong>`, `<em>`, or `<mark>`, which convey slightly different semantics.
   If there's no semantic aspect to the piece of text you want to make bold or italic, don't use `<b>` or `<i>`, use CSS `font-weight` and `font-style` instead.

1. Misnested tags are perfectly valid in HTML.
   The following markup: `<b><i></b></i>`, creates the following DOM tree:
   ```
   ⌊_ b
   |  |
   |  ⌊_ i
   |
   ⌊_ i
   ```
   This is even specified in the HTML spec. The above case is taken care of by the adoption agency algorithm that's described in the spec. _TODO: maybe describe a little more, and link to the relevant part of the spec._
   It doesn't mean you should do this. It's still important to create correctly nested HTML markup. But there are historical reasons for such misnesting to work.
   Back in the early days, different browser engines would parse HTML in different ways, which meant that HTML documents didn't always lead to the same DOM tree in different browsers.
   In order to ensure that as much of the web as possible was supported across browsers, and do this in a simple way (i.e. without having to reverse engineer how other browsers did things), it was easier to just support how browsers did things.
   _TODO: find more details about the specific `<b><i></b></i>` history here. Chris Wilson is, I think, responsible for this, and this was done on purpose, to match authors intent._

1. Missing closing tags are fine. The HTML parser is able to close them on its own most of the time.
   In fact, you might already be using this without realizing it.
   Ever typed `<meta name="description" content="...">`, or `<link href="style.css" rel="stylesheet">`, or `<input type="text">`? No closing tags!
   _TODO: more content here._

_TODO: write a conclusion._
