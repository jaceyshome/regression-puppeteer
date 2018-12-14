const fs = require('fs-extra');
const _ = require('lodash');
const CompareService = require('./services/compare-service');
const StoreService = require('./services/store-service');
const scope = require('./../scope');
const ScreenShot = require('./helpers/screenshot');
const visualRegressionConstants = require('./visual-regression-constants');

class VisualRegression {

    constructor() {

    }

    getStoreService() {
        return StoreService;
    }

    getCompareService() {
        return CompareService;
    }

    /**
     * The page screenshot
     * @param context
     * @returns {Promise<*>} return true or false
     */
    async runPageTest(context) {
        let screenShot = await this._takePageScreenShot(context);
        //Handle visual result
        let result = await this._handleScreenshotResult(screenShot);

        return result;
    }

    /**
     * Take element screenshot
     * @param {*} context 
     * @returns {Promise<*>} return true or false
     */
    async runElementTest(context) {
        let screenShot = await this._takeElementScreenshot(context);
        //Handle visual result
        let result = await this._handleScreenshotResult(screenShot);

        return result;
    }

    async _takePageScreenShot(context, type=visualRegressionConstants.TYPE) {
        let history = StoreService.getCurrentHistory();
        let data = await ScreenShot.buildScreenshotData(history, context);

        //Create the screenshot
        let image = await scope.page.screenshot({
            path: data.visualScreenshotPath,
            type: type,
            quality: visualRegressionConstants.QUALITY,
            fullPage: true
        });

        return {
            data: data,
            history: history,
            image: image
        }
    }

    async _takeElementScreenshot(context, type=visualRegressionConstants.TYPE) {
        let history = StoreService.getCurrentHistory();
        let data = await ScreenShot.buildScreenshotData(history, context);
        
        let elementHandle = await scope.page.$(context.selector);
        //Create the screenshot
        if(!elementHandle){
            let message = `Invalid style-guide component selector: ${context.selector}`;
            scope.logger.error(message);
            throw new Error(message);
        }

        let image = await elementHandle.screenshot({
            path: data.visualScreenshotPath,
            type: type,
            quality: context.quality || visualRegressionConstants.QUALITY,
        });

        return {
            data: data,
            history: history,
            image: image
        }
    }

    async _handleScreenshotResult(screenShot) {

        //If no screenshot image, return
        if(Object.is(screenShot.image, undefined)) {
            return false;
        }

        //Handle visual reference
        if(Object.is(screenShot.data.visualReferenceId, undefined)) {
            let reference = StoreService.createVisualReference(screenShot.data);
            StoreService.getCurrentHistory().visualReferences.push(reference);
            return true;
        }

        //Handle visual result
        let result = await CompareService.resembleScreenShot(screenShot.data);

        return result.pass;
    }
}

module.exports = new VisualRegression();
