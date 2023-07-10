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

// 5. hoisting
// var가 정의되느 변수는 그 변수가 속한 스코프의 최상단으로 끌어올려짐 (hoisting)

// (1)
// console.log(myVar); // 참조 에러

//(2)
// console.log(myVar); // undefined
// var myVar = 1;

// (2) => 변환된 내용
// var myVar = undefined;
// console.log(myVar);
// myVar = 1;

// (3) : 변수 정의된 위에서 할당이 가능
// console.log(myVar); // undefined
// myVar = 2;
// console.log(myVar); // 2
// var myVar = 1;

// (4) : var 변수는 재정의 가능
// var myVar = 1;
// var myVar = 2;

// 6. const, let은 블록 스코프
// if (true) {
//   const i = 0;
// }
// console.log(i); // 에러 발생

// let foo = 'bar1';
// console.log(foo); // bar1
// if(true) {
//   let foo = 'bar2';
//   console.log(foo); // bar2
// }
// console.log(foo);

// 7. const, let에서의 호이스팅
// const와 let은 정의 전에 그 변수 사용 시 에러 발생
// 이는 호이스팅을 되었으나 변수가 정의된 위치와 호이스팅된 위치 사이에서 변수를 사용하면 에러가 발생
// 위 사례를 임시적 사각지대 (Temporal Dead Zone)이라고 함
// console.log(foo); // 에러 발생
// const foo = 1;

// const foo = 1;
// {
//   console.log(foo); // 참조 에러
//   const foo = 2;
// }

// var foo = 1;
// (function() {
//   console.log(foo); // undefined;
//   var foo = 2;
// })();

// const는 내부 속성 값 수정은 가능
// const bar = 'a';
// bar = 'b'; // 에러 발생
// var foo = 'a';
// foo = 'b'; // 에러 없음
// let value = 'a';
// value = 'b'; // 에러 없음

// 내부 속성 값 수정을 막으려면 immer, immutable.js 등의 외부 패키지를 활용하는 게 좋음
// 이러한 외부 패키지는 객체를 수정하려고 할 떄 기존 객체는 변경하지 않고 새로운 객체를 생성함
// const bar = {prop1: 'a'};
// bar.prop1 = 'b';
// bar.prop2 = 123;
// console.log(bar); // { prop1: 'b', prop2: 123 }
// const arr = [10,20];
// arr[0] = 100;
// arr.push(300);
// console.log(arr);

// 생성 외에 수정만 가능하도록 만드는 경우
// Object.preventionExtensions, Object.seal, Object.freeze를 사용

// 8. 단축 속성명과 계산된 속성을 활용하면 객체와 배열 생성 및 수정하는 코드를 쉽게 작성가능
// 단축 속성명 (shorthand property names) : 객체 리터럴 코드를 간편하게 작성할 목적으로 만들어진 문법
// 속성 값이 변수로 존재하면 변수 이름만 적으면 되며, 함수이면 function 키워드를 사용하지 않아도 됨
// 디버깅을 위한 콘솔 로그 출력에도 유용
// const name = 'mike';
// const obj = {
//   age: 21,
//   name,
//   getName() { return this.name; },
// };
//
// function makePerson1(age, name) {
//   return { age: age, name: name };
// }
// function makePerson1(age, name) {
//   return { age, name };
// }

// const name = 'Mike';
// const age = 21;
// console.log('name =', name, 'age =', age);
// console.log({name, age});

// 계산된 속성명 (computed property names) : 객체의 속성명을 동적으로 결정하기 위해 나온 문법
// function makeObject1(key, value) {
//   const obj = {};
//   obj[key] = value;
//   return obj;
// }
// function makeObject2(key, value) {
//   return {[key]: value;}
// }

// setState 호출 시 계산된 속성명을 사용할 수 있음
// class MyComponent extends React.Component {
//   state = {
//     count1: 0,
//     count2: 0,
//     count3: 0,
//   };
//
//   onClick = index => {
//     const key = `count${index}`;
//     const value = this.state[key];
//     this.setState({ [key] : value + 1 });
//   };
// }

// 9. 전개 연산자 (spread operator)
// 배열이나 객체의 모든 속성을 풀어놓을 때 사용하는 문법

// Math.max(1,3,7,9);
// const numbers = [1,3,7,9];
// Math.math(...numbers);

