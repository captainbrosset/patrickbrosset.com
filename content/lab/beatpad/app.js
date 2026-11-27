'use strict';

const $ = (s, r = document) => r.querySelector(s);
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const MAX_GRID = 8;
const MAX_PADS = MAX_GRID * MAX_GRID;
const STORE_KEY = 'beatpad.config.v1';
const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const noteName = n => NOTE_NAMES[n % 12] + (Math.floor(n / 12) - 1);

/* ---------- Built-in synthesized sounds ---------- */

const noise = () => Math.random() * 2 - 1;
const TAU = Math.PI * 2;
// Cheap high-pass: subtract a one-pole low-pass from the signal.
const hp = (s, key, x, a) => { s[key] = (s[key] || 0) + a * (x - (s[key] || 0)); return x - s[key]; };

const SYNTHS = {
  kick:    { label: 'Kick', dur: 0.6, fn: (t, s, dt) => { s.p = (s.p || 0) + TAU * (42 + 130 * Math.exp(-t * 30)) * dt; return Math.tanh(1.8 * Math.sin(s.p)) * Math.exp(-t * 7); } },
  snare:   { label: 'Snare', dur: 0.4, fn: (t, s) => 0.5 * Math.sin(TAU * 185 * t) * Math.exp(-t * 28) + 0.7 * hp(s, 'a', noise(), 0.25) * Math.exp(-t * 16) },
  hat:     { label: 'Hat (closed)', dur: 0.15, fn: (t, s) => 0.6 * hp(s, 'a', metal(t) * 0.3 + noise() * 0.6, 0.15) * Math.exp(-t * 70) },
  openhat: { label: 'Hat (open)', dur: 0.6, fn: (t, s) => 0.5 * hp(s, 'a', metal(t) * 0.3 + noise() * 0.6, 0.15) * Math.exp(-t * 9) },
  clap:    { label: 'Clap', dur: 0.4, fn: (t, s) => {
    let env = Math.exp(-t * 20) * 0.5;
    for (const b of [0, 0.011, 0.022]) if (t >= b) env += Math.exp(-(t - b) * 140);
    return 0.5 * hp(s, 'a', noise(), 0.35) * env;
  } },
  rim:     { label: 'Rim', dur: 0.12, fn: t => (0.6 * Math.sin(TAU * 1700 * t) + 0.4 * Math.sin(TAU * 480 * t) + 0.3 * noise()) * Math.exp(-t * 70) },
  tomLo:   { label: 'Tom low', dur: 0.5, fn: (t, s, dt) => { s.p = (s.p || 0) + TAU * (90 + 60 * Math.exp(-t * 18)) * dt; return Math.sin(s.p) * Math.exp(-t * 8); } },
  tomHi:   { label: 'Tom high', dur: 0.4, fn: (t, s, dt) => { s.p = (s.p || 0) + TAU * (160 + 90 * Math.exp(-t * 18)) * dt; return Math.sin(s.p) * Math.exp(-t * 10); } },
  cowbell: { label: 'Cowbell', dur: 0.5, fn: t => 0.4 * (Math.sign(Math.sin(TAU * 560 * t)) + Math.sign(Math.sin(TAU * 845 * t))) * 0.5 * Math.exp(-t * 10) },
  crash:   { label: 'Crash', dur: 1.6, fn: (t, s) => 0.5 * hp(s, 'a', metal(t) * 0.2 + noise() * 0.7, 0.12) * Math.exp(-t * 3) },
  conga:   { label: 'Conga', dur: 0.4, fn: (t, s, dt) => { s.p = (s.p || 0) + TAU * (200 + 40 * Math.exp(-t * 30)) * dt; return Math.sin(s.p) * Math.exp(-t * 12); } },
  shaker:  { label: 'Shaker', dur: 0.2, fn: (t, s) => 0.5 * hp(s, 'a', noise(), 0.3) * Math.min(1, t * 200) * Math.exp(-t * 20) },
  bass:    { label: 'Bass', dur: 0.8, fn: (t, s, dt) => { s.p = (s.p || 0) + TAU * 55 * dt; const saw = ((s.p / TAU) % 1) * 2 - 1; s.l = (s.l || 0) + 0.06 * (saw - (s.l || 0)); return s.l * 1.6 * Math.exp(-t * 4); } },
  sub808:  { label: '808 sub', dur: 1.4, fn: (t, s, dt) => { s.p = (s.p || 0) + TAU * (48 + 40 * Math.exp(-t * 25)) * dt; return Math.tanh(1.3 * Math.sin(s.p)) * Math.exp(-t * 2.5); } },
  zap:     { label: 'Zap', dur: 0.4, fn: (t, s, dt) => { s.p = (s.p || 0) + TAU * (2200 * Math.exp(-t * 9) + 80) * dt; return 0.6 * Math.sin(s.p) * Math.exp(-t * 6); } },
  blip:    { label: 'Blip', dur: 0.25, fn: t => 0.3 * Math.sign(Math.sin(TAU * 880 * t)) * Math.exp(-t * 14) },
};
function metal(t) {
  let m = 0;
  for (const f of [263, 400, 421, 474, 587, 845]) m += Math.sign(Math.sin(TAU * f * t));
  return m / 6;
}
const DEFAULT_ORDER = ['kick', 'snare', 'hat', 'openhat', 'clap', 'rim', 'tomLo', 'tomHi', 'cowbell', 'crash', 'conga', 'shaker', 'bass', 'sub808', 'zap', 'blip'];
const DEFAULT_KEYS = 'zxcvasdfqwer1234bnm,ghjkyuio5678';

