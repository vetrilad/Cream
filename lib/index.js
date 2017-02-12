// var tabs = {
//   audible: []
// };
//
// function arrayRotate(arr) {
//   arr.unshift(arr.pop());
//   return arr;
// };
//
// function loadExtension() {
//     chrome.tabs.query({"audible": true}, function (allTabs) {
//     if(allTabs[0]) {
//       tabs.audible = tabs.audible.concat(allTabs);
//     }
//   });
// };

let tabs = {
  audible: []
};

const startListeners = require('./listener.js')
const startBackground = require('./background.js');

tabs = startBackground.startBackground(tabs);

chrome.browserAction.onClicked.addListener(function(tab){
 	return startListeners(tabs).action(tab);
});

chrome.windows.onRemoved.addListener(function(windowID){
 	return startListeners(tabs).remove(windowID);
});

chrome.tabs.onUpdated.addListener(function(tabID, changeInfo, tab) {
	return startListeners(tabs).update(tabID, changeInfo, tab);
});

chrome.tabs.onAttached.addListener(function(tabId){
	return startListeners(tabs).attached(tabId);
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
	return startListeners(tabs).removeTab(tabId);
});
