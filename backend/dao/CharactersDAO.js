'use strict'
const BasicDAO = require('./BasicDAO');
const CharacterModel = require('../../commons/src/model/CharacterModel');

class CharactersDAO extends BasicDAO {

    static getInstance() {
        return instance;
    }


    constructor() {
        super(CharacterModel);
    }


    getALl(callback) {
        CharacterModel.find({}, (err, characters) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, characters);
            }
        });
    }

    getByName(names, callback) {
        CharacterModel.find({'name': {$in: names}}, (err, characters) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, characters);
            }
        })
    }


    getMatchingName(name, callback) {
        const regex = new RegExp(name, 'i');
        CharacterModel.find({'name': regex}, (err, characters) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, characters);
            }
        })
    }

    findPeterPetrelli(callback) {
        console.log(`Executing peter petrelli query!`)
        const pipeline = [
            {$project: {_id: "$$ROOT", len: {"$size": "$powers"}}},
            {$sort: {len: -1}},
            {$limit: 1}
        ];
        this.aggregate(pipeline, callback);
    }

    findRedBarclay(callback) {
        console.log(`Running query to find red barclay!`)
        const pipeline = [
            {
                $group: {_id: "$$ROOT", weight: {$max: "$info.weight"}}},
            {
                $sort: {weight: -1}},
            {
                $limit: 1}
        ];
        this.aggregate(pipeline, callback);
    }

    findBadHeroes(callback) {
        const pipeline = [
            {
                $match: {
                    'info.alignment': 'good'
                }
            },
            {
                $match: {
                    crossovers: {
                        $elemMatch: {alignment: 'bad'}
                    }
                }
            }
        ];
        this.aggregate(pipeline, callback);
    }

}

const instance = new CharactersDAO();

module.exports = CharactersDAO;
