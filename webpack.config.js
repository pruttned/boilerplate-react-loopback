'use strict';

// https://jeremygayed.com/dynamic-vendor-bundling-in-webpack-528993e48aab
// https://survivejs.com/webpack/optimizing/separating-manifest/
// https://github.com/jouni-kantola/inline-chunk-manifest-html-webpack-plugin/issues/3
// https://github.com/jouni-kantola/webpack-output-by-build-type/blob/master/tmpl/index.ejs
// https://webpack.js.org/guides/development/
// https://webpack.js.org/guides/hot-module-replacement/
// https://survivejs.com/webpack/appendices/hmr/
// http://andrewhfarmer.com/webpack-hmr-tutorial/

const path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        path.join(__dirname, 'client/index.js'),
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'client-dist')
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
        path: path.join(__dirname, 'client-dist'),
        publicPath: '/',
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './client/index.ejs',
            inject: false
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: path.join(__dirname, 'client'),
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                            presets: [
                                ['es2015', { modules: false }],
                                'react',
                            ],
                        }
                    }
                ]
            }
        ]
    }
};