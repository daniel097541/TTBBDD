const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    alignment: String,
    gender: String,
    eye_color: String,
    hair_color: String,
    publisher: String,
    skin_color: String,
    height: Number,
    weight: Number
});
