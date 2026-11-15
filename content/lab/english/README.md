# Ask Me! – English questions trainer

A static web app (no server) to learn English questions. The app shows an answer and the learner finds the matching question.

## Changing the sentences

1. Edit **`sentences.json`**. This is the source of truth. Each entry looks like:

   ```json
   {
     "question": "What's your full name?",
     "answer": "My full name is John Smith."
   }
   ```

   Optional: add `"hint": "What's your …"` to override the automatic "Starts like:" hint (by default, the first two words of the question).

2. Regenerate **`data.js`** (needs [Node.js](https://nodejs.org)):

   ```sh
   node build.mjs
   ```

   The script checks that every entry has a non-empty `question` and `answer` and that no question is duplicated.

3. Reload the page.

> Don't edit `data.js` by hand: it is overwritten each time you run `node build.mjs`.
> `data.js` exists so the app also works when opened as a local file (no `fetch` needed).

### Progress and edits

Progress is saved in the browser (localStorage), per question text. Adding or removing sentences keeps existing progress. If you reword a question, it is treated as a new one and its progress starts again.

## Running / hosting

Open `index.html`, or upload these files to any static host: `index.html`, `style.css`, `app.js`, `data.js`. (`sentences.json`, `build.mjs` and this README are only needed for editing.)
