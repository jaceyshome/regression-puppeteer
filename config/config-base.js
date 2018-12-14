/**
 * Global configuration
 * Hosts and global settings
 */
//--- headless lunch config
const puppeteerHeadlessLunchConfig = {
    args: ['--disable-dev-shm-usage','--no-sandbox','--headless', '--disable-gpu'],
};
//--- watch mode config
const puppeteerWatchLunchConfig = {
    headless: false, slowMo: 50
};
//--- regression test server url
const regressionServerBaseUrl = "http://localhost:7071";
//--- output root
const outputRoot = 'output';
//--- log directory
const logDirectory = 'logs';
//--- cucumber json report file
const temporaryFolder = 'tmp';
//--- viewports
var viewports = {
    //Iphone 5
    "mobile-portrait": {
        "name": "mobile portrait",
        "width": 320,
        "height": 568
    },
    //Iphone 6 ?
    "mobile-landscape": {
        "name": "mobile landscape",
        "width": 480,
        "height": 768
    },
    //Ipad portrait
    "tablet-portrait": {
        "name": "tablet portrait",
        "width": 768,
        "height": 1024
    },
    //Ipad landscape
    "tablet-landscape": {
        "name": "tablet landscape",
        "width": 1024,
        "height": 768
    },
    //Desktop
    "desktop": {
        "name": "desktop",
        "width": 1200,
        "height": 900
    },
    //Large desktop
    "desktop-large" : {
        "name": "desktop-large",
        "width": 1440,
        "height": 900
    }
};
//default viewport
const defaultViewportSize = viewports["desktop"];
//--- regression config
const regressionOptions = {
    // root path
    ROOT_PATH: `${outputRoot}/regression`,
    // visual reference type for the reference result
    VISUAL_REFERENCE_TYPE: "visualReference",
    // visual test type for the test result
    VISUAL_TEST_TYPE: "visualTest",
    // visual reference folder
    FOLDER_SCREENSHOT: "screenshots",
    // visual differ folder
    FOLDER_DIFFER: "differs",
    // visual compare mismatch tolerance parameter
    MISMATCH_TOLERANCE: 0.1,
    // visual screenshot image type
    TYPE: 'jpeg',
    // visual screenshot image quality, set to 40 for the page visual screenshot as default
    QUALITY: 40,
    // cucumber report file name
    REPORT_FILE_NAME: 'cucumber-report.json',
    // cucumber report file path
    REPORT_FILE: `${temporaryFolder}/cucumber-report.json`,
    // current history file location
    HISTORY_FILE: `${temporaryFolder}/history.json`
}

module.exports = {
    logDirectory: logDirectory,
    temporaryFolder: temporaryFolder,
    puppeteerLunchConfig: puppeteerHeadlessLunchConfig,
    puppeteerHeadlessLunchConfig: puppeteerHeadlessLunchConfig,
    puppeteerWatchLunchConfig: puppeteerWatchLunchConfig,
    regressionServerBaseUrl: regressionServerBaseUrl,
    regressionOptions: regressionOptions,
    outputRoot: outputRoot,
    defaultViewportSize: defaultViewportSize,
    viewports: viewports,
};
