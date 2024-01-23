import serve from 'rollup-plugin-serve';
import rollupSvelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve'; // pro importování z node_modules
import commonjs from '@rollup/plugin-commonjs'; // pro konverzi CommonJS modulů do ES6
import typescript from '@rollup/plugin-typescript';
import { less } from 'svelte-preprocess-less';
import fs from 'fs';

import { transformCodeToESMPlugin } from './dev/windyRollupPlugins.js';

const useSourceMaps = true;

export default {
    input: 'src/plugin.svelte',
    output: {
        file: 'dist/plugin.min.js',
        format: 'module',
        sourcemap: useSourceMaps,
    },
    watch: {
        include: 'src/**',
        exclude: 'node_modules/**',
    },
    plugins: [
        rollupSvelte({
            emitCss: false,
            preprocess: {
                style: less({
                    sourceMap: useSourceMaps ? { sourceMapFileInline: true } : undefined,
                    math: 'always',
                }),
            },
        }),
        resolve({
            browser: true,
            dedupe: ['svelte'],
        }),
        commonjs(),
        typescript({
            sourceMap: useSourceMaps,
            inlineSources: useSourceMaps,
        }),
        transformCodeToESMPlugin(),
        // TODO: add terser()
        serve({
            contentBase: 'dist',
            host: 'localhost',
            port: 9999,
            https: {
                key: fs.readFileSync('dev/key.pem'),
                cert: fs.readFileSync('dev/certificate.pem'),
            },
        }),
    ],
};

/*
const getListOfRollupPlugins = (prog: ProgOptions, cfg: Globals, isProductionBuild: boolean) => {
    return [
        typescriptPaths(cfg),
        replace(),
        swc(prog),
        glslify(prog),
        svelte(prog, cfg),
        nodeResolve(),
        commonjs(),
        isProductionBuild && cleanup(),
        isProductionBuild && babel(),
        transformCodeToESMPlugin(),
        isProductionBuild && terser(prog, cfg),
    ].filter(Boolean);
};

*/
