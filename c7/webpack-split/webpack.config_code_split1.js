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
        splitChunks: { // optimization의 splitChunks 속성을 이용하면 코드 분할이 가능함
            chunks: 'all', // chunks 속성의 기본값은 동적 임포트만 분할하는 async이므로, all로 변경하여 모든 경우에도 코드 분할이 가능하도록 설정
            minSize: 10, // 파일 크기 제한에 걸리지 않도록 낮은 값으로 설정
            cacheGroups: {
              vendors: {
                  test: /[\\/]node_modules[\\/]/,
                  // priority: 2,
                  name: 'vendors',
              },
              // defaultVendors: {
              //     minChunks: 1, // 청크 갯수 제한을 최소 1개로 설정
              //     priority: 1,
              //     name: 'default',
              // },
              reactBundle: {
                  test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                  name: 'react.bundle',
                  priority: 2, // 우선 순위가 높아야 리액트 모듈이 vendors 그룹에 포함되지 않음
                  minSize: 100,
              },
            },
        },
    },
    plugins: [new CleanWebpackPlugin()], // dist 폴더 정리를 위해 CleanWebpackPlugin 사용
    mode: 'production',
};