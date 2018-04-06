const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");

class Express {
    constructor() {
        this.app = express();
        this.server = http.createServer(express);
        this.initApp();
    }

    initApp() {
        let scope = this;

        scope.app.use(bodyParser.json());
        scope.app.use(cors());
    }

    runServer(config) {
        let scope = this;

        scope.applyRoutes(config.routes);
        scope.server.listen(config.port);
    }

    applyRoutes(routes = []) {
        let scope = this;

        // base route
        scope.app.get("/", (req, res) => {
            res.json({
                data: {
                    title: "Story Engine",
                    description: "A Node.js based engine to create non-linear stories",
                    author: "Nythe",
                    license: "MIT",
                    readme: "https://github.com/StoryTailor/storyengine#readme"
                }
            });
        });
    }
}

module.exports = new Express();