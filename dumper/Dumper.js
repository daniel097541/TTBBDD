const DataReader = require('./src/utils/DataReader');
const PresentationUtil = require('../commons/src/utils/PresentationUtil');

const reader = DataReader.getInstance();
const presentationUtil = PresentationUtil.getInstance();

presentationUtil.initMsg('TTBBDD - DUMPER');
reader.readFiles(`data/`, (fileName, content) => {

    // here do stuff with data
    console.log(fileName);

    }, (error) => {
    console.log(error);
});
