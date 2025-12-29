(() => {
  const container = document.querySelector('.popup-hell');

  const NB = 100;
  const MESSAGES = [
    "Are you sure you want to delete everything?",
    "Do you want to proceed with the self-destruct sequence?",
    "Are you sure you want to format your hard drive?",
    "Do you want to install malware on your computer?",
    "Are you sure you want to give away all your personal data?",
    "Do you want to reset your internet connection?",
    "Are you sure you want to cancel your subscription to life?",
    "Do you want to uninstall your operating system?",
    "Are you sure you want to delete the internet history of all users?",
    "Do you want to enable 'Dark Mode' permanently on all devices?",
    "Are you sure you want to turn off all security features?",
    "Do you want to share your location with everyone?",
    "Are you sure you want to disable all firewalls?"
  ]

  function createPopup() {
    const popup = document.createElement("div");
    popup.classList.add("popup");

    const title = document.createElement("div");
    title.classList.add("title");
    title.textContent = "Confirm";
    popup.appendChild(title);

    const content = document.createElement("div");
    content.classList.add("content");
    content.textContent = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
    popup.appendChild(content);

    const actions = document.createElement("div");
    actions.classList.add("actions");
    popup.appendChild(actions);

    const btnCancel = document.createElement("button");
    btnCancel.textContent = "Cancel";
    actions.appendChild(btnCancel);

    const space = document.createTextNode(" ");
    actions.appendChild(space);

    const btnOk = document.createElement("button");
    btnOk.textContent = "OK";
    actions.appendChild(btnOk);

    return popup;
  }

  function makeDraggable(element) {
    let isDragging = false;

    const startDrag = (clientX, clientY) => {
      isDragging = true;

      const rect = element.getBoundingClientRect();
      const offsetX = clientX - rect.left;
      const offsetY = clientY - rect.top;

      const onMove = (clientX, clientY) => {
        if (isDragging) {
          const containerRect = container.getBoundingClientRect();
          element.style.left = `${clientX - containerRect.left - offsetX}px`;
          element.style.top = `${clientY - containerRect.top - offsetY}px`;
        }
      };

      const onMouseMove = (e) => onMove(e.clientX, e.clientY);
      const onTouchMove = (e) => {
        e.preventDefault();
        onMove(e.touches[0].clientX, e.touches[0].clientY);
      };

      const endDrag = () => {
        isDragging = false;
        removeEventListener("mousemove", onMouseMove);
        removeEventListener("touchmove", onTouchMove);
        removeEventListener("mouseup", endDrag);
        removeEventListener("touchend", endDrag);
      };

      addEventListener("mousemove", onMouseMove);
      addEventListener("touchmove", onTouchMove, { passive: false });
      addEventListener("mouseup", endDrag, { once: true });
      addEventListener("touchend", endDrag, { once: true });
    };

    element.addEventListener("mousedown", (e) => {
      startDrag(e.clientX, e.clientY);
    });

    element.addEventListener("touchstart", (e) => {
      startDrag(e.touches[0].clientX, e.touches[0].clientY);
    });
  }

  const horizontalPos = ["left", "right"];
  const verticalPos = ["top", "bottom"];

  for (let i = 0; i < NB; i++) {
    const popup = createPopup();
    container.appendChild(popup);

    popup.style.anchorName = `--anchor-${i}`;

    if (i > 0) {
      popup.style.positionAnchor = container.querySelectorAll('.popup')[Math.floor(Math.random() * i)].style.anchorName;

      const hPos = horizontalPos[Math.floor(Math.random() * horizontalPos.length)];
      const hMult = (Math.random() * 1) + 0.2;
      const vPos = verticalPos[Math.floor(Math.random() * verticalPos.length)];
      const vMult = (Math.random() * 1) + 0.2;

      popup.style[hPos] = `calc(anchor(${hPos}) / ${hMult})`;
      popup.style[vPos] = `calc(anchor(${vPos}) / ${vMult})`;
    } else {
      makeDraggable(popup);
    }
  }
})();
