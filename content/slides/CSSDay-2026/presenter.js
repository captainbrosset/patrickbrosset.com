(function () {
  const BASE = '/slides/CSSDay-2026/';
  const channel = new BroadcastChannel('cssday-presenter');

  function normalize(path) {
    let p = path;
    if (p.startsWith(BASE)) p = p.slice(BASE.length);
    return p
      .replace(/\/index\.html$/i, '')
      .replace(/\.html$/i, '')
      .replace(/\/$/, '');
  }

  const current = normalize(window.location.pathname);

  // Broadcast current slide on load.
  channel.postMessage({ type: 'slide-changed', slug: current });

  // Listen for navigation commands from the presenter board.
  channel.onmessage = function (e) {
    if (e.data.type === 'navigate' && e.data.slug !== current) {
      window.location.href = BASE + e.data.slug;
    }
  };

  fetch(BASE + 'sequence.json')
    .then(function (r) { return r.json(); })
    .then(function (sequence) {
      var idx = sequence.indexOf(current);

      document.addEventListener('keydown', function (e) {
        if (e.target.matches && e.target.matches('input, textarea, select')) return;

        // F2: toggle slide overview overlay.
        if (e.key === 'F2') {
          e.preventDefault();
          toggleOverlay(sequence);
          return;
        }

        if (idx === -1) return;

        // PageDown / PageUp: navigate slides.
        if (e.key === 'PageDown' && idx + 1 < sequence.length) {
          e.preventDefault();
          window.location.href = BASE + sequence[idx + 1];
        } else if (e.key === 'PageUp' && idx - 1 >= 0) {
          e.preventDefault();
          window.location.href = BASE + sequence[idx - 1];
        }
      });
    })
    .catch(function () {});

  function toggleOverlay(sequence) {
    var overlay = document.getElementById('slide-overview');
    if (overlay) {
      overlay.remove();
      return;
    }

    overlay = document.createElement('div');
    overlay.id = 'slide-overview';
    overlay.style.cssText =
      'position:fixed;inset:0;background:rgba(0,0,0,.92);color:white;' +
      'z-index:99999;overflow:auto;padding:2rem;font-family:system-ui;';

    var heading = document.createElement('h2');
    heading.textContent = 'All slides (press F2 to close)';
    heading.style.marginBottom = '1rem';
    overlay.appendChild(heading);

    var ol = document.createElement('ol');
    ol.style.cssText = 'columns:2;column-gap:2rem;font-size:14pt;';

    sequence.forEach(function (slug) {
      var li = document.createElement('li');
      li.style.cssText = 'padding:.3rem 0;break-inside:avoid;';
      if (slug === current) {
        li.style.fontWeight = 'bold';
        li.style.color = '#4fc3f7';
      }
      var a = document.createElement('a');
      a.href = BASE + slug;
      a.textContent = slug || '(title)';
      a.style.color = 'inherit';
      li.appendChild(a);
      ol.appendChild(li);
    });

    overlay.appendChild(ol);

    // Click background to close.
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) overlay.remove();
    });

    document.body.appendChild(overlay);
  }
})();
