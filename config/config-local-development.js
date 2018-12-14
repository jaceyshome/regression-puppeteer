/**
 * Local dev config
 */
const env = 'local-development';
//--- watch mode config
const puppeteerWatchLunchConfig = {
    headless: false, slowMo: 50
};
//--- server
const server = 'localdev';
//--- running browser instance
const instance = 'chrome';
//--- server
const serverName = {
    //author instances
    author: {
        cms: "http://cms-localdev.sydney.edu.au",
        username: "admin",
        password: "admin"
    },
    //publish instances
    publish: {
        cws: "http://cws-localdev.sydney.edu.au",
        intranet: "https://intranet-localdev.sydney.edu.au"
    }

};

module.exports = {
    env: env,
    server: server,
    instance: instance,
    serverName: serverName,
    puppeteerLunchConfig: puppeteerWatchLunchConfig
};
