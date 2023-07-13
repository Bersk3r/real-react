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

// 15. Promise
// 프로미스는 비동기 상태를 값으로 다룰 수 잇는 객체
// 프로미스를 사용하면 비동기 프로그래밍할 때, 동기 프로그래밍 방식으로 작성이 가능
// 프로미스 이전엔 콜백 패턴을 많이 이용

// 프로미스 이전의 콜백 패턴
// 콜백 패턴은 조금만 중첩되도 코드가 복잡해지는 문제가 존재
// 콜백 패턴은 코드의 흐름이 순차적이지 않으므로 코드를 읽기가 상당히 힘듦
// function requestData1(callback) {
//   callback(data);
// }
// function requestData2(callback) {
//   callback(data);
// }
// function onSuccess1(data) {
//   console.log(data);
//   requestData2(onSucess2);
// }
// function onSuccess2(data) {
//   console.log(data);
// }
// requestData1(onSuccess1);

// 프로미스를 사용하면 위 코드를 순차적으로 실행 가능
// requestData1()
//   .then(data => {
//     console.log(data);
//     return requestData2();
//   })
//   .then(data => {
//     console.log(data);
//     }
//   );

// 프로미스는 3가지 상태로 구성되어 있음
// 대기 중 (pending) :  결과를 기다리는 중
// 이행됨 (fullfilled) : 수행이 정상적으로 끝났고, 결괏값을 가지고 있음
// 거부됨 (rejected) : 수행이 비정상적으로 끝났음
// 이행됨, 거부됨 상태를 처리됨 상태라고 부름
// 프로미스는 처리됨 상태가 되면 더 이상 다른 상태로 변경되지 않음
// 대기 중 상태일 때만 이행됨 혹은 거부됨 상태가 될 수 있음

// 프로미스 생성 방법
// const p1 = new Promise((resolve, reject) {
//   // ...
//   // resolve(data)
//   // or reject('error message')
// });
// const p2 = Promise.reject('error message');
// const p3 = Promise.resolve(param);

// const p1 = Promise.resolve(123);
// console.log(p1 !== 123); // true
// const p2 = new Promise(resolve => setTimeout(() => resolve(10), 1));
// console.log(Promise.resolve(p2) === p2);

// 프로미스에서 then은 처리됨 상태가 된 프로미스를 처리할 때 사용하는 메소드
// 프로미스가 처리됨(settled) 상태가 되면 then 메서드의 인수로 전달된 함수가 호출됨
// requestData(). then(onResolve, onReject);
// Promise.resolve(123).then(data => console.log(data)) // 123
// Promise.reject('err').then(null, error => console.log(error)); // 에러 발생

// 연속하여 then 메서드 호출
// requestData1()
//   .then(data => {
//     console.log(data);
//     return requestData2();
//   })
//   .then(data => {
//     return data + 1;
//   })
//   .then(data => {
//     throw new Error('some error');
//   })
//   .then(null, error => {
//     console.log(error);
//   })

// then 메서드의 가장 중요한 특징은 항상 연결된 순서대로 호출됨
// Promise.reject('err')
//   .then(() => console.log('then 1'))
//   .then(() => console.log('then 2'))
//   .then(() => console.log('then 3'), () => console.log('then 4'))
//   .then(() => console.log('then 5'), () => console.log('then 6'));

// catch는 프로미스 수행 중 발생된 예외를 처리하는 메소드
// catch 메소드는 then 메소드의 onReject 함수와 같은 역할을 수행
// 예외 처리는 then 메소드의 onReject 함수보다는 catch 메소드를 이용하는 게 가독성 면에서 좋음
// Promise.reject(1).then(null, error => {
//   console.log(error);
// });
// Promise.reject(1).catch(error => {
//   console.log(error);
// })

// then 메소드의 onReject를 사용했을 때의 문제점
// then 메서드의 onResolve 함수에서 발생된 예외는 같은 then 메서드의 onReject 함수에서 처리할 수 없음
// unhandled Promise rejection 에러 발생 (거부됨 상태의 프로미스를 처리하지 않았기 때문)
// Promise.resolve().then(
//   () => {
//     throw new Error('some error');
//   },
//   error => {
//     console.log(error);
//   },
// );

// onReject 함수 대신 catch로 처리한 예
// 프로미스에서 예외 처리를 할 때에는 then 메서드의 onReject 함수보다는 좀 더 직관적인 catch를 사용하는 것을 추천
// then과 마찬가지로 catch 함수도 새로운 프로미스를 반환 (이후, then이나 catch 연속 사용 가능)
// Promise.resolve()
//   .then(() => {
//     throw new Error('some Error');
//   })
//   .catch(error => {
//     console.log(error);
//   });

