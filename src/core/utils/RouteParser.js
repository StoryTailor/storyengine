const express = require("express");

/**
 * @module  RouteParser
 * Add the routes to the express app
 */
class RouteParser {
    /**
     * @method constructor
     * @return {void}
     */
    constructor() {}

    /**
     * Parse all the routes and add them to the
     * express app
     * 
     * @method  proceed
     * @param  {Object} app     Express app
     * @param  {Array} routes   Routes
     * @return {Promise}
     */
    proceed(app, routes) {
        let scope = this;
        let configRoutes = routes;

        return new Promise((resolve, reject) => {
            try {
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

                // TODO
                configRoutes.forEach((route) => {
                    let action = route.action;
                    app.use(route.url, action);
                });

                resolve(app);
            }
            catch(error) {
                reject(error);
                throw new Error(error);
            }
        })
    }
}

module.exports = new RouteParser();