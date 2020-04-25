const DataReader = require('./src/utils/DataReader');
const PresentationUtil = require('./src/utils/PresentationUtil');
const reader = DataReader.getInstance();
const presentationUtil = PresentationUtil.getInstance();

presentationUtil.initMsg();
reader.readFiles(`data/`, (fileName, content) => {

    // here do stuff with data
    console.log(fileName);

    }, (error) => {
    console.log(error);
});
