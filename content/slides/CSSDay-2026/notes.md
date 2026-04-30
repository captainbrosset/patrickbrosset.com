# CSS day talk - Fun with the web

## Help: the important aspects of a good talk

* Storytelling, not just slides:

Use a narrative arc
Personal anecdotes
Humor
(semi-)live demos
Narraitve about the evolution of the web, of the platform.

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

Fancy images was the name of the game. We created very imagery-heavy sites that then had to be sliced up in creative ways to achieve the desired design. Every little header, nav menu, etc. was basically an image.

I mean, at the time, I would buy physical copies of books for inspiration, filled with screenshots of websites.
You can really see how images played and important role.

The point of all this is, we were pretty heavily constrained by the capabilities of the platform at the time.
We didn't have all the tools that we now have.
We just couldn't write in HTML and CSS all sorts of effects, and then reuse them across pages, or customize them depending on the content, or viewport size, user preference, or whatever.
There was no responsive design yet. That came later.

But, we made things happen anyway, with a limited amount of tools.
And these constraints fueled creativity.

What we had at the time, forced us to find clever solutions to those limitations.
We were hacking with tables and sliced images, not because it was elegant, but because we were playing with the only tools we had, and achieving amazing designs on a medium that, originally, wasn't made for this kind of things at all.

It was very playful and creative. Again, constraints tend to fuel creativity.

But, also, all of this playing and attempting to do things that weren't possible, was how we pushed the platform forward.
And that's still how things work today.

### Nostalgic much?

So, am I just being nostalgic?
No. Well, maybe a little bit. But really, I love the web of today just as much as the web of the past.
And I wouldn't go back and leave what we have now for anything.

Today, for a fancy box, we have border-radius, border-image, corner-shape, clip-path, and even border-shape soon.

**Visual: The playground got bigger**

The playground got BIGGER, not smaller.
So we should continue to play. Let's play more, and have fun with the web.

A bigger playground doesn't mean the playground is done. In fact, it can never be done. If it's done, it's dead.

### Let's have fun

So let's have fun for a little bit!

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
  The ball and paddles are all grid items, and moving just updates their grid positions.

- Popup hell with anchro positioning
  https://patrickbrosset.com/articles/2026-01-06-fun-with-the-web/
  Hundreds of elements anchored to each other.
  Led to bug in Firefox: https://bugzilla.mozilla.org/show_bug.cgi?id=2008698 security bug.

- Art with gap decorations
  https://patrickbrosset.com/lab/gap-decoration-art/
  These are all gap decorations of multiple grids positioned in a circular shape.
  Great way to learn about how to use the feature, and create something nice in the process.

Now I'm only just scratching the surface here,
some people, including Lyra here today, have been going way deeper into abusing CSS for fun and art,
and pushing the limits.

### Why all this?

Hm, because computers are fun?
That alone is enough for me to keep on doing this.

But, taking my browser vendor hat for a minute, this is how the web evolves.
I hinted to this earlier.

If we stop playing, we stop pushing the platform forward, which is bad for everybody.

For the web to be capable and interoperable, we all together, as a community, need to be constantly filling the pipe with new features, so that they can then become standardized and then become interoperable based on actual usage and real feedback.

If all we do is copy/paste from existing tutorials, or use frameworks that abstract away the platform, or use AI to do it all for us based on potentially outdated training data, we stop caring about the capabilities of the platform, we stop learning, we stop showing that there's a need for new features.

We must keep playing with the web, explore its edges, and even go beyond them.

These demos are just the surface.
The web platform improves through real usage and feedback.
Early adoption of features = real-world testing = better standards = more interoperable web.

Any platform that stagnates is a dead platform. So, we must constantly fight for relevance.

And a key part of this is developer engagement, early feedback, use cases, partners, community, all taking part in this giant playfield of the web.

So let's keep pushing.

Take XHR and Fetch as an example:

XMLHTTP was originally an IE5 ActiveX experiment, in 2000, from the Outlook team.
`var req = new ActiveXObject("Microsoft.XMLHTTP");`
Was used in weird ways, together with other APIs, making it possible to build GMail, and other Web2.0 apps.
And that gave us AJAX.
Coined by Jesse James Garrett in an article titled "AJAX: A New Approach to Web Applications".
https://designftw.mit.edu/lectures/apis/ajax_adaptive_path.pdf
It was later reverse‑engineered and implemented by other browsers.
Implemented in Mozilla 1.0 (and Netscape 7), and Safari 1.2.
And it eventually standardized later as XMLHttpRequest.
Ajax was one of the most important revolutions in web development, ever.
Much later, it informed fetch().
Now we just have that primitive of the platform, that we couldn't do without, really.

Story shows how an experiment in one browser led to a new use case, which then led to a standard, and then to a better standard.

The web doesn’t improve because we write specs, and sometimes agree on them.
That's not how things work.
the web improves because developers try new things, experiment, and complain loudly enough.
Then, later, specs happen.

The web platform is also not a finished product.
It’s a playground that's under active construction at all times.
It can feel overwhelming, and even tiring, but that's how we keep it alive and relevant.

