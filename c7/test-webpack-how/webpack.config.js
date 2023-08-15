const path = require('path');
module.exports = {
    entry: './src/code.js', // 웹팩으로 번들링(bundling)할 파일을 지정
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'code.bundle.js',
    },
    module: {
        rules: [{ test: /\.js$/, use: 'babel-loader' }],
    },
    optimization: { minimizer: [] },
};