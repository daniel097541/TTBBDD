class MongoDBDAO {

    constructor() {
    }

    static getInstance(){
        return instance;
    }

}

const instance = new MongoDBDAO();
module.exports = MongoDBDAO;
