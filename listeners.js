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

function removeTab(tabId){
  var promise = new Promise(function(resolve, reject){
    tabs.audible = tabs.audible.filter(function(tab){
      return tab.id !== tabId;
    });
    resolve('Closed tab ' + tabId);  
  })

  promise.then(function(result){
    console.log(result);
  });
}

function update(tabID, changeInfo, tab) {
  var promise = new Promise(function(resolve, reject) {
    if(changeInfo.audible === false) {
      tabs.audible = tabs.audible.filter(function(tab) {
        return tab.id !== tabID;
      });
      resolve('Removed tab ' + tabID);
    } 
    else if(changeInfo.audible === true) {
      tabs.audible.push(tab);
      resolve('Added tab ' + tabID);
    }
    else{
      reject("Nothing happened: ChangeInfo - " + changeInfo);
    }
  });
  
  promise.then(function(result){
    console.log(result);
  }, function(err){
    console.log(err);
  });
}

function action(tab) {
  try {
    chrome.tabs.update(tabs.audible[0].id, {selected: true}, function(){
      if (chrome.runtime.lastError) {
        console.log("Chrome Error - > " + chrome.runtime.lastError.message);
      }
    });
    chrome.windows.update(tabs.audible[0].windowId, {'focused':true});
    arrayRotate(tabs.audible);
  } catch(err) {
    console.log("Probably empty array - > " + err);
  }
}

function remove(windowID){
  tabs.audible = tabs.audible.filter(function(tab) {
    return tab.windowId !== windowID;
  });
}
