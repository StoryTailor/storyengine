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
                required : true,
                unique : true
            },
            reference : {
                type : String,
                required : true
            },
            genres : [{ 
                type: Schema.Types.ObjectId, 
                ref: 'genres' 
            }],
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
