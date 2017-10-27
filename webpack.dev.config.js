/**
 * Created by Administrator on 2017/9/18.
 */
/**
 * Created by AllenFeng on 2017/9/11.
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const timestamp = +new Date();

module.exports = {
    entry: {
        index: ['./src/index', './src/common/css/index',]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: `js/[name].[chunkhash:8].js`,
        chunkFilename: `js/[id].[chunkhash:8].js`,
        sourceMapFilename: '[file].map'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ],
                loader: ['babel-loader', 'eslint-loader']
            },
            {
                test: /.(css|less)$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ],
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        minimize: true
                    }
                }, 'postcss-loader', 'less-loader',]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'img/[name]/[hash:7].[ext]'
                    }
                }]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'fonts/[name]/[hash:7].[ext]'
                    }
                }]
            }
        ]
    },
    resolve: {
        extensions: [".js", ".json", ".jsx", ".css", ".less"]
    },
    devtool: "source-map",
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        }),
        new webpack.ProvidePlugin({
            "_": "lodash"
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './template/index.html',
            inject: true
        }),
    ]
}