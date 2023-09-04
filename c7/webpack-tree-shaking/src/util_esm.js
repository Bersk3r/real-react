const arr = [];
export function func1() {
    // console.log('func1');
    console.log('func1', arr.length);
}
export function func2() {
    arr.push(10); // func2 함수는 전역 변수의 값을 변경함
    console.log('func2');
}
func2(); // 모듈이 평가(evaluation)될 때, func2 함수가 실행됨
