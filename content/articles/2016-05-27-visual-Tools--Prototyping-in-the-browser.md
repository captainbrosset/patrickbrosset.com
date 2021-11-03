---
layout: main-layout.njk
subtitle: articles
pagetitle: Visual Tools — Prototyping in the browser
tags: article
---

## Visual Tools — Prototyping in the browser

<time datetime="2016-05-27">May 27th, 2016</time>

Today, browsers come with built-in tools that allow to inspect and debug existing web content.

In this post, I’ll argue that these tools could also allow creating content and working on this content in more visual ways. Ways that offer alternatives to having to deal with code too much, or rather help you deal with complex code in more intuitive ways.

I think visual tools address 2 specific use cases:

1. Some people already use web technologies today to prototype, create layouts and design ideas. But browser devtools are often complex and intimidating. There is a mismatch between what these people want to use the browser for and what the tools offer. Therefore, when prototyping things in the browser today, the usual “a) edit some code and b) refresh the page” workflow is still the best tool around. We can change this.

2. And on top of this, there are even more people not using the web at all for this type of work. Designers in particular often feel much more at ease with other tools. Tools made for them specifically. I think browser devtools can reach this audience, and ultimately get more people creating within the browser, with web technologies directly.

### Using the browser to our advantage

The web is weird in some sense, there are specific rules that define how a web page behaves if you compare it to other media:

* input is often undetermined (user-generated content),
* output is almost always unknown (various viewport and font size).

Non-browser tools that attempt to let users create web pages have to deal with this in some way. Often hiding these aspects behind abstractions, generating magic code (that no-one is supposed to look at or understand) on the user’s behalf.

I think we owe it to users to let them understand and write the code that’s used for re-arranging a layout when the page size changes for example, just make it easier to write it in the first place.

Browsers know how to deal with these things anyway, and ultimately, the content is going to be consumed by users in a browser, so it makes sense that we would create it there in the first place.

### What would it look like?

What’s a typical prototyping user story? What should prototyping in the browser look like?
These remain open questions. I think browser devtools will need to create their own very specific answer.

Right now though, browser devtools sit on one end of the spectrum, with a very technical set of features, mostly developer-oriented, and very little creation abilities.
On the other end of the spectrum, we find general prototype and design tools where pretty much any workflow can exist, and that people use to do pretty much anything from logos, to illustrations, to comics, to web page mockups.
In the middle, there’s some exploration worth doing.

From a very high level, when you’re creating something for the web, you’re going through these steps:

* adding content to the page,
* defining a layout for this content,
* polishing the design,
* adding interaction animations,
* testing and debugging,
* and shipping.

Browser devtools have a part to play in each of these areas. Here’s what a user flow could look like:

* _Adding content_: create a page directly in the browser to start prototyping, add elements to it, text and images, rename tags, add class names and move them around in the DOM tree (much like you’d move and groups layers in, say, Photoshop).
* _Defining a layout_: resize and move elements (or classes of elements) in the page, add padding, margin or borders, give elements a position, arrange things in a flexible, grid or column layout.
* _Styling the content_: fiddle with colors and gradients, add blur or shadow filters, change opacity or blend-modes, and have live previews while doing so.
* _Animating interactions_: create and adjust animations on elements or transitions between states.
* _Testing, debugging, adjusting_: use a responsive-design mode to test the page under various screen size and user agent combinations. Visually create breakpoints in your design with media queries.
* _Shipping_: finally save or export your prototype.

### We’re not starting from scratch

If you really know your devtools, the above flow isn’t too far from being possible today, but it’s not trivial and you can’t do everything. Also, a lot of it still requires coding.

But we’re definitely not starting from scratch. Some designer-oriented features have started to appear in browser devtools in the past, and some really good work has been done.

I work on the devtools for Firefox, so here’s a review of what we’ve done about this in Firefox until now:

