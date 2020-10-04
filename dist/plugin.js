"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
  "displayName": "Boat tracker",
  "hook": "menu"
},
/* HTML */
'',
/* CSS */
'',
/* Constructor */
function () {
  var map = W.require('map');

  var BoatIcon = L.divIcon({
    html: "<svg  viewBox=\"0 0 14 14\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xml:space=\"preserve\" style=\"fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;\">\n                    <path d=\"M4.784,13.635c0,0 -0.106,-2.924 0.006,-4.379c0.115,-1.502 0.318,-3.151 0.686,-4.632c0.163,-0.654 0.45,-1.623 0.755,-2.44c0.202,-0.54 0.407,-1.021 0.554,-1.352c0.038,-0.085 0.122,-0.139 0.215,-0.139c0.092,0 0.176,0.054 0.214,0.139c0.151,0.342 0.361,0.835 0.555,1.352c0.305,0.817 0.592,1.786 0.755,2.44c0.368,1.481 0.571,3.13 0.686,4.632c0.112,1.455 0.006,4.379 0.006,4.379l-4.432,0Z\" style=\"fill:#002efc;\"/><path d=\"M5.481,12.731c0,0 -0.073,-3.048 0.003,-4.22c0.06,-0.909 0.886,-3.522 1.293,-4.764c0.03,-0.098 0.121,-0.165 0.223,-0.165c0.103,0 0.193,0.067 0.224,0.164c0.406,1.243 1.232,3.856 1.292,4.765c0.076,1.172 0.003,4.22 0.003,4.22l-3.038,0Z\" style=\"fill:#fff;fill-opacity:0.846008;\"/>\n                </svg>",
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
  var markers = [],
      lines = [];

  var updateIconStyle = function updateIconStyle() {
    var _iterator = _createForOfIteratorHelper(markers),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var marker = _step.value;

        if (marker._icon) {
          marker._icon.style.transformOrigin = "12px 12px";

          var heading = marker._icon.getAttribute('data-heading');

          if (marker._icon.style.transform.indexOf('rotateZ') === -1) {
            marker._icon.style.transform = "".concat(marker._icon.style.transform, " rotateZ(").concat(heading || 0, "deg)");
          }
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };

  var load = function load() {
    fetch('https://www.windy.com/img/windy-plugins/boats.json').then(function (response) {
      return response.json();
    }).then(function (result) {
      return result.result;
    }).then(function (result) {
      var hue = 0;

      var _loop = function _loop() {
        var boatName = _Object$keys[_i];
        hue = (hue + 60) % 360;
        var boat = result[boatName];
        var layer = L.polyline(boat.track, {
          color: "hsl(".concat(hue, ", 100%, 45%)"),
          weight: 2
        }).addTo(map);
        layer.on('mouseover', function () {
          return layer.setStyle({
            weight: 4
          });
        });
        layer.on('mouseout', function () {
          return layer.setStyle({
            weight: 2
          });
        });
        var marker = L.marker(boat.track[boat.track.length - 1], {
          icon: BoatIcon
        }).addTo(map);
        markers.push(marker);

        marker._icon.setAttribute('data-heading', boat.heading);

        marker.bindPopup(boatName);
        lines.push(layer);
        updateIconStyle();
      };

      for (var _i = 0, _Object$keys = Object.keys(result); _i < _Object$keys.length; _i++) {
        _loop();
      }
    })["catch"](console.error);
  };

  var remove = function remove() {
    markers.forEach(function (l) {
      return map.removeLayer(l);
    });
    lines.forEach(function (l) {
      return map.removeLayer(l);
    });
    markers = [];
    lines = [];
  };

  var hasHooks = false;

  this.onopen = function () {
    if (hasHooks) {
      return;
    }

    load();
    map.on('zoom', updateIconStyle);
    map.on('zoomend', updateIconStyle);
    map.on('viewreset', updateIconStyle);
    hasHooks = true;
    map.setView([14, -29], 4);
  };

  this.onclose = function () {
    if (!hasHooks) {
      return;
    }

    remove();
    map.off('zoom', updateIconStyle);
    map.off('zoomend', updateIconStyle);
    map.off('viewreset', updateIconStyle);
    hasHooks = false;
  };
});