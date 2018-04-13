const Mongoose = require("mongoose").constructor;

class Mongo extends Mongoose {
    constructor(config) {
        super();
        this.config = config;
    }

    connect() {
        let scope = this;
        return super.connect(scope.config.url, scope.config.options)
        .then(() => {
            console.log(`[INFO] => Client connected to MongoDB server at ${this.config.url}`);
            return Promise.resolve();
        })
        .catch(() => {
            console.log("[ERR] => Unable to connect to MongoDB server.");
            return Promise.reject();
        });
    }
}

module.exports = Mongo;