const DataManager = require('../manager/DataManager');
const CharacterModel = require('../../../commons/src/model/CharacterModel');
const CharacterInfoModel = require('../../../commons/src/model/CharacterInfoModel');
const CharacterStatsModel = require('../../../commons/src/model/CharacterStatsModel');

class DataService {

    static getInstance() {
        return instance;
    }

    constructor() {
        this.dataManager = DataManager.getInstance();
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

    getCharacterAppearancesInfo(characterName) {
        return this.getData().appearancesInfo
            .filter(ui => ui.Name.startsWith(characterName));
    }

    craftHeroesData(){
        const heroesData = [];
        for(const character of this.getAllCharacters()){

            const info = this.getCharacterInfo(character.name);
            const stats = this.getCharacterStats(character.name);
            const comics = this.getComicsWhereCharacterAppears(character.name).map(c => c.comicID);
            const powers = this.getSuperPowersOfCharacter(character.name);
            const powersModel = [];
            for(const key of Object.keys(powers)){
                const value = powers[key];
                if(value.toLowerCase() === 'true'){
                    powersModel.push(key);
                }
            }

            const infoModel = new CharacterInfoModel(info.Alignment, info.Gender, info.EyeColor, info.HairColor, info.Publisher, info.SkinColor, info.Height, info.Weight);
            const statsModel = new CharacterStatsModel(stats.Intelligence, stats.Strength, stats.Speed, stats.Durability, stats.Power, stats.Combat);
            const characterModel = new CharacterModel(character.characterID, character.name, infoModel, statsModel, comics, powersModel);

            heroesData.push(characterModel);
            break;
        }
        return heroesData;
    }

}

const instance = new DataService();
module.exports = DataService;
