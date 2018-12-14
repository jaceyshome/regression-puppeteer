const _ = require('lodash');

const visualRegressionConstants = require('./../visual-regression-constants');
const {Strings} = require('./../../helpers');
const scope = require('./../../scope');

module.exports = class ScreenShot {

    static getReferenceByScreenshot(history, visualScreenshot){
        return _.find(history.visualReferences, (reference)=> {
            return Object.is(reference.visualScreenshot, visualScreenshot);
        });
    }

    static getReferenceById(history, referenceId) {
        return _.find(history.visualReferences, (reference)=> {
            return Object.is(reference._id, referenceId);
        });
    }

    static getHistoryDirectory(history) {
        return `${visualRegressionConstants.ROOT_PATH}/${history._id}`;
    }

    static getScreenshotDirectory(history) {
        return `${history.server}/${history.instance}/${visualRegressionConstants.FOLDER_SCREENSHOT}`;
    }

    static getDifferDirectory(history) {
        return `${history.server}/${history.instance}/${visualRegressionConstants.FOLDER_DIFFER}`;
    }

    static getScreenshotName(history, context) {
        return `${this.getScreenshotDirectory(history)}/${ScreenShot.getImageName(context)}`;
    }

    static getDifferName(history, context) {
        return `${this.getDifferDirectory(history)}/${ScreenShot.getImageName(context)}`;
    }

    static getImageName(context, type=visualRegressionConstants.TYPE) {
        let name = Strings.carriageCase(context.name) || context.title;
        let viewport = scope.page.viewport();
        return `${name}_w${viewport.width}.${type}`;
    }

    static async buildScreenshotData(history, context) {
        let viewport = scope.page.viewport();
        let data = {
            historyId:  history._id,
            browser:    await scope.browser.userAgent(),
            url:        context.url || scope.page.url(),
            name:       context.name || context.title,
            viewport:   `${viewport.width}x${viewport.height}`,
            visualScreenshot:       ScreenShot.getScreenshotName(history, context),
            visualScreenshotPath:   `${ScreenShot.getHistoryDirectory(history)}/${ScreenShot.getScreenshotName(history, context)}`,
        };

        let reference = ScreenShot.getReferenceByScreenshot(history, data.visualScreenshot);

        if(reference) {
            data.visualReferenceId = reference._id;
        }

        return data;
    }

    static buildDifferData(history, context) {
        let data = ScreenShot.buildScreenshotData(history, context);
        data.visualDiffer =  ScreenShot.getDifferName(history, context);
        data.visualDifferPath = `${ScreenShot.getHistoryDirectory(history)}/${ScreenShot.getDifferName(history, context)}`;

        return data;
    }

};
