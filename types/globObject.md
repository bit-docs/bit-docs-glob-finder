@parent bit-docs-glob-finder/types
@typedef {{}} bit-docs-glob-finder/types/globObject GlobObject

An options object that configures the behavior of
[bit-docs-glob-finder/index]. It supports all of the options object of
[node-glob](https://github.com/isaacs/node-glob) plus a pattern option that
is used as `node-glob`'s first argument. Only the most commonly used options
are specified below:

  @option {String} pattern A [minmatch](https://github.com/isaacs/minimatch)
  pattern. The following matches all `.js` files:

      "**/*.js"

  @option {String} [cwd] The current working directory in which to search.
  Defaults to process.cwd()

  @option {String} [ignore] A pattern to ignore. For example, to ignore
  everything in node_modules:

      {
        pattern: "**/*.js",
        ignore: "node_modules/**/*"
      }
