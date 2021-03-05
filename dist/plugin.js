"use strict";

/**
 * This is main plugin loading function
 * Feel free to write your own compiler
 */
W.loadPlugin(
/* Mounting options */
{
  "name": "windy-plugin-skewt",
  "version": "0.8.0",
  "author": "John C. Kealy",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/johnckealy/windy-plugin-skewt"
  },
  "description": "A plugin to plot skewT-logP diagrams in windy.com",
  "displayName": "SkewT",
  "hook": "contextmenu",
  "dependencies": ["https://d3js.org/d3.v4.js"]
},
/* HTML */
'<div id="navigator"> <div id="skewt-header"> <div id="ft-title"> <p id="initial-message">To display a Skew-T, click anywhere on the map.<br><br> Model ascents will appear wherever the picker is opened. Clicking the map also reveals the closest Radiosonde station. </p> </div> <div id="skewt-control-panel" style="display: none"> <span id="closebutton" class="controls">&#x2715;</span> <span id="zoom-out" class="controls">&#x1f50d&#x2212</span> <span id="zoom-in" class="controls">&#x1f50d&#x2b</span> </div> <div id="skewt-container"></div> <div id="sonde-btns"> <div> <input type="checkbox" id="show-sondes-checkbox" checked> <label for="show-sondes-checkbox"> Show Sondes</label> </div> <button id="close-tooltips"> CLEAR SONDES</button> </div> </div> </div>',
/* CSS */
'.leaflet-top{transform:translate(35px, 75px)}.controls{background-color:rgba(0,0,0,0.5);border-radius:12px;font-size:15px;padding:5px}#navigator{position:absolute;top:100px;left:50px;font-size:25px}#closebutton,#zoom-out,#zoom-in{cursor:default}.css-icon{background:#0300be;border-radius:50%}.tooltip{font-size:18px;border-radius:10px;padding:10px}#sonde-btns{display:flex;justify-content:space-between;align-items:center;font-family:Arial,Helvetica,sans-serif}#sonde-btns button{padding:7px;border-radius:10px;background-color:aliceblue}#sonde-btns input{width:20px;height:20px}#initial-message{background-color:white;color:black;opacity:.7;padding:20px;border-radius:10px;max-width:500px}',
/* Constructor */
function () {});