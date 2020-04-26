const Client = require('mongodb').MongoClient;
const config = require('../../config/config');

// every dao class should extend this
class MongoDBDAO {

    constructor() {
    }

    static getInstance() {
        return instance;
    }

    connect(callback, onError) {
        Client.connect(config.db_url, (err, db) => {
            if (err) {
                onError(err);
            } else {
                this.connection = db;
                callback(db);
            }
        });
    }
}

const instance = new MongoDBDAO();
module.exports = MongoDBDAO;
