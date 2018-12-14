module.exports = class Keyboard {

    /**
     * FIXME: the "keys" command will be deprecated soon. Please use a different command in order to avoid failures in your test after updating WebdriverIO.
     *
     * @see https://github.com/Codeception/CodeceptJS/issues/525
     *
     * @param {!Element} element
     * @param {?number} tabCount - tab time count default to 60
     */
    static tabToElement(element, tabCount = 60) {

        expect(element.value).not.toBeNull();
        expect(tabCount > 0).toBe(true);

        if(tabCount <= 0) {
            console.error("Couldn't tab to the element", element);
            return null;
        }
        browser.keys("Tab");
        if(element.value.ELEMENT === browser.elementActive().value.ELEMENT){
            return element;
        } else {
            Keyboard.tabToElement(element, (tabCount - 1));
        }
    }

    /**
     *
     * @param {String} keyName - key name
     */
    static pressKey(keyName) {
        browser.keys(keyName);
    }

};
