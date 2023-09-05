const path = require('path');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');

module.exports = {
    entry: { // 각 페이지의 자바스크립트 파일을 entry 값으로 입력
        page1: './src/index1.js', // 이해를 위해 하나의 페이지만 생성함
        // page2: './src/index2.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        splitChunks: {
            chunks: 'async', // 동적 임포트일 경우에만 분할 진행
            minSize: 30000, // 파일 크기가 30kb 이상인 모듈을 대상으로만 분할 대상 취급
            minChunks: 1, // 한 개 이상의 청크에 포함되어 있어야 함
            // ...
            cacheGroups: { // 파일 분할은 그룹별로 이뤄짐, 기본적으로 외부 모듈(vendors)와 내부 모듈(default) 두 그룹으로 설정되어 있음, 외부 모듈은 내부 모듈보다 비교적 낮은 비율로 코드가 변경되므로 브라우저에 오래 캐싱될 수 있는 장점이 존재함
                default: { // 내부 모듈은 두 개 이상의 번들 파일에 포함되어야 분할됨
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
            },
        },
    },
    plugins: [new CleanWebpackPlugin()], // dist 폴더 정리를 위해 CleanWebpackPlugin 사용
    mode: 'production',
};