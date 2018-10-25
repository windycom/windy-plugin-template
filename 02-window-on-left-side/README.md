![](https://www.windy.com/img/windy-plugins/example02.gif)
# Window on the left side
Use left side window to present larger amount of information.

Check the plugin in mobile phone to see effect of `plugin-mobile-fullscreen` class.

This plugin also demonstrates receiving broadcasted messages and using `store` to programatically change overlay.

### config.js
`className` should contain list of class names that will be attached to your
plugin upon mounting.

`exclusive` contains identifier of a pane, where your plugin will reside.
Since we want to have only one pane on left side, this string will guarantee, that all other plugins on the left side will be closed.

### plugin.html
This plugin does not have any HTML content, nor CSS. Windy API modules are imported via `import map from '@windy/map'`

`this.onopen` method is called when your plugin is being opened. Remember, that `this.ononpen` method can be called repeatedly (without your plugin
being closed before), so make sure, that you will not to subscribe
to any listener twice.

`this.onclose` method is called when your plugin is being closed.	Unsubscribe from all your listeners, and remove all your stuff from a map.

-----------------

See [Windy Plugins API](../docs/WINDY_PLUGIN.md) to have better idea how plugin system works or [Windy API documentation](../docs/WINDY_API.md)
