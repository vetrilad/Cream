//
chrome.tabs.onUpdated.addListener(function(tabID, changeInfo, tab) {
  if(changeInfo.audible === false) {
    audibleTabs = audibleTabs.filter(function(tab){
      return tab.id !== tabID;
    });
  } 
  else if(changeInfo.audible === true) {
     audibleTabs.push(tab);
  }
});

//Tab ID changes when attached to a new window. Update with new value. 
chrome.tabs.onAttached.addListener(function(tabId){
    chrome.tabs.get(tabId, function(tab) {
      audibleTabs.forEach(function(e){
        if(e.id === tabId){
          audibleTabs[audibleTabs.indexOf(e)] = tab;
        }
      });
    });
});