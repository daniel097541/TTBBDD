const PresentationUtil = require('../commons/src/utils/PresentationUtil');
const DataConversor = require('./src/conversor/DataConversor');
const presentationUtil = PresentationUtil.getInstance();
const conversor = DataConversor.getInstance();

const init = new Date().getTime();
presentationUtil.initMsg('TTBBDD - DUMPER');
const convertedData = conversor.convertData();
const end = new Date().getTime();

console.log(`Time to dump data: ${end - init}`);
