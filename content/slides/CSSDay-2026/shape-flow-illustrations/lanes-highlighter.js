let lanesHighlighter = null;

async function initLanesHighlighter(layoutContainer, delay, dir) {
  lanesHighlighter = document.createElement('div');
  lanesHighlighter.classList.add('lanes-highlight');
  lanesHighlighter.classList.add(dir);

  layoutContainer.appendChild(lanesHighlighter);

  await new Promise(resolve => {
    lanesHighlighter.addEventListener('animationend', resolve, { once: true });
  });

  await new Promise(resolve => setTimeout(resolve, delay));
}