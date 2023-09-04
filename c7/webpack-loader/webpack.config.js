const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/, // js 확장자를 갖는 모듈은 babel-loader가 처리하도록 설정
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/, // css 확장자를 갖는 모듈은 css-loader가 처리하도록 설정
                use: ['style-loader', 'css-loader'],
            },
            // {
            //     test: /\.(png|jpg|gif)$/, // PNG 확장자를 갖는 모듈은 file-loader가 처리하도록 설정
            //     use: 'file-loader',
            // },
            {
                test: /\.(png|jpg|gif)$/, // PNG 확장자를 갖는 모듈은 file-loader가 처리하도록 설정
                use: [
                    {
                        loader: 'url-loader',
                        options: { limit: 8192, },
                    },
                ],
            },
            {
                test: /\.txt$/, // txt 확장자를 갖는 모듈은 raw-loader가 처리하도록 설정
                use: 'raw-loader',
            },
        ],
    },
    mode: 'production',
};