//
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.update(audibleTabs[0].id, {selected: true});
  chrome.windows.update(audibleTabs[0].windowId, {'focused':true});
  arrayRotate(audibleTabs);
});


chrome.windows.onRemoved.addListener(function(windowID){
  audibleTabs = audibleTabs.filter(function(tab){
      return tab.windowId !== windowID;
    });
});