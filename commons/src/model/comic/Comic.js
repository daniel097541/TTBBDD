const DynamicModel = require('../basic/DynamicModel');

class Comic extends DynamicModel {

    constructor(fieldNames, fieldValues) {
        super(fieldNames, fieldValues);
    }
}

module.exports = Comic;
