import serve from 'rollup-plugin-serve';
import rollupSvelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve'; // pro importování z node_modules
import commonjs from '@rollup/plugin-commonjs'; // pro konverzi CommonJS modulů do ES6
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import { less } from 'svelte-preprocess-less';
import sveltePreprocess from 'svelte-preprocess';
import fs from 'fs';

import { transformCodeToESMPlugin } from './dev/windyRollupPlugins.js';

const useSourceMaps = true;
const minifyOutput = false;

const buildConfigurations = {
    src: {
        input: 'src/plugin.svelte',
        out: 'plugin.js',
    },
    exmple01: {
        input: 'examples/01-hello-world/plugin.svelte',
        out: 'example01.js',
    },
    example02: {
        input: 'examples/02-using-vanilla-js/plugin.svelte',
        out: 'example02.js',
    },
    example03: {
        input: 'examples/03-boat-tracker/plugin.svelte',
        out: 'example03.js',
    },
    example04: {
        input: 'examples/04-aircraft-range/plugin.svelte',
        out: 'example04.js',
    },
};

const requiredConfig = process.env.CONFIG || 'src';
const { input, out } = buildConfigurations[requiredConfig];

export default {
    input,
    output: {
        file: `dist/${out}`,
        format: 'module',
        sourcemap: useSourceMaps,
    },
    onwarn: () => {
        /* We disable all warning messages */
    },
    external: id => id.startsWith('@windy/'),
    watch: {
        include: ['src/**', 'examples/**'],
        exclude: 'node_modules/**',
        clearScreen: false,
    },
    plugins: [
        rollupSvelte({
            emitCss: false,
            preprocess: {
                style: less({
                    sourceMap: false,
                    math: 'always',
                }),
                script: data => {
                    const preprocessed = sveltePreprocess({ sourceMap: useSourceMaps });
                    return preprocessed.script(data);
                },
            },
        }),
        typescript({
            sourceMap: useSourceMaps,
            inlineSources: false,
        }),
        resolve({
            browser: true,
            dedupe: ['svelte'],
        }),
        commonjs(),
        transformCodeToESMPlugin(),
        minifyOutput && terser(),
        serve({
            contentBase: 'dist',
            host: 'localhost',
            port: 9999,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            https: {
                key: fs.readFileSync('dev/key.pem'),
                cert: fs.readFileSync('dev/certificate.pem'),
            },
        }),
    ],
};
