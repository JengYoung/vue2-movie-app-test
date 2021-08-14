// import * as path from 'path';
const path = require('path'); // node.js에서 제공하는 path 가져옴.
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const DotEnv = require('dotenv-webpack');

module.exports = {
    resolve: {
        // 이 확장자들은 경로 작성에 있어서 생략 가능
        extensions: ['.js', '.vue'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
    },
    // 진입점은 ./src/main.js
    entry: './src/main.js',
    output: {
        // __dirname: webpack.config.js가 있는 현재경로(node.js 전역변수)
        // path: path.resolve(__dirname, 'dist'),
        // filename: 'main.js',
        clean: true
    },// clean: HMR(Hot Module Replacement)가 제대로 적용되기 위해 설정.
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.s?css$/,
                use: [
                    'vue-style-loader',
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            additionalData: '@import "@/scss/main";'
                        }
                    } // 옵션을 넣어줌. 세미콜론 필수!!(css는 세미콜론으로 반드시 구분)
                ] // 순서가 중요.
            },
            {
                test: /\.js$/, // 자바스크립트 확장자 파일을 만나면
                use: 'babel-loader' // babel-loader 패키지의 도움을 받아서 결과를 내라! (webpack은 순수 번들만 수행, 나머지는 패키지의 도움을 받아야 함. javascript의 경우 babel-loader 도움을 받음.)
            },
            {
                test: /\.(png|jpe?g|gif|webp)$/, // jpe?g jp다음 e가 올 수도 있고 없을 수도 있음.
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new HtmlPlugin({
            template: './index.html'
        }),
        // 정적 파일들(이미지, Pavicon.ico, ...)
        new CopyPlugin({
            patterns: [
                { from: 'static' }
            ]
        }),
        new VueLoaderPlugin(),
        new DotEnv()
    ],
    devServer: {
        port: 8079
    }
}