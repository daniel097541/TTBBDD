const mongoose = require('mongoose');
module.exports = new mongoose.Schema({
    identity: String,
    alignment: String,
    status: String,
    appearances: Number,
    firstAppearance: Date,
    year: Number,
    universe: String,
    extraInfo: String
});
