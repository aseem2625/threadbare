const webpack = require('webpack')
const prod = Object.assign({}, require('./webpack.base.config'));

prod.plugins.push(
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
);

prod.module.loaders.forEach(loader => {
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

module.exports = prod;