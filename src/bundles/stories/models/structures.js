const Schema = require("mongoose").Schema;
const structure = require("./validation/structure.json");

/**
* Schema Structures
*/
class Structures extends Schema {
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

        this.add({
            children : {
                type: Schema.Types.Mixed,
                validate: {
                    validator: (elem) => {
                        if(Array.isArray(elem)){
                            if(elem.length > 0){
                                this._validateChildren(elem);
                            }
                        }
                        else {
                            throw new Error("The children format mismatch with the requested one");
                        }

                        return true;
                    }
                }
            }
        })
    }

    /**
     * Validation method to check the right format
     * of the children structure
     * 
     * @method  _validateChildren
     * @param  {Array}  elem    Children structure     
     * @return {void}
     */
    _validateChildren(elem) {
        for (let i in elem) {
            let child = elem[i];
            for(let field in child) {
                if(!structure.hasOwnProperty(field) && field !== "children") {
                    throw new Error(`Validation error for children structure : ${field} doesn\'t exists`);
                }
                else if(Array.isArray(child[field]) && field === "children") {
                    this._validateChildren(child[field]);
                }
            }
        }
    }
}

module.exports = new Structures();