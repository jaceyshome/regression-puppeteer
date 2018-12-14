const fs = require('fs');
const path = require('path');
const util = require('util');
// Convert fs.readFile into Promise version of same
const readFile = util.promisify(fs.readFile);
const _ = require('lodash');
const {FilePath} = require('./../../helpers/helpers');

const templateFile = FilePath.getAbsolutePath('/features/page-visual/page-visual.tpl');


module.exports = class PageVisualSupport {

    static async buildFeatures() {
        return await Promise.all([
            PageVisualSupport.buildFeature('desktop'),
            PageVisualSupport.buildFeature('desktop-large'),
            PageVisualSupport.buildFeature('tablet-landscape'),
            PageVisualSupport.buildFeature('tablet-portrait'),
            PageVisualSupport.buildFeature('mobile-portrait')
        ]);
    }

    static async buildFeature(viewport) {
        const featureFile = FilePath.getAbsolutePath(`/features/page-visual/page-visual-${viewport}.feature`);
        const template = await readFile(templateFile, 'UTF8');
        let content = template.replace('${BREAKPOINT}', viewport);
        return new Promise(function(resolve,reject){
            fs.writeFile(featureFile, content,function(err){
                if(!err){
                    resolve();
                } else {
                    reject(err);
                }
            });
        });
    }

};

