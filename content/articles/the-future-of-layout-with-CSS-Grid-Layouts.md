---
layout: article.njk
title: The future of layout with CSS Grid Layouts
tags: article
date: 2015-08-26
permalink: "articles/2015-08-26-the-future-of-layout-with-CSS--Grid-Layouts/index.html"
hasCode: true
excerpt: "An introduction article to CSS Grid, thew new awesome layout mechanism for CSS."
thumbnail: "/assets/grid/grid3.png"
altText: "An illustration of a CSS grid, showing multiple cells, lines, areas, and tracks"
---
In this article we'll take a look at the wonderful world of the CSS Grid Layout, a relatively new [W3C specification](http://dev.w3.org/csswg/css-grid-1/) that has partially started to see the light in some browsers.

But before we dive into what this new CSS technique is all about and how to use it, let's quickly review grid theory.

### My really short introduction to grid theory

I am not a designer nor did I know much about grid theory before stumbling upon the CSS Grid Layout specification, so don't take my word for it and go look it up yourself, but if you don't care to, here's my pitch about it:

In essence, a grid is a set of invisible vertical and horizontal lines that the various design and content pieces of a web page, magazine or newspaper are positioned on.
The goal of a grid is to serve as a base for placing the various pieces of content and to make sure these pieces are aligned and spaced out evenly.
A grid, even if not visible, provides the viewer with a way to navigate content visually.

### So what has CSS got to do with it?

