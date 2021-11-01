// .mjs -> es6 -> native js
const fs = require('fs-extra');
const consola = require('console');
const { find } = require('./shimport');

// Replaces all imports, exports in a file
module.exports = async (fullPath, moduleId, namespace) => {
    const body = await fs.readFile(fullPath, 'utf8');
    const transformed = transform(fullPath, body, moduleId, namespace);

    return transformed;
};

const transform = (file, source, id, namespace) => {
    const [importDeclarations, importStatements, importMetaUrls, exportDeclarations] = find(
        source,
        id,
    );

    const nameBySource = new Map();
    const externalModules = [];

    importDeclarations.forEach(d => {
        if (nameBySource.has(d.source)) return;
        if (/@windy\//.test(d.source)) {
            // Windy's core module
            d.source = d.source.replace(/@windy\/(\S+)/, '$1');

            if (/plugins\//.test(d.source)) {
                d.source = '@' + d.source;
            }
        } else if (/\.\/\S+\.mjs/.test(d.source)) {
            // Plugin's module

            externalModules.push(d.source);
            d.source = `${namespace}/${d.source.replace(/\.\/(\S+)\.mjs/, '$1')}`;
        } else if (!/@plugins\//.test(d.source)) {
            // "@plugins/xyz" is allowed
            throw new Error(
                'Unable to import module. Windy plugin compiler is primitive and' +
                    ' supports only "@windy/name", or "./filename.mjs" modules',
            );
        }
        nameBySource.set(d.source, d.name || `__dep_${nameBySource.size}`);
    });

    let moduleHasNamedExport = false;
    let moduleHaDefaultExport = false;

    exportDeclarations.forEach(d => {
        if (!d.name) {
            moduleHaDefaultExport = true;
        } else {
            moduleHasNamedExport = true;
        }

        if (!d.source) return;
        if (nameBySource.has(d.source)) return;
        nameBySource.set(d.source, d.name || `__dep_${nameBySource.size}`);
    });

    if (moduleHaDefaultExport && moduleHasNamedExport) {
        consola.error(
            `es2Wdefine detected combination of named and default exports in one module: ${id}`,
        );
    }

    const deps = Array.from(nameBySource.keys())
        .map(s => `'${s.replace(/^@windy\//, '')}'`)
        .join(', ');

    const names = ['__exports'].concat(Array.from(nameBySource.values())).join(', ');

    const hoisted = [];

    importDeclarations.forEach(decl => {
        const name = nameBySource.get(decl.source);
        let moduleHasNamedImport = false;
        let moduleHaDefaultImport = false;

        decl.specifiers
            .sort((a, b) => {
                if (a.name === 'default') {
                    return 1;
                }
                if (b.name === 'default') {
                    return -1;
                }
            })
            .forEach(s => {
                if (s.name === 'default') {
                    moduleHaDefaultImport = true;
                } else {
                    moduleHasNamedImport = true;
                }

                if (s.name !== '*') {
                    /**
                     * Original version combining default & named exports

                    const assignment =
                        s.name === 'default' && s.as === name
                            ? `${s.as} = ${name}.default; `
                            : `var ${s.as} = ${name}.${s.name}; `;

                    hoisted.push(assignment);

                    */

                    if (s.name !== 'default') {
                        hoisted.push(`var ${s.as} = ${name}.${s.name}; `);
                    }
                }
            });
        if (moduleHaDefaultImport && moduleHasNamedImport) {
            consola.error(
                `es2Wdefine detected combination of named and default import in one module: ${id}`,
            );
        }
    });

    let transformed = `W.define('${id}',\n[${deps}], function(${names}){ \n\n${hoisted.join('\n') +
        '\n\n'}`;

    const ranges = [
        ...importDeclarations,
        ...importStatements,
        ...importMetaUrls,
        ...exportDeclarations,
    ].sort((a, b) => a.start - b.start);

    let c = 0;

    for (let i = 0; i < ranges.length; i += 1) {
        const range = ranges[i];
        transformed += source.slice(c, range.start) + range.toString(nameBySource);

        c = range.end;
    }

    transformed += source.slice(c);
    exportDeclarations.forEach(d => {
        if (d.name) transformed += `\n__exports.${d.as || d.name} = ${d.name};`;
    });
    transformed += '\n});\n';

    // replace trailing ; at the end of commented out lines
    transformed = transformed.replace(/(^\/\*import\s+.*\*\/);/gm, '$1');

    return { externalModules, transformed };
};
