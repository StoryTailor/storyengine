class RouteParser {
	constructor(app) {
		this.app = app;
	}

	proceed() {
		let scope = this;
		let config = scope.app.config;
		let routes = config.routes;

		routes.forEach((route) => {
			let action = route.action;
			scope.app.use(route.url, action);
		});
	}
}

module.exports = RouteParser;