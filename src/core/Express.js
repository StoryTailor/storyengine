const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");

class Express {
    constructor(config) {
        this.app = express();
        this.config = config;
        this.server = http.createServer(express);
        this.initApp();
    }

    initApp() {
        let scope = this;

        scope.app.use(bodyParser.json());
        scope.app.use(cors());
    }

    runServer() {
        let scope = this;
        let config = scope.config;

        scope.server.listen(config.global.port);
        console.log(`Running on port ${config.global.port}`);
    }
}

module.exports = Express;