/* ---------- Audio engine ---------- */

const ctx = new AudioContext({ latencyHint: 'interactive' });
const master = ctx.createGain();
const limiter = ctx.createDynamicsCompressor();
master.connect(limiter).connect(ctx.destination);

const synthBuf = new Map();
for (const [id, d] of Object.entries(SYNTHS)) {
  const sr = ctx.sampleRate;
  const buf = ctx.createBuffer(1, Math.floor(sr * d.dur), sr);
  const data = buf.getChannelData(0);
  const st = {};
  for (let i = 0; i < data.length; i++) data[i] = clamp(d.fn(i / sr, st, 1 / sr), -1, 1) * 0.9;
  synthBuf.set(id, buf);
}

const samples = new Map(); // id -> { id, name, sampleRate, channels, buffer }
const reversedCache = new WeakMap();

function toBuffer(rec) {
  const b = new AudioBuffer({ numberOfChannels: rec.channels.length, length: rec.channels[0].length, sampleRate: rec.sampleRate });
  rec.channels.forEach((c, i) => b.copyToChannel(c, i));
  return b;
}
function soundOf(pad) {
  const [type, id] = pad.sound.split(':');
  if (type === 'synth') return synthBuf.get(id) || null;
  if (type === 'sample') return samples.get(id)?.buffer || null;
  return null;
}
function reversed(buf) {
  let r = reversedCache.get(buf);
  if (!r) {
    r = new AudioBuffer({ numberOfChannels: buf.numberOfChannels, length: buf.length, sampleRate: buf.sampleRate });
    for (let c = 0; c < buf.numberOfChannels; c++) r.copyToChannel(buf.getChannelData(c).slice().reverse(), c);
    reversedCache.set(buf, r);
  }
  return r;
}

/* ---------- State ---------- */

function makePad(i) {
  const id = DEFAULT_ORDER[i % DEFAULT_ORDER.length];
  return {
    name: SYNTHS[id].label.split(' ')[0],
    color: hslHex((i * 47) % 360, 100, 55),
    sound: 'synth:' + id,
    vol: 1, pan: 0, pitch: 0, start: 0, end: 1,
    mode: 'oneshot',
    choke: id === 'hat' || id === 'openhat' ? 1 : 0,
    reverse: false,
    note: 36 + i,
    key: DEFAULT_KEYS[i] || '',
  };
}
function hslHex(h, s, l) {
  s /= 100; l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return '#' + [f(0), f(8), f(4)].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('');
}
function defaultState() {
  return {
    cols: 4, rows: 4, master: 0.8,
    velocityMode: 'fixed', fixedVel: 100, keys: true,
    midi: { enabled: false, input: 'all', output: '', inChannel: 0, outChannel: 1, receive: true, send: true, local: true },
    pads: Array.from({ length: MAX_PADS }, (_, i) => makePad(i)),
  };
}
function mergeState(d, s) {
  for (const k of ['cols', 'rows', 'master', 'velocityMode', 'fixedVel', 'keys']) if (s[k] !== undefined) d[k] = s[k];
  Object.assign(d.midi, s.midi || {});
  (s.pads || []).slice(0, MAX_PADS).forEach((p, i) => Object.assign(d.pads[i], p));
  d.cols = clamp(Math.round(d.cols) || 4, 1, MAX_GRID);
  d.rows = clamp(Math.round(d.rows) || 4, 1, MAX_GRID);
  return d;
}
let state = (() => {
  const d = defaultState();
  try {
    const s = JSON.parse(localStorage.getItem(STORE_KEY));
    if (s) return mergeState(d, s);
  } catch { /* use defaults */ }
  return d;
})();

