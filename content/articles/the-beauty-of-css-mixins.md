---
layout: article.njk
title: The beauty of CSS mixins
tags: article
date: 2026-11-25
excerpt: "CSS mixins let you reuse whole blocks of declarations, not just values. Here is how they work, and a Zen Garden-style experiment that uses them as theming extension points."
thumbnail: /assets/mixin-zen-garden.png
altText: The beauty of CSS mixins
titleForScreenReadersOnly: true
hasCode: true
---

I've been playing with CSS mixins recently, and I'm super excited about what this new CSS construct will bring to the way we write CSS. I think the CSS we'll write when CSS mixins are available will look very different from the CSS we write today.

## What's a mixin?

In its simplest form, a mixin is a named piece of CSS code that you define once and can reuse elsewhere in a style sheet. In that sense, it's very similar to a custom property (also known as a CSS variable) or a CSS function.

The big difference is what mixins can hold:

- A custom property holds a single value (or part of a value).
- A CSS function is similar: it can only be used as part of a CSS property value.
- A mixin, however, holds any number of declarations, including nested rules.

So, instead of just returning the value `red`, a mixin can return `background: red; color: white; border-radius: 2px;` all at once.

## Why now?

My team at Microsoft is implementing mixins in the Chromium open source project. They've covered a lot of ground, and we're getting ready to ship this in Chromium-based browsers. Native CSS mixins are getting very close!

I can't wait for other browsers to catch up, so that we can all use mixins in earnest.

> CSS mixins are experimental. To try the code snippets and demo in this article, use a recent Chromium browser, open `about://flags`, and enable the **Experimental Web Platform features** flag.

## Learn to use mixins

You define a mixin with the `@mixin` rule, and you use it with `@apply`. Mixin names start with two dashes, like custom properties.

Let's define the `--visually-hidden` mixin:

```css
@mixin --visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
}
```

And now, let's use it somewhere else in our code:

```css
.skip-link {
  @apply --visually-hidden;
}
```

That's all you need to do. The browser will apply the mixin's declarations to the element as if they were written directly in the element's style block, so it's exactly as if you had written:

```css
.skip-link {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
}
```

Except now, you have a nice little reusable mixin that you can apply wherever you need it.

## Mixin parameters

That's not all, a mixin can take parameters, with optional types and default values too. Consider this `--button` mixin:

```css
@mixin --button(--bg <color>: royalblue, --fg <color>: white) {
  background: var(--bg);
  color: var(--fg);
  padding: .5em 1em;

  &:hover { background: color-mix(in oklch, var(--bg), black 20%); }
}
```

It applies some colors and spacing to a button-like element, checking that the supplied colors have the right type and falling back to default values if needed. It even handles hover states automatically.

You can use this mixin either with its default values or by passing your own arguments:

```css
/* Using the default button styles. */
.primary { @apply --button; }

/* Overriding one of the default button colors. */
.danger { @apply --button(crimson); }

/* Overriding both default button colors. */
.custom { @apply --button(palegreen, black); }
```

If you pass more arguments than the mixin has parameters, the `@apply` does nothing.

## Conditional mixins

A mixin can also hold conditional rules, such as `@media`, `@supports` and `@container`.

For example, you can create a mixin that applies styles conditionally to the viewport size:

```css
@mixin --tablet-up {
  background: lightgray;

  @media (width >= 48rem) {
    background: darkgray;
  }
}
```

This becomes even more powerful when combined with `@contents`. See the next section.

## Mixin contents

Arguments are not the only way to customize a mixin. A mixin can also accept an entire block of CSS from the call site. Inside the mixin, `@contents` marks the spot where that block goes.

For example, here's a `--card` mixin that defines a couple of declarations and accepts a block of CSS from where the mixin is used:

```css
@mixin --card {
  padding: 1rem;
  border: 1px solid;

  @contents;
}
```

When calling the mixin, you can pass other declarations inside a block, which will be inserted at the `@contents` location within the mixin:

```css
.note {
  @apply --card {
    background: lightyellow;
  }
}
```

Here, `.note` gets the padding and border from the mixin, and then its own background, in the place where `@contents` appears.

`@contents` can have a fallback, which applies when the caller passes no block: `@contents { background: white; }`. If the caller passes an empty block, `@apply --card {}`, the fallback does not apply.

The ability to provide your own block of styles when applying a mixin is very useful, for example when using a mixin as a condition. Consider this mixin:

```css
@mixin --if-dark-mode {
  @media (prefers-color-scheme: dark) {
    @contents;
  }
}
```

You can use it to define styles that only apply in dark mode, while keeping the rest of your CSS unaffected. For example:

```css
.header {
  background: white;
  color: black;
  
  @apply --if-dark-mode {
    background: black;
    color: white;
  }
}
```

Conditional mixins combined with `@contents` gives us something we've been wanting for a long time: **named breakpoints**:

```css
@mixin --mobile {
  @media (width < 40rem) {
    @contents;
  }
}

@mixin --tablet {
  @media (40rem <= width < 64rem) {
    @contents;
  }
}

@mixin --desktop {
  @media (width >= 64rem) {
    @contents;
  }
}
```

These mixins don't apply any styles of their own, they just conditionally apply styles that are given to them depending on the media query. This is great because we now have a way to give custom names to a series of responsive design breakpoints that can be maintained in one place.

Let's use them here to see how clean our responsive design code can be:

```css
.sidebar {
  @apply --mobile {
    display: none;
  }

  @apply --tablet {
    inline-size: 12rem;
  }

  @apply --desktop {
    inline-size: 20rem;
  }
}
```

## Private variables

