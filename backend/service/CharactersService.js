'use strict';
const CharactersDAO = require('../dao/CharactersDAO');
const ComicsDAO = require('../dao/ComicsDAO');
const BasicService = require('./BasicService');

class CharactersService extends BasicService{

    static getInstance() {
        return instance;
    }


    constructor() {
        super();
        this.dao = CharactersDAO.getInstance();
        this.comicsDao = ComicsDAO.getInstance();
    }

    /**
     * Finds the average number of appearances per character
     *
     *
     * returns BigDecimal
     **/
    avgAppearancesPerChar() {
        return new Promise( (resolve, reject) => {
            this.dao.findAverageAppearancesPerChar((err, data) => {
                this.handleDaoResponse(resolve, reject, err, data);
            })
        });
    }


    /**
     * Finds the average number of powers per character
     *
     *
     * returns BigDecimal
     **/
    avgPowersPerChar() {
        return new Promise( (resolve, reject) => {
            this.dao.findAveragePowersPerChar((err, data) => {
                this.handleDaoResponse(resolve, reject, err, data);
            })
        });
    }


    /**
     * Get the count of characters that have crossovers
     *
     *
     * returns BigDecimal
     **/
    charsWithCross() {
        return new Promise( (resolve, reject) => {
            this.dao.metadataCharsCrossoverInfo((err, data) => {
                this.handleAmountResponse(resolve, reject, err, data);
            })
        });
    }


    /**
     * Get the count of characters that have additional info
     *
     *
     * returns BigDecimal
     **/
    charsWithInfo() {
        return new Promise( (resolve, reject) => {
            this.dao.metadataCharsPersonalInfo((err, data) => {
                this.handleAmountResponse(resolve, reject, err, data);
            })
        });
    }


    /**
     * Get the count of characters that have powers
     *
     *
     * returns BigDecimal
     **/
    charsWithPowers() {
        return new Promise( (resolve, reject) => {
            this.dao.metadataCharsPowersInfo((err, data) => {
                this.handleAmountResponse(resolve, reject, err, data);
            })
        });
    }


    /**
     * Get the count of characters that have stats
     *
     *
     * returns BigDecimal
     **/
    charsWithStats() {
        return new Promise( (resolve, reject) => {
            this.dao.metadataCharsStatsInfo((err, data) => {
                this.handleAmountResponse(resolve, reject, err, data);
            })
        });
    }


    /**
     * Get the count of characters stored
     *
     *
     * returns BigDecimal
     **/
    count() {
        return new Promise( (resolve, reject) => {
            this.dao.getCount((err, data) => {
                this.handleAmountResponse(resolve, reject, err, data);
            })
        });
    }


    /**
     * Finds female characters ordered by amount of powers
     *
     * returns List
     **/
    // CONSULTA 6: LAS CHICAS SON GUERRERAS
    // Todos los personajes femeninos ordenadas por la cantidad de poderes que tienen
    didYouJustAssumeMyGender() {
        return new Promise( (resolve, reject) => {
            this.dao.didYouJustAssumeMyGender((err, data) => {
                this.handleDaoResponse(resolve, reject, err, data);
            })
        });
    }


    /**
     * Finds the heroes that are villains in one or more crossovers
     *
     * returns List
     **/
    findBadHeroes() {
        return new Promise( (resolve, reject) => {
            this.dao.findBadHeroes((err, data) => {
                this.handleDaoResponse(resolve, reject, err, data);
            })
        });
    }


    /**
     * Finds the best hero in a comic
     *
     *
     * returns Character
     **/
    findBestInComic(comicId) {
        return new Promise( (resolve, reject) => {
            this.dao.findBestHeroInComic(comicId,(err, data) => {
                this.handleDaoResponse(resolve, reject, err, data);
            })
        });
    }


