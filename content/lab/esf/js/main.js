// Orchestrates the page: channel toggle, historical graph, and live failures.
import { fetchHistory } from './csv.js';
import { fetchLatestRuns, fetchEngineFailures } from './api.js';
import { renderChart } from './chart.js';
import { initFailuresUi, setFailures, clearFailures } from './failures.js';
import { CSV_URLS } from './config.js';

let channel = 'experimental';
let loadToken = 0;

function setStatus(id, message, isError = false) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = message;
  el.classList.toggle('error', isError);
}

async function loadHistory(token) {
  setStatus('graph-status', 'Loading historical data\u2026');
  try {
    const history = await fetchHistory(channel);
    if (token !== loadToken) return;
    renderChart(document.getElementById('bsf-chart'), history);
    const last = history.dates[history.dates.length - 1];
    setStatus('graph-status', `${history.dates.length} data points, latest ${last}.`);
  } catch (err) {
    if (token !== loadToken) return;
    setStatus('graph-status', `Could not load historical data: ${err.message}`, true);
  }
}

async function loadLive(token) {
  clearFailures();
  setStatus('live-status', 'Loading failing tests\u2026');
  document.getElementById('live-context').textContent = 'Loading latest run\u2026';
  try {
    const { runs, revision, date } = await fetchLatestRuns(channel);
    if (token !== loadToken) return;

    const when = new Date(date).toISOString().slice(0, 10);
    const versions = Object.values(runs)
      .map((r) => `${r.browser_name} ${r.browser_version}`)
      .join(' \u00b7 ');
    document.getElementById('live-context').innerHTML =
      `Aligned ${channel} run from ${when} (rev <a href="https://github.com/web-platform-tests/wpt/commit/${String(revision).slice(0, 10)}">${String(revision).slice(0, 10)}</a>):<br>${versions}`;

    const failures = await fetchEngineFailures(runs);
    if (token !== loadToken) return;
    setFailures(failures, runs);
  } catch (err) {
    if (token !== loadToken) return;
    setStatus('live-status', `Could not load failing tests: ${err.message}`, true);
    document.getElementById('live-context').textContent = '';
  }
}

function reload() {
  const token = ++loadToken;
  loadHistory(token);
  loadLive(token);
}

initFailuresUi();
// Set the results-analysis link to the current experimental CSV URL
document.getElementById('results-analysis-link').href = CSV_URLS.experimental;
reload();
