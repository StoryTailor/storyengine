const Schema = require("mongoose").Schema;
const Structure = require("./structures.js");

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
            },
            // TODO
            // Custom field Mongo
            reference : {
                type : String,
                required : true
            },
            genres : {
                type: [
                    String
                ],
                required : true
            },
            author : {
                type : String
            },
            thumb : {
                type : String
            },
            structure : {
                type : Structure
            }
        });
    }
}

module.exports = new Stories();
