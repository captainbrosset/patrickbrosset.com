---
layout: main-layout.njk
subtitle: articles
pagetitle: Measuring elements and distances in Firefox DevTools
---

## Measuring elements and distances in Firefox DevTools

<time datetime="2016-05-25">May 25th, 2016</time>

There’s a few ways you can measure elements or distances between elements in Firefox DevTools. In this article, you’ll learn about them and hopefully discover some things which are useful.

### Using the rulers

The rulers tool is useful to have around at all times. It provides a way to quickly check how tall or wide a page is, how big are the various columns or sidebars, and how much you’ve scrolled.

The rulers tool is not ON by default, so you have to enable it first. To do this:

* open the toolbox (I often use `ctrl+shift+I` as a quick way to toggle the tools, but that’s just me, `F12` works too, and of course `right-click` on the page and select “inspect element” is often an easy way to do it),
* switch to the options panel (that’s the cog icon in the toolbar, far right, or `ctrl+shift+O`),
* there are many options in there, don’t be scared, just scroll down to the “Available Toolbox Buttons” section and make sure the “Toggle rulers for the page” box is checked,
* once done, you’ll have a nice little icon in the toolbox toolbar that you can just click to toggle the rulers.

![Gif showing how to enable the rulers in Firefox](/assets/enable-rulers.gif)

Once you have enabled the rulers tools, it’s really easy to use. Click on the rulers icon to display the rulers, and click again to hide them:

![Gif showing what the rulers look like in Firefox](/assets/use-rulers.gif)

### Measuring elements

Whether you’re debugging a layout problem or arranging elements in a new page’s layout, you may need to measure elements to verify they are the right size and aligned correctly. Sometimes an alignment problem is subtle enough that you just can’t see the problem with the naked eye and you need detailed information.

The Firefox DevTools have you covered in a few ways that you may find useful.

First of all, by hitting `ctrl+shift+C` or by clicking on the cursor icon in the top left corner of the toolbox, you enter the element picker mode.

![Highlighting the node picker button in Firefox](/assets/enable-picker.png)

This tool obviously allows you to select new elements in the page by clicking on them, this is what people use it for, but while moving your mouse over elements in the page, notice that elements are highlighted:

![Gif showing the visual information that the element picker in Firefox displays](/assets/picker-highlighter.gif)

This highlighter also appears when you simply hover over elements inside the inspector (in the DOM tree that’s displayed in the main panel).

What’s interesting about the highlighter is that:

* the element’s box-model is highlighted, which means that you get different colors for each of the element’s content area, padding, border and margin,
* vertical and horizontal guides are displayed around the element’s content area.

The guides are particularly nice if you’re using the rulers tool at the same time, because they extend all the way up to the rulers so it’s easy to quickly visualize how tall or wide an element is:

![Showing how the guides of the element picker play well with the rulers](/assets/picker-guides-and-rulers.png)

Secondly, as you saw in the previous screenshot, as you hover elements in the page, a tooltip appears next to them.
We call this tooltip the node info bar and it’s useful when it comes to measuring elements because it contains the dimensions of the element being hovered.

It’s worth noting that these are the dimensions of the border box of the element. So if an element has a content of 20px and 10px padding to the right and left and 5px border to the right and left, then the width displayed in the node info bar is going to be 50px.
The reason for this is that it’s often more useful to know the size of the thing you see, and padding and border are often visually part of the element.

If you need even more information about an element’s box model, head over to the “Box Model” tab that you’ll find in the inspector’s sidebar tab panel.

Indeed, while an element’s size might seem right, you might be wondering about it’s margin, or border size.

This panel gives you information about all of the computed element’s box model regions:

![The Firefox DevTools box-model panel](/assets/box-model-panel.png)

But what’s also pretty useful in this view is that you can simply hover over the different colored regions to see them being highlighted individually in the page, with the vertical and horizontal guides around them:

![Gif showing how hovering over the regions of the box-model panel highlights the corresponding regions in the page](/assets/box-model-hover.gif)

### Measuring arbitrary distances on the page

Finally, I wanted to highlight one last tool that might prove useful when you want to get a quick measure of anything on the page: the distance between 2 elements or the size of a given area, whether or not those things are DOM elements or not.

This is the measurement tool, which you need to activate first (just like we did with the rulers tool at the start of this article):

* in the options panel, scroll down to the “Available Toolbox Buttons” section,
* make sure the “Measure a portion of the page” box is checked,
* once done, you’ll have a new icon in the toolbox toolbar which you can click on to display or hide the measurement tool.

![Gif showing how to enable the measurement tool in Firefox](/assets/enable-measure-tool.gif)

The measurement tool is useful to know how tall or wide something is, or how far apart two things are, as illustrated below:

![Gif showing how to use the measurement tool in Firefox, by drag and dropping anywher on the page](/assets/use-measure-tool.gif)

There’s also [an experiment going on at the moment](https://bugzilla.mozilla.org/show_bug.cgi?id=1263768) on a measurement tool that would detect edges of various things on the page and provide distances between them (which may sound familiar to people using [Sketch](https://www.sketchapp.com/) or [xScope](http://xscopeapp.com/), because that’s where the idea comes from).

That’s it! I hope you find these useful. Don’t hesitate to dig around in the toolbox, there are many features that aren’t immediately visible but that might really ease your workflow.