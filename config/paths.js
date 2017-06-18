const fs = require('fs');
const path = require('path');

const appPath = fs.realpathSync(process.cwd())
const coreModule = path.join(appPath, 'node_modules', 'threadbare')

module.exports = {
    app : appPath,
    module : coreModule,
    template : path.join(coreModule, 'template/')
}