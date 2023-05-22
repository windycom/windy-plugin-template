import fs from 'node:fs';
import path from 'node:path';

import less from 'less';
import MagicString from 'magic-string';
import { minify } from 'html-minifier';
import { walk } from 'estree-walker';

const encloseInSingleQuotes = text => {
    if (!text) {
        return "''";
    }
    return "'" + text.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '') + "'";
};

const getImportsExports = ast => {
    /**
     * List of named variables imported from the module. Used only for `{ x, y, z } from 'abc'`
     */
    const imports = {};

    /**
     * List of exported variables of the module
     */
    const exports = {};

    walk(ast, {
        enter(node) {
            if (node.type === 'ImportDeclaration') {
                const moduleId = node.source.value?.toString().replace('@windy/', '');
                const specifiers = node.specifiers.map(s => ({
                    name: s.local.name,
                    start: node.start,
                    end: node.end,
                    exportedName: ('imported' in s && s.imported.name) || undefined,
                    type: s.type,
                }));

                if (!moduleId) {
                    throw new Error('ImportDeclaration has no moduleId!');
                }

                // eg. import '@windy/router';
                if (!specifiers || !specifiers.length) {
                    specifiers.push({
                        name: moduleId,
                        type: 'ImportDefaultSpecifier',
                        start: node.start,
                        end: node.end,
                        exportedName: undefined,
                    });
                }

                if (specifiers.some(s => !s.name || !s.type)) {
                    throw new Error('ImportDeclaration contains incomplete speciefier!');
                }

                for (const specifier of specifiers) {
                    if (!imports[moduleId]) {
                        imports[moduleId] = [];
                    }
                    imports[moduleId].push(specifier);
                }
            }

            if (node.type === 'ExportNamedDeclaration') {
                if (
                    node.declaration &&
                    ['FunctionDeclaration', 'ClassDeclaration', 'VariableDeclaration'].includes(
                        node.declaration.type,
                    )
                ) {
                    const { id: idNode } =
                        node.declaration.type === 'VariableDeclaration'
                            ? node.declaration.declarations?.[0] ?? {}
                            : node.declaration;

                    if (idNode.name) {
                        exports[idNode.name] = {
                            declaration: {
                                start: node.declaration.start,
                                end: node.declaration.end,
                            },
                            start: node.start,
                            end: node.end,
                            type: 'PrefixedDeclaration',
                        };
                    }
                }

                if (node.specifiers.length) {
                    for (const n of node.specifiers) {
                        exports[n.exported.name] = {
                            declaration: {
                                name: n.local.name,
                            },
                            start: node.start,
                            end: node.end,
                            type: 'SpecifierBlockDeclaration',
                        };
                    }
                }
            } else if (node.type === 'ExportDefaultDeclaration') {
                exports['default'] = {
                    declaration: {
                        start: node.declaration.start,
                        end: node.declaration.end,
                    },
                    start: node.start,
                    end: node.end,
                    type: 'DefaultDeclaration',
                };
            } else if (node.type === 'ExportAllDeclaration') {
                throw new Error(`Unknown export type ${node.type}. Feel free to extend me!`);
            }
        },
    });

    return { exports, imports };
};

const getRandomName = () =>
    `__dep_${Math.random()
        .toString(36)
        .slice(-10)
        .replace(/[^a-zA-Z_]/g, '')}`;

