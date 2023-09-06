---
layout: article.njk
title: 3 things about CSS variables you might not know
tags: article
date: 2020-09-21
hasCode: true
excerpt: "What happens when variables are undefined, fallback values, and DevTools features! Hopefully you'll learn a thing or two with this article."
thumbnail: "/assets/chrome-color-looking-vars.png"
altText: "Screenshot of what color-looking variables look like in chrome DevTools"
---
[CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) (or custom properties, depending on how you prefer to call them) are really cool, and chances are, you're already using them in your projects.

In this article, I'll talk about 3 things that I think a lot of people might now know about:

* what happens when a `var()` function uses an undefined variable,
* how fallback values work,
* and how browser DevTools can help you.

### Undefined variables

There are several reasons why you may be trying to use an undefined variable in a `var()` function. We'll look at a few in a minute. But before we do that, it's important to know that when this happens, CSS falls back on its feet.\
CSS and HTML are super resilient languages where mistakes are forgiven and one tiny error doesn't prevent the entire page from rendering.

So, using an undefined variable won't lead to a parsing error, it won't prevent your stylesheet to load or parse or render. In fact, you might not even realize that something went wrong without a lot of investigation.

Some of the reasons using an undefined variable might happen are:

* you've simply made a typo in the name of the variable,
* you're trying to use a variable you thought existed, but doesn't,
* or you're trying to use a totally valid variable, but it happens to not be visible where you want to use it.

Let's go over that last example.

**Variables participate in the cascade**. This means, for a variable to be available to a `var()` function, that variable needs to be declared in a rule that also applies to the element being styled, or to one of its ancestors.

For the sake of giving an example, let's look at this:

```css
ol li { --foo: red; }
ul li { color: var(--foo); }
```

Of course your particular case will likely be more complicated than this, with many more rules and much more complicated selectors. But what happens here is that for `ul li` elements to have the color red, they would also need to match the rule `ol li` where that color is actually defined. And that will probably not happen.

Now, in many cases, CSS variables tend to get defined in some top-level selector like `:root` or `html` and are therefore available throughout the DOM tree (those selectors match ancestor elements of all other elements in the page).\
In this case, the problem of a missing variable almost never occurs.

However sometimes it's handy to declare variables in other places and when you do this, you've got to start paying more attention to whether your variable will actually be visible (via the cascade) to where you intend to use it.

So, with this out of the way, let's see how browsers deal with undefined variables:

1. If the property is not inheritable (like `border`), then the property is set to its initial value.
2. If it is inheritable (like `color`), then the property is set to its inherited value. If there isn't any, then it is set to its initial value.

Let's look at 2 examples to illustrate this:

```css
:root {
    --main-color: #f06;
}

.my-lovely-component {
    border: 1px solid var(--main-colo);
}
```

