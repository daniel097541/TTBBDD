'use strict';
const CharactersDAO = require('../dao/CharactersDAO');

class CharactersService {

    static getInstance() {
        return instance;
    }


    constructor() {
        this.dao = CharactersDAO.getInstance();
    }

    /**
     * Finds characters by name
     * Multiple name values can be provided with comma separated strings
     *
     * name List Name values that need to be considered for filter
     * returns List
     **/
    findCharactersByName(name) {
        console.log(name)
        return new Promise(((resolve, reject) => {
            this.dao.getByName(name,(err, characters) => {
                if(err){
                    reject(err);
                }
                else if(characters){
                    resolve(characters);
                }
            })
        }));
    }


    /**
     * Get all characters
     * Get all characters
     *
     * returns List
     **/
    getAll() {
        return new Promise((resolve, reject) => {
            this.dao.getALl((err, characters) => {
                if(err){
                    reject(err);
                }
                else if(characters){
                    resolve(characters);
                }
            });
        })
    }

}

const instance = new CharactersService();
module.exports = CharactersService;
