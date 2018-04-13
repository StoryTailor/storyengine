class AbstractService {
    constructor(mongo, schema, collectionName) {
        this.model = mongo.model(collectionName, schema);
    }

    get(filters) {
        let scope = this;
        filters = filers || {};

        return scope.model.find(filters);
    }

    getById(id) {
        return this.model.findById(id);
    }

    post(data) {
        return this.model.create(data);
    }

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