// 전개 구문을 활용하면 원래 객체를 건들지 않고, 새 객체 생성이 가능
// const arr1 = [1,2,3];
// const obj1 = {age: 23, name: 'mike'};
// const arr2 = [...arr1];
// const obj1 = { ...obj2 };
// arr2.push(4);
// obj2.age = 80;

// 배열에서는 전개 연산자를 사용하면 그 순서가 유지됨
// [1, ...[2,3], 4]; // [1,2,3,4];
// new Date(...[2020,6,24]);

// 전개 연산자를 사용하면 두 배열 혹은 객체를 합치기 쉬움
// const obj1 = { age: 21, name: 'mike'};
// const obj2 = { hobby: 'soccer' };
// const obj3 = { ...obj1, ...obj2};
// console.log(obj3);

// ES6 이후부턴 중복된 속성명 허용 가능
// 중복된 속성명 사용 시, 최근 결과는 마지막에 할당된 속성 값이 됨
// 중복된 속성명과 전개 연산자를 사용하면 객체의 특정 속성값을 변경할 때 이전 객체에 영향 없이 새 객체 생성 가능
// 변수를 수정 불가능하게 할 떄 유용
// const obj1 = { x: 1, x: 2, y: 'a'};
// const obj2 = { ...obj1, y: 'b' };

// 9-1. 전개 연산자 없이 동적 전달
// apply 함수 사용
// 하기 코드는 this 바인딩이 불필요하므로, 1번 인자로 null을 사용
// const numbers = [-1, 5, 11, 3];
// Math.max.apply(null, numbers);

// 10. 배열 비구조화 (Array Destructuring)
// 배열의 여러 속성 값을 변수로 쉽게 할당할 수 있는 문법
// const arr = [1,2];
// const [a,b] = arr;
// console.log(a);
// console.log(b);

// 비구조화를 이용하여 이미 존재하는 변수에 값 할당하기
// let a,b;
// [a,b] = [1,2];

// 배열 비구조화에서 기본 값 정의
// 배열의 속성 값이 undefined라면 기본 정의 값 할당, 아니면 기존 값 할당
// const arr = [1];
// const [a= 10, b= 20] = arr;
// console.log(a);
// console.log(b);

// 비구조화를 활용하면 두 변수 값을 쉽게 교환 가능
// let a = 1;
// let b = 2;
// [a,b] = [b,a];
// console.log(a);
// console.log(b);

// 배열의 일부 속성 값을 건너뛰기
// const arr = [1,2,3];
// const [a,,c] = arr;
// console.log(a);
// console.log(c);

// 나머지 값을 별도의 배열로 만들기
// const arr = [1,2,3];
// const [first, ...rest1] = arr;
// console.log(rest1);
// const [a,b,c, ...rest2] = arr;
// console.log(rest2);

// 11. 객체의 비구조화 (Object Destructuring)
// 객체의 여러 속성 값을 변수로 쉽게 할당할 수 있는 문법
// 중괄호 사용, 순서 무의미
// const obj = { age: 21, name: 'mike'};
// const {age, name} = obj;
// console.log(age);
// console.log(name);

// 배열 비구조화에선 왼쪽 변수의 이름은 임의로 결정 가능하나, 객체에선 그대로 사용해야 함
// const obj = { age: 21, name: 'mike'};
// const {name, age} = obj;
// const {age, name} = obj;
// const {a,b} = obj;
// console.log(age);
// console.log(name);
// console.log(a);
// console.log(b);

// 객체 비구조화에선 속성명과 다른 이름으로 변수 할당 가능
// 중복된 변수명 회피 및 구체적 변수명 생성 시 좋음
// const obj = { age: 21, name: 'mike'};
// const {age: theAge, name } = obj;
// console.log(theAge);
// console.log(age); // 참조 에러

// 객체 비구조화 기본 값 정의 : 속성 값이 undefined인 경우엔 기본 값이 들어감
// const obj = { age: undefined, name: null, grade: 'A' };
// const {age = 0, name = 'noName', grade = 'F'} = obj;
// console.log(age);
// console.log(name);
// console.log(grade);

// 객체 비구조화에서 기본값과 별칭 동시 사용
// const obj = { age: undefined, name: 'mike'};
// const {age: theAge = 0, name } = obj;
// console.log(theAge);

