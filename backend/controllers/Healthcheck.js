'use strict';

const utils = require('../utils/writer.js');

module.exports.healthCheck = function healthCheck(req, res, next) {
    utils.writeJson(res, {health: 'Im fine, thanks!'});
};
