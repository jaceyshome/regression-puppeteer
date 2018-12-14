const fs = require('fs');
const {setDefaultTimeout} = require('cucumber');
const { After, Before, BeforeAll, AfterAll } = require('cucumber');
const scope = require('./scope');
const config = require('./../../config/config');
const VisualRegression = require('./visual-regression/visual-regression');
const DataService = require('./services/data-service');
const StoreService = require('./visual-regression/services/store-service');
const {Http, FilePath} = require('./helpers');

setDefaultTimeout(15 * 1000);

/**
 * Reference: https://github.com/cucumber/cucumber-js/blob/master/docs/support_files/hooks.md
 */
BeforeAll({ timeout: 15 * 1000}, function(callback) {
    DataService.set();
    VisualRegression.getStoreService().createCurrentHistory().then(function() {
        callback();
    });
});


Before(async function() {
    scope.browser = await scope.driver.launch(config.puppeteerLunchConfig);
    scope.page = await scope.browser.newPage();
});

After(async function() {
    // Teardown browser
    if (scope.browser) {
        await scope.browser.close();
    }
    // Cleanup DB
});

AfterAll(async function() {

});
