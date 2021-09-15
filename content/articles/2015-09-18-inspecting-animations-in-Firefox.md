---
layout: main-layout.njk
subtitle: articles
pagetitle: Inspecting animations in Firefox
---

## Inspecting animations in Firefox

<time datetime="2015-09-18">September 18th, 2015</time>

CSS animations and transitions are awesome, but they’re also hard to get right.
You want your animations to be sequenced a certain way, to last the right amount of time, and to progress at the right pace.

That’s where tooling comes in. What if you could slow down, rewind, or pause your animations anywhere, so that you could inspect the animated elements more easily?

That’s what we started to work on a while back in the Firefox DevTools.
In fact, [I already mentioned an earlier version of the animation inspector tool previously](2015-02-12-devtools-for-creative-people) (by the way, this article also mentions some of the other ways you can inspect and edit animations in Firefox DevTools, like editing keyframe rules, or visually changing the cubic-bezier timing function, so go check that out).

I now want to introduce a new version of the tool that’s going to see the light in Firefox 43:

https://www.youtube.com/watch?v=T2jykykN3yc

The main features of this version are:

* all currently animated nodes are displayed automatically, and when new animations are created or removed, that’s reflected too,
* animations are displayed in a timeline user interface which is the obvious choice for representing animations,
* while animations are running, a scrubber is displayed and moves with time, you can also drag and drop the scrubber to any point in time,
* animations are color-coded so you know if they are CSS animations or CSS transitions,
* animation delays and iterations are also displayed in the timeline,
* there’s also a tooltip that provides more details about the animations,
* finally, each animation is displayed along with its target DOM node which you can use to highlight the corresponding element in the page, or select it in the inspector tool.

There’s so much more to do however, this is still an early version of the tool. Don’t hesitate to [file bugs if you see anything weird](https://bugzilla.mozilla.org/enter_bug.cgi?product=Firefox&component=Developer%20Tools%3A%20Inspector).
Here are some of the things we’d like to add:

* the ability to edit or even create animations,
* add the ability to change the playback rate of all animations,
* display and edit the keyframes and timing-function (with the cubic-bezier editor),
* display and edit the animated properties,
* support more animation types ([the Web Animations API](https://w3c.github.io/web-animations/) will soon allow web developers to create animations from script, and the tool should support those too).

If you want to follow the development, or even contribute, [here is the main bug](https://bugzilla.mozilla.org/show_bug.cgi?id=985861).