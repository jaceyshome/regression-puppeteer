const request = require('request-promise');

module.exports = class Http {

    static post({url, data}) {
        return new Promise( function(resolved, rejected) {
            request({
                method: 'POST',
                url: url,
                body: data,
                json: true,
                headers: {
                    'User-Agent': 'regression-puppeteer',
                }
            }).then((response)=> {
                resolved(response);
            }).catch((err)=> {
                rejected(err);
            })
        });

    }

    static get({url}){
        return new Promise( function(resolved, rejected) {
            request({
                method: 'GET',
                url: url,
                json: true,
                headers: {
                    'User-Agent': 'regression-puppeteer',
                }
            }).then((response)=> {
                resolved(response);
            }).catch((err)=> {
                rejected(err);
            });
        })
    }
    static put(){}
    static remove(){}

};
