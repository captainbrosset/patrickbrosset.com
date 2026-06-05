# CSS day talk - Fun with the web

## Help: the important aspects of a good talk

* Storytelling, not just slides:

Use a narrative arc
Personal anecdotes
Humor
(semi-)live demos
Narrative about the evolution of the web, of the platform.

* Overarching:

**big, opinionated idea**
have a thesis — a strong, memorable stance
something provocative
challenging assumptions
a meta-level critique
Fix a misunderstanding. CSS is not just for ***
a call to rethink our mental models
--> A strong thesis gives the audience something to latch onto, argue with, or evangelize.

* Go deep:

Deep expertise, not surface-level tips.
Audience love talks where the speaker is **the** person you'd want to hear on that topic.
But, keep things simple too. Be approachable/accessible.

* Show:

Don't just show code, show the problem, how browsers think, show solutions,  etc.
Help developers level up.

*Explore the edges:

Not a tutorial, but rather a shift in perspective
How to think about these features
How to embrace complexity
How to use new features.

## Short description

The early web was a playground. We hacked table layouts, sliced images, and spent hours on rounded corners. The tools were limited, but we made things anyway, and constraints fueled our creativity.

That spirit still matters. CSS has grown into something really powerful, and one of the features I'm most excited about is grid-lanes, aka CSS masonry. In this talk, we'll go deep into grid-lanes: how it works, how it differs from grid, what it can and can't do, and how to use it in practice. We'll also go through a series of creative demos that push grid-lanes and other modern CSS feature in ways they probably weren't designed for. Bot only because it's fun, but because that's how we best learn and that's how we push against constraints that make the platform better for everyone.

## Talk content

**Fun with grid lanes**

Or, really, fun with the web.

### 30 years ago

**Visual: Photo in front of computer Netscape**

Here is me at 16 years old, exactly 30 years ago, discovering the Internet.
I was an absolute fan boy of the web in 1996.
A few things you can see here.
First, I'm rocking my coyote's pijamas.
But also, I'm surfing the web and, if you zoom in, you can see the nice Netscape logo.
And! if you zoom in over here, you can see a book about Netscape.
See, at the time, the web was still early and not as ubiquitous as today, and we needed books to learn how to use it.
So, big fan of the web from the very early days, jumping online as soon as the phone line was free.

But I also wanted to be a part of it.
At that point, I had never done any programming.
I had no idea what it meant to create a webpage, let alone program an entire app.

So, my path to it was a very visual one. I wanted to draw things, make things move and look cool.
And that meant that my tools were things like Photoshop, having fun creating weird images, and then fiding ways to make them appear on the web.
Mostly by exporting sliced up images to create pixel perfect web pages.

Displaying images on the web was, at the time, one of the most exciting things you could do.
What else could you do?

### Rapid fire demos of the ancient web

So, what was it like to be working on the web in the early 2000s?
What was fun with the web back then?

Let's go on a quick tour...

Border images and rounded corners did not exist, but that doesn't mean we couldn't have them.
**Visual: 9-slice divs for rounded corners and fancy borders**
In fact, around 2006, I was part of a team that developed a company UI framework, components like datepickers, complex multi selects etc. It was the days of DHTML, But we also used to have a `<div>` component, just because this way it could do rounded corners.

Framesets
**Visual**

Image maps
**Visual**

web-safe color palette
**Visual**

Table layouts with spacer gifs
**Visual**

Marquee / blink tags.
**Visual**

Rollover buttons, which I did with Dreamweaver's built-in feature, because I didn't know how to do it in code myself.
https://www.youtube.com/watch?v=Y-m8m1hjeBM

And sites looked something like this.
my-90s-site.html
thick bevels, no responsiveness, lots of images, gifs, etc.

Fancy images was the name of the game. We created very imagery-heavy sites that then had to be sliced up in creative ways to achieve the desired design. Every little header, nav menu, etc. was basically an image.

I mean, at the time, I would buy physical copies of books for inspiration, filled with screenshots of websites.
You can really see how images played and important role.

