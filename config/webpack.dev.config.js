const webpack = require('webpack')
const dev = Object.assign({}, require('./webpack.base.config'));

dev.plugins.push(
    new webpack.DefinePlugin({
        'process.env.DEV': true,
        'process.env.BROWSER': true,
        'process.env.NODE_ENV': JSON.stringify('production')
    })
)

module.exports = dev;