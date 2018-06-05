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
            if(story.reference !== req.body.reference) {
            	res.json({
            		status : "error",
            		detail : "References don't match. Update has been blocked"
            	});
            }
            super.put(req, res);
        });
    }
}

module.exports = StoriesController;