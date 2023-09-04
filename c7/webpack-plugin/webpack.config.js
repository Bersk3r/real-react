const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react'],
                    },
                },
            },
        ],
    },
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(), // 웹팩이 실행될 때마다 dist 폴더를 자동으로 정리하도록 설정
        new HtmlWebpackPlugin({ // index.html 파일이 자동으로 생성되도록 html-webpack-plugin을 설정함 -> 우리가 원하는 형태 기반으로 index.html 파일이 생성될 수 있도록 template 옵션을 설정함
            template: './template/index.html',
        }),
        new webpack.DefinePlugin({ // 웹팩 모듈에 포함된 플러그인
            APP_VERSION: '"1.2.3"', // 또는 JSON.stringify('1.2.3')
            TEN: '10',
        }),
        new webpack.ProvidePlugin({
            React: 'react',
            $: 'jquery',
        }),
    ],
};