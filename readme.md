## bit-docs-glob-finder


Given a `siteConfig`, returns an EventEmitter that fires
"match" events with the file path and the source.

```js
var finder = require("bit-docs-glob-finder");

finder({
    glob: {
        pattern: "**/*.{js,md}",
        cwd: path.join(__dirname,"test"),
        ignore: "node_mods/**/*"
    }
});
```
