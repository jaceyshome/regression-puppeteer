const config = require('./../../../config/config');
const DEFAULT_MISMATCH_TOLERANCE = 0.1;

/**
 * Global constant key
 * using process.env to get and set
 */
let constants = Object.assign({}, config.regressionOptions);
constants.MISMATCH_TOLERANCE = config.regressionOptions.MISMATCH_TOLERANCE || DEFAULT_MISMATCH_TOLERANCE;
module.exports = constants;
