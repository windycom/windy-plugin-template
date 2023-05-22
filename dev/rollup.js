import path from 'node:path';

import { rollup } from 'rollup';
import rollupNodeResolve from '@rollup/plugin-node-resolve';
import rollupCommonjs from '@rollup/plugin-commonjs';
import rollupTerser from '@rollup/plugin-terser';
import rollupCleanup from 'rollup-plugin-cleanup';
import { getBabelOutputPlugin as rollupBabel } from '@rollup/plugin-babel';

import { buildPluginsHtml, buildPluginsCss, transformToPlugin } from './rollup-plugins.js';

export const builder = async function (id, srcDir, meta) {
    const bundle = await rollup({
        input: path.join(srcDir, 'plugin.js'),
        output: { format: 'es', name: id },
        external: moduleId => moduleId.startsWith('@windy/') || moduleId.startsWith('@plugins/'),
        plugins: [
            buildPluginsHtml(),
            buildPluginsCss(),
            rollupNodeResolve({
                mainFields: ['module', 'jsnext:main', 'main'],
                browser: true,
                preferBuiltins: false,
            }),
            rollupCommonjs(),
            rollupCleanup({ comments: 'none' }),
            rollupBabel({
                presets: [['@babel/preset-env', { targets: 'ie 11', modules: false }]],
                allowAllFormats: true,
                compact: false,
            }),
            transformToPlugin(meta),
            rollupTerser({
                mangle: true,
                ecma: 5,
                compress: { ecma: 5 },
            }),
        ],
    });

    const { output } = await bundle.generate({ format: 'es', name: id });
    const code = output[0].code;
    const map = output[0].map;

    return { code, map, watchFiles: bundle.watchFiles };
};
