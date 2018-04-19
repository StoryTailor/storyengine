const Mongoose = require("mongoose").constructor;

/**
 * @module  Mongo
 * Reuse the Mongoose object
 */
class Mongo extends Mongoose {
    /**
     * Constructor
     * 
     * @method  constructor
     * @param  {Object} config Config
     */
    constructor(config) {
        super();
        this.config = config;
    }

    /**
     * Use the parent method to connect to the
     * MongoDB server
     * 
     * @method  connect
     * @return {Promise}
     */
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