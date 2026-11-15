'use strict';

const ROUND_SIZE = 10;
const LEARN_SIZE = 5;
const MAX_NEW_PER_ROUND = 4;
const DAILY_GOAL = 10;
const MAX_POINTS = { 1: 10, 2: 15, 3: 20, 4: 30 };
// Highest Leitner box a level can bring a question to (harder levels prove more)
const BOX_CAP = { 1: 2, 2: 3, 3: 4, 4: 5 };
const LEARNED_BOX = 4;
const MIN = 60e3, DAY = 864e5;
const INTERVALS = [0, 10 * MIN, DAY, 3 * DAY, 7 * DAY, 21 * DAY];

const $ = (id) => document.getElementById(id);
const screens = { home: $('home'), learnscreen: $('learnscreen'), game: $('game'), result: $('result') };
const SENTENCES = window.SENTENCES ?? [];

/* ---------- Persistence ---------- */
// Progress is keyed by question text, so adding/removing sentences never breaks saved progress.
const KEY = 'askme2';
const normKey = (q) => q.trim().toLowerCase();
function load() {
  try { return { xp: 0, best: {}, q: {}, badges: [], streak: { n: 0, last: '' }, day: { d: '', n: 0 }, mute: false, ...JSON.parse(localStorage.getItem(KEY) ?? '{}') }; }
  catch { return { xp: 0, best: {}, q: {}, badges: [], streak: { n: 0, last: '' }, day: { d: '', n: 0 }, mute: false }; }
}
const S = load();
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch { /* storage unavailable */ } };
const stOf = (s) => S.q[normKey(s.question)];
const equivalents = (s) => SENTENCES.filter((x) => normKey(x.answer) === normKey(s.answer));

/* ---------- Helpers ---------- */
const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
// Equivalent forms are reduced to one canonical form so either is accepted:
// contractions ("what's" = "what is", "don't" = "do not") and UK/US spellings.
const CONTRACTED_IS = new Set(['what', 'who', 'where', 'when', 'how', 'why', 'that', 'there', 'here', 'it', 'he', 'she']);
const IRREGULAR = { "can't": ['can', 'not'], cannot: ['can', 'not'], "won't": ['will', 'not'], "let's": ['let', 'us'], "i'm": ['i', 'am'], "ain't": ['is', 'not'] };
const SPELLING = {
  favorite: 'favourite', favorites: 'favourites', color: 'colour', colors: 'colours', traveling: 'travelling',
  traveled: 'travelled', mom: 'mum', neighbor: 'neighbour', neighbors: 'neighbours', center: 'centre', theater: 'theatre', gray: 'grey',
};
const SUFFIXES = { "'re": 'are', "'ve": 'have', "'ll": 'will', "'m": 'am', "'d": 'would' };

function expandWord(w) {
  if (IRREGULAR[w]) return IRREGULAR[w];
  if (w.endsWith("n't") && w.length > 3) return [w.slice(0, -3), 'not'];
  if (w.endsWith("'s") && CONTRACTED_IS.has(w.slice(0, -2))) return [w.slice(0, -2), 'is'];
  for (const [suffix, full] of Object.entries(SUFFIXES))
    if (w.endsWith(suffix) && w.length > suffix.length) return [w.slice(0, -suffix.length), full];
  return [SPELLING[w] ?? w];
}

