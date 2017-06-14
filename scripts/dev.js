#!/usr/bin/env node

const config = require('./webpack.dev.config.js');
const webpack = require('webpack');
const nodemon = require('nodemon');
const chalk = require('chalk');

const compiler = webpack(config);

compiler.watch({}, (err, stats) => {
  if(err) { console.log(err); }
  if(stats.compilation) {
    const taken = (stats.endTime - stats.startTime);
    console.log(chalk.blue(`=> Built frontend files [${taken}ms]`))
  }
});

nodemon({
  script: 'src/server/index.js',
  ext: 'js json',
  ignore: ['client.js', 'scripts/*.js']
});

nodemon.on('start', function () {
  console.log(chalk.green('=> App has started and is ready'));
}).on('quit', function () {
  console.log(chalk.red('=> App has quit'));
  process.exit();
}).on('restart', function (files) {
  console.log(chalk.grey("App restarted due to changes in:"));
  files.forEach((file) => {
    console.log(chalk.grey(file));
  })
}).on('stdout', function(data) {
  console.log(chalk.bgBlue('=> ' + data));
});