// 객체 비구조화에서 기본 값으로 함수의 반환 값도 가능
// 단, 기본 값이 사용될 때 함수가 호출됨
// function getDefaultAge() {
//   console.log('hello');
//   return 0;
// }
// const obj = {age: 21, grade:'A'};
// const { age = getDefaultAge(), grade } = obj;
// console.log(age); // 21

// 객체 비구조화에서 사용되지 않은 나머지 속성들을 별도의 객체로 생성 가능
// const obj = { age: 21, name: 'mike', grade: 'A' };
// const { age, ...rest } = obj;
// console.log(rest);

// for 문에서 객체를 원소로 갖는 배열을 순회할 때 객체 비구조화를 활용하면 편리
// const people = [{age: 21, name: 'mike'}, {age: 51, name: 'sara'}];
// for(const {age, name} of people) {
// }

// 12. 비구조화 심화
// 객체와 배열이 중첩되어도 사용 가능
// const obj = { name: 'mike', mother: {name: 'sara'}};
// const {
//   name,
//   mother: { name:motherName},
// } = obj;
// console.log(name);
// console.log(motherName);
// console.log(mother); // 참조 에러

// 비구조화에서 기본 값의 정의는 변수로 한정되지 않음
// 기본값은 변수가 아닌 패턴 단위로 적용됨
// const [{prop: x} = { prop: 123}] = [];
// console.log(x);
// const [{prop: x} = { prop: 123}] = [{}];
// console.log(x);

// 객체 비구조화에서 계산된 속성명 사용
// 계산된 속성명을 사용할 때에는 반드시 별칭을 지정해야 함
// const index = 1;
// const { [`key${index}`]: valueOfTheIndex} = { key1 : 123 };
// console.log(valueOfTheIndex);
// 별칭에는 변수명만 입력이 가능하지는 않음
// 객체의 비구조화를 이용하여 obj 객체의 prop 속성과 arr에 true라는 원소 할당
// const obj = {};
// const arr = [];
// ({foo: obj.prop, bar: arr[0]} = { foo: 123, bar: true});
// console.log(obj);
// console.log(arr);

// 13. 강화된 함수의 기능
// 매개변수에 기본 값 부여
// 인자가 없어 undefined를 전달하고, 이로 인해 기본 값이 사용됨
// function printLog(a=1) {
//   console.log({a});
// }
// printLog();

// 기본 값으로 함수 부여
// function getDefault() {
//   return 1;
// }
// function printLog(a=1) {
//   console.log({a});
// }
// printLog();

// undefined일 때 기본 값이 사용되는 특징을 사용한 매개변수 필수 값 표현
// function required() {
//   throw new Error('no parameter');
// }
// function printLog(a=required()) {
//   console.log({a});
// }
// printLog(10);
// printLog(); // 에러 발생

// 나머지 매개변수 (rest parameter)
// 입력된 인수 중에서 정의된 매개변수 개수만큼을 제외한 나머지를 배열로 만듦
// 매개변수 개수가 가변적일 때 유용
// function printLog(a, ...rest) {
//   console.log({a, rest});
// }
// printLog(1,2,3);

// ES5에서의 나머지 매개변수
// 이는 매개변수 arguments의 존재가 명시적이지 않으므로 가독성이 좋지 않음
// 배열이 아니므로, 배열처럼 사용하기 위해선 배열로 변환해야 함
// function printLog(a) {
//   const rest = Array.from(argurments).splice(1);
//   console.log({a, rest});
// }
// printLog(1,2,3);

// 명명된 매개변수 (named parameter)
// 객체의 비구조화를 이용하여 구현할 수 있음
// 함수 호출 시, 매개변수의 이름과 값을 동시에 적을 수 있어 가독성이 높음
// const numbers = [10, 20, 30, 40];
// const result1 = getValues(numbers, 5, 25); // 매개변수 이름이 없어 사용 의미를 모름
// const result2 = getValues({numbers, greaterThan: 5, lessThan: 25}); // 매개 변수 이름이 노출됨

// 명명된 매개변수 이용 시, 선택적 매개변수 (optional parameter)의 활용도가 증가
// 필수 값과 반대로 있어도 되고, 없어도 되는 매개변수를 선택적 매개변수라고 함
// 명명된 매개변수는 함수를 호출할 때마다 객체를 생성하므로 비효율적인 것처럼 보여도 자바스크립트 엔진이 최적화하여 새로운 객체를 생성하지 않아 문제 없음
// const result1 = getValues(numbers, undefined, 25); // 선택적 매개변수 예, 불필요한 매개변수에 undefined 대입, 수가 많으면 관리가 힘듦
// const result2 = getValues({numbers, greaterthan: 5}); // 명명된 매개변수 사용, 필요한 인수만 넣으면 되므로 수가 많아도 문제 없음
// const result3 = getValues({numbers, lessThan: 25});

