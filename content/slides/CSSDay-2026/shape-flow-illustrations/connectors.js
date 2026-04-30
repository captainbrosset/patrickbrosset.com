const SVG_NS = 'http://www.w3.org/2000/svg';

let svg = null;
let previousConnector = null;

function initConnectors(parent) {
  if (svg) {
    return;
  }

  svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('class', 'connectors');

  const defs = document.createElementNS(SVG_NS, 'defs');

  const marker = document.createElementNS(SVG_NS, 'marker');
  marker.setAttribute('id', 'arrowhead');
  marker.setAttribute('markerWidth', '10');
  marker.setAttribute('markerHeight', '7');
  marker.setAttribute('refX', '9');
  marker.setAttribute('refY', '3.5');
  marker.setAttribute('orient', 'auto');

  const polygon = document.createElementNS(SVG_NS, 'polygon');
  polygon.setAttribute('points', '0 0, 10 3.5, 0 7');
  polygon.setAttribute('fill', '#333');

  marker.appendChild(polygon);
  defs.appendChild(marker);
  svg.appendChild(defs);

  parent.appendChild(svg);
}

function drawConnector(fromEl, toEl) {
  if (!svg) {
    console.error('SVG not initialized. Call initSVG() first.');
    return;
  }

  // Fade out the previous line
  fadeOutConnector(previousConnector);

  const fromRect = fromEl.getBoundingClientRect();
  const toRect = toEl.getBoundingClientRect();
  const containerRect = layoutContainer.getBoundingClientRect();

  // Calculate points relative to the container, offset down to avoid the index number
  const yOffset = 20; // Offset down from center to avoid the index text
  const x1 = fromRect.left + fromRect.width / 2 - containerRect.left;
  const y1 = fromRect.top + fromRect.height / 2 - containerRect.top + yOffset;
  const x2 = toRect.left + toRect.width / 2 - containerRect.left;
  const y2 = toRect.top + toRect.height / 2 - containerRect.top + yOffset;

  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', x1);
  line.setAttribute('y1', y1);
  line.setAttribute('x2', x2);
  line.setAttribute('y2', y2);
  line.setAttribute('marker-end', 'url(#arrowhead)');

  svg.appendChild(line);
  previousConnector = line;

  return line;
}

function tearDownConnectors() {
  fadeOutConnector(previousConnector);
}

function fadeOutConnector(line) {
  if (!line) return;
  line.classList.add('fade-out');
  line.addEventListener('animationend', (e) => {
    e.target.remove();
  });
}
