chrome.browserAction.onClicked.addListener(function(tab){
  return action(tab);
});

chrome.windows.onRemoved.addListener(function(windowID){
  console.log("removed");
  return remove(windowID);
});

chrome.tabs.onUpdated.addListener(function(tabID, changeInfo, tab) {
  return update(tabID, changeInfo, tab);
});

chrome.tabs.onAttached.addListener(function(tabId){
  return attached(tabId);
});