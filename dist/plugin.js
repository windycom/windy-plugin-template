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
  "displayName": "SkewT",
  "hook": "menu",
  "dependencies": ["https://d3js.org/d3.v5.js"]
},
/* HTML */
'<b>SkewT</b>',
/* CSS */
'',
/* Constructor */
function () {
  var map = W.require('map');

  var store = W.require('store');

  var utils = W.require('utils');

  var picker = W.require('picker');

  var Pascent = [1023.0, 1008.0, 1001.0, 1000.0, 996.0, 982.0, 965.0, 935.0, 933.0, 930.0, 925.0, 905.0, 904.0, 903.0, 902.0, 901.0, 893.0, 883.0, 881.0, 875.0, 867.0, 857.0, 854.0, 850.0, 842.0, 822.0, 795.0, 794.0, 772.0, 771.0, 753.0, 751.0, 745.0, 742.0, 736.0, 700.0, 669.0, 661.0, 658.0, 657.0, 655.0, 654.0, 651.0, 641.0, 640.0, 636.0, 634.0, 631.0, 628.0, 624.0, 623.0, 620.0, 613.0, 606.0, 604.0, 601.0, 594.0, 589.0, 580.0, 542.0, 538.0, 525.0, 516.0, 509.0, 500.0, 499.0, 492.0, 483.0, 480.0, 456.0, 449.0, 433.0, 428.0, 426.0, 424.0, 405.0, 402.0, 401.0, 400.0, 398.0, 396.0, 388.0, 384.0, 381.0, 379.0, 376.0, 371.0, 370.0, 368.0, 362.0, 360.0, 358.0, 355.0, 353.0, 351.0, 349.0, 347.0, 344.0, 340.0, 337.0, 335.0, 331.0, 328.0, 326.0, 324.0, 321.0, 318.0, 315.0, 312.0, 310.0, 308.0, 306.0, 300.0, 297.0, 290.0, 288.0, 284.0, 280.0, 276.0, 274.0, 268.0, 261.0, 260.0, 251.0, 250.0, 244.0, 241.0, 239.0, 236.0, 234.0, 232.0, 229.0, 224.0, 222.0, 217.0, 213.0, 209.0, 201.0, 200.0, 198.0, 187.0, 183.0, 182.0, 177.0, 174.0, 169.0, 166.0, 163.0, 157.0, 150.0, 149.0, 142.0, 138.0, 135.0, 127.0, 126.0, 111.0, 106.0, 100.0];
  var Tascent = [10.2, 9.8, 9.6, 9.6, 9.4, 8.6, 7.2, 4.6, 4.5, 4.4, 4.2, 3.0, 3.0, 2.8, 3.6, 4.0, 7.2, 7.9, 8.0, 7.8, 7.6, 6.8, 6.6, 6.4, 5.8, 4.3, 2.2, 2.1, 0.4, 0.4, -0.2, -0.3, -0.9, -1.1, -1.9, -5.5, -8.5, -8.9, -8.9, -8.9, -9.1, -9.1, -8.9, -9.3, -9.5, -9.5, -9.5, -9.8, -10.1, -10.5, -10.5, -10.7, -11.5, -11.9, -11.8, -11.7, -11.5, -12.1, -13.2, -17.9, -18.1, -19.6, -20.7, -21.5, -22.9, -23.0, -23.9, -24.5, -24.7, -27.3, -28.1, -30.3, -30.9, -31.2, -31.5, -34.3, -34.7, -34.9, -35.1, -35.5, -35.7, -36.9, -37.5, -38.1, -38.5, -38.9, -39.7, -39.9, -40.1, -40.9, -40.9, -41.3, -41.5, -41.9, -42.1, -42.5, -42.9, -43.3, -43.9, -44.3, -44.7, -45.3, -45.9, -46.3, -46.5, -46.9, -47.5, -48.1, -48.3, -48.7, -48.9, -49.3, -50.5, -51.1, -52.5, -52.9, -53.1, -53.7, -53.9, -54.1, -55.1, -56.3, -56.5, -57.9, -58.1, -58.9, -58.9, -58.9, -59.1, -57.7, -57.1, -57.1, -54.1, -53.9, -54.6, -55.1, -54.4, -52.9, -53.1, -53.3, -54.7, -53.3, -52.9, -54.0, -54.7, -53.8, -53.3, -53.7, -54.6, -55.7, -55.8, -56.6, -57.0, -57.4, -58.4, -58.5, -63.1, -62.8, -62.3];
  ;
  var Tdascent = [7.6, 6.7, 6.2, 6.3, 6.1, 5.5, 5.1, 4.4, 4.4, 4.4, 4.2, 3.0, 2.8, 1.4, -1.2, -3.0, -2.8, -4.6, -5.0, -3.2, -5.4, -5.4, -5.4, -5.6, -7.2, -7.5, -7.8, -7.9, -10.6, -10.7, -13.0, -13.3, -13.9, -11.1, -8.9, -9.6, -9.7, -11.3, -13.2, -13.9, -13.6, -12.3, -12.1, -10.7, -11.0, -13.5, -13.3, -14.1, -14.8, -14.7, -15.5, -14.6, -13.9, -15.8, -20.1, -26.7, -43.5, -42.9, -41.8, -36.9, -39.1, -39.5, -39.7, -37.5, -36.9, -36.8, -35.9, -29.9, -27.9, -31.3, -32.3, -34.0, -35.9, -35.9, -35.9, -38.0, -38.1, -38.9, -39.0, -38.9, -39.8, -39.2, -39.9, -39.7, -40.3, -40.0, -41.2, -41.5, -41.4, -43.3, -44.3, -45.4, -45.5, -46.1, -47.1, -45.1, -46.4, -45.8, -48.3, -47.8, -50.7, -48.3, -48.0, -49.3, -49.3, -51.1, -50.8, -50.5, -51.3, -53.7, -53.3, -54.3, -54.0, -53.7, -54.2, -54.7, -57.5, -57.3, -59.9, -61.1, -64.1, -62.7, -62.5, -63.9, -64.1, -64.9, -67.9, -69.9, -66.1, -75.7, -81.1, -73.1, -79.1, -77.9, -77.5, -77.1, -78.0, -79.9, -80.1, -80.2, -80.7, -81.7, -81.9, -82.4, -82.7, -83.7, -84.3, -84.5, -85.1, -85.7, -85.7, -86.0, -86.1, -86.2, -86.5, -86.5, -87.1, -87.2, -87.3];
  var DateTime = "Thu 27 Dec 00:00:00 UTC 2018";
  window.w = 0.8 * window.innerHeight;
  window.h = 0.7 * window.innerHeight;

  var activate_SkewT = function activate_SkewT(latLon) {
    var _picker$getParams = picker.getParams(),
        lat = _picker$getParams.lat,
        lon = _picker$getParams.lon;

    draw_skewT();
    console.log('Picker is at', lat, lon);
  };

  picker.on('pickerOpened', activate_SkewT);
  picker.on('pickerMoved', activate_SkewT);

  var ondrag = function ondrag() {
    translate_skewT();
  };

  map.on('drag', ondrag);

  function draw_skewT() {
    d3.select("#skewTd3").remove();
    window.svg = d3.select(".leaflet-popup-pane").append("svg").attr("height", h).attr("width", w).attr('id', 'skewTd3');
    svg.append("rect").attr("height", h).attr("width", w).attr("fill", "white").attr("opacity", 0.7);
    cskewT(Pascent, Tascent, Tdascent, DateTime);
    var GetTransform = document.getElementsByClassName("leaflet-map-pane")[0];
    var Attrtxt = GetTransform.getAttribute("style");
    var NUMERIC_REGEXP = /[-]{0,1}[\d]*[\.]{0,1}[\d]+/g;
    var Xpx = -1 * Number(Attrtxt.match(NUMERIC_REGEXP)[1]) + 50;
    var Ypx = -1 * Number(Attrtxt.match(NUMERIC_REGEXP)[2]) + 70;
    var Zpx = Number(Attrtxt.match(NUMERIC_REGEXP)[3]);
    var translation = "translate3d(" + Xpx + "px, " + Ypx + "px,  " + Zpx + "px)";
    var S = document.getElementById("skewTd3");
    S.setAttribute("style", "transform: " + translation);
  }

  ;

  function translate_skewT() {
    var GetTransform = document.getElementsByClassName("leaflet-map-pane")[0];
    var Attrtxt = GetTransform.getAttribute("style");
    var NUMERIC_REGEXP = /[-]{0,1}[\d]*[\.]{0,1}[\d]+/g;
    var Xpx = -1 * Number(Attrtxt.match(NUMERIC_REGEXP)[1]) + 50;
    var Ypx = -1 * Number(Attrtxt.match(NUMERIC_REGEXP)[2]) + 70;
    var Zpx = Number(Attrtxt.match(NUMERIC_REGEXP)[3]);
    var translation = "translate3d(" + Xpx + "px, " + Ypx + "px,  " + Zpx + "px)";
    var S = document.getElementById("skewTd3");
    S.setAttribute("style", "transform: " + translation);
  }

  ;

  function cskewT(Pascent, Tascent, Tdascent, DateTime) {
    var startpressure = 1050;
    var endpressure = 150;
    var P = [startpressure];
    var dp = -1.5;
    var pressure = startpressure;

    while (pressure > endpressure) {
      pressure = pressure + dp;
      P.push(pressure);
    }

    ;
    var minT = -40.0;
    var maxT = 40.0;
    var minP = P[P.length - 1];
    var maxP = P[0];
    draw_isopleths();
    skewT_main(Pascent, Tascent, Tdascent, DateTime);

    function draw_isopleths() {
      for (var T = -80; T <= 40; T = T + 10) {
        draw_isotherm(T);
      }

      ;

      for (var p = 100; p <= 1000; p = p + 100) {
        draw_isobar(p);
      }

      ;

      for (var a = -30; a <= 150; a = a + 10) {
        draw_dry_adiabat(a, P);
      }

      ;
      draw_moist_adiabat(-27.0);
      draw_moist_adiabat(-17.0);
      draw_moist_adiabat(-7);
      draw_moist_adiabat(2.6);
      draw_moist_adiabat(12.15);
      draw_moist_adiabat(21.8);
      draw_moist_adiabat(31.6);
      draw_moist_adiabat(40);
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

    function skewT_main(Pascent, Tascent, Tdascent, DateTime) {
      var Pascent = interpolateArray(Pascent, P.length);
      var Tascent = interpolateArray(Tascent, P.length);
      var Tdascent = interpolateArray(Tdascent, P.length);
      svg.select("path#SdTPath").remove();
      svg.select("path#SdTdPath").remove();
      svg.select("circle#circleID").remove();
      svg.select("path#parcel").remove();
      svg.select("path#arrowIDr").remove();
      svg.select("path#arrowIDl").remove();
      plot_sounding();

      function lambert(xx, nb) {
        var init = 1;
        var em = -Math.exp(-1.0);
        var em9 = -Math.exp(-9.0);
        var c13 = 1.0 / 3.0;
        var em2 = 2.0 / em;
        var s2 = Math.sqrt(2.0);
        var s21 = 2.0 * s2 - 3.0;
        var s22 = 4.0 - 3.0 * s2;
        var s23 = s2 - 2.0;

        if (xx <= em9) {
          var zl = Math.log(-xx);
          var t = -1.0 - zl;
          var ts = Math.sqrt(t);
          var crude = zl - 2.0 * ts / (s2 + (c13 - t / (2.7 + ts * 127.0471381349219)) * ts);
        } else {
          var zl = Math.log(-xx);
          var eta = 2.0 - em2 * xx;
          var crude = Math.log(xx / Math.log(-xx / ((1.0 - 0.5043921323068457 * (zl + 1.0)) * (Math.sqrt(eta) + eta / 3.0) + 1.0)));
        }

        ;
        return crude;
      }

      ;

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
          var Tnew = Tascent[i] + Math.abs(minT);
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
          var Tnew = Tdascent[i] + Math.abs(minT);
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
        var T = Temps[i] + Math.abs(minT);
        var Tpx = w * T / (maxT - minT);
        var Ppx = h * (Math.log(Pt[i]) - Math.log(minP)) / (Math.log(maxP) - Math.log(minP));
        Px.push([Tpx, Ppx]);
      }

      ;
      var lineGenerator = d3.line();
      var isoPathString = lineGenerator(Px);
      var strID = Pt + 'textid';
      svg.append("path").attr('id', strID).attr('d', isoPathString).style("fill", 'none').style("stroke-width", 1.5).style("stroke", 'green');
      svg.append("text").style("font-size", "50px").style('fill', "purple").attr("x", 20).attr("y", -5).append("textPath").attr("xlink:href", "#" + strID).text('\xa0\xa0' + Pconst + ' ;sdfnv;askdjfg adkfjna dfkjadf ;gakjf;adfkga;dlfkgjad;lfgkjsdf;kbjanfdg;kjdfg;akdjfgaldkfjhaldkfjbadlkjfgbaldkjfalkdjfbalkjdfgbajsdhfbalkdjfhadkjfhbadkfbadfbvalkdjfalkjdsbfalkdjbfalkdjfgblakjdgfadfgsdfgsfgs fgsfgdsfgs dfgsdfg sdgsdfgsdgsdfgsdfgsdfgsdfgsdfgsdfgsdfgsfdsfghsfdgsdfgwergwtrhwrthwrthwtrgfghwrsgfhbsrfgvhbwrstfghbsfghbwrsftghbsrtfghhPa');
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
        var Tnew = Tnew + DPDT[1];
        var T = Tnew + Math.abs(minT);
        var Tpx = w * T / (maxT - minT);
        var Ppx = h * (Math.log(P[i]) - Math.log(minP)) / (Math.log(maxP) - Math.log(minP));
        Px.push([Tpx, Ppx]);
        var Pnew = Pnew + DPDT[0];
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
        var T = temp + Math.abs(minT);
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
      svg.append("text").style("font-size", "17px").style('fill', "green").attr("y", -5).append("textPath").attr("xlink:href", "#" + strID).text('\xa0\xa0\xa0\xa0\xa0\xa0' + temp + ' C');
    }

    ;

    function draw_Isohume(q) {
      var Px = [];

      for (var i = 0; i < P.length; i++) {
        var es = P[i] * q / (q + 622.0);
        var logthing = Math.pow(Math.log(es / 6.11), -1.0);
        var temp = Math.pow(17.269 / 237.3 * (logthing - 1.0 / 17.269), -1.0);
        var T = temp + Math.abs(minT);
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
      svg.append("text").style("font-size", "11px").style('fill', "green").attr("y", -5).append("textPath").attr("xlink:href", "#" + strID).text('\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + q + ' g/kg');
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
        var Tnew = Tnew + DPDT[1];
        var T = Tnew + Math.abs(minT);
        var Tpx = w * T / (maxT - minT);
        var Ppx = h * (Math.log(P[i]) - Math.log(minP)) / (Math.log(maxP) - Math.log(minP));
        Px.push([Tpx, Ppx]);
        var Pnew = Pnew + DPDT[0];
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
});