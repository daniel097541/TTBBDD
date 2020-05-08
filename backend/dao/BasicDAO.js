const mongoose = require('mongoose');
const config = require('../../commons/config/config.json');
const connect = () => {
    mongoose.connect(config.db_url, {useNewUrlParser: true});
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        // we're connected!
        console.log('Successfully connected to mongo!');
    });
};
connect();


class BasicDAO {


    constructor(model) {
        this.model = model;
    }

    aggregate(pipeline, callback){
        this.model.aggregate(pipeline, (err, data) => {
            if(err){
                callback(err, null);
            }
            else if(data){
                callback(null, data);
            }
        })
    }

}
module.exports = BasicDAO;
