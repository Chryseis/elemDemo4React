/**
 * Created by AllenFeng on 2017/9/11.
 */
const path = require('path');
const webpack = require('webpack');
const appData=require('./data.json')

module.exports = {
    entry: {
        index: ['./src/index','./src/common/css/index',]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/assets/',
        filename: '[name].js',
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
                loader: ['babel-loader','eslint-loader']
            },
            {
                test: /.(css|less)$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ],
                use: ['style-loader', 'css-loader','postcss-loader', 'less-loader',]
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
    devServer: {
        host:'192.168.2.199',
        port: 1008,
        contentBase: './',
        compress: true,
        historyApiFallback: true,
        setup(app){
            app.get('/api/seller',(req,res)=>{
                res.json({
                    errno:0,
                    data:appData.seller
                })
            }).get('/api/goods',(req,res)=>{
                res.json({
                    errno:0,
                    data:appData.goods
                }).get('/api/ratings',(req,res)=>{
                    res.json({
                        errno:0,
                        data:appData.ratings
                    })
                })
            })
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}