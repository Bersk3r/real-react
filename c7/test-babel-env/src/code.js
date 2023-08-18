import 'core-js'; // useBuiltIns 속성에 entry를 입력하면 core-js 모듈을 가져오는 코드는 각 폴리필 모듈을 가져오는 여러 줄의 코드로 변환됨

const p = Promise.resolve(10);
const obj = {
    a: 10,
    b: 20,
    c: 30,
};
const arr = Object.values(obj);
const exist = arr.includes(20);