// Promise.reject(10)
//   .then(data => {
//     console.log('then1 : ', data);
//     return 20;
//   })
//   .catch(error => {
//     console.log('catch:', error);
//     return 30;
//   })
//   .then(data => {
//     console.log('then2: ', data);
//   })

// finally는 프로미스가 이행됨 또는 거부됨 상태가 되면 호출하는 메서드
// finally는 프로미스 체인의 가장 마지막에 사용
// finally 메서드는 .then(onFinally, onFinally) 코드와 유사하나, 이전에 사용한 프로미스를 그대로 반환함
// 처리됨 상태인 프로미스를 건들지 않고 추가 작업을 수행할 때 유용
// requestData()
//   .then(data => {
//     // ...
//   })
//   .catch(error => {
//     // ...
//   })
//   .finally(() => {
//     // ...
//   });

// 데이터의 요청의 성공, 실패 여부에 상관없이 서버에 로그를 보낼 때 finally 메서드 사용
// function requestData() {
//   return fetch()
//     .catch(error => {
//       // ...
//     })
//     .finally(() => {
//       sendLogToServer('requestData finished');
//     })
// }
// requestData().then(data => console.log(data));

// 16. 프로미스 활용
// 병렬로 처리하기 (Promise.all)
// Promise.all은 여러 개의 프로미스를 병렬로 처리할 때 사용
// then 메서드를 체인으로 연결하면 각각의 비동기 처리가 병렬로 처리되지 않음 (순차적 실행)
// requestData1()
//   .then(data => {
//     console.log(data);
//     return requestData2();
//   })
//   .then(data => {
//     console.log(data);
//   })

// 비동기 함수 간에 서로 의존성이 없으면 병렬로 처리하는 게 빠름
// then 메서드를 체인으로 연결하지 않고, 각각 호출하면 병렬 처리됨
// 두 함수는 동시에 실행됨
// requestData1().then(data => console.log(data));
// requestData2().then(data => console.log(data));


// Promise.all 함수는 프로미스를 반환함
// Promise.all 함수가 반환하는 프로미스는 입력된 모든 프로미스가 처리됨 상태가 되어야 마찬가지로 처리됨이 됨
// 만약 하나라도 거부 상태이면 Promise.all 함수가 반환하는 프로미스도 거부됨이 됨
// Promise.all([requestData1(), requestData2()]).then(([data1, data2]) => {
//   console.log(data1, data2);
// });

// Promise.race : 가장 빨리 처리되는 프로미스 가져오기
// Promise.race는 여러 개의 프로미스 중에서 가장 빨리 처리된 프로미스를 반환
// Promise.race 함수에 입력된 여러 프로미스 중에서 하나라도 처리됨 상태가 되면 Promise.race 함수가 반환하는 프로미스도 처리됨이 됨
// Promise.race([
//   requestData(),
//   new Promise((_, reject) => setTimeout(reject, 3000)),
// ])
//   .then(data => console.log(data))
//   .catch(error => console.log(error));

// 프로미스를 이용한 데이터 캐싱
// 처리됨 상태가 되면 그 상태를 유지하는 프로미스의 성질을 이용하여 데이터 캐싱 가능
// 처음 호출 시에만 해당 함수를 실행하고 그 결과를 변수에 저장
// 데이터를 가져오는 작업의 실패 케이스는 고려되지 않았으나 프로미스로 캐싱 구현 가능
// let cachedPromise;
// function getData() {
//     cachedPromise = cachedPromise || requestData();
//     return cachedPromise;
// }
// getData.then(v => console.log(v));
// getData.then(v => console.log(v));

// 프로미스 사용 시 주의 사항

// return 키워드 깜빡하지 않기
// then 메서드 내부 함수에서 return 키워드를 입력하는 것을 깜빡하기 쉬움
// then 메서드가 반환하는 프로미스 객체의 데이터는 내부 함수가 반환한 값임
// return이 없으면 프로미스 객체의 데이터는 undefined가 되므로 주의해야 함
// Promise.resolve(10)
//   .then(data => {
//     console.log(data);
//     Promise.resolve(20);
//   })
//   .then(data => {
//     console.log(data);
//   });