let saveTimer;
function save() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch { /* storage unavailable */ }
  }, 300);
}

/* ---------- Sample storage (IndexedDB) ---------- */

const idb = {
  db: null,
  open() {
    return new Promise((res, rej) => {
      const r = indexedDB.open('beatpad', 1);
      r.onupgradeneeded = () => r.result.createObjectStore('samples', { keyPath: 'id' });
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });
  },
  async run(mode, fn) {
    this.db ??= await this.open();
    return new Promise((res, rej) => {
      const t = this.db.transaction('samples', mode);
      const req = fn(t.objectStore('samples'));
      t.oncomplete = () => res(req.result);
      t.onerror = () => rej(t.error);
    });
  },
  all() { return this.run('readonly', s => s.getAll()); },
  put(x) { return this.run('readwrite', s => s.put(x)); },
  del(id) { return this.run('readwrite', s => s.delete(id)); },
  clear() { return this.run('readwrite', s => s.clear()); },
};

function addSample(rec) {
  samples.set(rec.id, { ...rec, buffer: toBuffer(rec) });
  idb.put(rec).catch(() => toast('Could not store sample for next visit.'));
}

/* ---------- Voices & triggering ---------- */

const voices = new Set();
const held = new Map(); // pad index -> Set of source keys

function visibleCount() { return state.cols * state.rows; }
function padEl(i) { return $(`#pads [data-i="${i}"]`); }

function stopVoice(v) {
  const t = ctx.currentTime;
  v.g.gain.cancelScheduledValues(t);
  v.g.gain.setTargetAtTime(0, t, 0.008);
  try { v.src.stop(t + 0.06); } catch { /* already stopped */ }
  voices.delete(v);
  refreshPlaying(v.i);
}
function refreshPlaying(i) {
  padEl(i)?.classList.toggle('playing', [...voices].some(v => v.i === i && v.mode === 'loop'));
}

function play(i, vel) {
  const pad = state.pads[i];
  const base = soundOf(pad);
  if (!base) return;
  if (ctx.state !== 'running') ctx.resume();

  if (pad.mode === 'loop') {
    const running = [...voices].filter(v => v.i === i && v.mode === 'loop');
    if (running.length) { running.forEach(stopVoice); return; }
  }
  if (pad.mode === 'gate') [...voices].filter(v => v.i === i).forEach(stopVoice);
  if (pad.choke) [...voices].filter(v => v.choke === pad.choke).forEach(stopVoice);

  const dur = base.duration;
  let s = pad.start * dur;
  let e = Math.max(pad.end * dur, s + 0.005);
  let buf = base;
  if (pad.reverse) { buf = reversed(base); [s, e] = [dur - e, dur - s]; }

  const rate = 2 ** (pad.pitch / 12);
  const src = ctx.createBufferSource();
  src.buffer = buf;
  src.playbackRate.value = rate;
  const g = ctx.createGain();
  g.gain.value = (vel / 127) * pad.vol;
  const pan = ctx.createStereoPanner();
  pan.pan.value = pad.pan;
  src.connect(g).connect(pan).connect(master);

  const v = { src, g, i, choke: pad.choke, mode: pad.mode };
  src.onended = () => { voices.delete(v); refreshPlaying(i); };
  if (pad.mode === 'loop') {
    src.loop = true; src.loopStart = s; src.loopEnd = e;
    src.start(0, s);
  } else {
    src.start(0, s);
    src.stop(ctx.currentTime + (e - s) / rate + 0.01);
  }
  voices.add(v);
  refreshPlaying(i);
}

