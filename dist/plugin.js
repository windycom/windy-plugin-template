"use strict";

/**
 * This is main plugin loading function
 * Feel free to write your own compiler
 */
W.loadPlugin(
/* Mounting options */
{
  "name": "windy-plugin-examples",
  "version": "0.5.0",
  "author": "Windyty, S.E.",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/windycom/windy-plugins"
  },
  "description": "Windy plugin system enables anyone, with basic knowledge of Javascript to enhance Windy with new functionality (default desc).",
  "displayName": "Window on the left",
  "hook": "menu",
  "className": "plugin-lhpane plugin-mobile-fullscreen",
  "exclusive": "lhpane"
},
/* HTML */
'<div class="mobile-header"> <div class="mh-closing-x iconfont clickable" data-do="rqstClose,windy-plugin-examples">}</div> This is the title for mobile devices. </div> <div class="plugin-content"> <h2>Plugin on the left side</h2> <p> Use left side window to present larger amount of information. Check the plugin in mobile phone display to see effect of \'plugin-mobile-fullscreen\' class </p> <p>This plugin also demonstrates:</p> <p> 1) Receiving broadcasted messages. Open your console, to see console.log messages </p> <p>2) Using store to programatically change overlay</p> </div>',
/* CSS */
'.onwindy-plugin-examples .left-border{left:400px}.onwindy-plugin-examples #search{display:none}#windy-plugin-examples{width:400px;height:100%}#windy-plugin-examples .plugin-content{padding:20px 15px 15px 15px;font-size:14px;line-height:1.6}',
/* Constructor */
function () {
  var store = W.require('store');

  var bcast = W.require('broadcast');

  var hasHooks = false,
      timer = null;
  var overlays = ['rain', 'wind', 'temp', 'clouds'],
      i = 0;

  var log = function log(params) {
    return console.log('Received "redrawFinished" bcast', params);
  };

  this.onopen = function () {
    if (hasHooks) {
      return;
    }

    timer = setInterval(function () {
      i = i === 3 ? 0 : i + 1;
      store.set('overlay', overlays[i]);
    }, 2000);
    bcast.on('redrawFinished', log);
    hasHooks = true;
  };

  this.onclose = function () {
    if (hasHooks) {
      clearInterval(timer);
      bcast.off('redrawFinished', log);
      hasHooks = false;
    }
  };
});