var audibleTabs = [];

function arrayRotate(arr) {
  arr.unshift(arr.pop());
  return arr;
}

function loadExtension() {
    chrome.tabs.query({"audible": true}, function (allTabs) {
    audibleTabs = [];
    if(allTabs[0]) {
      audibleTabs.push(allTabs[0]);
      console.log("loadExtension", audibleTabs);
    }
  });
}

chrome.tabs.onUpdated.addListener(function(tabID, changeInfo, tab) {
  if(changeInfo.audible === false) {
    audibleTabs = audibleTabs.filter(function(tab){
      console.log("delete", audibleTabs);
      return tab.id !== tabID;
    });
  } 
  else if(changeInfo.audible === true) {
    console.log("add", audibleTabs);
     audibleTabs.push(tab);
  }
});

chrome.tabs.onAttached.addListener(function(tabId){
    chrome.tabs.get(tabId, function(tab) {
      audibleTabs.forEach(function(e){
        console.log("for each");
        if(e.id === tabId){
          console.log("if");
          audibleTabs[audibleTabs.indexOf(e)] = tab;
          console.log(audibleTabs.indexOf(tab));
        }
      });
    });
});

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.update(audibleTabs[0].id, {selected: true});
  chrome.windows.update(audibleTabs[0].windowId, {'focused':true});
  arrayRotate(audibleTabs);
});


chrome.windows.onRemoved.addListener(function(windowID){
  audibleTabs = audibleTabs.filter(function(tab){
      console.log("delete", audibleTabs);
      return tab.windowId !== windowID;
    });
});

loadExtension();