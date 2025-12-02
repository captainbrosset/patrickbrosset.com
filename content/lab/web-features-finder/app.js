import taskTree from './web-dev-tasks.json' with { type: 'json' };

const ALL_BROWSERS = ['chrome', 'chrome_android', 'edge', 'firefox', 'firefox_android', 'safari', 'safari_ios'];
const webFeatures = {};

const columnsContainer = document.getElementById('columns-container');

function focusElementAndScrollColumn(element, column, backward) {
  element.focus();
  column.scrollIntoView({ behavior: "smooth", block: "start", inline: backward ? "end" : "start" });
}

function createColumnDom(depth, title, noListOfEntries) {
  const el = document.createElement('div');
  el.dataset.depth = depth;
  el.className = 'column';
  // Remove the column from tab order, because the ul inside them are
  // already reachable. In Chromium and Firefox, they may get focused otherwise.
  el.tabIndex = -1;

  const titleTag = depth <= 4 ? `h${depth + 2}` : 'div';
  const columnTitle = document.createElement(titleTag);

  columnTitle.className = 'column-title';
  columnTitle.textContent = title;

  const id = `column-title-${depth}`;
  columnTitle.id = id;

  el.appendChild(columnTitle);

  let ul;
  if (!noListOfEntries) {
    ul = document.createElement('ul');
    ul.role = 'listbox';
    ul.setAttribute('tabindex', '0');
    ul.setAttribute('aria-labelledby', id);
    el.appendChild(ul);
  }

  return { el, entriesEl: ul };
}

function createColumnButtonDom(className, id) {
  const li = document.createElement('li');
  const button = document.createElement('button');
  li.appendChild(button);

  button.role = 'option';
  button.className = className;
  button.id = id;
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('type', 'button');
  // button.setAttribute('aria-controls', ???);

  return { li, button };
}

function titleToID(title) {
  return title.replace(/[^a-zA-Z\d\s:]/g, "").toLowerCase().replaceAll(" ", "-");
}

function markColumnButtonAsSelected(columnContainer, selectedButton) {
  // Remove selected class from siblings.
  Array.from(columnContainer.querySelectorAll('button[role="option"]')).forEach(otherButton => {
    otherButton.setAttribute('aria-selected', 'false');
    otherButton.setAttribute('aria-expanded', 'false');
  });

  // Mark the selected button.
  selectedButton.setAttribute('aria-selected', 'true');
  selectedButton.setAttribute('aria-expanded', 'true');

  // Update aria-activedescendant on the listbox.
  const columnList = columnContainer.querySelector('ul[role="listbox"]');
  columnList.setAttribute('aria-activedescendant', selectedButton.id);
}

function renderTaskColumn(data, title, depth) {
  // Remove all columns after this depth
  while (columnsContainer.children.length > depth) {
    columnsContainer.removeChild(columnsContainer.lastChild);
  }

  const { el: column, entriesEl } = createColumnDom(depth, title);
  columnsContainer.appendChild(column);

  // Get all tasks at this level
  const tasks = Object.entries(data);

  tasks.forEach(([taskLabel, taskData]) => {
    const { li: taskItem, button } = createColumnButtonDom('task-item', `task-${titleToID(taskLabel)}`);
    button.textContent = taskLabel;
    entriesEl.appendChild(taskItem);

    button.addEventListener('click', () => {
      handleTaskClick(button, taskData);
    });
  });

  // Focus on creation, so that selecting an item in the previous column
  // moves focus here.
  focusElementAndScrollColumn(entriesEl, column);
}

