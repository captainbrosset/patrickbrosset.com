---
layout: article.njk
title: "Using CSS animations as state machines to remember focus and hover states with CSS only"
tags: article
date: 2026-03-09
excerpt: "I discovered this CSS-only trick to store the past <code>:focus</code> or <code>:hover</code> state of any element. Without JavaScript, you can style elements depending on whether they were ever focused or hovered. Here's how it works."
thumbnail: "/assets/animation-state-machine.avif"
altText: "Abstract illustration of a CSS animation in the shape of a series of square that get incresingly rotated. The text reads: CSS animations as state machines."
hasCode: true
---

Recently, I was searching for a way to style an element depending on whether it was ever focused.

I wanted to do this without JavaScript, just with CSS, because I was going to use it in a demo about the new [`focusgroup` web platform feature](https://blogs.windows.com/msedgedev/2026/03/05/making-keyboard-navigation-effortless/). Focusgroup handles a lot of keyboard navigation logic for you, for free, with only an HTML attribute. So adding a bunch of JavaScript code to track past focus states to that demo felt like a step back.

I kept thinking about this problem, but couldn't find a solution. See, storing a click state is easy. You can use a checkbox element and then apply styles based on whether its `:checked` pseudo-class matches. You can also hide the checkbox itself and only show its corresponding `<label>` element if you prefer. Heck, you can even put your checkbox anywhere you want and then use the `:has()` pseudo-class to style other elements based on that checkbox's state.

But, I couldn't find anything similar for tracking if an element had been focused. And then, it hit me: what if I used a CSS animation for this?

## Using CSS animations as state machines

CSS animations are basically state machines. They can change the value of any property over time. The trick is advancing the time to the right point, in order to reach the state you want to remember, and then keep it there.

Fortunately, CSS animations come with two very useful properties:

* `animation-play-state`, which we can use to pause the animation in its initial state.
* `animation-fill-mode: forwards`, which we can use to keep the animation in its end state after it finishes.

Let's use these properties to set up our animation:

```css
.remember-focus {
  animation-name: remember-focus;
  animation-duration: .00001s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
  animation-play-state: paused;
}
```

Or, using the shorthand syntax:

```css
.remember-focus {
  animation: remember-focus .00001s linear forwards paused;
}
```

The `.remember-focus` class sets an animation on the element, keeping it paused for now, but filling forwards so it retains the end state once it runs.

Notice the weirdly short animation duration of `.00001s`. That's because we want the animation to reach its end state immediately after starting. The duration needs to be short enough to be effectively instant to the user.

Whenever we're ready to change the state, all we have to do is play the animation. Let's say we want to do this when the element receives the user focus:

```css
.remember-focus:focus {
  animation-play-state: running;
}
```

Now all we need to do is define the animation itself, via the `@keyframes` rule. Let's use background colors for now, to make things simple:

```css
@keyframes remember-focus {
  from {
    background: red;
  }
  to {
    background: blue;
  }
}
```

And there we have it. By default, the element on which the `.remember-focus` class is applied will have a red background. And then, when it receives focus, the animation will run and immediately change the background color to blue. Because of `animation-fill-mode: forwards`, the element will stay blue even after it loses focus.

The cool thing is that that state of the animation is associated to its element, so even if multiple elements have the `.remember-focus` class, each one will remember its own focus state independently.

## Demos

Here's a live demo of the code we've just seen. Click or tab to focus the box: the color changes. The color stays even if click somewhere else or tab to another element:

<style>
.remember-focus {
  padding: .5rem;
  border: 2px dashed black;
  inline-size: max-content;
  color: white;
  font-weight: bold;
  font-size: 1.1rem;
  animation: remember-focus .00001s linear forwards paused;
}
.remember-focus:focus {
  animation-play-state: running;
}
@keyframes remember-focus {
  from {
    background: red;
  }
  to {
    background: blue;
  }
}
</style>
<div class="remember-focus" tabindex="0">Click or tab to focus me</div>

This technique works with the `:hover` pseudo-class as well. Just change the selector to `.remember-focus:hover` and the animation will run on hover instead of focus.

Here's a demo that uses hover instead of focus, and has multiple elements with the same class. Try hovering over the boxes below to see them change color:

<style>
.hover-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 1px;
  max-block-size: 50vh;
  aspect-ratio: 1;
}
.hover-grid div {
  animation: remember-hover .00001s linear forwards paused;
}
.hover-grid div:hover {
  animation-play-state: running;
}
@keyframes remember-hover {
  from {
    background: red;
  }
  to {
    background: blue;
  }
}
</style>
<div class="hover-grid">
  <div></div><div></div><div></div><div></div><div></div>
  <div></div><div></div><div></div><div></div><div></div>
  <div></div><div></div><div></div><div></div><div></div>
  <div></div><div></div><div></div><div></div><div></div>
  <div></div><div></div><div></div><div></div><div></div>
