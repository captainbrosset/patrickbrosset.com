// Computes which browser engine shipped each web feature first, from the web-features package.
// Chromium = Chrome + Edge, Gecko = Firefox, WebKit = Safari (desktop only).
// The result is exposed to the /lab/who-shipped-first/ page as global data.
const { browsers, features } = require("web-features");

// Features that any engine already supported on or before this date are ignored: nobody
// can be said to have shipped them first. Defaults to Chrome 1's release; try "2015-01-01" for a more modern view.
const CUTOFF_DATE = "2008-12-11";

const ENGINES = {
  chromium: ["chrome", "edge"],
  gecko: ["firefox"],
  webkit: ["safari"],
};

function releaseDate(browser, version) {
  // "≤79" means "at or before 79": the real date is unknown, so the ordering is unreliable.
  const approximate = version.startsWith("≤");
  const release = browsers[browser].releases.find((r) => r.version === version.replace("≤", ""));
  return release ? { date: release.date, approximate } : null;
}

function engineShipDate(engine, support) {
  let best = null;
  for (const browser of ENGINES[engine]) {
    if (!support[browser]) continue;
    const release = releaseDate(browser, support[browser]);
    if (release && (!best || release.date < best.date)) best = release;
  }
  return best;
}

function listWhoShippedFirst() {
  const result = [];
  let skippedApproximate = 0;
  let skippedLegacy = 0;

  for (const [id, feature] of Object.entries(features)) {
    if (feature.kind !== "feature" || feature.discouraged || !feature.status?.support) continue;

    const dates = {};
    let approximate = false;
    for (const engine of Object.keys(ENGINES)) {
      const ship = engineShipDate(engine, feature.status.support);
      if (!ship) continue;
      dates[engine] = ship.date;
      approximate ||= ship.approximate;
    }

    const shipped = Object.keys(dates);
    if (shipped.length < 1) continue;
    if (approximate) {
      skippedApproximate++;
      continue;
    }

    const byDate = [...shipped].sort((a, b) => dates[a].localeCompare(dates[b]));
    if (dates[byDate[0]] <= CUTOFF_DATE) {
      skippedLegacy++;
      continue;
    }

    // Engines landing in the same month count as a concerted launch: nobody shipped first.
    const [leader, runnerUp] = byDate;
    const clearWinner = !runnerUp || dates[leader].slice(0, 7) < dates[runnerUp].slice(0, 7);
    result.push({
      id,
      name: feature.name,
      engines: shipped.length,
      dates,
      first: clearWinner ? [leader] : [],
    });
  }

  result.sort((a, b) => a.name.localeCompare(b.name));
  return {
    features: result,
    skippedApproximate,
    skippedLegacy,
    cutoff: CUTOFF_DATE,
    generated: new Date().toISOString().slice(0, 10),
  };
}

module.exports = { listWhoShippedFirst };