* [Edit HTML to create new content](https://developer.mozilla.org/en-US/docs/Tools/Page_Inspector/How_to/Examine_and_edit_HTML#Editing_HTML_2).
* [Edit tag names and other attributes like classes](https://developer.mozilla.org/en-US/docs/Tools/Page_Inspector/How_to/Examine_and_edit_HTML#Element_popup_menu).
* [Add, duplicate or delete nodes easily from the inspector](https://developer.mozilla.org/en-US/docs/Tools/Page_Inspector/How_to/Examine_and_edit_HTML#Editing_HTML_2).
* [Drag and drop nodes in the markup to reorder them](https://developer.mozilla.org/en-US/docs/Tools/Page_Inspector/How_to/Examine_and_edit_HTML#Drag_and_drop).
* [Select elements visually from the page with the highlighter](https://developer.mozilla.org/en-US/docs/Tools/Page_Inspector/How_to/Select_an_element).
* [Edit padding, border and margins in a visual box-model view](https://developer.mozilla.org/en-US/docs/Tools/Page_Inspector/How_to/Examine_and_edit_the_box_model).
* [Move absolutely/relatively positioned elements in the page by dragging them](https://developer.mozilla.org/en-US/docs/Tools/Page_Inspector/How_to/Reposition_elements_in_the_page).
* Highlight all elements that match a given selector on the page.
* [Add new CSS rules](https://developer.mozilla.org/en-US/docs/Tools/Page_Inspector/How_to/Examine_and_edit_CSS#Add_rules).
* Edit CSS selectors.
* [Preview how CSS transforms impact elements’ size, shape and position](https://developer.mozilla.org/en-US/docs/Tools/Page_Inspector/How_to/Visualize_transforms).
* [Display rulers along the page](https://medium.com/@patrickbrosset/measuring-elements-and-distances-in-firefox-devtools-1d6c57bc1f3f#.xyvjggkg5).
* [Measure distances](https://medium.com/@patrickbrosset/measuring-elements-and-distances-in-firefox-devtools-1d6c57bc1f3f#.xyvjggkg5).
* [Change colors with a color picker](https://developer.mozilla.org/en-US/docs/Tools/Page_Inspector/How_to/Inspect_and_select_colors).
* [Sample colors from the page with the eye dropper](https://developer.mozilla.org/en-US/docs/Tools/Eyedropper).
* Add or edit CSS filters by choosing from a list or reusing saved presets.
* [Previewing background images](https://developer.mozilla.org/en-US/docs/Tools/Page_Inspector/How_to/View_background_images).
* [Previewing fonts](https://developer.mozilla.org/en-US/docs/Tools/Page_Inspector/How_to/View_fonts#font-family_tooltip).
* [Displaying all current animations in the page in a timeline](https://developer.mozilla.org/en-US/docs/Tools/Page_Inspector/How_to/Work_with_animations).
* [Listing the animated elements and pausing, rewinding, slowing down or speeding up the animation on them](https://developer.mozilla.org/en-US/docs/Tools/Page_Inspector/How_to/Work_with_animations).
* Seeing the keyframes and animated properties in animations.
* [Editing cubic-bezier curves for tweaking how animations and transitions progress through time](https://developer.mozilla.org/en-US/docs/Tools/Page_Inspector/How_to/Work_with_animations#Edit_timing_functions).
* [Resizing pages in the responsive design mode, and emulating user agents and touch devices](https://developer.mozilla.org/en-US/docs/Tools/Responsive_Design_Mode).
* Getting help from MDN on any CSS property.
* [Screenshot the viewport, or the full page or a single DOM node](http://meyerweb.com/eric/thoughts/2015/10/22/firefoxs-screenshot-command/).

### What are the next steps?

Well, the above was a mouth full, but as I said before, there’s much to be done before we can truly prototype in the browser. Here are some of the things we have in mind for the future:

* Better color pickers with palettes and color extraction from the page.
* Border, gradient, blend-modes or shadow visual editor.
* Background image, repeat, size, position, clip visual editor.
* Font visual editor for font-family, letter and word spacing, line-height and vertical alignment and text decoration and style.
* Better screenshot tool.
* Visualize and create media-query breakpoints.
* Tweak responsive images’ rules.
* Extract changes or saving to disk.
* Easily resize element’s box-models with the mouse.
* Display elements’ relationships to other things in the page.
* Find font glyphs and enable opentype features.
* Transform and move elements in the page, snap to edges.
* Draw gradients in the page by moving the gradient line and color stops.
* Editors for grids and flexible layouts.
* Create animations from scratch.
* Edit durations and delays and keyframes.

Does this sound exciting? It definitely does to me. Make sure to watch future versions of Firefox DevTools as we try and ship more of these.

I hope this was useful or interesting, thanks for reading!