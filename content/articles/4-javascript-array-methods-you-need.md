---
layout: article.njk
title: 4 JavaScript Array methods you didn't know you needed
tags: article
date: 2022-05-12
permalink: /articles/2022-05-12-4-javascript-array-methods-you-need/index.html
hasCode: true
excerpt: "The Array JavaScript built-in object comes with a lot of methods that make manipulating arrays easy. I often forget about them and end up writing code with complicated for loops that could have been done much simpler. So here are 4 methods available to Arrays in JavaScript that might come in handy."
thumbnail: "/assets/space-invaders.jpg"
altText: "Space invaders light painting, by me"
---
The Array JavaScript built-in object comes with a lot of methods that make manipulating arrays easy. I often forget about them and end up writing code with complicated for loops that could have been done in much simpler ways.

So here are 4 methods available to JavaScript Arrays that might help you too.

### Get the last item in an array

Have you ever done `myList[myList.length - 1]` to get the last item in the `myList` array?

If so, it just got a lot easier with the `Array.at` method. This method takes an single integer argument that indicates which item you want in the array, and a negative number will count back from the last item.

➡️ `const lastItem = myList.at(-1);`

`Array.at` is [supported](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/at#browser_compatibility) in all browser engines, as well as Node.js and Deno.

### Flatten an array of arrays


The `Array.flat` method  creates a new array from the values contained in an array of arrays.

➡️ `const list = [0, 1, [2, 3], [4, 5]].flat(); // [0, 1, 2, 3, 4, 5]`

The method also takes an optional argument to specify the depth at which the recursive flattening should stop.
So flattening this 3 level deep array for example will require passing `3` as an argument to the method:

➡️ `const list = [0, [1, [2, [3]]]].flat(3); // [0, 1, 2, 3]`

`Array.flat` is also [supported](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/flat#browser_compatibility) in all browsers, as well as Node.js and Deno.

### Test an array's values

Sometimes you need to check that at least 1 item in an array matches some condition. You can write a for loop to do it:

```javascript
let doesItHaveTheValueINeed = false;
for (const item of myList) {
  if (condition(item)) {
    doesItHaveTheValueINeed = true;
    break;
  }
}
```

Or, use the `Array.some` method instead!

➡️ `myList.some(condition);`

The very similar `Array.every` method is also interesting here. It works the same but tests if all items in the array match the condition.

➡️ `myList.every(condition);`

[Support](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/some#browser_compatibility) for both `some` and `every` is green all across the board too.

### Get the iteration index in a `for..of` loop

This last method is `Array.entries` which makes this useful tip possible: getting the current iteration index even when using a `for..of` loop.

`for..of` loops are great to make your code simpler to write and read:

```javascript
// 😒
for (let i = 0; i < myList.length; i++) {
  const item = myList[i];
}

// 😃
for (const item of myList){
  ...
}
```

However the second, more compact, for loop does not have access to the current iteration index, which the first for loop does. Here's how to get it:

➡️ `for (const [index, item] of myList.entries()) { ... }`

The `Array.entries` method returns an iterator that provides access to the key and value of each item in the array.

[Support](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/entries#browser_compatibility) for `entries` is green all across the board too.

That's it for this short blog post. I hope these methods come in handy at some point!
