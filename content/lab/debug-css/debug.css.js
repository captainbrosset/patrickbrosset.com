(function () {

  const DEBUG_TOKEN = "debug";
  const DEFAULT_COLOR = "red";
  const DEFAULT_WIDTH = "1px";

  function parseSelector(selector) {
    const parts = selector.split(",").map(s => s.trim());
    if (!parts.some(s => s.startsWith(DEBUG_TOKEN))) {
      return null;
    }

    const firstDebugToken = parts.find(s => s.startsWith(DEBUG_TOKEN));
    const debugColor = firstDebugToken.split("_")[1] || DEFAULT_COLOR;
    const debugWidth = firstDebugToken.split("_")[2] || DEFAULT_WIDTH;
    const newSelector = parts.filter(s => !s.startsWith(DEBUG_TOKEN)).join(", ");

    return {
      selector: newSelector,
      color: debugColor,
      width: debugWidth
    };
  }

  let debugSheet = null;
  function debug(debugData) {
    if (!debugSheet) {
      const style = document.createElement('style');
      document.head.appendChild(style);
      debugSheet = style.sheet;
    }

    debugSheet.insertRule(`${debugData.selector} { box-shadow: 0 0 0 ${debugData.width} ${debugData.color}; }`);
  }

  function emptyDebugSheet() {
    if (!debugSheet) {
      return;
    }

    while (debugSheet.cssRules.length > 0) {
      debugSheet.deleteRule(0);
    }
  }

  function processRule(rule) {
    if (rule.cssRules && rule.cssRules.length) {
      for (const subRule of rule.cssRules) {
        processRule(subRule);
      }
      return;
    }

    const debugData = parseSelector(rule.selectorText);
    if (debugData) {
      debug(debugData);
    }
  }

  window.onload = () => {
    emptyDebugSheet();

    for (const ss of document.styleSheets) {
      for (const r of ss.cssRules) {
        processRule(r);
      }
    }
  }

})();
