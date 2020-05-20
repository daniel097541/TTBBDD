const DynamicModel = require('../basic/DynamicModel');
const DC = 'New Earth';
const marvel = 'Earth-616';

class CrossOver extends DynamicModel {

    constructor(fieldNames, fieldValues) {
        super(fieldNames, fieldValues);
        let nameDivisions = this.Name
            .match(/\((.*?)\)/g)

        if (nameDivisions) {
            nameDivisions = nameDivisions.map(n => n.replace(/\(/g, '').replace(/\)/g, ''));
            nameDivisions.forEach(nd => this.Name = this.Name.replace(`(${nd})`, '').trim());
            this.extraInfo = this.getExtraInfo(nameDivisions);
        }
    }

    getExtraInfo(nameDivisions) {
        if (nameDivisions.length > 0) {
            for (const division of nameDivisions) {
                if (!division.includes(DC) && !division.includes(marvel)) {
                    return division;
                }
            }
        }
        return null;
    }
}

module.exports = CrossOver;
