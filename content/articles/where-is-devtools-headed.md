---
layout: article.njk
title: Where is DevTools headed?
tags: article
date: 2017-02-01
excerpt: "Thoughts about where Firefox DevTools is headed, what its current high-level strategy looks like."
thumbnail: "https://firefox-dev.tools/images/fx-browser-developer-icon-full-color.svg"
altText: "The Firefox DevTools logo"
---
Lately I've been thinking more about the future strategy for Firefox DevTools, and so I decided to write this article. Hopefully you find it inspirational, and motivating.

### Using standard web technologies only

Browser devtools have historically always been part of browsers' user interfaces and, as such, are desktop applications, not web applications.
Now, if you look under the hood at Chrome or Firefox, you'll find that they actually are rather close to how web applications are built. Sure, they use some special APIs or languages, but their user interfaces make use of markup, CSS, and JavaScript.

Firefox DevTools is still making use of [XUL](https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XUL) markup in some places (instead of HTML), and special privileged javascript APIs or Firefox-only CSS features that haven't yet become available to web sites.

At Mozilla, we're in the process of changing this. We are aiming at only using standard and cross-browser HTML, CSS and JS. In particular, [our new debugger](https://github.com/devtools-html/debugger.html) is already just web, our inspector doens't have XUL anymore, and our console and network monitor are in the process of being converted too.

We're building tools for web developers, we need to be web developers ourselves, not Firefox developers only. We therefore need to be confronted to the same problems, and use the same technologies.

Additionally, standard web technologies allow us to run the tools anywhere the web is supported.
That means, being able to run the tools in any browser, therefore turning DevTools into just a web site.

This opens up the door to so many potential ideas: our tools could run in standalone [electron](http://electron.atom.io/)-based applications, or be embedded in code editors, or run as web extensions in other browsers, or even be hosted on a web server so they can benefit from the web shipping model.
Additionally, Mozilla's research browser: [Servo](https://servo.org/), does not support XUL or privileged JS, so if we want DevTools to be able to debug pages in Servo, this is needed.
Finally, using non-standard technologies makes it harder for web developers to contribute to DevTools.

### Shipping and experimenting better/faster

Browsers have a rather long release cycle. Mozilla Firefox for instance ships every 6 weeks and has 4 channels.
So when an engineer adds a feature, it lands on the Nightly channel and will stay there for 6 weeks (or less depending on when during the cycle they land it). Nightly then merges into Aurora and the code stays there for another 6 weeks so it can get more testing. After that comes the Beta channel, itself also 6 weeks. If everything goes fine and the feature was not removed at any stage of the way, it ends up in our release channel and becomes available to all our users.
Other browser vendors have similar release processes.

Today, DevTools is part of the browser. So it follows the same release cadence.

However, we know that the majority of our users use the Firefox release channel. This means if one of those release users runs into a bug with our tools it will take more than 4 months for us to ship that fix (assuming we actually identify and fix the problem immediately).

So we want to ship things faster. Make it possible for important fixes to make it to our release users as fast as possible. And experimenting with new features faster too.

Speed is not the only factor here. If we take the example of the web console panel for instance. We want to be able to ship new experimental console features to the users out there who actually care about and use the console.
We have systems in place that gather usage statistics, we should make use of them more intelligently in order to drive how our new features are getting enabled.

Right now, we ship our new things to pre-release channels (nightly, aurora, beta), but we have very few users there. And the ones we do have are not necessarily heavy console users. So if we ship a new console feature enabled by default only on these pre-release channels for a bit, we can't really get much feedback, and we have no way of knowing if we can trust it.

We have to wait until release for people to find out the new console feature and potentially not like it. By this time, it's too late for us to address the problem quickly. The incremental changes we will make then will have to follow the usual release cycle.

So DevTools features should ship quickly, and target users who actually need them, and be generally available behind some kind of experimental flag for a while, until they stabilise and we gather enough feedback.

### Going out of the central browser code repository

I think we need people to hack on devtools more than ever. It needs to be easy, a lot easier than it is now.
DevTools is for web developers. They are the ones who need it, they have the ideas for it, they report the bugs, they should have the means to fix/enhance DevTools on their own.

Asking them to clone a huge browser repository and build the whole browser is too much, this isn't what web developers are used to.

For instance, Firefox lives in [the mozilla-central mercurial](https://hg.mozilla.org/mozilla-central/) (or [Git](https://github.com/mozilla/gecko-dev)) repository. It is several gigabytes big, and takes a long while to build.

We've made several improvements to this, [artifact builds](https://developer.mozilla.org/en-US/docs/Artifact_builds) take seconds/minutes instead of hours because you don't build the C++, or you can just download Firefox nightly and use our [addon-based development workflow](https://developer.mozilla.org/en-US/docs/Tools/Contributing/Contribute_on_nightly). But still, we'll be making more changes to this in the future.

Contributors should have access to an enjoyable and familiar development environment.
The DevTools project should be part of the current web ecosystem. We provide the tools for it, but we're not even part of it, or use it all that much. This needs to change, big time.

Moving to [GitHub](https://github.com/devtools-html/) seems like the right choice for this. Obviously, it's not as simple as moving code from one repo to the other. There are many questions associated with it, and we're allowing experimentation time right now to figure this out.

Having said this, we already have some really strong evidence of the benefits of GitHub. Our new debugger is a very popular project. It's not just a bet, it actually works really well.
Now, imagine moving the inspector to GitHub! The debugger is really great, but way more people use an inspector than a debugger, so this is bound to generate even more excitement.

### Debug anything

Web developers don't just run their code in one browser, and they write code for both server and client. Right now, they need to learn multiple tools and switch between them often (or they don't, and web compatibility suffers).

They need a cross-browser testing and development environment. We can give it to them, we can work out the differences between debugging protocols, and we can provide single tools that they can use to target anything: NodeJS, Firefox, Chrome, Safari on iPhone, Edge, tomorrow things like Servo, etc.

If you care for the web, doing this makes sense. DevTools are for developers, not for browsers, they should help developers get the work done, not be completely different from one browser to the other just because they decided to invest in different things.

Now, that doesn't necessarily mean that there shouldn't be any differences between browser DevTools either. Browsers do invest in different things and are best at implementing different web APIs and features. And they can, in turn, make these great features available for debugging to Devtools.
After all, DevTools is just an app that connects to a debugging target that might expose different things. Firefox may have a really cool CSS layout tool, while Chrome may have better service-worker debugging. There just happens to be common tooling that can target both.

### Conclusion: an independent product

What I've described so far is nothing else than a web-based standalone product.

And this is how I think of DevTools now, as its own product. At least that is the long term vision for it. It doesn't mean that we should start creating a product right now, stop everything and do this. It just means that if everything we do brings us a little closer to that vision, step by step, then we'll be in a great position in the future. A position that allows us to do more than we do today, faster and better, and be much more of an ally for the web development community.

We need tools that web developers can enhance, reuse, customize, embed, and more. We should be web developers building a web app for web developers.