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
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    AssetsPlugin = require('assets-webpack-plugin'),
    WebpackMd5Hash = require('webpack-md5-hash'),
    InlineManifestPlugin = require('inline-manifest-webpack-plugin'),
    InlineChunkManifestHtmlWebpackPlugin = require('inline-chunk-manifest-html-webpack-plugin');

module.exports = {
    entry: [
        path.join(__dirname, 'client/index.js'),
    ],
    output: {
        filename: '[name]-[chunkhash].js',
        chunkFilename: '[name]-[chunkhash].js',
        path: path.join(__dirname, 'client-dist'),
        publicPath: '/',
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: ({ resource }) => /node_modules/.test(resource),
        }),
        // https://jeremygayed.com/dynamic-vendor-bundling-in-webpack-528993e48aab
        // Generate a 'manifest' chunk to be inlined in the HTML template
        new webpack.optimize.CommonsChunkPlugin('manifest'),
        // Need this plugin for deterministic hashing
        // until this issue is resolved: https://github.com/webpack/webpack/issues/1315
        // for more info: https://webpack.js.org/how-to/cache/
        new WebpackMd5Hash(),
        // Creates a 'webpack-assets.json' file with all of the
        // generated chunk names so you can reference them
        new AssetsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './client/index.ejs',
            inject: false
        }),
        new InlineChunkManifestHtmlWebpackPlugin(),
        new InlineManifestPlugin(),
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