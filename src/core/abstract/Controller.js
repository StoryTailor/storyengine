/**
 * @module AbstractController
 */
class AbstractController {
    /**
     * Constructor
     *
     * @method  constructor
     * @param  {Object} service Service
     */
    constructor(service) {
        this.service = service;
        this.errors = {
            NotFoundError : 404,
            ValidationError : 400,
            CastError : 400,
            Forbidden : 403,
            MongoError : 400
        }
    }

    /**
     * Get all the objects
     *
     * @method  get
     * @param  {Object} req Request
     * @param  {Object} res Response
     */
    get(req, res) {
        let scope = this;
        scope.service
        .get(req.query.filters)
        .then((data) => {
            res.json({
                status: "success",
                data
            });
        })
        .catch((error) => {
            _checkError(error, res);
        });
    }

    /**
     * Get an object by its objectid
     *
     * @method  getById
     * @param  {Object} req Request 
     * @param  {Object} res Response
     */
    getById(req, res) {
        let scope = this;
        scope.service.getById(req.params.id)
        .then((data) => {
            res.json({
                status: "success",
                data
            });
        })
        .catch((error) => {
            _checkError(error, res);
        });
    }

    /**
     * Insert a new object from json data
     *
     * @method  post
     * @param  {Object} req Request 
     * @param  {Object} res Response
     */
    post(req, res) {
        let scope = this;
        scope.service.post(req.body)
        .then((data) => {
            res.json({
                status: "success",
                data
            });
        })
        .catch((error) => {
            _checkError(error, res);
        });
    }

    /**
     * Update an object by passing new data
     *
     * @method  put
     * @param  {Object} req Request 
     * @param  {Object} res Response
     */
    put(req, res) {
        let scope = this;

        scope.service.put(req.params.id, req.body)
        .then((data) => {
            res.json({
                status: "success",
                data
            });
        })
        .catch((error) => {
            _checkError(error, res);
        });
    }

    /**
     * Delete a specified object by its id
     *
     * @method  delete
     * @param  {Object} req Request 
     * @param  {Object} res Response
     */
    delete(req, res) {
        let scope = this;

        scope.service.delete(req.params.id)
        .then((data) => {
            res.json({
                status: "success",
                data
            })
        })
        .catch((error) => {
            _checkError(error, res);
        });
    }

    /**
     * Check the response error and returns it if 
     * already exists, otherwise returns 500
     *
     * @method  _checkError
     * @param  {Object} error   Error
     * @param  {Object} res     Response
     */
    _checkError(error, res){
        let scope = this;
        if(scope.errors[error.name]){
            res.status(scope.errors[error.name]);
        }else {
            res.status(500);
        }
        res.json({ 
            status : "error",
            detail : error 
        });
    }
}

module.exports = AbstractController;