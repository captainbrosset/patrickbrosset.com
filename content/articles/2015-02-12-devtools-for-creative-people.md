---
layout: main-layout.njk
subtitle: articles
pagetitle: DevTools for creative people
---
## DevTools for creative people

<time datetime="2015-02-12">February 12th, 2015</time>

Browser DevTools are pretty complex. There are reasons for this though, they’re not just complex to annoy people.

* They contain within one tiny UI (often docked in the browser) various tools, often having very little in common with each other. All of these tools are needed, but having all of them together at all times in one application makes for a complex UI to grasp.
* These tools are sometimes very low level. They need to be low level, users need to understand how things work or, most often, why they don’t, and that means explaining how it was interpreted by the browser, at the lower level.

Add to this the number of new APIs and libs that appear constantly in the web platform, it’s easy for devtools to become more and more bloated and harder to use for creative people, people that are perhaps used to a more visual set of tools.

Modifying a page’s structure and style in devtools right now requires knowledge of HTML and CSS. This may sound obvious, but I’m convinced this could be made a lot simpler, or let’s say more visual than having to write code. Why would you want to write a color hex code when you can pick it from a color wheel or an existing palette? Why would you tweak an element’s position pixel by pixel when you can grab and move the element instead, and have it snap to a grid?

### Bridging the gap

I think there’s work to do if we want to make the devtools be more accessible for everybody, and in particular be more efficient for creative people.

Here are examples of features I think would help, some of them are already present.

### Animations

An animation panel where you can play, pause, loop, seek or slow-down animations and tweak each keyframe’s properties makes adjusting animations in the browser a lot simpler and more natural.

In time, I think a flash-like timeline to author animations from scratch is inevitable.

Below is the animation inspector in Firefox 37:

![Animation inspector in Firefox 37](/assets/animation-inspector.png)

Similarly, editing animation timing functions (the rate at which the object moves during the animation duration) feels a lot more natural when you can change the cubic-bezier curve and have visual feedback rather than having to write numbers in a matrix.

https://www.youtube.com/watch?v=LemdYmcRrb0

### Transforms

`transform` is one of the most often animated CSS property, and that’s because it offers a lot of flexibility to move, reshape or resize an element in a very high performance way. But writing a transform function is often hard and again, much better solved visually.

Since Firefox 33, you can visualize the effect of a transform in the page:

https://www.youtube.com/watch?v=OC3ZNbnDHt0

Being able to visualize how a given transform function affects an element comparing its original and transformed shape and position is a step in the right direction, but ultimately, being able to [transform elements by freely distorting them in the page](http://codepen.io/fta/full/ifnqH/) is what devtools should aim for.

### Colors

![The eyedropper picks colors from the page (since Firefox 31).](/assets/eyedropper.png)

This is one of the more obvious examples, but it’s still worth noting how much better if feels to be able to tweak colors on a web page by choosing from a wheel or picking from the page rather than remembering color names or trying to guess the hex code.

### Images

Right now browser devtools don’t offer much when it comes to image assets management on a site. However [positioning sprite backgrounds](https://bugzilla.mozilla.org/show_bug.cgi?id=1108288) or [assembling multiple css background images](https://bugzilla.mozilla.org/show_bug.cgi?id=1130761) are not always easy problems and they are typically better solved visually than by going through code.
I think devtools should be helping more here.

### Layout

This seems to me like it’s the area that lacks devtools support the most.

Some people use CSS floats for their layouts, but I don’t see any tool that helps with understanding the notions of [block formatting context](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context) or how to clear floats. It seems like it would be useful to at least have a mode that highlights contexts, floated and clearing elements, to at least visualize the global structure of the layout.

Some sites start to make use of flexbox, which is awesome, but flexbox isn’t totally straightforward. Here again, devtools could help represent the structure of the layout in the page and allow modifications to be made visually (if that sounds like something you could help implement in FirefoxDevTools then [check out this bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1114973)).

![FirefoxDevTools 3D view](/assets/3d-view-firefox.png)

What about z-index? Here again there are some technical details that make the concept not always so easy to grasp, and it’s easy to fall into common traps.

Seeing your page in 3D, with elements ordered by z-index, can definitely help sometimes.
But what about a mode where you’d clearly [see the stacking context elements and the various z-indices marked](https://bugzilla.mozilla.org/show_bug.cgi?id=948364)?

![The `highlight` command in the Firefox Developer Toolbar can highlight nodes based on a CSS selector (Firefox 33).](/assets/highlight-css-selectors.png)

Finally, layout is all about sizes, grids and aligning things.

So the least the devtools can do to help is provide tools to verify that things are aligned correctly.
Drawing guides around elements that match a given selector is one way.
Adding rulers and guides is another nice option (check out [this bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1089240)).

### Element size and position

The last topic I’d like to touch on is positioning. Obviously if you’re not going to position anything in the page and rely on the default flow, then you’re not too likely to need any special help from your favorite devtools, but as soon as you start absolutely positioning elements, or using fixed or even sticky positioning, then some visual tools would be nice.

Work-in-progress in Firefox 38: the element geometry editor:

https://www.youtube.com/watch?v=zsNhGllr2-g

What if the devtools provided a way to fine tune the position or size of an element by moving or resizing it in the page? Wouldn’t that make more sense?
Obviously there are lot’s of cases where typing a number is going to be more efficient than moving something with the mouse, but I’m convinced the opposite is also true. Ever tried to resize an element to the size of its background image? Ever tried to find the perfect position for a logo?

In conclusion, I’d say I’m pretty hopeful with the direction the various browser devtools are heading right now and I’m certain we can bridge the gaps in many places to help creative people get more out of their experiences using their browsers as a creative tool.

**After all, if the content is going to be consumed in the browser in the end, why not create it there in the first place?**

But there’s still a lot of ground to cover so, get involved, [submit your ideas](http://ffdevtools.uservoice.com/), or [start hacking](https://wiki.mozilla.org/DevTools/GetInvolved)!
