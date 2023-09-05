/**동적 임포트를 사용하는 코드*/
// function myFunc() {
//     import('./util').then(({ add })=> // import 함수를 사용하면 동적으로 모듈을 가져올 수 있음
//         import('lodash').then(({ default: _ }) =>
//             console.log('value', _.fill([1,2,3], add(10, 20))),
//         ),
//     );
// }
// myFunc();

/** 두 모듈을 동시에 가져오는 코드 */
// async function myFunc() {
//     const [{add}, { default: _ }] = await Promise.all([ // Promise.all 함수를 사용하여 두 모듈을 동시에 가져옴
//         import('./util'),
//         import('./lodash'),
//     ]);
//     console.log('value', _.fille([1,2,3], add[30,20]));
// }
// myFunc();

/**preload, prefetch 설정*/
async function myFunc() {
    await new Promise(res => setTimeout(res, 1000)); // 너무 빠르게 처리하면 prefetch 효과를 확인할 수 없으므로 1초 대기 코드를 앞에 추가
    const [{add}, { default: _ }] = await Promise.all([
            import(/* webpackPreload*/ './util'), // util.js 모듈은 preload로 설정함
            import(/* webpackPrefetch */ 'lodash'), // lodash 모듈을 prefetch로 설정함
    ]);
    console.log('value', _.fille([1,2,3], add[30,20]));
}
myFunc();
