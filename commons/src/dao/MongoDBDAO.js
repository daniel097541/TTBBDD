const MongoClient = require('../mongo/MongoDBClient');

// every dao class should extend this
class MongoDBDAO {

    constructor() {
        this.client = MongoClient.getInstance();
        this.connection = null;
        this.connect();
    }

    static getInstance(){
        return instance;
    }

    connect(){
        const url = 'asd';
        console.log('Connecting dao');
        this.client.getConnection(url, (connection) => {
            this.connection = connection;
            console.log('Successfully connected to mongo!');
        }, (error) => {
            console.log('Error connecting to mongo!');
            console.log(error);
        });
    }

}

const instance = new MongoDBDAO();
module.exports = MongoDBDAO;
