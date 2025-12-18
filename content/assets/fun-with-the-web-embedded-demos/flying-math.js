(() => {
  const flyingMathContainer = document.querySelector('.flying-math');

  let hasInitialized = false;
  const observer = new IntersectionObserver((entries) => {
    const { intersectionRatio } = entries[0];

    if (!hasInitialized) {
      flyingMathContainer.querySelectorAll('math, .segment, .circle').forEach((el, index) => {
        // position randomly in % of viewport
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        el.style.setProperty('--x', `${x}vw`);
        el.style.setProperty('--y', `${y}vh`);

        if (el.tagName === "DIV") {
          // Random rotate and scale the divs
          const angle = Math.random() * 360;
          const scale = Math.random() * 1.5 + 0.2;
          el.style.transform = `rotateZ(${angle}deg) scale(${scale})`;
        }

        // For browsers which don't support sibling-index, generate a delay in JS instead.
        el.style.setProperty('--delay', `${index * -3}s`);

        hasInitialized = true;
      });
    }

    flyingMathContainer.querySelector('.animation').classList.toggle('running', intersectionRatio >= 0.25);
  }, { threshold: [0, 0.25] });

  observer.observe(flyingMathContainer);
})();
