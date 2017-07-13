/**
 * @parent plugins
 * @module {function} bit-docs-glob-finder
 * @group bit-docs-glob-finder/modules modules
 * @group bit-docs-glob-finder/types types
 *
 * @description Finds files for passing to the bit-docs processor.
 *
 * @body
 *
 * Registers a [bit-docs-glob-finder/index glob finder] onto the `finder` hook.
 */
var globFinder = require("./index");
module.exports = function(bitDocs){
    bitDocs.register("finder", globFinder);
};