The point of all this is, we were pretty heavily constrained by the capabilities of the platform at the time.
We didn't have all the tools that we now have.
We just couldn't write in HTML and CSS all sorts of effects, and then reuse them across pages, or customize them depending on the content, or viewport size, user preference, or whatever.
There was no responsive design yet. That came later.

But, we made things happen anyway, with a limited amount of tools.
And these constraints kind of fueled our creativity.

What we had at the time, forced us to find clever solutions to those limitations.
We were hacking with tables and sliced images, not because it was elegant, but because we were playing with the only tools we had, and we wanted to achieve amazing designs on a medium that, originally, wasn't made for this kind of things at all.

All this playing and attempting to do things that weren't possible, was how we pushed the platform forward.
And that's still how things work today.

### Nostalgic much?

So, am I just being nostalgic?
No. Well, maybe a little bit. But really, I love the web of today just as much as the web of the past.
And I wouldn't go back and leave what we have now for anything.

Today, for a fancy box, we have border-radius, border-image, corner-shape, clip-path, and even border-shape very soon.

**Visual: The playground got bigger**

The playground got BIGGER, not smaller.
And, we should continue to play.
We should continue to have fun with the web, and push the limits of what's possible.

### Let's have fun

My job at Microsoft very often involves being the very first real tester for new features.
I do DevRel, which means engineers and PMs come to me with early prototypes, and get to test them early.
I'm very fortunate because that means having fun with new things, and learning about them, is literally part of my job.

**Combining primitives**

Why write things in JS when the platform's got your back!
Using the built-in primitives, and combining them together, for better accessibility, performance, or just for fun!
By the way, having fun is the best way to learn!

- Solar system with anchor positioning
  https://patrickbrosset.com/lab/anchor-system/
  Here, offset-path, to animate the planets around their orbits, and anchor positioning to keep the labels next to the planets.

- Whack a mole game with `<dialog>`
  https://patrickbrosset.com/articles/2026-01-06-fun-with-the-web/
  Here, using the `<dialog>` element to show the moles in their little holes, with dialog.show().
  but then closing them with the command/commandfor attributes. Dialogs contain a single button which triggers the close.

- Flying maths with MathML
  https://patrickbrosset.com/articles/2026-01-06-fun-with-the-web/
  Combining mathml with CSS 3D transform animations, to make math fly around the screen.
  A fun way to learn about the mathml language.
  Just because we can.

**Testing new features**

Playing with new features in early implementations is a great way to learn about them, but also to give feedback to the teams building them, and to push the platform forward by showing new use cases and edge cases.

- Card deck and folder picker with customizable selects
  https://css-tricks.com/abusing-customizable-selects/
  Test making the picker part very different from what it usually is in a select, having fun with the positioning of the dropdown
  Learning about anchor positioning in the process, and fiding limitations.

- Pacman with focusgroup
  https://patrickbrosset.com/lab/focusgroup-pacman/
  Using focusgroup, amazing upcoming accessibility feature which will make it a lot easier to implement keyboard nav on composite widgets. It gives you arrow-key navigation for free if you follow the right accessibility guidelines patterns.
  Here, testing the table pattern, which is very experimental, to implement a pacman game with 0 JS code.
  Pacman moves with the focusgroup feature.
  Dots get eaten thanks to a filling forward paused CSS animation hack.
  By default, dot is visible, animated, but paused. Then, on focus, animation runs and fills forward, making it stay in its end state = no dot.
  Just a tiny bit of JS code to avoid walls: if next cell is not focusable, don't move the pacman there.
  But, https://patrickbrosset.com/lab/focusgroup-pacman/?no-clipping
  Was very useful to learn about focusgroup, and to give feedback to my colleage on the team who's implementing the feature in Chromium.

**Cranking things up to 11**

Pushing the platform to its limits, and sometimes beyond, to find new use cases, and edge cases that make the implementation better.

