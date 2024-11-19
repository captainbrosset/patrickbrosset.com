---
layout: article.njk
title: Even faster IndexedDB reads with getAllRecords
tags: article
date: 2024-11-19
excerpt: "Reading a lot of data from IndexedDB can be slow. Reading the data in batches helps, but it's not perfect because it requires querying for both keys and values separately, and doesn't allow you to read in reverse order. A proposal from the Microsoft Edge team aims to address these limitations with a new method called getAllRecords. And we'd love to have your feedback on it."
thumbnail: "/assets/idb.png"
altText: "An abstract illustration of a database server with circles of light around it"
hasCode: true
draft: true
---

Reading large amounts of data in [IndexedDB](https://developer.mozilla.org/docs/Web/API/IndexedDB_API) can be slow at times. In this article, let's look at [a proposal](https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/IndexedDbGetAllEntries/explainer.md) from the Microsoft Edge team that improves the performance **and** ergonomics of reading IndexedDB data.

---

**Help wanted**: If this is interesting to you, and you want to help make this a reality, please consider providing feedback on the proposal. The more feedback, the better chances the proposal has of matching your needs, and of being implemented in all browsers.

* **Proposal**: [IndexedDB: getAllRecords](https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/IndexedDbGetAllEntries/explainer.md).
* **Feedback**: [Review existing issues](https://github.com/MicrosoftEdge/MSEdgeExplainers/issues/) or [open a new issue](https://github.com/MicrosoftEdge/MSEdgeExplainers/issues/new/choose).

---

## Reading a lot of data, fast

Here are a few options available to you when you want to read many records from an IndexedDB store:

* Using an [IDBCursor](https://developer.mozilla.org/docs/Web/API/IDBCursor) to read the records one at a time.
* Reading the entire store at once using [IDBObjectStore's getAll](https://developer.mozilla.org/docs/Web/API/IDBObjectStore/getAll) and/or [IDBObjectStore's getAllKeys](https://developer.mozilla.org/docs/Web/API/IDBObjectStore/getAllKeys).
* Using the same methods as above, but providing [IDBKeyRange](https://developer.mozilla.org/docs/Web/API/IDBKeyRange) objects along the way, to read in batches.

We'll ignore the first option because reading one record at a time can be slow if you have a lot of data, as it requires a lot of back and forth between your app's main thread and the thread where the IDB engine runs.

We'll also ignore the second option because reading the entire store at once, if the store is big, can freeze up your app while the data is being read, and cause memory problems.

Let's say reading in batches is the option that you want to go with, because it reduces the number of back and forth with the IDB engine, and it lets you provide a better user experience. Let's see what an implementation might look like (thank you, Nolan Lawson, for the inspiration: [Speeding up IndexedDB reads and writes](https://nolanlawson.com/2021/08/22/speeding-up-indexeddb-reads-and-writes/)):

```js
async function readInBatches(db, count) {
  const transaction = db.transaction("features", "readonly");
  const store = transaction.objectStore("features");

  function getNextBatch(range) {
    return Promise.all([
      new Promise(resolve => {
        store.getAllKeys(range, count).onsuccess = e => resolve(e.target.result);
      }),
      new Promise(resolve => {
        store.getAll(range, count).onsuccess = e => resolve(e.target.result);
      })
    ]);
  }

  let range = null;

  while (true) {
    const [keys, values] = await getNextBatch(range);
    
    if (keys && values && values.length === count) {
      // There's more to read. Define the next range.
      range = IDBKeyRange.lowerBound(keys.at(-1), true);
      // Do something with `keys` and `values` here.
    } else {
      // We're done reading.
      break;
    }
  }
}
```

The above code uses an [IDBKeyRange](https://developer.mozilla.org/docs/Web/API/IDBKeyRange) to read the data in batches. It also uses both `getAll` and `getAllKeys` in order to not only get the records, but their primary keys too.

Now, this is a good solution, but there are two problems with it:

* Having to use both `getAll` and `getAllKeys` together means that you have to make two requests to the IDB engine for each batch, which could be slow if you have a lot of data.
* This solution doesn't support reading in reverse order, which could be a problem if you want to read the data in descending order.

## Reading in reverse order

What if you need to read the same data, but in reverse order? Unfortunately, there isn't a way to do this while still reading in batches. In order to read in reverse order, you'll have to use a cursor, which supports setting a [direction](https://developer.mozilla.org/docs/Web/API/IDBObjectStore/openCursor#direction) when getting the next record. This means you'll have to read one record at a time. Here's an example of how you might do this:

```js
async function readReverse(db) {
  const transaction = db.transaction("features", "readonly");
  const store = transaction.objectStore("features");

  store.openCursor(null, "prev").onsuccess = event => {
    const cursor = event.target.result;
    if (cursor) {
      // Do something with `cursor.key` and `cursor.value` here.
      cursor.continue();
    } else {
      // Done reading.
    }
  };
}
```

Again, doing the above can be slow if you have a lot of data.

## Introducing getAllRecords

The `getAllRecords` method of an `IDBObjectStore` (and `IDBIndex`) is a [proposal](https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/IndexedDbGetAllEntries/explainer.md) from the Microsoft Edge team that aims to address the limitations discussed above. It does so by:

* Allowing you to read in batches.
* Allowing you to read in reverse order.
* Returning both the records and their primary keys in one request.

This makes it possible for you to batch read data, in both directions, with the minimum amount of requests to the IDB engine.

Here's what reading with `getAllRecords` might look like:

```js
async function readInBatches(db, count, direction) {
  const transaction = db.transaction("features", "readonly");
  const store = transaction.objectStore("features");

  function getNextBatch(range) {
    return new Promise(resolve => {
      store.getAllRecords({
        query: range,
        count,
        direction
      }).onsuccess = (event) => {
        resolve(event.target.result);
      };
    });
  }

  let range = null;

  while (true) {
    const records = await getNextBatch(range);
    if (records.length === count) {
      // There could be more records, set a starting point for the next iteration.
      const lastRecord = records.at(-1);
      range = direction === "prev"
        ? IDBKeyRange.upperBound(lastRecord.key, true)
        : IDBKeyRange.lowerBound(lastRecord.key, true);
      // Do something with `records` here, which gives access to both `key` and `value`.
    } else {
      // Done reading.
      break;
    }
  }
}
```

## Trying it out

To see more code, check out [this demo I made](https://github.com/MicrosoftEdge/Demos/tree/main/idb-getallrecords), which you can also [run live](https://microsoftedge.github.io/Demos/idb-getallrecords/).

A prototype of the `getAllRecords` method is now available in Chromium, which means you can try it out for yourself in Chrome Canary or Edge Canary (to make sure you have the version that has the feature).

To enable the feature, start the browser from the command line with the following additional parameter: `--enable-blink-features=IndexedDbGetAllRecords`.

For example, on Windows, you might run the following command to start Chrome Canary with the feature enabled: `"%localappdata%\Google\Chrome SxS\Application\chrome.exe" --enable-blink-features=IndexedDbGetAllRecords`.

## Feedback

As I don't have an actual production use case to test, I highly encourage you to try the feature out yourself, in your own app, and see what the performance gains are for you. In my simple local tests, I was able to cut down on the batch read time by a factor of 3.

If this is something that you could benefit from, please try it out and consider providing feedback to the Microsoft Edge team. The more feedback we get, the better chances the proposal has of matching your needs, and of being implemented in all browsers. To provide feedback:

* **Read the proposal**: [IndexedDB: getAllRecords](https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/IndexedDbGetAllEntries/explainer.md).
* **Leave feedback**: [Review existing issues](https://github.com/MicrosoftEdge/MSEdgeExplainers/issues/) or [open a new issue](https://github.com/MicrosoftEdge/MSEdgeExplainers/issues/new/choose).
