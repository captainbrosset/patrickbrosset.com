(() => {
  const container = document.querySelector('.shadows .wrapper');

  function addCircle() {
    const div = document.createElement("div");
    div.classList.add("circle");

    const x = (Math.random() * container.offsetWidth) * 2 - container.offsetWidth;
    const y = (Math.random() * container.offsetHeight) * 2 - container.offsetHeight;
    div.style.left = `${x}px`;
    div.style.top = `${y}px`;

    const size = Math.random() * 100 + 5;
    div.style.setProperty('--shadow-size', size + "vmin");

    container.appendChild(div);
  }


  let hasInitialized = false;
  const observer = new IntersectionObserver((entries) => {
    if (!hasInitialized) {
      for (let i = 0; i < 20; i++) {
        addCircle();
      }

      hasInitialized = true;
    }
  }, { threshold: 0 });

  observer.observe(container);

  container.addEventListener("click", () => {
    container.classList.toggle("colored");
  })
})();
