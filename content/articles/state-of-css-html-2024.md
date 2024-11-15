---
layout: article.njk
title: State of CSS and State of HTML 2024
tags: article
date: 2024-11-08
excerpt: "The results of State of CSS 2024 are available, and some preliminary results for State of HTML 2024 are too. In this article, I share  my combined analysis of both."
thumbnail: "/assets/stateofs24.png"
altText: "An combined abstract rendering of the state of css and html survey logos"
---

[Sacha Greif](https://bsky.app/profile/sachagreif.bsky.social)'s "State Of" surveys have become one of the most useful web development series of surveys. They [started](https://www.devographics.com/) out of Sacha's need to learn more about the JavaScript ecosystem, but have now expanded to include more parts of the web platform.

As someone who works on browsers, I can assure you that the results to these surveys are read by browser vendors and used to inform our work. There are a few key questions in these surveys that speak directly to browser vendors, such as questions about the availability of features across browsers, their interoperability, and the pain points that developers feel.

As a web developer, there aren't that many different things you can do to influence the web platform evolution, and taking the time to fill out these surveys is one of them. I know taking time out of your day job is hard, but unlike other means of influencing, this one is a low barrier to entry, and also a great opportunity to learn about new features too.

With that said, let's jump into my analysis of the results of the State of CSS 2024 and the preliminary results of the State of HTML 2024.

Caveat: for both of these surveys, I will only look at the few questions that relate to browser compatibility issues, missing features, and other pain points.

## State of CSS 2024

Let's first take a look at the State of CSS survey.

### Browser incompatibilities ([results](https://2024.stateofcss.com/en-US/usage/#css_interoperability_features))

Participants were asked about which features they couldn't use because of the lack of support, or differences between browsers. The results are quite spread out with no clear winner (or, loser, in this case). The numbers seem fairly low overall too. Here are the top 7 responses (I cut off below 5% of the votes):

* **Anchor positioning**: 11%
* **Container queries**: 10%
* **`:has()`**: 9%
* **Nesting**: 9%
* **View Transitions**: 9%
* **Subgrid**: 7%
* **Grid**: 6%

Apart from the expected Anchor positioning and View Transition features, which are not yet available across all browsers, the key take away for me here is that developers tend to take a very conservative approach to using new CSS features.

Indeed, Container queries, `:has()`, Nesting, and Subgrid have been available across all browser engines since 2023. But, 2023 is basically yesterday, and it feels way to soon for people to feel safe using features that have only been available for a year. Not to mention the fact that many developers might not even be aware of these features yet.

Reading through the free-form comments on this question also shows that web devs have been burnt in the past and have to account for large user bases, which don't always migrate to more recent versions of their browsers (this is especially true, it seems, for users on older iOS versions).

Some comments also mention the frustration caused by hearing about new features much too early, when developers can't use them yet. This leads to developers feeling overwhelmed by the number of features that they have to memorize for years before they can use them.

Now, Grid was surprising. It's been available across browsers since 2017, which feels like a long enough time for developers to use. Digging through the comments actually shows that developers were mostly asking about Masonry and Subgrid. So, this is more of a case of the survey not having the right categorization of the results, rather than a signal that Grid is not interoperable (that said, Grid has been part of the Interop project for the past few years, there are always more edge cases to fix).

Respondents also left some interesting comments on specific features:

* Container queries was mentioned as being too complex.
* Some people mentioned bugs with `:has()`.
* Some people have heard of the CSS Nesting's "relaxed syntax", and want to wait for this before using it. This new nesting syntax was actually part of the Interop 2024 project, and we're getting it across all browsers this year.
* Subgrid is also mentioned as having bugs and performance problems.

### Missing features ([results](https://2024.stateofcss.com/en-US/usage/#css_missing_features))

Participants were also asked about which features they thought were missing from CSS.

The numbers are also quite low here with no one feature that stands out. This is explained by some of the comments left on the question where people shared their feeling that there are already too many features to learn, to use, and to keep track of.

That said, here are the top three features that people felt were missing from CSS:

* **Mixins**: people want what SCSS/Sass has, to be able to reuse styling code logic across their code base.
* **Conditional logic**: the ability to have if/else statements in CSS code.
* And, **Masonry layout**.

### Other pain points ([results](https://2024.stateofcss.com/en-US/usage/#css_pain_points))

This question is about whether developers are facing any other pain points when writing CSS.

The top response here is absolutely no surprise: **browser support**. It's not a surprise because the lack of cross-browser support (as well as low interoperability of features) has always been the top pain point in these surveys. Safari is mentioned in quite a few comments.

But, the comments also contain an interesting key take away here related to design tools. This one resonates with some of what I heard at [SmashingConf](/articles/2024-10-15-smashing-conference-nyc-2024/) earlier this year. Designers are seeing that CSS has gotten so many features that let you be creative on the web, but also that let you design specifically **for** the web, that they're feeling held back by their design tools that don't "speak" CSS. This tells me that traditional graphic design and CSS are growing further apart and that there's room for CSS-first design tools.

One final take away on this question is related to complexity, where some people mentioned that CSS was getting very complex to use.

### Conclusion

In conclusion, here are some of the opportunities identified by the State of CSS 2024 survey:

* Anchor positioning, View Transitions, Masonry, mixins, and conditional logic are some the top requested CSS features.
* Developers have to wait years before they can use new features.
* DevRels announce features way too early. This doesn't mean they shouldn't, but they should also announce them again later when developers can actually use them.
* There's a feeling that CSS is getting kind of overwhelming and complex to use.
* There seems to be a need for CSS-first design tools.

## State of HTML 2024

At the time of writing, the results from the State of HTML 2024 have not been published yet. I've been given access to the preliminary results, but won't be able to share links to specific survey sections, so you'll need to trust me. I don't expect there to be much changes in the final results though.

### Browser interoperability

Participants were asked about which features they couldn't use because of the lack of support, or differences between browsers. Here, the Popover API is the clear winner, with close to 20% of respondents choosing this feature. But apart from this, other features trail off quickly below 10%.

Below is the top 5 features that respondents said they couldn't use because of browser incompatibilities:

* **Popover**: 19%

  * This API is now supposedly supported in all engines, but there's a known [issue in Safari iOS preventing the dismissal of Popovers when tapping outside of them](https://bugs.webkit.org/show_bug.cgi?id=267688). That said, the comments on this feature don't mention this issue specifically.

  * Many people who left comments mentioned the lack of anchoring support for Popover. Indeed, Popovers can be very useful to implement tooltip-like UIs, but that's not very easy if you can't anchor the tooltips to the elements they relate to.

* **Anchor positioning**: 11%

  This feature is missing in [Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=1838746) and in Safari, but hopefully coming soon.

  Multiple respondents mentioned that they needed this feature to position Popovers. So, the responses to this question are related to the previous question.

* **View transitions API**: 8%

  No specific comments were left on this one. People just want it to be implemented.

  View Transitions within the same document are missing in Firefox but work is happening. But, really, what people need here is support for View Transitions across documents, which can help remove performance costly client-side single-page app frameworks. 

* **`<dialog>`**: 6%

  This feature is widely available now, having been supported in all browser engines since March 2022. However, similar to how web devs find that using 2023 CSS features is too soon, some people commented that they couldn't use `<dialog>` because of the lack of support in older iOS versions.
  
  Respondents also mentioned a few different issues:
  
  * Not being to animate the dialog appearance/disappearance. For this to work, developers need a set of other CSS features: [`overlay`](https://developer.mozilla.org/docs/Web/CSS/overlay), [`@starting-style`](https://developer.mozilla.org/docs/Web/CSS/@starting-style), [`transition-behavior`](https://developer.mozilla.org/docs/Web/CSS/transition-behavior), and animating [`display`](https://developer.mozilla.org/docs/Web/CSS/display#animating_display) and [`content-visibility`](https://developer.mozilla.org/docs/Web/CSS/content-visibility#animating_and_transitioning_content-visibility).
  * Accessibility issues.

* **PWAs**: 6%

  Comments on this response mostly mention the lack of support for PWAs on iOS devices.

### Limited functionality

Participants were also asked about features they couldn't use for other reasons. I'll list the top 8 responses below (> 5%). Note that the order isn't super meaningful here because the data seems to contain a bunch of incorrectly categorized responses. That said, I'm less interested in which features came first than the reasons people said they couldn't use those features.

Two key learnings for me here: many elements are not stylable enough, and some are too complex to use.

* `<select>`: People complain that the element is not stylable enough (truly stylable selects can't come soon enough).
* `<input type=date>`: Same thing here, date and time inputs aren't stylable enough. But also, they vary across browsers, are not configurable enough, and their default UX leaves much to be desired.
* `<dialog>`: Respondents mentioned difficulties to style and to animate. They also said that the element was complex to use.
* `<datalist>`: Here too, people mentioned the lack of ability to style the element.
* `<details>` and `<summary>`: Devs said these elements were a great way to implement accordion components, but that this was hard due to difficulties in styling and animating (e.g. animating to auto height).
* Popover: Respondents mentioned the lack of anchor positioning prevented them from using the API.
* `<select multiple>`: People mentioned a poor accessibility and poor UX, especially on desktop.
* Web Components: Developers said web components were complex.

### Missing elements

In this question, respondents were asked to sort a list of pre-determined missing elements, based on what they needed the most.

Below is the top 7 elements, which all got above 20%. Scores to elements after that drop off.

It's worth noting that the list of elements is exactly the same as last year's, in the same order.

* **Data table**: 51%
* **Tabs**: 40%
* **Switch/toggle**: 32%
* **Skeleton loader**: 28%
* **Context menu**: 27%
* **Carousel**: 26%
* **Infinite scroll**: 24% (although several people commented against it, saying that infinite scroll was bad UX).

This question also got some interesting comments from people saying they didn't want anything new that would be too complex, but instead wanted better primitives to build their own components.

### Conclusion

In conclusion, here are the opportunities I can see from the State of HTML 2024 survey:

* The top request is for real Popover support, with light dismiss on iOS, and with anchor positioning built-in.
* Support for top-layer animations would go a long way in letting people use Popovers and Dialogs, and therefore remove the need for costly JS library dependencies.
* Existing HTML elements need to be more easily stylable, especially `<select>`, `<input type=date>`, `<datalist>`, and `<details>` and `<summary>`.
* New elements are needed, especially data tables, tabs, and switches. Re-implementing your own currently requires a lot of work and JS code.

## Going forward

The Web platform is far from ever being done. New problem areas get identified all the time, and new solutions are needed for them. As these make their ways through standards and browser engines, it's important to keep an eye on how well they're being implemented, and how well they indeed solve the problems they were meant to solve.

These State Of surveys are a tremendous tool to help us keep the pulse on what's happening in this world, and therefore to help us prioritize efforts to continue evolving the web platform in the right direction.

Survey fatigue is real, but without signals from the people actually using the platform, those who build it can't do so effectively.
