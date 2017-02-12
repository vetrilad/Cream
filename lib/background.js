function startBackground(tabs) {
    chrome.tabs.query({"audible": true}, function (allTabs) {
      if(allTabs[0]) {
        tabs.audible = tabs.audible.concat(allTabs);
      }
    });

    return tabs;
};

module.exports = { startBackground };
