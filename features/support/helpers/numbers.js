const numeral = require('numeral');

module.exports = class Numbers {

    static numeral(candidate) {
        return ({
            'first': 1,
            'second': 2,
            'third': 3,
            'fourth': 4,
            'fifth': 5,
            'sixth': 6,
            'seventh': 7,
            'eighth': 8,
            'ninth': 9,
            'tenth': 10
        })[candidate] || numeral(candidate).value();
    }

};
