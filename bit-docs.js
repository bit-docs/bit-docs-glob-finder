/**
 * @module {function} bit-docs-glob-finder
 * @parent plugins
 *
 * @description Finds files for passing to the bit-docs processor.
 *
 * @body
 *
 * TBD
 */
var globFinder = require("./index");
module.exports = function(bitDocs){
    // register your tags
    bitDocs.register("finder", globFinder);

};