- Ponggrid
  https://patrickbrosset.com/articles/2026-01-06-fun-with-the-web/
  Making a game rendering engine out of CSS grid only.
  (TODO: talk about cssdoom here. If it comes after my talk, just hint at it.)
  The ball and paddles are all grid items, and moving just updates their grid positions.

- Popup hell with anchor positioning
  https://patrickbrosset.com/articles/2026-01-06-fun-with-the-web/
  Hundreds of elements anchored to each other.
  Led to bug in Firefox: https://bugzilla.mozilla.org/show_bug.cgi?id=2008698 security bug.

- Art with gap decorations
  https://patrickbrosset.com/lab/gap-decoration-art/
  These are all gap decorations of multiple grids positioned in a circular shape.
  Great way to learn about how to use the feature, and create something nice in the process.

Now I'm only just scratching the surface here,
some people, including Lyra here today, have been going way deeper into abusing CSS for fun and art, and pushing the limits.

### Why all this?

Hm, because computers are fun?
That alone is enough for me to keep on doing this.

But, taking my browser vendor hat for a minute, this is how the web evolves.
I hinted to this earlier.

If we stop playing, we stop pushing the platform forward, which is bad for everybody.

For the web to be capable and interoperable, we all together, as a community, need to be constantly filling the pipe with new features, so that they can then become standardized and then become interoperable based on actual usage and real feedback.

If all we do is copy/paste from existing tutorials, or use frameworks that abstract away the platform, or use AI to do it all for us based on potentially outdated training data, we stop caring about the capabilities of the platform, we stop learning, we stop showing that there's a need for new features.

We must keep playing with the web, explore its edges, and even go beyond them.

I'd go as far as saying that a platform that stagnates is a dead platform. So, we must constantly fight for relevance.

And a key part of this is developer engagement, people using features for real, or just playing with them, generating early feedback, use cases, and all taking part in this giant playfield of the web.

Just before we move on to the actual content of this talk, because this has been a long-winded intro, let me make the point again, but taking an example: XHR and Fetch.

XMLHTTP was originally an IE5 ActiveX experiment, in 2000, from the Outlook team.
`var request = new ActiveXObject("Microsoft.XMLHTTP");`

Was used in weird ways, together with other APIs, making it possible to build GMail, and other Web2.0 apps.
And that gave us the AJAX era, when everybody became obsessed with re-creating everything in JS.

XMLHTTP was later reverse‑engineered and implemented by other browsers.
Implemented in Mozilla 1.0 (and Netscape 7), and Safari 1.2.

And it eventually standardized later as XMLHttpRequest.

Much, much later, it informed fetch().
Now we just have that primitive of the platform, that we couldn't do without, really.

Story goes to show that this obscure thing the outlook team needed, then got used in a new way by other devs, leading to new use cases,
which then led to a standard (XHR),
and then to a better standard (Fetch).

It also shows something which people don't always think about:
The web doesn’t improves by writing specs in a vacuum, and sometimes agree on them.
the web improves because developers try new things, experiment, and complain loudly enough, ship experiments, etc.
Then, later (usually much later), specs happen.

It's a bit like a wind tunnel to test planes.
Engineers don’t standardize airplane designs before testing them.
They build experimental prototypes.
They shake them in wind tunnels.
They discover turbulences.
They learn where things break in the real world.
Then they write the rules for safe flight.

If nobody is experimenting:

New features don’t get real usage patterns.
edge‑cases don’t get discovered.
ergonomics problems stay theoretical.
interop issues never surface early.

### Masonry

Now let's switch gears.
And talk about another feature which appeared a long time ago on websites.
then got prototyped in browsers.
And only now is getting standardized and implemented.

Masonry, aka grid-lanes.

### Fun with Masonry

So, to start, let's take grid-lanes to the wind tunnel for a bit, shall we?
I'm sure you've all seen the pinterest-style masonry layout.
What I'll show now is going to look nothing like that, but it's still masonry:

- file:///C:/Users/pabrosse/dev/patrickbrosset.com/content/slides/CSSDay-2026/gravity-balls.html
  Filling masonry in reverse, assigning specific lanes to each ball, and combining with view transitions.

