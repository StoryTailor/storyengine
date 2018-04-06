const path = require("path");
const config = require(path.join(__dirname, "../config/index.js"));
const RouteParser = require("./core/utils/RouteParser.js");
const Express = require("./core/Express.js");

class App {
    constructor(){
        this.express = new Express(config);
        this.routeParser = new RouteParser(this.express);
    }

    startEngine() {
        let scope = this;
        let config = scope.express.config;

        scope.applyRoutes(config.routes);
        scope.express.runServer();
    }

    applyRoutes(routes = []) {
        let scope = this;
        let app = scope.express.app;

        // base route
        app.get("/", (req, res) => {
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

        scope.routeParser.proceed();
    }
}

module.exports = new App();