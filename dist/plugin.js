"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
'<div id="skewt-wraper" class="shy left-border right-border radar-wrapper"> <div id="navigator"> <div id="skewt-header"> <div id="ft-title"> <p>To display a Skew-T, choose a <br> location and open the picker...</p> </div> <div id="skewt-control-panel" style="display: none"> <span id="closebutton" class="controls">&#x2715;</span> <span id="zoom-out" class="controls">&#x1f50d&#x2212</span> <span id="zoom-in" class="controls">&#x1f50d&#x2b</span> </div> <div id="skewt-container"></div> </div> </div> </div>',
/* CSS */
'.leaflet-top{transform:translate(35px, 75px)}.controls{background-color:rgba(0,0,0,0.5);border-radius:12px;font-size:15px;padding:5px}#navigator{position:absolute;top:100px;left:50px;font-size:25px}#closebutton,#zoom-out,#zoom-in{cursor:default}',
/* Constructor */
function () {
  var broadcast = W.require('broadcast');

  var store = W.require('store');

  var picker = W.require('picker');

  function cskewT(Pascent, Tascent, Tdascent, startpressure, endpressure) {
    if (zoomed) {
      var minT = Math.max.apply(Math, _toConsumableArray(Tascent)) - 20.0;
      var maxT = minT + 30;
      startpressure = Pascent[0] + 70;
      endpressure = Pascent[0] - 400;
    } else {
      var minT = Math.max.apply(Math, _toConsumableArray(Tascent)) - 50.0;
      var maxT = minT + 80;
    }

    var P = [startpressure];
    var dp = -5;
    var pressure = startpressure;

    while (pressure > endpressure) {
      pressure = pressure + dp;
      P.push(pressure);
    }

    ;
    var minP = P[P.length - 1];
    var maxP = P[0];
    d3.select("#skewTbox").remove();
    window.svg = d3.select("#skewt-container").append("svg").attr("height", h).attr("width", w + barbsw).attr('id', 'skewTbox');
    svg.append("rect").attr("height", h).attr("width", w).attr("fill", "white").attr("opacity", 0.8).attr('id', 'skewTd3');
    draw_isopleths();
    skewT_main(Pascent, Tascent, Tdascent);

    function draw_isopleths() {
      for (var T = -80; T <= 40; T = T + 10) {
        draw_isotherm(T);
      }

      ;

      for (var p = 100; p <= 1000; p = p + 100) {
        draw_isobar(p);
      }

      ;

      for (var a = -80; a <= 150; a = a + 10) {
        draw_dry_adiabat(a, P);
      }

      ;
      draw_moist_adiabat(-47.0);
      draw_moist_adiabat(-37.0);
      draw_moist_adiabat(-27.0);
      draw_moist_adiabat(-17.0);
      draw_moist_adiabat(-7);
      draw_moist_adiabat(2.6);
      draw_moist_adiabat(12.15);
      draw_moist_adiabat(21.8);
      draw_moist_adiabat(31.6);
      draw_moist_adiabat(40);
      draw_moist_adiabat(50);
      draw_moist_adiabat(60);
      draw_Isohume(0.001);
      draw_Isohume(0.01);
      draw_Isohume(0.1);
      draw_Isohume(0.5);
      draw_Isohume(1.0);
      draw_Isohume(2.0);
      draw_Isohume(5.0);
      draw_Isohume(8.0);
      draw_Isohume(12.0);
      draw_Isohume(16.0);
      draw_Isohume(20.0);
    }

    function skewT_main(Pascent, Tascent, Tdascent) {
      var Pascent = interpolateArray(Pascent, P.length);
      var Tascent = interpolateArray(Tascent, P.length);
      var Tdascent = interpolateArray(Tdascent, P.length);
      plot_sounding();
      parcelAsc(Pascent, Tascent, Tascent[0], Pascent[0], Tdascent[0], maxP, minP, maxT, minT, svg, dp, P);

      function interpolateArray(data, fitCount) {
        var linearInterpolate = function linearInterpolate(before, after, atPoint) {
          return before + (after - before) * atPoint;
        };

        var newData = new Array();
        var springFactor = new Number((data.length - 1) / (fitCount - 1));
        newData[0] = data[0];

        for (var i = 1; i < fitCount - 1; i++) {
          var tmp = i * springFactor;
          var before = new Number(Math.floor(tmp)).toFixed();
          var after = new Number(Math.ceil(tmp)).toFixed();
          var atPoint = tmp - before;
          newData[i] = linearInterpolate(data[before], data[after], atPoint);
        }

        newData[fitCount - 1] = data[data.length - 1];
        return newData;
      }

      ;

      function plot_sounding() {
        var Px = [];
        var Pdx = [];

        for (var i = 0; i < Pascent.length; i++) {
          var Tnew = Tascent[i] + -1 * minT;
          var Tpx = w * Tnew / (maxT - minT);
          var Ppx = h * (Math.log(Pascent[i]) - Math.log(minP)) / (Math.log(maxP) - Math.log(minP));
          Px.push([Tpx, Ppx]);
        }

        ;

        for (i = 0; i < Px.length; i++) {
          Px[i][0] = Px[i][0] + h - Px[i][1];
        }

        ;

        for (i = 0; i < Pascent.length; i++) {
          var Tnew = Tdascent[i] + -1 * minT;
          var Tdpx = w * Tnew / (maxT - minT);
          var Ppx = h * (Math.log(Pascent[i]) - Math.log(minP)) / (Math.log(maxP) - Math.log(minP));
          Pdx.push([Tdpx, Ppx]);
        }

        ;

        for (i = 0; i < Px.length; i++) {
          Pdx[i][0] = Pdx[i][0] + h - Pdx[i][1];
        }

        ;
        var lineGenerator = d3.line();
        var pathString = lineGenerator(Px);
        svg.append("path").attr('d', pathString).attr('id', 'SdTPath').style("fill", 'none').style("stroke-width", 4).style("stroke", 'black');
        var pathStringTd = lineGenerator(Pdx);
        svg.append("path").attr('d', pathStringTd).style("fill", 'none').attr('id', 'SdTdPath').style("stroke-width", 4).style("stroke-dasharray", "8, 4").style("stroke", 'black');
      }

      ;
    }

    ;

    function draw_isobar(Pconst) {
      var Px = [];
      var Pt = [Pconst, Pconst];
      var Temps = [minT, maxT];

      for (var i = 0; i < Pt.length; i++) {
        var T = Temps[i] + -1 * minT;
        var Tpx = w * T / (maxT - minT);
        var Ppx = h * (Math.log(Pt[i]) - Math.log(minP)) / (Math.log(maxP) - Math.log(minP));
        Px.push([Tpx, Ppx]);
      }

      ;
      var lineGenerator = d3.line();
      var isoPathString = lineGenerator(Px);
      var strID = Pt + 'textid';
      svg.append("path").attr('id', strID).attr('d', isoPathString).style("fill", 'none').style("stroke-width", 1.5).style("stroke", 'green');
      svg.append("g").append("text").style("font-size", "17px").style('fill', "green").attr("x", 20).attr("transform", "translate(0,-3)").append("textPath").attr("xlink:href", "#" + strID).text('\xa0\xa0' + Pconst + ' hPa');
    }

    ;

    function dry_adiabat_gradient(theta, pressure, temperature, dp) {
      var CONST_CP = 1.03e3;
      var CONST_RD = 287.0;
      var Po = 1000.0;
      var theta = theta + 273.15;
      var Tt = theta * Math.pow(Po / pressure, -CONST_RD / CONST_CP);
      var Tt = Tt - 273.15;
      var dt = Tt - temperature;
      return [dp, dt];
    }

    ;

    function draw_moist_adiabat(Tbase) {
      var Pnew = 1050.0;
      var Tnew = Tbase;
      var Tnew_arr = [];
      var P_arr = [];
      var Px = [];

      for (var i = 0; i < P.length; i++) {
        var DPDT = wet_adiabat_gradient(-80.0, Pnew, Tnew, dp);
        Tnew = Tnew + DPDT[1];
        var T = Tnew + -1 * minT;
        var Tpx = w * T / (maxT - minT);
        var Ppx = h * (Math.log(P[i]) - Math.log(minP)) / (Math.log(maxP) - Math.log(minP));
        Px.push([Tpx, Ppx]);
        Pnew = Pnew + DPDT[0];
      }

      ;

      for (i = 0; i < Px.length; i++) {
        Px[i][0] = Px[i][0] + h - Px[i][1];
      }

      ;
      var lineGenerator = d3.line();
      var maPathString = lineGenerator(Px);
      svg.append("path").attr('d', maPathString).style("fill", 'none').style("stroke-width", 1).style("stroke", 'green');
    }

    ;

    function draw_isotherm(temp) {
      var Px = [];

      for (var i = 0; i < P.length; i++) {
        var T = temp + -1 * minT;
        var Tpx = w * T / (maxT - minT);
        var Ppx = h * (Math.log(P[i]) - Math.log(minP)) / (Math.log(maxP) - Math.log(minP));
        Px.push([Tpx, Ppx]);
      }

      ;

      for (i = 0; i < Px.length; i++) {
        Px[i][0] = Px[i][0] + h - Px[i][1];
      }

      ;
      var lineGenerator = d3.line();
      var pathString3 = lineGenerator(Px);
      var strID = 'textid' + temp;
      svg.append("path").attr('id', strID).attr('d', pathString3).style("fill", 'none').style("stroke-width", 1).style("stroke", 'green');

      if (temp == 0) {
        svg.select('#' + strID).style("stroke-width", 1.2).style("stroke", 'blue');
      }

      ;
      svg.append("text").style("font-size", "17px").style('fill', "green").attr("transform", "translate(0,-3)").append("textPath").attr("xlink:href", "#" + strID).text('\xa0\xa0\xa0\xa0\xa0\xa0' + temp + ' C');
    }

    ;

    function draw_Isohume(q) {
      var Px = [];

      for (var i = 0; i < P.length; i++) {
        var es = P[i] * q / (q + 622.0);
        var logthing = Math.pow(Math.log(es / 6.11), -1.0);
        var temp = Math.pow(17.269 / 237.3 * (logthing - 1.0 / 17.269), -1.0);
        var T = temp + -1 * minT;
        var Tpx = w * T / (maxT - minT);
        var Ppx = h * (Math.log(P[i]) - Math.log(minP)) / (Math.log(maxP) - Math.log(minP));
        var TH = (273.15 + T) * Math.pow(1000.0 / P[i], -0.286) - 273.15;
        Px.push([Tpx, Ppx]);
      }

      ;

      for (i = 0; i < Px.length; i++) {
        Px[i][0] = Px[i][0] + h - Px[i][1];
      }

      ;
      var lineGenerator = d3.line();
      var pathStringQ = lineGenerator(Px);
      var strID = temp + 'textid';
      svg.append("path").attr('id', strID).attr('d', pathStringQ).style("fill", 'none').style("stroke-width", 1).style("stroke-dasharray", "15, 8").style("stroke", 'green');
      svg.append("text").style("font-size", "11px").style('fill', "green").attr("transform", "translate(0,-3)").append("textPath").attr("xlink:href", "#" + strID).text('\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + q + ' g/kg');
    }

    ;

    function wet_adiabat_gradient(min_temperature, pressure, temperature, dp) {
      var CONST_CP = 1.03e3;
      var CONST_K = 0.286;
      var CONST_KELVIN = 273.15;
      var CONST_L = 2.5e6;
      var CONST_MA = 300.0;
      var CONST_RD = 287.0;
      var CONST_RV = 461.0;
      var kelvin = temperature + CONST_KELVIN;
      var lsbc = CONST_L / CONST_RV * (1.0 / CONST_KELVIN - 1.0 / kelvin);
      var rw = 6.11 * Math.exp(lsbc) * (0.622 / pressure);
      var lrwbt = CONST_L * rw / (CONST_RD * kelvin);
      var nume = CONST_RD * kelvin / (CONST_CP * pressure) * (1.0 + lrwbt);
      var deno = 1.0 + lrwbt * (0.622 * CONST_L / (CONST_CP * kelvin));
      var gradi = nume / deno;
      var dt = dp * gradi;
      return [dp, dt];
    }

    ;

    function draw_dry_adiabat(Tbase, P) {
      var Pnew = 1050.0;
      var Tnew = Tbase;
      var Tnew_arr = [];
      var P_arr = [];
      var Px = [];

      for (var i = 0; i < P.length; i++) {
        var DPDT = dry_adiabat_gradient(Tbase, Pnew, Tnew, dp);
        Tnew = Tnew + DPDT[1];
        var T = Tnew + -1 * minT;
        var Tpx = w * T / (maxT - minT);
        var Ppx = h * (Math.log(P[i]) - Math.log(minP)) / (Math.log(maxP) - Math.log(minP));
        Px.push([Tpx, Ppx]);
        Pnew = Pnew + DPDT[0];
      }

      ;

      for (i = 0; i < Px.length; i++) {
        Px[i][0] = Px[i][0] + h - Px[i][1];
      }

      ;
      var lineGenerator = d3.line();
      var daPathString = lineGenerator(Px);
      svg.append("path").attr('d', daPathString).style("fill", 'none').style("stroke-width", 1).style("stroke", 'green');
    }

    ;
  }

  ;

  function cbarbs(Pascent, Tascent, U, V, current_timestamp, dataOptions, cmaxP, cminP) {
    dataOptions.model = store.get('product').toUpperCase();
    var CONTROLS_OFFSET = document.getElementById('skewt-control-panel').offsetHeight;
    svg.append("rect").attr("x", w - 0.65 * w).attr("height", 0.05 * h).attr("width", 0.65 * w).attr("fill", "#424040").attr("opacity", "1.0");
    var date = new Date(current_timestamp);
    var options = {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      timeZoneName: 'short'
    };
    date = date.toLocaleDateString("en-US", options);
    svg.append("g").append("text").html(dataOptions.model.toUpperCase() + '\xa0\xa0\xa0' + date).attr("x", w - 0.64 * w).attr("y", 0.035 * h).attr("font-family", "sans-serif").attr("font-family", "Arial").attr("font-size", 0.03 * h + "px").attr("fill", "#cccccc").attr("id", "statsID");

    onmousemove = function onmousemove(e) {
      wind_tooltip(e.clientX, e.clientY);
    };

    function wind_tooltip(x, y) {
      svg.select("#statsID").remove();
      y = y - y_offset - CONTROLS_OFFSET;
      var logP = y / barbsh * (Math.log(cmaxP) - Math.log(cminP)) + Math.log(cminP);
      var P = Math.exp(logP);
      var widx = closest(Pascent, P);
      var wdir = get_winddir(U[widx], V[widx]);
      var WSpeed = 1.943 * Math.sqrt(Math.pow(U[widx], 2) + Math.pow(V[widx], 2));

      if (P >= 1050) {
        P = Pascent[0];
      } else if (P <= 170) {
        P = 170;
      }

      var z = -10.0 * Math.log(P / Pascent[0]);
      svg.append("g").append("text").html(dataOptions.model + '\xa0\xa0\xa0' + Math.round(z) + " km \xa0\xa0  " + Math.round(P) + " hPa \xa0\xa0  " + Math.round(WSpeed) + " kt \xa0/\xa0" + Math.round(wdir) + "&#176\xa0\xa0\xa0\xa0 " + Tascent[widx] + "&#176C").attr("x", w - 0.64 * w).attr("y", 0.035 * h).attr("font-family", "sans-serif").attr("font-family", "Arial").attr("font-size", 0.03 * h + "px").attr("fill", "#cccccc").attr("id", "statsID");
    }

    window.svgbarbs = svg.append("rect").attr('x', w).attr("height", barbsh).attr("width", barbsw).attr("fill", "#424040").attr("opacity", 1.0).attr('id', 'barbsd3');

    for (var pp = 200; pp <= 1000; pp = pp + 50) {
      var widx = closest(Pascent, pp);
      draw_windbarbs(Pascent[widx], U[widx], V[widx]);
    }

    ;

    function draw_windbarbs(P, U, V) {
      var scale = 0.1;
      var barb05 = "m 0,0 200,0 m -20,0 25,35";
      var barb10 = "m 0,0 200,0 m 0,0 50,70";
      var barb15 = "m 0,0 200,0 m 0,0 50,70 m -35,0 m -50,-70 m 0,0 25,35";
      var barb20 = "m 0,0 200,0 m 0,0 50,70 m -35,0 -50,-70";
      var barb25 = "m 0,0 200,0 m 0,0 50,70 m -35,0 -50,-70 m -35,0 25,35";
      var barb30 = "m 0,0 200,0 m 0,0 50,70 m -35,0 -50,-70 m -35,0 50,70";
      var barb35 = "m 0,0 200,0 m 0,0 50,70 m -35,0 -50,-70 m -35,0 50,70 m -35,0 m -50,-70 m 0,0 25,35";
      var barb40 = "m 0,0 200,0 m 0,0 50,70 m -35,0 -50,-70 m -35,0 50,70 m -35,0 -50,-70";
      var barb45 = "m 0,0 200,0 m 0,0 50,70 m -35,0 -50,-70 m -35,0 50,70 m -35,0 -50,-70 m -35,0 m 0,0 25,35";
      var barb50 = "m 0,0 200,0 0,70 -50,-70";
      var barb60 = "m 0,0 200,0 0,70 -50,-70 m -35,0 50,70";
      var barb70 = "m 0,0 200,0 0,70 -50,-70 m -35,0 50,70 m -35,0 m -50,-70 m 0,0 50,70";
      var barb80 = "m 0,0 200,0 0,70 -50,-70 m -35,0 50,70 m -35,0 m -50,-70 m 0,0 50,70 m -35,0 m -50,-70 m 0,0 50,70";
      var barb90 = "m 0,0 200,0 0,70 -50,-70 m -35,0 50,70 m -35,0 m -50,-70 m 0,0 50,70 m -35,0 m -50,-70 m 0,0 50,70 m -35,0 m -50,-70 m 0,0 50,70";
      var barb100 = "m 0,0 200,0 0,70 -50,-70 m -10,0 m 0,0 0,70 -50,-70";
      var Nobarb = "";
      var VPpx = barbsh * (Math.log(P) - Math.log(cminP)) / (Math.log(cmaxP) - Math.log(cminP));
      var wdir = get_winddir(U, V);
      var WSpeed = 1.943 * Math.sqrt(Math.pow(U, 2) + Math.pow(V, 2));

      if (WSpeed < 7.5) {
        var barbie = barb05;
      } else if (WSpeed >= 7.5 && WSpeed < 12.5) {
        var barbie = barb10;
      } else if (WSpeed >= 12.5 && WSpeed < 17.5) {
        var barbie = barb15;
      } else if (WSpeed >= 17.5 && WSpeed < 22.5) {
        var barbie = barb20;
      } else if (WSpeed >= 22.5 && WSpeed < 27.5) {
        var barbie = barb25;
      } else if (WSpeed >= 27.5 && WSpeed < 32.5) {
        var barbie = barb30;
      } else if (WSpeed >= 32.5 && WSpeed < 37.5) {
        var barbie = barb35;
      } else if (WSpeed >= 37.5 && WSpeed < 42.5) {
        var barbie = barb40;
      } else if (WSpeed >= 42.5 && WSpeed < 47.5) {
        var barbie = barb45;
      } else if (WSpeed >= 47.5 && WSpeed < 55.0) {
        var barbie = barb50;
      } else if (WSpeed >= 55.0 && WSpeed < 65.0) {
        var barbie = barb60;
      } else if (WSpeed >= 65.0 && WSpeed < 75.0) {
        var barbie = barb70;
      } else if (WSpeed >= 75.0 && WSpeed < 85.0) {
        var barbie = barb80;
      } else if (WSpeed >= 85.0 && WSpeed < 95.0) {
        var barbie = barb90;
      } else {
        var barbie = Nobarb;
      }

      if (wdir >= 0 && wdir <= 360) {
        svg.append("path").attr("stroke", "#cccccc").style("stroke-width", "17px").attr("fill", "#cccccc").attr("d", barbie).attr("transform", "translate(" + (w + barbsw / 2) + "," + VPpx + ") rotate(" + (wdir - 90) + ",0,0) scale(" + scale + ")  ");
      }

      ;
    }

    ;

    function closest(list, x) {
      var chosen = 0;

      for (var i in list) {
        var miin = Math.abs(list[chosen] - x);

        if (Math.abs(list[i] - x) < miin) {
          chosen = i;
        }
      }

      return chosen;
    }

    ;

    function get_winddir(u, v) {
      var wdir;

      if (v > 0) {
        wdir = 180 / Math.PI * Math.atan(u / v) + 180;
      } else if (u < 0 && v < 0) {
        wdir = 180 / Math.PI * Math.atan(u / v) + 0;
      } else if (u > 0 && v < 0) {
        wdir = 180 / Math.PI * Math.atan(u / v) + 360;
      }

      return wdir;
    }

    ;
  }

  ;

  var parcelAsc = function parcelAsc(pressurehPa, temperatureC, surfaceTempC, surfacePresshPA, surfaceTdC, maxP, minP, maxT, minT, svg, Dp, P) {
    var Cp = 1.03e3;
    var Rd = 287.0;

    var lambert = function lambert(xx, nb) {
      var init = 1;
      var em = -Math.exp(-1.0);
      var em9 = -Math.exp(-9.0);
      var c13 = 1.0 / 3.0;
      var em2 = 2.0 / em;
      var s2 = Math.sqrt(2.0);
      var crude;

      if (xx <= em9) {
        var zl = Math.log(-xx);
        var t = -1.0 - zl;
        var ts = Math.sqrt(t);
        crude = zl - 2.0 * ts / (s2 + (c13 - t / (2.7 + ts * 127.0471381349219)) * ts);
      } else {
        var _zl = Math.log(-xx);

        var eta = 2.0 - em2 * xx;
        crude = Math.log(xx / Math.log(-xx / ((1.0 - 0.5043921323068457 * (_zl + 1.0)) * (Math.sqrt(eta) + eta / 3.0) + 1.0)));
      }

      return crude;
    };

    var findLCL = function findLCL(TC, TdC, pHP) {
      var T = TC + 273.15;
      var p = pHP * 100.0;
      var es = 6.1078 * Math.exp(17.269 * TC / (237.3 + TC));
      var ee = 6.1078 * Math.exp(17.269 * TdC / (237.3 + TdC));
      var RH = ee / es;
      var qv = 0.622 * ee / (pHP - ee);
      var Ttrip = 273.16;
      var E0v = 2.3740e6;
      var rgasa = 287.04;
      var rgasv = 461.0;
      var cva = 719.0;
      var cvv = 1418.0;
      var cvl = 4119.0;
      var cpa = cva + rgasa;
      var cpv = cvv + rgasv;
      var cpm = (1 - qv) * cpa + qv * cpv;
      var Rm = (1 - qv) * rgasa + qv * rgasv;
      var a = cpm / Rm + (cvl - cpv) / rgasv;
      var b = -(E0v - Ttrip * (cvv - cvl)) / (rgasv * T);
      var c = b / a;
      var L = lambert(Math.pow(RH, 1.0 / a) * c * Math.exp(c), -1);
      var Tlcl = T * c * Math.pow(L, -1.0) - 1.0;
      var LCL = p * Math.pow(Tlcl / T, cpm / Rm);
      var LCLHP = LCL / 100.0;
      return LCLHP;
    };

    var wetAdiabatGradient = function wetAdiabatGradient(pressure, temp) {
      var L = 2.5e6;
      var RV = 461.0;
      temp += 273.15;
      var lsbc = L / RV * (1.0 / 273.15 - 1.0 / temp);
      var rw = 6.11 * Math.exp(lsbc) * (0.622 / pressure);
      var lrwbt = L * rw / (Rd * temp);
      var nume = Rd * temp / (Cp * pressure) * (1.0 + lrwbt);
      var deno = 1.0 + lrwbt * (0.622 * L / (Cp * temp));
      var gradi = nume / deno;
      return Dp * gradi;
    };

    var closest = function closest(list, x) {
      var miin;
      var chosen = 0;

      for (var i in list) {
        miin = Math.abs(list[chosen] - x);

        if (Math.abs(list[i] - x) < miin) {
          chosen = i;
        }

        ;
      }

      ;
      return parseInt(chosen, 10);
    };

    var parcelAscent = function parcelAscent(temp) {
      var LCL = findLCL(temp, surfaceTdC, surfacePresshPA);
      var Px = [];
      var Tt;
      var dry = true;
      var isLiSet = false;
      P.forEach(function (p) {
        var closestPidx = closest(pressurehPa, p);

        if (p > LCL && p <= surfacePresshPA) {
          Tt = (temp + 273.15) * Math.pow(surfacePresshPA / p, -Rd / Cp) - 273.15;
          var Tpx = window.w * (Tt - minT) / (maxT - minT);
          var Ppx = window.h * (Math.log(p) - Math.log(minP)) / (Math.log(maxP) - Math.log(minP));

          if (temperatureC[closestPidx] > Tt) {
            Px.push([NaN, NaN]);
          } else {
            Px.push([Tpx, Ppx]);
          }
        } else if (p <= LCL) {
          if (dry) {
            temp = Tt;
            dry = false;
          }

          var dt = wetAdiabatGradient(p, temp);
          temp += dt;

          var _Tpx = window.w * (temp - minT) / (maxT - minT);

          var _Ppx = window.h * (Math.log(p) - Math.log(minP)) / (Math.log(maxP) - Math.log(minP));

          if (temperatureC[closestPidx] > temp) {
            Px.push([NaN, NaN]);
          } else {
            Px.push([_Tpx, _Ppx]);
          }
        }

        if (p < 500 && !isLiSet) {
          var LI = temperatureC[closestPidx] - temp;
          LI = Math.round(LI * 10) / 10;
          isLiSet = true;
          d3.select('#LIlevelid').remove();

          if (LI < 0) {
            svg.append("g").append("text").style("font-size", "17px").style('fill', "red").attr("x", window.w - 80).attr("transform", "translate(0,-4)").attr('id', 'LIlevelid').append("textPath").attr("xlink:href", "#500,500textid").text("LI: " + LI).style("font-weight", "bold");
          }
        }
      });
      Px.forEach(function (px) {
        px[0] = px[0] + window.h - px[1];
      });
      var lineGenerator = d3.line();
      var daPathString = lineGenerator(Px);
      d3.selectAll("path#parcelcurve").remove();
      svg.append("path").attr("d", daPathString).attr("id", "parcelcurve").style("fill", 'none').style("stroke-width", 4.0).style("stroke", 'red');
    };

    parcelAscent(surfaceTempC);

    var drawSlider = function drawSlider() {
      var tt = surfaceTempC - minT;
      var markerTpx = window.w * tt / (maxT - minT);
      var markerPpx = window.h * (Math.log(surfacePresshPA) - Math.log(minP)) / (Math.log(maxP) - Math.log(minP));
      var markerTx = markerTpx + window.h - markerPpx;
      var valueLine = svg.append("line").attr("x1", 0).attr("x2", markerTx).attr("y1", window.h).attr("y2", window.h).attr("id", "filledLineID").style("stroke", 'red').style("stroke-linecap", "round").style("stroke-width", 5);
      var emptyLine = svg.append("line").attr("x1", window.w).attr("x2", window.w).attr("y1", window.h).attr("y2", window.h).attr("id", "emptyLineID").style("stroke", 'black').style("stroke-width", 5);
      var valueRect = svg.append("circle").attr("cx", markerTx).attr("cy", markerPpx).attr("id", "circleID").attr("r", 7).style("fill", 'purple').call(d3.drag().on("drag", dragEnded));
    };

    var dragEnded = function dragEnded(surfaceTemp) {
      var Tbase = surfaceTemp;
      var selectedValue = d3.event.x;
      if (selectedValue < 0) selectedValue = 0;else if (selectedValue > window.w) selectedValue = window.w;
      var markerPpx = window.h * (Math.log(surfacePresshPA) - Math.log(minP)) / (Math.log(maxP) - Math.log(minP));
      var markerTx = selectedValue + window.h - markerPpx;
      markerTx = markerTx - (window.h - markerPpx);
      var valueRect = d3.selectAll("circle#circleID");
      var valueLine = d3.selectAll("line#filledLineID");
      var emptyLine = d3.selectAll("path#emptyLineID");
      valueRect.attr("cx", markerTx);
      valueRect.attr("cy", markerPpx);
      valueLine.attr("x2", markerTx);
      emptyLine.attr("x1", markerTx);
      d3.event.sourceEvent.stopPropagation();
      var NormValue = (selectedValue - (window.h - markerPpx)) / window.w;
      Tbase = minT + NormValue * (maxT - minT);
      parcelAscent(Tbase);
      valueRect.raise();
    };

    drawSlider();
  };

  function getSurfacePressure(elevation, SLP) {
    var surfacePressure = SLP * Math.exp(-elevation / 10000);
    return surfacePressure;
  }

  function winds2UV(wdir, wspd) {
    wdir = 270 - wdir;
    var rad = 4.0 * Math.atan(1) / 180.;
    var v = wspd * Math.sin(rad * wdir);
    var u = wspd * Math.cos(rad * wdir);
    return [u, v];
  }

  function set_dimensions() {
    var forecastTable = document.getElementsByClassName('table-wrapper')[0];
    var wHeight = window.innerHeight;

    if (forecastTable) {
      wHeight -= forecastTable.clientHeight;
    }

    window.w = 0.75 * wHeight;
    window.h = 0.7 * wHeight;
    window.barbsw = 0.08 * w;
    window.barbsh = h;
    window.x_offset = 50;
    window.y_offset = 90;
  }

  var pluginDataLoader = W.require('@plugins/plugin-data-loader');

  var PickerOn = false;
  var zoomed = false;
  var startpressure = 1050;
  var RetryAttemptsSpot = 0;
  var RetryAttemptsAir = 0;
  var options = {
    key: 'psfAt10AZ7JJCoM3kz0U1ytDhTiLNJN3',
    plugin: 'windy-plugin-skewt'
  };
  var load = pluginDataLoader(options);

  var activate_SkewT = function activate_SkewT(latLon) {
    set_dimensions();

    var _picker$getParams = picker.getParams(),
        lat = _picker$getParams.lat,
        lon = _picker$getParams.lon;

    PickerOn = true;

    if (zoomed) {
      var endpressure = 600;
    } else {
      var endpressure = 150;
    }

    document.getElementById('skewt-control-panel').style.display = "inline-block";
    set_dimensions();
    var introtext = document.getElementById('ft-title');
    introtext.style.display = "none";
    zoom_button();
    var dataOptions = {
      model: store.get('product'),
      lat: lat,
      lon: lon
    };
    var surfacePressureSpotForecast = [];
    var surfaceTempSpotForecast = [];
    var surfaceDewPointSpotForecast = [];
    var surfaceUWindSpotForecast = [];
    var surfaceVWindSpotForecast = [];
    load('forecast', dataOptions).then(function (_ref) {
      var data = _ref.data;
      Object.keys(data.data).forEach(function (datetimeKey) {
        data.data[datetimeKey].forEach(function (field) {
          surfacePressureSpotForecast.push(field.pressure / 100);
          surfaceTempSpotForecast.push(field.temp);
          surfaceDewPointSpotForecast.push(field.dewPoint);

          var _winds2UV = winds2UV(field.windDir, field.wind),
              _winds2UV2 = _slicedToArray(_winds2UV, 2),
              u = _winds2UV2[0],
              v = _winds2UV2[1];

          surfaceUWindSpotForecast.push(u);
          surfaceVWindSpotForecast.push(v);
        });
      });
    });
    load('airData', dataOptions).then(function (_ref2) {
      var data = _ref2.data;

      if (isNaN(surfaceTempSpotForecast[0])) {
        if (RetryAttemptsSpot < 3) {
          console.log('There was a problem loading the spot forecast, retrying...');
          setTimeout(function () {
            activate_SkewT();
          }, 500);
          RetryAttemptsSpot += 1;
        }
      }

      var current_timestamp = store.get('timestamp');
      var tidx = gettimestamp(current_timestamp, data.data.hours);

      try {
        var surfacePressure = getSurfacePressure(data.header.elevation, surfacePressureSpotForecast[tidx]);
        var surfaceTemp = surfaceTempSpotForecast[tidx];
        var surfaceDewPoint = surfaceDewPointSpotForecast[tidx];
      } catch (err) {
        if (RetryAttemptsAir < 3) {
          console.log("There was a problem with the data loader, retrying...");
          setTimeout(function () {
            activate_SkewT();
          }, 1000);
          RetryAttemptsAir += 1;
        }
      }

      var refPressures = [950, 925, 900, 850, 800, 700, 600, 500, 400, 300, 200, 150];
      var Pascent = refPressures.filter(function (refPressure) {
        return refPressure < surfacePressure;
      });
      var Tdascent = get_data(data, Pascent, 'dewpoint', tidx);
      var Tascent = get_data(data, Pascent, 'temp', tidx);
      var U = get_data(data, Pascent, 'wind_u', tidx);
      var V = get_data(data, Pascent, 'wind_v', tidx);
      Pascent.unshift(surfacePressure);
      Tascent.unshift(surfaceTemp);
      Tdascent.unshift(surfaceDewPoint);
      U.unshift(surfaceUWindSpotForecast[tidx]);
      V.unshift(surfaceVWindSpotForecast[tidx]);
      Tascent = Tascent.map(function (t) {
        return Math.round(10 * (t - 273.15)) / 10;
      });
      Tdascent = Tdascent.map(function (t) {
        return Math.round(10 * (t - 273.15)) / 10;
      });
      fetchSondeAllSondes().then(function (allSondes) {
        return allSondes.json();
      }).then(function (repose) {
        return console.log(repose);
      });
      draw_skewT(Pascent, Tascent, Tdascent, startpressure, endpressure);
      cbarbs(Pascent, Tascent, U, V, current_timestamp, dataOptions, startpressure, endpressure);
    });
  };

  picker.on('pickerOpened', activate_SkewT);
  picker.on('pickerMoved', activate_SkewT);
  store.on('timestamp', function () {
    if (PickerOn) {
      activate_SkewT();
    }
  });

  var close_skewT = function close_skewT() {
    d3.select("#skewTbox").remove();
    PickerOn = false;
    var controls = document.getElementById('skewt-control-panel');
    controls.style.display = "none";
    var ftTitle = document.getElementById('ft-title');
    ftTitle.style.display = "display-block";
  };

  picker.on('pickerClosed', close_skewT);

  function draw_skewT(Pascent, Tascent, Tdascent, startpressure, endpressure) {
    cskewT(Pascent, Tascent, Tdascent, startpressure, endpressure);
  }

  ;

  function fetchSondeAllSondes() {
    return fetch("https://api.skewt.org/api/available/");
  }

  function zoom_button() {
    var zoomOut = document.getElementById('zoom-out');
    var zoomIn = document.getElementById('zoom-in');
    var closeButton = document.getElementById('closebutton');
    zoomIn.addEventListener("click", function () {
      zoomed = true;
      activate_SkewT();
    });
    zoomOut.addEventListener("click", function () {
      zoomed = false;
      activate_SkewT();
    });
    closeButton.addEventListener("click", function () {
      close_skewT();
    });
  }

  function gettimestamp(current_timestamp, h) {
    var i = 0;
    var minDiff = 99999999999;
    var tidx;

    for (i in h) {
      var m = Math.abs(current_timestamp - h[i]);

      if (m < minDiff) {
        minDiff = m;
        tidx = i;
      }

      ;
    }

    ;
    return tidx;
  }

  ;

  function get_data(data, Pascent, field, tidx) {
    var ascent = Pascent.map(function (pLevel) {
      return data.data["".concat(field, "-").concat(pLevel, "h")][tidx];
    });
    return ascent;
  }

  W.map.on("click", function (e) {
    broadcast.fire('rqstOpen', 'picker', {
      lat: e.latlng.lat,
      lon: e.latlng.lng
    });
    picker.on('pickerOpened', function () {
      document.getElementById('windy-plugin-skewt').style.display = 'block';
    });
  });
});