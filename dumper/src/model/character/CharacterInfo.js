const DynamicModel = require('../basic/DynamicModel');

class CharacterInfo extends DynamicModel {

    constructor(fieldNames, fields) {
        super(fieldNames, fields);
    }
}

module.exports = CharacterInfo;
