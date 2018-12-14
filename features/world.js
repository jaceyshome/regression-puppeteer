const { setWorldConstructor } = require('cucumber');
const Cucumber = require('cucumber');
const puppeteer = require('puppeteer');
const scope = require('./support/scope');
const bunyan = require('bunyan');
const config = require('./../config/config');


const World = function(callback) {
    scope.driver = puppeteer;
    scope.context = {};
    scope.config = config;
    scope.logger = bunyan.createLogger(require('./../config/logger'));
};

setWorldConstructor(World);
