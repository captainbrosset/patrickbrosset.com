(function () {
  const channel = new BroadcastChannel('slide-presenter');

  function normalize(path) {
    let p = path;
    if (p.startsWith(BASE)) p = p.slice(BASE.length);
    return p
      .replace(/\/index\.html$/i, '')
      .replace(/\.html$/i, '')
      .replace(/\/$/, '');
  }

  const currentSlide = normalize(window.location.pathname);

  // Broadcast current slide on load.
  // But only if we're not included in the preview frame.
  if (self.parent === self) {
    channel.postMessage({ type: 'slide-changed', slug: currentSlide });
  }

  // Listen for navigation commands from the presenter board.
  channel.onmessage = function (e) {
    if (e.data.type === 'navigate' && e.data.slug !== currentSlide) {
      window.location.href = BASE + e.data.slug;
    }
  };

  fetch(BASE + '_sequence.json')
    .then(r => r.json())
    .then(sequence => {
      const slideIndex = sequence.indexOf(currentSlide);

      addEventListener('keydown', function (e) {
        if (e.target.matches && e.target.matches('input, textarea, select')) {
          return;
        }

        if (slideIndex === -1) {
          return;
        }

        // PageDown / PageUp: navigate slides.
        if (e.key === 'PageDown' && slideIndex + 1 < sequence.length) {
          e.preventDefault();
          window.location.href = BASE + sequence[slideIndex + 1];
        } else if (e.key === 'PageUp' && slideIndex - 1 >= 0) {
          e.preventDefault();
          window.location.href = BASE + sequence[slideIndex - 1];
        }
      });
    });
})();
