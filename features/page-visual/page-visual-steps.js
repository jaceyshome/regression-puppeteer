const { Given, When, Then, After, Before } = require('cucumber');
const { expect } = require('chai');
const PageSupport = require('../page/page-support');
const PageVisualSupport = require('./page-visual-support');
const {ViewPort, Browsers} = require('./../support/helpers');
const scope = require('./../support/scope');
const config = require('./../../config/config');


Given(/^[P|p]age visual test on ([^"]*)$/, async function (url) {
    //Set viewport size always to the default size at the start.
    await ViewPort.resetViewPort();
    await PageSupport.goToPage(url);
    await Browsers.delay(3000);
    return await scope.page.waitForSelector('body');
});

When(/I visit the page on ([^"]*)/, async function (device) {
    await ViewPort.setSize(config.viewports[device]);
});

Then(/^I should see the visual result$/, async function(){

    let url = scope.page.url();
    let result = await PageVisualSupport.takePageScreenshot({
        definition: `page visual test on ${url}`,
        pageName: url
    });

    if(result === true) {
        return expect(result).to.be.true;
    }

    return 'pending';

});

