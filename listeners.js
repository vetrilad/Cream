//
chrome.tabs.onUpdated.addListener(function(tabID, changeInfo, tab) {
  if(changeInfo.audible === false) {
    tabs.audible = tabs.audible.filter(function(tab){
      return tab.id !== tabID;
    });
  } 
  else if(changeInfo.audible === true) {
     tabs.audible.push(tab);
  }
});

//Tab ID changes when attached to a new window. Update with new value. 
chrome.tabs.onAttached.addListener(function(tabId){
    chrome.tabs.get(tabId, function(tab) {
      tabs.audible.forEach(function(e){
        if(e.id === tabId){
          tabs.audible[tabs.audible.indexOf(e)] = tab;
        }
      });
    });
});

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.update(tabs.audible[0].id, {selected: true});
  chrome.windows.update(tabs.audible[0].windowId, {'focused':true});
  arrayRotate(tabs.audible);
});


chrome.windows.onRemoved.addListener(function(windowID){
  tabs.audible = tabs.audible.filter(function(tab){
      return tab.windowId !== windowID;
    });
});