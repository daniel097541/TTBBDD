const ComicsModel = require('../../commons/src/model/ComicModel');
const BasicDAO = require('./BasicDAO');

class ComicsDAO extends BasicDAO {

    static getInstance() {
        return instance;
    }

    constructor() {
        super(ComicsModel);
    }

    findTwoBestInComic(callback) {
        console.log('Running query to find hero and villain');
        const pipeline = [];
        this.aggregate(pipeline, callback);
    }
}

const instance = new ComicsDAO();
module.exports = ComicsDAO;