function press(i, vel, source, fromMidi = false) {
  if (i >= visibleCount()) return;
  let set = held.get(i);
  if (!set) held.set(i, set = new Set());
  if (set.has(source)) return;
  set.add(source);
  padEl(i)?.classList.add('down');
  if (fromMidi || state.midi.local) play(i, vel);
  if (!fromMidi) midiSend(0x90, state.pads[i].note, vel);
}
function release(i, source, fromMidi = false) {
  const set = held.get(i);
  if (!set || !set.delete(source)) return;
  if (!set.size) {
    held.delete(i);
    padEl(i)?.classList.remove('down');
    if (state.pads[i].mode === 'gate') [...voices].filter(v => v.i === i).forEach(stopVoice);
  }
  if (!fromMidi) midiSend(0x80, state.pads[i].note, 0);
}
function releaseAll() {
  for (const [i, set] of [...held]) for (const src of [...set]) release(i, src, src[0] === 'm');
}

/* ---------- Pad grid & input ---------- */

function renderPads() {
  held.clear();
  const el = $('#pads');
  el.style.gridTemplateColumns = `repeat(${state.cols}, minmax(0, 1fr))`;
  el.style.gridTemplateRows = `repeat(${state.rows}, minmax(0, 1fr))`;
  const frag = document.createDocumentFragment();
  // Pad 1 is bottom-left, like hardware pad controllers.
  for (let r = state.rows - 1; r >= 0; r--) {
    for (let c = 0; c < state.cols; c++) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'pad';
      b.dataset.i = r * state.cols + c;
      b.innerHTML = '<span class="pad-name"></span><span class="pad-meta"></span>';
      frag.append(b);
    }
  }
  el.replaceChildren(frag);
  for (let i = 0; i < visibleCount(); i++) updatePadEl(i);
  if (sel >= visibleCount()) sel = 0;
  markSelected();
}
function updatePadEl(i) {
  const b = padEl(i);
  if (!b) return;
  const p = state.pads[i];
  b.style.setProperty('--c', p.color);
  $('.pad-name', b).textContent = p.name || `Pad ${i + 1}`;
  $('.pad-meta', b).textContent = [noteName(p.note), p.key && state.keys ? p.key.toUpperCase() : ''].filter(Boolean).join(' · ');
  b.setAttribute('aria-label', `${p.name || 'Pad ' + (i + 1)}, MIDI note ${p.note}${p.key ? ', key ' + p.key : ''}`);
}

function velocityFrom(e, el) {
  if (state.velocityMode === 'position') {
    const r = el.getBoundingClientRect();
    return clamp(Math.round(127 - ((e.clientY - r.top) / r.height) * 100), 20, 127);
  }
  if (state.velocityMode === 'pressure' && e.pointerType !== 'mouse' && e.pressure > 0) {
    return clamp(Math.round(20 + e.pressure * 107), 1, 127);
  }
  return state.fixedVel;
}

const padsEl = $('#pads');
padsEl.addEventListener('pointerdown', e => {
  const el = e.target.closest('.pad');
  if (!el) return;
  e.preventDefault();
  const i = Number(el.dataset.i);
  el.setPointerCapture(e.pointerId);
  press(i, velocityFrom(e, el), 'p' + e.pointerId);
  if (editMode) selectPad(i);
});
const endPointer = e => {
  const el = e.target.closest?.('.pad');
  if (el) release(Number(el.dataset.i), 'p' + e.pointerId);
};
padsEl.addEventListener('pointerup', endPointer);
padsEl.addEventListener('pointercancel', endPointer);
padsEl.addEventListener('lostpointercapture', endPointer);
padsEl.addEventListener('contextmenu', e => e.preventDefault());

