---
layout: article.njk
title: 4 JS array methods that don't mutate the original array
tags: article
date: 2024-12-16
hasCode: true
excerpt: "It's 2024 (well, almost 2025) and, yes, we can get nice things. If you've always wanted to sort, reverse, or otherwise change an array but didn't want to mutate the original array, then you're in luck. Check out these (somewhat) new array manipulation by copy methods."
thumbnail: "/assets/arrays.png"
altText: "For illustration only. A complex diagram showing many boxes titled Array, with random items, and arrows connecting these boxes."
---
Two and a half years ago, I wrote a short article titled <a href="/articles/2022-05-12-4-javascript-array-methods-you-need/">4 JavaScript Array methods you didn't know you needed</a>, which describes how useful the `Array.at`, `Array.flat`, `Array.some`, `Array.every` methods are. Today, while looking at the <a href="https://2024.stateofjs.com/">results to the State of JS 2024 survey</a>, I realized there were a few more methods worth highlighting.

In the [Array features question of the survey](https://2024.stateofjs.com/en-US/features/#array_features), participants were asked to rank a few other Array methods. That question made me discover a few methods I didn't know about, and when I looked at the comments that participants left on that question, it was clear that many other people didn't know about these methods either. So, let's review them now:  `Array.toSorted()`, `Array.toReversed()`, `Array.toSpliced()`, and `Array.with()`.

At the time of writing, all of these methods are **Baseline newly available**, which means they're now supported in all of the major browser engines. They haven't been supported for a long time yet, but they're here now.

## Sort an array and return a copy with Array.toSorted()

You have probably already used, or at least heard of, the `Array.sort()` method in the past. It sorts the elements of an array, _in place_, by using a comparison function. While it's very useful, sometimes you don't want to change the original array. That's where `Array.toSorted()` comes in:

```javascript
const myArray = [4, 10, 2, 5];

// Let's sort the array with `Array.toSorted()`.
const sortedArray = myArray.toSorted();

// The method returns a new array with the sorted elements.
console.log(sortedArray); // [2, 4, 5, 10]

// The original array remains unchanged.
console.log(myArray === sortedArray); // false
```

To learn more, see [Array.prototype.toSorted()](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted) on MDN.

## Reverse an array and return a copy with Array.toReversed()

Similarly, you've probably already used the `Array.reverse()` method to reverse the order of an array's items. That method does the reversing of the items _in place_, which means the original array is modified. If you don't want that to happen, you can now use the `Array.toReversed()` method instead:

```javascript
const myArray = [3, 2, 1];

// Let's reverse the array with `Array.toReversed()`.
const reversedArray = myArray.toReversed();

// The method returns a new array with the reversed elements.
console.log(reversedArray); // [1, 2, 3]

// The original array remains unchanged.
console.log(myArray === reversedArray); // false
```

To learn more, see [Array.prototype.toReversed()](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed) on MDN.

## Remove or replace elements in an array and return a copy with Array.toSpliced()

Let's continue in the same vein. `Array.splice()`, while I find its syntax hard to remember, is a very useful method to add, replace, or remove items from an array. But, again, it does so _in place_, by changing the original array. What if you want to do this in a new copy of the array instead? Well, you've guessed it, you can use `Array.toSpliced()`:

```javascript
const myArray = [1, 2, 2, 2, 3, 4];

// Let's remove the second and third items from the array with `Array.toSpliced()`.
const splicedArray = myArray.toSpliced(1, 2);

// The method returns the result of the splice operation, as a new array.
console.log(splicedArray); // [1, 2, 3, 4]

// The original array remains unchanged.
console.log(myArray === splicedArray); // false
```

To learn more, see [Array.prototype.toSpliced()](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced) on MDN.

## Create a new array with Array.with()

In JavaScript, you can easily change one item of an array by using the [bracket notation](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Property_accessors#bracket_notation). For example, changing the second item of an array to `42` can be done like this: `myArray[1] = 42`.

The `Array.with()` method lets you do the same thing exactly, but instead of changing the original array, it returns a new array with the change applied:

```javascript
const myArray = [1, 2, 3];

// Let's change the second item of the array to `42` with `Array.with()`.
const newArray = myArray.with(1, 42);

// The method returns a new array with the change applied.
console.log(newArray); // [1, 42, 3]

// The original array remains unchanged.
console.log(myArray === newArray); // false
```

To learn more, see [Array.prototype.with()](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/with) on MDN.
