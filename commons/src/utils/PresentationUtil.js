const figlet = require('figlet');

class PresentationUtil {

    constructor() {
    }

    static getInstance(){
        return instance;
    }

    initMsg(msg) {
        figlet(msg, function (err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            console.log(data)
        });
    }
}

const instance = new PresentationUtil();
module.exports = PresentationUtil;