CSS is getting a set of entirely new properties that, when used together, allow you to define grids for your web content to go onto.
These properties are defined in the [CSS Grid Layout specification](http://dev.w3.org/csswg/css-grid-1/).

CSS hasn’t particularly been known for its ability to handle complex layouts. Although this may not have been a problem when CSS first came out, it has evolved to be a pretty common one over the years as all sorts of complex layouts couldn’t be easily implemented.
People have been very creative at getting around the lack of support by using floats or absolute positioning and a variety of CSS layout frameworks emerged.

So it’s about time CSS got some proper layout solutions to support today's use cases.

### Can I use it?

Yes you can start using it today, but only Chrome has implemented the specification far enough to play with grids, and you need to turn the experimental Web Platform features flag on.

IE has an early implementation (dating back to IE10) too but the spec has evolved since it was added and so it’s not entirely compatible with it anymore.

Firefox has [started implementing it](https://bugzilla.mozilla.org/show_bug.cgi?id=616605) too so it shouldn’t be too long before you can use it in this browser.

Finally, [a polyfill](https://github.com/FremyCompany/css-grid-polyfill) exists, so you have no excuses not to start experimenting (and I strongly encourage you do)!

### So what's a CSS Grid Layout?

To its core, a grid layout in CSS is a set of vertical and horizontal lines that define cells that content can be arbitrarily positioned on.
So it looks like a table in a way, except for a few key differences we’ll see later.

![The main building blocks of a grid, lines and cells](/assets/grid/grid1.png)

The previous figure shows the building blocks of a grid:

* **Lines**: in this case there are 4 vertical lines and 3 horizontal lines. Lines are given numbers starting from 1. Vertical lines are shown from left to right, but this depends on the writing direction.
Lines can optionally be given names, which helps with referencing them in CSS as we’ll see later.
* **Tracks**: a track is simply the space between 2 parallel lines. So in the above example, there are 3 vertical tracks and 2 horizontal tracks. Lines are useful to say where content starts and stops, but tracks are ultimately where content goes.
* **Cells**: a cell is where a horizontal and a vertical track meet. In the figure above, only one cell has been highlighted, but there are 6 cells in the grid.
* **Areas**: an area is a rectangular shape that can span an arbitrary number of cells. Areas, like lines, can be named. In the above grid, we could for example define areas A, B and C as shown below:

![A 3x2 grid with 3 grid areas: A covering the first 2 vertical cells, and B and C covering 2 cells each, horizontally](/assets/grid/grid2.png)

Now that we know these simple definitions, let’s take a look at what makes grids so powerful.

### One key advantage of CSS grids is that they enforce real separation of layout and markup.

Indeed, the grid itself is completely defined purely in CSS. This means that apart from the parent HTML element the grid is applied to, there's no need for defining any extra elements for the columns, rows, cells or areas.

When you think of it, that’s a really interesting property. One aspect of it is that the visual order of elements on the page is decoupled from the order of elements in the markup. That’s important because on a page the source order is used for things like speech and tab navigation, so CSS Grids allow you to optimize the markup for accessibility without compromising your ability to manipulate the visual result. One other point is that the markup will be somewhat lighter and easier to understand, and therefore easier to maintain.

But more importantly, this gives a very powerful tool for separating the content from the layout, effectively decoupling them in a way that making a change to any of them doesn’t impact and otherwise break the other.
As a designer, you could easily experiment with new layouts without having to change anything else than CSS, as long as your new layouts provide the expected lines and areas the content uses.
And as a developer, you would simply need to use the numbered or named lines and areas to position your content on the grid.

Imagine the simple following grid layout:

![A 3x5 grid with various areas positioned, header, sidebar, footer, title and 3 articles, each spanning a few cells](/assets/grid/grid3.png)

In this layout, named areas have been defined, allowing content to be positioned in them simply by referencing these names. This means that not only can we change this layout relatively easily in the future, as long as we maintain the named regions (here the named regions act as the layout’s public API in a way), but media-queries can also be used to change this layout dynamically too. Remember, the whole layout is defined in CSS, so media-queries play with grid layouts very well.

For instance, using a media query, the previous layout could be switched to something like this on smaller screens:

![A 7x1 grid, containing the same elements as the one before, but re-arranged on 1 column](/assets/grid/grid4.png)

Enough with the theory, let’s see how grid layouts are actually defined using CSS.

### Creating grids with CSS

Defining a grid requires only one HTML element to be present: the **grid container**. That’s the element the layout is going to be applied to.
Any HTML element that’s a child of the grid container is a **grid item**. Grid items are what go onto the grid.

Setting an element as being a grid container is as simple as:

```css
.container { display: grid; }
```

Just doing this though isn’t nearly enough, we also need to define what this grid looks like, how many columns and rows it has, and how big they are.
This can be done by using grid templates as shown in the following example:

```css
.container {
  display: grid;
  grid-template-rows: 200px 100px;
  grid-template-columns: repeat(4, 100px);
}
```

In the example above, we’re explicitly defining a grid that has 2 rows and 4 columns. Note how the `repeat()` function is used here to avoid repeating a fragment of the tracks 4 times, this is equivalent to `100px 100px 100px 100px`.

Each of the defined tracks is given a size, and so we end up with a grid structure that looks like this:

![The resulting grid, from the code snippet above, 4 columns, 2 rows](/assets/grid/grid5.png)

Note that grids can also be implicitly defined like in:

```css
.container {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: repeat(4, 100px);
}
```

In this case, the browser will keep on adding rows as needed to fit the content.

Let’s go back to our simple, explicit, 4 by 2 grid and let’s add some content. As we said previously, we only need 2 levels of elements, the container and the items, so let’s use this:

```html
<div class="container">
  <div class="item1">item 1</div>
  <div class="item2">item 2</div>
  <div class="item3">item 3</div>
  <div class="item4">item 4</div>
  <div class="item5">item 5</div>
</div>
```

Which, without any specific CSS code to position the items, leads to the following arrangement:

![The grid from before, with 5 HTML elements inside it](/assets/grid/grid6.png)

As you can see above, since we didn’t define where these items should sit on the grid, the browser has positioned them automatically by putting one item per cell until the first row got filled in, at which point it decided to put the rest of the items on the next row.

The spec defines an algorithm for automatically placing items on the grid if they haven’t been given a position and that is sometimes useful when, for example, you have either many items or a dynamic number of items and don’t want to or can’t define the position for them all.

Let’s see how our items can be positioned on the grid.

```css
.item1 {
  grid-row-start: 1;
  grid-row-end: 2;
  grid-column-start: 1;
  grid-column-end: 3;
}
.item2 {
  grid-row-start: 1;
  grid-row-end: 2;
  grid-column-start: 3;
  grid-column-end: 5;
}
```

Here we’ve defined the position of the 2 first items, which means that the other ones will still be automatically positioned by the browser, as shown below:

![The grid from before, with the first 2 items each spanning 2 columns](/assets/grid/grid7.png)

The above example uses **line-based placement** in that it uses numeric indexes of lines to place items.
Items 1 and 2 are defined to be positioned between horizontal lines 1 and 2, and between vertical lines 1 and 3 and 3 and 5.

What happens now if we keep on adding items, but there aren’t any grid cells defined to receive them?

![The same grid again, with 6 more elements in it, stacked at the end, with new implicit cells getting created](/assets/grid/grid7.png)

The grid keeps on adding rows and columns as needed. Note that these new tracks will have their sizes depend on the content size.

So that’s all well and good, but one thing that’s really useful when it comes to CSS Grids is grid areas as we saw earlier. Let’s take a look at how grid areas can be used in CSS.

First of all you’ll need to define the grid container and its tracks and areas:

```css
.container {
  display: grid;
  grid-template-rows: 100px auto 100px;
  grid-template-columns: 100px auto;
  grid-template-areas:
    "header  header"
    "sidebar content"
    "footer  footer";
}
```

In this example, we’ve defined 3 rows, the top and bottom ones being 100px high, while the middle one will just adapt to its content. We’ve also defined 2 columns, the left one 100px wide, and the right one adapting to its content.

We’ve also introduced the `grid-template-areas` property that may look strange at first, but it’s really simple when you realize it’s only a representation of the grid with names on it. Let’s explain this.

We said we had 3 rows and 2 columns right? Let’s represent them in ascii-art like this:

```html
+---+---+
| . | . |
+---+---+
| . | . |
+---+---+
| . | . |
+---+---+
```

Each dot is a cell where areas can be defined. So let’s define areas for a typical website layout:

```html
+--------+--------+
| header | header |
+--------+--------+
| sidebar| content|
+--------+--------+
| footer | footer |
+--------+--------+
```

We want the header and footer to span the whole width, so we’ve repeated them in the 2 columns.
Now, if we just remove all the useless ascii-art style borders and include each line in double-quotes, we get something like this:

```css
"header  header"
"sidebar content"
"footer  footer"
```

which is exactly how grid areas are defined in CSS using the `grid-template-areas` property. It helps thinking about it as a 2D representation of the grid in ascii-art and aligning area names.

You can also use dots ‘.’ when a cell isn’t covered by an area. Here’s an example of this:

```css
.container {
  display: grid;
  grid-template-rows: repeat(5, 100px);
  grid-template-columns: repeat(5, 100px);
  grid-template-areas:
    ". . . . ."
    ". . . . ."
    ". . a . ."
    ". . . . ."
    ". . . . .";
}
```

In this example, there are 25 cells and 1 area that is defined to occupy only the center cell.

Now, going back to the previous header, sidebar, content, footer example, let’s add some markup to it:

```html
<div class="container">
  <div class="header">header</div>
  <div class="sidebar">sidebar</div>
  <div class="footer">footer</div>
  <div class="content">
    <p>Lorem ipsum dolor sit amet...</p>
 </div>
</div>
```

The last thing that needs to be done now is position each grid item in the right named areas (we’ve conveniently used class names that correspond to area names here):

```css
.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.footer { grid-area: footer; }
.content { grid-area: content; }
```

Which would produce something like this:

![A page layout with the header spanning across the top, a sidebar and main areas side by side next, and at the bottom, spanning horizontally, a footer](/assets/grid/grid9.png)

Now, if we wanted to change this layout at any point, or make it adapt to variable screen sizes thanks to media queries, we would only have to change the grid declaration. Maybe to something like this:

```css
.container {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 100%;
  grid-template-areas:
    "header"
    "sidebar"
    "content"
    "footer";
}
```

Which, without any other changes to the CSS or markup, would produce this:

![The same as before, buth with header, sidebar, main and footer stacked vertically, from top to bottom, in one column](/assets/grid/grid10.png)

We could even completely reshuffle the order of items in the grid without having to change the order in the markup.

### CSS Grids in the real world

So far we’ve only seen simplistic examples of grids, but websites making use of grid systems often have much more complex grid structures. It’s not uncommon for such websites to be based on 12 columns, each of them separated by gutters (narrower columns used to space things out).

Take [dribbble.com](https://dribbble.com/) for example, this design showcase website makes use of a grid to display the designs uploaded by their users. Here the grid is very easily visible because each design occupies exactly one cell (excluding gutter rows and columns):

![Dribbble's interface, with the grid system being highlighted](/assets/grid/dribble.gif)

Dribbble’s grid layout is also responsive, so if the viewport size changes, the size and number of columns changes gradually, as shown in the following animation:

![Dribbble's interface, re-arranging its number of columns depending on the available space](/assets/grid/dribble2.gif)

Using the new properties that come with the CSS Grid Layout implementation, we can try and create a dribbble-like layout. For an added twist, let’s try and insert a piece of text content on the second row, and make that content span the whole row.

First of all, our markup will be something like this:

```html
<ul class="dribbbles">
  <li class="dribbble">...</li>
  <li class="dribbble">...</li>
  ...
  <li class="dribbble">...</li>
  <li class="advert">Some text ....</li>
</ul>
```

Where the `.dribbbles` element is the main container for all items, and each `.dribbble` element represents one of the designs showcased on the page. The last item, `.advert`, is the piece of textual content we want to show on the second row.

Now, let’s make a grid for it.

```css
.dribbbles {
  display: grid;
  /* Let's assume the default design has a fixed width */
  width: 880px;
  grid-template-columns: repeat(4, 220px);
  grid-template-areas:
   ".      .      .      ."
   "advert advert advert advert";
  justify-items: center;
}
.advert {                                          
  grid-area: advert;                                         
}
```

Here we’ve defined 4 columns in our grid. We haven’t said anything about rows, so the browser will automatically create rows as needed.
We did, however, define a couple of rows using the `grid-template-areas` property and that’s because we need to place our advert text content on the second row. So we’ve just said that we want a first row with empty cells that are going to be filled in automatically with grid items, as they come, and then a second row that defines an advert area that spans all 4 columns.

Finally, the second rule in there uses the `grid-area` property to place the grid item that has the class `advert` inside the `advert` area.

Given the markup we created earlier, this should end up looking something like this:

![Result of the code above, a grid of pictures, 4 columns wide, with a piece of text content spanning the entire width on the second row](/assets/grid/dribble3.png)

Pretty simple, right? Of course this requires some styling code to make the items look nice and all, but the layout CSS code is really short and there’s no extra markup required.

Now, we can make this responsive too. Let’s say we want to jump to a 3-columns layout for smaller screens:

```css
@media (max-width: 880px) and (min-width: 660px) {
  .dribbbles {
    width: 660px;
    grid-template-columns: repeat(3, 220px);
    grid-template-areas:
      ".      .      ."
      "advert advert advert";
  }
}
```

And so on, for all the screen sizes we want to support. And so, just adding a couple more short media queries, we could end up with something like this:

![Same site as just before, as an animation, resizing the page, to force the layout to swatch from 4 to 3 to 2 columns](/assets/grid/dribble4.gif)

Sites like Dribbble don’t use the CSS Grid Layout yet, but there are well known CSS libraries that provide grid systems.

A good example of a grid system in CSS is [the Bootstrap CSS library](http://getbootstrap.com/css/#grid) but there are others like [PureCSS](http://purecss.io/grids/), [960 Grid System](http://960.gs/), [Responsive Grid System](http://www.responsivegridsystem.com/), [Materialize](http://materializecss.com/grid.html), and more.

These grid systems unfortunately have to use arrangements of carefully sized and floated DIVs, and need extra DIVs for columns and rows, as well as pseudo-elements for clearing floats.
It’s not that it’s all that complex, after all the tricks that these libraries rely on have been known for years, but they’re just this, tricks, and it’s about time we get a proper built-in solution and get rid of them.
Don’t get me wrong, these libraries are awesome in all sorts of way, and most importantly, they are the ones which made it clear we needed a new CSS feature for defining grids in web layouts, and were therefore the ones which ultimately made the CSS Grid Layout specification possible.

### Closing words and references

As we saw, CSS grids are a pretty good tool for defining layouts that have nice characteristics like authoring simplicity, maintainability, separation of content and layout and that play well with responsive design.
But we’ve only barely scratched the surface of what is possible with CSS grids. The various properties and syntax possibilities allow for a lot of really cool things to be done, and I hope this article made you want to dig further by yourself.

Here are some interesting references if you wish to know more:

* The spec: [http://dev.w3.org/csswg/css-grid-1/](http://dev.w3.org/csswg/css-grid-1/)
* Some grid examples by Rachel Andrew: [http://gridbyexample.com/](http://gridbyexample.com/)
* Bug to follow for the implementation in Firefox: [https://bugzilla.mozilla.org/show_bug.cgi?id=616605](https://bugzilla.mozilla.org/show_bug.cgi?id=616605)
* How to use it in IE: [https://msdn.microsoft.com/en-us/library/hh673533%28v=vs.85%29.aspx](https://msdn.microsoft.com/en-us/library/hh673533%28v=vs.85%29.aspx)
* If there’s one talk you need to watch, it should be this one by Rachel Andrew:

https://www.youtube.com/watch?v=GRexIOtGhBU

* And Manuel Rego’s talk is also very useful:

https://www.youtube.com/watch?v=9js_5MjiGFo