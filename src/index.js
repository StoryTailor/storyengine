const path = require("path");
const config = require(path.join(__dirname, "../config/index.js"));
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
     * @return {void}
     */
    constructor(){
        this.express = new Express(config);
        this.mongoClient = new Mongo(config.mongo);
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

        return new Promise((resolve, reject) => {
            try {
                scope.mongoClient.connect()
                .then(() => {
                    return scope.express.runServer(); 
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