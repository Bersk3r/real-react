"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const App_1 = __importDefault(require("./App"));
// ReactDOM.render(<App />, document.getElementById('root')); // 필수 속성값을 일부러 입력하지 않음 -> 컴파일 에러 발생
react_dom_1.default.render(react_1.default.createElement(App_1.default, { name: "starts", age: 13 }), document.getElementById('root')); // 필수 속성값을 입력
