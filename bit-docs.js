var globFinder = require("./index");
var processJavaScript = require("./process/javascript");
module.exports = function(bitDocs){
    // register your tags
    bitDocs.register("finder", globFinder);

};
