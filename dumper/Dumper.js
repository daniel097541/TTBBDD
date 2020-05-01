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

const init = new Date().getTime();
const heroesData = service.craftHeroesData();
const end = new Date().getTime();

console.log(`Time to craft data: ${end - init}`);
console.log(heroesData);
