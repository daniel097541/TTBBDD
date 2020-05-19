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

    getCount(callback) {
        CharacterModel.collection.count((err, data) => {
            this.handleResp(callback, err, data);
        })
    }

    getALl(callback) {
        CharacterModel.find({}, (err, characters) => {
            this.handleResp(callback, err, characters);
        });
    }

    getByName(names, callback) {
        CharacterModel.find({'name': {$in: names}}, (err, characters) => {
            this.handleResp(callback, err, characters);
        })
    }

    // CONSULTA 1: ¿Quién es el más gordo?
    // El personaje más gordo de todos
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

    // CONSULTA 2: ¿Quién es el más alto?
    // El personaje más alto de todos
    findTallestChar(callback) {
        console.log(`Running query to find red barclay!`)
        const pipeline = [
            {
                $group: {_id: "$$ROOT", height: {$max: "$info.height"}}
            },
            {
                $sort: {height: -1}
            },
            {
                $limit: 1
            }
        ];
        this.aggregate(pipeline, callback);
    }

    // CONSULTA 3: ¿Quién es el héroe más poderoso?
    // El héroe con más poderes.
    findPeterPetrelli(callback) {
        console.log(`Executing Peter Petrelli query!`)
        const pipeline = [
            { $match: { 'info.alignment': 'good' } },
            {$project: {_id: "$$ROOT", len: {"$size": "$powers"}}},
            {$sort: {len: -1}},
            {$limit: 1}
        ];
        this.aggregate(pipeline, callback);
    }

    // CONSULTA 5: ¿Quién nos salvará del coronavirus?
    // Filtro en el nombre del personaje
    getMatchingName(name, callback) {
        const regex = new RegExp(name, 'i');
        CharacterModel.find({'name': regex}, (err, characters) => {
            this.handleResp(callback, err, characters);
        })
    }

    // CONSULTA 6: LAS CHICAS SON GUERRERAS
    // Todos los personajes femeninos ordenadas por la cantidad de poderes que tienen
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

    //CONSULTA 7: Malos héroes
    // Busca todos los heroes que hayan sido villanos en un crossover
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

    // CONSULTA 4:
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
            this.handleResp(callback, err, data);
        })
    }

    findSmartestVillain(callback) {
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
                $project: {
                    _id: '$_id',
                    name: '$name'
                }
            }
        ];
        this.aggregate(pipeline, callback);
    }

    findDumbestHero(callback) {
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
                $project: {
                    _id: '$_id',
                    name: '$name'
                }
            }
        ];

        this.aggregate(pipeline, callback);
    }


    metadataCharsCrossoverInfo(callback) {
        console.log('Metadata - Running query to find number of chars with crossover info in DB')
        CharacterModel.count({crossovers: {$ne: []}}, (err, data) => {
            this.handleResp(callback, err, data);
        });
    }


    metadataCharsPersonalInfo(callback) {
        console.log('Metadata - Running query to find number of chars with personal info in DB')
        CharacterModel.countDocuments(
            {
                $or: [
                    {"info.alignment": {"$exists": true}},
                    {"info.gender": {"$exists": true}},
                    {"info.hair_color": {"$exists": true}},
                    {"info.height": {"$exists": true}},
                    {"info.publisher": {"$exists": true}},
                    {"info.skin_color": {"$exists": true}},
                    {"info.weight": {"$exists": true}},
                    {"info.eye_color": {"$exists": true}}]
            }
            , (err, data) => {
                this.handleResp(callback, err, data);
            });
    }

    metadataCharsPowersInfo(callback) {
        console.log('Metadata - Running query to find number of chars with powers info in DB')
        CharacterModel.countDocuments({powers: {$ne: []}}, (err, data) => {
            this.handleResp(callback, err, data);
        });
    }

    metadataCharsStatsInfo(callback) {
        console.log('Metadata - Running query to find number of chars with stats info in DB')
        CharacterModel.countDocuments(
            {
                $or: [
                    {"stats.combat": {"$exists": true}},
                    {"stats.durability": {"$exists": true}},
                    {"stats.intelligence": {"$exists": true}},
                    {"stats.power": {"$exists": true}},
                    {"stats.speed": {"$exists": true}},
                    {"stats.strength": {"$exists": true}}]
            }
            , (err, data) => {
                this.handleResp(callback, err, data);
            });
    }

    // TODO DIVIDE totalPower/countCharsWithPowers
    findAveragePowersPerChar(callback) {
        console.log('Metadata - Running query to find average number of powers per char')
        const pipeline = [
            // First stage: Filter the chars that have powers
            {$match: {powers: {$ne: []}}},
            // Second stage: count the number of chars with powers and sum the number of powers
            {
                $group:
                    {
                        _id: {},
                        totalPower: {$sum: {$cond: {if: {$isArray: "$powers"}, then: {$size: "$powers"}, else: 0}}},
                        countCharsWithPowers: {$sum: 1},
                    }
            }
        ];

        this.aggregate(pipeline, callback);
    }

    // TODO DIVIDE totalAppearances/countAppearances
    findAverageAppearancesPerChar(callback) {
        console.log('Metadata - Running query to find average number of appearances per char')
        const pipeline = [
            // First stage: count the number of chars with appearances and sum the number of appearances
            {
                $group:
                    {
                        _id: {},
                        totalAppearances: {
                            $sum: {
                                $cond: {
                                    if: {$isArray: "$comics"},
                                    then: {$size: "$comics"},
                                    else: 0
                                }
                            }
                        },
                        countAppearances: {$sum: 1},
                    }
            }
        ];

        this.aggregate(pipeline, callback);
    }

    // RANKING QUERIES

    rankingTop10Women(callback) {
        console.log('Ranking - Running query to find top 10 women chars with more appearances in comics')
        const pipeline = [
            {$match: {"info.gender": {$eq: "female"}}},
            {
                $project: {
                    char_name: "$name",
                    numberOfAppearances: {$cond: {if: {$isArray: "$comics"}, then: {$size: "$comics"}, else: 0}}
                }
            },
            {$sort: {numberOfAppearances: -1}},
            {$limit: 10}
        ];
        this.aggregate(pipeline, callback);
    }

    rankingTop10Powerful(callback) {
        console.log('Ranking - Running query to find Top 10 more powerful characters')
        const pipeline = [
            {$match: {powers: {$ne: []}}},
            {
                $project: {
                    char_name: "$name",
                    numberOfPowers: {$cond: {if: {$isArray: "$powers"}, then: {$size: "$powers"}, else: 0}}
                }
            },
            {$sort: {numberOfPowers: -1}},
            {$limit: 10}
        ];

        this.aggregate(pipeline, callback);
    }

    rankingTop5(callback, alignment) {
        console.log(`Ranking - Running query to find Top 5 chars with ${alignment} alignment with more appearances in comics`)
        const pipeline = [
            {$match: {"info.alignment": {$eq: alignment}}},
            {
                $project: {
                    char_name: "$name",
                    numberOfAppearances: {$cond: {if: {$isArray: "$comics"}, then: {$size: "$comics"}, else: 0}}
                }
            },
            {$sort: {numberOfAppearances: -1}},
            {$limit: 5}
        ];
        this.aggregate(pipeline, callback);
    }
    
    findAllVillainsThatMetCharacter(characterId, callback){
        const pipeline = [
            {
                $match: {
                    _id: characterId
                }
            },

            {
                $unwind: '$comics'
            },

            {
                $lookup: {
                    from: "characters",
                    as: "comic_characters",
                    let: {
                        comic_id: '$comics',
                        me: '$_id'
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $in: ['$$comic_id', '$comics']
                                        },
                                        {
                                            $eq: ['$info.alignment', 'bad']
                                        },
                                        {
                                            $ne: ['$_id', '$$me']
                                        }
                                    ]
                                }
                            }
                        },
                        {
                            $project: {
                                _id: '$_id',
                                name: '$name'
                            }
                        }
                    ]
                }
            },
            {
              $unwind: '$comic_characters'
            },
            {
                $group: {
                    _id: '$_id',
                    villains: {
                        $addToSet: '$comic_characters'
                    }
                }
            }
        ];
        this.aggregate(pipeline, callback);
    }

}

const instance = new CharactersDAO();
module.exports = CharactersDAO;
