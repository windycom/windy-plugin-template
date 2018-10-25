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
