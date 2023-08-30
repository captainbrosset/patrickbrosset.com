---
layout: article.njk
title: Please take full window screenshots in product documentation
tags: article
date: 2023-08-30
excerpt: "Why full window screenshots are way better than cropped ones, and how to take good screenshots to communicate effectively about your app"
thumbnail: "/assets/full-window.png"
altText: "A browser window screenshot"
---
When you're documenting an application, reporting a bug about it, or just chatting about it with colleagues, it's common to have to share screenshots of the app. Please do everyone a favor and take **full window screenshots** when you do.

I know this, because I write a lot of technical documentation for various browser stuff. So I need to take a lot of screenshots of browsers. When I started out, I used to take cropped out screenshots that would only show the area of interest. For example, if I was writing about the browser's settings, I would only capture the settings page, and not the entire browser window. I thought I was being clever, and saving people time by not making them look at irrelevant parts of the screenshot. But, in reality, I was being lazy, and causing a lot of problems.

**My point is: full window screenshots provide context that cropped screenshots just don't**. When you see the entire window of an app, you can recognize the app and get a general sense of directions. When you see a small sub-part of an app only, you might have no idea where you are and how to get there.

Here's an example of a screenshot that's not so great:

<div class="no-border">

![An example of a cropped out window screenshot where only a part is visible](/assets/bad-window-screenshot.png)

</div>

In this screenshot, unless you've been reading the documentation that (hopefully) came before it with attention, it'll be very hard to know what you're looking at. Where is this in the app? What's important to see in the screenshot?

Here's a better screenshot:

<div class="no-border">

![An example of a full window screenshot where we see it's a web browser, with DevTools opened, and a few areas are highlighted with red boxes](/assets/good-window-screenshot.png)

</div>

In this screenshot, the entire app window is visible, so it's clear you're looking at a web browser which has DevTools in it. Because the full window is visible, its borders are visible too, which avoids white areas of the image to blend in with the white page background (if you're using the Light theme on my site). It also has red boxes in a few places to attract attention to specific areas of the screenshot.

### How to take good screenshots

Here's my list of tips for taking good screenshots, I hope it's useful.

#### Make the window as small as possible

First, prepare the window you want to capture. There's no need to make it super big. If you have a large monitor and maximized the app's window, you will need to un-maximize it so its boundaries are clearly visible against the desktop background. And then, make the app window as small as possible while preserving all of the details you need to capture. The smaller you make it, the easier it will be for other people to make out the details.

#### Remove customizations

The same application can look very different on your computer and on someone else's computer. Sometimes because you've applied a theme at the OS level that impacts the application, other times because that application supports plugins that change its appearance.

If your screenshot is supposed to be seen by other people, it's best to remove all customizations and go back to what most people would see when they first install the app. This includes:

* Switching back to your OS's default theme, if that theme impacts the app.
* Switching back to the app's default theme, if the app also supports its own themes.
* Disabling all plugins or extensions which may impact the app (e.g. browser extensions which add icons into the toolbar).
* Turn off any app setting you might have changed from the default. Many apps expose user settings to customize their toolbar for example.

Generally, you want to make the app look as close to its default state as possible, and as uncluttered as possible.

#### Remove background clutter

When taking a full window screenshot, a tiny fraction of the background behind the app will be shown too. On Windows for example, the thin 1px border around an app's window may slightly blend in with whatever's behind it. This may create tiny artifacts in the screenshot that will make it less clean.

To avoid this:

* Hide all desktop icons.
* Set your desktop background to a solid color, ideally white.
* Hide all other windows.

#### Capture the entire window

Once you've done all of the above, you're ready to capture the screenshot. That's when you want to capture the entire window, not just a part of it.

On Windows, I suggest using the **Snipping Tool**. On my Windows 11, I can just press <kbd>Windows key + Shift + S</kbd> to open it. I think it's also possible to bind it to the <kbd>Print Screen</kbd> key. **Snipping Tool** lets you either define a rectangular area by hand, or set it to Window mode. Do that! Once you set it to the Window mode, you can just click on the window you want to capture, and it'll capture the entire window.

On macOS, you can use the <kbd>Command + Shift + 5</kbd> shortcut to capture an entire window.

#### Highlight areas of interest

Finally, it's time to post-process the screenshot. Think about what readers of your documentation will need to see, and highlight those areas.

For example, if the steps you wrote before the screenshot say things like "click X, then click Y, the result appears in Z", you should highlight X, Y, and Z in the screenshot. This will make it easier for readers to follow the steps. Instead of having to look at every little detail in the screenshot, they will immediately know where to look.

To do this, I often just use Paint on Windows. It's simple and does the job very easily. I just use the rectangle tool and set the color to red, and then draw red boxes around the areas of interest.

A few things to keep in mind:

* Red works well in most cases. Grey, white, or black will risk blending in with the UI in the screenshot. Bright yellow might also be a good option, but I often find it harder to spot than red.
* Choose the thickness of your red boxes carefully. Too thin and users won't see it. Too thick and it'll hide important parts of the screenshot.
* Where to draw the red boxes is also important: if you spend time aligning your red boxes to be perfectly around a panel, for example, then there's a risk someone would confuse this red box with an actual border in the app's UI. So don't be too precise. It's better to draw your boxes slightly too big or slightly too small, just so they stand out more.

---

I hope this was useful! If you have any other tips for taking good screenshots, please let me know on [Mastodon](https://mas.to/@patrickbrosset)!
