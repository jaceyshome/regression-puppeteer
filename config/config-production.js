/**
 * Production config
 */
const env = 'production';
//--- server
const server = 'prod';
//--- running browser instance
const instance = 'headless-chrome';
//---- author and publish server name
const serverName = {
    //author instances
    author: {
        cms: "https://cms.sydney.edu.au",
        username: "tester",
        password: "WysWyg$123"
    },
    //publish instances
    publish: {
        cws: "https://sydney.edu.au",
        intranet: "https://intranet.sydney.edu.au"
    }
};

module.exports = {
    env: env,
    server: server,
    instance: instance,
    serverName: serverName,
};
