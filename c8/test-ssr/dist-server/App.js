"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = App;
var _react = _interopRequireWildcard(require("react"));
var _Home = _interopRequireDefault(require("./Home"));
var _About = _interopRequireDefault(require("./About"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const Container = _styledComponents.default.div` // styled-components를 이용하여 스타일이 적용된 컴포넌트를 만듦
    background-color: #aaaaaa;
    border: 1px solid blue;
`;

// export default function App({ page }) {
function App({
  page1
}) {
  const [page, setPage] = (0, _react.useState)(page1);
  (0, _react.useEffect)(() => {
    // 단일 페이지 애플리케이션을 직접 구현하기 위해 onpopstate 이벤트 처리 함수를 등록함 -> 브라우저에서 뒤로 가기 버튼을 클릭하면 onpopstate 함수가 호출됨
    window.onpopstate = event => {
      setPage(event.state);
    };
  }, []);
  function onChangePage(e) {
    // 특정 페이지로 이동하는 버튼의 이벤트 처리 함수임
    const newPage = e.target.dataset.page;
    window.history.pushState(newPage, '', `/${newPage}`); // pushState 메서드를 통해 브라우저에게 주소가 변경됐다는 것을 알림
    setPage(newPage);
  }
  const PageComponent = page === 'home' ? _Home.default : _About.default; // page 상탯값에 다라 렌더링할 페이지의 컴포넌트가 결정됨

  return /*#__PURE__*/_react.default.createElement(Container, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement("button", {
    "data-page": "home",
    onClick: onChangePage
  }, "Home"), /*#__PURE__*/_react.default.createElement("button", {
    "data-page": "about",
    onClick: onChangePage
  }, "About"), /*#__PURE__*/_react.default.createElement(PageComponent, null)));
}