const DynamicModel = require('../basic/DynamicModel');

class Character extends DynamicModel {
    constructor(fieldNames, fields) {
        super(fieldNames, fields);
    }
}

module.exports = Character;
