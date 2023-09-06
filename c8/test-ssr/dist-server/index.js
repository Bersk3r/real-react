"use strict";

var _react = _interopRequireDefault(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _App = _interopRequireDefault(require("./App"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const initialData = window.__INITIAL_DATA__; // 서버로부터 전달된 초기 데이터를 가져옴
// ReactDom.hydrate(<App page="home" />, document.getElementById('root'));
_reactDom.default.hydrate( /*#__PURE__*/_react.default.createElement(_App.default, {
  page: initialData.page
}), document.getElementById('root')); // 전달 받은 데이터를 속성값으로 입력함
// ReactDom.render(<App page="home" />, document.getElementById('root'));