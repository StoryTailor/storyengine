const path = require("path");
const config = require(path.join(__dirname, "../config"));
const Express = require("./core/Express.js");
const Mongo = require("./core/Mongo.js");

/**
 * @module  App
 * Class which creates and starts the express app
 */
class App {
    /**
     * Instanciates the express app
     * 
     * @method  constructor
     * @param {Object} bundles App bundles
     * @return {void}
     */
    constructor(){
        let bundles = require("../src/bundles");

        this.express = new Express(config);
        this.mongoClient = new Mongo(config.mongo);
        this.bundles = bundles;
    }

    initiateBundles() {
        let scope = this;

        for(let i in scope.bundles) {
            let bundle = scope.bundles[i],
                config = bundle.config;
            bundle.service = new bundle.service(scope.mongoClient, bundle.model, config.global.collectionName);
            bundle.controller = new bundle.controller(bundle.service);
        }
    }

    /**
     * Starts the express server and returns
     * a promise resolving the app
     * 
     * @method  startEngine
     * @return {Promise}
     */
    startEngine() {
        let scope = this;
        let config = scope.express.config;
        scope.initiateBundles();

        return new Promise((resolve, reject) => {
            try {
                scope.mongoClient.connect()
                .then(() => {
                    return scope.express.runServer(scope.bundles); 
                })
                .then((engine) => {
                    resolve(engine);
                });
            }
            catch(error){
                reject(error);
                throw new Error(error);
            }
        })

    }
}

module.exports = new App();