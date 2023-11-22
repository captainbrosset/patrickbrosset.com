---
layout: article.njk
title: Freezing a page in DevTools
tags: article
date: 2023-11-22
hasCode: true
excerpt: "Some thoughts about freezing the state of a page to make it easier to inspect from DevTools."
thumbnail: "/assets/frozen.jpg"
altText: "A couple of frozen leaves"
---
A [recent discussion on Mastodon](https://front-end.social/@patrick_h_lauke@mastodon.social/111453240207940907) reminded my of this age-old problem related to inspecting webpages in DevTools: things tend to move around or disapear when you stop interacting with the page to go and do stuff in DevTools!

This is most often due to mouse hover or focus effects. The webpage might display a popup only when a specific element is hovered, or focused, which means that as soon you move your mouse away from the element, or click somewhere else, the popup disappears.

There are a few ways to work around this, which I'll list here, but I'm convinced better tools need to be invented still, and I'll provide a few ideas at the end of the post.

## Existing solutions

### Freezing the page by pausing the JavaScript execution

Once you get into the desired state, pausing the JavaScript execution might be enough to freeze the page. That's assuming, of course, that the element you want to inspect is controlled by JavaScript.

There are two ways to do this.

**If the element appears on `mouseover` events:**

1. In DevTools, open the **Sources** tool (or **Debugger** in Firefox), and keep focus in DevTools.
1. In the webpage, hover the page to make the element you want to inspect appear. Don't click in the webpage, keep focus in DevTools.
1. Press <kbd>F8</kbd>. This pauses JavaScript execution, and the element should stay visible.

See [Debug popups that appear on hover using JS](https://devtoolstips.org/tips/en/debug-js-hover/).

**If the element appears on `focus` events:**

1. In DevTools, open the **Console** tool, enter `setTimeout(() => {debugger}, 3000)`, and press <kbd>Enter</kbd>.
1. Within 3 seconds, focus the element you want to inspect in the webpage. If 3 seconds isn't enough, increase the delay in the `setTimeout` function above.
1. After the timeout, JavaScript execution will pause, and the element that appears on focus should stay visible.

See [Debug popups that appear on hover using the debugger statement](https://devtoolstips.org/tips/en/debug-js-hover-2/).

You can also achieve this by adding the `debugger` statement directly in your source code, at the right place, or by adding a breakpoint on the right line in the **Sources** tool (or **Debugger** in Firefox).

### Forcing the hover or focus CSS pseudo-classes

If the state you are trying to debug is controlled by the CSS `:hover` or `:focus` pseudo-classes, you can force this state from DevTools, without having to interact with the page with your mouse or keyboard.

1. In DevTools, open the **Elements** tool (or **Inspector** in Firefox).
1. Select the element you want to inspect.
1. In the **Styles** side panel (or **Rules** in Firefox), click on the **:hov** button. A pane appears, showing all the pseudo-classes you can force on the element.
1. Click the pseudo-classes checkboxes you want to force.

### Emulating focus on the page

If the element you want to inspect appears on focus, you can also emulate focus on the page, without your real focus actually being there.

This only works in Chromium-based browsers such as Chrome and Edge though.

1. In DevTools, open the **Rendering** tool. To do this, you can use the **Command Menu**: press <kbd>Ctrl+Shift+P</kbd> or <kbd>Cmd+Shift+P</kbd>, and type "Rendering".
1. In the **Rendering** tool, check the **Emulate a focused page** checkbox.
1. In the webpage, focus the element you want to inspect. Now, even if you click somewhere else in DevTools, the emulated focus stays on the element in the page

See [Debug popups that appear on hover](https://devtoolstips.org/tips/en/debug-popups-on-hover/)

## Looking forward

Conversations about this topic often end up with people saying _"we need a better way to freeze the page in DevTools"_. Some of it is due to people not knowing about the above techniques. Hopefully this blog post will help a bit. But sometimes, these techniques are just not what people need.

### Idea: virtual pointer

I had an idea 10 years ago, which you can see in this [Mozilla bugzilla ticket](https://bugzilla.mozilla.org/show_bug.cgi?id=1036722), of completely simulating a mouse pointer in DevTools. Here is the idea:

1. From DevTools, you'd start a virtual pointer mode.
1. Once started, the page would no longer react to your real mouse pointer, as if it was blocked behind a full page overlay.
1. A virtual pointer would appear on the page instead.
1. You would then be able to move the pointer anywhere on the page, and choose from a list of mouse events to simulate.

I even made a quick prototype back then, which you can see in action here:

![Animation showing a virtual pointer being moved around in the page, and a mouse event menu being used to generate a click event](https://bug1036722.bmoattachments.org/attachment.cgi?id=8873802)

I wonder if this is actually doable as a browser extension nowadays? You'd have to block the page with some kind of overlay, emulate focus on the page at all times, and then synthesize mouse events. Seems fairly straightforward.

### Idea: snapshoting the page's HTML and CSS

Here's an idea for a different approach that involves capturing the entire HTML and computed CSS of the page, and then displaying it in the browser.

The pros:

* It's easy to implement, the approach is very simple and robust.
* It freezes the entire page in its current state, and nothing can change anymore.

The cons:

* It produces very large amounts of HTML and CSS.
* It loses the CSS rules, and replaces all styles with inline styles instead.

It probably can be improved though, I only spend a few minutes thinking about it. With that in mind, here's how it works:

First, we need a bit of JavaScript to run on the page. This can be done by either running it from a **Snippet** in Chrome/Edge DevTools (so you can reuse it later), or just running it from the **Console** in any browser. Here is the code:

```js
(function() {
    const IGNORED_TAGS = ["SCRIPT", "LINK", "META"];

    function getDOMCopy(node = document.documentElement, target = new DocumentFragment()) {
        let mirroredNode = null;

        if (node.nodeType === Node.ELEMENT_NODE) {
            if (IGNORED_TAGS.includes(node.tagName)) {
                return null;
            }

            // Create the mirrored node.
            mirroredNode = document.createElement(node.tagName);

            // Mirror the attributes.
            for (const attr of node.attributes) {
                mirroredNode.setAttribute(attr.name, attr.value);
            }

            // Mirror the styles, skipping default styles.
            const computedStyle = getComputedStyle(node);
            const mirroredComputedStyle = getComputedStyle(mirroredNode);
            for (const style of computedStyle) {
                mirroredNode.style[style] = computedStyle[style];
            }

            // Mirror child nodes.
            const childNodes = node.childNodes;
            for (const childNode of childNodes) {
                getDOMCopy(childNode, mirroredNode);
            }
        } else if (node.nodeType === Node.TEXT_NODE) {
            mirroredNode = document.createTextNode(node.textContent);
        }

        if (mirroredNode) {
            target.appendChild(mirroredNode);
        }

        return target;
    }

    function freezePage() {
        const fragment = getDOMCopy();

        // Serialize the document fragment to HTML code.
        const serializer = new XMLSerializer();
        const htmlContent = serializer.serializeToString(fragment);

        // Replace the content.
        document.open();
        document.write(htmlContent);
        document.close();
    }

    window.addEventListener("keyup", event => {
        if (event.key === "f") {
            console.log("Freezing the page ...");
            freezePage();
            console.log("DONE");
        }
    }, {once: true});

    console.log("Ready, focus the page and press F to freeze it");
})();
```

Once this code has run, focus the webpage, get it into the state that you need, and immediately press <kbd>F</kbd>. The entire state of the page is captured and the current page is replaced with this snapshot.

As a result: the page doesn't change when you resize the browser window and the hover or focus styles are frozen in place. You can then inspect the page as you wish.

Let me know [on Mastodon](https://mas.to/@patrickbrosset) if you think this could be useful, and how it could be improved.
