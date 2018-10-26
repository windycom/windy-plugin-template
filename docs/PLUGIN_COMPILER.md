# Windy Plugin Compiler
Our custom compiler is based on [RIOT JS compiler](https://github.com/riot/compiler).

```sh
$ node ./compiler.js --help
Usage: compiler [options]

Options:
  -b, --build      Build the plugin in required directory (default src)
  -w, --watch      Build plugin and watch file changes in required directory
  -s, --serve      Serve dist directory on port 9999
  -p, --prompt     Show command line promt with all the examples
  -t, --transpile  Transpile your code with Babel
  -h, --help       output usage information
```

Feel free to hack it.

It compiles your source files into single file `dest/plugin.js`. Run the compiler `node ./compiler.js --help` for CLI options.

Feel free to use rollup, webpack,  sass, whatever you are used to. The result just must be correct file, with function `W.loadPlugin()` inside

## Building plugin from multiple files
Windy plugins compiler can build your plugin from more files. But is has some limitations:
 - Main js code inside `plugin.html` can not export anything
 - Other js files must be in the same directory as `plugin.html`
 - Other js files must have an `.mjs` extension, and required as `import xy from ./filename.mjs`
 - Other js files can have only default import and default export

Usage:
```js
  // Windy's core modules
  import map from '@windy/map'
  import _ from '@windy/utils'

  // Your own modules
  import graph from './soundingGraph.mjs'

  // ..your code

  export default { myExport1, myExport2 }
```
Windy plugins compiler will throws an error if you will try to import something else, than cases above. Use rather `dependencies` property inside your `config.js` to load 3rd party libraries.
