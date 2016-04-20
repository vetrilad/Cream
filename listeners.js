//Tab ID changes when attached to a new window. Update with new value.
function attached(tabId){
  chrome.tabs.get(tabId, function(tab) {
    tabs.audible.forEach(function(e){
      if(e.id === tabId){
        tabs.audible[tabs.audible.indexOf(e)] = tab;
      }
    });
  });
}

function update(tabID, changeInfo, tab) {
  var promise = new Promise(function(resolve, reject){
    if(changeInfo.audible === false) {
      tabs.audible = tabs.audible.filter(function(tab){
        return tab.id !== tabID;
      });
    } 
    else if(changeInfo.audible === true) {
      tabs.audible.push(tab);
    }
  });
  
  promise.then(
    console.log("**********************")  
  );
}

function action(tab) {
  chrome.tabs.update(tabs.audible[0].id, {selected: true});
  chrome.windows.update(tabs.audible[0].windowId, {'focused':true});
  arrayRotate(tabs.audible);
}

function remove(windowID){
  tabs.audible = tabs.audible.filter(function(tab){
    return tab.windowId !== windowID;
  });
}
