# Windy Plugins API

<!-- toc -->

- [How Windy Plugin works](#how-windy-plugin-works)
  * [Name of your plugin](#name-of-your-plugin)
  * [Source files](#source-files)
    + [plugin.html](#pluginhtml)
    + [plugin.less](#pluginless)
    + [config.js](#configjs)
- [The life cycle of the plugin](#the-life-cycle-of-the-plugin)
    + [Loading of the plugin](#loading-of-the-plugin)
    + [Mounting](#mounting)
    + [Opening](#opening)
    + [Closing](#closing)

<!-- tocstop -->

### How Windy Plugin works
Windy plugin is piece of `js`, `css` and `html` that is compiled together into single `plugin.js` file.

The file is then published as `npm` package, and upon user's selection, loaded into Windy.com to be launched upon user's action.

### Name of your plugin
Most important configuration variable is name of your plugin, which is `name` of your `package.json` (since the name of your plugin must be the same as the name of your npm package).

The name of your plugin, and your npm package must have form `windy-plugin-anyName`

### Source files
Your `src/` directory should look like this:
```sh
config.js
plugin.html
plugin.less 	// <-- optional
otherFiles.mjs 	// <-- optional
```

#### plugin.html
Similar to vue, svelte or riot tag, contains html, and also js code of your plugin.

```html
<plugin>
	<!-- This is HTML code injected into Windy.com page -->
	<b>Hello world</b>

	<script>

	console.log('I am mounted to the page')

	this.onopen = () => console.log('I am opened')

	this.onclose = () => console.log('I am being closed')

	</script>
</plugin>
```

#### plugin.less
Your plugin will be wrapped inside `#windy-plugin-anyName` DIV. Whenever `.onwindy-plugin-anyName` class is applied to `<body>` of the page, you have chance to modify other styles on page.

```css
.onwindy-plugin-anyName .right-border {
	right: 400px;
}

#windy-plugin-anyName {
	width: 400px;
}
```

#### config.js
Basic configuration of your plugin has node.js module syntax. Remember, that `name` of your plugin, `description` and `author` is defined in your `package.json`.

```js
module.exports = {
	// Display name of your plugin, as it will appear in the menu
	displayName: 'Hello world',

	// Place, where opening link to your plugin will appear. So far only
	// Allowed: 'contextmenu', 'menu'
	hook: 'menu',

	// List of external libraries, that should be loaded before
	// your plugin is even mounted to the page
	dependencies: ['https://unpkg.com/d3@5.7.0/dist/d3.min.js']

	// List of class names that will be attached to your plugin upon mounting
	className: 'plugin-lhpane plugin-mobile-fullscreen',

	// If you want to apply different set of classes on mobile devices
	classNameMobile: 'this-is-other',

	// Forces all other window panes, with same pane id to be closed
	// Allowed: 'lhpane', 'rhpane' and 'all'
	exclusive: 'lhpane',

	// The place in page, where your plugin element will be mounted
	// to the page. By default all the plugins are attached to
	// #plugins div
	attachPoint: '#map_container .leaflet-popup-pane',

	// If you want to apply different mounting point on mobile devices
	attachPointMobile: '#plugins'
}
```

## The life cycle of the plugin
### Loading of the plugin
Whenever Windy loads your plugin, following actions will happen:
1) Your `plugin.js` is loaded into Windy, and function `W.loadPlugin` is executed.
2) Link for opening of your plugin is attached to particular menu (defined as `hook` in `config.js`)
3) Done, your plugin is now ready to use. Now user must open your plugin by clicking on a hook link.

### Mounting
Whenever your plugin is opened for the first time, it must be "mounted" to the page:
 1) `html` code of your plugin is wrapped inside `div` with id `windy-plugin-anyName`. Inside is inserted another `div` element, that will act as closing button. Whole plugin element has style `display:none`.
 2) `css` code of your plugin is attached to `<head>` section of Windy
 3) Your plugin element is then inserted into the page inside element, where you required in `config.js` as `attachPoint` (by default inside `#plugins` DIV)
 4) Js code inside `plugin.html` is launched
 5) Then plugin is being opened

Resulting html code should look like this:
```html
	<div id="windy-plugin-anyName" class="classesYouDefined" style="display:none;">
		<div class="closing-x"></div>
		Html content of your plugin
	</div>
```

### Opening
 1) The plugin element is enhanced with class `open` and its style is changed to `display: block;`
 2) CSS class `.onwindy-plugin-anyName` is attached to `<body>` element of page, so you can use CSS to modify other elements on page.
 3) If method `this.onopen`  exists in your js code, it is called. If the plugin was opened from `contextmenu` hook `{ lat, lon }` object is provided as parameters.

### Closing
 1) If method `this.onclose` exists in your js code it is called
 2) Class `open` is removed from the plugin element class to perform closing animation
 3) CSS class `.onwindy-plugin-anyName` is removed from `<body>` element of page
 4) The plugin element gets style `display: none;` after some time

After closing, your plugin remains mounted in a page.

Plugins can be closed by clicking on their close button or programatically by broadcasting message `broadcast.emit('rqstClose', 'name-of-plugin')`