- file:///C:/Users/pabrosse/dev/patrickbrosset.com/content/slides/CSSDay-2026/hello-fresh.html
  Combining 2 masonry layouts, one at the top going down, one at the bottom, going up. And animating items a little bit.

- file:///C:/Users/pabrosse/dev/patrickbrosset.com/content/slides/CSSDay-2026/masonry-lego.html
  Making a dense masonry layout with items spanning multiple lanes, and using 3D for fun.

- file:///C:/Users/pabrosse/dev/patrickbrosset.com/content/slides/CSSDay-2026/motorway.html
  Make this one nicer, nicer vehicles, better styles, maybe animation, etc. Something fun in between.

- file:///C:/Users/pabrosse/dev/patrickbrosset.com/content/slides/CSSDay-2026/masonry-wtf.html
  Shapes, dense packing.

- file:///C:/Users/pabrosse/dev/patrickbrosset.com/content/slides/CSSDay-2026/many.html
  Weird little animation.
  Made me think about the opportunistic nature of the grid-lanes algorithm, which we'll talk about in a bit, which could be used to create a liquid surface effect.

- file:///C:/Users/pabrosse/dev/patrickbrosset.com/content/slides/CSSDay-2026/water.html
  Ctrl+/- to fill the glass
  Or resize browser window to make the glass smaller, and water bigger.
  opportunistic/chaotic nature of the algorithm.

- file:///C:/Users/pabrosse/dev/patrickbrosset.com/content/slides/CSSDay-2026/steps.html
  Resize screen or change font.
  Stacked stairs, creating abstract patterns.

### Serious Masonry

Ok, let's disect this new layout primitive, see how it works, and how you might use it in practice.
I wasn't invited here just to do cool shit with CSS.

#### High-level overview

1. There's a new name: grid-lanes, get used to it!
2. It's not a special grid. It does share some things with CSS grid, but it's fundamentally different.
3. Grid-lanes is 1D, like flexbox, and unlike grid. You don't get to control the other direction.
4. Grid-lanes isn't only vertical (or waterfall as some people call it). It can be horizontal too. And also reversed.
5. Grid-lanes isn't restricted to same-size lanes only. Lanes can be of any size. In fact, you can also use the `repeat()` syntax to define them.
6. By default, you don't get to control the placement of items. They're placed according to the grid-lanes algorithm.
7. This algorithm is opportunistic, and sometimes can seem chaotic.
8. But, if you need, you can still assign an item to a specific lane.
9. Items can span multiple lanes.
10. Visual order is not DOM order. Items that appear later in the DOM may appear visually above earlier items.
11. Keyboard tabbing order follows DOM order, not visual order. Keep that in mind.

#### Naming

Masonry is the way most people have been referring to this way of laying out items, and it's still the most common name for it.
Masonry is actually also the name of a JS library you can use in browsers today, and which has been very popular for a long time.
Also, when the very first attempt at implementing this layout natively in browsers was prototyped by Mozilla, almost 10 years ago now, it was based off of CSS Grid, and used the "masonry" keyword value.

```css
layout {
  display: grid;
  grid-template-columns: masonry;
}
```

However, in the latest version of the spec, the term masonry only appears in prose, not in code or syntax.

The new name, which is also a new display value, is grid-lanes.

`display: grid-lanes`

The other naming thing to get comfortable with is "lanes". We're talking about swim lanes here, or driving lanes, whatever metaphor works for you.
The reason we do this, over say columns and rows like in grid, is that grid-lanes can be used in both directions, but you only get to control one direction. Grid-lanes is 1D.

#### Progressive enhancement

Grid and grid-lanes, for common use cases, can result in similar shapes.
Grid lanes is better at occupying space, but if you want to use it today, you can still do it by first declaring a grid, and overriding this with grid-lanes, which will be ignored by browsers that don't yet support this display type:

```css
layout {
  display: grid;
  display: grid-lanes; /* ignored by UAs without support */
}
```

