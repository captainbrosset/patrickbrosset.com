---
layout: article.njk
title: "What's missing from the web to support transparent browser restarts?"
tags: article
date: 2026-09-11
excerpt: "Could new web storage capabilities help sites preserve temporary state across browser restarts, crashes, and discarded tabs?"
thumbnail: "/assets/session-bucket.png"
altText: "On the left, a cracked browser window contains four colored shapes (a red circle, green square, blue triangle, and pink pentagon), representing application state. An arrow points to a central storage bucket holding the same shapes. A second arrow points from the bucket to an intact browser window on the right, where the shapes have been restored."
---

Could browsers restart without negatively impacting user experience?

Why would we need this? Because of security of course.

If you've been paying attention, you've seen that all major browsers now release new updates much more frequently than they used to. Down to two weeks in fact. This is mainly due to wanting to quickly patch security vulnerabilities because attacks have been getting more numerous, faster, and more sophisticated. And AI is only making this worse.

So releasing new updates quicker and restarting the browser more often is a good thing.

One blocker, though, is that end-users have learned, through many years of bad experiences, that closing a tab, let alone restarting the browser, is _a very bad thing_. You risk losing your work, your state, your session, and so on. And they're mostly right, many sites don't survive a restart.

Browsers might need to start forcing restarts to get users to update.

But a forced restart isn't the only case where we need to consider maintaining a good, continuous user experience.

What if the browser crashes? Or what if the device decides to unload a tab because it's low on memory, and restore it when the user returns?

Storing session-associated state seems important for sites to survive transitions like that.

Could the web grow new capabilities that make it easier for sites to restore their states without requiring a bunch of complex code, and without having to store too much data either?

## Why would you want to store data on the client-side?

I mean, why not store state on the server-side? It would survive anything that happens in the browser or device. Your server could have a database for persistent storage, and some mechanism to also store session-based data, for signed-in users.

The thing is, however, not all web apps have databases, session management, or even a backend at all. Not all apps let users sign-in.

Some data only belongs on the client-side. Here are two examples:

- A shopping cart which you want to persist even if the user hasn't signed in yet.
- A photo editing app where the user can drop files onto the window to start working on them, saving those files locally to survive a reload.
- A long survey you want to let users stop and continue later, without losing their progress.

In these use cases, and in many others, there's a need for storing different kinds of structured, and potentially large, data on the client-side, _temporarily_.

How long is temporary? What is a client-side session anyway?

Typically as long as the browser tab which the user is working in is open. Once the user actively closes that tab, the session is considered to have ended. A forced restart, a sleep and wake cycle, or a crash shouldn't signal the end of a session.

## Why not use sessionStorage?

The `window.sessionStorage` API is the web's only mechanism for storing session-bound data on the client-side. So we already have the right session semantics in the browser.

In reality, though, and I don't claim to understand this, things are more complicated than `a session = a tab`. It's a useful mental model, but it breaks down around things like `window.open()` or opener relationships.

Unfortunately, the `sessionStorage` API is very limited. It only allows storing string key-value pairs, it has a very small size limit, and it's synchronous, which can block the main thread. It simply isn't enough for many real-world use cases.

## So, just use IndexedDB or the file system!

The web has other wonderful storage mechanisms:
- IndexedDB: An asynchronous, low-level API for storing large amounts of structured data, including files/blobs.
- OPFS: The Origin Private File System, which allows web apps to asynchronously store and manage files in a sandboxed file system.
- Cache: The Cache API allows web apps to asynchronously store network request and response objects.

The problem is that these storage mechanisms are designed for more permanent storage. They don't have the same session semantics as `sessionStorage`. Data stored in IndexedDB or the file system will persist beyond the lifetime of a single tab or window, which can lead to privacy and storage concerns for temporary data.

Users probably don't want temporary files to persist for years on their device. The device might be shared between multiple people using the same browser profile. Disk space might be limited.

## Approximating session storage

You could also use both session storage and IndexedDB (or other) together. Store a key in session storage, and use this key to index your session-bound data in IndexedDB. When you detect that the key is no longer present, you delete the associated data in IndexedDB (or elsewhere).

That's doable, but complicated. And there's no guarantee that the user will run your app again after a session has ended, giving you a chance to clean up your data. You could end up with a lot of orphaned data.

You could try to _detect_ the end of a session yourself. After all, there are events you can listen to, right?

Well, the `unload` event is getting deprecated and, especially on mobile, it is not reliably fired. The `unload` event is also not compatible with the back-forward cache which browsers use to speed-up back and forward navigation.

The `pagehide` event works better with the back-forward cache, but is also not reliably fired, especially on mobile.

The `visibilitychange` event is a better approximation of the end of a user's session, but it's still not perfect.

There is no truly reliable client-side event that corresponds to _"the browser has decided that this browsing session is over"_.

The lack of adequate session-bound storage APIs makes it challenging for sites to implement good user experience, and so they usually don't.

## One possible solution: apply browser-managed session semantics to other storage APIs

The browser already manages the concept of a session, and it makes sense for the browser to be the one managing it. After all, the browser (and the OS that runs it) is the one that may crash, put a tab to sleep, restart, or otherwise terminate a session.

While adding an event that fires when a session ends might be useful, better session-bound storage mechanisms would provide a more robust solution, which doesn't require developers to implement their own session management logic.

The session semantics which are used by the `sessionStorage` API could also be used by other APIs such as IndexedDB.

There's already a thing called _buckets_ on the web, which could be useful. The [Storage specification](https://storage.spec.whatwg.org/#model) defines a bucket as a container for different storage APIs, such as IndexedDB, OPFS, and Cache, and which has its own lifetime semantics.

So it's mostly a hidden concept, which developers don't often manipulate directly. But browsers already manage buckets' lifetimes. They already are able to evict a bucket when there's a need to free up space for example. It feels natural to extend this concept to allow developers to create session-specific buckets.

If you've already used `navigator.storage.persist()`, then you've already interacted with a bucket, perhaps without realizing it. The `persist()` method is a way for you to request that the browser not evict a bucket, and to keep it around for as long as possible.

So, perhaps the solution here, is to create an API, maybe something like `const bucket = navigator.storage.createSessionBucket()`, so you can then create an IndexedDB database, OPFS data, or Cache storage within this bucket, and have it automatically follow the same session lifetime semantics as `sessionStorage`.

Turns out, session buckets have [already been in discussions for a while](https://github.com/whatwg/storage/issues/71).

Buckets are a convenient place to put a lot of new APIs and functionalities. Buckets tend to be a good place because you add them once, and then get their specific lifetime characteristics for all the APIs that use them. It seems like the right primitive for the issue at hand.

## What do you think?

* Is the solution to implement session buckets, and make them available to all storage APIs?
* Do you have a use case that would benefit from this?
* Do you have other ideas?
* Do you want to say hello?

Then just send me a message by replying to these threads:

* [On Mastodon](#)
* [On Bluesky](#)
* [On LinkedIn](#)
