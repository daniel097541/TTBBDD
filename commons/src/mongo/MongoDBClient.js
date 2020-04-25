const Client = require('mongodb').MongoClient;

class MongoDBClient {

    constructor() {
        this.connection = null;
    }

    static getInstance(){
        return instance;
    }

    getConnection(url, callback, onError){
        if(!this.connection){
            Client.connect(url, (err, db) => {
                if(err){
                    onError(err);
                }
                else{
                    this.connection = db;
                    callback(db);
                }
            })
        }
        else{
            callback(this.connection);
        }
    }


}
const instance = new MongoDBClient();
module.exports = MongoDBClient;
