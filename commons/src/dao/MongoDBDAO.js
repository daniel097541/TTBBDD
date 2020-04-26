const Client = require('mongodb').MongoClient;
const uri = "mongodb+srv://mongo:mongo@ttbbdd-fgu5s.mongodb.net/test?retryWrites=true&w=majority";

// every dao class should extend this
class MongoDBDAO {

    constructor() {
    }

    static getInstance() {
        return instance;
    }

    connect(callback, onError) {
        Client.connect(uri, (err, db) => {
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
