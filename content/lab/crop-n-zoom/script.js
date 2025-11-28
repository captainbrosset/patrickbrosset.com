const imgEl = document.querySelector('#image');
const zoomEl = document.querySelector('#zoomer');
const resetEl = document.querySelector('#reset');

let currentX, currentY, currentWidth, currentHeight, cssWidth, currentZoom;

function init() {
  currentX = 0;
  currentY = 0;
  currentWidth = imgEl.naturalWidth;
  currentHeight = imgEl.naturalHeight;
  cssWidth = imgEl.clientWidth;
  currentZoom = 1;

  imgEl.style.setProperty('--crop-x', currentX + "px");
  imgEl.style.setProperty('--crop-y', currentY + "px");
  imgEl.style.setProperty('--crop-width', currentWidth + "px");
  imgEl.style.setProperty('--crop-height', currentHeight + "px");
  zoomEl.value = currentZoom;
}

init();

resetEl.addEventListener('click', init);

addEventListener('resize', () => {
  cssWidth = imgEl.clientWidth;
});

zoomEl.addEventListener('input', (event) => {
  const oldZoom = currentZoom;
  currentZoom = event.target.value;

  // Calculate the corresponding xywh values for the zoomed-in area
  const oldCropWidth = currentWidth / oldZoom;
  const oldCropHeight = currentHeight / oldZoom;
  const cropWidth = currentWidth / currentZoom;
  const cropHeight = currentHeight / currentZoom;

  // Find the center of the current crop area
  const centerX = currentX + oldCropWidth / 2;
  const centerY = currentY + oldCropHeight / 2;

  // Keep the same center point, but with the new crop dimensions
  currentX = centerX - cropWidth / 2;
  currentY = centerY - cropHeight / 2;

  // Clamp to valid bounds
  const maxX = currentWidth - cropWidth;
  const maxY = currentHeight - cropHeight;
  currentX = Math.max(0, Math.min(currentX, maxX));
  currentY = Math.max(0, Math.min(currentY, maxY));

  imgEl.style.setProperty('--crop-x', currentX + "px");
  imgEl.style.setProperty('--crop-y', currentY + "px");
  imgEl.style.setProperty('--crop-width', cropWidth + "px");
  imgEl.style.setProperty('--crop-height', cropHeight + "px");
});

imgEl.addEventListener('mousedown', downEvent => {
  downEvent.preventDefault();

  const initialGrabX = downEvent.clientX;
  const initialGrabY = downEvent.clientY;
  let newGrabX = 0;
  let newGrabY = 0;
  const cssScaleFactor = currentWidth / cssWidth;

  document.documentElement.classList.toggle('panning', true);

  const onMove = moveEvent => {
    newGrabX = moveEvent.clientX;
    newGrabY = moveEvent.clientY;

    let deltaX = newGrabX - initialGrabX;
    let deltaY = newGrabY - initialGrabY;

    deltaX *= cssScaleFactor / currentZoom;
    deltaY *= cssScaleFactor / currentZoom;

    // Calculate new position with clamping to prevent empty areas
    const cropWidth = currentWidth / currentZoom;
    const cropHeight = currentHeight / currentZoom;
    const maxX = currentWidth - cropWidth;
    const maxY = currentHeight - cropHeight;

    const newX = Math.max(0, Math.min(currentX - deltaX, maxX));
    const newY = Math.max(0, Math.min(currentY - deltaY, maxY));

    imgEl.style.setProperty('--crop-x', newX + "px");
    imgEl.style.setProperty('--crop-y', newY + "px");
  };

  addEventListener('mousemove', onMove);

  addEventListener('mouseup', () => {
    currentX -= (newGrabX - initialGrabX) * (cssScaleFactor / currentZoom);
    currentY -= (newGrabY - initialGrabY) * (cssScaleFactor / currentZoom);

    document.documentElement.classList.toggle('panning', false);
    removeEventListener('mousemove', onMove);
  }, { once: true });
});
