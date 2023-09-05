const path = require('path');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');

module.exports = {
    entry: { // 각 페이지의 자바스크립트 파일을 entry 값으로 입력
        page3: './src/index3.js', // 이해를 위해 하나의 페이지만 생성함
        // page2: './src/index2.js',
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js', // chunkfilename 속성을 이용하여 동적 임포트로 만들어지는 번들 파일 이름을 설정함
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [new CleanWebpackPlugin()], // dist 폴더 정리를 위해 CleanWebpackPlugin 사용
    mode: 'production',
};