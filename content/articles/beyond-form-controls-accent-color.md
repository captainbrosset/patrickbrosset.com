---
layout: article.njk
title: "Beyond form controls: letting custom UI follow accent-color"
tags: article
date: 2026-11-18
excerpt: "Why use AccentColor when a CSS variable already works? To let custom UI follow a standard theme property without knowing a site's design tokens, and to leave room for the user's own color preferences."
hideThumbnail: true
hasCode: true
draft: true
---

> Draft, for review, and potential submission to CSS-Tricks or Smashing Magazine.

Say I want my checkboxes and my buttons to share a color. Defining a CSS variable and using it for both works:

```css
:root {
  /* Define a brand color for both custom UI and native form controls */
  --brand: #005CD2;

  /* Apply the brand color to native form controls */
  accent-color: var(--brand);
}

.primary-button {
  /* Apply the brand color to the button */
  background-color: var(--brand);
  color: white;
}
```

The [`accent-color` property](https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/accent-color) brings my brand color to supported native form controls, such as checkboxes, radio buttons, range inputs, and progress elements, and I can use the same brand color anywhere else I need, such as buttons. Now I can change the variable once and all instances follow.

That's a great solution, but it relies on an assumption: in this example, I control both the variable name and the code that consumes it.

What happens when I don't?

## Enter AccentColor

Let's start by clarifying the terminology:

* `accent-color` is a CSS **property** which sets an accent for some browser-rendered controls. It's inherited.
* `AccentColor` is a CSS color **value**. It's not a property. You use it everywhere a color is expected.
* Oh, and there's also `AccentColorText`, another color value, which provides a contrasting foreground color for use on an `AccentColor` background.

Here's the idea:

```css
:root {
  /* Set the accent color for native form controls */
  accent-color: #005CD2;
}

.primary-button {
  /* Use the accent color for the button background */
  background-color: AccentColor;
  color: AccentColorText;
}
```

The button now asks for the accent color in its current context, rather than using a variable with a particular name.

You can think of it almost as using the `currentColor` value, which lets you style, say, a border based on the element's text color. The comparison isn't perfect, but the idea is the same: `AccentColor` reflects a value that comes from the surrounding context.

## Decoupling

Imagine you're no longer in control of the code that consumes your variables. Imagine you're adding a component library to an existing page.

Your page still defines and uses the `--brand` variable in a bunch of places, but now you also have third-party components which expect a different variable name, for example `--component-primary`, and you need to map your variable to theirs:

```css
.settings-panel {
  --component-primary: var(--brand);
}
```

A library should be able to pick up the host page's accent without requiring the host to know about the library. Decoupling is good!

With `AccentColor`, there's a standard CSS integration point to do just that.

This benefits both sides:
* You set the familiar `accent-color` property instead of having to configure a separate variable.
* The author of the component library can respect your `accent-color` value if it's set.

## Good defaults

The above is only half the story. What if your page doesn't define an explicit accent color? What will the component library do then?

The initial value of the `accent-color` property is `auto`, and that leaves the browser in charge of choosing the accent. For example, in Chromium-based browsers, it's light blue on web pages, and matches the user's preferred system accent color in installed web apps.

So the component library can rely on the `AccentColor` value, even if you don't explicitly set an accent color.

## Context is everything

Setting `accent-color` on `:root` is useful and probably the most common approach, but it isn't required. The `accent-color` property is inherited, which means you can give different parts of a page different accents:

```css
:root {
  /* Default accent color for the page */
  accent-color: #005CD2;
}

.risky-settings-panel {
  /* Specific accent color for a risky settings panel */
  accent-color: red;
}

button {
  background-color: AccentColor;
  color: AccentColorText;
}
```

The button that's inside the risky settings panel can still use the same `AccentColor` and `AccentColorText` color values that all other buttons use, but its surrounding context supplies the right value for the panel.

CSS variables inherit too, so that scoped theming idea isn't new, but again, the decoupling benefit exists here too. The component (the button in this case) doesn't need to know which custom property the host uses, or whether the host uses one at all.

## Don't forget the second keyword

It's tempting to focus on `AccentColor` only, because its name is so close to the `accent-color` property. But don't forget: an accent color can be light or dark. When used as a background, you'll need to find a suitable text color to ensure readability.

That's why the pair `AccentColor` and `AccentColorText` pair matters:

```css
.settings-button {
  background-color: AccentColor;
  color: AccentColorText;
}
```

These two keywords are color values, and they can therefore be used wherever a color value is expected. But, be careful: `AccentColorText` is intended as the foreground on an `AccentColor` background. It's not a universal accessible text color for arbitrary backgrounds. They're meant to be used together as a pair to ensure sufficient contrast.

## Browser support

The `AccentColor` and `AccentColorText` system colors are supported in all major browser engines (Chromium, WebKit, and Gecko). But, they don't yet follow the `accent-color` property in all browsers:

* In Chromium-based browsers, support is coming with Chrome and Edge 159.
* WebKit has an [approved implementation PR](https://github.com/WebKit/WebKit/pull/74949), so support should be coming in future versions.
* Gecko (Firefox) has a [positive stance](https://github.com/mozilla/standards-positions/issues/1438) on implementing, but there has been no movement on [the bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1929716) yet.

Reflecting the value of `accent-color` in `AccentColor` has also been [proposed for inclusion in Interop 2027](https://github.com/web-platform-tests/interop/issues/1361). So, crossing fingers that all browser engines add support for this soon.

There's no great detection mechanism here. You can test if the system color values are supported, but that won't tell you if they actually follow the `accent-color` property:

```css
@supports (background-color: AccentColor) {
  /* The keyword is recognized. That doesn't prove it follows accent-color. */
}
```

So, for now, you should probably do either of the following things:

* Continue using a custom property (aka CSS variable) to apply your accent color to UI elements.
* Or, start using the `AccentColor` and `AccentColorText` system colors now, understanding that you may not get an exact brand color match in all cases.

## The special case of forced colors mode

Forced colors mode deserve a mention here.

For example, when a user has enabled the Windows High Contrast mode, their system enforces specific colors to ensure accessibility.

In that mode, `AccentColor` does not follow your `accent-color` value. That's intentional! Don't add `forced-color-adjust: none` just to preserve your brand color, you would be making your interface less accessible for users who rely on high contrast settings.

## The special case of installed web apps

I said the default Chomium-based browser accent color was a light blue. However, on many operating systems, you can change the OS-level accent color, for example to make the checkboxes in your file explorer, or in other native apps match your preference. But, this OS-level setting doesn't apply to the accent color in the browser itself. This is a privacy measure to prevent websites from detecting the user's OS-level preferences.

However, this behavior changes for installed web apps. If you make a PWA that users can install and use standalone, just like they would a native app, you probably want your app to respect the user's OS-level accent color.

In that particular case, setting `accent-color: auto` allows the app to automatically adopt the OS-level accent color.
