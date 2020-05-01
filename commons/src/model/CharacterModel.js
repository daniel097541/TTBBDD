const mongoose = require('mongoose');
const schema = require('./schema/CharacterSchema');

module.exports = mongoose.model('Character', schema);
