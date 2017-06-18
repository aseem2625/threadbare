const { join } = require('path');
const webpack = require('webpack')
const Copy = require('copy-webpack-plugin')
const Clean = require('clean-webpack-plugin')
const ExtractCSS = require('extract-text-webpack-plugin')

const paths = require('../config/paths')
const root = join(__dirname, '..')

const srcDir = join(root, 'src')
const coreSrc = loc => join(srcDir, loc)
const appSrc = loc => join(paths.app, loc)

const baseConfig = {
    module : {
        loaders : [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                include: [
                    paths.app,
                    coreSrc('../node_modules/babel-plugin-inferno')
                ],
                query: {
                    babelrc: false,
                    cacheDirectory: false,
                    presets: [],
                    plugins: [
                        "add-module-exports",
                        "transform-es2015-modules-commonjs",
                        "transform-es2015-destructuring",
                        "transform-object-rest-spread",
                        "transform-decorators-legacy",
                        "transform-class-properties",
                        "inferno",
                        ["fast-async"]
                    ]
                }
            },
            {
                test: /\.(jpg|png|svg)(\?.+)?$/,
                loader: 'url-loader?limit=100000',
                include: [appSrc('assets'), appSrc('components')]
            },
            {
                test: /\.(ttf|otf|eot|woff2?)(\?.+)?$/,
                loader: 'file-loader',
                include: [appSrc('assets'), appSrc('components')]
            },
            {
                test: /\.(css|scss)(\?.+)?$/,
                loader: ExtractCSS.extract(['css-loader?sourceMap&minimize', 'sass-loader?sourceMap&minimize&includePaths[]=' + coreSrc('../node_modules/kube/src')]),
                include: [paths.app]
            },
            {
                test: /\.md$/,
                loader: 'html-loader!markdown-loader',
                include: [appSrc('docs'), appSrc('components')]
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    plugins: [
        new ExtractCSS({ filename: 'public/bundle.css', allChunks: true })
    ]
}

const appConfig = {
    entry : './src/index.js',
    output : {
        filename: 'public/client.js'
    }
}

module.exports = Object.assign(baseConfig, appConfig);
