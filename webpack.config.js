'use strict';
const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require('webpack')


// 拼接路径
function resolve(dir) {
    return path.join(__dirname, dir)
}
// 资源路径
function assetsPath (dir) {
    return path.posix.join('static', dir)
}

module.exports = {
    entry: {
        app: ['./src/main.js', 'babel-polyfill']
    },
    output: {
        filename: '[name]-[hash].js',
        publicPath: '/'
    },
    resolve: {
        extensions: [".js", ".vue"],

        //配置别名映射
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'src': resolve('src'),
            'components': resolve('src/components'),
        }
    },
    devtool: 'cheap-module-eval-source-map',
    //启动一个express服务器,使我们可以在本地进行开发！！！
    devServer: {
        hot: true, // 热加载
        inline: true, //自动刷新
        open: true, //自动打开浏览器
        historyApiFallback: true, //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        host: 'localhost', //主机名
        port: '8080', //端口号
        proxy: {
            '/api': {
                target: 'http://localhost:3000/',
                changeOrigin: true,
                pathRewrite: {
                  '^/api': '/'
                }
            }
        },
        compress: true, //为你的代码进行压缩。加快开发流程和优化的作用
        overlay: { // 在浏览器上全屏显示编译的errors或warnings。
            errors: true,
            warnings: false
        },
        quiet: true // 终端输出的只有初始启动信息。 webpack 的警告和错误是不输出到终端的
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader', 
                include: resolve("src") 
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                include: resolve("src")
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'less-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: assetsPath('img/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        //开启HMR(热替换功能,替换更新部分,不重载页面！)
        new webpack.HotModuleReplacementPlugin(),

        //显示模块相对路径
        new webpack.NamedModulesPlugin(),

        //配置html入口信息
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        })
    ]
}