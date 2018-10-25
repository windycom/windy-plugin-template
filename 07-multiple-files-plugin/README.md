![](https://www.windy.com/img/windy-plugins/example01.gif)
# Building plugin from multiple files
Windy plugins compiler can build your plugin from more files. But is has some limitations:
 - Main js code inside `plugin.html` can not export anything
 - Other js files must be in the same directory as `plugin.html`
 - Other js files must have an `.mjs` extension, and required as `import xy from ./filename.mjs`
 - Other js files can have only default import and default export

Usage:
```js
  // Windy's core modules
  import map from '@windy/map'
  import _ from '@windy/utils'

  // Your own modules
  import graph from './soundingGraph.mjs'

  // ..your code

  export default { myExport1, myExport2 }
```
Windy plugins compiler will throws an error if you will try to import something else, than cases above. Use rather `dependencies` property inside your `config.js` to load 3rd party libraries.

-----------------

See [Windy Plugins API](../docs/WINDY_PLUGIN.md) to have better idea how plugin system works or [Windy API documentation](../docs/WINDY_API.md)
