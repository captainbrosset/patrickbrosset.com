// Renders the live engine-specific failures list with engine tabs + filtering.
import { WPT_BASE, ENGINES } from './config.js';

const state = {
  failures: {}, // { engineId: string[] }
  runIds: '',
  activeEngine: 'blink',
  filter: '',
};

function resultsUrl(test) {
  return `${WPT_BASE}/results${test}?run_ids=${state.runIds}`;
}

// Build a nested tree from test paths like "/css/foo/bar.html".
// Each node: { dirs: Map<name, node>, files: [{ name, path }] }.
function buildTree(tests) {
  const root = { dirs: new Map(), files: [] };
  for (const test of tests) {
    const parts = test.split('/').filter(Boolean);
    let node = root;
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!node.dirs.has(part)) {
        node.dirs.set(part, { dirs: new Map(), files: [] });
      }
      node = node.dirs.get(part);
    }
    node.files.push({ name: parts[parts.length - 1] || test, path: test });
  }
  return root;
}

function countLeaves(node) {
  let total = node.files.length;
  for (const child of node.dirs.values()) total += countLeaves(child);
  return total;
}

function renderNode(node, expand) {
  const frag = document.createDocumentFragment();

  for (const name of [...node.dirs.keys()].sort((a, b) => countLeaves(node.dirs.get(b)) - countLeaves(node.dirs.get(a)))) {
    const child = node.dirs.get(name);
    const details = document.createElement('details');
    details.className = 'tree-dir';
    if (expand) details.open = true;

    const summary = document.createElement('summary');
    const label = document.createElement('span');
    label.className = 'tree-name';
    label.textContent = name;
    const count = document.createElement('span');
    count.className = 'tree-count';
    count.textContent = countLeaves(child);
    summary.append(label, count);
    details.appendChild(summary);

    const children = document.createElement('div');
    children.className = 'tree-children';
    children.appendChild(renderNode(child, expand));
    details.appendChild(children);

    frag.appendChild(details);
  }

  for (const file of node.files.sort((a, b) => a.name.localeCompare(b.name))) {
    const item = document.createElement('div');
    item.className = 'tree-file';
    const a = document.createElement('a');
    a.href = resultsUrl(file.path);
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = file.name;
    item.appendChild(a);
    frag.appendChild(item);
  }

  return frag;
}

function render() {
  const list = document.getElementById('failures-list');
  const status = document.getElementById('live-status');
  const tests = state.failures[state.activeEngine] || [];
  const needle = state.filter.trim().toLowerCase();
  const filtered = needle
    ? tests.filter((t) => t.toLowerCase().includes(needle))
    : tests;

  const engineLabel =
    ENGINES.find((e) => e.id === state.activeEngine)?.label || '';
  status.classList.remove('error');
  status.textContent = needle
    ? `${filtered.length} of ${tests.length} ${engineLabel}-only failures match.`
    : `${tests.length} tests fail only in ${engineLabel}.`;

  list.innerHTML = '';
  // Auto-expand directories while filtering so matches are visible.
  list.appendChild(renderNode(buildTree(filtered), Boolean(needle)));
}

export function setFailures(failures, runs) {
  state.failures = failures;
  state.runIds = ENGINES.map((e) => runs[e.id].id).join(',');
  render();
}

export function clearFailures() {
  state.failures = {};
  const list = document.getElementById('failures-list');
  if (list) list.innerHTML = '';
}

export function initFailuresUi() {
  document.querySelectorAll('.engine-tab').forEach((btn) => {
    btn.addEventListener('click', () => {
      document
        .querySelectorAll('.engine-tab')
        .forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      state.activeEngine = btn.dataset.engine;
      render();
    });
  });

  // Test path filtering can be added back by uncommenting the code below
  // and adding the input element back to the HTML.
  // const filterInput = document.getElementById('test-filter');
  // filterInput.addEventListener('input', () => {
  //   state.filter = filterInput.value;
  //   render();
  // });
}
