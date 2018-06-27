/**
 * @module  AbstractService
 */
class AbstractService {
    constructor(mongo, schema, collectionName) {
        this.model = mongo.model(collectionName, schema);
    }

    /**
     * Initiate the service with the
     * dependency injector
     * 
     * @param  {Object} provider Provider
     * @return {void}
     */
    init(provider) {
        this.provider = provider;
    }

    /**
     * Get all objects from model
     *
     * @method  get
     * @param  {Object} filters Filters
     * @return {Promise}
     */
    get(filters) {
        let scope = this;
        filters = filters || {};

        return scope.model.find(filters);
    }

    /**
     * Get an object by its objectid
     *
     * @method  getById
     * @param  {String} id ObjectId
     * @return {Promise}
     */
    getById(id) {
        return this.model.findById(id);
    }

    /**
     * Insert a new object from json data
     *
     * @method  post
     * @param  {Object} data Json data
     * @return {Promise}
     */
    post(data) {
        return this.model.create(data);
    }

    /**
     * Update an object by passing new data
     *
     * @method  
     * @param  {String} id      ObjectId
     * @param  {Object} data    Json data 
     * @return {Promise}
     */
    put(id, data) {
        let scope = this;
        return this.model.findById(id)
        .exec()
        .then((element) => {
            Object.assign(element, data);
            return element.save();
        })
        .catch((error) => {
            return Promise.reject(error);
        })
    }

    /**
     * Delete a specified object by its id
     *
     * @method  delete
     * @param  {String} id ObjectId
     * @return {Promise}
     */
    delete(id) {
        return this.getById(id)
        .exec()
        .then((element) => {
            return element.remove();
        })
        .catch((error) => {
            return Promise.reject(error);
        })
    }
}

module.exports = AbstractService;