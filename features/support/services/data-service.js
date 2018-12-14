const _ = require('lodash');
const globalConstants = require('./../constants/global-constants');

class DataService {

    constructor() {
        this._data = {};
    }

    get(key) {
        if(!this._data[globalConstants.GLOBAL_NAMESPACE]) {
            this._data[globalConstants.GLOBAL_NAMESPACE] = {};
        }
        return this._data[globalConstants.GLOBAL_NAMESPACE][key];
    }

    set(key, value) {
        if(!key) {
            return;
        }
        if(!this._data[globalConstants.GLOBAL_NAMESPACE]) {
            this._data[globalConstants.GLOBAL_NAMESPACE] = {};
        }
        if(typeof value === 'Object') {
            this._data[globalConstants.GLOBAL_NAMESPACE][key] = JSON.stringify(value);
        } else {
            this._data[globalConstants.GLOBAL_NAMESPACE][key] = value;
        }
        return this._data[globalConstants.GLOBAL_NAMESPACE][key];
    }

}

module.exports = new DataService();
