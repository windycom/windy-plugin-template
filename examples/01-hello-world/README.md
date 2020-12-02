![](https://www.windy.com/img/windy-plugins/example01.gif)
# Hello world
Windy uses Leaflet version `1.4.0` that is [well documented here](https://leafletjs.com/reference-1.4.0.html) and contains plenty of [plugins that you can use](http://leafletjs.com/plugins.html).

### config.js
This is main configuration file for your plugin.

`hook` contains the identifier of the place, where opening link to your plugin will appear. So far only 'contextmenu' and 'menu' is supported.

`displayName` contains name of your plugin, as it will appear in the menu.

But the most important config variable is name of your plugin, which is `name` property defined in your package.json, since the name of your plugin must be same as the name of your npm package.

The name of your plugin, and your npm package must have form `windy-plugin-anyName`.

### plugin.html
This plugin does not have any HTML content, nor CSS. Windy API modules are imported with `import map from '@windy/map'`

`this.onopen` method is called when your plugin is being opened.

Remember, that `this.ononpen` method can be called repeatedly (without your plugin being closed before), so make sure, that you will not to subscribe
to any listener twice.

`this.onclose` method is called when your plugin is being closed. Unsubscribe from all your listeners, and remove all your stuff from a map.


-----------------

See [Windy Plugins API](../../docs/WINDY_PLUGIN.md) to have better idea how plugin system works or [Windy API documentation](../../docs/WINDY_API.md)
