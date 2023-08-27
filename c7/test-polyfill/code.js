/**폴리필 코드의 예시*/
if(!String.prototype.padStart) { // padStart 메서드가 잇는지 검사해서 없는 경우에만 주입
    String.prototype.padStart = func; // func는 padStart 폴리필 함수
}

/**core-js 모듈의 사용 예시*/
import 'code-js';

const p = Promise.resolve(10);
const obj = {
    a: 10,
    b: 20,
    c: 30,
}
const arr = Object.values(obj);
const exist = arr.includes(20);

/**웹팩에서 core-js 모듈을 사용한 예*/
module.exports = {
    entry: ['core-js', './src/index.js'],
    // ...
};

/**core-js에서 필요한 폴리필을 직접 넣는 코드*/
import 'core-js/features/promise';
import 'core-js/features/obejct/values';
import 'core-js/features/obejct/includes';

const p = Promise.resolve(10);
const obj = {
    a: 10,
    b: 20,
    c: 30,
};
const arr = Object.values(obj);
const exist = arr.includes(20);

/**@babel/preset-env 설정 예*/
const presets = [
    [
        '@babel/preset-env',
        {
            targets: '> 0.25%, not dead',
        },
    ],
];

module.exports = { presets };