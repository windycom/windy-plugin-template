![](https://www.windy.com/img/windy-plugins/example05.gif)
# Use of external library and placing window inside the map
> If you really need jQuery to do something so simple like Windy Plugin, maybe
> you should consider programming something else

This is very complex example placing your plugin element inside Leaflet map on desktop, and in different location on mobile.

When mounted to the page, your plugin contains some handy shortcuts to DOM elements inside your plugin. `this.node` contains el of your plugin, and for example `this.refs.graph` contains el with `data-ref="graph"` attribute.

Module `$` can also act as shortcut to `document.querySelector`, so for instance `$('.closing-x', this.node )` will return el of closing button.

### config.js
As you can see `dependencies` can contain list of external libraries, that will be loaded before your plugin is even mounted to the page.

`attachPoint` contains selector of el, where your plugin will be mounted to the page.

### plugin.html
Whenever your plugin is opened from `contextmenu` hook, `this.onopen` method receives { lat, lon } object with required coordinates.

-----------------

See [Windy Plugins API](../docs/WINDY_PLUGIN.md) to have better idea how plugin system works or [Windy API documentation](../docs/WINDY_API.md)