TODO: show grid-grid-lanes-animation.mp4, in a loop.

The `@supports` rule also works just fine for grid-lanes:

```css
@supports (display: grid-lanes) {
  layout {
    display: grid-lanes;
  }
}
```

#### Shape and orientation

Now let's talk about the shape of grid-lanes.
The shape of your layout is super important because that's what you (or your designer) want to achieve visually.

TODO: walk step by step through this while going over the next few paragraphs.
file:///C:/Users/pabrosse/dev/patrickbrosset.com/content/slides/CSSDay-2026/grid-lanes-shape-step-by-step.html

In grid-lanes, you reuse some of the same properties as in grid.
So, first things first, set display:grid-lanes;
This won't do anything by default, other than let you use the gap property if you want to space items out.

Then, to set the orientation for your lanes, you can set either grid-template-columns, for columns (or waterfall) or grid-template-rows for rows (or brick wall). The browser does the right thing for you automatically, just based on which of these properties is set.

Again, masonry is 1D, unlike grid.
In grid, you specify both axes at the same time, and get to position items along both of these dimensions if you want.
In masonry, you only define lanes along 1 dimension, and items get placed within them automatically.
For example, in a column direction masonry layout, you don't get to control the row placement of your items.

But you do have control over the shape and number of your lanes.
grid-template-columns: 2fr 1fr 3fr 1fr for example.
You can reuse the full power of the grid track sizing syntax, even using the repeat function and auto-fill/fit...

One other thing we can do to control the shape of our layout, is customize which lanes items get placed in, and how many lanes they span.
Again, only along the lane axis, not the other axis.
grid-column and grid-row can be used just like in grid, albeit only along the axis of the lanes.
For example, you can make items span multiple lanes.
Or position items onto specific lanes.

A few examples showing what we just talked about:
- Switching the direction: file:///C:/Users/pabrosse/dev/patrickbrosset.com/content/slides/CSSDay-2026/toggle-direction.html
- Multiple sizing options: file:///C:/Users/pabrosse/dev/Demos/css-masonry/nature.html
- Assign specific lanes and span: https://microsoftedge.github.io/Demos/css-masonry/new-york.html

But that's not all you can do.
Although this is still in flux on the CSS Working Group, there are discussions for allowing you to set the starting point of the layout.
This is very similar to how flexbox works:
In flexbox, you decide the shape (row or column), and you also get to decide where along that shape the first item gets placed: row or row-reverse, column or column-reverse.

See: file:///C:/Users/pabrosse/dev/patrickbrosset.com/content/slides/CSSDay-2026/flexbox-direction-diagrams.html

In Masonry, at least in the current implementation in chromium, and again this is in discussions in the CSSWG, you can reverse also things:

- grid-lanes-direction: column track-reverse -> start filling from the right-most lane.
- grid-lanes-direction: column fill-reverse -> start filling from the bottom of the lanes, and then go up.

See: file:///C:/Users/pabrosse/dev/patrickbrosset.com/content/slides/CSSDay-2026/grid-lanes-direction-diagrams.html

#### Intrinsic lanes

I said before that you can use the full power of the grid track sizing syntax to define your lanes.

So things like this are all possible:

`1fr 1fr`
`repeat(3, 1fr)`
`100px 200px auto 1fr`
`10px 1fr 10px auto`
`repeat(auto-fill, minmax(100px, 1fr))`

And so on...

But, there's one more thing you can now do with grid-lanes only, which makes it even simpler to create your lanes:

`repeat(auto-fill, auto)`

Grid-lanes spec relaxes the `<auto-repeat>` syntax to allow intrinsic sizes (such as `auto`) inside `repeat(auto-fill, ...)`.
This wasn't possible before.

**TODO: need explaination from Alison on why. Also needs an example.**

#### Flow

Now let's talk about the flow of items in grid lanes.

Beyond the general shape of the thing you are building, it's very important to consider the order in which items are placed.
Because the same general shape can be created with different layouts, and it ultimately it all depends on how you want your items to flow through the shape.