// 14. 화살표 함수
// const add = (a,b) => a + b; // 중괄호가 없으면 오른쪽 값 반환 (명시적 return 불필요)
// console.log(add(1,2));
// const add5 = a => a + 5; // 매개 변수가 1개이면 매개변수 소괄호도 생략 가능
// console.log(add5(1));
// const addAndReturnObject = (a,b) => ({ result: a + b}); // 객체를 반환하면 소괄호에 감싸야 함
// console.log(addAndReturnObject(1,2). result);

// 화살표 함수의 코드가 여러 줄일 때
// const add = (a,b) => {
//   if(a <= 0 || b <= 0) {
//     throw new Error('must be positive number');
//   }
//   return a + b;
// };

// this와 arguments가 바인딩되지 않는 화살표 함수
// 화살표 함수가 다른 함수와 다른 점은 this나 arguments가 바인딩되지 않는 점
// 화살표 함수에서 arguments가 필요하면 나머지 매개변수 사용
// const printLog = (...rest) => console.log(rest);
// printLog(1,2);

// 일반 함수에서 this 바인딩으로 버그가 발생하는 경우
// 일반 함수에선 this는 호출 시점의 사용된 객체로 바인딩됨
// 객체에 정의된 일반 함수를 다른 변수에 할당하여 호출하면 버그가 발생됨
// 화살표 함수 내 this나 arguments는 자신을 감싸는 가장 가까운 일반 함수의 것을 참조
// const obj = {
//   value: 1,
//   increase: function() { // 일반 함수이므로 사용된 객체가 this로 바인딩됨
//     this.value++;
//   },
// };
// obj.increase(); // 객체 this 바인딩
// console.log(obj.value);
// const increase = obj.increase();
// increase(); // 전역 객체 바인딩 (window / global)
// console.log(obj.value);

// 생성자 함수 내부에서 정의된 화살표 함수의 this
// 생성자 함수 내부에서 정의된 화살표 함수의 this는 생성된 객체를 참조
// function Something() {
//   this.value = 1;
//   this.increase = () => this.value++; // 가장 가까운 일반 함수인 something의 this 참조
// }
// const obj = new Something(); // new 키워드로 생성자를 호추하면 this는 생성된 객체를 참조
// obj.increase();
// console.log(obj.value);
// const increase = obj.increase();
// increase();
// console.log(obj.value);

// setInterval 함수 사용 시, this 바인딩 문제
// function Something() {
//   this.value = 1;
//   setInterval(function increase() {
//     this.value++; // 전역 객체를 가리킴
//   }, 1000);
// }
// const obj = new Something();

// 위 setInterval 문제를 해결하기 위한 편법 1
// function Something() {
//   this.value = 1;
//   var thath = this;
//   setInterval(function increase() {
//     that.value++; // 클로저를 활용하여 함수에 미리 저장된 that 변수를 통해 this에 접근
//   }, 1000);
// }
// const obj = new Something();

// 화살표 함수를 이용한 문제 해결
// function Something() {
//   this.value = 1;
//   setInterval(() => {
//     this.value++; // 클로저를 활용하여 함수에 미리 저장된 that 변수를 통해 this에 접근
//   }, 1000);
// }
// const obj = new Something();

// 클로저는 함수가 생성되는 시점에 접근 가능했던 변수들을 생성 이후에도 계속해서 접근할 수 있게 해주는 기능
// 접근할 수 있는 변수는 그 함수를 감싸고 있는 상위 함수들의 매개변수와 내부변수들임
// function makeAddFunc(x) {
//   return function add(y) { // add 함수는 상위 함수인 makeAddFunc의 매개변수인 x에 접근 가능
//     return x + y;
//   };
// }
// const add5 = makeAddFunc(5); // 생성 이후에도 상우 함수를 호출할 때 사용한 인수에도 접근이 가능
// console.log(add5(1)); // 6
// const add7 = makeAddFunc(7); // 중간에 새로운 함수가 생성되어도 영향은 없음
// console.log(add7(1)); // 8
// console.log(add5(1)); // 6