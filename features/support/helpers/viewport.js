const _ = require('lodash');
const globalConstants = require('./../constants/global-constants');
const DataService = require('./../services/data-service');
const { expect } = require("chai");
const scope = require('./../scope');
const config = require('./../../../config/config');

module.exports = class ViewPort {

    static async resetViewPort() {

        if(!DataService.get(globalConstants.INITIAL_VIEWPORT_SIZE_WIDTH)){
            DataService.set(globalConstants.INITIAL_VIEWPORT_SIZE_WIDTH, ViewPort._getViewportDefaultWidth());
        }
        if(!DataService.get(globalConstants.INITIAL_VIEWPORT_SIZE_HEIGHT)){
            DataService.set(globalConstants.INITIAL_VIEWPORT_SIZE_HEIGHT, ViewPort._getViewportDefaultHeight());
        }

        if( _.toNumber(scope.page.viewport().width) !== _.toNumber(DataService.get(globalConstants.INITIAL_VIEWPORT_SIZE_WIDTH)) ||
            _.toNumber(scope.page.viewport().height) !== _.toNumber(DataService.get(globalConstants.INITIAL_VIEWPORT_SIZE_HEIGHT))
        ){
            await ViewPort.setSize();
        }
    }


    /**
     * Set window size, default is to maximize the window size
     * @param {string|number?} options.width - view port width, default to initial viewport width
     * @param {string|number?} options.height - view port height, default to initial viewport height
     */
    static async setSize(options = {}) {
        await scope.page.setViewport({
            width: options.width || ViewPort.getInitialSize().width,
            height: options.height || ViewPort.getInitialSize().height
        });
    }


    static getInitialSize() {
        expect(DataService.get(globalConstants.INITIAL_VIEWPORT_SIZE_WIDTH)).to.not.null;
        expect(DataService.get(globalConstants.INITIAL_VIEWPORT_SIZE_HEIGHT)).to.not.null;

        return {
            width: _.toNumber(DataService.get(globalConstants.INITIAL_VIEWPORT_SIZE_WIDTH)),
            height: _.toNumber(DataService.get(globalConstants.INITIAL_VIEWPORT_SIZE_WIDTH))
        }
    }

    static _getViewportDefaultWidth() {
        return (config.defaultViewportSize.width !== "auto") ? config.defaultViewportSize.width : browser.getViewportSize().width;
    }


    static _getViewportDefaultHeight() {
        return (config.defaultViewportSize.height !== "auto") ? config.defaultViewportSize.height : browser.getViewportSize().height;
    }


};
