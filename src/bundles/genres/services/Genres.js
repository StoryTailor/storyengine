const AbstractService = require("../../../core/abstract/Service.js");

/**
 * @module  StoriesService
 * Manages the stories objects
 */
class GenresService extends AbstractService {
    constructor(mongo, schema, collectionName) {
        super(mongo, schema, collectionName);
    }
}

module.exports = GenresService;