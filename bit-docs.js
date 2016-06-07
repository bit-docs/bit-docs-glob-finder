var globFinder = require("./index");
module.exports = function(bitDocs){
    // register your tags
    bitDocs.register("finder", globFinder);

};
