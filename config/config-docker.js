/**
 * Configuration for the docker container
 */
const puppeteerDockerLunchConfig = {
    args: [
        '--disable-dev-shm-usage',
        '--no-sandbox',
        '--headless',
        '--disable-gpu'
    ],
    executablePath: '/usr/bin/chromium-browser'
};

let config = {
    puppeteerLunchConfig: puppeteerDockerLunchConfig
}

//-- docker-compose regression server host
if(process.env.REGRESSION_SERVER_HOST){
    config.regressionServerBaseUrl = `http://${process.env.REGRESSION_SERVER_HOST}:7071`;
}

module.exports = config
