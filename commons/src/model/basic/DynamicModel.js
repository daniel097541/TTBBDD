class DynamicModel {
    constructor(fieldNames, fieldValues) {
        for(let i = 0; i < fieldNames.length; i++){
            const name = fieldNames[i];
            this[name] = fieldValues[i];
        }
    }
}

module.exports = DynamicModel;
