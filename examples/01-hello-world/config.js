module.exports = {
  /*

		Most important config variable is name of your plugin,
		which is defined in your package.json, since the name
		of your plugin must be same as the name of your npm package.

		The name of your plugin, and your npm package
		must have form 'windy-plugin-anyName'

	*/

  /*
		Display name of your plugin, as it will
		appear in the menu
	*/
  displayName: "Hello world",

  /*
		Place, where opening link to your plugin
		will appear. So far only 'contextmenu'
		and 'menu' is allowed
	*/
  hook: "menu",
};
