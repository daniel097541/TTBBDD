const DataManager = require('../manager/DataManager');
const Character = require('../../../commons/src/model/CharacterModel');
const config = require('../../../commons/config/config.json');
const Comic = require('../../../commons/src/model/ComicModel');
const ArrayUtil = require('../../../commons/src/utils/ArrayUtil');
const mongoose = require('mongoose');

class DataService {

    static getInstance() {
        return instance;
    }

    constructor() {
        this.dataManager = DataManager.getInstance();
        this.connect();
    }

    disconnect() {
        mongoose.connection.close();
    }

    connect() {
        mongoose.connect(config.db_url, {useNewUrlParser: true});
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () {
            // we're connected!
            console.log('Successfully connected to mongo!');
        });
    }

    getData() {
        return this.dataManager.getData();
    }

    getAllCharacters() {
        return this.getData()
            .characters;
    }

    getAllComics() {
        return this.getData()
            .comics;
    }

    getCharacterById(id) {
        return this.getData().characters
            .find(c => c.characterID === id);
    }

    getCharacterByName(name) {
        return this.getData().characters
            .find(c => c.name === name);
    }

    getCharacterInfo(characterName) {
        return this.getData().charactersInfo
            .find(ci => ci.Name === characterName);
    }

    getCharacterStats(characterName) {
        return this.getData().charactersStats
            .find(cs => cs.Name === characterName);
    }

    getComicById(id) {
        return this.getData().comics
            .find(c => c.comicID === id);
    }

    getComicsWhereCharacterAppears(characterName) {
        const character = this.getCharacterByName(characterName);
        if (character) {
            return this.getData().characterToComic
                .filter(a => a.characterID === character.characterID)
                .map(a => this.getComicById(a.comicID));
        }
    }

    getSuperPowersOfCharacter(characterName) {
        return this.getData().powers
            .find(p => p.Name === characterName);
    }

    getCharacterCrossOversInfo(characterName) {
        return this.getData().crossOvers
            .filter(ui => ui.Name === characterName);
    }

    dumpData(callback) {

        const comicsBatchSize = config.comics_batch_size;
        const allComics = ArrayUtil.unique(this.getAllComics(), 'comicID');
        const batchedComics = ArrayUtil.chunkArray(allComics, comicsBatchSize);

        console.log(`Dumping comics data to mongo!`);
        this.recursiveDumpComics(0, batchedComics, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Successfully dumped ${allComics.length} comics!`);

                const charactersBatchSize = config.characters_batch_size;
                const allCharacters = ArrayUtil.unique(this.getAllCharacters(), 'characterID');
                const batchedCharacters = ArrayUtil.chunkArray(allCharacters, charactersBatchSize);

                console.log(`Dumping characters data to mongo!`);
                this.recursiveDumpCharacters(0, batchedCharacters, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`Successfully dumped ${allCharacters.length} characters!`);
                        callback();
                    }
                })
            }
        })
    }

    recursiveDumpComics(index, batches, callback) {

        const batch = batches[index];
        const comics = [];
        console.log(`Dumping batch ${index} of comics!`);

        for (const comic of batch) {
            const comicModel = new Comic({
                _id: comic.comicID,
                name: comic.title,
                issue: comic.issueNumber
            });
            comics.push(comicModel);
        }

        Comic.collection.insert(comics, (err, resp) => {
            if (err) {
                callback(err);
            }
            if (resp) {
                if (index >= batches.length - 1) {
                    callback();
                } else {
                    this.recursiveDumpComics(index + 1, batches, callback);
                }
            }
        });
    }


    recursiveDumpCharacters(index, batches, callback) {
        const heroesBatch = [];
        const batch = batches[index];
        console.log(`Dumping batch ${index} of characters!`);

        for (const character of batch) {

            const info = this.getCharacterInfo(character.name);
            const stats = this.getCharacterStats(character.name);
            const comics = this.getComicsWhereCharacterAppears(character.name).map(c => c.comicID);
            const powers = this.getSuperPowersOfCharacter(character.name);
            const crossOvers = this.getCharacterCrossOversInfo(character.name);

            const powersModel = [];
            let infoModel = {};
            let statsModel = {};
            let crossOversModels = [];

            // craft powers
            if (powers) {
                for (const key of Object.keys(powers)) {
                    const value = powers[key];
                    if (value.toLowerCase() === 'true') {
                        powersModel.push(key);
                    }
                }
            }

            // craft character info
            if (info) {
                infoModel = {
                    alignment: info.Alignment,
                    gender: info.Gender,
                    eye_color: info.EyeColor,
                    hair_color: info.HairColor,
                    publisher: info.Publisher,
                    skin_color: info.SkinColor,
                    height: info.Height,
                    weight: info.Weight
                };
            }

            // craft stats
            if (stats) {
                statsModel = {
                    intelligence: stats.Intelligence,
                    strength: stats.Strength,
                    speed: stats.Speed,
                    durability: stats.Durability,
                    power: stats.Power,
                    combat: stats.Combat
                };
            }

            if (crossOvers) {
                for(const crossOver of crossOvers) {
                    const crossOversModel = {
                        identity: crossOver.Identity,
                        alignment: crossOver.Alignment,
                        status: crossOver.Status,
                        appearances: crossOver.Appearances,
                        firstAppearance: crossOver.FirstAppearance,
                        year: crossOver.Year,
                        universe: crossOver.Universe,
                        extraInfo: crossOver.extraInfo
                    };
                    crossOversModels.push(crossOversModel);
                }
            }


            // return characters model
            const characterModel = new Character({
                _id: character.characterID,
                name: character.name,
                info: infoModel,
                stats: statsModel,
                comics: comics,
                powers: powersModel,
                crossovers: crossOversModels
            });

            heroesBatch.push(characterModel);
        }


        Character.collection.insert(heroesBatch, (err, resp) => {

            if (err) {
                callback(err);
            }
            if (resp) {

                // get out
                if (index >= batches.length - 1) {
                    callback();
                }

                // recursive call
                else {
                    this.recursiveDumpCharacters(index + 1, batches, callback);
                }
            }
        });

    }

}

const instance = new DataService();
module.exports = DataService;
