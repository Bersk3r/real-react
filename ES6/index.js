// 1. var error
// 함수 밖에서 호출 시, 에러 발생
// function example() {
//   var i = 1;
// }
// console.log(i);

// 2. not var -> global
// 'use strict' // if not keyword that occurs error (명시적 에러 발생 설정)
// function example1() {
//   i = 1;
// }
// function example2() {
//   console.log(i);
// }
// example1();
// example2();

// 3. var is efficient that out of scope
// 스코프 밖에서도 var는 사용할 수 있음
// for(var i=0; i<10; i++) {
//   console.log(i);
// }
// console.log(i); // 10

// 4. resolve for var's scope error that use IIFE
// IIFE는 함수를 정의하는 시점에서 실행되면 사라짐 but 작성이 번거롭고 가독성이 떨어짐