let capturingKey = false;
document.addEventListener('keydown', e => {
  if (capturingKey || e.ctrlKey || e.metaKey || e.altKey) return;
  const t = e.target;
  if ($('#settings').open || /^(INPUT|SELECT|TEXTAREA)$/.test(t.tagName)) return;
  if (e.repeat) { if (t.classList?.contains('pad') || padByKey(e.key) >= 0) e.preventDefault(); return; }
  let i = state.keys ? padByKey(e.key) : -1;
  if (i < 0 && t.classList?.contains('pad') && (e.key === ' ' || e.key === 'Enter')) i = Number(t.dataset.i);
  if (i < 0) return;
  e.preventDefault();
  press(i, state.fixedVel, 'k' + e.key.toLowerCase());
});
document.addEventListener('keyup', e => {
  const src = 'k' + e.key.toLowerCase();
  for (const [i, set] of held) if (set.has(src)) release(i, src);
});
window.addEventListener('blur', releaseAll);
function padByKey(key) {
  const k = key.toLowerCase();
  for (let i = 0; i < visibleCount(); i++) if (state.pads[i].key === k) return i;
  return -1;
}

/* ---------- Forms (generic binding) ---------- */

const getPath = (o, p) => p.split('.').reduce((a, k) => a?.[k], o);
function setPath(o, p, v) {
  const ks = p.split('.');
  const last = ks.pop();
  ks.reduce((a, k) => a[k], o)[last] = v;
}
function syncOutput(el) {
  const out = el.parentElement?.querySelector('output');
  if (!out || el.type !== 'range') return;
  const v = Number(el.value);
  out.textContent = el.name === 'pitch' ? `${v > 0 ? '+' : ''}${v} st`
    : el.name === 'fixedVel' ? String(v)
    : v.toFixed(2);
}
function fillForm(form, obj) {
  for (const el of form.elements) {
    if (!el.name) continue;
    const v = getPath(obj, el.name);
    if (el.type === 'checkbox') el.checked = !!v;
    else el.value = v ?? '';
    syncOutput(el);
  }
}
function bindForm(form, getObj, onChange) {
  form.addEventListener('input', e => {
    const el = e.target;
    if (!el.name) return;
    let v;
    if (el.type === 'checkbox') v = el.checked;
    else if (el.type === 'range' || el.type === 'number') {
      v = el.valueAsNumber;
      if (!Number.isFinite(v)) return;
      v = clamp(v, Number(el.min), Number(el.max));
    } else if (el.dataset.num !== undefined) v = Number(el.value);
    else v = el.value;
    setPath(getObj(), el.name, v);
    syncOutput(el);
    onChange(el.name, v);
    save();
  });
}

/* ---------- Pad editor ---------- */

let editMode = false;
let sel = 0;
const padForm = $('#pad-form');
const curPad = () => state.pads[sel];

function selectPad(i) {
  sel = i;
  markSelected();
  fillEditor();
}
function markSelected() {
  document.querySelectorAll('.pad.selected').forEach(b => b.classList.remove('selected'));
  if (editMode) padEl(sel)?.classList.add('selected');
}
function fillSoundOptions() {
  const sel_ = $('#sound-select');
  sel_.replaceChildren();
  const g1 = document.createElement('optgroup');
  g1.label = 'Built-in';
  for (const [id, d] of Object.entries(SYNTHS)) g1.append(new Option(d.label, 'synth:' + id));
  sel_.append(g1);
  if (samples.size) {
    const g2 = document.createElement('optgroup');
    g2.label = 'My samples';
    for (const s of samples.values()) g2.append(new Option(s.name, 'sample:' + s.id));
    sel_.append(g2);
  }
}
function fillEditor() {
  const pad = curPad();
  $('#ed-index').textContent = `${sel + 1} · ${pad.name}`;
  fillSoundOptions();
  fillForm(padForm, pad);
  $('#note-name').textContent = noteName(pad.note);
  $('#key-btn').textContent = pad.key ? pad.key.toUpperCase() : '—';
  $('#del-sample').hidden = !pad.sound.startsWith('sample:');
  drawWave();
}

bindForm(padForm, curPad, name => {
  const pad = curPad();
  if (name === 'start' && pad.start > pad.end - 0.01) { pad.start = Math.max(0, pad.end - 0.01); fillForm(padForm, pad); }
  if (name === 'end' && pad.end < pad.start + 0.01) { pad.end = Math.min(1, pad.start + 0.01); fillForm(padForm, pad); }
  if (name === 'sound') { pad.start = 0; pad.end = 1; fillEditor(); }
  if (name === 'note') $('#note-name').textContent = noteName(pad.note);
  if (name === 'start' || name === 'end') drawWave();
  $('#ed-index').textContent = `${sel + 1} · ${pad.name}`;
  updatePadEl(sel);
});

