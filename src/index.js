const path = require("path");
const config = require(path.join(__dirname, "../config"));
const Express = require("./core/Express.js");
const Mongo = require("./core/Mongo.js");
const InstanceLoader = require("./core/utils/InstanceLoader.js");

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
        this.provider = InstanceLoader;
    }

    /**
     * Browse all the bundles and create the matching
     * services and controllers
     * 
     * @method  initiateBundles
     */
    initiateBundles() {
        let scope = this;

        // Create the controllers and services, and register them in the provider
        for(let i in scope.bundles) {
            let bundle = scope.bundles[i],
                config = bundle.config,
                serviceName = `service.${config.global.collectionName}`,
                controllerName = `controller.${config.global.collectionName}`;
            bundle.service = new bundle.service(scope.mongoClient, bundle.model, config.global.collectionName);
            this.provider.register(serviceName, bundle.service);
            bundle.controller = new bundle.controller(bundle.service);
            this.provider.register(controllerName, bundle.controller);
        }

        // Affect the provider to the controllers and services
        for(let i in scope.bundles) {
            let bundle = scope.bundles[i];

            bundle.service.init(this.provider);
            bundle.controller.init(this.provider);
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