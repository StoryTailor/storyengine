class AbstractController {
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