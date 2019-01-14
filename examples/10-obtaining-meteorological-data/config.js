module.exports = {

	displayName: 'Using pluginDataLoader',

	hook: 'menu',

	/*
	List of class names that will be attached to your
	plugin upon mounting
	*/
	className: 'plugin-lhpane plugin-mobile-fullscreen',

	/*
	Identifier of a pane, where your plugin will reside.
	Since we want to have only one pane on left side,
	this string will guarantee, that all other plugins
	on the left side will be closed.
	*/
	exclusive: 'lhpane',

}
