const DataConversor = require('../conversor/DataConversor');

class DataManager {

    static getInstance() {
        return instance;
    }

    constructor() {
        this.conversor = DataConversor.getInstance();
    }

    // lazy loader
    getData() {
        if (!this.data) {
            this.loadData();
        }
        return this.data;
    }

    loadData() {
        console.log(`Lazy loading data from csv files!`);
        const start = new Date().getTime();
        this.data = this.conversor.convertData();
        const end = new Date().getTime();
        console.log(`Time to lazy load data: ${end - start} ms`)
    }
}

const instance = new DataManager();
module.exports = DataManager;
