// const element = <a href="http://google.com">Click Here</a> // jsx 문법
// const element = React.createElement( // createElement 문법
//   'a',
//   {href: 'http://google.com'},
//   'Click Here',
// );

// const element = ( // createElement가 변환한 리액트 요소
//   <a key="key1" style={{width: 100}} href="http://google.com">Click Here</a>
// );
// console.log(element);
// const consoleLogResult = { // 리액트 요소를 로그로 출력한 결과
//   type: 'a', // 속성값이 문자열이면 HTML 태그로 표시됨
//   key: 'key1', // JSX 코드에서 key 속성 값을 입력하면 리액트 요소의 key 속성 값으로 들어감
//   ref: null, // JSX 코드에서 ref 속성 값을 입력하면 리액트 요소의 ref 속성 값으로 들어감
//   props: { // key, ref를 제외한 나머지 속성 값은 리액트 요소의 props 속성 값으로 들어감
//     href: 'http://google.com',
//     style: {
//       width: 100,
//     },
//   },
//   children: 'Click Here',
//   // ...
// };

// const element = <h1>제 나이는 {20 + 5} 세입니다.</h1>;
// console.log(element);
// const consoleLogResult = {
//   type: 'h1',
//   props: {children: ['제 나이는 ', 25, ' 세입니다']},
//   // ...
// };

// function Title({title, color}) {
//   return <p style={{color}}>{title}</p>;
// }
// const element = <Title title="안녕하세요" color="blue" />;
// console.log(element);
// const consoleLogResult = {
//   type: Title,
//   props: { title: '안녕하세요', color: 'blue'},
//   // ...
// }

// const element = <a href="http://google.com">Click Here</a>;
// element.type = 'b'; // 에러 발생

// let seconds = 0;
// function update() {
//   seconds += 1;
//   const element = (
//     <div>
//       <h1>안녕하세요</h1>
//       <h2>지금까지 {seconds}초가 지났습니다.</h2> // 변하는 부분은 이 부분만 변경됨
//     </div>
//   );
//   ReactDOM.render(element, document.getElementById('root'));
  // 리액트가 새로운 리액트 요소를 받으면 이전의 리액트 요소와 비교하여 변경된 부분만 실제 돔에 반영함
  // 따라서 앞의 코드에 의해 업데이트되는 과정에서 리액트는 실제 돔의 h1 요소는 건들지 않음
// }
// setInterval(update, 1000); // 1초마다 화면 갱신

