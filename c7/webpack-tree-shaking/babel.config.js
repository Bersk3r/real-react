/**ESM 모듈을 유지하도록 설정*/
const presets = [
    [
        '@babel/preset-env',
        {
            module: false, // 모듈 시스템이 변경되지 않도록 설정
        },
    ],
];