(() => {
  const container = document.querySelector('.kaleidoscope .wrapper');
  const bladesContainer = container.querySelector('.blades');
  const sizeControl = container.querySelector("#size-control");
  const positionControl = container.querySelector("#position-control");
  const rotationControl = container.querySelector("#rotation-control");
  const numberControl = container.querySelector("#number-control");

  sizeControl.addEventListener("input", () => {
    container.style.setProperty("--size", `${sizeControl.value}px`);
  });

  positionControl.addEventListener("input", () => {
    container.style.setProperty("--position", `0px -${positionControl.value}px`);
  });

  rotationControl.addEventListener("input", () => {
    container.style.setProperty("--rotation", `${rotationControl.value}deg`);
  });

  numberControl.addEventListener("input", () => {
    const nb = parseInt(numberControl.value, 10);
    const angle = 360 / nb;
    container.style.setProperty("--angle", angle + "deg");

    // recreate the right nb of blade divs.
    while (bladesContainer.firstChild) {
      bladesContainer.firstChild.remove();
    }

    for (let i = 0; i < nb; i++) {
      const blade = document.createElement("div");
      blade.classList.add("blade");
      bladesContainer.appendChild(blade);
    }
  });
})();
