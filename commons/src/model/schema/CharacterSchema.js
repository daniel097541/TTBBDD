const mongoose = require('mongoose');
const InfoSchema = require('./CharacterInfoSchema');
const StatsSchema = require('./CharacterStatsSchema');
const CrossOver = require('./CrossOverSchema');

const characterSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    info: InfoSchema,
    stats: StatsSchema,
    comics: [Number],
    powers: [String],
    crossovers: [CrossOver]
});

characterSchema.methods.getTotalStats = function () {
  return this.stats.getTotal();
};

module.exports = characterSchema;
