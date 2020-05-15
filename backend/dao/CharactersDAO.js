'use strict'
const BasicDAO = require('./BasicDAO');
const CharacterModel = require('../../commons/src/model/CharacterModel');
const ComicsModel = require('../../commons/src/model/ComicModel');

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

            // 1 - Find heroes first
            {
                $match: {
                    'info.alignment': 'good'
                }
            },

            // 2 - Filter by those that have a crossover where they are villains
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

    findBestHeroInComic(comicId, callback) {
        console.log(`Running query: Find best hero in comic. !`)
        const pipeline = [
            // 1 - Filter by comic id
            {
                $match: {
                    _id: comicId
                }
            },

            // 2 - Join characters that appear in this comic
            {
                $lookup: {
                    from: "characters",
                    localField: "_id",
                    foreignField: "comics",
                    as: "comic_characters"
                }
            },

            // 3 - Unwind characters to iterate over the array
            {
                $unwind: '$comic_characters'
            },

            // 4 - Replace root to return a character instead of a comic
            {
                $replaceRoot: {
                    newRoot: '$comic_characters'
                }
            },

            // 5 - Filter characters that are heroes (alignment = good)
            {
                $match: {
                    'info.alignment': 'good'
                }
            },

            // 6 - Make a projection to not return all fields of the character and get the total stats
            {
                $project: {
                    _id: '$$ROOT._id',
                    name: '$$ROOT.name',
                    info: '$$ROOT.info',
                    stats: '$$ROOT.stats',
                    total_stats: {
                        $add: ['$stats.combat', '$stats.durability', '$stats.intelligence', '$stats.power', '$stats.speed', '$stats.strength']
                    }
                }
            },

            // 7 - Sort by total stats descending

            {
                $sort: {
                    total_stats: -1
                }
            },


            // 8 - Get the best one
            {
                $limit: 1
            }
        ];

        ComicsModel.aggregate(pipeline, (err, data) => {
            if(err){
                callback(err, null);
            }
            else if(data){
                callback(null, data);
            }
        })
    }
}

const instance = new CharactersDAO();
module.exports = CharactersDAO;
