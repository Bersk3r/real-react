const element = <div>babel test</div>;
const text = `element type is ${element.type}`;
const add = (a,b) => a + b;

/**결과 값*/
// const element = /*#__PURE__*/React.createElement("div", null, "babel test"); // 리액트 프리셋
// const text = "element type is ".concat(element.type); // 템플릿 리터럴 (loose 옵션 X이므로 concat 메서드가 보임)
// const add = function (a, b) { // 화살표 함수 플러그인
//     return a + b;
// };
