var glob = require("glob");
var _ = require("lodash");
var minimatch = require("minimatch");
var fs = require('fs');
var path = require('path');

/**
 * @parent bit-docs-glob-finder/modules
 * @module {function} bit-docs-glob-finder/index
 *
 * @signature `find.files(siteConfig)`
 *
 * @param {Object} siteConfig Options that configure the behavior of the files
 * that will be processed.
 *
 * @option {String|bit-docs-glob-finder/types/globObject} glob The glob option
 * either specifies a [minimatch](https://github.com/isaacs/minimatch) pattern
 * like:
 *
 *     find.files({glob: "*.js"})
 *
 * Or a [bit-docs-glob-finder/types/globObject] that specifies the a
 * [minimatch](https://github.com/isaacs/minimatch) pattern and other
 * siteConfig like:
 *
 *     find.files({
 *       glob: {
 *         pattern: "*.js",
 *         cwd: __dirname
 *       }
 *     })
 *
 * @return {bit-docs/types/FileEventEmitter} An event emitter that emits events
 * for matched files.
 */
module.exports = function(siteConfig){
	var pattern;
	var globOptions;

	if(typeof siteConfig.glob === "string"){
		var pattern = siteConfig.glob;
		globOptions = {};
	} else {
		pattern = siteConfig.glob.pattern;
		globOptions = _.extend({}, siteConfig.glob);
		delete globOptions.pattern;
	}
	if(!globOptions.cwd && siteConfig.cwd) {
		globOptions.cwd = siteConfig.cwd;
	}

	globOptions.nodir = true;
	var glb = new glob.Glob(pattern, globOptions);
	var ignore = siteConfig.glob.ignore;

	if(typeof ignore === "string") {
		ignore = [ignore];
	}
	if(ignore) {
		// weave in ignore behavior
		var oldOn = glb.on;
		glb.on = function(event, listener) {
			if(event === "match") {
				var handler = function(filepath){
					var dir = path.dirname(filepath);
					if( fs.lstatSync(dir).isSymbolicLink() && (globOptions.follow === false) ) {
						console.warn("WARNING!!\n" + 'Detected symbolic link without `"follow": true` glob setting for ' + dir + "\n");
					}
					for(var i = 0; i < ignore.length; i++) {
						if( minimatch(filepath, ignore[i]) ) {
							return;
						}
					}
					listener.apply(this, arguments);
				};

				return oldOn.call(this, event, handler);
			} else {
				return oldOn.apply(this, arguments);
			}
		};
	}


	return glb;
};
