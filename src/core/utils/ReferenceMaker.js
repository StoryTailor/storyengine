const md5 = require("md5");

/** 
 * @module  ReferenceMaker
 * Generates a unique story reference
 */
class ReferenceMaker {
    constructor() {}

    /**
     * Generates a unique reference for a
     * given story
     * 
     * @method  proceed
     * @param  {Object} story Story
     * @return {Promise}
     */
    proceed(story) {
        return new Promise((resolve, reject) => {
            let time = Date.now() / 1000,
                baseRef = [
                    story.name,
                    story.user,
                    time
                ].join(".");

            try {
                let hexRef = Buffer.from(baseRef, 'utf8').toString('hex'),
                    ref = md5(hexRef);
                story.reference = ref;
                
                resolve(story);
            }
            catch(error) {
                reject(error);
                throw new Error(error);
            }
        })
    }
}

module.exports = new ReferenceMaker();