// 프로미스는 불변 객체
// function requestData() {
//   const p = Promise.resolve(10);
//   p.then(() => {
//     return 20; // 새로운 프로미스 생성
//   });
//   return p;
// }
// requestData().then(v => {
//   console.log(v); // 10
// })

// function requestData() {
//   return Promise.resolve(10).then(v => {
//     return 20;
//   });
// }

// 프로미스 중첩 주의
// 프로미스를 중첩하여 사용하면 콜백 패턴처럼 복잡해지므로, 사용을 비권장함
// requestData1().then(result1 => {
//     requestData2(result1).then(result2 => {
//      // ...
//   });
// });

// 위 중첩 해결 but result1 참조가 안 됨
// requestData1()
//   .then(result1 => {
//     return requestData2(result1);
//   })
//   .then(result2 => {
//     // ...
//   })

// 위 문제는 Promise.all로 해결
//  promise.all 함수로 입력하는 배열에 프로미스가 아닌 값을 넣으면, 그 값 그대로 이행됨 상태의 프로미스가 됨
// requestData1()
//   .then(result1 => {
//     return Promise.all([result1, requestData2(result1)]);
//   })
//   .then(([result1, result2]) => {
//     // ...
//   });

// 동기 코드의 예외 처리
// 프로미스를 동기 코드처럼 사용하는 경우, 예외 처리가 중요함
// function requestData() {
//   doSync(); // 위 함수가 fetch 이전에 실행되는 게 아니라면 then에 넣는 게 좋음
//   return fetch()
//     .then(data => console.log(data))
//     .catch(error => console.log(error));
// }
// function requestData() {
//   return fetch()
//     .then(data => {
//       doSync(); // 이 곳에서 발생되는 예외는 catch에서 처리 가능
//       console.log(data)
//     })
//     .catch(error => console.log(error));
// }

// 17. async/await
// async/await를 사용하면 프로미스 then 메서드를 체인 형식으로 호출하는 것보다 가독성이 좋아짐
// 하지만 async/await가 프로미스를 완전히 대체하는 것은 아님
// then 메서드를 체인 형식으로 호출하는 것보다 가독성은 좋음
// 프로미스는 객체로 존재하지만 async/await는 함수에 적용되는 개념
// async function getData() {
//   return 123;
// }
// getData().then(data => console.log(data)); // 123

// async function getData() {
//   return Promise.resolve(123);
// }
// getData().then(data => console.log(data)); // 123

// async function getData() {
//   throw new Error('123');
// }
// getData().catch(error => console.log(error));

// await 키워드는 async/await 함수 내부에서 사용됨
// await 키워드 오른쪽에 프로미스를 입력하면  그 프로미스가 처리됨 상태가 될 때까지 대기
// await 키워드로 순차적인 코드 작성이 가능
// function requestData(value) {
//   return new Promise(resolve =>
//     setTimeout(() => {
//       console.log('requestData: ', value);
//       resolve(value);
//     }, 1000),
//   );
// }
// async function getData() {
//   const data1 = await requestData(10);
//   const data2 = await requestData(20);
//   console.log(data1, data2);
//   return [data1, data2];
// }
// getData().then(
//   data => {
//     console.log(data);
//   }
// )

// await 키워드는 async 함수 내에서만 사용 가능
// function getData() {
//   const data = await requestData(10);
//   console.log(data);
// }

// async/await와 Promise 비교
// 비동기 함수 간에 의존성이 높아질수록 async await와 프로미스의 가독성 차이는 더 선명하게 드러남.
// function getDataPromise() {
//   asyncFunc1()
//     .then(data => {
//       console.log(data);
//       return asyncFunc2();
//     })
//     .then(data => {
//       console.log(data);
//     });
// }
// async function getDataAsync() {
//   const data1 = await asyncFunc1();
//   console.log(data1);
//   const data2 = await asyncFunc2();
//   console.log(data2);
// }

// 서로 의존성이 있는 여러 비동기 함수 처리를 각각 async/await 혹은 프로미스로 작성
// function getDataPromise() {
//   return asyncFunc1()
//     .then(data1 => Promise.all([data1, asyncFunc2(data1)]))
//     .then(([data1, data2]) => {
//       return asyncFunc3(data1, data2);
//     })
// }
// async function getDataAsync() {
//   const data1 = await asyncFunc1();
//   const data2 = await asyncFunc2(data1);
//   return asyncFunc3(data1, data2);
// }

// 비동기 함수를 병렬로 실행
// 두 함수 사이에 의존성이 없으면 동시에 실행하는 게 좋음
// async function getData() {
//   const data1 = await asyncFunc1();
//   const data2 = await asyncFunc2();
// }

