const DataManager = require('../manager/DataManager');

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

}

const instance = new DataService();
module.exports = DataService;