function handleTaskClick(button, taskData) {
  const column = button.closest('.column');
  const depth = parseInt(column.dataset.depth, 10);
  const taskLabel = button.textContent;

  markColumnButtonAsSelected(column, button);

  // Check if there are nested tasks
  const nestedTasks = {};
  let hasNestedTasks = false;
  for (const [nestedKey, nestedValue] of Object.entries(taskData)) {
    if (nestedKey !== 'features' && typeof nestedValue === 'object') {
      nestedTasks[nestedKey] = nestedValue;
      hasNestedTasks = true;
    }
  }

  if (hasNestedTasks) {
    // Render next column with nested tasks
    renderTaskColumn(nestedTasks, taskLabel, depth + 1);
  } else {
    // No more nested tasks, just remove columns after this one
    while (columnsContainer.children.length > depth + 1) {
      columnsContainer.removeChild(columnsContainer.lastChild);
    }
  }

  // Show features if present
  const features = taskData.features;
  if (features && Array.isArray(features) && features.length > 0) {
    renderFeatureColumn(features, depth + 1);
  }
}

function renderFeatureColumn(features, depth) {
  // Remove features column if it exists
  while (columnsContainer.children.length > depth) {
    columnsContainer.removeChild(columnsContainer.lastChild);
  }

  const { el: column, entriesEl } = createColumnDom(depth, 'Features');
  entriesEl.className = 'features';
  columnsContainer.appendChild(column);

  // Focus on creation, so that selecting an item in the previous column
  // moves focus here.
  focusElementAndScrollColumn(entriesEl, column);

  // This part is asynchronous, because that's when we
  // need to load more web features data.
  // This data is kept in the webFeatures object, so next
  // time we don't need to load it again.
  loadMoreWebFeaturesData(features).then(() => {
    features.forEach(feature => {
      // Look up feature data from webFeatures
      const featureData = webFeatures[feature];
      if (!featureData) {
        return;
      }

      const { li: tag, button } = createColumnButtonDom('feature-tag', `feature-${featureData.id}`);

      const nameDiv = document.createElement('div');
      nameDiv.className = 'feature-name';
      nameDiv.textContent = featureData.name;
      button.appendChild(nameDiv);

      if (featureData.description_html) {
        const descDiv = document.createElement('div');
        descDiv.className = 'feature-description';
        descDiv.innerHTML = featureData.description_html;
        button.appendChild(descDiv);
      }

      // Add click handler to show feature details
      button.addEventListener('click', async () => {
        await handleFeatureClick(button, feature);
      });

      entriesEl.appendChild(tag);
    });
  });
}

async function handleFeatureClick(button, feature) {
  const column = button.closest('.column');
  const depth = parseInt(column.dataset.depth, 10);
  const featureData = webFeatures[feature];

  markColumnButtonAsSelected(column, button);

  // Fetch additional data and show feature details
  await renderFeature(feature, featureData, depth + 1);
}

async function renderFeature(featureId, featureData, depth) {
  // Remove feature details column if it exists
  while (columnsContainer.children.length > depth) {
    columnsContainer.removeChild(columnsContainer.lastChild);
  }

  const { el: column } = createColumnDom(depth, featureData.name, true);

  const detailsDiv = document.createElement('div');
  detailsDiv.className = 'feature-details';
  detailsDiv.tabIndex = 0;

  // Show spinner initially
  const spinnerContainer = document.createElement('div');
  spinnerContainer.className = 'spinner-container';
  const spinner = document.createElement('div');
  spinner.className = 'spinner';
  spinnerContainer.appendChild(spinner);
  detailsDiv.appendChild(spinnerContainer);

  column.appendChild(detailsDiv);
  columnsContainer.appendChild(column);

  focusElementAndScrollColumn(detailsDiv, column);

  // Now load the content asynchronously
  await loadFeatureDetailsContent(featureData, detailsDiv);
}

