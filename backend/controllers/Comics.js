'use strict';

const utils = require('../utils/writer.js');
const service = require('../service/ComicsService').getInstance();

module.exports.countComics = function countComics (req, res, next) {
  service.countComics()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.findComicWithStrongest = function findComicWithStrongest (req, res, next) {
  service.findComicWithStrongest()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.findComicsMatchingName = function findComicsMatchingName (req, res, next) {
  const name = req.swagger.params['name'].value;
  service.findComicsMatchingName(name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
