// CSV fetching and parsing for the historical BSF data.
import { CSV_URLS, ENGINES } from './config.js';

// Minimal CSV parser. The results-analysis CSV has no quoted/embedded commas,
// so a simple split is sufficient and avoids a dependency.
function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  const header = lines[0].split(',');
  return lines.slice(1).map((line) => {
    const cells = line.split(',');
    const row = {};
    header.forEach((key, i) => {
      row[key] = cells[i];
    });
    return row;
  });
}

// Returns { dates: string[], series: { [engineId]: number[] } }
export async function fetchHistory(channel) {
  const url = CSV_URLS[channel];
  if (!url) throw new Error(`Unknown channel: ${channel}`);

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch CSV (${res.status})`);
  }
  const rows = parseCsv(await res.text());

  const dates = [];
  const series = Object.fromEntries(ENGINES.map((e) => [e.id, []]));

  for (const row of rows) {
    if (!row.date) continue;
    dates.push(row.date);
    for (const engine of ENGINES) {
      const value = parseFloat(row[engine.browser]);
      series[engine.id].push(Number.isFinite(value) ? value : null);
    }
  }

  return { dates, series };
}
