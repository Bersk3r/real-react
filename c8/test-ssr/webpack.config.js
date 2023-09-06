const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");  // webpack-node-externals 모듈은 node_modules 폴더 밑에 있는 모듈을 번들 파일에서 제외시켜 주는 역할을 함


function getConfig(isServer) { // isServer 매개변수에 따라 웹팩 설정을 반환해주는 함수
    return {
        entry: isServer // 서버 / 클라이언트에 대한 엔트리 설정
            ? { server: './src/server.js'}
            : { main: './src/index.js'},
        output: { // 클라이언트는 브라우저의 캐싱 효과 때문에 chunkhash를 사용하지만 서버는 필요 없음
            filename: isServer ? '[name].bundle.js' : '[name].[chunkhash].js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/dist/',
        },
        target: isServer ? 'node' : 'web', // target 속성에 node를 입력해서 웹팩에 서버 코드를 번들링하는 것이라 알려줄 수 있음
        externals: isServer ? [nodeExternals()] : [], // 서버 코드를 번들링할 때는 node_modules 폴더 밑에 있는 모듈을 버들 파일에 포함시키지 않도록 함
        node: { // 이 설정을 하지 않으면 코드에서 __dirname을 사용할 경우 절대 경로인 슬래시(/)가 입력됨 -> false를 입력할 경우 일반적인 노드의 __dirname으로 동작됨 => 이 프로젝트에서는 server.js 파일에 index.html 파일을 읽을 때 __dirname을 사용하므로 이 설정이 필요함
            __dirname: false,
        },
        optimization: isServer // 서버 코드는 압축할 필요가 없음
            ? {
                splitchunks: false,
                minimize: false,
            }
            : undefined,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            configFile: path.resolve(
                                __dirname,
                                isServer ? '.babelrc.server.js' : '.babelrc.client.js', // 적절한 바벨 설정 파일을 입력함
                            ),
                        },
                    },
                },
                {
                  test: /\.(png|jpg|gif)$/,
                  use: {
                      loader: 'file-loader',
                      options: {
                          emitFile: isServer ? false: true, // file-loader 실행 시 한 쪽만 파일을 복사해도 충분함
                      }
                  }
                },
            ],
        },
        plugins: isServer // 두 플러그인은 코드 번들링 시에만 실행하면 됨
            ? []
            : [
                new CleanWebpackPlugin(),
                new HtmlWebpackPlugin({
                    template: './template/index.html',
                }),
            ],
        mode: 'production',
    };
}

// module.exports = {
//     entry: './src/index.js',
//     output: {
//         filename: '[name].[chunkhash].js',
//         path: path.resolve(__dirname, 'dist'),
//         publicPath: '/dist/',
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 use: {
//                     loader: 'babel-loader', // 모든 자바스크립트 파일을 babel-loader로 처리함
//                     options: {
//                         configFile: path.resolve(__dirname, '.babelrc.client.js'),
//                     },
//                 },
//             },
//         ],
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             template: './template/index.html', // template/index.html 기반으로 HTML 파일을 생성함
//         }),
//     ],
//     mode: 'production',
// };

module.exports = [getConfig(false), getConfig(true)]; // 웹팩 설정 파일에서 배열을 내보내면 배열의 각 아이템 갯수만큼 웹팩이 실행됨 -> 이 경우, 클라이언트 코드가 먼저 번들링되고, 서버 코드가 그 다음에 번들링됨