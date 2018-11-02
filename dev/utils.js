const ucfirst = require('ucfirst')
, prompts = require('prompts')
, { yellow, gray } = require('colorette')
, fs = require('fs-extra')
, { join } = require('path')

const mjs2js = require('./mjs2js.js')

//
// Funny start up prompt
//
exports.prompt = async () => {
  let dir = 'src'

    const list = fs.readdirSync( join(__dirname,'..','examples' ))
          .filter( d => /\d\d-/.test(d) )

    console.log(`\nSelect which example you want to test:\n`)

    list.map( (d,i) => console.log(`  ${ yellow( i + 1 ) }) ${ ucfirst( d.replace(/^\d\d-/,'').replace( /-/g,' ' ) ) }`) )

    console.log(`\n  ${yellow(0)}) F***K OFF with examples. I am pro. I want to develop ${ yellow('my own plugin') }.\n`)

    let { value } = await prompts({ type: 'number', name: 'value',
        message: `Which example you want to launch? (press 0 - ${ list.length }):`,
        validate: value => value >= 0 && value < list.length + 1 ? true : false
    });

    if(value > 0) {

      dir = join('examples',list[ value - 1 ])

    } else if(value === 0) {

      console.log(`----------------------------------------------------
Please change ${ yellow( 'package.json' ) } now:

  ${ yellow( 'name') }: Must contain name of your plugin in a form windy-plugin-AnyName
  ${ yellow( 'description') }: Should be description of what your plugin does
  ${ yellow( 'author') }: Should contain your name
  ${ yellow( 'repository') }: Should be actual link to your hosting repo

Also ${ yellow('./README.md') } should contain some info about your plugin if you wish

For faster work use directlly ${ yellow('npm run start-dev' ) } to skip this prompt

After you will be done use ${ yellow('npm publish')} to publish your plugin.
-----------------------------------------------------`)

    }

    return dir

}

//
// Finally creates W.loadPlugin code
//
exports.stringifyPlugin = ( opts, html, css, js) => {

  const _q = (s, r) => {
    if (!s) return "''"
    s = "'" + s.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'"
    return r && s.indexOf('\n') !== -1 ? s.replace(/\n/g, '\\n') : s
  }

  return `
/**
 * This is main plugin loading function
 * Feel free to write your own compiler
 */
W.loadPlugin(

/* Mounting options */
${ JSON.stringify(opts,null, 2) },

/* HTML */
${ _q(html, 1) },

/* CSS */
${ _q(css) },

/* Constructor */
function() {\n\n${ js }\n});`

}

/**
 * Parses and builds external .mjs files
 * @param  {Object} internalModules Hask of alredy loade internal modules
 * @param  {string} module in a form './filename.mjs'
 * @return {string} new module name
 */
exports.externalMjs = async(src,internalModules, module, name  ) => {
  const base = module.replace(/\.\/(\S+)\.mjs/,'$1')

  if(!base) throw new Error('Unable to import module. Windy plugin compiler is primitive and'
        + ' supports only "@windy/name", or "./filename.mjs" modules' )

  const moduleId = `${ name }/${ base }`

  if( module in internalModules ) { // Module already loaded

    return moduleId

  } else {

    const file = join( src, `${ base }.mjs`)
    , { externalModules, transformed } = await mjs2js( file, moduleId, name )

    internalModules[ module ] = transformed

    for( let internal of externalModules ) {

      //
      // Here circular dep can occur
      ////
      if(!internalModules[ internal ] ) await exports.externalMjs( src, internalModules, internal, name )

    }

    return moduleId

  }

}
