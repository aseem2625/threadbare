#!/usr/bin/env node

const config = require('../config/webpack.prod.config.js');
const webpack = require('webpack');
const chalk = require('chalk');

const compiler = webpack(config);

compiler.run((err, stats) => {
  if(err) { console.log(err); process.exit(); }
  console.log(chalk.blue(`=> Webpack build complete!`));
  console.log(stats.toString({
        colors: true,
        hash: false,
        chunks: false,
        version: false,
        children: false,
        chunkModules: false
  }));
});