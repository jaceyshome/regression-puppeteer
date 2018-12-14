const {ScreenShot} = require('./../visual-regression-helpers');
const {Http, FilePath} = require('./../../helpers');
const config = require('./../../../../config/config');
const fs = require('fs-extra');
const visualRegressionConstants = require('./../visual-regression-constants');

class StoreService {

    constructor(options = {}) {
        this._options = Object.assign({}, options);
        this._history = null;
    }

    getCurrentHistory() {
        if(this._history) {
            return this._history;
        }
        return this._history;
    }

    loadCurrentHistoryFromFile(file = visualRegressionConstants.HISTORY_FILE) {
        let path = FilePath.getAbsolutePath(file);
        let history = require(path);
        this._history = history;
        return history;
    }

    async createCurrentHistory() {
        let result = await Http.post({
            url: `${config.regressionServerBaseUrl}/history`,
            data: {
                instance: config.instance,
                server: config.server
            }
        });
        this._history = result.data;
        this.createHistoryDirectory(this._history);
        return result.data;
    }

    async createVisualReference(data) {
        let result = await Http.post({
            url: `${config.regressionServerBaseUrl}/visual`,
            data: data
        });
        return result.data;
    }

    async createVisualResult(data) {
        let result = await Http.post({
            url: `${config.regressionServerBaseUrl}/visual`,
            data: data
        });
        return result.data;
    }

    async saveReport(data) {
        if(!data.historyId) {
            data.historyId = this._history._id;
        }
        let result = await Http.post({
            url: `${config.regressionServerBaseUrl}/report`,
            data: data
        });
        return result.data;
    }

    createHistoryDirectory(history) {

        let paths = FilePath.getPathDirectories(`${ScreenShot.getHistoryDirectory(history)}/${ScreenShot.getScreenshotDirectory(history)}`);
        paths.forEach(function(path) {
            !fs.existsSync(path) && fs.mkdirSync(path);
        });

        paths = FilePath.getPathDirectories(`${ScreenShot.getHistoryDirectory(history)}/${ScreenShot.getDifferDirectory(history)}`);
        paths.forEach(function(path) {
            !fs.existsSync(path) && fs.mkdirSync(path);
        });

    }

}

module.exports = new StoreService();
