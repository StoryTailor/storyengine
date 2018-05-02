const express = require("express");

/**
 * @module  RouteParser
 * Add the routes to the express app
 */
class RouteParser {
    /**
     * @method constructor
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
    proceed(app, bundles) {
        let scope = this;

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

                // Assign routes to controller methods
                for(let i in bundles) {
                    let controller = bundles[i].controller,
                        routes = bundles[i].config.routes;

                    for(let r in routes) {
                        if(typeof controller[r] !== "undefined") {
                            let method = routes[r].method.toLowerCase();
                            app[method](routes[r].url, (req, res) => {
                                controller[r](req, res);
                            });
                        }
                    }
                }

                resolve(app);
            }
            catch(error) {
                reject(error);
                throw new Error(error);
            }
        });
    }
}

module.exports = new RouteParser();