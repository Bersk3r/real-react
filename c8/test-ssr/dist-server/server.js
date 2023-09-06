"use strict";

var _express = _interopRequireDefault(require("express"));
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _server = require("react-dom/server");
var _react = _interopRequireDefault(require("react"));
var _App = _interopRequireDefault(require("./App"));
var url = _interopRequireWildcard(require("url"));
var _styledComponents = require("styled-components");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**간단한 웹 서버 코드*/

// react-dom/server 밑에 서버에서 사용되는 기능이 주요 존재함

const app = (0, _express.default)(); // express 객체인 app 변수를 이용하여 미들웨어와 url 경로 설정이 가능함
const html = _fs.default.readFileSync(
// 웹팩 빌드 후 생성되는 index.html 파일의 내용을 가져옴
_path.default.resolve(__dirname, '../dist/index.html'), 'utf8');
app.use('/dist', _express.default.static('dist'));
app.get('./favicon.ico', (req, res) => res.sendStatus(204)); // 브라우저가 자동으로 요청하는 favicon.ico 파일이 하기 코드에서 처리되지 않도록 막음
app.get('*', (req, res) => {
  // 나머지 모든 경우를 처리하는 함수를 등록함
  const parsedUrl = url.parse(req.url, true); // 문자열로 된 주솟값을 구조체로 변환하기 위해 url 모듈을 사용함
  const page = parsedUrl.pathname ? parsedUrl.pathname.substr(1) : home;
  const sheet = new _styledComponents.ServerStyleSheet(); // 스타일을 추출하는 데 사용될 객체를 생성함
  // pathname 앞쪽의 슬래시를 제거하여 page 변수를 만듦
  // const renderString = renderToString(<App page="home" />); // renderToString 함수를 이용하여 App 컴포넌트를 렌더링함 -> 어떤 요청이 들어와도 home 페이지를 렌더링함
  // const renderString = renderToString(<App page={page} />); // url로부터 계산된 페이지 정보를 App 컴포넌트의 속성값으로 사용함
  const renderString = (0, _server.renderToString)(sheet.collectStyles( /*#__PURE__*/_react.default.createElement(_App.default, {
    page: page
  }))); // collectStyles 메서드에 리액트 요소를 입력하면 스타일 정보를 수집하기 위한 코드가 리객트 요소에 삽입됨
  const styles = sheet.getStyleTags();
  const initialData = {
    page
  }; // 클라이언트에게 전달할 초기 데이터
  // const result = html.replace( // 렌더링한 결과를 반영하여 HTML을 완성함
  //     '<div id="root"></div>',
  //     `<div id="root">${renderString}</div>`,
  // );
  const result = html.replace('<div id="root"></div>', `<div id="root">${renderString}</div>`).replace('__DATA_FROM_SERVER__', JSON.stringify(initialData)) // __DATA_FROM_SERVER__ 문자열을 초기 데이터로 대체함
  .replace('__STYLE_FROM_SERVER__', styles); // 추출된 스타일 코드를 HTML에 삽입
  res.send(result); // 완성된 HTML을 클라이언트에 전송함
});

app.listen(3000); // 매개변수는 포트번호를 의미하며 3000 포트로 들어오는 클라이언트의 요청을 기다림