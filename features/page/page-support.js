const _ = require('lodash');
const scope = require('./../support/scope');
const config = require('./../../config/config');

module.exports = class PageSupport {

    /**
     * Go to a CWS page with given page url
     * @param {String} url - page url without host e.g. /study/admission.html
     */
    static async goToPage(url) {
        await scope.page.goto(url);
        return url;
    }

}

