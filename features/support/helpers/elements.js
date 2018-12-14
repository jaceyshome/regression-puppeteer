module.exports = class Elements {

    static getScrollTop(selector) {
        browser.timeouts('script', 3000);
        return browser.execute(function(selector) {
            return document.querySelectorAll(selector)[0].scrollTop;
        }, selector).value;
    }

};
