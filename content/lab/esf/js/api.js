// wpt.fyi API: latest aligned runs + structured search for engine-specific failures.
import { WPT_BASE, ENGINES } from './config.js';

// Fetch the latest aligned run for each engine on the given channel.
// Returns { runs: { [engineId]: run }, revision, date }.
export async function fetchLatestRuns(channel) {
  const url =
    `${WPT_BASE}/api/runs?label=master&label=${channel}&aligned&max-count=1`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch runs (${res.status})`);
  const all = await res.json();

  const runs = {};
  for (const engine of ENGINES) {
    const run = all.find((r) => r.browser_name === engine.browser);
    if (run) runs[engine.id] = run;
  }

  const missing = ENGINES.filter((e) => !runs[e.id]).map((e) => e.label);
  if (missing.length) {
    throw new Error(`No aligned run found for: ${missing.join(', ')}`);
  }

  const sample = runs[ENGINES[0].id];
  return {
    runs,
    revision: sample.full_revision_hash || sample.revision,
    date: sample.created_at,
  };
}

// Build the structured query: target engine fails, the other two pass.
function failuresQuery(targetEngine) {
  const others = ENGINES.filter((e) => e.id !== targetEngine.id);
  return {
    and: [
      { browser_name: targetEngine.browser, status: 'FAIL' },
      ...others.map((e) => ({ browser_name: e.browser, status: 'PASS' })),
    ],
  };
}

// Run one search per engine so each result set is unambiguously attributable.
// Returns { [engineId]: string[] } of test paths.
export async function fetchEngineFailures(runs) {
  const runIds = ENGINES.map((e) => runs[e.id].id);

  const entries = await Promise.all(
    ENGINES.map(async (engine) => {
      const body = JSON.stringify({
        run_ids: runIds,
        query: failuresQuery(engine),
      });
      const res = await fetch(`${WPT_BASE}/api/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      });
      if (!res.ok) {
        throw new Error(`Search failed for ${engine.label} (${res.status})`);
      }
      const data = await res.json();
      const tests = (data.results || []).map((r) => r.test).sort();
      return [engine.id, tests];
    })
  );

  return Object.fromEntries(entries);
}
