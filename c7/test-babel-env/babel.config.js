/**babel.config.js*/
const presets = [
    [
        '@babel/preset-env', // @babel/preset-env 프리셋을 사용 
        {
            targets: {
                chrome: '40', // 크롬 버전을 최소 40으로 설정함
            },
            // useBuiltIns: 'entry',
            useBuiltIns: 'usage',
            corejs: { version: 3, proposals: true }, // 바벨에게 core-js 버전을 알려줌
        },
    ],
];

module.exports = { presets };