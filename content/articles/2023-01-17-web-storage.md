---
layout: main-layout.njk
subtitle: articles
pagetitle: (Almost) everything about storing data on the web
tags: article
---
## (Almost) everything about storing data on the web

<time datetime="2023-01-17">January 17th, 2023 (last update: February 1st, 2023)</time>

![Container boxes in a harbor](/assets/storage.jpg)

Imagine you're building a web application and you want to store some data locally on the user's device. This could be because this data is only needed on the client-side, or it could be because you want to offer some kind of offline access to the your app's content.

To do this, you'll need to store data on the device that's running your app. You might be asking yourself:

1. Can I actually store all the data I need?
1. Can I trust the browser to really persist it?
1. How much space do I have?

The answers are better than you might think:

1. Can I actually store all the data I need? **Sure, you can store all kinds of data, and a lot of it too.**
1. Can I trust the browser to really persist it? **Yes you can.**
1. How much space do I have? **A lot, in most cases!**

But as always, the devil is in the details! Let's try to dive into these details.

### What are my options?

There are multiple ways to store data on the device, from your web app:

* Web Storage, namely `localStorage` and `sessionStorage`.
* IndexedDB (let's call it IDB for short).
* Cache API.
* The Origin-Private File System API (or OPFS).

There are others too, but these are the main I can think of. Each have their own use and their own pros and cons.

#### Web Storage ([docs](https://developer.mozilla.org/docs/Web/API/Web_Storage_API))

Web Storage is simple and well supported, but should only be used for very simple needs. They can only hold strings, and are limited to 5MB each. They're also synchronous, and can't be used in workers.

Being synchronous means that any data access will block the main thread of your app, potentially making it slow to respond.

Not being available in workers is a problem too if you're considering using a service worker in your app for offline scenarios for example.

#### IndexedDB (or IDB) ([docs](https://developer.mozilla.org/docs/Web/API/IndexedDB_API))

In theory, IDB is great. Its API is asynchronous, it can be used in workers, and it can store pretty much anything. In practice, I find the API quite hard to use.

I personally have never used it directly without an abstraction. In fact, for simple key/value pair use cases, consider using Jake Archibald's [idb-keyval library](https://github.com/jakearchibald/idb-keyval).

The amount of data you can store in IDB can be huge! Ultimately it will of course depend on the amount of data available on the device. Read on for more information about storage quotas.

#### Cache API ([docs](https://developer.mozilla.org/docs/Web/API/CacheStorage))

The Cache API is super useful when you use a [service worker](https://developer.mozilla.org/docs/Web/API/Service_Worker_API), and intercept network requests by using the `fetch` event. With this API, you can store and retrieve server responses programmatically, and make your app resilient to network problems.

The API is quite straightforward to use. The harder part is understanding the different options available to you to implement a good offline scenario in your app.

The API can be used in workers, and is asynchronous.

Finally, the amount of data you can store in the cache can, here again, be huge. More on that later.

#### OPFS ([docs](https://web.dev/file-system-access/#accessing-the-origin-private-file-system))

The Origin-Private File System API is based on the File System Access API. So let's talk about that first.

The File System Access API can give you access to the actual file system on the device, as long as the user grants you the access. This might be really powerful if you're building an app that deals with actual user files, like a text editor.

However, this API is out of scope here. The content you store lives in files that the user has control over. The content does not live in browser-managed storage space. What I'm really interested in here is browser-managed storage that's transparent to users.

The Origin-Private version of this API gives your app a _virtual_ file system. This file system is just for your app's origin, and you can use it to store directories and files. The files aren't necessarily possible to find on the user's device. In fact, they might not even be stored as individual files at all. The browser implementation ultimately decides how to store these. But, from your app's point of view, it's a real file system you can use as normal.

The origin-private file system can be useful in many cases, for example when you need to store media files for offline access via your app only, or game assets.

This API is asynchronous, which means that it won't block your app's main thread while trying to retrieve a file. It's also subject to the same storage quota that IDB and Cache storage are subject too, discussed later in this article.

OPFS is implemented in chromium-based browsers and in Safari. It doesn't work in Firefox yet.

**In need of a SQL database?**

While we're on the topic of OPFS, if you are in need of a more traditional database on the client side, and are interested in using SQL queries, perhaps because that's what you're used to on the server side, you might have heard about WebSQL. You should know that **WebSQL is deprecated** and being removed from browsers where it was implemented.

But, you might be interested in learning that SQLite, the popular SQL database, comes as a wasm build as well which you can use directly in your web app. This version of SQLite is backed by OPFS. It's therefore subject to the same storage quota as OPFS. It also runs in a worker, keeping your app responsive while storing or querying data.

If you're willing to add a couple hundred KB to your app's download, then that's a great option to consider. Check out the [project page](https://sqlite.org/wasm/doc/trunk/index.md), and this [web.dev article](https://developer.chrome.com/blog/sqlite-wasm-in-the-browser-backed-by-the-origin-private-file-system/) for more information.

### How is data stored in the browser?

Let's leave Web Storage aside. For now it has its own dedicated storage mechanism. However, everything else is handled via a storage management model that's defined in the [Storage spec](https://storage.spec.whatwg.org/).

The theory is as follows:

Each of the storage types mentioned before is called a _storage endpoint_. Each storage endpoint stores its data in a _storage bottle_. There's a bottle for IDB, there's one for Cache, etc.

Bottles are stored in _storage buckets_. Buckets are either _best-effort_, or _persistent_. A bucket that's best-effort (also known as temporary) can be emptied by the browser when needed. A persistent bucket can only be emptied by the user. More about temporary and persistent storage later.

Buckets are stored in _storage shelves_. And there's one shelf per origin.

My understanding is that there's only one bucket per shelf for now. This might change in the future to allow the browser to deal with an origin's data more flexibly.

And finally, the whole thing is stored in a _storage shed_, of which there's only one in the browser.

In short:

* When it comes to storage, the browser is like a shed.
* The shed has several shelves inside. Shelves are separated, and there's one per origin.
* There's one bucket per shelf (this might change in the future).
* Each bucket is filled with bottles.
* There's one bottle for Cache, one bottle for IDB, etc.

The above is only the theory from the spec though. How much of it is implemented in browsers, and whether things are actually implemented this way might vary.

### How much do I get?

As said earlier, an origin can store up to 5MB of local storage and 5MB of session storage. Other storage options are managed by the Quota Manager, and the rest of this section will focus on those only.

Browsers are free to do whatever they want here. How much they give you has changed over the years, and will probably keep changing.

It's also very hard to find up to date information about this. The [information on MDN](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Browser_storage_limits_and_eviction_criteria) doesn't seem up to date or correct (I filed an [issue](https://github.com/mdn/content/issues/23557) about it). The most up to date reference on this topic is [this web.dev article](https://web.dev/storage-for-the-web/).

Below is what I found by reading docs, asking people, and experimenting on my own devices and virtual machines (with [this simple test app](https://chivalrous-attractive-dosa.glitch.me/)).

It's fair to say that an origin can store quite a lot of data on a device these days.

#### Safari

Safari lets your origin store 1GB of data. After that limit is reached, it requests the user to approve the additional storage space. For example, if the app tries to store 100MB above that limit, Safari asks the user for permission. If the storage needs continue increasing, Safari keeps on asking the user for permission.

I am not sure how much Safari will let the origin store at a maximum, or whether there is a maximum at all. While testing, I was able to just continue allowing the app to store more and more data and my device eventually filled up. In the end, a JavaScript error was raised in the app, and the code couldn't store any more data.

This 1GB quota is already quite comfortable for many app use cases. If your app has very specific storage needs, like storing big media files, then the fact that Safari lets you store even more as long as the user approves it is nice.

Note, however, that the WebView version of Safari (which other browsers must use on iOS devices), and other browsers that use WebKit (like the GNOME Web browser), seem to just stop at 1GB and don't ask the user for more storage space. When this hard limit is reached, a JavaScript error is thrown in the code that attempted to store more data.

#### Chromium

I say Chromium here, because that's what I tested ([downloaded here](https://download-chromium.appspot.com/)). I believe Chrome and Edge (which are both based on Chromium) do have the same storage rules as what's in Chromium, but really, any Chromium-based browser is free to deviate from those rules (although that's probably unlikely).

Chromium can use up to 80% of the total disk space for storage. However, out of this 80%, Chromium is willing to dedicate at most 75% to a single origin. Now, 75% times 80% is 60%. So each origin, in Chromium, can, in theory, use up to 60% of the total disk space.

This doesn't mean an origin can actually use the entire 60%. This percentage is calculated based on the **total disk space** of the device.

For example, if your device has a 20GB hard drive, then Chromium will theoretically let an origin use up to 12GB (20GB * 60% = 12GB) of storage space. This might not actually be possible. The operating system and other files also stored on the device might use more than 8GB, therefore leaving less than the 12GB quota Chromium says your origin can use.

In one of my tests, I was able to fill the entire disk space on the device before reaching the 60% limit. When this happens, a JavaScript error is raised, and the origin just can't store any more.

In another test, I was able to reach the 60% limit before filling up the disk. Here again, a JavaScript error is raised, and the origin is prevented from storing any more data.

Now, imagine a mobile device with a 64GB drive. In theory, an origin could store up to 38GB (60%). Now the operating system might use 10GB, and imagine that other apps and files use 40GB. This leaves your origin 14GB of actual quota, which is huge, even for a media app that stores audio or video files.

Note that when using the incognito or private mode in a Chromium-based browser, the quota is different (usually much lower), and the data disappears when the private browser window is closed.

#### Firefox

Firefox will let your origin store up to 10% of the total disk space by default.

Obviously, 10% is a lot less than the 60% Chromium allows. But even if the device the app runs on has a 64GB drive (which isn't that much by today's standards) that means your app could store up to 6GB of data which should be enough even for media-type apps.

Once the origin reaches the maximum storage space Firefox allows, an error is thrown, and the origin can't store any more data.

Note that 10% is only the default however, your origin will be allowed to store up to 50% of the total disk space if your app asks for _persistent_ storage space. More on persistent vs. temporary storage later in this article, but what's important to note is that all origins start as temporary storage by default.

### Can I check how much is left?

Yes, and no.

You can use the [Storage Manager API](https://developer.mozilla.org/docs/Web/API/StorageManager) via the `navigator.storage` object to discover how much your origin currently uses, and how much more it can use.

To do this, use `navigator.storage.estimate()` (which returns a Promise). This particular method is not implemented in Safari unfortunately (while the rest of the Storage Manager API is).

It's very important to note that the `estimate` method will **not give you the real amount of available storage**. It will tell you what your origin's quota is, and how much of it you've already used, but it won't tell you how much data your origin can really store, which might be less than the defined quota since there may be other things on the device too. This is for security reasons, to avoid fingerprinting.

Therefore, the API will report 60% of the total disk space on Chromium, and 10% on Firefox (or 50% if the origin is persistent).

You can use this result to get a rough idea of the storage capacity of the device and offer features in your app based on this, then let the user choose whether they want to use those features or not.

### Temporary vs. persistent data

All storage endpoints start as _temporary_ (or _best-effort_, as noted earlier). This sounds much scarier than it really is though.

It means that if there isn't enough space left on the device, the browser can start emptying its storage shed, origin by origin (or shelf by shelf).

The way the browser does this is, again, specific to its implementation. It's very likely to start removing the data from origins that haven't been used by the user for a long time first. In fact, Safari does this preemptively and deletes the content stored by origins that haven't been used for seven days.

If the device your webapp runs on has plenty of space, there's not much to worry about. For example, think of a laptop with a 500GB hard drive that still has 250GB free. In this situation, even if your data is considered temporary there really isn't a reason to worry about it being evicted, except on Safari if your app isn't used for weeks at a time.

If your app really needs to store data without which it just can't function, or if this data is important to your users and there's nowhere else to save it, you can ask for the data to be persisted for real.

Use the `navigator.storage.persist()` function to request permission to use persistent storage. This promise-based API is supported in all browsers, and will request the user permission.

Once your data is considered persistent, the browser can no longer evict it silently, and only the user can do it on purpose via the browser UI.

You should think twice before making your data persistent. Do you really want to be responsible for filling up your users' devices? Does your feature really need this? If you're building a media app that stores big files for offline support, then your code should deal with the fact that stored files can disappear. As a user, I actually think it's nice that the browser deletes stored files automatically for me when my device is full.

So keep this in mind, and design your app accordingly.

### How does eviction work?

The logic is, again, browser-specific, and can be pretty complicated quickly. This section is not complete yet, and I will keep updating it as I find more information.

#### Safari

Safari seems to evict data from origins that haven't been used in the last seven days

#### Chromium

In Chromium, when a device is low on storage space, the browser starts evicting data for the origins that were least recently accessed.

As said previously, the browser is willing to use up to 80% of the total disk space overall (even if each origin is granted 60% of the total disk space maximum).

When a user visits many different sites and apps, and if each of these origins use a little bit of their quota, there will come a point at which the browser exceeds its 80% overall limit.

At this point, Chromium will evict the origin-stored data for the least recently accessed origin, and will continue doing so until it's back under its overall limit. In doing so, it will also skip the origins that have been marked as persistent.

<!--  
Questions:
- What if the device has lots of data and the 80% overall limit can't be reached anyway. If only 50% of the total disk space can be used, does the same LRU eviction mechanism happens?
- What happens when there isn't anything that the browser can evict, when everything is permanent?
- What if the browser is under its 80% limit, and each origin is also under its 60% limit, but the disk gets filled with other things. Does the browser proactively evict data for the user to regain space? If the browser isn't running, probably not. But if you launch the browser then, the pool is smaller now, does eviction happens then?
 -->

---

And that's it for this today. Thanks for reading!

I hope you learned a few things about storage on the web. And, more importantly, if you weren't sure if the web was up to the task for your next, storage-heavy, app project, I hope this article reassured you.
