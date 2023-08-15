/**AST를 활용해서 효율적으로 바벨을 실행하는 코드*/
const babel = require('@babel/core');
const fs = require('fs');

const filename = './src/code.js';
const source = fs.readFileSync(filename, 'utf8');
const presets = ['@babel/preset-react'];

const { ast } = babel.transformSync(source, { // code는 생성하지 않고, AST만 생성 => 프리셋은 두 가지 설정 모두 같으므로 AST를 만들 때 해당 프리셋을 미리 적용한다
        filename,
        ast: true,
        code: false,
        presets,
        configFile: false,
});
const { code: code1 } = babel.transformFromAstSync(source, { // AST로부터 첫 번째 설정의 플러그인이 반영된 코드를 생성한다
   filename,
   plugins: ['@babel/plugin-transform-template-literals'],
   configFile: false,
});
const { code: code2 } = babel.transformFromAstSync(source, { // AST로부터 두 번째 설정의 플러그인이 반영된 코드를 생성한다 => 설정 갯수가 많아질수록 효율이 높아짐
   filename,
   plugins: ['@babel/plugin-transform-arrow-functions'],
   configFile: false,
});

console.log('code1"\n', code1); // code의 결괏값을 출력함, 파일로 저장하기를 원한다면 fs 모듈을 이용한다
console.log('code2"\n', code2); // code의 결괏값을 출력함, 파일로 저장하기를 원한다면 fs 모듈을 이용한다