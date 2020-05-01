const PresentationUtil = require('../commons/src/utils/PresentationUtil');
const DataService = require('./src/service/DataService');
const presentationUtil = PresentationUtil.getInstance();
const service = DataService.getInstance();

presentationUtil.initMsg('TTBBDD - DUMPER');


const init = new Date().getTime();
service.dumpData(() => {
    const end = new Date().getTime();
    console.log(`Time to dump all data: ${end - init} ms`);
    service.disconnect();
});

