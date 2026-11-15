// Reads sentences.json and writes data.js (so the app works without a server).
// Usage: node build.mjs
// Each entry needs "question" and "answer"; an optional "hint" overrides the auto pattern hint.
import { readFileSync, writeFileSync } from 'node:fs';

const list = JSON.parse(readFileSync(new URL('./sentences.json', import.meta.url), 'utf8'));
const seen = new Set();
for (const [i, s] of list.entries()) {
  if (typeof s.question !== 'string' || typeof s.answer !== 'string' || !s.question.trim() || !s.answer.trim())
    throw new Error(`Entry #${i} needs a non-empty "question" and "answer"`);
  const key = s.question.trim().toLowerCase();
  if (seen.has(key)) throw new Error(`Duplicate question: ${s.question}`);
  seen.add(key);
}
writeFileSync(new URL('./data.js', import.meta.url), `window.SENTENCES=${JSON.stringify(list)};\n`);
console.log(`data.js written with ${list.length} sentences`);
