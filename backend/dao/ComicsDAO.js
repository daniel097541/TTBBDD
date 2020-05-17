const ComicsModel = require('../../commons/src/model/ComicModel');
const BasicDAO = require('./BasicDAO');

class ComicsDAO extends BasicDAO {

    static getInstance() {
        return instance;
    }

    constructor() {
        super(ComicsModel);
    }

    findComicWithStrongestHeroes(callback){
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
                    path: '$total_comic_str' ,
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

    getAll(callback){
        ComicsModel.collection.find({}, (err, data) => {
            if(err){
                callback(err);
            }
            else if (data){
                callback(null, data);
            }
        })
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

}

const instance = new ComicsDAO();
module.exports = ComicsDAO;