Let's compare flexbox, multicolumn, and masonry to understand this better.
If I wanted this shape, I could create it with all three of these layout types.

file:///C:/Users/pabrosse/dev/patrickbrosset.com/content/slides/CSSDay-2026/flex-multicol-masonry-same-general-shape.html

Same general shapes, but if you look closely, you'll notice the order is kind of different.

In fact, let's now compare them by using the same items.

file:///C:/Users/pabrosse/dev/patrickbrosset.com/content/slides/CSSDay-2026/flex-multicol-masonry-flow.html

Small difference between flexbox and multicol related to fragmentation, but otherwise same thing, you get columns with items flowing down each column one by one.
Comparing the grid-lanes, we see a big difference in the order of elements.

Masonry is opportunistic. It doesn't like to leave gaps. It'll try to fill the shortest lane first. And this is what gives us this criss-cross pattern.

So, similar shapes, very different flow.

Let's also compare with grid.
Grid gets you ... well, a grid. Which can sometimes lead to gaps when items don't all have the same size. Because items have to be aligned across both axes at the same time.

file:///C:/Users/pabrosse/dev/patrickbrosset.com/content/slides/CSSDay-2026/grid-without-gap-flow-diff-with-masonry.html

Let's take a look at what a grid without those gaps would look like:

TODO: click grid without gaps.

It's easy to think that this is what grid-lanes is. But be very careful. The placement algorithm is very different in grid-lanes.
Grid-lanes doesn't start from grid and then squishing everything closer together.
It fills lanes one by one, always making a decision as to which one is next.

The algorithm runs step by step, making the decision of which lane to pick for each one.
layout is genuinely algorithmic.

TODO: click to compare with grid-lanes now.
And then show the flow to illustrate that items are placed opportunistically, even if that breaks the 1,2,3 - 1,2,3 order of the grid.

Show file:///C:/Users/pabrosse/dev/patrickbrosset.com/content/slides/CSSDay-2026/flow-tolerance.html
 (without the flow debugging)
 Fill first 4 columns, 1 by 1. Obvious because this is a LTR page, filling the next column, which is empty.
 Once all 4 are filled, we have 2 columns at the same height. Which one will be filled?
 The first one, because we've reached the end, so we start again from the left, again because this is LTR.

#### Tolerance

This brings us to flow-tolerance.
Why do we have this somewhat chaotic way of placing items?

Masonry is trying to solve two conflicting goals at once:
1. Produce a result that's visually balanced. Where no one lane is much longer than the others, and where we don't have big gaps.
2. Preserve the DOM order as much as possible.

Those are not compatible if you always, stricktly, do the mathematically best placement.

Assuming you'd strictly follow the algorithm: if your items are roughly the same size, and you basically want to fill your lanes one after the other, you may run into situations where lanes get filled kind of unpredictably, causing visual jitter.

That's where flow tolerance comes in.

file:///C:/Users/pabrosse/dev/patrickbrosset.com/content/slides/CSSDay-2026/flow-tolerance.html

At tolerance 0: the next item is always placed in the shortest lane.

But there could be a tie.
If there's a tie, then the lane that's after the one that was last filled is picked.

Tolerance 0 is _not_ the default value however.
That's because it can lead to more visual jitter than necessary. Sometimes, when lanes are of roughly similar sizes, it just makes more sense to just pick them in order, filling them one after the other.
That's why the spec defines a 1em default tolerance, which is a good default to start with.

You can set the tolerance to whatever you want.

TODO: demo with 35px tolerance to show that we don't always respect the shortest lane, thanks to this buffer.

Including a special value of "infinite".
At tolerance infinite: all tracks are always tied, so the algorithm always fills them one after the other.
This can be helpful if you want to strictly follow lane order, even if it leads to imbalanced lanes.

Tolerance can help improve the perceived reading order. Because grid-lanes visually re-orders items, flow-tolerance can help keep visually adjacent items closer in placement order, which can reduce sudden vertical jumps between siblings.

### Real-world examples