    /**
     * Finds characters by name
     * Multiple name values can be provided with comma separated strings
     *
     * name List Name values that need to be considered for filter
     * returns List
     **/
    findCharactersByName(name) {
        return new Promise( (resolve, reject) => {
            this.dao.getByName(name,(err, data) => {
                this.handleDaoResponse(resolve, reject, err, data);
            })
        });
    }


    /**
     * Finds characters matching name
     *
     *
     * name String Name value that need to be considered for filter
     * returns List
     **/
    findCharactersMatchingName(name) {
        return new Promise( (resolve, reject) => {
            this.dao.getMatchingName(name,(err, data) => {
                this.handleDaoResponse(resolve, reject, err, data);
            })
        });
    }


    /**
     * Finds the hero (alignment = good) that has the lowest intelligence
     *
     *
     * returns List
     **/
    findDumbestHero() {
        return new Promise( (resolve, reject) => {
            this.dao.findDumbestHero((err, data) => {
                this.handleDaoResponse(resolve, reject, err, data);
            })
        });
    }


    /**
     * Finds the villain (alignment = bad) that has the highest intelligence
     *
     *
     * returns List
     **/
    findSmartestVillain() {
        return new Promise( (resolve, reject) => {
            this.dao.findSmartestVillain((err, data) => {
                this.handleDaoResponse(resolve, reject, err, data);
            })
        });
    }


    /**
     * Get all characters
     * Get all characters
     *
     * returns List
     **/
    getAll() {
        return new Promise( (resolve, reject) => {
            this.dao.getALl((err, data) => {
                this.handleDaoResponse(resolve, reject, err, data);
            })
        });
    }


    /**
     * Finds the top 10 of more powerfull characters
     *
     *
     * returns List
     **/
    // CONSULTA 10: Los más poderosos
    top10Powerfull() {
        return new Promise( (resolve, reject) => {
            this.dao.rankingTop10Powerful((err, data) => {
                this.handleDaoResponse(resolve, reject, err, data);
            })
        });
    }


    /**
     * Finds the top 10 of women with more appearances in comics
     *
     *
     * returns List
     **/
    top10Women() {
        return new Promise( (resolve, reject) => {
            this.dao.rankingTop10Women((err, data) => {
                this.handleDaoResponse(resolve, reject, err, data);
            })
        });
    }


    /**
     * Finds the top 5 of characters with selected alignment and more appearances
     *
     *
     * alignment List Alignment values that need to be considered for filter
     * returns List
     **/
    top5CharactersByAlignment(alignment) {
        console.log(`Getting top 5 by alignment: ${alignment}`)
        return new Promise( (resolve, reject) => {
            this.dao.rankingTop5((err, data) => {
                this.handleDaoResponse(resolve, reject, err, data);
            }, alignment);
        });
    }


    /**
     * Finds the character with the highest amount of powers
     *
     * returns Character
     **/
    whoIsPeterPetrelli() {
        return new Promise( (resolve, reject) => {
            this.dao.findPeterPetrelli((err, data) => {
                this.handleDaoResponse(resolve, reject, err, data);
            })
        });
    }


    /**
     * Finds the fatest character aka Don Solomillón
     *
     * returns Character
     **/
    whoIsRedBarclay() {
        return new Promise( (resolve, reject) => {
            this.dao.findRedBarclay((err, data) => {
                this.handleDaoResponse(resolve, reject, err, data);
            })
        });
    }

    /**
     * Finds the tallest character
     *
     * returns Character
     **/
    whoIsTallestChar() {
        return new Promise( (resolve, reject) => {
            this.dao.findTallestChar((err, data) => {
                this.handleDaoResponse(resolve, reject, err, data);
            })
        });
    }


    /**
     * Finds all the villains that met a character
     *
     * character_id The id of the character
     * returns List
     **/
    findVillainsThatMetCharacter(character_id) {
        return new Promise( (resolve, reject) => {
            this.dao.findAllVillainsThatMetCharacter(character_id,(err, data) => {
                this.handleDaoResponse(resolve, reject, err, data);
            })
        });
    }

}

const instance = new CharactersService();
module.exports = CharactersService;
