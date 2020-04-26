const PresentationUtil = require('../commons/src/utils/PresentationUtil');
const DataService = require('./src/service/DataService');
const presentationUtil = PresentationUtil.getInstance();
const service = DataService.getInstance();

presentationUtil.initMsg('TTBBDD - DUMPER');

const heroName = 'Captain America';

const hero = service.getCharacterByName(heroName);
const heroInfo = service.getCharacterInfo(heroName);
const heroStats = service.getCharacterStats(heroName);
const comicsWhereAppears = service.getComicsWhereCharacterAppears(heroName);
const superPowersOfHero = service.getSuperPowersOfCharacter(heroName);
const universeInfo = service.getCharacterAppearancesInfo(heroName);

console.log(hero);
console.log(heroStats);
console.log(heroInfo);
console.log(comicsWhereAppears.length);
console.log(superPowersOfHero);
console.log(universeInfo);
