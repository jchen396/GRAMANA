"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/rooms/[id]",{

/***/ "./components/PlayerList.tsx":
/*!***********************************!*\
  !*** ./components/PlayerList.tsx ***!
  \***********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\nvar _this = undefined;\n\n\nvar PlayerList = function(param) {\n    var userList = param.userList;\n    var _this1 = _this;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"sm:w-full bg-neutral-800 h-1/5 rounded flex flex-col items-center\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                className: \"text-stone-50 text-3xl\",\n                children: \"Users List: \"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\ecuoj\\\\Desktop\\\\Program\\\\PROJECTS\\\\purple-game\\\\purple-game\\\\client\\\\components\\\\PlayerList.tsx\",\n                lineNumber: 10,\n                columnNumber: 4\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"rounded flex flex-col-reverse justify-start items-start overflow-auto bg-stone-900\",\n                children: userList === null || userList === void 0 ? void 0 : userList.map(function(user) {\n                    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"text-stone-50\",\n                        children: user.name\n                    }, user.id, false, {\n                        fileName: \"C:\\\\Users\\\\ecuoj\\\\Desktop\\\\Program\\\\PROJECTS\\\\purple-game\\\\purple-game\\\\client\\\\components\\\\PlayerList.tsx\",\n                        lineNumber: 13,\n                        columnNumber: 6\n                    }, _this1);\n                })\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\ecuoj\\\\Desktop\\\\Program\\\\PROJECTS\\\\purple-game\\\\purple-game\\\\client\\\\components\\\\PlayerList.tsx\",\n                lineNumber: 11,\n                columnNumber: 4\n            }, _this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\ecuoj\\\\Desktop\\\\Program\\\\PROJECTS\\\\purple-game\\\\purple-game\\\\client\\\\components\\\\PlayerList.tsx\",\n        lineNumber: 9,\n        columnNumber: 3\n    }, _this);\n};\n_c = PlayerList;\n/* harmony default export */ __webpack_exports__[\"default\"] = (PlayerList);\nvar _c;\n$RefreshReg$(_c, \"PlayerList\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL1BsYXllckxpc3QudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7O0FBQTBCO0FBTTFCLElBQU1DLFVBQVUsR0FBb0IsZ0JBQWtCO1FBQWZDLFFBQVEsU0FBUkEsUUFBUTs7SUFDOUMscUJBQ0MsOERBQUNDLEtBQUc7UUFBQ0MsU0FBUyxFQUFDLG1FQUFtRTs7MEJBQ2pGLDhEQUFDQyxJQUFFO2dCQUFDRCxTQUFTLEVBQUMsd0JBQXdCOzBCQUFDLGNBQVk7Ozs7O3FCQUFLOzBCQUN4RCw4REFBQ0QsS0FBRztnQkFBQ0MsU0FBUyxFQUFDLG9GQUFvRjswQkFDakdGLFFBQVEsYUFBUkEsUUFBUSxXQUFLLEdBQWJBLEtBQUFBLENBQWEsR0FBYkEsUUFBUSxDQUFFSSxHQUFHLENBQUMsU0FBQ0MsSUFBUzt5Q0FDeEIsOERBQUNKLEtBQUc7d0JBQUNDLFNBQVMsRUFBQyxlQUFlO2tDQUM1QkcsSUFBSSxDQUFDQyxJQUFJO3VCQUR5QkQsSUFBSSxDQUFDRSxFQUFFOzs7OzhCQUVyQztpQkFDTixDQUFDOzs7OztxQkFDRzs7Ozs7O2FBQ0QsQ0FDTDtDQUNGO0FBYktSLEtBQUFBLFVBQVU7QUFlaEIsK0RBQWVBLFVBQVUsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9jb21wb25lbnRzL1BsYXllckxpc3QudHN4PzhmOWEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuaW50ZXJmYWNlIFByb3BzIHtcclxuXHR1c2VyTGlzdDoge31bXTtcclxufVxyXG5cclxuY29uc3QgUGxheWVyTGlzdDogUmVhY3QuRkM8UHJvcHM+ID0gKHsgdXNlckxpc3QgfSkgPT4ge1xyXG5cdHJldHVybiAoXHJcblx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNtOnctZnVsbCBiZy1uZXV0cmFsLTgwMCBoLTEvNSByb3VuZGVkIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyXCI+XHJcblx0XHRcdDxoMSBjbGFzc05hbWU9XCJ0ZXh0LXN0b25lLTUwIHRleHQtM3hsXCI+VXNlcnMgTGlzdDogPC9oMT5cclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3VuZGVkIGZsZXggZmxleC1jb2wtcmV2ZXJzZSBqdXN0aWZ5LXN0YXJ0IGl0ZW1zLXN0YXJ0IG92ZXJmbG93LWF1dG8gYmctc3RvbmUtOTAwXCI+XHJcblx0XHRcdFx0e3VzZXJMaXN0Py5tYXAoKHVzZXI6IGFueSkgPT4gKFxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXN0b25lLTUwXCIga2V5PXt1c2VyLmlkfT5cclxuXHRcdFx0XHRcdFx0e3VzZXIubmFtZX1cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdCkpfVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdDwvZGl2PlxyXG5cdCk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXJMaXN0O1xyXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJQbGF5ZXJMaXN0IiwidXNlckxpc3QiLCJkaXYiLCJjbGFzc05hbWUiLCJoMSIsIm1hcCIsInVzZXIiLCJuYW1lIiwiaWQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/PlayerList.tsx\n"));

/***/ })

});