// One entry per canonical token, remembering which typed word it came from (i)
function words(s) {
  const out = [];
  s.toLowerCase().replace(/[’‘`]/g, "'").replace(/[^a-z0-9'\s]/g, ' ').split(/\s+/).filter(Boolean).forEach((raw, i) => {
    for (const t of expandWord(raw)) out.push({ t, raw, i });
  });
  return out;
}
const tokens = (s) => words(s).map((x) => x.t);
const display = (s) => s.replace(/[?.!,]/g, '').split(/\s+/).filter(Boolean);
const pad = (n) => String(n).padStart(2, '0');
const dayKey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const yesterdayKey = () => { const d = new Date(); d.setDate(d.getDate() - 1); return dayKey(d); };
const patternOf = (s) => {
  if (s.hint) return s.hint;
  const w = s.question.split(/\s+/);
  return `${w.slice(0, 2).join(' ')} …`;
};

function show(name) {
  for (const [k, el] of Object.entries(screens)) el.hidden = k !== name;
  if (name === 'home') refreshHome();
  window.scrollTo(0, 0);
}

let toastTimer;
function toast(msg) {
  const t = $('toast');
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.hidden = true; }, 3200);
}

/* ---------- Sound & speech & confetti ---------- */
let audio;
function tone(seq) {
  if (S.mute) return;
  try {
    audio ??= new (window.AudioContext || window.webkitAudioContext)();
    if (audio.state === 'suspended') audio.resume();
    let t = audio.currentTime;
    for (const [f, d] of seq) {
      const o = audio.createOscillator(), g = audio.createGain();
      o.type = 'sine'; o.frequency.value = f;
      g.gain.setValueAtTime(.12, t); g.gain.exponentialRampToValueAtTime(.001, t + d);
      o.connect(g).connect(audio.destination);
      o.start(t); o.stop(t + d);
      t += d * .9;
    }
  } catch { /* audio unavailable */ }
}
const SND = { ok: [[660, .12], [880, .18]], ko: [[260, .22]], win: [[523, .12], [659, .12], [784, .12], [1047, .3]], badge: [[880, .1], [1175, .1], [1568, .25]] };

function speak(text) {
  if (!('speechSynthesis' in window) || !text) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-GB';
  u.rate = 0.85;
  speechSynthesis.speak(u);
}

function confetti() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !document.body.animate) return;
  const colors = ['#5b3df5', '#f5a623', '#1a9b52', '#e84393', '#2d9cdb'];
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('i');
    p.className = 'confetti';
    p.style.left = `${Math.random() * 100}vw`;
    p.style.background = colors[i % colors.length];
    document.body.append(p);
    const a = p.animate([
      { transform: 'translateY(-10vh) rotate(0)', opacity: 1 },
      { transform: `translate(${(Math.random() - .5) * 30}vw, 105vh) rotate(${Math.random() * 720}deg)`, opacity: 1 },
    ], { duration: 1600 + Math.random() * 1400, easing: 'cubic-bezier(.3,.6,.5,1)' });
    a.onfinish = () => p.remove();
  }
}

/* ---------- Progress: streak, daily goal, badges ---------- */
const learnedCount = () => SENTENCES.filter((s) => (stOf(s)?.box ?? 0) >= LEARNED_BOX).length;
const streakValue = () => (S.streak.last === dayKey() || S.streak.last === yesterdayKey() ? S.streak.n : 0);
const todayCount = () => (S.day.d === dayKey() ? S.day.n : 0);

function countAnswer() {
  const today = dayKey();
  if (S.day.d !== today) S.day = { d: today, n: 0 };
  S.day.n++;
  if (S.day.n === DAILY_GOAL) {
    S.streak = { n: S.streak.last === yesterdayKey() ? S.streak.n + 1 : 1, last: today };
    toast(`🎯 Daily goal reached! 🔥 ${S.streak.n} day${S.streak.n > 1 ? 's' : ''} in a row`);
    tone(SND.win);
  }
}

const BADGES = [
  { id: 'round', emoji: '🎬', name: 'First round', test: (c) => c.finished },
  { id: 'learn', emoji: '🃏', name: 'Card learner', test: (c) => c.learned },
  { id: 'star3', emoji: '🌟', name: '3-star round', test: (c) => c.stars === 3 },
  { id: 'expert', emoji: '🧠', name: 'Expert: 3 stars on Level 4', test: (c) => c.stars === 3 && c.level === 4 },
  { id: 'streak3', emoji: '🔥', name: '3-day streak', test: () => streakValue() >= 3 },
  { id: 'streak7', emoji: '🏅', name: '7-day streak', test: () => streakValue() >= 7 },
  { id: 'l10', emoji: '📘', name: '10 questions learned', test: () => learnedCount() >= 10 },
  { id: 'l25', emoji: '📗', name: '25 questions learned', test: () => learnedCount() >= 25 },
  { id: 'all', emoji: '🎓', name: 'All questions learned!', test: () => SENTENCES.length > 0 && learnedCount() >= SENTENCES.length },
];

function checkBadges(ctx = {}) {
  for (const b of BADGES) {
    if (!S.badges.includes(b.id) && b.test(ctx)) {
      S.badges.push(b.id);
      toast(`${b.emoji} New badge: ${b.name}`);
      tone(SND.badge);
    }
  }
}

function refreshHome() {
  const learned = learnedCount();
  $('total-xp').textContent = S.xp;
  $('streak').textContent = streakValue();
  $('streak-pill').classList.toggle('cold', streakValue() === 0);
  $('goal').textContent = DAILY_GOAL;
  $('today-n').textContent = Math.min(todayCount(), DAILY_GOAL);
  $('today-bar').max = DAILY_GOAL;
  $('today-bar').value = Math.min(todayCount(), DAILY_GOAL);
  $('learned').textContent = learned;
  $('total').textContent = SENTENCES.length;
  $('learned-bar').max = Math.max(SENTENCES.length, 1);
  $('learned-bar').value = learned;
  $('mute').textContent = S.mute ? '🔇' : '🔊';
  $('mute').setAttribute('aria-pressed', String(S.mute));
  $('mute').setAttribute('aria-label', S.mute ? 'Sound off' : 'Sound on');
  document.querySelectorAll('[data-best]').forEach((el) => {
    const b = S.best[el.dataset.best];
    el.textContent = b ? `🏆 ${b}` : '';
  });
  $('badges').replaceChildren(...BADGES.map((b) => {
    const li = document.createElement('li');
    const got = S.badges.includes(b.id);
    li.className = got ? '' : 'locked';
    li.title = b.name;
    const e = document.createElement('span');
    e.textContent = b.emoji;
    e.setAttribute('aria-hidden', 'true');
    li.append(e, `${b.name}${got ? '' : ' (locked)'}`);
    return li;
  }));
}

/* ---------- Spaced repetition (Leitner boxes) ---------- */
function record(s, level, perfect, ratio) {
  const k = normKey(s.question);
  const st = (S.q[k] ??= { box: 0, due: 0, right: 0, wrong: 0 });
  if (perfect) {
    st.right++;
    if (st.box < BOX_CAP[level]) st.box++;
    st.due = Date.now() + INTERVALS[st.box];
  } else {
    st.wrong++;
    if (ratio < 0.5) st.box = Math.max(0, st.box - 1);
    st.due = Date.now();
  }
}

// Due and weak questions first; unseen questions are capped so a round is never all new material.
function pickQueue() {
  const now = Date.now();
  const scored = SENTENCES.map((s) => {
    const st = stOf(s);
    const box = st?.box ?? 0;
    const due = !st || st.due <= now;
    const overdue = st ? Math.min((now - st.due) / DAY, 10) : 0;
    return { s, isNew: !st, p: (due ? 100 + (5 - box) * 10 + overdue : (5 - box)) + Math.random() * 12 };
  }).sort((a, b) => b.p - a.p);
  let news = 0;
  const picked = [];
  for (const x of scored) {
    if (picked.length >= ROUND_SIZE) break;
    if (x.isNew && news >= MAX_NEW_PER_ROUND) continue;
    if (x.isNew) news++;
    picked.push(x.s);
  }
  return shuffle(picked);
}

/* ---------- Game ---------- */
let level = 1, queue = [], index = 0, score = 0, streak = 0, current = null, mistakes = [], customQueue = null;

function start(lvl, custom = null) {
  level = lvl; score = 0; streak = 0; index = 0; mistakes = [];
  customQueue = custom;
  queue = custom ? shuffle(custom) : pickQueue();
  $('progress').max = queue.length;
  $('score').textContent = 0;
  show('game');
  nextQuestion();
}

function nextQuestion() {
  if (index >= queue.length) return finish();
  current = queue[index];
  $('progress').value = index;
  $('answer').textContent = current.answer;
  $('feedback').hidden = true;
  $('pattern').hidden = level === 1 || level === 4;
  if (!$('pattern').hidden) $('pattern').textContent = `💡 Starts like: ${patternOf(current)}`;
  $('choices').hidden = level !== 1;
  $('order').hidden = level !== 2;
  $('form').hidden = level < 3;
  $('clue').hidden = level !== 3;

  if (level === 1) renderChoices();
  else if (level === 2) renderOrder();
  else {
    if (level === 3) renderClue();
    $('input').value = '';
    $('input').disabled = false;
    $('check').hidden = false;
    $('input').focus({ preventScroll: true });
  }
}

function renderChoices() {
  const mine = new Set(tokens(current.question));
  // Prefer look-alike distractors so the choice is a real challenge
  const others = SENTENCES
    .filter((s) => s.question !== current.question && s.answer !== current.answer)
    .map((s) => ({ s, sim: tokens(s.question).filter((w) => mine.has(w)).length + Math.random() * 1.5 }))
    .sort((a, b) => b.sim - a.sim)
    .slice(0, 6);
  const picks = shuffle(others).slice(0, 3).map((o) => o.s.question);
  const box = $('choices');
  box.className = 'choices';
  box.replaceChildren(...shuffle([current.question, ...picks]).map((q) => {
    const b = document.createElement('button');
    b.className = 'choice';
    b.type = 'button';
    b.textContent = q;
    return b;
  }));
}

function renderOrder() {
  const words = current.question.split(/\s+/);
  let order = words.map((_, i) => i);
  for (let tries = 0; tries < 6 && words.length > 1; tries++) {
    order = shuffle(order);
    if (order.some((v, i) => v !== i)) break;
  }
  $('slots').replaceChildren();
  $('slots').classList.remove('locked');
  $('bank').classList.remove('locked');
  $('bank').replaceChildren(...order.map((i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip';
    b.textContent = words[i];
    return b;
  }));
  $('check-order').hidden = false;
  $('check-order').disabled = true;
}

function renderClue() {
  const words = display(current.question);
  const hide = new Set(shuffle(words.map((_, i) => i).slice(1)).slice(0, Math.max(1, Math.floor(words.length / 2))));
  const frag = document.createDocumentFragment();
  words.forEach((w, i) => {
    if (hide.has(i)) {
      const s = document.createElement('span');
      s.className = 'blank';
      s.setAttribute('aria-label', 'missing word');
      frag.append(s, ' ');
    } else frag.append(w, ' ');
  });
  $('clue').replaceChildren(frag);
}

// Longest common subsequence on words → which typed words are right, wrong or missing
function compare(typed, target) {
  const A = words(typed), B = words(target);
  const a = A.map((x) => x.t), b = B.map((x) => x.t);
  const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = a.length - 1; i >= 0; i--)
    for (let j = b.length - 1; j >= 0; j--)
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const raw = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { raw.push({ ...A[i], side: 'a', s: 'ok' }); i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) { raw.push({ ...A[i], side: 'a', s: 'ko' }); i++; }
    else { raw.push({ ...B[j], side: 'b', s: 'miss' }); j++; }
  }
  while (i < a.length) raw.push({ ...A[i], side: 'a', s: 'ko' }), i++;
  while (j < b.length) raw.push({ ...B[j], side: 'b', s: 'miss' }), j++;

  // Show words as written ("what's"), merging the tokens of one expanded word
  const out = [];
  for (const x of raw) {
    const last = out[out.length - 1];
    if (last && last.side === x.side && last.i === x.i) {
      if (x.s !== 'ok') last.t = x.s;
    } else out.push({ w: x.raw, t: x.s, side: x.side, i: x.i });
  }
  const good = raw.filter((o) => o.s === 'ok').length;
  return { out, ratio: good / Math.max(a.length, b.length, 1) };
}

function award(ratio, perfect, matched = current) {
  const max = MAX_POINTS[level];
  let pts = perfect ? max : Math.round(max * ratio * 0.7);
  if (perfect) { streak++; if (streak >= 3) pts += 5; } else streak = 0;
  score += pts;
  S.xp += pts;
  record(matched, level, perfect, ratio);
  countAnswer();
  checkBadges();
  save();
  const el = $('score').parentElement;
  el.classList.remove('pop');
  void el.offsetWidth;
  el.classList.add('pop');
  $('score').textContent = score;
  tone(perfect ? SND.ok : SND.ko);
  return pts;
}

function showFeedback({ perfect, pts, diff, ratio, shown = current }) {
  const v = $('verdict');
  v.className = `verdict ${perfect ? 'ok' : 'ko'}`;
  const bonus = perfect && streak >= 3 ? ` 🔥 ${streak} in a row!` : '';
  v.textContent = perfect
    ? `Perfect! +${pts}${bonus}`
    : ratio >= 0.5 ? `Almost! +${pts}` : pts ? `Keep trying! +${pts}` : 'Not quite…';
  $('diff').hidden = !diff;
  if (diff) {
    $('diff').replaceChildren(...diff.out.map(({ w, t }) => {
      const s = document.createElement('span');
      s.className = `w ${t}`;
      s.textContent = t === 'miss' ? `+ ${w}` : w;
      return s;
    }));
  }
  $('correct').textContent = shown.question;
  const others = equivalents(current).filter((s) => s !== shown).map((s) => s.question);
  $('also').hidden = !others.length;
  $('also').textContent = `Also correct: ${others.join(' · ')}`;
  $('feedback').hidden = false;
  $('next').scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  if (!perfect) mistakes.push(current);
}

function submitTyped(typed) {
  // Every question that shares this answer is accepted; grade against the closest one
  let best = null;
  for (const s of equivalents(current)) {
    const r = compare(typed, s.question);
    if (!best || r.ratio > best.r.ratio) best = { s, r };
  }
  const perfect = best.r.ratio === 1;
  const pts = award(best.r.ratio, perfect, best.s);
  showFeedback({ perfect, pts, diff: best.r, ratio: best.r.ratio, shown: best.s });
}

$('choices').addEventListener('click', (e) => {
  const btn = e.target.closest('.choice');
  if (!btn) return;
  const box = $('choices');
  box.classList.add('done');
  const perfect = btn.textContent === current.question;
  btn.classList.add(perfect ? 'right' : 'wrong');
  for (const c of box.children) {
    if (c.textContent === current.question) c.classList.add('right');
    else if (c !== btn) c.classList.add('dim');
  }
  const pts = award(perfect ? 1 : 0, perfect);
  showFeedback({ perfect, pts, ratio: perfect ? 1 : 0 });
});

// Tap a word to place it; tap a placed word to take it back
$('order').addEventListener('click', (e) => {
  const chip = e.target.closest('.chip');
  if (!chip) return;
  (chip.parentElement === $('bank') ? $('slots') : $('bank')).append(chip);
  $('check-order').disabled = $('bank').children.length > 0;
});

$('check-order').addEventListener('click', () => {
  $('slots').classList.add('locked');
  $('check-order').hidden = true;
  submitTyped([...$('slots').children].map((c) => c.textContent).join(' '));
});

$('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const typed = $('input').value.trim();
  if (!typed) return;
  $('input').disabled = true;
  $('check').hidden = true;
  submitTyped(typed);
});

$('next').addEventListener('click', () => { index++; nextQuestion(); });

function finish() {
  $('progress').value = queue.length;
  const max = queue.length * MAX_POINTS[level];
  const pct = max ? score / max : 0;
  const stars = pct >= 0.9 ? 3 : pct >= 0.6 ? 2 : pct >= 0.3 ? 1 : 0;
  $('stars').textContent = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
  $('final-score').textContent = score;
  $('max-score').textContent = max;
  $('result-msg').textContent = ['Keep practising, you can do it! 💪', 'Good start! 👍', 'Great job! 🎉', 'Amazing! You rock! 🏆'][stars];
  $('result-learned').textContent = `📘 ${learnedCount()} / ${SENTENCES.length} questions learned`;

  if (!customQueue && score > (S.best[level] ?? 0)) S.best[level] = score;
  checkBadges({ finished: true, stars, level });
  save();

  const box = $('mistakes');
  box.replaceChildren();
  if (mistakes.length) {
    const h = document.createElement('h3');
    h.textContent = 'Review these questions:';
    box.append(h, ...mistakes.map((m) => {
      const p = document.createElement('p');
      const a = document.createElement('small'); a.textContent = m.answer;
      const q = document.createElement('b'); q.textContent = m.question;
      p.append(a, document.createElement('br'), q);
      return p;
    }));
  }
  show('result');
  if (stars >= 2) { confetti(); tone(SND.win); }
}

/* ---------- Learn mode (flashcards) ---------- */
let batch = [], card = 0;

function pickBatch() {
  const now = Date.now();
  return shuffle(SENTENCES)
    .sort((a, b) => {
      const sa = stOf(a), sb = stOf(b);
      if (!sa !== !sb) return sa ? 1 : -1; // never-seen first
      return (sa?.box ?? 0) - (sb?.box ?? 0) || (sa?.due ?? now) - (sb?.due ?? now);
    })
    .slice(0, LEARN_SIZE);
}

function startLearn() {
  batch = pickBatch();
  card = 0;
  $('learn-progress').max = batch.length;
  show('learnscreen');
  renderCard();
}

function renderCard() {
  const s = batch[card];
  $('learn-progress').value = card;
  $('learn-answer').textContent = s.answer;
  $('learn-question').textContent = s.question;
  $('learn-pattern').textContent = `💡 Starts like: ${patternOf(s)}`;
  $('learn-q').hidden = true;
  $('learn-reveal').hidden = false;
  $('learn-next').hidden = true;
  $('learn-next').textContent = card === batch.length - 1 ? 'Test yourself 🎮' : 'Next ➜';
}

$('learn-reveal').addEventListener('click', () => {
  $('learn-q').hidden = false;
  $('learn-reveal').hidden = true;
  $('learn-next').hidden = false;
  speak(batch[card].question);
  $('learn-next').scrollIntoView({ block: 'nearest', behavior: 'smooth' });
});

$('learn-next').addEventListener('click', () => {
  if (card < batch.length - 1) { card++; renderCard(); return; }
  for (const s of batch) S.q[normKey(s.question)] ??= { box: 0, due: 0, right: 0, wrong: 0 };
  checkBadges({ learned: true });
  save();
  start(2, batch);
});

/* ---------- Wiring ---------- */
document.addEventListener('click', (e) => {
  const b = e.target.closest('.speak');
  if (b) speak($(b.dataset.from).textContent);
});
document.querySelectorAll('.level').forEach((b) => b.addEventListener('click', () => start(+b.dataset.level)));
$('learn').addEventListener('click', startLearn);
$('again').addEventListener('click', () => start(level));
$('menu').addEventListener('click', () => show('home'));
$('quit').addEventListener('click', () => show('home'));
$('learn-quit').addEventListener('click', () => show('home'));
$('mute').addEventListener('click', () => { S.mute = !S.mute; save(); refreshHome(); });

refreshHome();