// 프로미스는 생성과 동시에 비동기 코드가 실행됨
// async function getData() {
//   const p1 = asyncFunc1();
//   const p2 = asyncFunc2();
//   const data1 = await p1;
//   const data2 = await p2;
// }

// promise.all을 사용한 위 함수 개선
// async function getData() {
//   const [data1, data2] = await Promise.all([asyncFunc1(), asyncFunc2()]);
// }

// async/await 함수 예외 처리
// async function getData() {
//   try {
//     await doAsync(); // async/await가 아니면 doAsync 함수 예외는 catch 문에서 처리되지 않음 (종료 시점 미정)
//     return doSync();
//   } catch(error) {
//     console.log(error);
//   }
// }

// Thenable : 프로미스처럼 동작하는 객체 (프로미스가 아니어도 then 메서드를 가진 객체)
// async/await도 then 메서드를 가진 객체를 프로미스처럼 취급

// class ThenableExample {
//   then(resolve, reject) {
//     setTimeout(() => resolve(123), 1000);
//   }
// }
// async function asyncFunc() {
//   const result = await new ThenableExample(); // Thenable 객체 (비동기 객체는 생성 즉시 실행됨)
//   console.log(result); // 123
// }

// 18. 템플릿 리터럴 (Template Literals)는 변수를 이용하여 동적으로 문자열을 생성할 수 있는 문법
// 백틱 (``)을 이용하며, 표현식을 사용할 때에는 ${expression} 형태로 입력

// ES6 이전 동적 문자열 생성
// var name = 'mike';
// var score = 80;
// var msg = 'name: ' + name + ', score/100: ' + score/100;
// console.log(msg);

// const msg = `name: ${name}, score/100: ${score/100}`;

// 템플릿 리터럴을 사용하면 여러 줄 문자열을 생성하기 쉬움
// 하기 코드는 줄 끝에 \n 기호가 존재하면 줄 바꿈이 되므로 복잡함
// \를 이용한 방법도 표현식이 들어가면 복잡해짐
// const msg = 'name: ' + name + '\n' +  'age: ' + age + '\n' + "score: " + score + '\n';
// const msg = `name: ${name}
// age: ${age}
// score: ${score}`;

// 태그된 템플릿 리터럴 (Tagged Template Literal) : 템플릿 리터럴을 확장한 개념
// 태그된 템플릿 리터럴은 함수로 정의됨
// 함수명과 함께 템플릿 리터럴을 붙여서 사용
// function taggedFunc(strings, ...expressions) { // tagged template literal
//   return 123;
// }
// const v1 = 10;
// const v2 = 20;
// const result = taggedFunc`a ${v1} b ${v2}`;
// console.log(result);

// const v1 = 10;
// const v2 = 20;
// taggedFunc`a-${v1}-b-${v2}-c`; // 표현식을 기준으로 문자열을 분할
// strings = ['a-', '-b-', '-c'];
// taggedFunc`a-${v1}-b-${v2}`;  // 표현식 기준으로 문자열을 분할했을 때, 오른쪽/왼쪽에 아무런 값이 없으면 빈 값이 됨
// strings = ['a-', '-b-', ''];
// taggedFunc`${v1}-b-${v2}`;
// strings = ['', '-b-', ''];
// expressions = [10,20];
// function taggedFunc(strings, ...expressions) {
//   console.log(strings.length === expressions.legnth + 1); // expression의 갯수 + 1은 strings의 갯수가 동일
// }

// 태그된 템플릿 문자열은 일부 문자열을 강조할 때에도 사용할 수 있음
// expressions 매개변수로 전달된 문자열을 HTML strong 태그로 감싸주는 경우
// 태그된 템플릿 리터럴 함수의 반환 값이 꼭 문자열일 필요는 없음 => styled-components에선 태그된 템플릿 리터럴 함수가 리액트 컴포넌트를 반환함
// function highlight(strings, ...expressions) {
//   return strings.reduce(
//     (prevValue, str, i) =>
//       expressions.length === i
//       ? `${prevValue}${str}`
//       : `${prevValue}${str}<strong>${expressions[i]}</strong>`,
//      '',
//     );
// }
// const v1 = 10;
// const v2 = 20;
// const result = highlight`a ${v1} b ${v2} c`;
// console.log(result);

