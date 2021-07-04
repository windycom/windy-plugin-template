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
  "displayName": "drag demo",
  "hook": "contextmenu",
  "className": "plugin-lhpane",
  "classNameMobile": "plugin-mobile-bottom-slide",
  "exclusive": "lhpane"
},
/* HTML */
'<div class="mobile-header"> Drag demo </div> <div class="plugin-content"> <div class="mobile-title">Drag demo</div> <h3 class="section-title">Drag demo</h3> <div id="dragdemo-container"> <div id="dragdemo-x"></div> <div id="dragdemo-y"></div> <div id="dragdemo-box"></div> </div> <div style=" border:1px solid blue; border-radius:5px; padding:10px; margin:5px; "> <h2>This plugin is:</h2> <br> <li>A boilerplate for building plugins on mobile.</li> <li>A demonstration on how to use the bottomSlider mechanism to close the plugin pane on mobile. </li> <li>I have also modified the bottomSlider so that the plugin pane can be dragged down partially, to display part of the map and the picker.</li> <li>The Drag class is also demonstrated:</li> <li>-&nbsp;&nbsp;&nbsp;&nbsp;You can drag the circle in the box above, or </li> <li>-&nbsp;&nbsp;&nbsp;&nbsp;If you drag the open white area the cross hairs will move.</li> <li>The z-index of the plugin is set to 10 so that it appears on top of the picker. </li> <li>The z-index of the bottom element is set to 20, so that the calendar is on top of the plugin.</li> <li>A backdrop (linear-gradient background image) is created for the calendar timecode.</li> <li>The rest of this block is just to demonstrate scrolling. When you scroll down the "mobile-header" class becomes visible.</li> <br><br> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </div> </div> <div class="calendar-backdrop"> </div>',
/* CSS */
'.onwindy-plugin-examples .left-border{left:300px}.onwindy-plugin-examples #search{display:none}#windy-plugin-examples{width:300px;height:100%;border-radius:8px}#windy-plugin-examples .section-title{text-align:center}#windy-plugin-examples #dragdemo-container{box-sizing:border-box;position:relative;border-radius:5px;border:1px solid blue;background-color:white;height:300px;margin:5px}#windy-plugin-examples #dragdemo-container .line{position:absolute;border:0px;background-color:black}#windy-plugin-examples #dragdemo-container #dragdemo-x{position:absolute;border:0px;background-color:black;left:30px;height:100%;width:.5px}#windy-plugin-examples #dragdemo-container #dragdemo-y{position:absolute;border:0px;background-color:black;top:30px;height:.5px;width:100%}#windy-plugin-examples #dragdemo-container #dragdemo-box{position:absolute;height:20px;width:20px;border-radius:10px;border:1px solid black;top:40px;left:40px}#windy-plugin-examples .plugin-content{border-bottom-left-radius:8px;border-bottom-right-radius:8px}#device-mobile #open-in-app{display:none}#device-mobile .onwindy-plugin-examples #bottom{left:0px;z-index:20}#device-mobile #windy-plugin-examples{bottom:60px;height:auto;width:100%;transition:bottom .3s;z-index:10}#device-mobile #windy-plugin-examples .section-title{display:none}#device-mobile #windy-plugin-examples .calendar-backdrop{bottom:0px;height:40px;width:100%;position:absolute;overflow:hidden}#device-mobile #windy-plugin-examples .plugin-content{padding-bottom:40px}#device-mobile .mobile-calendar-expanded #windy-plugin-examples{bottom:100px}#device-tablet .onwindy-plugin-examples #bottom{margin-left:300px}#device-tablet #logo{left:100%;margin-left:150px}#device-tablet #open-in-app{display:none}',
/* Constructor */
function () {
  var _this = this;

  var Drag = W.require('Drag');

  var rs = W.require('rootScope');

  var $ = W.require('$');

  this.lastOpened = true;
  var bgVals = getComputedStyle($(".plugin-content", this.el)).backgroundColor.replace("rgb", "rgba").match(/[\d\.]+/g);
  if (bgVals.length == 3) bgVals.push(1);
  $(".calendar-backdrop", this.el).style.backgroundImage = "linear-gradient(rgba(".concat(bgVals.slice(0, 3), ",0), rgba(").concat(bgVals, ") 60%)");

  if (rs.isMobile) {
    this.addMobileSlider = true;
    this.closeOnSwipeDown = false;
    setTimeout(function () {
      var bs = _this.bottomSlider;
      bs.el.removeEventListener('mousedown', bs.bindedStart);

      if (bs.supportTouch) {
        bs.el.removeEventListener('touchstart', bs.bindedStart);
      }

      bs.bindedStart = Drag.startDrag.bind(bs);
      bs.el.addEventListener('mousedown', bs.bindedStart);

      if (bs.supportTouch) {
        bs.el.addEventListener('touchstart', bs.bindedStart);
      }

      bs.origTopOfPlugin = _this.el.offsetTop;

      bs.ondragstart = function () {
        bs.startTop = _this.el.offsetTop;
      };

      bs.ondrag = function (x, y) {
        var deltaY = y - bs.el.offsetTop;
        _this.el.style.top = bs.startTop + deltaY + "px";
      };

      bs.ondragend = function () {
        if (Math.abs(_this.el.offsetTop < 20)) _this.el.style.top = bs.origTopOfPlugin + "px";

        if (_this.el.offsetHeight < 70) {
          _this.close();

          setTimeout(function () {
            return _this.el.style.top = bs.origTopOfPlugin + "px";
          }, 500);
        }
      };
    }, 0);
  }

  this.onOtherPluginOpened = function (plugin) {
    console.log("This ".concat(plugin, " has opened"));
  };

  var dragDiv = Object.assign({
    el: $("#dragdemo-box"),
    ondrag: function ondrag(x, y) {
      x = x < 0 ? 0 : x > $("#dragdemo-container").offsetWidth - 22 ? $("#dragdemo-container").offsetWidth - 22 : x;
      y = y < 0 ? 0 : y > $("#dragdemo-container").offsetHeight - 22 ? $("#dragdemo-container").offsetHeight - 22 : y;
      this.el.style.left = x + "px";
      this.el.style.top = y + "px";
    },
    ondragstart: function ondragstart(xy) {},
    ondragend: function ondragend(e) {
      console.log("Do something with event:", e);
    }
  }, Drag);

  dragDiv._init();

  $("#dragdemo-box").addEventListener("touchstart", function (e) {
    return e.stopPropagation();
  });
  $("#dragdemo-box").addEventListener("mousedown", function (e) {
    return e.stopPropagation();
  });
  var dragContainer = Object.assign({
    el: $("#dragdemo-container"),
    ondrag: function ondrag(x, y) {
      $("#dragdemo-x").style.left = x + this.startLeft - this.el.style.left.slice(0, -2) - 1.5 + "px";
      $("#dragdemo-y").style.top = y + this.startTop - this.el.style.top.slice(0, -2) - 1.5 + "px";
    },
    ondragstart: function ondragstart(xy) {
      var clientRect = this.el.getBoundingClientRect();
      this.startLeft = xy[0] - clientRect.left - this.el.offsetLeft;
      this.startTop = xy[1] - clientRect.top - this.el.offsetTop;
      this.ondrag(this.el.offsetLeft, this.el.offsetTop);
    },
    ondragend: function ondragend(e) {
      console.log("Do something with event:", e);
    }
  }, Drag);

  dragContainer._init();
});