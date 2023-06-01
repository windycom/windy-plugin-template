![](https://www.windy.com/img/windy-plugins/example02.gif)

# Window on the left side

Use left side window to present larger amount of information.

This plugin also demonstrates receiving broadcasted messages and using `store` to programatically change overlay.

### config.js

`className` should contain list of class names that will be attached to your
plugin upon mounting.

`pane` contains identifier of a pane, where your plugin will reside.
Since we want to have only one pane on left side, this string will guarantee, that all other plugins on the left side will be closed.

### plugin.html & plugin.less

This plugin has HTML content and CSS. HTML file has to be named `plugin.html` and entry file for LESS has to be named `plugin.less`.

---

See [Windy Plugins API](../../docs/WINDY_PLUGIN.md) to have better idea how plugin system works or [Windy API documentation](../../docs/WINDY_API.md)
