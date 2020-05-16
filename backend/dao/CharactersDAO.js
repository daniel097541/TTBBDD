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

    findDoctors(callback){
        console.log(`Running query to find characters that have DOCTOR in the name`)

        CharacterModel.find({"name":/.doctor.$/i}, (err, data) => {

            // si hay error, devuelvo el error solo
            if(err){
                callback(err);
            }
            // si hay datos devuelvo el error en null y los datos en el segundo argumento
            else if (data){
                callback(null, data);
            }
        })
    }


    didYouJustAssumeMyGender(callback) {
        console.log(`Did you just assume my gender?`);
        const pipeline = [

            // 1 - Filter by gender == female
            {
                $match: {
                    'info.gender': 'female',
                }
            },

            // 2 - Project to retrieve only id, name and power amount
            {
                $project: {
                    _id: '$_id',
                    name: '$name',
                    powers_amount: {
                        $size: {
                            $ifNull: ['$powers', []]
                        }
                    }
                }
            },

            // 3 - Sort by amount of powers, descending
            {
                $sort: {
                    'powers_amount': -1
                }
            }
        ];
        this.aggregate(pipeline, callback);
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
                $group: {_id: "$$ROOT", weight: {$max: "$info.weight"}}
            },
            {
                $sort: {weight: -1}
            },
            {
                $limit: 1
            }
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
            if (err) {
                callback(err, null);
            } else if (data) {
                callback(null, data);
            }
        })
    }

    findSmartestVillain(callback){
        const pipeline = [
            {
                $match: {
                    'info.alignment': 'bad'
                }
            },
            {
                $sort: {
                    'stats.intelligence': -1
                }
            },
            {
                $limit: 1
            },
            {
                $project:{
                    _id: '$_id',
                    name: '$name'
                }
            }
        ];
        this.aggregate(pipeline, callback);
    }

    findDumbestHero(callback){
        const pipeline = [
            {
                $match: {
                    'info.alignment': 'good'
                }
            },
            {
                $sort: {
                    'stats.intelligence': 1,
                }
            },
            {
                $limit: 1
            },
            {
                $project:{
                    _id: '$_id',
                    name: '$name'
                }
            }
        ];

        this.aggregate(pipeline, callback);
    }

    findDoctors(callback){
        console.log('Running query to find characters that have DOCTOR in the name')
        CharacterModel.find({"name":/.*doctor.*$/i}, (err, data) => {

            if(err){
                callback(err);
            }
            else if (data){
                callback(null, data);
            }
        });
    }

    // METADATA QUERIES

    metadataNumberCharacters(callback){
        console.log('Metadata - Running query to find number of characters in DB')
        CharacterModel.count({}, (err,data) => {
            if(err){
                callback(err);
            }
            else if (data){
                callback(null, data);
            }
        });
    }

    metadataNumberComics(callback){
        console.log('Metadata - Running query to find number of comics in DB')
        ComicsModel.count({}, (err,data) => {
            if(err){
                callback(err);
            }
            else if (data){
                callback(null, data);
            }
        });
    }

    metadataCharsCrossoverInfo(callback){
        console.log('Metadata - Running query to find number of chars with crossover info in DB')
        CharacterModel.count({crossovers: {$ne: []}}, (err,data) => {
            if(err){
                callback(err);
            }
            else if (data){
                callback(null, data);
            }
        });
    }

    metadataCharsCrossoverInfo(callback){
        console.log('Metadata - Running query to find number of chars with crossover info in DB')
        CharacterModel.count({crossovers: {$ne: []}}, (err,data) => {
            if(err){
                callback(err);
            }
            else if (data){
                callback(null, data);
            }
        });
    }

    metadataCharsPersonalInfo(callback){
        console.log('Metadata - Running query to find number of chars with personal info in DB')
        CharacterModel.count(
            {$or: [
                    {"info.alignment": { "$exists": true }},
                    {"info.gender":{"$exists": true}},
                    {"info.hair_color":{"$exists": true}},
                    {"info.height":{"$exists": true}},
                    {"info.publisher":{"$exists": true}},
                    {"info.skin_color":{"$exists": true}},
                    {"info.weight":{"$exists": true}},
                    {"info.eye_color":{"$exists": true}}]
            }
            , (err,data) => {
            if(err){
                callback(err);
            }
            else if (data){
                callback(null, data);
            }
        });
    }

    metadataCharsPowersInfo(callback){
        console.log('Metadata - Running query to find number of chars with powers info in DB')
        CharacterModel.count({powers: {$ne: []}}, (err,data) => {
            if(err){
                callback(err);
            }
            else if (data){
                callback(null, data);
            }
        });
    }

    metadataCharsStatsInfo(callback){
        console.log('Metadata - Running query to find number of chars with stats info in DB')
        CharacterModel.count(
            {$or: [
                    {"stats.combat": { "$exists": true }},
                    {"stats.durability":{"$exists": true}},
                    {"stats.intelligence":{"$exists": true}},
                    {"stats.power":{"$exists": true}},
                    {"stats.speed":{"$exists": true}},
                    {"stats.strength":{"$exists": true}}]
            }
            , (err,data) => {
                if(err){
                    callback(err);
                }
                else if (data){
                    callback(null, data);
                }
            });
    }
}

const instance = new CharactersDAO();
module.exports = CharactersDAO;
