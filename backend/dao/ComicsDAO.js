const ComicsModel = require('../../commons/src/model/ComicModel');
const BasicDAO = require('./BasicDAO');

class ComicsDAO extends BasicDAO {

    static getInstance() {
        return instance;
    }

    constructor() {
        super(ComicsModel);
    }

    getCount(callback) {
        ComicsModel.collection.countDocuments((err, data) => {
            this.handleResp(callback, err, data);
        })
    }

    findMatchingName(name, callback){
        const regex = new RegExp(name, 'i');
        ComicsModel.find({'name': regex}, (err, characters) => {
            this.handleResp(callback, err, characters);
        })
    }

    // CONSULTA 13:
    findComicWithStrongestHeroes(callback) {
        console.log(`Getting comic with the strongest heroes!`);
        const pipeline = [
            {
                $sample: {
                    size: 1000
                }
            },
            {
                $lookup: {
                    from: 'characters',
                    let: {
                        comic_id: '$_id',
                        comic_name: '$name'
                    },
                    as: 'total_comic_str',
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {$in: ['$$comic_id', '$comics']}, // the character is from this comic
                                        {$eq: ['$info.alignment', 'good']}, // the character is a hero
                                        {$ne: [null, '$stats.strength']}
                                    ]
                                }
                            }
                        },
                        {
                            $group: {  // group by comic id and accumulate strength of each hero
                                _id: '$$comic_name',
                                total_str: {
                                    $sum: '$stats.strength'
                                }
                            }
                        }
                    ]
                }
            },
            {
                $unwind: {
                    path: '$total_comic_str',
                    preserveNullAndEmptyArrays: false
                }
            },
            {
                $replaceRoot: {
                    newRoot: '$total_comic_str'
                }
            },
            {
                $sort: {
                    total_comic_str: -1
                }
            },
            {
                $limit: 1
            }
        ];

        this.aggregate(pipeline, callback);
    }
}

const instance = new ComicsDAO();
module.exports = ComicsDAO;
