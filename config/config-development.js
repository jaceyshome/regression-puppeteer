/**
 * DEV config
 */
//-- env default to development
const env = 'development';
//--- server
const server = 'dev';
//--- running browser instance
const instance = 'headless-chrome';
//--- regression test server url
const serverName = {
    //author instances
    author: {
        cms: "https://cms-dev.sydney.edu.au",
        username: "tester",
        password: "WysWyg$123"
    },
    //publish instances
    publish: {
        cws: "https://cws-dev.sydney.edu.au",
        intranet: "https://intranet-dev.sydney.edu.au"
    }

};

module.exports = {
    env: env,
    server: server,
    instance: instance,
    serverName: serverName,
};
