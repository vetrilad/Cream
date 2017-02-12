/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function start(tabs) {
  chrome.tabs.query({ "audible": true }, function (allTabs) {
    if (allTabs[0]) {
      tabs.audible = tabs.audible.concat(allTabs);
    }
  });
};

module.exports = { start: start };

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Tab ID changes when attached to a new window. Update with new value.
var arrayRotate = function arrayRotate(array) {
  array.unshift(array.pop());
  return array;
};

var startListener = function startListener(tabs) {
  return {
    attached: function attached(tabId) {
      chrome.tabs.get(tabId, function (tab) {
        tabs.audible.forEach(function (e) {
          if (e.id === tabId) {
            tabs.audible[tabs.audible.indexOf(e)] = tab;
          }
        });
      });
    },

    removeTab: function removeTab(tabId) {
      var promise = new Promise(function (resolve, reject) {
        tabs.audible = tabs.audible.filter(function (tab) {
          return tab.id !== tabId;
        });
        resolve('Closed tab ' + tabId);
      });

      promise.then(function (result) {
        console.log(result);
      });
    },

    update: function update(tabID, changeInfo, tab) {
      var promise = new Promise(function (resolve, reject) {
        if (changeInfo.audible === false) {
          tabs.audible = tabs.audible.filter(function (tab) {
            return tab.id !== tabID;
          });
          resolve('Removed tab ' + tabID);
        } else if (changeInfo.audible === true) {
          tabs.audible.push(tab);
          resolve('Added tab ' + tabID);
        } else {
          reject("Nothing happened: ChangeInfo - " + changeInfo);
        }
      });

      promise.then(function (result) {
        console.log(result);
      }, function (err) {
        console.log(err);
      });
    },

    action: function action(tab) {
      try {
        chrome.tabs.update(tabs.audible[0].id, { selected: true }, function () {
          if (chrome.runtime.lastError) {
            console.log("Chrome Error - > " + chrome.runtime.lastError.message);
          }
        });
        chrome.windows.update(tabs.audible[0].windowId, { 'focused': true });
        arrayRotate(tabs.audible);
      } catch (err) {
        console.log("Probably empty array - > " + err);
      }
    },

    remove: function remove(windowID) {
      tabs.audible = tabs.audible.filter(function (tab) {
        return tab.windowId !== windowID;
      });
    }
  };
};

module.exports = startListener;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var tabs = {
  audible: []
};

var listeners = __webpack_require__(1);
var background = __webpack_require__(0);

background.start(tabs);

chrome.browserAction.onClicked.addListener(function (tab) {
  console.log(tabs);
  return listeners(tabs).action(tab);
});

chrome.windows.onRemoved.addListener(function (windowID) {
  return listeners(tabs).remove(windowID);
});

chrome.tabs.onUpdated.addListener(function (tabID, changeInfo, tab) {
  return listeners(tabs).update(tabID, changeInfo, tab);
});

chrome.tabs.onAttached.addListener(function (tabId) {
  return listeners(tabs).attached(tabId);
});

chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
  return listeners(tabs).removeTab(tabId);
});

/***/ })
/******/ ]);