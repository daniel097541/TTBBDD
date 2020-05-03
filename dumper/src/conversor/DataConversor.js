const lineByLine = require('n-readlines');
const FileType = require('../struct/FileType');
const Types = FileType.FILE_TYPE;
const Character = require('../model/character/Character');
const CharacterInfo = require('../model/character/CharacterInfo');
const CharacterStats = require('../model/character/CharactersStats');
const CharacterToComic = require('../model/character/CharacterToComic');
const CrossOver = require('../model/character/CrossOver');
const Comic = require('../model/comic/Comic');
const SuperPowers = require('../model/comic/SuperPowers');

class DataConversor {

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
            let lineStr = line.toString('utf-8').replace('\r', '');
            if (firstLine) {
                fieldNames = lineStr.split(',');
                fieldNames = fieldNames.map(fn => fn.replace(/ /g, '').trim());
                firstLine = false;
            } else {
                if (lineStr.includes('"')) {

                    lineStr.match(/"(.*?)"/g).forEach(function (val) {
                        const replaced = val.replace(/,/g, '');
                        lineStr = lineStr.replace(val, replaced);
                        lineStr = lineStr.replace(/"/g, '');
                    });
                }
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

    convertCrossoversInfoData() {
        const fileName = Types.CHARACTER_UNIVERSE;
        return this.readFileLineByLine(fileName, (line, fieldNames) => {
            const spitedData = line.split(',');
            return new CrossOver(fieldNames, spitedData);
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
        const crossOvers = this.convertCrossoversInfoData();
        const comics = this.convertComicData();
        const powers = this.convertSuperPowersData();

        return {
            characters: characters,
            charactersInfo: charactersInfo,
            charactersStats: charactersStats,
            characterToComic: characterToComic,
            crossOvers: crossOvers,
            comics: comics,
            powers: powers
        };
    }
}

const instance = new DataConversor();
module.exports = DataConversor;
