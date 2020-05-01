class CharacterModel {

    constructor(id, name, info, stats, comics, powers) {
        this.id = id;
        this.name = name;
        this.info = info;
        this.stats = stats;
        this.comics = comics;
        this.powers = powers;
    }

    getTotalStats(){
        return this.stats.getTotal();
    }
}
module.exports = CharacterModel;
