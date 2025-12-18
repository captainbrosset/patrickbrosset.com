(() => {
  const container = document.querySelector('.wormy');

  container.addEventListener('mousemove', (event) => {
    const x = event.layerX;
    const y = event.layerY;

    head.style.left = `${x}px`;
    head.style.top = `${y}px`;
  });
})();
