const _ = require('lodash');

module.exports = class Strings {

    static kebabLowerCase(str) {
        return `${_.replace(str.toLowerCase(), /\s|&/g, "-")}`;
    }

    static carriageCase(str) {
        return _.replace(_.kebabCase(str), "-", "_");
    }

};
