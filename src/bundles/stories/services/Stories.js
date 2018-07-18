const AbstractService = require("../../../core/abstract/Service.js");

/**
 * @module  StoriesService
 * Manages the stories objects
 */
class StoriesService extends AbstractService {
    constructor(mongo, schema, collectionName) {
        super(mongo, schema, collectionName);
    }

    get(filters) {
        filters = filters || {};
        let promises = [];

        return new Promise((resolve, reject) => {
            this.model.find(filters)
            .then((stories) => {
                stories.forEach((story) => {
                    promises.push(this._retrieveGenres(story));
                });

                Promise.all(promises)
                .then((fullStories) => {
                    resolve(fullStories);
                })
                .catch((error) => {
                    reject(error);
                });
            })
            .catch((error) => {
                reject(error);
            });
        });
    }

    getById(id) {
        return this.model.findById(id)
        .then((story) => {
            return this._retrieveGenres(story); 
        })
        .catch((error) => {
            Promise.reject(error);
        });
    }

    _retrieveGenres(story) {
        let genresService = this.provider.load("service.genres"),
            promises = [];

        return new Promise((resolve, reject) => {
            story.genres.forEach((genreId) => {
                promises.push(genresService.getById(genreId));
            });

            Promise.all(promises)
            .then((genresObj) => {
                story.genres = genresObj;
                resolve(story);
            })
            .catch((error) => {
                reject(error);
            });
        });
    }
}

module.exports = StoriesService;