Finally, a mixin can keep private variables to itself, by declaring them in an `@private` block. The element that applies the mixin can't see these variables:

```css
@mixin --gradient-text(--from: tomato, --to: gold) {
  @private {
    --angle: 90deg;
  }
  background: linear-gradient(var(--angle), var(--from), var(--to));
  background-clip: text;
  color: transparent;
}
```

## An experiment: theming with mixins

Mixins are very versatile. You will find many ways to use them, and I don't think there will be one good way and one bad way to use them. Different teams will work out what works for them.

In this section, I explored one way in which mixins might be used. I don't know if it will make sense in a real project yet, but I found it interesting to try.

Imagine a white-label website. You own the site and control its markup and default CSS. But you also want your customers to be able to theme the site to match their brand.

Here's the idea:

1. You write clean, semantic HTML, which contains all of the content.
1. You write the basic CSS for it. This is your white-label version. It has the basic layout, the headers and the sidebars, but no strong colors, no animations, no design direction.
1. You apply _undefined_ mixins in all the logical places of your site. For example, you apply a mixin at the overall page level, another one in the header, another one for the sidebar, and so on. These mixins are not defined, so they do nothing, and you continue to see the default look.
1. You let customers define the mixins. A customer's design is a style sheet that uses the `@mixin` rule to actually define the mixins which your basic CSS code uses. When that style sheet loads, the definitions apply at every place that uses them.

In your style sheet, you'd apply mixins like this:

```css
body      { @apply --page; }
header    { @apply --masthead; }
header h1 { @apply --site-title; }
```

And your customer could define the mixins something like this:

```css
@mixin --page {
  font: 1.2rem/1.6 Georgia, serif;
  background: lightyellow;
}

@mixin --masthead {
  background: darkblue;
  color: white;
}

@mixin --site-title {
  font-size: 2rem;
  font-weight: bold;
}
```

## But why?

You might remember the [CSS Zen Garden](https://csszengarden.com/). It had one HTML page, and anyone could submit a new design by writing a new style sheet for it. It showed the power of clean, semantic HTML, with styles, layouts and animations in a separate file. The designs were wildly different from one another and extremely creative.

But there's a problem when you do this for customers. You expose your entire markup and it becomes a public API. Customers start writing very specific selectors that depend on how your HTML is organized, and you can't change that HTML any more without breaking their customizations. I've done this at a previous job, and I know how painful this can be.

The other option is to expose CSS variables. You keep control of your entire HTML and CSS, and only expose a set of customization variables that are used throughout your code. For example, you define a set of color palette variables, a set of spacing variables, typography variables, etc.

Customers override values only, which is very safe, but can also be limiting. What if they later ask you to have access to the page layout? You now need to expose more variables and make sure they continue working correctly.

Mixins sit somewhere in between. You remain in control of your HTML and can change it whenever you want. You expose logically named mixins that correspond to the various areas and surfaces of your page.

As long as you keep applying the same mixins in the right places, customizations continue to work.

But you can also go much further than variables. Each mixin is an entry point where a customer can add any declarations, pseudo-elements, media queries and animations.

## The Mixin Zen Garden

I built a small demo, heavily inspired by the CSS Zen Garden, to test this: the [Mixin Zen Garden](/lab/mixins-zen-garden/) **(this will only work with a browser that supports CSS mixins).**

It's a simple webpage that has static HTML. The HTML never changes, but you can view the page with different designs that all use CSS mixins as described above:

Try the six designs:

- [Midnight](/lab/mixins-zen-garden/?design=midnight)
- [Paper](/lab/mixins-zen-garden/?design=paper)
- [Brutalist](/lab/mixins-zen-garden/?design=brutalist)
- [Newspaper](/lab/mixins-zen-garden/?design=newspaper)
- [Sunset](/lab/mixins-zen-garden/?design=sunset)
- [Terminal](/lab/mixins-zen-garden/?design=terminal)

(If you write your own design, please share by [opening an issue on my repo](https://github.com/captainbrosset/patrickbrosset.com/issues).)

Here are some things I learned while building it:

- Mixins that do nothing are fine.

  A design doesn't need to define every mixin. This makes small designs very short.

- One mixin per logical area of the page is more than enough.

  A design can put colors, spacing, typography, and decorations in the same mixin.

- Name mixins by role.

  Choose a mixin by what the role of the element is, such as `--sidebar-heading`, not by how it should look or what it currently is. Every design can decide what that role looks like, and you can change the HTML structure without changing the mixin names.

But, I also discovered limits:

- Well, I've said this already, but it bears repeating: mixins are experimental.

  They work in Chromium only, behind a flag.

- Nested selectors can reach into your markup again.

  A custom design can define a nested selector in a mixin to reach into the HTML markup. For example: `@mixin --masthead { & h2 { ... }}`.
  
  Doing this exposes your HTML markup again, making it part of the API contract, which we wanted to avoid. Now, if this were to become a real customization mechanism, we could validate custom designs to ensure they only use allowed selectors within mixins.

## What's next

Theming is only one use of mixins. Other ideas I want to try:

- More uses of named breakpoints, because they allow breakpoints to be defined once for the whole site and reused consistently.
- Mixins across shadow DOM boundaries. A document-level mixin applies inside shadow roots and this feels like a great way to style a component's insides from the page.
- Enforcing accessibility and progressive enhancement best practices in a central place to ensure your team policies are applied consistently. If developers just apply mixins in their style sheets, then you can ensure best practices from within the mixins themselves.

CSS mixins might change the way we write and organize CSS pretty profoundly. I'm looking forward to seeing what you build with them. If you try the demo, or experiment with mixins on your own projects, let me know!
