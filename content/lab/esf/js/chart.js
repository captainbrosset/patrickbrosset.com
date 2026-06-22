// Renders the historical line chart using Chart.js (loaded globally via CDN).
import { ENGINES } from './config.js';

let chart = null;

export function renderChart(canvas, history) {
  const datasets = ENGINES.map((engine) => ({
    label: engine.label,
    data: history.series[engine.id],
    borderColor: engine.color,
    backgroundColor: engine.color,
    borderWidth: 2,
    pointRadius: 0,
    pointHoverRadius: 4,
    tension: 0.1,
    spanGaps: true,
  }));

  const config = {
    type: 'line',
    data: { labels: history.dates, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { labels: { color: '#1a1a1a' } },
        tooltip: { mode: 'index', intersect: false },
      },
      scales: {
        x: {
          ticks: { color: '#1a1a1a', maxTicksLimit: 12 },
          grid: { color: '#e0e0e0' },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Tests that fail in exactly 1 engine',
            color: '#1a1a1a',
          },
          ticks: { color: '#1a1a1a' },
          grid: { color: '#e0e0e0' },
        },
      },
    },
  };

  if (chart) {
    chart.data = config.data;
    chart.update();
  } else {
    // eslint-disable-next-line no-undef
    chart = new Chart(canvas, config);
  }
}
