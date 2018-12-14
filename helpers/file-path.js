const path = require('path');
const _ = require('lodash');

module.exports = class FilePath {

    static getAbsolutePath(filePath){
        return path.join(process.cwd(), `${filePath}`)
    }

    static getPathDirectories(path) {
        let folders = path.split('/');
        let temps = [];
        let directories = [];
        folders.forEach(function(folder){
            temps.push(folder);
            directories.push(temps.join('/'));
        });

        return directories;
    }
};