function drawWave() {
  const c = $('#wave');
  const w = Math.floor(c.clientWidth * devicePixelRatio);
  const h = Math.floor(c.clientHeight * devicePixelRatio);
  if (!w || !h) return;
  c.width = w; c.height = h;
  const g = c.getContext('2d');
  const pad = curPad();
  const buf = soundOf(pad);
  g.clearRect(0, 0, w, h);
  if (!buf) return;
  const data = buf.getChannelData(0);
  const step = data.length / w;
  g.fillStyle = pad.color;
  for (let x = 0; x < w; x++) {
    let mx = 0;
    const a = Math.floor(x * step), b = Math.min(data.length, Math.floor((x + 1) * step) + 1);
    for (let j = a; j < b; j += Math.max(1, Math.floor((b - a) / 32))) mx = Math.max(mx, Math.abs(data[j]));
    const bh = Math.max(1, mx * h * 0.9);
    g.fillRect(x, (h - bh) / 2, 1, bh);
  }
  g.fillStyle = 'rgb(0 0 0 / 0.65)';
  g.fillRect(0, 0, pad.start * w, h);
  g.fillRect(pad.end * w, 0, w - pad.end * w, h);
}
new ResizeObserver(drawWave).observe($('#wave'));

$('#edit-toggle').addEventListener('click', () => {
  editMode = !editMode;
  $('#edit-toggle').setAttribute('aria-pressed', editMode);
  $('#editor').hidden = !editMode;
  markSelected();
  if (editMode) fillEditor();
});

/* ---------- Key assignment ---------- */

$('#key-btn').addEventListener('click', e => {
  const btn = e.currentTarget;
  btn.textContent = 'Press a key…';
  capturingKey = true;
  const done = ev => {
    ev.preventDefault();
    ev.stopPropagation();
    document.removeEventListener('keydown', done, true);
    capturingKey = false;
    const k = ev.key.length === 1 ? ev.key.toLowerCase() : '';
    if (ev.key !== 'Escape') {
      if (k) state.pads.forEach((p, i) => { if (p.key === k && i !== sel) { p.key = ''; updatePadEl(i); } });
      curPad().key = k;
    }
    updatePadEl(sel);
    fillEditor();
    save();
  };
  document.addEventListener('keydown', done, true);
});

/* ---------- Microphone sampling & file loading ---------- */

let recorder = null;
function setRecUi(on, label) {
  const b = $('#rec-btn');
  b.classList.toggle('active', on);
  b.textContent = label || (on ? '■ Stop' : '● Record from mic');
  $('#meter').hidden = !on;
}
async function toggleRecord() {
  if (recorder) { recorder.stop(); return; }
  if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
    toast('Recording needs HTTPS or localhost.');
    return;
  }
  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } });
  } catch {
    toast('Microphone access denied.');
    return;
  }
  if (ctx.state !== 'running') ctx.resume();
  const target = sel;
  const analyser = ctx.createAnalyser();
  analyser.fftSize = 512;
  const msrc = ctx.createMediaStreamSource(stream);
  msrc.connect(analyser);
  const chunks = [];
  const mr = new MediaRecorder(stream);
  const started = performance.now();
  let raf = 0;
  const level = new Float32Array(analyser.fftSize);
  const tick = () => {
    analyser.getFloatTimeDomainData(level);
    const peak = level.reduce((m, x) => Math.max(m, Math.abs(x)), 0);
    $('#meter-bar').style.inlineSize = Math.min(100, peak * 100) + '%';
    const secs = (performance.now() - started) / 1000;
    $('#rec-btn').textContent = `■ Stop (${secs.toFixed(1)}s)`;
    if (secs >= 15) mr.stop();
    raf = requestAnimationFrame(tick);
  };
  mr.ondataavailable = ev => chunks.push(ev.data);
  mr.onstop = async () => {
    cancelAnimationFrame(raf);
    stream.getTracks().forEach(t => t.stop());
    msrc.disconnect();
    recorder = null;
    setRecUi(false);
    try {
      const abuf = await ctx.decodeAudioData(await new Blob(chunks, { type: mr.mimeType }).arrayBuffer());
      assignSample(target, abuf, 'Mic ' + new Date().toLocaleTimeString());
    } catch {
      toast('Could not read the recording.');
    }
  };
  recorder = mr;
  mr.start();
  setRecUi(true);
  tick();
}
$('#rec-btn').addEventListener('click', toggleRecord);

