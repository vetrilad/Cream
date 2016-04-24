var tabs = {
  audible: []
};

function arrayRotate(arr) {
  arr.unshift(arr.pop());
  return arr;
}

function loadExtension() {
    chrome.tabs.query({"audible": true}, function (allTabs) {
    if(allTabs[0]) {
      tabs.audible = tabs.audible.concat(allTabs);
    }
  });
}

loadExtension();

console.log("extension loaded");