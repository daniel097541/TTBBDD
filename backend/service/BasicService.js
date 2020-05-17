class BasicService {

    constructor() {
    }

    handleDaoResponse(resolve, reject, err, data) {
        if (err) {
            reject(err);
        } else {
            resolve(data);
        }
    }

    handleAmountResponse(resolve, reject, err, data) {
        if (err) {
            reject(err);
        } else {
            resolve({amount: data});
        }
    }
}

module.exports = BasicService;
