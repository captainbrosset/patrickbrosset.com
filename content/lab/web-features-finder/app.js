import taskTree from './web-dev-tasks.json' with { type: 'json' };

const ALL_BROWSERS = ['chrome', 'chrome_android', 'edge', 'firefox', 'firefox_android', 'safari', 'safari_ios'];
const webFeatures = {};

const columnsContainer = document.getElementById('columns-container');
let currentPath = [];

function renderColumn(data, title, depth) {
  // Remove all columns after this depth
  while (columnsContainer.children.length > depth) {
    columnsContainer.removeChild(columnsContainer.lastChild);
  }

  const column = document.createElement('div');
  column.className = 'column';

  const columnTitle = document.createElement('div');
  columnTitle.className = 'column-title';
  columnTitle.textContent = title;
  column.appendChild(columnTitle);

  // Get all tasks at this level
  const tasks = Object.entries(data);

  tasks.forEach(([key, value]) => {
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    taskItem.textContent = key;

    taskItem.addEventListener('click', () => {
      // Remove selected class from siblings
      Array.from(column.querySelectorAll('.task-item')).forEach(item => {
        item.classList.remove('selected');
      });
      taskItem.classList.add('selected');

      // Update current path
      currentPath = currentPath.slice(0, depth);
      currentPath.push(key);

      // Check if there are nested tasks
      const nestedTasks = {};
      let hasNested = false;
      for (const [nestedKey, nestedValue] of Object.entries(value)) {
        if (nestedKey !== 'features' && typeof nestedValue === 'object') {
          nestedTasks[nestedKey] = nestedValue;
          hasNested = true;
        }
      }

      if (hasNested) {
        // Render next column with nested tasks
        renderColumn(nestedTasks, key, depth + 1);
      } else {
        // No more nested tasks, just remove columns after this one
        while (columnsContainer.children.length > depth + 1) {
          columnsContainer.removeChild(columnsContainer.lastChild);
        }
      }

      // Show features if present
      if (value.features && Array.isArray(value.features) && value.features.length > 0) {
        renderFeatures(value.features, depth + 1);
      }
    });

    column.appendChild(taskItem);
  });

  columnsContainer.appendChild(column);
}

async function renderFeatures(features, depth) {
  // Load web features data if not already loaded.
  await loadMoreWebFeaturesData(features);

  // Remove features column if it exists
  while (columnsContainer.children.length > depth) {
    columnsContainer.removeChild(columnsContainer.lastChild);
  }

  const column = document.createElement('div');
  column.className = 'column';

  const columnTitle = document.createElement('div');
  columnTitle.className = 'column-title';
  columnTitle.textContent = 'Features';
  column.appendChild(columnTitle);

  const featuresDiv = document.createElement('div');
  featuresDiv.className = 'features';

  features.forEach(feature => {
    const tag = document.createElement('div');
    tag.className = 'feature-tag';

    // Look up feature data from webFeatures
    const featureData = webFeatures[feature];
    if (featureData) {
      const nameDiv = document.createElement('div');
      nameDiv.className = 'feature-name';
      nameDiv.textContent = featureData.name;
      tag.appendChild(nameDiv);

      if (featureData.description_html) {
        const descDiv = document.createElement('div');
        descDiv.className = 'feature-description';
        descDiv.innerHTML = featureData.description_html;
        tag.appendChild(descDiv);
      }

      // Add click handler to show feature details
      tag.addEventListener('click', async () => {
        // Remove selected class from siblings
        Array.from(featuresDiv.querySelectorAll('.feature-tag')).forEach(item => {
          item.classList.remove('selected');
        });
        tag.classList.add('selected');

        // Fetch additional data and show feature details
        await renderFeatureDetails(feature, featureData, depth + 1);
      });
    } else {
      // Fallback to feature ID if not found
      tag.textContent = feature;
    }

    featuresDiv.appendChild(tag);
  });

  column.appendChild(featuresDiv);
  columnsContainer.appendChild(column);
}

async function renderFeatureDetails(featureId, featureData, depth) {
  // Remove feature details column if it exists
  while (columnsContainer.children.length > depth) {
    columnsContainer.removeChild(columnsContainer.lastChild);
  }

  const column = document.createElement('div');
  column.className = 'column';

  const columnTitle = document.createElement('div');
  columnTitle.className = 'column-title';
  columnTitle.textContent = featureData.name;
  column.appendChild(columnTitle);

  const detailsDiv = document.createElement('div');
  detailsDiv.className = 'feature-details';

  // Show spinner initially
  const spinnerContainer = document.createElement('div');
  spinnerContainer.className = 'spinner-container';
  const spinner = document.createElement('div');
  spinner.className = 'spinner';
  spinnerContainer.appendChild(spinner);
  detailsDiv.appendChild(spinnerContainer);

  column.appendChild(detailsDiv);
  columnsContainer.appendChild(column);

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

renderColumn(taskTree, 'What do you want to do?', 0);
