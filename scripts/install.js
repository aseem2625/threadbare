#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const paths = require('../config/paths');
const chalk = require('chalk');
const { spawn } = require('child_process')

console.log(chalk.green('=> Moving template into root directory'));

fs.copy(paths.template, paths.app);

console.log(chalk.green('=> Copying core dependencies into project'));

const package = JSON.parse(fs.readFileSync(path.join(paths.module, 'package.json'), 'utf-8'));

console.log(chalk.grey(Object.keys(package.devDependencies).join("\r\n")));

const currentPkg = JSON.parse(fs.readFileSync(path.join(paths.app, 'package.json'), 'utf-8'));

currentPkg.dependencies = Object.assign({}, currentPkg.dependencies, package.devDependencies);

console.log(chalk.green('=> Setting threadbare scripts to package'));

const scripts = {
    dev : "yarn threadbare dev",
    build : "yarn threadbare build"
}

currentPkg.scripts = Object.assign(currentPkg.scripts, scripts);

console.log(chalk.green('=> Saving package.json'));

fs.writeFileSync(path.join(paths.app, 'package.json'), JSON.stringify(currentPkg, null, 2));

console.log(chalk.green('=> Installing dependencies'));

const yarn = spawn('yarn', {stdio: 'inherit'});

yarn.on('close', (data) => {
    console.log(chalk.green('=> S\'all gravy baby!'));
});



