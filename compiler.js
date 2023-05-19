#!/usr/bin/env node --no-warnings

/**
 * This is plugin building script. Feel free to modify it
 * All is MIT licenced
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert';
import https from 'node:https';

import prog from 'commander';
import prompts from 'prompts';
import ucfirst from 'ucfirst';
import c from 'consola';
import { yellow, gray } from 'colorette';
import express from 'express';
import chokidar from 'chokidar';
import decache from 'decache';

import { builder } from './dev/rollup.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 9999;

// TODO add to plugin
const { version, name, author, repository, description } = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'package.json')),
);

prog.option('-b, --build', 'Build the plugin in required directory (default src)')
    .option('-w, --watch', 'Build plugin and watch file changes in required directory')
    .option('-s, --serve', `Serve dist directory on port ${port}`)
    .option('-p, --prompt', 'Show command line promt with all the examples')
    .option('-t, --transpile', 'Transpile your code with Babel')
    .parse(process.argv);

if (!process.argv.slice(2).length) {
    prog.outputHelp();
    process.exit();
}

let config,
    srcDir = 'src';

export const prompt = async () => {
    let dir = 'src';

    const list = fs.readdirSync(path.join(__dirname, 'examples')).filter(d => /\d\d-/.test(d));

    console.log(`\nSelect which example you want to test:\n`);

    list.map((d, i) =>
        console.log(`  ${yellow(i + 1)}) ${ucfirst(d.replace(/^\d\d-/, '').replace(/-/g, ' '))}`),
    );

    console.log(
        `\n  ${yellow(0)}) F***K OFF with examples. I am pro. I want to develop ${yellow(
            'my own plugin',
        )}.\n`,
    );

    let { value } = await prompts({
        type: 'number',
        name: 'value',
        message: `Which example you want to launch? (press 0 - ${list.length}):`,
        validate: value => (value >= 0 && value < list.length + 1 ? true : false),
    });

    if (value > 0) {
        dir = path.join('examples', list[value - 1]);
    } else if (value === 0) {
        console.log(`----------------------------------------------------
    Please change ${yellow('package.json')} now:

      ${yellow('name')}: Must contain name of your plugin in a form windy-plugin-AnyName
      ${yellow('description')}: Should be description of what your plugin does
      ${yellow('author')}: Should contain your name
      ${yellow('repository')}: Should be actual link to your hosting repo

    Also ${yellow('./README.md')} should contain some info about your plugin if you wish

    For faster work use directlly ${yellow('npm run start-dev')} to skip this prompt

    After you will be done use ${yellow('npm publish')} to publish your plugin.
    -----------------------------------------------------`);
    }

    return dir;
};

// Main
(async () => {
    console.log(`\nBuilding ${yellow(name)}, version ${yellow(version)}`);

    // Beginners example selection
    if (prog.prompt) {
        srcDir = await prompt();
    }

    c.info(`Compiler will compile ${yellow(`./${srcDir}/`)}`);

    await reloadConfig();

    try {
        // Basic assertions
        assert(
            typeof config === 'object',
            'Missing basic config object. Make sure you have valid ' + 'config.js in src dir',
        );

        assert(
            /^windy-plugin-/.test(name),
            'Your repository (and also your published npm package) ' +
                'must be named "windy-plugin-AnyOfYourName".' +
                ' Change the name in your package.json',
        );

        // Tasks
        if (prog.watch || prog.build) {
            await build();
        }

        if (prog.serve) {
            await startServer();
        }

        if (prog.watch) {
            c.start(
                `Staring watch on ${gray(srcDir)} and ${gray(
                    'package.json',
                )}.  Build 1 sec after change....`,
            );
            chokidar
                .watch([srcDir], {
                    awaitWriteFinish: { stabilityThreshold: 1000, pollInterval: 100 },
                })
                .on('change', onChange);
        }
    } catch (e) {
        c.error(`Error\u0007`, e);
    }
})();

function startServer() {
    return new Promise(resolve => {
        const httpsOptions = {
            // https://www.ibm.com/support/knowledgecenter/en/SSWHYP_4.0.0/com.ibm.apimgmt.cmc.doc/task_apionprem_gernerate_self_signed_openSSL.html
            key: fs.readFileSync(path.join(__dirname, 'dev', 'key.pem'), 'utf8'),
            cert: fs.readFileSync(path.join(__dirname, 'dev', 'certificate.pem'), 'utf8'),
        };

        app.use(express.static('dist'));

        https.createServer(httpsOptions, app).listen(port, () => {
            c.success(
                `Your plugin is published at
    ${gray('https://localhost:' + port + '/plugin.js')}.
    Use ${yellow('https://www.windy.com/dev')} to test it.\n`,
            );
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
    const destination = path.join(__dirname, 'dist');
    const meta = {
        name,
        version,
        author,
        repository,
        description,
        ...config,
    };

    const { code } = await builder(name, srcDir, meta);

    fs.writeFileSync(path.join(destination, 'plugin.js'), code);

    c.success(`Your plugin ${gray(name)} has been compiled to ${gray(destination)}`);
}

async function reloadConfig() {
    const { default: dir } = await import(path.join(__dirname, srcDir, 'config.js'));
    decache(dir);
    config = dir;
    return;
}

const onChange = async fullPath => {
    c.info(`watch: File changed ${gray(fullPath)}`);

    await reloadConfig();

    await build();
};
