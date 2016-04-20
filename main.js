var tabs = {
  audible: []
};

watch(tabs, 'audible', function(prop, action, newvalue, oldvalue){
  console.log("Loging Changessss  - > " + new Date());
  console.log("Action " + action);
  tabs.audible.forEach(function(tab){
    console.log("tab ID: " + tab.id + ". window id: " + tab.windowId);
  });
});

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

function onRemoved(windowID){
  tabs.audible = tabs.audible.filter(function(tab){
      return tab.windowId !== windowID;
    });
}



loadExtension();

console.log("extension loaded");