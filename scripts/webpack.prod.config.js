const { join } = require('path');
const webpack = require('webpack')
const Copy = require('copy-webpack-plugin')
const Clean = require('clean-webpack-plugin')
const ExtractCSS = require('extract-text-webpack-plugin')

const root = join(__dirname, '..')
const pubDir = join(root, 'public')
const srcDir = join(root, 'src')

const src = loc => join(srcDir, loc)

const baseConfig = {
    module : {
        loaders : [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                include: [
                    srcDir,
                    src('../node_modules/babel-plugin-inferno')
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
                include: [src('assets'), src('client/components')]
            },
            {
                test: /\.(ttf|otf|eot|woff2?)(\?.+)?$/,
                loader: 'file-loader',
                include: [src('assets'), src('client/components')]
            },
            {
                test: /\.(css|scss)(\?.+)?$/,
                loader: ExtractCSS.extract(['css-loader?sourceMap&minimize', 'sass-loader?sourceMap&minimize&includePaths[]=' + join(root, 'node_modules/kube/src')]),
                include: [srcDir]
            },
            {
                test: /\.md$/,
                loader: 'html-loader!markdown-loader',
                include: [src('docs'), src('client/components')]
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
                exclude: [srcDir]
            }
        ]
    },
    plugins: [
        new ExtractCSS({ filename: 'public/bundle.css', allChunks: true }),
        new webpack.DefinePlugin({
            'process.env.DEV': false,
            'process.env.BROWSER': true,
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                screw_ie8: true,
                warnings: false
            },
            output: {
                comments: false
            }
        })
    ]
}

baseConfig.module.loaders.forEach(loader => {
    if (loader.loader === 'babel-loader') {
        loader.query.plugins.push(
            "transform-es2015-arrow-functions",
            "transform-es2015-block-scoped-functions",
            "transform-es2015-block-scoping",
            "transform-es2015-classes",
            "transform-es2015-computed-properties",
            "transform-es2015-literals",
            "transform-es2015-parameters",
            "transform-es2015-shorthand-properties",
            "transform-es2015-spread",
            "transform-es2015-template-literals"
        )
    }
})

const appConfig = {
    entry : './src/index.js',
    output : {
        filename: 'public/client.js'
    }
}

module.exports = Object.assign(baseConfig, appConfig);
