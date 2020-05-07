'use strict';

const utils = require('../utils/writer.js');
const service = require('../service/CharactersService').getInstance();

module.exports.findCharactersByName = function findCharactersByName (req, res, next) {
  const name = req.swagger.params['name'].value;
  console.log(`Getting all characters by names: ${name}`)
  service.findCharactersByName(name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAll = function getAll (req, res, next) {
  console.log('Getting all characters!');
  service.getAll()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};


module.exports.findCharactersMatchingName = function findCharactersMatchingName (req, res, next) {
  const name = req.swagger.params['name'].value;
  service.findCharactersMatchingName(name)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
};
