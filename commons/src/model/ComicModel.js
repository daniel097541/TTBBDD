const mongoose = require('mongoose');
const schema = require('./schema/ComicSchema');

module.exports = mongoose.model('Comic', schema);
