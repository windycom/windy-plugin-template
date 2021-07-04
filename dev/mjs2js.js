// .mjs -> es6 -> native js
const fs = require('fs-extra'),
    { find } = require('./shimport');

// Replaces all imports, exports in a file
module.exports = async (fullPath, moduleId, namespace) => {
    const body = await fs.readFile(fullPath, 'utf8'),
        transformed = transform(fullPath, body, moduleId, namespace);

    return transformed;
};

const transform = (file, source, id, namespace) => {
    const [importDeclarations, importStatements, exportDeclarations] = find(
        source
    );

    var nameBySource = new Map();

    const externalModules = [];

    importDeclarations.forEach(d => {
        if (nameBySource.has(d.source)) {
            return;
        }

        if (/@windy\//.test(d.source)) {
            // Windy's core module

            d.source = d.source.replace(/@windy\/(\S+)/, '$1');

            if (/plugins\//.test(d.source)) {
                d.source = "@" + d.source;
            }

        } else if (/\.\/\S+\.mjs/.test(d.source)) {
            // Plugin's module

            externalModules.push(d.source);

            d.source = `${namespace}/${d.source.replace(
                /\.\/(\S+)\.mjs/,
                '$1'
            )}`;
        } else if ( !/@plugins\//.test(d.source) ) {          // "@plugins/xyz" is allowed
            throw new Error(
                'Unable to import module. Windy plugin compiler is primitive and' +
                    ' supports only "@windy/name", or "./filename.mjs" modules'
            );
        }

        nameBySource.set(d.source, d.name || '__dep_' + nameBySource.size);
    });

    exportDeclarations.forEach(d => {
        if (!d.source) {
            return;
        }

        if (nameBySource.has(d.source)) {
            return;
        }

        if (d.name) {
            throw new Error(
                `mjs2js: Named exports are not supported in ${file}`
            );
        }

        nameBySource.set(d.source, d.name || '__dep_' + nameBySource.size);
    });

    var deps = Array.from(nameBySource.keys())
        .map(s => `'${s}'`)
        .join(', ');

    var names = Array.from(nameBySource.values()).join(', ');

    var transformed = `/*! */
// This page was transpiled automatically from ${file}
W.define('${id}', [${deps}],
    function(__exports,  ${names}) {
`;

    var ranges = importDeclarations
        .concat(importStatements, exportDeclarations)
        .sort((a, b) => a.start - b.start);

    var c = 0;

    for (var i = 0; i < ranges.length; i += 1) {
        var range = ranges[i];

        transformed += source.slice(c, range.start);

        if (!(range.name && range.source)) {
            transformed += range.toString(nameBySource);
        }

        // remove trailing \n
        transformed = transformed.replace(/\n$/, '');

        c = range.end;
    }

    transformed += source.slice(c);


    //import like this:  import name from "./xyz.mjs" if using: export default whatever;
    //or import {name1, name2:yourname} from "./xyz.mjs" if using: export {name1, name2};
    //cannot use default and named exports

    //transformed = transformed.replace('__exports.default =', '\treturn ');    //this line removed

    transformed += '\n});\n';

    return { externalModules, transformed };
};
