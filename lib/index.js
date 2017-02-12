let tabs = {
  audible: []
};

const listeners = require('./listener.js')
const background = require('./background.js');

background.start(tabs);

chrome.browserAction.onClicked.addListener(function(tab){
  console.log(tabs);
 	return listeners(tabs).action(tab);
});

chrome.windows.onRemoved.addListener(function(windowID){
 	return listeners(tabs).remove(windowID);
});

chrome.tabs.onUpdated.addListener(function(tabID, changeInfo, tab) {
	return listeners(tabs).update(tabID, changeInfo, tab);
});

chrome.tabs.onAttached.addListener(function(tabId){
	return listeners(tabs).attached(tabId);
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
	return listeners(tabs).removeTab(tabId);
});
