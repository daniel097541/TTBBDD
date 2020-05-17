const BasicService = require('./BasicService');
const ComicsDAO = require('../dao/ComicsDAO');

class ComicsService extends BasicService {

    constructor() {
        super();
        this.dao = ComicsDAO.getInstance();
    }

    static getInstance(){
        return instance;
    }

    /**
     * Get the count of comics stored
     *
     *
     * returns BigDecimal
     **/
    countComics() {
        return new Promise((resolve, reject) => {
            this.dao.getCount((err, data) => {
                this.handleAmountResponse(resolve, reject, err, data);
            })
        });
    }


    /**
     * Find the comics with the strongest heroes in a sample of 1000 comics
     *
     *
     * returns Object
     **/
    findComicWithStrongest() {
        return new Promise((resolve, reject) => {
            this.dao.findComicWithStrongestHeroes((err, data) => {
                this.handleDaoResponse(resolve, reject, err, data);
            })
        });
    }


    /**
     * Finds comics matching name
     *
     *
     * name String Name value that need to be considered for filter
     * returns List
     **/
    findComicsMatchingName(name) {
        return new Promise((resolve, reject) => {
            this.dao.findMatchingName(name, (err, data) => {
                this.handleDaoResponse(resolve, reject, err, data);
            })
        });
    }
}

const instance = new ComicsService();
module.exports = ComicsService;
