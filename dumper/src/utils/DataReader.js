const fs = require('fs');
class DataReader {

    constructor() {
    }

    static getInstance() {
        return instance;
    }

    readFiles(dirname, onFileContent, onError){
        fs.readdir(dirname, function(err, filenames) {
            if (err) {
                onError(err);
                return;
            }
            filenames.forEach(function(filename) {
                fs.readFile(dirname + filename, 'utf-8', function(err, content) {
                    if (err) {
                        onError(err);
                        return;
                    }
                    onFileContent(filename, content);
                });
            });
        });
    }
}

const instance = new DataReader();
module.exports = DataReader;
