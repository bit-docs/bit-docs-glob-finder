var finder = require("./index"),
	assert = require("assert"),
	path = require("path");


describe("bid-docs-glob-finder",function(){

	it("is able to ignore", function(done){
		var fileEventEmitter = finder({
			glob: {
				pattern: "**/*.{js,md}",
				cwd: path.join(__dirname,"test"),
				ignore: "node_mods/**/*"
			}
		});
		var matches = 0;
		fileEventEmitter.on("match",function(src){
			matches ++;
			if(src.indexOf("node_mods") >= 0) {
				assert.ok(false, "Got something that should have been ignored - "+src);
			}

		});
		fileEventEmitter.on("end",function(){
			assert.equal(matches, 5, "5 files found");
			done();
		});
	});

});
