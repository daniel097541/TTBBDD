class DynamicModel {
    constructor(fieldNames, fieldValues) {
        for (let i = 0; i < fieldNames.length; i++) {
            const name = fieldNames[i];
            const value = fieldValues[i];
            if (value && value !== '-' && value !== '') {
                this[name] = value;
            }
            else{
                this[name] = null;
            }
        }
    }
}

module.exports = DynamicModel;
