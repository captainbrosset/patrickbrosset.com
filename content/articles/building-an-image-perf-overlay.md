---
layout: article.njk
title: Building an image performance overlay with the Performance API
tags: article
date: 2024-03-12
hasCode: true
excerpt: "I've recently started to learn more about the Performance API that's available in web browsers, and wanted to share some of my learnings. I'm far from being an expert, but I hope this post is a fun way to get into the world of performance metrics in the browser, and using them to track the performance of images on your website."
thumbnail: "/assets/motion-blur.webp"
altText: "A trail of motion blurry light"
---
I've recently started to learn more about the Performance API that's available in web browsers, and wanted to share some of my learnings. I'm far from being an expert, but I hope this post is a fun way to get into the world of performance metrics, and how you can use them to track the performance of your website.

While I was looking at the (very good) [documentation of the Performance API on MDN](https://developer.mozilla.org/docs/Web/API/Performance_API), one thing caught my attention: the ability for the API to report the load time of elements on the page. It turns out that the `element` performance metric can be used to know how long any image or text-containing element took to load and render.

So I got the idea of using this API to build an on-page overlay that would appear on top of images on the page, only shown when using my site in development mode. The overlay would display the load and render times for each image and appear as a warning if the time is too long. I also got the idea of displaying a warning if the image's natural size is too large compared to the size it's actually being displayed at.

For the rest of this post, let's go through the main steps required to build this overlay. I'm applying this to my own website [devtoolstips.org](https://devtoolstips.org), but the steps below should be applicable to any website.

## Browser support warning

Before we get started, a quick word about browser support. The Performance API is huge, in that it contains a lot of different interfaces, properties, and methods. While the majority of is supported in all browsers, the `element` performance metric I'll be using here is [only supported in chromium-based browsers](https://developer.mozilla.org/docs/Web/API/PerformanceElementTiming#browser_compatibility) for now unfortunately.

## Step 1 - Add HTML attributes to images

The first thing we need to do is to add the `elementtiming` HTML attribute to the images that we want to track. By default, no element's load time is recorded by the Performance API, so we need to explicitly tell the browser which ones to track.

On my site, I have pages that display lists of posts. Each post is represented by a card containing a title, some preview text, and an image. I want to track the load time of the image, so I'll add the `elementtiming` attribute to the `img` element:

```html
<ul class="tips">
{%- for post in posts -%}
  <li class="tip">
    <a href="{{ post.url }}" class="tip-title">{{ post.data.title }}</a>
    <a href="{{ post.url }}" class="tip-image">
      <img src="{{ post.data.imageUrl }}" alt="{{ post.data.imageAlt }}" elementtiming></img>
    </a>
    <div class="tip-excerpt">{{ post.data.excerpt }}</div>
  </li>
{%- endfor -%}
</ul>
```

The important part in the above code snippet is the `elementtiming` attribute. The rest is an [Eleventy](https://www.11ty.dev/) template I use on my website to generate the list of posts.

## Step 2 - Set up a PerformanceObserver

Now that the HTML code is ready, let's actually use the Performance API to retrieve the images timing information.

There are two main ways to retrieve the performance metrics we care about:

* By using the `performance.getEntries()` method.
* Or, by using a `PerformanceObserver` instance.

Using a `PerformanceObserver` instance offers a few important advantages:

* `PerformanceObserver` observes performance metrics and dispatches them over time. Instead, using `performance.getEntries()` will always return the entire list of entries since the performance metrics started being recorded.
* `PerformanceObserver` dispatches the metrics asynchronously, which means they don't have to block what the browser is doing.
* The `element` performance metric type just doesn't work with the `performance.getEntries()` method anyway.

So, let's create a `PerformanceObserver` instance:

```javascript
const perfObserver = new PerformanceObserver(entries => {});
```

For now, we're passing an empty callback function to the `PerformanceObserver` constructor. Later, we'll change it to actually do something with the observed performance metrics. 

Now, let's start observing:

```javascript
perfObserver.observe({ type: "element", buffered: true });
```

The first thing to notice in the above code snippet is the use of the `type: "element"` property. That's what tells the observer to only observe the `element` performance metrics. If you wanted to, instead, observe other perf metrics such as _[Cumulative Layout Shift (CLS)](https://developer.mozilla.org/docs/Web/API/LayoutShift)_, or _[Largest Contentful Paint (LCP)](https://developer.mozilla.org/docs/Web/API/LargestContentfulPaint)_, then that's where you'd specify it.

The second very important thing above is the use of the `buffered: true` property. Setting this to true means that we not only want to observe performance metrics being dispatched after we start observing, but we also want to get the performance metrics that were queued by the browser **before** we started observing.

That means we don't need to worry about running this piece of code right when the page loads. We can run it at a more convenient time, lazily, after the whole page has finished loading.

Now let's work on the callback function that's passed when instantiating the `PerformanceObserver` object. That's the function the browser will call whenever performance metrics are dispatched (as well as right from the start if there are queued metrics):

```javascript
const perfObserver = new PerformanceObserver(entries => {
  entries.getEntries().forEach(entry => {
    const { element, loadTime, renderTime, naturalWidth, naturalHeight } = entry;
  });
});
```

Our callback receives a list of performance entries, so the code snippet above iterates over these entries. Here are the properties of each performance entry that we're interested in:

* `element`: a reference to the image element which this entry applies to.
* `loadTime` and `renderTime`: the image load and render time, given as a high resolution timestamp (more on this later).
* `naturalWidth` and `naturalHeight`: the width and height of the image resource.

Now that we have the required data, it's time to display it.

## Step 3 - Create and style the overlay

My idea was to display the performance metrics on each image, as an overlay of some kind. To do this, we'll need to make the data available in the DOM somewhere, ideally, on the images themselves, and then style the data.

Let's use data attributes to store the metrics on each image, to avoid having to create new elements in the DOM, and so that we can retrieve the data from CSS by using the `attr()` function. We can then display the data by using the `::before` and `::after` pseudo-elements.

Note though that pseudo-elements don't get rendered inside images, because images are replaced elements inside which CSS doesn't apply. So, in the following code snippet, you'll notice that we actually use the image's parent element instead.

```javascript
const perfObserver = new PerformanceObserver(entries => {
  entries.getEntries().forEach(entry => {
    const { element, loadTime, renderTime, naturalWidth, naturalHeight } = entry;

    // Find the image parent element to store the data.
    const parentEl = element.closest(".tip-image");
    if (!parentEl) {
      return;
    }

    // Check the display dimensions of the image in the page
    // to compare them with the natural dimensions.
    const realWidth = element.offsetWidth;
    const realHeight = element.offsetHeight;

    // If the loadTime + renderTime is too long,
    // or if the image is too big compared to how it's displayed,
    // then add a warning class to the parent element.
    const isPerformanceIssue =
      loadTime + renderTime > 300 ||
      naturalWidth > realWidth * 1.5 || naturalHeight > realHeight * 1.5;
    parentEl.classList.toggle("perf-issue", isPerformanceIssue);

    // Write the performance data to the DOM as data attributes.
    parentEl.dataset.loadTime = Math.round(loadTime);
    parentEl.dataset.renderTime = Math.round(renderTime);
    parentEl.dataset.naturalWidth = naturalWidth;
    parentEl.dataset.naturalHeight = naturalHeight;
    parentEl.dataset.realWidth = realWidth;
    parentEl.dataset.realHeight = realHeight;
  });
});
```

In the code snippet, we first get the image's parent element which we'll use to write the performance data.

We then do some calculation to decide whether the image is a performance issue or not. We check if the load and render time aren't too long, and if the image's render size isn't much smaller than its natural size. We then apply a class to the element if there's a potential performance issue.

Finally, we write the performance data to the DOM as data attributes. Data attributes are nice because they can be written and read by using the `element.dataset` property.

Note that the load and render times are given to us as high resolution timestamps by the Performance API. A high resolution timestamp is nice because it represents a moment in the lifetime of the webpage that's very accurate. Much more accurate than if we had been running our own timers with `setTimeout` or `Date.now`. A high resolution timestamp is a number of milliseconds that's accurate up to 5 microseconds. In the code snippet above, we use `Math.round()` to get rid of the decimal places, and make the numbers easier to read in the overlay.

Alright, we have our data available in the DOM. Let's now display it by using CSS. As I mentioned earlier, we'll use the `attr()` function to read the content of HTML attributes:

```css
/* Make the image parent container be positioned, so
we can absolutely place the before/after pseudos. */
.tip-image {
  position: relative;
}

/* Position the pseudo-elements absolutely within
the container, and give them some default styles */
.tip-image::before,
.tip-image::after {
  position: absolute;
  font-size: 0.7rem;
  padding: 0.2rem;
  line-height: 1;
  background: lime;
  color: black;
}

/* If the element has the perf-issue class,
then make the pseudo-elements red instead. */
.tip-image.perf-issue::before,
.tip-image.perf-issue::after {
  background: red;
  color: white;
}

/* Display the load and render time in the
::before pseudo-element. */
.tip-image[data-load-time]::before {
  content: "load: " attr(data-load-time) "ms render: " attr(data-render-time) "ms";
  top: 0;
  left: 0;
}

/* Display the image dimensions in the
::after pseudo-element. */
.tip-image[data-natural-width]::after {
  content: attr(data-natural-width) " ⨉ " attr(data-natural-height) " (vs. " attr(data-real-width) " ⨉ " attr(data-real-height) ")";
  bottom: 0;
  right: 0;
}
```

In the above code sample, because the load and render time are set in JavaScript by using `element.dataset.loadTime` and `element.dataset.renderTime`, they become available as the `data-load-time` and `data-render-time` HTML attributes, which, in turn, makes them available to CSS by using the `attr(data-load-time)` and `attr(data.render-time)` functions.

## Step 4 - Test it

It's time to test our change. After a quick re-build of my Eleventy website, here's what I get in the browser:

![My site in a browser window, red warnings appear as overlays at the top and bottom of each image, DevTools is opened and shows the HTML data attributes where the performance metrics are stored](/assets/element-timing/image1.webp)

The data attributes are correctly written on the image's parent element. The pseudo-elements are present in the DOM. And the performance overlays appear on each image.

Looks like our overlays are all red because the image resources are a lot bigger than the dimension they're displayed as. For example, the first image in the screenshot above is 2862 pixels wide, even if the element it's displayed in is only 201 pixels. The image is more than 10 times as big as it needs to be!

This gives us a really good clue of how to make the image load and render faster. Ideally, it should match the dimensions that it will need to be on the site. To do this, we could simply resize the image files on the server, use a tool to do it automatically at build time, or use a CDN for serving images at the right size dynamically.

The Google Lighthouse tool provides a similar warning, by the way, which you can read more about at [Properly size images](https://developer.chrome.com/docs/lighthouse/performance/uses-responsive-images).

Note that our load and render times don't seem to be too much out of the ordinary. The first image takes 103ms to load and 135ms to render which, given its size (2862px by 1410px) doesn't seem very surprising. But, it's important to keep in mind that these numbers were measured with a local server running on my development device. This represents an environment that none of my users will ever encounter. They'll more likely be using a lower-end device, on a less reliable internet connection.

Knowing who our users are, and building empathy for them is a very important part of web development, and of performance testing. One way to start doing this is by using DevTools to slow things down. Here's one way to do it in Chromium-based browsers:

* In DevTools, open the Performance tool.
* Click **Capture settings** in the top-right corner of the tool (the cog icon).
* Under **CPU** choose a 4x or 6x slowdown to emulate a less capable device.
* Under **Network**, choose Fast 3G to emulate a slower internet connection.
* Open the **Network** tool and select the **Disable cache** checkbox.

Now, let's test again.

![My site in a browser window, red warnings appear on images and show very long load times, DevTools is opened on the side and shows the Network tool with the disabled cache and fast 3G settings](/assets/element-timing/image2.webp)

This makes quite the difference. The first image on the page is now taking 13 seconds to load!

Remember to always test for performance on the devices that your users (or, ideally, your next users) are using, not only on your high-end development machine.

## Continue learning about the Performance API

This tutorial showed how to use the Performance API to create a performance overlay for images. This tutorial only really scratches the surface though. The Performance API is quite large and contains many more features that you may find interesting. To continue learning about it, take a look at [MDN's several guides](https://developer.mozilla.org/docs/Web/API/Performance_API) to get a sense of the kinds of things you could be using the API for.

More generally speaking, recording the page load and key user scenarios of your website is a very good practice that you should consider. It will help you understand how each new feature you ship impacts the overall user experience of your product. It can also help you track progress towards a performance target.

I hope this post was useful to you.
