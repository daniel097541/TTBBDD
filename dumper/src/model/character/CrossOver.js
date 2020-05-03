const DynamicModel = require('../basic/DynamicModel');
const DC = 'Earth-616';
const marvel = 'New Earth';

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
