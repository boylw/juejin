const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackDevServerOutput = require('webpack-dev-server-output');
const polyfill = require('babel-polyfill');
const VueLoaderPlugin = require('vue-loader/lib/plugin');


module.exports = {
    mode: 'development',
    entry: {
        index: ['babel-polyfill','./static/app.js'],
        detail: './static/detail.js'
    },
    output: {
        path: path.join(__dirname, 'static/dist'),
        // filename: '[name].[hash:8].js'
        filename: '[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './static/index.html', // 指定产出的html魔板
            filename: 'index.html', // 产出的文件名
            hash: true, // 避免缓存
            title: 'index',
            chunks: ['index'], // 在产出的HTML文件里引入那些代码库
            minify: {
                removeAttributeQuotes: true
            }
        }),
        new HtmlWebpackPlugin({
            template: './static/detail.html', // 指定产出的html魔板
            filename: 'detail.html', // 产出的文件名
            hash: true, // 避免缓存
            title: 'detail',
            chunks: ['detail'], // 在产出的HTML文件里引入那些代码库
            minify: {
                removeAttributeQuotes: true
            }
        }),
        // new CleanWebpackPlugin(
        //     [path.join(__dirname, './static/dist')]
        // ),
        new webpack.HotModuleReplacementPlugin({}),
        // jquery
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "windows.jQuery": "jquery"
        }),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader']
            },
            {
                test: /\.(png)|(jpg)|(gif)|(woff)|(svg)|(eot)|(ttf)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 50000, //小于50K的 都打包
                        // name:"images/[hash:8].[name].[ext]",
                        // publicPath:"img/",	//替换CSS引用的图片路径 可以替换成爱拍云上的路径
                        outputPath:"./static/dist/images"		//生成之后存放的路径
                    }
                }]
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.less$/,
                use: ['vue-style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.esm'
        }
    },
    externals: {
        'AMap': 'AMap'
    }
}