const AbstractService = require("../../../core/abstract/Service.js");

class StoriesService extends AbstractService {
    constructor(mongo, schema, collectionName) {
        super(mongo, schema, collectionName);
    }
}

module.exports = StoriesService;