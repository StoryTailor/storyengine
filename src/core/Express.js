const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const RouteParser = require("./utils/RouteParser.js");
const EventEmitter = require("events");

/**
 * @module  Express
 * Contains the express app
 */
class Express extends EventEmitter {
    /**
     * @method  constructor
     * @param  {Object} config Configuration
     * @return {void}
     */
    constructor(config) {
        super();
        this.app = express();
        this.config = config;
        this.routeParser = RouteParser;
    }

    /**
     * Initiates the express app and its base
     * middlewares
     * @method  initApp
     * @return {Promise}
     */
    initApp() {
        let scope = this;
        let app = scope.app;
        let memoryStore = new session.MemoryStore();

        return new Promise((resolve, reject) => {
            try {
                app.use(bodyParser.json());
                app.use(cors());
                app.use(session({
                    secret: 'gwak.fr',
                    resave: false,
                    saveUninitialized: true,
                    store: memoryStore
                }));

                resolve(app);
            }
            catch(error) {
                reject(error);
                throw new Error(error);
            }
        })
    }

    /**
     * Add the routes via RouteParser and starts the server
     * @method  runServer
     * @return {Promise}
     */
    runServer() {
        let scope = this;
        let config = scope.config;

        return new Promise((resolve, reject) => {
            scope.initApp()
            .then((app) => {
                return scope.routeParser.proceed(app, config.routes);
            })
            .then((app) => {
                app.listen(config.global.port, () => console.log(`Running on port ${config.global.port}`));
                resolve(app);
            })
            .catch((error) => {
                reject(error);
            })
        })
    }
}

module.exports = Express;