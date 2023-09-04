const path = require('path');

module.exports = {
    entry: './src/index.js', // index.js 모듈을 입력 파일로 사용
    output: { // dist 폴더 밑에 main.js 번들 파일을 생성
        filename: 'main.js',
        path: path.resolve(__dirname,'dist'),
    },
    mode: 'production', // 프로덕션 모드로 설정하면 자바스크립트 코드 압축을 포함한 여러 가지 최적화 기능이 기본으로 들어감
    optimization: { minimizer : [] }, // 번들 파일의 내용을 쉽게 확인하기 위해 압축하지 않도록 설정함
};