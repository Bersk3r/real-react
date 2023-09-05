function myFunc() {
    import('./util').then(({ add })=> // import 함수를 사용하면 동적으로 모듈을 가져올 수 있음
        import('lodash').then(({ default: _ }) =>
            console.log('value', _.fill([1,2,3], add(10, 20))),
        ),
    );
}
myFunc();