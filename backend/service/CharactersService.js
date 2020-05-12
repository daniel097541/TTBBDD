'use strict';
const CharactersDAO = require('../dao/CharactersDAO');
const ComicsDAO = require('../dao/ComicsDAO');

class CharactersService {

    static getInstance() {
        return instance;
    }


    constructor() {
        this.dao = CharactersDAO.getInstance();
        this.comicsDao = ComicsDAO.getInstance();
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
            this.dao.getByName(name, (err, characters) => {
                if (err) {
                    reject(err);
                } else if (characters) {
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
        // this.dao.findPeterPetrelli((err, data) => {
        //     console.log(err);
        //     console.log(data);
        // })
        // this.dao.findRedBarclay((err, data) => {
        //     console.log(err);
        //     console.log(data);
        // })
        //
        // this.comicsDao.findTwoBestInComic((err, data) => {
        //     console.log(err);
        //     console.log(data);
        // })

        this.dao.findBadHeroes((err, data) => {
            console.log(err);
            console.log(data);
        })

        return new Promise((resolve, reject) => {
            this.dao.getALl((err, characters) => {
                if (err) {
                    reject(err);
                } else if (characters) {
                    resolve(characters);
                }
            });
        })
    }


    /**
     * Finds characters matching name
     *
     *
     * name String Name value that need to be considered for filter
     * returns List
     **/
    findCharactersMatchingName(name) {
        return new Promise((resolve, reject) => {
           this.dao.getMatchingName(name, (err, characters) => {
               if(err){
                   reject(err);
               }
               else if (characters){
                   resolve(characters);
               }
           });
        });
    }


}

const instance = new CharactersService();
module.exports = CharactersService;