The wind tunnel analogy:
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

### Fun with Masonry

On that note, there's one feature I'm personally very excited about,
which is at an early point in its development:
grid-lanes, aka CSS Masonry.

Let's take grid-lanes to the wind tunnel for a bit, shall we?

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

### Serious Masonry

Ok, let's disect this new layout primitive, see how it works, and how you might use it in practice.
I wasn't invited here just to do cool shit with CSS.

#### High-level overview

1. There's a new name: grid-lanes, get used to it!
2. It's not a special grid.
3. Grid-lanes is 1D, like flexbox, and unlike grid. You don't get to control the other direction.
4. Grid-lanes isn't only vertical (or waterfall as some people call it). It can be horizontal too.
5. Grid-lanes isn't restricted to same-size lanes only. Lanes can be of any size. In fact, you can also use the `repeat()` syntax to define them.
6. By default, you don't get to control the placement of items. They're placed according to the grid-lanes algorithm.
7. This algorithm is opportunistic.
8. But, if you need, you can control the lanes where items get placed.
9. Items can span multiple lanes.
10. Visual order is not DOM order. Items that appear later in the DOM may appear visually above earlier items.
11. Keyboard tabbing order follows DOM order, not visual order. Keep in mind.

#### Naming

Masonry is the way most people have been referring to this way of laying out items, and it's still the most common name for it.
Masonry is actually also the name of a JS library you can use in browsers today, and which has been very popular for a long time.
Also, when the very first attempt at implementing this layout natively in browsers was prototyped by Mozilla, it was based off of CSS Grid, and used the "masonry" keyword value.

However, in the latest version of the spec, the term masonry only appears in prose, not in code or syntax.

The new name, which is also a new display value, is grid-lanes.

`display: grid-lanes`

The other naming thing to get comfortable with is "lanes". We're talking about swim lanes here, or driving lanes, whatever metapho works for you.
The reason we do this, over say columns and rows like in grid, is that grid-lanes can be used in both directions, but you only get to control one direction. Grid-lanes is 1D.

--- also add something about graceful degradation 
display: grid;
display: grid-lanes; /* ignored by UAs without support */
also @supports.

#### Shape and orientation

Now let's talk about the shape of 
First, the shape of your layout is super important because that's what you (or your designer) want to achieve visually.
file:///C:/Users/pabrosse/dev/patrickbrosset.com/content/slides/CSSDay-2026/grid-lanes-shape-step-by-step.html

In grid-lanes, you reuse some of the same properties as in grid.
So, first things first, set display:grid;. This won't do anything by default, other than let you use the gap property if you want to space items out.

Then, to set the orientation for your lanes, you can set either grid-template-columns, for columns (or waterfall) or grid-template-rows for rows (or brick wall). The browser does the right thing for you automatically, just based on which of these properties is set.
file:///C:/Users/pabrosse/dev/patrickbrosset.com/content/slides/CSSDay-2026/toggle-direction.html

It's important to realize that masonry is 1D, unlike grid.
In grid, you specify both axes at the same time, and get to position items in both dimensions.
In masonry, you only define lanes along 1 dimension, and items get placed within them automatically. For example, in a column direction masonry layout, you don't get to control the row placement of your items.

But you do have control over the shape and number of your lanes.
You can reuse the full power of the grid track sizing syntax, even using the repeat function and auto-fill/fit...
file:///C:/Users/pabrosse/dev/Demos/css-masonry/nature.html

One other thing we can do to control the shape of our layout, is customize which lanes items get placed in, and how many lanes they span.
Again, only along the lane axis, not the other axis.
grid-column and grid-row can be used just like in grid, albeit only along the axis of the lanes.
For example, you can make items span multiple lanes.
Or position items onto specific lanes.
https://microsoftedge.github.io/Demos/css-masonry/new-york.html
file:///C:/Users/pabrosse/dev/patrickbrosset.com/content/slides/CSSDay-2026/auto-gantt.html (order still determines the succession of tasks, and spanning tasks move things out (no dense packing by filling past slots)). Play with removing and change tasks to see layout in action.


But that's not all you can do.
Although this is still in flux on the CSS Working Group, there are discussions for allowing you to set the starting point of the layout.
This is very similar to how flexbox works:
In flexbox, which is also 1D, you decide the shape (row or column), and you also get to decide where along that shape the first item gets placed: row-reverse, column-reverse.