In this first example above, a typo was made in `var(-main-colo)` and as a result the browser cannot tell what the final value for the `border` property should be. Because the `border` property is not inheritable in CSS, the browser finds itself in case 1 from above. It therefore sets the value to its initial state which happens to be `medium none currentColor` (see [the initial value on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/border#Formal_definition)).\
So, even if only the color part of the border was missing, the border will be missing entirely.

Let's look at a second example now.

```css
:root {
    --main-color: #f06;
}

body {
    color: gold;
}

.my-lovely-component {
    color: var(--secondary-color);
}
```

In this one, an undefined variable was used in `.my-lovely-component` for the value of `color`.\
Now, because this property is inherited, the browser will traverse the DOM up through the element's ancestors until it finds one that does define a color value. The `<body>` element has a rule applied to it that specifies `gold` as a value, so that's what will end up being used.

In both of these examples, the hard part is figuring out what's happening exactly. In the last part of this article, I'll explain how DevTools can help, but without specific tooling here, it would be really hard to understand the problem.

The source of it is that, even if those `var()` functions use invalid properties, when the browser parses the stylesheet, it has no way of knowing this. As far as it's concerned, those border and color properties are totally valid. So we're left with wondering why the border is missing in the first example, and why the color is black in the second.

Property names or values are only considered invalid by the style engine in a browser when those are not known. But since a `var()` function can resolve to pretty much anything at all, the style engine doesn't know whether the value containing the function is known or not.\
It will only know when the property actually gets used, at which point, it will fall back to an inherited or initial state silently, and leave you wondering what happened.

Thankfully, we'll see later in this article how some new DevTools can help with this.

### Fallback values and nesting

Here is another thing about CSS variables that doesn't seem to get used a lot, and therefore is probably not very well known either: `var()` functions accept a second, optional, parameter.\
So you can write something like this:

```css
color: var(--theme-color, red);
```

What happens in this case is: if `--theme-color` is not found by the browser, it will fall back to using the value `red`.

Now, why would you use this? I can see a few reasons why this could be interesting:

* It might come in handy if you're creating a component that gets embedded into a bigger system and can be customized with variables, but you still want some safe defaults.
* Or maybe you're styling an element that has several states, with the default state using a `var()` with fallback value, and the other state defining the variable.

Let me give an example to clarify that second case:

```css
.my-component {
    color: var(--active-color, black);
}
.my-component:hover {
    --active-color: red;
}
```

In this example, while the element isn't being hovered, its color property uses an undefined variable (indeed, the `--active-color` property does not apply to the element yet), so the browser uses the fallback value. As soon as the user hovers over the element, the second rule starts to apply, and `--active-color` becomes defined, so the element switches to red.

Of course, this is a dummy example, and you could simply have defined `color: red` in the second rule and let it override the first one. But sometimes you need to use the variable in several properties at once.

Now, let's look at a second weird thing that happens with fallback values: **nesting `var()` functions.**

Have you ever seen something like this:

```css
color: var(--foo, var(--bar, var(--baz, var(--are, var(--you, var(--crazy)))));
```


This is totally valid, but probably completely useless.\
What's happening here is that the fallback value is, itself, another `var()` function. And because it is, it (in turn) can also use a fallback value, and so on...

To be honest, I don't think I've seen `var()` functions used as fallback values very often, if at all. Fallback values themselves are probably rarely used to begin with.\
But at least you know this is possible, and hopefully won't be surprised if you ever see this.

Let me conclude on fallback values by looking at a third aspect which I think is rarely known and may lead to confusion: using commas.

A CSS variable is, basically, any text you want. Because a variable can be used anywhere a value would go, it doesn't have any strong typing at all, and therefore the only important rule is that it shouldn't contain a semicolon, since that signifies the end of the value (in reality, [it's more complicated than this](https://drafts.csswg.org/css-syntax-3/#any-value)).

As a result, something like this is valid:

```css
--my-variable: one, two, three;
```

The interesting thing here is that fallback values also follow the same rule in that they can be any text you want. So the above example could also be used as a fallback value:

```css
content: var(--foo, one, two, three);
```

Even though it really looks like the `one, two, three` part is three different parameters to the `var()` function, it's really just one. Don't get confused by that.

### DevTools tips and tricks

In this last section I'll go over some of the DevTools around CSS variables that you might now know about and which should make your life easier.

#### Autocompleting variable names

This one is super useful when doing some quick changes in the Elements/Inspector panel and your site defines a lot of different variables:\
DevTools will automatically suggest the list of existing variables when you start typing `var(`.

![Screenshot of Firefox's css var autocomplete](/assets/firefox-css-var-autocomplete.png)

The above screenshot is in Firefox, but both Edge and Chrome also support this feature.

#### Knowing what the computed value is

When looking at a `var()` function in DevTools, it's not necessarily easy to know what final value it computes to. The variable it uses may be lost in a really long list of rules, or it may itself point to another variable, making the hunt for the final value more difficult.

You can switch to the Computed tab in DevTools to see what the final computed value of the entire property is. But if you want to know what the computed value for just that `var()` function is, you can simply hover over it in DevTools:

![Screenshot of the tooltip that appears in Edge when you hover over a var() function](/assets/edge-computed-css-var.png)

The above screenshot is in Edge, but the same thing happens in Chrome and Firefox too.

Interestingly, if no tooltip appears, then that's a good clue that the variable used is undefined.

#### Color types

A little earlier, I said that variables accepted any text at all, because when they're defined, variables don't really have a type yet.

A consequence of this is that what looks like a color may actually not be used as a color.\
Consider the following example:

```css
:root {
    --i-look-like-a-color: black;
}
```

Even thought `black` is a valid color, at this point, we can't assume that it will actually be used as one. It may end up being used in a `animation-name` property, or somewhere else.

That said, DevTools still show a little color swatch next to css variables that look like colors. That is done as a convenience, because they are very likely to actually be colors! And even if they aren't, it's not going to be a problem for users.

![Screenshot of what color-looking variables look like in chrome DevTools](/assets/chrome-color-looking-vars.png)

#### Future features

Now, 2 things that, I think, would be super useful but don't exist yet is:

* jumping from a `var()` function to where the variable used in it is declared,
* quickly seeing that a `var()` function uses an undefined variable.

As it turns out, I'm working on exactly that right now in the DevTools for Chromium-based Edge and Chrome! You can check out [the bug entry](https://bugs.chromium.org/p/chromium/issues/detail?id=1124707) to follow along if you want.

Hopefully this article has been useful and you learnt a few things! Happy coding!