function assignSample(padIndex, abuf, name) {
  const channels = [];
  for (let c = 0; c < Math.min(2, abuf.numberOfChannels); c++) channels.push(abuf.getChannelData(c).slice());
  let from = 0, to = channels[0].length, peak = 0;
  const sr = abuf.sampleRate;
  const maxAt = i => Math.max(...channels.map(ch => Math.abs(ch[i])));
  if ($('#opt-trim').checked) {
    while (from < to && maxAt(from) < 0.02) from++;
    while (to > from && maxAt(to - 1) < 0.01) to--;
    from = Math.max(0, from - Math.floor(sr * 0.005));
    to = Math.min(channels[0].length, to + Math.floor(sr * 0.05));
  }
  if (to - from < sr * 0.01) { toast('Nothing recorded (too quiet).'); return; }
  const out = channels.map(ch => ch.slice(from, to));
  for (const ch of out) for (const x of ch) peak = Math.max(peak, Math.abs(x));
  if ($('#opt-norm').checked && peak > 0) for (const ch of out) for (let i = 0; i < ch.length; i++) ch[i] *= 0.95 / peak;
  const id = crypto.randomUUID();
  addSample({ id, name, sampleRate: sr, channels: out });
  const pad = state.pads[padIndex];
  pad.sound = 'sample:' + id;
  pad.start = 0; pad.end = 1;
  if (pad.name === SYNTHS[DEFAULT_ORDER[padIndex % 16]].label.split(' ')[0]) { pad.name = 'Sample'; updatePadEl(padIndex); }
  if (padIndex === sel) fillEditor();
  save();
  toast('Sample saved to pad ' + (padIndex + 1));
}

$('#file-btn').addEventListener('click', () => $('#file-input').click());
$('#file-input').addEventListener('change', async e => {
  const f = e.target.files[0];
  e.target.value = '';
  if (!f) return;
  try {
    assignSample(sel, await ctx.decodeAudioData(await f.arrayBuffer()), f.name.replace(/\.[^.]+$/, '').slice(0, 24));
  } catch {
    toast('Could not decode that file.');
  }
});
$('#del-sample').addEventListener('click', () => {
  const id = curPad().sound.split(':')[1];
  samples.delete(id);
  idb.del(id).catch(() => {});
  state.pads.forEach((p, i) => {
    if (p.sound === 'sample:' + id) { p.sound = 'synth:' + DEFAULT_ORDER[i % 16]; p.start = 0; p.end = 1; }
  });
  fillEditor();
  save();
});

/* ---------- WebMIDI ---------- */

let midi = null;
let learning = false;

