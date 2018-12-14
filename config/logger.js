'use strict';

const path = require('path');
const config = require('./config');
const directory = config.logDirectory;
const filename = `${config.server}.${config.instance}.json.log`;
const logger = {
    name: `${config.server}.${config.instance}`,
    streams: []
};


// Add streams as depending on the environment
if (process.env.NODE_ENV !== 'local-development') {
    logger.streams.push({
        type: 'rotating-file',
        path: path.join(directory, filename),
        period: '1d',
        count: 7,
        level: process.env.LOG_LEVEL || 'info'
    });
    logger.streams.push({
        type: 'stream',
        stream: process.stderr,
        level: 'warn'
    });
} else {
    logger.streams.push({
        type: 'stream',
        stream: process.stdout,
        level: 'debug'
    });
}

module.exports = logger;
