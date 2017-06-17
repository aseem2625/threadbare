#!/usr/bin/env node

const script = process.argv[2];
const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());

switch(script) {
    case 'build':
    case 'install':
    case 'dev':

        const { spawn } = require('child_process');

        console.log(appDirectory + 'Initialised threadbare');

    break;
}