</div>

## Animating other properties

Of course changing colors is just a simple thing you can do with this. But, CSS animations are capable of changing any property, including custom properties, and even properties that can't be animated.

For example, to display an icon next to an element that was focused, you could use the technique to animate the `content` property of the element's `::after` pseudo, even if `content` is not animatable.

Try it yourself: focus the first box below, and then use tab to navigate to the next boxes. You'll see the icon next to the boxes you've already focused change:

<style>
.checks {
  display: flex;
  flex-wrap: wrap;
  gap: .5rem;
}
.checks .check-on-focus {
  padding: .5rem;
  border: 2px dashed black;
  inline-size: max-content;
  cursor: pointer;
  animation: check-on-focus .00001s linear forwards paused;
}
.checks .check-on-focus:hover {
  background: #eee;
}
.checks .check-on-focus::after {
  content: "🐰";
  margin-inline-start: .25rem;
  animation: check-on-focus .00001s linear forwards paused;
}
.checks .check-on-focus:focus {
  animation-play-state: running;
}
.checks .check-on-focus:focus::after {
  animation-play-state: running;
}
@keyframes check-on-focus {
  to {
    content: "😺";
    background: #c7ff6e;
  }
}
</style>
<div class="checks">
  <div class="check-on-focus" tabindex="0">Box 1</div>
  <div class="check-on-focus" tabindex="0">Box 2</div>
  <div class="check-on-focus" tabindex="0">Box 3</div>
  <div class="check-on-focus" tabindex="0">Box 4</div>
  <div class="check-on-focus" tabindex="0">Box 5</div>
</div>

## Using style container queries as an `if` statement

Let's conclude by refactoring the code a little bit so it's easier to reuse in multiple places.

First, let's use the technique to swap the value of a custom property called `--was-focused`:

```css
.track-focus {
  --was-focused: false;
  animation: track-focus .00001s linear forwards paused;
}
.track-focus:focus-within {
  animation-play-state: running;
}
@keyframes track-focus {
  to { --was-focused: true; }
}
```

Now, we can use this by applying the `.track-focus` class to any element we want to track the focus state of. For example, a couple of form labels with inputs in them:

```html
<form class="my-form">
  <label class="track-focus" for="name">
    Your name
    <input type="text" id="name">
  </label>
  <label class="track-focus" for="email">
    Your email
    <input type="text" id="email">
  </label>
</form>
```

Then, to actually use the `--was-focused` property, we can use a [container style query](https://developer.mozilla.org/docs/Web/CSS/Guides/Containment/Container_size_and_style_queries#container_style_queries). This way, we can conditionally apply styles to the element itself or to any of its descendants, depending on whether it was ever focused:

```css
@container style(--was-focused: true) {
  input {
    background: lightgreen;
  }
}
```

And here is the result:

<style>
.my-form {
  padding: 1rem;
  border: 2px dashed black;
}
.track-focus {
  --was-focused: false;
  animation: track-focus .00001s linear forwards paused;
}
.track-focus:focus-within {
  animation-play-state: running;
}
@keyframes track-focus {
  to { --was-focused: true; }
}

@container style(--was-focused: true) {
  input {
    background: lightgreen;
  }
}
</style>
<form class="my-form">
  <label class="track-focus" for="name">
    Your name
    <input type="text" id="name">
  </label>
  <label class="track-focus" for="email">
    Your email
    <input type="text" id="email">
  </label>
</form>

That's it. Let me know if you find a cool use case for this technique, or if you have other ideas to improve it.
