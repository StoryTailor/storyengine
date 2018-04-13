const AbstractController = require("../../../core/abstract/Controller.js");

class StoriesController extends AbstractController {
    constructor(service) {
        super(service);
    }
}

module.exports = StoriesController;