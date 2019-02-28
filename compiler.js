#!/usr/bin/env node --no-warnings

/**
 * This is plugin building script. Feel free to modify it
 * All is MIT licenced
 */
const prog = require("commander"),
  { join } = require("path"),
  c = require("consola"),
  fs = require("fs-extra"),
  { yellow, gray } = require("colorette"),
  riot = require("riot-compiler"),
  assert = require("assert"),
  express = require("express"),
  app = express(),
  less = require("less"),
  chokidar = require("chokidar"),
  decache = require("decache"),
  https = require("https"),
  babel = require("@babel/core");

const utils = require("./dev/utils.js");

const port = 9999;

const {
  version,
  name,
  author,
  repository,
  description,
} = require("./package.json");

prog
  .option("-b, --build", "Build the plugin in required directory (default src)")
  .option(
    "-w, --watch",
    "Build plugin and watch file changes in required directory"
  )
  .option("-s, --serve", `Serve dist directory on port ${port}`)
  .option("-p, --prompt", "Show command line promt with all the examples")
  .option("-t, --transpile", "Transpile your code with Babel")
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  prog.outputHelp();
  process.exit();
}

let config,
  srcDir = "src";

// Main
(async () => {
  console.log(`\nBuilding ${yellow(name)}, version ${yellow(version)}`);

  // Beginners example selection
  if (prog.prompt) {
    srcDir = await utils.prompt();
  }

  c.info(`Compiler will compile ${yellow(`./${srcDir}/plugin.html`)}`);

  reloadConfig();

  try {
    // Basic assertions
    assert(
      typeof config === "object",
      "Missing basic config object. Make sure you have valid " +
        "config.js in src dir"
    );

    assert(
      /^windy-plugin-/.test(name),
      "Your repository (and also your published npm package) " +
        'must be named "windy-plugin-AnyOfYourName".' +
        " Change the name in your package.json"
    );

    // Tasks
    if (prog.watch || prog.build) {
      await build();
    }

    if (prog.serve) {
      await startServer();
    }

    if (prog.watch) {
      c.start(`Staring watch on ${gray(srcDir)}...`);
      chokidar.watch([srcDir]).on("change", onChange);
    }
  } catch (e) {
    c.error(`Error\u0007`, e);
  }
})();

function startServer() {
  return new Promise(resolve => {
    const httpsOptions = {
      // https://www.ibm.com/support/knowledgecenter/en/SSWHYP_4.0.0/com.ibm.apimgmt.cmc.doc/task_apionprem_gernerate_self_signed_openSSL.html
      key: fs.readFileSync(join(__dirname, "dev", "key.pem"), "utf8"),
      cert: fs.readFileSync(join(__dirname, "dev", "certificate.pem"), "utf8"),
    };

    app.use(express.static("dist"));

    https.createServer(httpsOptions, app).listen(port, () => {
      c.success(`Your plugin is published at ${gray(
        `https://localhost:${port}/plugin.js`
      )}.

    Use ${yellow("https://www.windy.com/dev")} to test it\n`);

      resolve();
    });
  });
}

/* This is main build function

	Feel free to to use your own builder, transpiler, minifier or whatever
	The result must be a single .js file with single W.loadPlugin() function

	Make sure to replace import XY from '@windy/XY' with W.require(XY)

*/
async function build() {
  // Riot parser options
  const riotOpts = {
    entities: true,
    compact: false,
    expr: true,
    type: null,
    template: null,
    fileConfig: null,
    concat: false,
    modular: false,
    debug: true,
  };

  // Compile less - feel free to code your SCSS here
  let css = await compileLess();

  // Load source code of a plugin
  const tagSrc = await fs.readFile(join(srcDir, "plugin.html"), "utf8");

  // Compile it via riot compiler
  // See: https://github.com/riot/compiler
  const [compiled] = riot.compile(tagSrc, riotOpts);
  let { html, js, imports } = compiled;

  const options = Object.assign(
    {},
    {
      name,
      version,
      author,
      repository,
      description,
    },
    config
  );

  const internalModules = {};

  //
  // Rewrite imports into W.require
  //
  if (imports) {
    let match,
      importsRegEx = /import\s+(\S+)\s+from\s+['"](@windy\/)?([^'"']+)['"]/g;

    while ((match = importsRegEx.exec(imports)) !== null) {
      let [, lex, isCore, module] = match;

      // detect syntax "import graph from './soundingGraph.mjs'"
      // and loads external module
      if (!isCore) {
        module = await utils.externalMjs(srcDir, internalModules, module, name);
      }

      js = `\tconst ${lex} = W.require('${module}');\n${js}`;
    }
  }

  // Stringify output
  let output = utils.stringifyPlugin(options, html, css, js);

  // Add external modules
  for (let ext in internalModules) {
    output += `\n\n${internalModules[ext]}`;
  }

  // Save plugin to dest directory
  const destination = join(__dirname, "dist", "plugin.js");

  // Babel traspile
  if (prog.transpile) {
    c.info("Transpiling with babel");
    let res = await babel.transformAsync(output, {
      presets: ["@babel/preset-env"],
    }); // => Promise<{ code, map, ast }>
    output = res.code;
  }

  await fs.outputFile(destination, output);

  c.success(
    `Your plugin ${gray(name)} has been compiled to ${gray(destination)}`
  );
}

//
// L E S S compiler
//
async function compileLess() {
  const lessOptions = {
    cleancss: true,
    compress: true,
  };

  const lessFile = join(srcDir, "plugin.less");

  if (!fs.existsSync(lessFile)) {
    return null;
  }

  const lessSrc = await fs.readFile(lessFile, "utf8");

  let { css } = await less.render(lessSrc, lessOptions);

  return css;
}

//
// Reload config
//
function reloadConfig() {
  const dir = join(__dirname, srcDir, "config.js");
  decache(dir);
  config = require(dir);
}

//
// Watch change of file
//
const onChange = async fullPath => {
  c.info(`watch: File changed ${gray(fullPath)}`);

  reloadConfig();

  await build();
};
