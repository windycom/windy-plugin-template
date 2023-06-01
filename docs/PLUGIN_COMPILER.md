# Windy Plugin Compiler
Plugins are built using rollup using some custom plugins. Feel free to edit [dev/rollup.js](../dev/rollup.js) to fit your needs. Plugins `buildPluginsHtml`, `buildPluginsCss` and `transformToPlugin` are custom extensions for rollup. Feel free to edit it as well if needed. The only important thing is the output format granted by `transformToPlugin`. The way to the destination is not important. **Pull requests are welcome.**

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

It compiles your source files into single file `dest/plugin.js`. Run the compiler `node ./compiler.js --help` for CLI options.
