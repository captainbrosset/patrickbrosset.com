---
layout: article.njk
title: The forbidden HTML
tags: article
date: 2024-11-20
excerpt: ""
thumbnail: "/assets/"
altText: ""
draft: true
---

If you're as old as me (and I'm very old), you might remember some of these. There was a time, not long after the dinosaurs died out, when the web was young and we didn't have a gazillion HTML, CSS, and JS features. Oh, what a time to be alive.

The patterns below had their time and place. They helped us all build the web, and they helped imagine better solutions to challenges we found along the way, and worked around. The web platform has evolved since then, browsers have come and gone. So these techniques are very outdated, are considered bad practices, and there are far better ways to do things now.

TODO: mention how to do these now.

## Rounded corners and fancy borders

9 nested divs to create rounded corners and fancy borders
+ spritesheet to put all of these images.

## Styling elements via HTML

applying styles via HTML tags: https://bsky.app/profile/pankajparashar.bsky.social/post/3laylsow35k2d
<center><font color=red><b>welcome to my page!</b></center></font>

## Page layout with tables

table layouts and spacer gifs
using colspan rowspan

## Custom fonts

font replacement through JS: https://bsky.app/profile/pimschaaf.nl/post/3lb2mjekk3s2v
and sIFR to replace fonts with Flash
Both were ways to use custom fonts before @font-face was a thing.
sIFR used Flash for image replacement. Each word (or letter?) was split into its own <span> and then rendered as a flash applet.
Cufon was the upgrade which used <canvas> or VML (UGH) vector graphics.
https://www.viget.com/articles/cufon-font-replacement-the-good-and-the-bad/

## Single-page apps with frames

framesets
or iframes in tables

## Storing local data

storing data on client with document.cookie
local storage didn't exist

## Debugging

debugging with alert()

## Browser detection in CSS

width:400px; 
voice-family: "\"}\""; 
voice-family:inherit;
width:300px;

## Browser detection in JS

if (document.layer) to only run on Netscape and IE5.5

## Image maps

image maps

## Pretty buttons wiht images

- lot's of images with text, when it's styled, it's an image. And text is display:none, so innacessible.

## Dealing with IE6

zoom:1 to fix IE6 issues (hasLayout)

## Blinking text

<marquee>