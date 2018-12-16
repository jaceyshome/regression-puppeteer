/**
 * Loading configuration
 * Before running cucumber features and scenarios,this file loads different configurations and returns the global configuration object.
 */

//--- default config
let config = require('./config-base.js');

//--- environment config
let configEnv = require('./config-local-development.js');
if(process.env.NODE_ENV) {
    configEnv = require(`./config-${process.env.NODE_ENV}.js`);
}
Object.assign(config, configEnv);

//--- watch test mode
if(process.env.NODE_TEST_MODE === 'watch'){
    Object.assign(config, require('./config-watch-mode.js'));
}

//--- docker config
if(process.env.IS_DOCKER_IMAGE) {
    Object.assign(config, require('./config-docker.js'));
}

//--- watch test mode
if(process.env.NODE_TEST_MODE === 'watch'){
    Object.assign(config, require('./config-watch-mode.js'));
}

console.log("test env: ", config.env);
console.log("test server: ", config.server);
console.log("regression server base url ", config.regressionServerBaseUrl);

module.exports = config;
