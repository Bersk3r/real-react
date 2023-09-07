/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 341:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _react = _interopRequireDefault(__webpack_require__(689));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function About() {
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h3", null, "This is About Page"));
}
var _default = About;
exports["default"] = _default;

/***/ }),

/***/ 255:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = App;
var _react = _interopRequireWildcard(__webpack_require__(689));
var _Home = _interopRequireDefault(__webpack_require__(33));
var _About = _interopRequireDefault(__webpack_require__(341));
var _styledComponents = _interopRequireDefault(__webpack_require__(518));
var _icon = _interopRequireDefault(__webpack_require__(103));
var _templateObject;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var Container = _styledComponents["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral([" // styled-components\uB97C \uC774\uC6A9\uD558\uC5EC \uC2A4\uD0C0\uC77C\uC774 \uC801\uC6A9\uB41C \uCEF4\uD3EC\uB10C\uD2B8\uB97C \uB9CC\uB4E6\n    background-color: #aaaaaa;\n    border: 1px solid blue;\n"])));

// export default function App({ page }) {

function fetchUsername() {
  var usernames = ['mike', 'june', 'jamie'];
  return new Promise(function (resolve) {
    var username = usernames[Math.floor(Math.random() * 3)];
    setTimeout(function () {
      return resolve(username);
    }, 100);
  });
}
function App(_ref) {
  var page1 = _ref.page1;
  var _useState = (0, _react.useState)(page1),
    _useState2 = _slicedToArray(_useState, 2),
    page = _useState2[0],
    setPage = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    username = _useState4[0],
    setUsername = _useState4[1];
  (0, _react.useEffect)(function () {
    // 단일 페이지 애플리케이션을 직접 구현하기 위해 onpopstate 이벤트 처리 함수를 등록함 -> 브라우저에서 뒤로 가기 버튼을 클릭하면 onpopstate 함수가 호출됨
    window.onpopstate = function (event) {
      setPage(event.state);
    };
    fetchUsername().then(function (data) {
      return setUsername(data);
    });
  }, []);
  function onChangePage(e) {
    // 특정 페이지로 이동하는 버튼의 이벤트 처리 함수임
    var newPage = e.target.dataset.page;
    window.history.pushState(newPage, '', "/".concat(newPage)); // pushState 메서드를 통해 브라우저에게 주소가 변경됐다는 것을 알림
    setPage(newPage);
  }
  var PageComponent = page === 'home' ? _Home["default"] : _About["default"]; // page 상탯값에 다라 렌더링할 페이지의 컴포넌트가 결정됨

  return /*#__PURE__*/_react["default"].createElement(Container, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "container"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    "data-page": "home",
    onClick: onChangePage
  }, "Home"), /*#__PURE__*/_react["default"].createElement("button", {
    "data-page": "about",
    onClick: onChangePage
  }, "About"), /*#__PURE__*/_react["default"].createElement(PageComponent, {
    usename: username
  })), /*#__PURE__*/_react["default"].createElement("img", {
    src: _icon["default"]
  }));
}

/***/ }),

/***/ 33:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _react = _interopRequireDefault(__webpack_require__(689));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function Home(_ref) {
  var username = _ref.username;
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h3", null, "This is Home Page"), username && /*#__PURE__*/_react["default"].createElement("p", null, "".concat(username, "\uB2D8 \uC548\uB155\uD558\uC138\uC694")));
}
var _default = Home;
exports["default"] = _default;

/***/ }),

/***/ 407:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.prerenderPages = void 0;
exports.renderPage = renderPage;
var _fs = _interopRequireDefault(__webpack_require__(147));
var _path = _interopRequireDefault(__webpack_require__(17));
var _server = __webpack_require__(684);
var _react = _interopRequireDefault(__webpack_require__(689));
var _App = _interopRequireDefault(__webpack_require__(255));
var _styledComponents = __webpack_require__(518);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// common.js 내용이 server.js와 유사함

var html = _fs["default"].readFileSync(
// 미리 html 파일의 내용을 가져옴
_path["default"].resolve(__dirname, '../dist/index.html'), 'utf8');
var prerenderPages = ['home']; // 미리 렌더링할 페이지의 목록을 정의함
exports.prerenderPages = prerenderPages;
function renderPage(page) {
  // 페이지를 미리 렌더링하여 문자열을 반환하는 함수로 server.js 파일에서 렌더링하던 부분과 유사함
  // 해당 함수에서 __DATA_FROM_SERVER__ 문자열은 그대로 유지함, renderPage 함수에서 데이터에 대한 정보를 모르기 때문임, prerender.js에선 __DATA_FROM_SERVER__ 문자열을 변환하지 못한 채로 각 페이지의 HTML 파일을 저장함 -> 데이터는 서버에서 사용자 요청을 할 때 채워넣을 예정임
  var sheet = new _styledComponents.ServerStyleSheet();
  var renderString = (0, _server.renderToString)(sheet.collectStyles( /*#__PURE__*/_react["default"].createElement(_App["default"], {
    page: page
  })));
  var styles = sheet.getStyleTags();
  var result = html.replace('<div id="root"></div>', "<div id=\"root\">".concat(renderString, "</div>")).replace('__STYLE_FROM_SERVER__', styles);
  return result;
}