function midiSend(status, note, vel) {
  if (!midi || !state.midi.send || !state.midi.output) return;
  midi.outputs.get(state.midi.output)?.send([status | (state.midi.outChannel - 1), note, vel]);
}
function onMidiMessage(e) {
  const [st, d1, d2] = e.data;
  if (!state.midi.receive) return;
  const cmd = st & 0xf0;
  if (state.midi.inChannel && (st & 0x0f) + 1 !== state.midi.inChannel) return;
  const on = cmd === 0x90 && d2 > 0;
  const off = cmd === 0x80 || (cmd === 0x90 && d2 === 0);
  if (!on && !off) return;
  if (on && learning) {
    learning = false;
    curPad().note = d1;
    $('#learn-btn').classList.remove('active');
    $('#learn-btn').textContent = 'MIDI learn';
    fillEditor();
    updatePadEl(sel);
    save();
    return;
  }
  for (let i = 0; i < visibleCount(); i++) {
    if (state.pads[i].note !== d1) continue;
    if (on) press(i, d2, 'm' + d1, true);
    else release(i, 'm' + d1, true);
  }
}
function refreshMidiPorts() {
  if (!midi) return;
  const inSel = $('#midi-in'), outSel = $('#midi-out');
  inSel.replaceChildren(new Option('All inputs', 'all'));
  outSel.replaceChildren(new Option('None', ''));
  for (const p of midi.inputs.values()) if (p.state !== 'disconnected') inSel.append(new Option(p.name, p.id));
  for (const p of midi.outputs.values()) if (p.state !== 'disconnected') outSel.append(new Option(p.name, p.id));
  inSel.value = state.midi.input;
  outSel.value = state.midi.output;
  if (inSel.value !== state.midi.input) state.midi.input = inSel.value = 'all';
  if (outSel.value !== state.midi.output) outSel.value = state.midi.output; // keep saved id; may reconnect later
  attachMidiInputs();
  const ni = midi.inputs.size, no = midi.outputs.size;
  const chip = $('#midi-status');
  chip.textContent = `MIDI ${ni} in / ${no} out`;
  chip.classList.add('on');
}
function attachMidiInputs() {
  if (!midi) return;
  for (const p of midi.inputs.values()) {
    p.onmidimessage = state.midi.input === 'all' || state.midi.input === p.id ? onMidiMessage : null;
  }
}
async function initMidi() {
  if (!navigator.requestMIDIAccess) {
    $('#midi-note').textContent = 'WebMIDI is not supported in this browser. Use Chrome or Edge.';
    $('#midi-status').textContent = 'MIDI n/a';
    return;
  }
  try {
    midi = await navigator.requestMIDIAccess();
  } catch {
    $('#midi-note').textContent = 'MIDI access was blocked.';
    $('#midi-status').textContent = 'MIDI blocked';
    return;
  }
  state.midi.enabled = true;
  save();
  midi.onstatechange = refreshMidiPorts;
  refreshMidiPorts();
  $('#midi-note').textContent = 'WebMIDI is on.';
  $('#midi-enable').hidden = true;
}
$('#midi-enable').addEventListener('click', initMidi);
$('#learn-btn').addEventListener('click', async e => {
  if (!midi) await initMidi();
  if (!midi) return;
  learning = !learning;
  e.currentTarget.classList.toggle('active', learning);
  e.currentTarget.textContent = learning ? 'Waiting for a note…' : 'MIDI learn';
});

/* ---------- Settings dialog ---------- */

const settingsForm = $('#settings-form');
for (const id of ['#midi-in-ch', '#midi-out-ch']) {
  const s = $(id);
  if (id === '#midi-in-ch') s.append(new Option('Omni (all)', 0));
  for (let c = 1; c <= 16; c++) s.append(new Option(c, c));
}
bindForm(settingsForm, () => state, name => {
  if (name === 'cols' || name === 'rows') renderPads();
  if (name === 'master') master.gain.value = state.master;
  if (name === 'keys') for (let i = 0; i < visibleCount(); i++) updatePadEl(i);
  if (name === 'midi.input') attachMidiInputs();
});
const openSettings = () => {
  fillForm(settingsForm, state);
  $('#settings').showModal();
};
$('#settings-btn').addEventListener('click', openSettings);
$('#midi-status').addEventListener('click', openSettings);

$('#export-btn').addEventListener('click', () => {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' }));
  a.download = 'beatpad-config.json';
  a.click();
  URL.revokeObjectURL(a.href);
});
$('#import-btn').addEventListener('click', () => $('#import-input').click());
$('#import-input').addEventListener('change', async e => {
  const f = e.target.files[0];
  e.target.value = '';
  if (!f) return;
  try {
    state = mergeState(defaultState(), JSON.parse(await f.text()));
    save();
    master.gain.value = state.master;
    renderPads();
    fillForm(settingsForm, state);
    attachMidiInputs();
    if (editMode) fillEditor();
    toast('Configuration imported.');
  } catch {
    toast('Invalid configuration file.');
  }
});
$('#reset-btn').addEventListener('click', async () => {
  if (!confirm('Reset all settings and delete recorded samples?')) return;
  localStorage.removeItem(STORE_KEY);
  await idb.clear().catch(() => {});
  location.reload();
});

/* ---------- Misc ---------- */

let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2500);
}

(async function init() {
  master.gain.value = state.master;
  renderPads();
  if (state.midi.enabled) initMidi();
  try {
    for (const rec of await idb.all()) samples.set(rec.id, { ...rec, buffer: toBuffer(rec) });
    if (editMode) fillEditor();
  } catch { /* no stored samples */ }
})();
