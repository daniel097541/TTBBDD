'use strict'
const BasicDAO = require('./BasicDAO');
const CharacterModel = require('../../commons/src/model/CharacterModel');

class CharactersDAO extends BasicDAO {

    static getInstance() {
        return instance;
    }


    constructor() {
        super();
    }


    getALl(callback) {
        CharacterModel.find({}, (err, characters) => {
            if(err){
                callback(err, null);
            }
            else{
                callback(null, characters);
            }
        });
    }

    getByName(names, callback){
        CharacterModel.find({'name': { $in: names}}, (err, characters) => {
            if(err){
                callback(err, null);
            }
            else{
                callback(null, characters);
            }
        })
    }

}

const instance = new CharactersDAO();

module.exports = CharactersDAO;
