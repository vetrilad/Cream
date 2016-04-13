var audibleTabs = [];

watch(audibleTabs, function(){
  console.log(audibleTabs);
});

function logger(fun) {
  chrome.tabs.query({"audible": true}, function (allTabs) {
    console.log(allTabs);
  });
  console.log("Current method: "+ fun + " Changed variable to " + audibleTabs);
}

function arrayRotate(arr) {
  logger(arguments.callee.toString().match(/function ([^\(]+)/)[1]);
  arr.unshift(arr.pop());
  return arr;
}

function loadExtension() {
    chrome.tabs.query({"audible": true}, function (allTabs) {
    audibleTabs = [];
    if(allTabs[0]) {
      audibleTabs.push(allTabs[0]);
    }
  });
}

loadExtension();

console.log("extension loaded");