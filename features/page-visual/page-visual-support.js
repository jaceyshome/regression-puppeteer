const _ = require('lodash');
const scope = require('./../support/scope');
const VisualRegression = require('./../support/visual-regression/visual-regression');


module.exports = class PageVisualSupport {

    static async takePageScreenshot({definition, pageName, siteName, pageUrl=scope.page.url()}) {

        if(_.isEmpty(pageUrl)){
            throw new Error("Page url shouldn't be empty.");
        }
        let context = {
            name: definition,
            url: pageUrl,
        };
        if(siteName) {
            context.siteName = siteName;
        }
        if(pageName) {
            context.pageName = pageName;
        }

        return await VisualRegression.runPageTest(context);
    }

    static async takeElementScreenshot({definition, pageName, siteName, pageUrl=scope.page.url(), selector, quality}) {
        
        if(_.isEmpty(pageUrl)){
            throw new Error("takeComponentScreenshot:  Page url shouldn't be empty.");
        }

        if(_.isEmpty(selector)){
            throw new Error("takeComponentScreenshot: selector shouldn't be empty.");
        }

        let context = {
            name: definition,
            url: pageUrl,
            selector: selector
        };

        siteName && (context.siteName = siteName);
        pageName && (context.pageName = pageName);
        quality && (context.quality = quality);

        return await VisualRegression.runElementTest(context);
    }

};

