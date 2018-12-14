const fs = require('fs-extra');
const resemble = require('node-resemble-js');
const {ScreenShot} = require('./../visual-regression-helpers');
const visualRegressionConstants = require('./../visual-regression-constants');
const {FilePath} = require('./../../helpers');
const StoreService = require('./store-service');

class CompareService {

    constructor(options = {}) {
        this.misMatchTolerance = visualRegressionConstants.MISMATCH_TOLERANCE;
    }

    async resembleScreenShot(screenShot) {
        let reference = ScreenShot.getReferenceById(
            StoreService.getCurrentHistory(),
            screenShot.visualReferenceId
        );

        let screenShotPath = FilePath.getAbsolutePath(screenShot.visualScreenshotPath);
        let referencePath = FilePath.getAbsolutePath(reference.visualScreenshotPath);
        let compareData = await this.compareImages(referencePath, screenShotPath);

        const {isSameDimensions} = compareData;
        const misMatchPercentage = Number(compareData.misMatchPercentage);

        let result = screenShot;
        let pass = true;

        if (misMatchPercentage > this.misMatchTolerance) {
            //Set pass to fail
            pass = false;

            //Build differ data
            result = ScreenShot.buildDifferData(StoreService.getCurrentHistory(), screenShot);

            //Save differ file to the file system
            await this.writeDiff(result, compareData.getDiffImage().pack());
        }

        //Post result to the server
        Object.assign(result, {isSameDimensions, misMatchPercentage}, screenShot);
        result = await StoreService.createVisualResult(result);

        //Save to the history test list
        StoreService.getCurrentHistory().visualTests.push(result);

        //Return results
        return result;
    }

    /**
     * Compares two images with resemble
     * @param  {Buffer|string} referencePath path to reference file or buffer
     * @param  {Buffer|string} screenShotPath path to file or buffer to compare with reference
     * @return {{misMatchPercentage: Number, isSameDimensions:Boolean, getImageDataUrl: function}}
     */
    async compareImages(referencePath, screenShotPath, ignore = '') {
        return await new Promise(function(resolve) {
            const image = resemble(referencePath).compareTo(screenShotPath);

            switch (ignore) {
                case 'colors':
                    image.ignoreColors();
                    break;
                case 'antialiasing':
                    image.ignoreAntialiasing();
                    break;
            }

            image.onComplete((data) => {
                resolve(data);
            });
        });
    }

    /**
     * Writes provided diff by resemble as png
     * @param  {Stream} png node-png file Stream.
     * @return {Promise}
     */
    async writeDiff(differ, pngStream) {
        await new Promise( function(resolve, reject) {
            const chunks = [];
            pngStream.on('data', function (chunk) {
                chunks.push(chunk);
            });
            pngStream.on('end', () => {
                const buffer = Buffer.concat(chunks);
                Promise.resolve()
                    .then(() => fs.outputFile(FilePath.getAbsolutePath(differ.visualDifferPath),
                        buffer.toString('base64'), 'base64'))
                    .then(() => resolve())
                    .catch(reject);
            });
            pngStream.on('error', (err) => reject(err));
        });
    }

}

module.exports = new CompareService();
