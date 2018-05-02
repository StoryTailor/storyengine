const Schema = require("mongoose").Schema;

/**
* Schema BaseStructure
*/
class BaseStructure extends Schema {
    constructor() {
        super({
            content : {
                type : String,
                required : true
            },
            choices : [{
                label : {
                    type : String,
                    required : true
                },
                subStep : {
                    type : Number,
                    required : true
                }
            }],
            step : {
                type : Number,
                required : true
            },
            background : {
                type : String
            }
        });
    }
}

module.exports = new BaseStructure();
