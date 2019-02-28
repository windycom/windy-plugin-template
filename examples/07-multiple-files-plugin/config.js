/*
	This is configuration file for your plugin
*/
module.exports = {

	displayName: 'Graph as a plugin',

	hook: 'contextmenu',

	// External dependencies
	dependencies: [
		'https://unpkg.com/d3@5.7.0/dist/d3.min.js'
	],

	// Class name applied to your plugin element
  className: 'drop-down-window ',
  classNameMobile: 'drop-down-window down', // for mobile devices

	// The place in page, where your plugin element
	// will be mounted to the page. By default all the plugins
	// are attached to #plugins element
  attachPoint: '.leaflet-popup-pane',
  attachPointMobile: '#plugins' // for mobile devices

}
