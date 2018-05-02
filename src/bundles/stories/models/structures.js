const Schema = require("mongoose").Schema;
const Base = require("./base/baseStructure.js");

/**
* Schema Structures
*/
class Structures extends Schema {
    constructor() {
        super({
            base : {
                type : Base
            },
            children : [Base]
        });
    }
}

module.exports = new Structures();