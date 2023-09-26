---
layout: article.njk
title: Making websites 20 years ago
tags: article
date: 2023-09-25
excerpt: ""
thumbnail: ""
altText: ""
draft: true
---

So you're young, or you just started your web development career, great! Welcome! I'm really glad you're here, that you joined our industry, I hope the community makes you feel welcome, and that you stay for as long as possible.

We need more people like you to make websites. We need humans to produce real and useful content on the web. Also we need more personal websites, so if you don't have one yet, what are you waiting for?

Anyway, back in 2000~2001, I started getting interested in building websites. I was pretty bad at computer science and, like, "real" programming. But I fell in love with HTML and I spent hours designing random stuff in Photoshop. So I started creating simple web pages. Later, between 2004 and 2006, I go my first job as an actual web developer/designer. I worked at Zoe Communications, a tiny company based in Wellington, New Zealand. That's where I got my very first professional web development experience, designing and building websites for other tiny New Zealand companies. Zoe Communications doesn't exist anymore, and the websites I worked on at the time either, but some of them are still accessible on the web archive.

Today, what I want to do is take you on a journey of how websites were built almost 20 years ago. Or, at least, how I built websites back then.

In 2004, CSS wasn't the multi-headed beast it is today, which can do everything, from typography, to animations, design, and layout. The iPhone hadn't been introduced, and people still surfed the web on their big desktop computers, like cave people. Websites were pixel perfect and didn't adapt to other viewport sizes. Internet Explorer was still here and, in fact, dominated the browser market. Firefox was in its first version.

So, it's fair to say that things have changed quite a bit! In fact, things might feel overwhelming, with so many web features to keep track of, but also too many tools, frameworks, and people telling you how to do things the right way. It's a lot easier to create beautiful, cross-browser, accessible websites today. For the rest of this article, let's review a bunch of my old sites, and focus on a few details. We'll then compare how these were made 20 years ago, and how they can be made today!

### Rounded corners

[Zoe's website, circa 2006](https://web.archive.org/web/20070127092926/http://zoe.co.nz/) had rounded corner tabs at the top, that were used to navigate between the different areas of the site:

![The tabs at the top of the zeo.co.nz website](/assets/zoe-tabs.png)

These were basically just links to the various web pages, but they were made to look like tabs. And like many tabs, they had rounded corners. Except, at the time, rounded corners weren't really a thing in CSS. Firefox had a vendor-prefixed version of it. Most browsers started supporting the `border-radius` property between 2010 and 2015 only.

So, how did we get rounded corners 20 years ago? Using background-images!




https://web.archive.org/web/20040524191436/http://www.jesters.co.nz/
https://web.archive.org/web/20070519092951/http://www.sams.org.nz/
https://web.archive.org/web/20061007162932/https://www.westplaza.co.nz/
https://web.archive.org/web/20070129023130/http://www.bayplaza.co.nz/
https://web.archive.org/web/20041201195529/http://www.thinkmoney.co.nz/
https://web.archive.org/web/20051103092557/http://www.mmiller.co.nz/
https://web.archive.org/web/20060715232544/http://www.nzfilmcomposer.com/
https://web.archive.org/web/20060429115213/http://www.navigate-international.com/
https://web.archive.org/web/20061211043241/http://www.ltmcguinness.co.nz/
https://web.archive.org/web/20070628130720/http://www.fortune500music.co.nz/
https://web.archive.org/web/20060426185219/http://www.arthritis.org.nz/

- if it looks like a table, then it's a table
- also table layout for the whole page. For columns.
- fixed width, no mobile support
- lot's of images with text, when it's styled, it's an image. And text is display:none, so innacessible.
- Navigation items too, with hover effects. All images, with hidden text.
- Entire frame around website are fixed-width images, with divs just to hold them. Slices of a design made in Photoshop.
- Page title/header as images, as background, not even an h1.
- Flash animations!
- GIFs!
- Buttons as links, which contain images.
