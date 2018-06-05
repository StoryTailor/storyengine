const AbstractController = require("../../../core/abstract/Controller.js");

/**
 * @module StoriesController
 * Uses the stories routes to manage its object
 */
class StoriesController extends AbstractController {
    constructor(service) {
        super(service);
    }
}

module.exports = StoriesController;