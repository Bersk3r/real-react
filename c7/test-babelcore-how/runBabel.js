/**@babel/core로 바벨을 직접 실행하기*/
const babel = require('@babel/core');
const fs = require('fs');

const filename = './src/code.js';
const source = fs.readFileSync(filename, 'utf8');
const presets = ['@babel/preset-react'];
const plugins = [
    '@babel/plugin-transform-template-literals',
    '@babel/plugin-transform-arrow-functions',
];
const { code } = babel.transformSync(source, {
    filename,
    presets,
    plugins,
    configFile: false,
  }
)

console.log(code); // code의 결괏값을 출력함, 파일로 저장하기를 원한다면 fs 모듈을 이용한다