// 19. 제네레이터 : 함수의 실행을 중간에 멈추고 재개할 수 있는 독특한 기능
// 실행을 멈출 때 값을 전달할 수 있어 반복문에서 제네레이터가 전달하는 값을 한 개씩 꺼내어 사용 가능
// 배열이 반복문에서 사용되는 것과 유사
// 보통의 컬렉션(collection)과 달리 값이 미리 생성하지 않음
// => 값을 미리 만들어 놓으면 불필요하게 메모리를 사용 (컬렉션)
// => 필요한 순간에 값을 계산하여 전달할 수 있어 메모리 측면에서 효율적임
// 제네레이터는 값을 전달하는 것 이외에도 다른 함수와 협업 멀티태스킹 (cooperative multitasking)을 할 수 있음
// => 이는 제네레이터가 실행을 멈추고 재개가 가능하므로 가능한 것

// 제네레이터는 별표와 함께 정의된 함수와 그 함수가 반환하는 제네레이터 객체로 구성됨
// function* f1() { // 제네레이터 선언
//   yield 10; // 함수 실행 일시 중단
//   yield 20;
//   return 'finished';
// }
// const gen = f1(); // 실행 시, 제네레이터 객체 반환

// 제네레이터 객체는 next, return, throw의 메서드를 가짐 => 주로 next를 사용
// next 메서드가 존재하는 것은 제네레이터 객체가 반복자(iterator)라는 것을 의미
// function* f1() {
//   console.log('f1-1');
//   yield 10;
//   console.log('f1-2');
//   yield 20;
//   console.log('f1-3');
//   return 'finished';
// }
// next 결과
// const gen = f1(); // 제네레이터 함수를 실행하면 제네레이터 객체만 반환하고 실제로 함수 내부는 실행되지 않음
// console.log(gen.next()); // 다음 yield를 만날때까지 실행 (데이터 객체 반환, done: false, 못 만나면 true 반환)
// console.log(gen.next());
// console.log(gen.next()); // return이 함수 최상단에 있으면 첫 next 메서드 호출에서 done 값은 참이 됨

// return 결과
// const gen = f1();
// console.log(gen.next());
// console.log(gen.return('abc')); // 호출되면 done이 참이 됨
// console.log(gen.next());

// throw 결과
// function* f1() {
//   try {
//     console.log('f1-1');
//     yield 10;
//     console.log('f1-2');
//     yield 20;
//   } catch(e) {
//     console.log('f1-catch', e);
//   }
// }
// const gen = f1();
// console.log(gen.next());
// console.log(gen.throw('some error')); // throw 메서드 호출 시, 예외가 발생된 것으로 처리되어 catch 문으로 진입, done은 참이 됨

// 제네레이터 객체는 반복 가능하면서 반복자임
// 반복자인 이유
// 1. next 메서드를 가짐
// 2. next 메서드는 value와 done 속성자를 가진 객체를 반환
// 3. done 속성 값을 작업이 끝났을 때 참이 됨

// 반복 가능한 객체인 이유
// 1. Symbol.iterator 속성 값을 함수로 가지고 있음
// 2. 해당 함수를 호출하면 반복자를 반환

// 배열은 반복가능한 객체임
// const arr = [10, 20, 30];
// const iter = arr[Symbol.iterator](); // Symbol.iterator를 속성 값을 가지며,
// console.log(iter.next()); // 반환한 변수가 반복자임

// 제네레이터는 반복가능한 객체임
// function* f1() {
//   // ...
// }
// const gen = f1();
// console.log(gen[Symbol.iterator]() === gen); // Symbol.iterator 속성값을 호출한 결과가 자기자신(반복자)임

// 반복가능한 객체를 이용하는 방법
// function* f1() {
//   yield 10;
//   yield 20;
//   yield 30;
// }
// for (const v of f1()) { // for .. of는 반복가능한 객체로부터 반복자를 얻음, next 메서드를 호출하면서 done이 true가 될 때까지 반복
//   console.log(v);
// }
// const arr = [...f1()]; // 전개 연산자도 done이 true가 될 때까지 값을 펼침
// console.log(arr);

