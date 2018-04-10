const path = require("path");
const config = require(path.join(__dirname, "../config/index.js"));
const Express = require("./core/Express.js");
/**
 * @module  App
 * Class which creates and starts the express app
 */
class App {
    /**
     * Instanciates the express app
     * @method  constructor
     * @return {void}
     */
    constructor(){
        this.express = new Express(config);
    }

    /**
     * @method  startEngine
     * Starts the express server and returns
     * a promise resolving the app
     * @return {Promise}
     */
    startEngine() {
        let scope = this;
        let config = scope.express.config;

        return new Promise((resolve, reject) => {
            try {
                scope.express.runServer()
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