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
        });
    }

    /**
     * Check the match between base reference and 
     * new reference, and the consistency of the
     * attributes used to generate it.
     * 
     * @method  check
     * @param   {String} baseRef Base reference
     * @param   {Object} newStory New story
     * @return {Promise}
     */
    check(baseRef, newStory) {
        let errMsg = "References don't match. Update has been blocked";

        return new Promise((resolve, reject) => {
            if(baseRef !== newStory.reference) {
                reject(errMsg);
            }
            this.proceed(newStory)
            .then((data) => {
                if(data.reference === baseRef) {
                    resolve(newStory);
                }
                else {
                    reject(errMsg);
                }
            })
        });
    }
}

module.exports = new ReferenceMaker();