const mongoose = require('mongoose');

const StatsSchema = new mongoose.Schema({
    intelligence: Number,
    strength: Number,
    speed: Number,
    durability: Number,
    power: Number,
    combat: Number
});

StatsSchema.methods.getTotal = function () {
    return this.intelligence + this.combat + this.durability + this.power + this.speed + this.strength;
};

module.exports = StatsSchema;