/***/ }),

/***/ 103:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "388556a287d51f227ea5ceb5d65f6f22.png");

/***/ }),

/***/ 860:
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ 680:
/***/ ((module) => {

module.exports = require("lru-cache");

/***/ }),

/***/ 689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 684:
/***/ ((module) => {

module.exports = require("react-dom/server");

/***/ }),

/***/ 518:
/***/ ((module) => {

module.exports = require("styled-components");

/***/ }),

/***/ 147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 17:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 310:
/***/ ((module) => {

module.exports = require("url");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/dist/";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _express = _interopRequireDefault(__webpack_require__(860));
var _fs = _interopRequireDefault(__webpack_require__(147));
var _path = _interopRequireDefault(__webpack_require__(17));
var _server = __webpack_require__(684);
var _react = _interopRequireDefault(__webpack_require__(689));
var _App = _interopRequireDefault(__webpack_require__(255));
var url = _interopRequireWildcard(__webpack_require__(310));
var _styledComponents = __webpack_require__(518);
var _common = __webpack_require__(407);
var _lruCache = _interopRequireDefault(__webpack_require__(680));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; } /**간단한 웹 서버 코드*/ // react-dom/server 밑에 서버에서 사용되는 기능이 주요 존재함
// 캐싱을 위해 lru-cache 패키지를 이용함

var ssrCache = new _lruCache["default"]({
  // 최대 100개의 페이지를 캐싱하고 각 아이템은 60초 동안 캐싱되도록 설정함
  max: 100,
  maxAge: 1000 * 60
});
var app = (0, _express["default"])(); // express 객체인 app 변수를 이용하여 미들웨어와 url 경로 설정이 가능함

var prerenderHtml = {}; /// prerender.js 파일이 실행될 때 미리 렌더링해 놓은 페이지를 prerenderHtml 객체에 저장함
var _iterator = _createForOfIteratorHelper(_common.prerenderPages),
  _step;
try {
  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    var page = _step.value;
    var pageHtml = _fs["default"].readFileSync(_path["default"].resolve(__dirname, "../dist/".concat(page, ".html")), 'utf8');
    prerenderHtml[page] = pageHtml;
  }
} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}
app.use('/dist', _express["default"]["static"]('dist'));
app.get('./favicon.ico', function (req, res) {
  return res.sendStatus(204);
}); // 브라우저가 자동으로 요청하는 favicon.ico 파일이 하기 코드에서 처리되지 않도록 막음
app.get('*', function (req, res) {
  // 나머지 모든 경우를 처리하는 함수를 등록함
  var parsedUrl = url.parse(req.url, true); // 문자열로 된 주솟값을 구조체로 변환하기 위해 url 모듈을 사용함
  var cacheKey = parsedUrl.path; // cacheKey는 쿼리 파라미터를 포함하는 url로 함 -> 만약 페이지를 렌더링할 때, user-agent와 같은 추가 정보를 이용한다면, cacheKey는 그 정보들을 모두 포함해야 함
  if (ssrCache.has(cacheKey)) {
    // 캐시가 존재하면 캐싱된 값을 이용함
    console.log('캐시 사용');
    res.send(ssrCache.get(cacheKey));
    return;
  }
  var page = parsedUrl.pathname ? parsedUrl.pathname.substr(1) : 'home';
  var initialData = {
    page: page
  }; // 클라이언트에게 전달할 초기 데이터
  var pageHtml = _common.prerenderPages.includes(page) // 미리 렌더링된 페이지가 아닌 경우에만 새로 렌더링함
  ? prerenderHtml[page] : (0, _common.renderPage)(page);
  var result = pageHtml.replace('__DATA_FROM_SERVER__', JSON.stringify(initialData)); // __DATA_FROM_SERVER__ 문자열을 초기 데이터로 대체함
  ssrCache.set(cacheKey, result); // 캐시가 존재하지 않으면 서버사이드 렌더링 후 그 결과를 캐시에 저장함
  res.send(result); // 완성된 HTML을 클라이언트에 전송함
});

app.listen(3000); // 매개변수는 포트번호를 의미하며 3000 포트로 들어오는 클라이언트의 요청을 기다림
})();

/******/ })()
;