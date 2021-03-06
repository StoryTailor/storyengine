const AbstractController = require("../../../core/abstract/Controller.js");
const refMaker = require("../../../core/utils/ReferenceMaker.js");

/**
 * @module StoriesController
 * Uses the stories routes to manage its object
 */
class StoriesController extends AbstractController {
    constructor(service) {
        super(service);
    }

    /**
     * Initiate the controller with the
     * dependency injector, and sets the
     * genres service
     *
     * @method  init
     * @param  {Object} provider Provider
     * @return {void}
     */
    init(provider) {
        super.init(provider);
        this.genresService = provider.load("service.genres");
    }

    /**
     * Insert a new story from json data
     * and generate its reference
     *
     * @method  post
     * @param  {Object} req Request 
     * @param  {Object} res Response
     */
    post(req, res) {
        delete req.body.reference;

        refMaker.proceed(req.body)
        .then((story) => {
            req.body = story;
            super.post(req, res);
        })
        .catch((err) => {
            res.json({
                status : "error",
                detail : err
            });
        });
    }

    /**
     * Update a story by passing new data
     * and check the consistency of the
     * given reference
     *
     * @method  put
     * @param  {Object} req Request 
     * @param  {Object} res Response
     */
    put(req, res) {
        this.service.getById(req.params.id)
        .then((story) => {
            return refMaker.check(story.reference, req.params.body);
        })
        .then(() => {
            super.put(req, res);
        })
        .catch((err) => {
            res.json({
                status : "error",
                detail : err
            });
        });
    }
}

module.exports = StoriesController;
