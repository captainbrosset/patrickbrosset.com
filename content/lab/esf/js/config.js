// Engine model and shared configuration.

// Canonical engines shown in the graph and live list.
// `browser` is the wpt.fyi browser_name / CSV column used as the engine's source.
export const ENGINES = [
  { id: 'blink', label: 'Blink', browser: 'chrome', color: '#4285f4' },
  { id: 'gecko', label: 'Gecko', browser: 'firefox', color: '#ff9400' },
  { id: 'webkit', label: 'WebKit', browser: 'safari', color: '#1b9e77' },
];

export const ENGINE_BY_BROWSER = Object.fromEntries(
  ENGINES.map((e) => [e.browser, e])
);

// The "-with-third-party" variants include tests under wpt's third_party
// directory, so the graph reflects the full test corpus.
export const CSV_URLS = {
  experimental:
    'https://raw.githubusercontent.com/web-platform-tests/results-analysis/gh-pages/data/experimental-browser-specific-failures-with-third-party.csv',
  // Stable URL for future reference:
  // 'https://raw.githubusercontent.com/web-platform-tests/results-analysis/gh-pages/data/stable-browser-specific-failures-with-third-party.csv',
};

export const WPT_BASE = 'https://wpt.fyi';
