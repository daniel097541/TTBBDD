class CharacterStatsModel {

    constructor(int, str, spd, dur, pow, com) {
        this.int = int;
        this.str = str;
        this.spd = spd;
        this.dur = dur;
        this.pow = pow;
        this.com = com;
    }

    getTotal(){
        return this.int + this.str + this.spd + this.dur + this.pow + this.com;
    }
}
module.exports = CharacterStatsModel;
