const element = /*#__PURE__*/React.createElement("div", null, "babel test"); // 리액트 프리셋을 이용하여 JSX 문법을 변환할 수 있음
const text = "element type is ".concat(element.type);
const add = function (a, b) {
  return a + b;
};

/**위 코드를 바벨로 변환한 결과*/
// const element = /*#__PURE__*/React.createElement("div", null, "babel"); // JSX 문법은 createElement 함수 호출로 바뀜
// const text = "element type is ".concat(element.type); // 템플릿 리터럴은 문자열의 concat 메서드 호출로 변환됨
// const add = function (a, b) { // 호살표 함수는 일반 함수로 변환됨
//   return a + b;
// };