In Masonry, at least in the current chromium implementation, you can reverse things:
- grid-lanes-direction: column track-reverse -> start filling from the right-most lane.
- grid-lanes-direction: column fill-reverse -> start filling from the bottom of the lanes, and then go up.
These are still in discussions. In fact, we don't know yet if grid-lanes-direction will end up existing at all.
**Visual needed here, not real-world example (that's later), demo like the other ones**

----- also add something about the repeat(auto-fill, auto), which only exists in masonry, and helps make things simple -----
Level 3 relaxes the <auto-repeat> syntax to allow intrinsic sizes (like auto) inside repeat(auto-fill, ...). This wasn't possible before. auto-fit collapses empty tracks using a heuristic based on explicit placements and total auto-placed item spans.

#### Flow

Now let's talk about the flow of items in grid lanes.
Beyond the general shape of the thing you are building, it's very important to consider the order in which items are placed.
Because the same general shape can be created with different layouts, and it ultimately all depends on how you want your items to flow through these layouts.

Let's compare flexbox, multicolumn, and masonry to understand this better.
file:///C:/Users/pabrosse/dev/patrickbrosset.com/content/slides/CSSDay-2026/flex-multicol-masonry-flow.html
Small difference between flexbox and multicol related to fragmentation, but otherwise same thing, you get columns with items flowing down each column one by one.
Comparing the grid-lanes, we see a big difference in the order of elements.

Masonry is opportunistic. It doesn't like to leave gaps. It'll try to fill the shortest lane first. And this is what gives us this criss-cross pattern.

In fact, you can see this in action when switching between grid and grid-lanes and leaving all other props unchanged. Grid gets you a ... well grid. Which can sometimes lead to gaps when items don't all have the same size. With grid-lanes, these gaps get filled. 
But it's also very different in the sense that grid-lanes doesn't start from grid and then squishing everything closer together. It fills lanes one by one, always making a decision as to which one is next.
file:///C:/Users/pabrosse/dev/patrickbrosset.com/content/slides/CSSDay-2026/grid-without-gap-flow-diff-with-masonry.html

The algorithm runs step by step, making the decision of which lane to pick for each one.
layout is genuinely algorithmic.
file:///C:/Users/pabrosse/dev/patrickbrosset.com/content/slides/CSSDay-2026/flow-tolerance.html

#### Tolerance

Masonry is trying to solve two conflicting goals at once:
* Preserve DOM flow order
* Produce visually balanced packing

Those are not compatible if you always, stricktly, do the mathematically best placement.

Assuming you'd strictly follow the algorithm: if your items are roughly the same size, and you basically want to fill your lanes one after the other, you may run into situations where lanes get filled kind of unpredictably, causing visual jitter.

That's where flow tolerance comes in.

At tolerance 0: the next item is always placed in the shortest lane.

But there could be a tie.
If there's a tie, then the lane that's after the one that was last filled is picked.

Tolerance 0 is _not_ the default value however.
That's because it can lead to more visual jitter than necessary. Sometimes, when lanes are of roughly similar sizes, it just makes more sense to just pick them in order, filling them one after the other.
That's why the spec defines a 1em default tolerance, which is a good default to start with.

You can set the tolerance to whatever you want.
Including a special value of "infinite".
At tolerance infinite: all tracks are always tied, so the algorithm always fills them one after the other.
This can be helpful if you want to strictly follow lane order, even if it leads to imbalanced lanes.

Tolerance can help improve the perceived reading order. Because grid-lanes visually re-orders items, flow-tolerance can help keep visually adjacent items closer in placement order, which can reduce sudden vertical jumps between siblings.

--- If possible, in new h4 section: Talk about fragmentation and subgrid (check with Alison what's ready to be used). Highlight things Apple doesn't have, even if they shipped first. ---

### Real-world examples

- Kevin Powell's quotes (shape looks the same in multi-col vs. grid-lanes, but order is different, might be better if you want most recent testimonials at the top. Also more natural for users to read in this order, so DOM order should match).
file:///C:/Users/pabrosse/dev/patrickbrosset.com/content/slides/CSSDay-2026/kevin-powell-testimonials.html

- Lazy loading gallery
file:///C:/Users/pabrosse/dev/patrickbrosset.com/content/slides/CSSDay-2026/lazy-gallery.html

- Infinite gallery
file:///C:/Users/pabrosse/dev/patrickbrosset.com/content/slides/CSSDay-2026/infinite-loading.html
Replace with images maybe.

- Blog
https://microsoftedge.github.io/Demos/css-masonry/blog.html

- News site
https://microsoftedge.github.io/Demos/css-masonry/blog.html

- Kanban board
https://microsoftedge.github.io/Demos/css-masonry/kanban.html

- Creative photo galleries
http://localhost:8080/slides/CSSDay-2026/reverse-gallery
file:///C:/Users/pabrosse/dev/patrickbrosset.com/content/slides/CSSDay-2026/two-dir-gallery.html

- Museum artwork collection search:
file:///C:/Users/pabrosse/dev/patrickbrosset.com/content/slides/CSSDay-2026/artwork-search.html

- testimonials
file:///C:/Users/pabrosse/dev/patrickbrosset.com/content/slides/CSSDay-2026/kevin-powell-testimonials.html

- bar chart
file:///C:/Users/pabrosse/dev/patrickbrosset.com/content/slides/CSSDay-2026/masonry-bar-chart.html

### Closing

Inside, I'm still that same 16 year old kid in his coyote's pajamas, playing with the web. And I'm sure many of you are too.

Playing with the web isn't just fun, it's essential for the platform's survival.

So, go play with CSS grid-lanes, and tell us what you think.
