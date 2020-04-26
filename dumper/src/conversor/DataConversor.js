const lineByLine = require('n-readlines');
const FileType = require('../struct/FileType');
const Types = FileType.FILE_TYPE;
const Character = require('../../../commons/src/model/character/Character');
const CharacterInfo = require('../../../commons/src/model/character/CharacterInfo');
const CharacterStats = require('../../../commons/src/model/character/CharactersStats');
const CharacterToComic = require('../../../commons/src/model/character/CharacterToComic');
const Appearances = require('../../../commons/src/model/comic/Appearances');
const Comic = require('../../../commons/src/model/comic/Comic');
const SuperPowers = require('../../../commons/src/model/comic/SuperPowers');

class DataConversor {

    constructor() {
    }

    static getInstance() {
        return instance;
    }

    readFileLineByLine(fileName, lineConversor) {
        const liner = new lineByLine(`data/${fileName}`);
        let line;
        const result = [];
        let firstLine = true;
        let fieldNames = [];

        while (line = liner.next()) {
            const lineStr = line.toString('utf-8').replace('\r', '');
            if (firstLine) {
                fieldNames = lineStr.replace(/ /g, '').split(',');
                firstLine = false;
            }
            else {
                result.push(lineConversor(lineStr, fieldNames));
            }
        }
        return result;
    }

    convertCharactersData() {
        const fileName = Types.CHARACTERS;
        return this.readFileLineByLine(fileName, (line, fieldNames) => {
            const spitedData = line.split(',');
            return new Character(fieldNames, spitedData);
        });
    }

    convertCharactersInfoData() {
        const fileName = Types.CHATACTERS_INFO;
        return this.readFileLineByLine(fileName, (line, fieldNames) => {
            const spitedData = line.split(',');
            return new CharacterInfo(fieldNames, spitedData);
        });
    }

    convertCharacterStatsData() {
        const fileName = Types.CHARACTERS_STATS;
        return this.readFileLineByLine(fileName, (line, fieldNames) => {
            const spitedData = line.split(',');
            return new CharacterStats(fieldNames, spitedData);
        });
    }

    convertCharacterToComicData() {
        const fileName = Types.CHARACTERS_TO_COMICS;
        return this.readFileLineByLine(fileName, (line, fieldNames) => {
            const spitedData = line.split(',');
            return new CharacterToComic(fieldNames, spitedData);
        });
    }

    convertAppearancesData() {
        const fileName = Types.APPEARANCES;
        return this.readFileLineByLine(fileName, (line, fieldNames) => {
            const spitedData = line.split(',');
            return new Appearances(fieldNames, spitedData);
        });
    }

    convertComicData() {
        const fileName = Types.COMICS;
        return this.readFileLineByLine(fileName, (line, fieldNames) => {
            const spitedData = line.split(',');
            return new Comic(fieldNames, spitedData);
        });
    }

    convertSuperPowersData() {
        const fileName = Types.POWERS;
        return this.readFileLineByLine(fileName, (line, fieldNames) => {
            const spitedData = line.split(',');
            return new SuperPowers(fieldNames, spitedData);
        });
    }

    convertData() {
        const characters = this.convertCharactersData();
        const charactersInfo = this.convertCharactersInfoData();
        const charactersStats = this.convertCharacterStatsData();
        const characterToComic = this.convertCharacterToComicData();
        const appearances = this.convertAppearancesData();
        const comics = this.convertComicData();
        const powers = this.convertSuperPowersData();

        return {
            characters: characters,
            charactersInfo: charactersInfo,
            charactersStats: charactersStats,
            characterToComic: characterToComic,
            appearances: appearances,
            comics: comics,
            powers: powers
        };
    }
}

const instance = new DataConversor();
module.exports = DataConversor;