- Kevin Powell's testimonials for one of his online course. Which is great btw.
file:///C:/Users/pabrosse/dev/patrickbrosset.com/content/slides/CSSDay-2026/kevin-powell-testimonials.html
  Kevin implemented this wil multi-column. Which is great, and perfectly valid.
  And, for a use case like this where the order of these testimonials doesn't really matter, there's no right answer.
  Grid-lanes can do achieve this very easily too, and the order's different. If you're reading this page, you might visually scan this from left to right and then top to bottom, which masonry would give you by default.
  This might be nice if your testimonials come from a DB and you're fetching the most recent ones for example.

- Lazy loading gallery
file:///C:/Users/pabrosse/dev/patrickbrosset.com/content/slides/CSSDay-2026/lazy-gallery.html
  Masonry works well with lazy loading because ...
  TODO`

- Infinite content
file:///C:/Users/pabrosse/dev/patrickbrosset.com/content/slides/CSSDay-2026/infinite-loading.html
  But we can go further than this, and do an infinite loading page, which continues to load content as you scroll down, until you've loaded everything.

- Blog
https://microsoftedge.github.io/Demos/css-masonry/blog.html

- News site
https://microsoftedge.github.io/Demos/css-masonry/news.html

- Creative photo galleries
http://localhost:8080/slides/CSSDay-2026/reverse-gallery
  Fill-reverse stack of photos at the bottom, coming from the bottom up.
file:///C:/Users/pabrosse/dev/patrickbrosset.com/content/slides/CSSDay-2026/two-dir-gallery.html
  Interesting visual layout for photographers, etc.

- Museum artwork collection search:
http://localhost:8080/slides/CSSDay-2026/artwork-search/
  Works great for inspiration-style search results, where the order matters less than the overall visual balance of the page.
  Again, showcasing the infinite loading use case, where things nicely get added to the end without re-layouting anything.

- file:///C:/Users/pabrosse/dev/patrickbrosset.com/content/slides/CSSDay-2026/auto-gantt.html
  Showcasing the row-direction layout here.
  And the ability to assign items to a specific lane.
  Each team's tasks is assigned to the right lane.
  With some tasks spanning all lanes, when they're common.
  The order of the items in the DOM matters here. It determines the succession of the tasks over time, and the common spanning tasks move things out.
  I can resize or remove some tasks so you can see how things re-arrange.
  - Make Dashboard implementation smaller to see how Sprint planning gets stuck after all 3 teams are done.
  - Delete Sprint planning to show how everything moves earlier, in their respective lanes.

- Kanban board
https://microsoftedge.github.io/Demos/css-masonry/kanban.html
  Items belong to specific lanes here too.
  And I can move them between lanes, simply by changing their `grid-column` value.
  You couldn't do this with grid without leaving gaps.
  You could maybe do this with multicol, but you'd have to change the order of items in the DOM, and make sure your container has exactly the right height to contain the right number of items. Or wrap each column in a div, and avoid fragmentation.
  You could do this with a row flexbox layout, but you'd have to move items in the DOM. Which is fine.
  You could also just do this with positioning, or floats.

There's always a number of different ways you can achieve a particular layout in CSS, and that's a good thing. It means you can pick the one that best suits your needs, and that you're most comfortable with.

Depending on how you retrieve content from your backend, depending on how you want users to navigate through them, and obviously depending on the final visual aspect you want to achieve, you might pick one solution over the other.

### Closing

TODO: talk about the fact that all of the demos, and entire deck runs in Edge/Chrome.
Based on latest implementation of grid-lanes in Chromium.
Say which version and flag.
Also talk about Safari shipping, but lacking some key parts (such as?)
Go and play with grid-lanes. Again, progressive enhancement in a lot of cases.
Let me know what you think.
Add links to social media, etc.



Inside, I'm still that same 16 year old kid in his coyote's pajamas, playing with the web. And I'm sure many of you are too.

Playing with the web isn't just fun, it's essential for the platform's survival.

So, go play with CSS grid-lanes, and tell me what you think.