const transformCodeToPlugin = (id, meta, code, sourcemaps, pluginContext) => {
    const exportVariable = '__exports';

    const ast = pluginContext.parse(code);
    const msCode = new MagicString(code);
    const { imports, exports } = getImportsExports(ast);

    const importedIds = Object.keys(imports).map(String);

    // remove all imports from code
    for (const importedId of importedIds) {
        const declaratedImports = imports[importedId];
        for (const declaratedImport of declaratedImports) {
            msCode.remove(declaratedImport.start, declaratedImport.end);
        }
    }

    msCode.trimLines();

    // Some modules are imported in different files of same module under deffirent names, this holds all used namespaces
    //
    // eg for
    // import * as _ from '@windy/utils'; import { $ } from '@windy/utils'; import * as utils from '@windy/utils'; etc...
    // it holds
    // importedIdNamespaces['@windy/utils'] = ['_', 'utils']
    //
    // or for imports without namespace
    // import { t } from '@windy/trans';
    // it holds
    // importedIdNamespaces['@windy/trans'] = ['__dep_someRandomHash']
    const importedIdNamespaces = importedIds.reduce((acc, m) => {
        if (!acc[m]) {
            acc[m] = [];
        }
        const hasNamespace = type =>
            ['ImportDefaultSpecifier', 'ImportNamespaceSpecifier'].includes(type);
        const importsWithNamespace = new Set(
            imports[m].filter(i => hasNamespace(i.type)).map(i => i.name),
        );
        acc[m] = importsWithNamespace.size
            ? Array.from(importsWithNamespace)
            : // no aliases from default or namespace imports, only { named } imports are presented
              // so create some random, it does not matter, just avoid any possible conflict
              [getRandomName()];
        return acc;
    }, {});

    // prepend eg: `var joinPath = utils.joinPath;`
    for (const importedId of importedIds) {
        for (const i of imports[importedId]) {
            // only for { named } imports or when exported name is different than local name
            if (i.type === 'ImportSpecifier' || (i.exportedName && i.name !== i.exportedName)) {
                msCode.prepend(
                    `var ${i.name} = ${importedIdNamespaces[importedId][0]}.${i.exportedName};\n`,
                );
            }
        }
    }

    // prepend our DI header
    const moduleIdsString = importedIds.map(m => `'${m}'`).join(', ');
    const moduleNamesString = [
        exportVariable,
        ...importedIds.map(mid => importedIdNamespaces[mid][0]),
    ].join(', ');
    // e.g const utils = u = ut = _;
    const moduleAliasesString = importedIds
        .map(mid => importedIdNamespaces[mid])
        .filter(a => a.length > 1)
        .map(a => {
            const [mainAlias, ...otherUsedAliases] = a;
            return `var ${otherUsedAliases.join(' = ')} = ${mainAlias};\n`;
        })
        .join('');

    msCode.prepend(
        `W.loadPlugin(${JSON.stringify(
            meta,
        )}, [${moduleIdsString}], function(${moduleNamesString}) {\n${moduleAliasesString}`,
    );

    // append our DI exports
    const exportedNames = Object.keys(exports).map(String);
    for (const exportedName of exportedNames) {
        const exp = exports[exportedName];

        switch (exp.type) {
            case 'PrefixedDeclaration':
                // remove `export ` string, keep the rest
                msCode.remove(exp.start, exp.declaration.start);
                msCode.append(`\n${exportVariable}.${exportedName} = ${exportedName};`);
                break;
            case 'SpecifierBlockDeclaration':
                // remove whole export { ... } block
                msCode.remove(exp.start, exp.end);
                msCode.append(`\n${exportVariable}.${exportedName} = ${exp.declaration.name};`);
                break;
            case 'DefaultDeclaration':
                // remove whole export default ... block
                msCode.remove(exp.start, exp.end);
                msCode.append(
                    `\n${exportVariable}.${exportedName} = ${code.slice(
                        exp.declaration.start,
                        exp.declaration.end,
                    )};`,
                );
                break;
        }
    }

    // html and css is injected by buildPluginsExternal(Html|Css) plugins
    let { html, css } = pluginContext.getModuleInfo(id)?.meta || {};
    if (html) {
        html = `,\n${encloseInSingleQuotes(html)}`;
    }
    if (css) {
        css = `,\n${encloseInSingleQuotes(css)}`;
        if (!html) {
            html = ',\nundefined';
        }
    }
    msCode.append(`\n}${html || ''}${css || ''});`);

    return {
        code: msCode.toString(),
        map: sourcemaps ? msCode.generateMap({ hires: true }) : undefined,
    };
};

export function transformToPlugin(meta) {
    let shouldGenerateSourcemaps = false;
    let pluginName = '';

    const processTransformation = (id, code, pluginContext) => {
        // all other cases transform to W.define module
        return transformCodeToPlugin(id, meta, code, shouldGenerateSourcemaps, pluginContext);
    };

    return {
        name: 'transform-to-plugin',
        options(options) {
            const outputOptions = Array.isArray(options.output)
                ? options.output[0]
                : options.output ?? {};

            shouldGenerateSourcemaps = Boolean(outputOptions.sourcemap);
            pluginName = outputOptions.name;

            if (!pluginName) {
                throw new Error(`Rollup option "output.name" is not defined!`);
            }

            return undefined;
        },
        renderChunk(code, chunk) {
            const id = chunk.facadeModuleId;
            if (!id) {
                return null;
            }

            return processTransformation(id, code, this);
        },
    };
}

export function buildPluginsHtml() {
    return {
        name: 'build-plugins-external-html',
        transform(code, id) {
            // !!! disabled due to commonjs rollup plugin error - all files has false for `isEntry`
            // we want to process it only once for each module - entry file check is ideal solution
            // if (!this.getModuleInfo(id)?.isEntry) {
            //     return;
            // }

            const htmlFilePath = id.replace(/\.[a-zA-Z]+$/, '.html');
            const htmlContent = fs.existsSync(htmlFilePath)
                ? fs.readFileSync(htmlFilePath, { encoding: 'utf8' })
                : null;
            if (!htmlContent) {
                return;
            }

            const html = minify(htmlContent, {
                removeComments: true,
                collapseWhitespace: true,
            });

            this.addWatchFile(htmlFilePath);

            // pass data to another rollup steps using meta
            return { meta: { html } };
        },
    };
}

export function buildPluginsCss() {
    return {
        name: 'build-plugins-external-css',
        async transform(code, id) {
            // !!! disabled due to commonjs rollup plugin error - all files has false for `isEntry`
            // we want to process it only once for each module - entry file check is ideal solution
            // if (!this.getModuleInfo(id)?.isEntry) {
            //     return;
            // }

            const lessFilePath = id.replace(/\.[a-zA-Z]+$/, '.less');
            const lessContent = fs.existsSync(lessFilePath)
                ? fs.readFileSync(lessFilePath).toString()
                : null;
            if (!lessContent) {
                return;
            }

            const lessResult = await less.render(lessContent, {
                math: 'always',
                compress: true,
                filename: path.resolve(lessFilePath), // make relative import paths inside LESS files valid
            });

            [lessFilePath, ...lessResult.imports].forEach(this.addWatchFile);
            if (!lessResult.css) {
                return;
            }

            // pass data to another rollup steps using meta
            return { meta: { css: lessResult.css } };
        },
    };
}
