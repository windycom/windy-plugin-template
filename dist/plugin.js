"use strict";

/**
 * This is main plugin loading function
 * Feel free to write your own compiler
 */
W.loadPlugin(
/* Mounting options */
{
  "name": "windy-plugin-examples",
  "version": "0.2.0",
  "author": "Windyty, S.E.",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/windycom/windy-plugins"
  },
  "description": "Windy plugin system enables anyone, with basic knowledge of Javascript to enhance Windy with new functionality (default desc).",
  "displayName": "Loading backend data",
  "hook": "menu",
  "className": "plugin-lhpane plugin-mobile-fullscreen",
  "exclusive": "lhpane"
},
/* HTML */
'<div class="mobile-header">This is title for mobile devices</div> <div class="plugin-content"> <h2>Loading data from Windy API</h2> <p>This plugin demonstrates communication with backend API and retrieving varions parameters</p> <p>1) Get your API key <a hrer="https://api4.windy.com/api-key/">here</a>. Ignore "Allowed domains" fields.</p> <p>2) Use <b>@windy/pluginDataLoader</b> module to retrieve the data.</p> <hr> <p>Forecast data:</p> <p data-ref="forecast" class="size-xxs"></p> <hr> <p>Air data:</p> <p data-ref="airData" class="size-xxs"></p> <hr> <p>Do you want to add additional data to our backend API? Let us know <a href="https://community.windy.com/category/21/windy-plugins">here</a></p> </div>',
/* CSS */
'.onwindy-plugin-examples .left-border{left:400px}.onwindy-plugin-examples #search{display:none}#windy-plugin-examples{width:400px}#windy-plugin-examples .plugin-content{padding:20px 15px 15px 15px;font-size:14px;line-height:1.6}#windy-plugin-examples .plugin-content a{color:#9D0300}',
/* Constructor */
function () {
  var _this = this;

  var map = W.require('map');

  var pluginDataLoader = W.require('pluginDataLoader');

  var options = {
    key: 'RxcwkWO2XWsfEbdidcsskbyWqhToAwLx',
    plugin: 'windy-plugin-examples'
  };
  var load = pluginDataLoader(options);

  this.onopen = function () {
    map.setView([50, 14]);
    var dataOptions = {
      model: 'gfs',
      lat: 50,
      lon: 14
    };
    load('forecast', dataOptions).then(function (_ref) {
      var data = _ref.data;
      _this.refs.forecast.innerHTML = JSON.stringify(data);
      console.log(data);
    });
    load('airData', dataOptions).then(function (_ref2) {
      var data = _ref2.data;
      _this.refs.airData.innerHTML = JSON.stringify(data);
      console.log(data);
    });
  };
});
