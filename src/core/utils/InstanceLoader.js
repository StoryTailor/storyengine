/**
 * @module  InstanceLoader
 */
class InstanceLoader {
	constructor() {
		this.modules = new Array();
	}

	/**
	 * Register the given instance with its name
	 *  
	 * @param  {String} name     Name of the instance
	 * @param  {Object} instance Instance to register
	 * @return {void}
	 */
	register(name, instance) {
		let instanceData = {
			name,
			instance
		};

		this.modules.push(instanceData);
	}

	/**
	 * Load the instance with the given name,
	 * and throws an error if not found
	 *
	 * @method  load
	 * @param  {String} resourceName Resource name
	 * @return {Object} the expected resource
	 */
	load(resourceName) {
		try {
			let resource = this.modules.find((module) => {
				return module.name === resourceName;
			});

			if(typeof resource !== "undefined") {
				return resource.instance;
			}
		}
		catch(error) {
			throw new Error(error);
		}
	}
}

module.exports = new InstanceLoader();