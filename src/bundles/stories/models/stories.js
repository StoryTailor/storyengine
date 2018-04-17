const Schema = require("mongoose").Schema;

/**
* Schema Contacts
* @module App.Models.Contacts
*/
class Stories extends Schema {
    constructor() {
        super({
            name : {
                type : String,
                required : true
            }
        });
    }
}

module.exports = new Stories();
