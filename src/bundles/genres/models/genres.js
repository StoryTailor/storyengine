const Schema = require("mongoose").Schema;

/**
* Schema Contacts
* @module App.Models.Contacts
*/
class Genres extends Schema {
    constructor() {
        super({
            label : {
                type : String,
                required : true
            },
            description : {
                type : String,
                required : true
            }
        });
    }
}

module.exports = new Genres();
