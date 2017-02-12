function start(tabs) {
    chrome.tabs.query({"audible": true}, function (allTabs) {
      if(allTabs[0]) {
        tabs.audible = tabs.audible.concat(allTabs);
      }
    });
};

module.exports = { start };
