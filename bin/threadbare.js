#!/usr/bin/env node

const script = process.argv[2];
const path = require('path');

const paths = require('../config/paths');

switch(script) {
    case 'build':
    case 'install':
    case 'dev':

        const { spawn } = require('child_process');
        const process = spawn(require.resolve('../scripts/' + script), {stdio: [0, 1, 2, 'ipc']});

    break;
}