// 제네레이터, 반복자, 반복가능한 객체를 이용하면 함수형 프로그래밍의 대표적인 함수를 쉽게 구현 가능
// 제네레이터 함수 내부에서 반복가능한 객체를 사용
// => 새로운 배열 객체를 생성하지 않음
// => 연산이 필요한 순간에만 실행
// 필요한 순간에만 연산하는 방식을 지연 평가 (lazy evaluation)이라고 함
// 필요한 순간에만 연산하므로, 무한대 연산, 무한 루프에서도 에러가 멈추지 않음
// function* map(iter, mapper) {
//   for(const v of iter) {
//     yield mapper(v);
//   }
// }
// function* filter(iter, test) {
//   for(const v of iter) {
//     if(test(v)) {
//       yield v;
//     }
//   }
// }
// function* take(n, iter) {
//   for(const v of iter) {
//     if(n <= 0) return;
//     yield v;
//     n--;
//   }
// }
// const values = [1,2,3,4,5,6,7,8,9,10];
// const result = take(3, map(filter(values, n => n%2 === 0), n => n * 10)); // 함수 호출 시 제네레이터 객체만 생성되고 연산이 수행되지 않음
// console.log([...result]); // 이 때, 연산을 수행

// function* naturalNumbers() {
//   let v = 1;
//   while(true) {
//     yield v++;
//   }
// }
// const values = naturalNumbers();
// const result = take(3, map(filter(values, n => n%2 === 0), n => n * 10)); // 함수 호출 시 제네레이터 객체만 생성되고 연산이 수행되지 않음
// console.log([...result]); // 이 때, 연산을 수행

// 제네레이터 함수에서 다른 제네레이터 함수를 호출하는 방법은 yield* 키워드를 이용
// yield* 키워드 오른쪽에는 반복 가능한 객체가 오도록 설계되어 있음
// function* g1() {
//   yield 2;
//   yield 3;
// }
// function* g2() {
//   yield 1;
//   yield* g2(); // 제네레이터 함수에서 다른 제네레이터 함수 호출
//   yield 4;
// }
// console.log(...g2());

// function* g2_second() {
//   yield 1;
//   for(const value of g1()) { // g1과 동일
//     yield value;
//   }
//   yield 4;
// }
// function g2_third() {
//   yield 1;
//   yield* [2,3]; // 제네레이터 뿐만이 아닌 반복 가능한 객체가 올 수 있음
//   yield 4;
// }

// 제네레이터 함수로 데이터 전달
// 제네레이터 함수는 외부로부터 데이터를 받아 소비가 가능
// next 메서드를 호출하는 쪽에서 제네레이터 함수로 데이터 전달 가능
// function* f1() {
//   const data1 = yield; // next 메서드로 전달 받은 값을 결과 값으로 전달
//   console.log(data1); // 10
//   const data2 = yield;
//   console.log(data2); // 20;
// }
// const gen = f1();
// gen.next(); // 제네레이터 함수가 실행되도록 만드는 역할
// gen.next(10); // 인수로 데이터를 전달
// gen.next(20);

// 협업 멀티태스킹
// 제네레이터는 다른 함수와 협업 멀티태스킹이 가능
// 멀티태스킹은 여러 개의 태스크를 실행할 때, 하나의 태스크가 종료되기 전에 멈추고 다른 태스크가 실행되는 것을 의미
// 제네레이터는 멈추고 실행하는 것이 가능하여 멀티태스킹이 가능
// 협업이 붙은 이유는 제네레이터가 실행을 멈추는 시점을 자발적(non-preemptive)으로 선택가능하므로
// 실행을 멈추는 시점을 자발적으로 선택 못하면 선점형(preemptive) 멀티태스킹이라고 함
// function* minsu() {
//   const myMsgList = [
//     '안녕 나는 민수야',
//     '만나서 반가워',
//     '내일 영화 볼래?',
//     '시간 안 되니?',
//     '내일 모레는 어때?',
//   ];
//   for(const msg of myMsgList) {
//     console.log('수지: ', yield msg); // 자발적으로 자신의 실행을 멈춤
//   }
// }
// function suji() {
//   const myMsgList = ['', '안녕 나는 수지야', '그래 반가워', '...'];
//   const gen = minsu();
//   for(const msg of myMsgList) {
//     console.log('민수: ', gen.next(msg).value); // 제네레이터가 다시 실행되도록 함
//   }
// }
// suji();

// 제네레이터 함수에서의 예외 처리
// 제네레이터 함수에서 발생한 예외는 next 메서드를 호출하는 외부 함수에 영향을 줌
// function* getFunc() {
//   throw new Error('some error'); // 제네레이터 함수에서 예외가 발생
// }
// function func() {
//   const gen = getFunc(); // 제네레이터 객체가 만들어지는 시점에선 예외가 발생하지 않음
//   try {
//     gen.next(); // next 메서드가 호출되면 제네레이터 함수의 예외가 일반 함수에 영향을 줌
//   } catch(e) {
//     console.log('in catch: ', e);
//   }
// }
// func();it c