async function loadFeatureDetailsContent(featureData, detailsDiv) {
  // Clear the spinner
  detailsDiv.innerHTML = '';

  // Add description
  if (featureData.description_html) {
    const descSection = document.createElement('div');
    descSection.className = 'feature-section';
    descSection.innerHTML = featureData.description_html;
    detailsDiv.appendChild(descSection);
  }

  // Store standard positions for later use
  let standardPositions = {};
  if (featureData.standardPositions && Array.isArray(featureData.standardPositions)) {
    featureData.standardPositions.forEach(item => {
      if (item.vendor && item.position) {
        standardPositions[item.vendor] = item.position;
      }
    });
  }

  // Add MDN links if available
  if (featureData.mdnUrls && featureData.mdnUrls.length > 0) {
    const mdnSection = document.createElement('div');
    mdnSection.className = 'feature-section';

    const mdnTitle = document.createElement('div');
    mdnTitle.className = 'section-title';
    mdnTitle.textContent = 'MDN Documentation';
    mdnSection.appendChild(mdnTitle);

    const mdnLinks = document.createElement('div');
    mdnLinks.className = 'mdn-links';

    featureData.mdnUrls.forEach(item => {
      const link = document.createElement('a');
      link.className = 'mdn-link';
      link.href = item.url;
      link.target = '_blank';
      link.textContent = item.title;
      mdnLinks.appendChild(link);
    });

    mdnSection.appendChild(mdnLinks);
    detailsDiv.appendChild(mdnSection);
  }

  // Add browser compatibility section
  const compatSection = document.createElement('div');
  compatSection.className = 'feature-section';

  const compatTitle = document.createElement('div');
  compatTitle.className = 'section-title';
  compatTitle.textContent = 'Browser Compatibility';
  compatSection.appendChild(compatTitle);

  const compatDiv = document.createElement('div');
  compatDiv.className = 'compat-data';

  const support = featureData.status?.support || {};

  ALL_BROWSERS.forEach(browser => {
    const compatItem = document.createElement('div');
    const version = support[browser];

    if (version) {
      compatItem.className = 'compat-item';
    } else {
      compatItem.className = 'compat-item unsupported';
    }

    const browserName = document.createElement('div');
    browserName.className = 'browser-name';
    browserName.textContent = browser;
    compatItem.appendChild(browserName);

    if (version) {
      const browserVersion = document.createElement('div');
      browserVersion.className = 'browser-version';
      browserVersion.textContent = `Version ${version}`;
      compatItem.appendChild(browserVersion);
    } else {
      const browserVersion = document.createElement('div');
      browserVersion.className = 'browser-version';
      browserVersion.textContent = 'Not supported';
      compatItem.appendChild(browserVersion);

      // Check for standard position
      let position = null;
      if (browser === 'firefox' || browser === 'firefox_android') {
        position = standardPositions['mozilla'];
      } else if (browser === 'safari' || browser === 'safari_ios') {
        position = standardPositions['apple'];
      }

      if (position) {
        const positionDiv = document.createElement('div');
        positionDiv.className = `browser-position position-${position}`;
        positionDiv.textContent = `Position: ${position}`;
        compatItem.appendChild(positionDiv);
      }
    }

    compatDiv.appendChild(compatItem);
  });

  compatSection.appendChild(compatDiv);
  detailsDiv.appendChild(compatSection);
}

function loadMoreWebFeaturesData(features) {
  return Promise.all(
    features
      .filter(id => !webFeatures[id])
      .map(id => loadWebFeature(id))
  ).then(results => {
    results.forEach(data => {
      webFeatures[data.id] = data;
    });
  });
}

async function loadWebFeature(id) {
  const response = await fetch(`https://web-platform-dx.github.io/web-features-explorer/features/${id}.json`);
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Failed to load web feature data');
  }
}

renderTaskColumn(taskTree, 'What do you want to do?', 0);

// Handle Escape to move back to the previously selected
// element in the previous column.
addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const activeElement = document.activeElement;
    const currentColumn = activeElement.closest('.column');
    const previousColumn = currentColumn.previousElementSibling;
    if (previousColumn) {
      const previousListbox = previousColumn.querySelector('[role="listbox"]');
      if (previousListbox) {
        // Focus the previously selected item in this column.
        const activeDescendantId = previousListbox.getAttribute('aria-activedescendant');
        const activeOption = previousListbox.querySelector(`#${activeDescendantId}`);
        if (activeOption) {
          focusElementAndScrollColumn(activeOption, previousColumn, true);
        }
        e.preventDefault();
      }
    }
  }
});
