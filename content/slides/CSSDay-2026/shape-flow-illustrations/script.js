const layoutContainer = document.querySelector('.layout-container');

async function drawAndConnectItems(dir, nbItems, delayBetweenItems, itemRatioGetter, itemLaneSpanGetter) {
  initConnectors(layoutContainer);
  await draw(dir, nbItems, delayBetweenItems, itemRatioGetter, itemLaneSpanGetter, true);
  tearDownConnectors();
}

async function drawAndHighlightLanes(dir, nbItems, delayBetweenItems, itemRatioGetter, itemLaneSpanGetter) {
  await initLanesHighlighter(layoutContainer, delayBetweenItems, dir);
  await draw(dir, nbItems, delayBetweenItems, itemRatioGetter, itemLaneSpanGetter);
  tearDownLanesHighlighter();
}

async function draw(dir, nbItems, delayBetweenItems, itemRatioGetter, itemLaneSpanGetter, drawConnectors) {
  let previousItem = null;

  for (let i = 0; i < nbItems; i++) {
    const item = document.createElement('div');
    item.classList.add('item');

    item.style.aspectRatio = itemRatioGetter();
    const laneSpan = itemLaneSpanGetter();
    item.style.gridArea = dir === "column"
      ? `auto / auto / span 1 / span ${itemLaneSpanGetter()}`
      : `auto / auto / span ${itemLaneSpanGetter()} / span 1`;

    layoutContainer.appendChild(item);

    if (drawConnectors && previousItem) {
      drawConnector(previousItem, item);
    }
    previousItem = item;

    await new Promise(resolve => setTimeout(resolve, delayBetweenItems));
  }
}
