'use strict';

const utils = require('../utils/writer.js');
const service = require('../service/CharactersService').getInstance();

module.exports.avgAppearancesPerChar = function avgAppearancesPerChar (req, res, next) {
  service.avgAppearancesPerChar()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.avgPowersPerChar = function avgPowersPerChar (req, res, next) {
  service.avgPowersPerChar()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.charsWithCross = function charsWithCross (req, res, next) {
  service.charsWithCross()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.charsWithInfo = function charsWithInfo (req, res, next) {
  service.charsWithInfo()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.charsWithPowers = function charsWithPowers (req, res, next) {
  service.charsWithPowers()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.charsWithStats = function charsWithStats (req, res, next) {
  service.charsWithStats()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.count = function count (req, res, next) {
  service.count()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.didYouJustAssumeMyGender = function didYouJustAssumeMyGender (req, res, next) {
  service.didYouJustAssumeMyGender()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.findBadHeroes = function findBadHeroes (req, res, next) {
  service.findBadHeroes()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.findBestInComic = function findBestInComic (req, res, next) {
  const comicId = req.swagger.params['comicId'].value;
  service.findBestInComic(comicId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.findCharactersByName = function findCharactersByName (req, res, next) {
  var name = req.swagger.params['name'].value;
  service.findCharactersByName(name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.findCharactersMatchingName = function findCharactersMatchingName (req, res, next) {
  var name = req.swagger.params['name'].value;
  service.findCharactersMatchingName(name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.findDumbestHero = function findDumbestHero (req, res, next) {
  service.findDumbestHero()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.findSmartestVillain = function findSmartestVillain (req, res, next) {
  service.findSmartestVillain()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAll = function getAll (req, res, next) {
  service.getAll()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.top10Powerfull = function top10Powerfull (req, res, next) {
  service.top10Powerfull()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.top10Women = function top10Women (req, res, next) {
  service.top10Women()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.top5CharactersByAlignment = function top5CharactersByAlignment (req, res, next) {
  var alignment = req.swagger.params['alignment'].value;
  service.top5CharactersByAlignment(alignment)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.whoIsPeterPetrelli = function whoIsPeterPetrelli (req, res, next) {
  service.whoIsPeterPetrelli()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.whoIsRedBarclay = function whoIsRedBarclay (req, res, next) {
  service.whoIsRedBarclay()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
