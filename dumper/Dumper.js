const PresentationUtil = require('../commons/src/utils/PresentationUtil');
const DataService = require('./src/service/DataService');
const presentationUtil = PresentationUtil.getInstance();
const service = DataService.getInstance();
const MongoDBDAO = require('../commons/src/dao/MongoDBDAO');
presentationUtil.initMsg('TTBBDD - DUMPER');

const heroName = 'Captain America';
const dao = MongoDBDAO.getInstance();

const hero = service.getCharacterByName(heroName);
const heroInfo = service.getCharacterInfo(heroName);
const heroStats = service.getCharacterStats(heroName);
const comicsWhereAppears = service.getComicsWhereCharacterAppears(heroName);
const superPowersOfHero = service.getSuperPowersOfCharacter(heroName);
const universeInfo = service.getCharacterAppearancesInfo(heroName);

const heroesData = service.craftHeroesData();
console.log(heroesData);
