---
layout: main-layout.njk
subtitle: articles
pagetitle: A Year at Microsoft
tags: article
---
## A Year at Microsoft 🎂

<time datetime="2021-03-22">March 22nd, 2021</time>

![Photo of the Microsoft sign on the Redmond campus](/assets/microsoft-sign.jpg)

I'm almost coming up to a year at Microsoft, and I thought now would be a good time to look back and talk about it a little.

_(spoiler alert: things are great!)_

### How it all started

2020 was a very difficult year for a lot of people, but it also was the year when Mozilla had to layoff a lot of employees.

At the end of 2019, I had been at Mozilla for 6 years and I realized I was ready for my next job. I was looking to switch teams inside Mozilla, but also looking around for other jobs. So, in January of 2020, when [the first wave of layoffs](https://blog.mozilla.org/blog/2020/01/15/readying-for-the-future-at-mozilla/) was announced, it made me double down on my effort to switch.

{% include in-article-ad.njk %}

I remember our All Hands meeting in Berlin in January 2020 as a very sad one. It took place a couple of weeks after we all found out about the layoffs.\
Of course it was, as always, very nice to see everybody face to face and spend some quality team time, but it was also sad to have to say goodbye to colleagues and friends, and several of us (including myself) didn't yet know whether they would be part of the layoffs. Indeed, France has a very complicated and slow process in this case, and us Mozilla France employees didn't know if our roles were going to be eliminated or not at that point, and not for another month.

![Group photo of Mozilla remotees during the Berlin AllHands in January 2020](https://blog.mozilla.org/careers/files/2020/03/20200130-BerlinAllHands-Remotee-Group-1400x770.jpg)

Before knowing if I was going to be part of the impacted people, I had already contacted a lot of different companies and was interviewing in various places. One of which being Microsoft!

Two pretty wild things happened.

* First, I learned just one week after I interviewed at Microsoft that, yes, I was going to be part of the Mozilla layoffs 😢. Thankfully, I already knew the interviews with Microsoft had gone well, and I was going to be getting an offer. But this was cutting it pretty close!
* Secondly, I flew to Seattle for the interviews literally days before the covid-19 outbreaks started in several places, including Seattle! Just a few days later, and I wouldn't have been able to fly at all.

Anyway, I got the job 🎉

![Photo of the Internet Explorer neon sign in building 113 of the Microsoft Redmond campus](/assets/ie-neon-sign.jpg)

Out of all the jobs I was interviewing for, this was by far my number 1 choice, so I couldn't be happier. I was going to join [the Microsoft Edge Developer Tools team](https://twitter.com/edgedevtools) which meant I could continue to use my knowledge in the field of browsers and web dev tools, and do this at a company that I respected very much.

### The first few days

I'm not going to lie, the first week or so was a wild ride.

First of all, I didn't get a laptop from Microsoft until the second week, so I had to connect to the corporate network from my personal computer which didn't get me access to everything. Secondly, all of my team, including my manager, was in Redmond, USA (and still is) while I live in France. That means I didn't have anybody to ask for help during my working hours.

You can imagine how stressful this was at the beginning when all I was trying to do was be productive. I know I wasn't expected to perform from day one, people were fine with me needing time and there was a lot of training for me to do anyway. I guess it's compulsive, when you start a new job, you want to live up to the expectation you think people have of you as soon possible.

I am thankful to my colleagues and managers who took the time to chat with me, be friendly and teach me all sorts of internal knownledge I needed. If you're welcoming a new person on your team, take the time to answer any questions they have, even if you have a lot of work, this is the most important thing you can be doing for them right now.

Knowing that I wasn't going to be meeting people for real any time soon, I spent time introducing myself personally to each and everyone on the team, one by one. I learned a lot about people doing so, we would share stories of what we'd been working on before, etc. and this helped a lot feeling like I started knowing them a little better.

I also made it a point to have several one-on-one meetings per week. First of all with my manager of course, but also with other colleagues. I still do this today, and I really enjoy being able to see people every once in a while.

To this day, I still haven't seen anybody from my team for real! Ok, I did see my manager, and her manager, when I interviewed, but I never once met the other engineers on the team for real. What's more, people here often face mute during our daily [Teams](https://www.microsoft.com/microsoft-teams/group-chat-software) calls, so there are a few people who I've literally never seen.

Here's what I usually see when I'm on a call, initials or avatars, and sometimes a couple of people who have their cameras on:

![Screenshot of a Teams call with everyone face muted](/assets/face-muted-team.png)

Note that I totally understand why someone would face mute and I also need to do it from time to time. It's just that in my situation I lack the human element a little bit.

### Things I've done

After settling in the new job, I quickly became productive. I was assigned to a project that I really liked, with people who helped me learn the environment and become comfortable with the day to day work.

My background working on DevTools at Mozilla became immediately useful to me as the things I worked on now were very similar, and I had expertise in this domain that proved useful.

I couldn't be happier to be working on CSS Grid tooling again, but this time for Chromium. This was in collaboration with the Google team, which was exciting. I could use my CSS layout knowledge, my experience from having built something similar in Firefox, and work with a super smart team of PMs, DevRels, designers and engineers across 2 companies.

Since then I've participated in several projects. Here's a quick list:

* [CSS Grid tooling](https://docs.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/css/grid): new overlay to see rows, columns, gaps and areas and a new Layout panel.
* [Flexbox tooling](https://docs.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/whats-new/2021/01/devtools#css-flexbox-debugging-tools): same as above, but for flexbox, and we also added abunch of Styles pane features to make sense of the various flexbox properties (learn more in [this other article I wrote](/articles/2021-02-02-4-Weird-Tricks-To-Become-A-10x-Flexbox-Engineer)).
* [Jump to CSS variables](https://docs.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/whats-new/2020/11/devtools#css-variable-definitions-in-styles-pane): a way to jump from a CSS variable usage to where it's defined in the Styles pane.
* [Focus Mode and DevTools Tooltips](https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/DevTools/FocusMode/explainer.md): a new UI for Edge DevTools, to group similar tools together in presets, and a help mode that gives documentation about the tools, directly within the tools (if you're curious, I wrote about [how we made the tooltips](https://medium.com/web-on-the-edge/how-we-built-the-devtools-tooltips-4e9933abbd8a)).
* Fixed a bunch of bugs in the CDP [screencast](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-startScreencast) methods to make size and colors more predictable.
* And fixed [many different bugs](https://github.com/ChromeDevTools/devtools-frontend/commits?author=captainbrosset) across DevTools.

### Going back to coding

Prior to joining Microsoft, I had been a manager for 5 years. In fact, I have been going back and forth between management and coding a couple of times already, even before Mozilla.

Even if I originally wanted a management role at Microsoft, there wasn't one for me to fill at the time. Microsoft is quickly re-inventing itself when it comes to working remotely and across timezones, but it isn't ready yet to have managers who are remote from their teams. So I came in as a senior software engineer, and that's great. I far prefer knowing what it's like to be coding in this environment before becoming a manager again maybe one day.

Overall going back to coding hasn't been as hard as I expected it to be. I've needed to flex some muscles that had atrophied a little bit lately, but I knew JavaScript and CSS so that part came back quickly. [TypeScript](https://www.typescriptlang.org/) was new to me, but I immediately liked the comfort that gave me while working in [VS Code](https://code.visualstudio.com/), and it is sufficiently similar to JavaScript that it was simple to make sense of it.

The hardest part was C++. I had done a little bit at Mozilla, but C++ has so many features that it's sometimes really hard to read. I had to step up my game quite significantly since the entire DevTools backend was written in this language. I had no choice but to dive in. Thankfully, browsers are such huge codebases that whatever you want to do has probably already been done somewhere else in there, so it's usually a matter of finding the code you need and adapt it (and for this [the chromium code search website](https://source.chromium.org/) is invaluable).

Now, after almost 1 year coding again, I have to say I still really enjoy it but I also know that this is not the end game for me. I love working on the product side of things, writing articles, communicating with users, planning work, defining strategies, managing people and projects, and more. There are many aspects of the software development world that attract me greatly on top of the pure technical part.

### The pros and cons

Let's wrap this up with a simple list of pros and cons related to this year at Microsoft.

_Take this with a grain of salt: this is based on my own experience and may vary for you if you're starting at or looking to join Microsoft._

#### The good stuff

* _Customer focus_:\
  I don't think I've ever worked at a company that is more customer-focused than Microsoft. It is very reassuring to know you're working on the right features for your end users.

* _No after thoughts_:\
  Microsoft takes things like accessibility super seriously. A lot of places don't really think of this as part of the normal coding work and often forget about i, or just do it as a best-effort-when-we-have-time kind of basis. It's not the case here, we've got processes and tools in place to track this and work on it along with the other "normal" coding tasks, and you just don't get to ship without it.

* _Investment in DevTools_:\
  Edge invests in its DevTools, it isn't just a thing we need to do because other browsers have it too. We're based on Chromium, so we could very well not do anything. But we do invest in it. We have our own strategy for it and dedicate a fair level of investment for it.

* _PM-driven_:\
  The work we do is driven by our product managers. We can count on them to give us the right priorities and requirements. At the same time, we also have flexibility as engineers. We can dedicate a bit of our time to work on side projects, we can come up with prototypes and propose new features and we have opportunities to learn. Our PMs and managers are also very receptive of us spending time on paying off technical debt, so we got secured time for this as well.

* _Google_:\
  Collaborating with the Chrome DevTools team (since we both work on Chromium) has been great. It's exciting to make the tools better for many more people than just the ones using Edge.

* _Evolving_:\
  Microsoft is constantly evolving. Even though it's huge and old, it moves really fast. I think we get the best of both worlds: we're allowed to make changes to how we work and be more agile, but we also have access to all of the services we need by virtue of being part of such a huge company.

#### The not-so-good stuff

* _Timezones_:\
  I'm used to working remotely and with a geographically distributed team, but this is different. Now (almost) all my colleagues are in Redmond so their days start when mine ends. I can't really shift my working hours because I've got family stuff I want to do. Being shifted from my team means that:
  * Emails, messages, notifications, etc. start getting super intense right when I'm supposed to be winding down and helping the kids or cooking dinner. It makes it hard to be in the moment with my loved ones, hard to disconnect.
  * In the morning, when I get back to work, I have a ton of email and chat messages to sort through. Sometimes it can be hard to even start when you see this, you feel sort of blocked, like you suddenly have so many different things to do at once (my coping mechanism for this is going through them slowly, not all at once, to avoid forgetting about things or feeling too stressed out).

* _Seeing people_:\
  I still haven't seen anybody from my team in real life! This has nothing to do with Microsoft. I'm sure that, barring covid-19, I'd already have gone to visit them a few times. I can't wait for people to be vaccinated and for borders to be open again. I'm longing for a week of team building/morale event somewhere nice together where we can get to know eachother for real and not only talk about work through a video camera.

* _Remote friendly_:\
  Microsoft isn't super remote friendly yet. Covid-19 is forcing it to be a bit more, but it's obvious that it hasn't traditionally been used to this way of working.

* _Google_:\
  I said collaborating with Google was good previously, but it has also had its down points. We used to have co-ownership of the codebase, because we know parts of the code as much as they do. But [they recently decided that DevTools was a "part of the product"](https://groups.google.com/a/chromium.org/g/devtools-dev/c/uRVqlHRfQ4k) and they wanted to be able to move fast without having to ask permission. What that means is they took away any non-Google owners from the code. It doesn't mean we don't collaborate anymore, Chromium is still open source and we still send a lot of changes to it, but we don't really have a say in where Chromium DevTools is going now.

<hr>

Let's end on a positive note 😊: I love my job, my colleagues are super smart and nice human beings, our team is functioning well, and I work on things that motivate me! On top of this, Microsoft as a company has not disapointed me at all, on the contrary, I've been surprised by how well things have been and the level of support I'm getting. I also think there are nice opportunities for me here to keep evolving my career. I would definitely recommended working here.

![Photo of my new DevEx hoodie with the Microsoft Edge logo on it](/assets/devex.jpg)