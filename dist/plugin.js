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
  "dependencies": ["https://d3js.org/d3.v4.js"]
},
/* HTML */
'',
/* CSS */
'',
/* Constructor */
function () {
  var map = W.require('map');

  var store = W.require('store');

  var utils = W.require('utils');

  var picker = W.require('picker');

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
      svg.append("text").style("font-size", "50px").style('fill', "purple").attr("x", 20).attr("y", -5).append("textPath").attr("xlink:href", "#" + strID).text('\xa0\xa0' + Pconst + ' hPa');
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

  function cbarbs(Pascent, U, V) {
    var cminP = 150.0;
    var cmaxP = 1050.0;
    var degrees = 180 * Math.atan2(U[0], V[0]) / Math.PI;
    var wdir = (270 + Math.round(degrees)) % 360;
    var WSpeed = Math.sqrt(Math.pow(U[0], 2) + Math.pow(V[0], 2));
    d3.select("#skewTd3").on("mousemove", wind_tooltip);

    function wind_tooltip() {
      var y = d3.mouse(this)[1] - 90;
      var logP = y / barbsh * (Math.log(1050) - Math.log(150)) + Math.log(150);
      var P = Math.exp(logP);
      console.log(P);
      var widx = closest(Pascent, P);
      var angle = Math.atan2(U[widx], V[widx]);
      var degrees = 180 * angle / Math.PI;
      var wdir = (270 + Math.round(degrees)) % 360;
      var WSpeed = Math.sqrt(Math.pow(U[widx], 2) + Math.pow(V[widx], 2));
      var z = -10.0 * Math.log(P / Pascent[0]);
      svg.append("rect").attr("x", w - 300).attr("height", 30).attr("width", barbsw + 300).attr("fill", "#1A1A1A").attr("opacity", "0.7");
      svg.append("g").append("text").text(Math.round(P) + " hPa     " + Math.round(WSpeed) + " kt     " + Math.round(wdir) + ' deg').attr("x", w - 280).attr("y", 20).attr("font-family", "sans-serif").attr("font-size", "20px").attr("font-family", "Helvetica").attr("fill", "#cccccc");
    }

    windbarbs(Pascent, U, V);

    function windbarbs(Pascent, U, V) {
      for (var pp = 100; pp <= 1000; pp = pp + 50) {
        var widx = closest(Pascent, pp);
        draw_windbarbs(Pascent[widx], U[widx], V[widx]);
      }

      ;
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
      var cloudPpx = barbsh * (Math.log(P) - Math.log(cminP)) / (Math.log(cmaxP) - Math.log(cminP));
      var angle = Math.atan2(U, V);
      var degrees = 180 * angle / Math.PI;
      var wdir = (270 + Math.round(degrees)) % 360;
      var WSpeed = Math.sqrt(Math.pow(U, 2) + Math.pow(V, 2));

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
        var barbie = barb100;
      }

      svg.append("path").attr("stroke", "#cccccc").style("stroke-width", "17px").attr("fill", "#cccccc").attr("d", barbie).attr("transform", "translate(" + (w + barbsw / 2) + "," + cloudPpx + ") rotate(" + wdir + ",0,0) scale(" + scale + ")  ");
    }

    ;

    function closest(list, x) {
      var miin,
          chosen = 0;

      for (var i in list) {
        miin = Math.abs(list[chosen] - x);

        if (Math.abs(list[i] - x) < miin) {
          chosen = i;
        }
      }

      return chosen;
    }

    ;
  }

  ;
  var Pascent = [1016.0, 1015.0, 1000.0, 999.0, 994.0, 991.0, 988.0, 986.0, 980.0, 953.0, 950.0, 948.0, 946.0, 943.0, 933.0, 931.0, 928.0, 925.0, 920.0, 914.0, 901.0, 896.0, 889.0, 877.0, 876.0, 866.0, 850.0, 849.0, 839.0, 837.0, 821.0, 810.0, 802.0, 799.0, 787.0, 784.0, 766.0, 733.0, 730.0, 722.0, 717.0, 714.0, 710.0, 708.0, 703.0, 700.0, 697.0, 686.0, 681.0, 675.0, 673.0, 671.0, 667.0, 666.0, 657.0, 653.0, 652.0, 642.0, 620.0, 600.0, 571.0, 547.0, 546.0, 538.0, 531.0, 529.0, 523.0, 516.0, 503.0, 500.0, 497.0, 495.0, 494.0, 479.0, 464.0, 461.0, 460.0, 459.0, 451.0, 448.0, 447.0, 437.0, 429.0, 425.0, 423.0, 421.0, 408.0, 407.0, 400.0, 392.0, 383.0, 378.0, 374.0, 366.0, 362.0, 360.0, 357.0, 348.0, 340.0, 336.0, 334.0, 333.0, 329.0, 328.0, 326.0, 323.0, 321.0, 314.0, 312.0, 304.0, 300.0, 295.0, 291.0, 287.0, 279.0, 275.0, 272.0, 269.0, 266.0, 264.0, 262.0, 259.0, 258.0, 255.0, 253.0, 250.0, 246.0, 242.0, 233.0, 232.0, 225.0, 223.0, 217.0, 211.0, 209.0, 205.0, 200.0, 190.0, 189.0, 171.0, 168.0, 165.0, 162.0, 157.0, 150.0, 149.0, 142.0, 141.0, 134.0, 129.0, 122.0, 112.0, 110.0, 106.0, 100.0];
  var Tascent = [7.8, 8.8, 8.0, 7.8, 8.0, 8.4, 8.6, 9.2, 9.4, 8.8, 8.6, 8.6, 8.6, 8.2, 8.0, 8.0, 7.8, 7.6, 7.2, 6.6, 5.8, 5.6, 6.2, 6.8, 6.8, 6.6, 6.6, 6.6, 6.1, 6.0, 5.2, 4.6, 4.0, 3.8, 3.6, 3.6, 3.0, 0.6, 0.4, -0.3, -0.7, -0.9, -1.1, -1.3, -1.9, -1.9, -2.3, -3.3, -3.3, -3.8, -3.9, -3.5, -3.3, -3.3, -4.1, -4.1, -4.2, -4.9, -7.4, -9.8, -13.4, -16.5, -16.7, -17.1, -17.5, -17.7, -18.3, -19.1, -20.7, -21.1, -21.5, -21.6, -21.7, -23.7, -25.7, -26.1, -26.3, -26.5, -27.5, -27.8, -27.9, -29.3, -30.3, -30.7, -30.9, -31.2, -33.1, -33.3, -34.1, -35.2, -36.6, -37.3, -38.0, -39.5, -39.9, -40.2, -40.7, -42.3, -43.8, -44.5, -44.7, -44.9, -45.7, -45.8, -46.1, -46.9, -47.3, -48.5, -48.9, -50.5, -51.3, -52.1, -52.7, -53.1, -54.3, -54.9, -55.1, -55.7, -56.1, -56.5, -56.5, -57.1, -57.1, -57.3, -56.5, -55.7, -55.9, -56.1, -56.3, -56.3, -53.5, -53.3, -53.1, -53.0, -52.9, -53.2, -53.7, -53.1, -53.2, -55.7, -55.3, -54.9, -55.5, -56.6, -58.1, -58.5, -58.3, -58.5, -59.6, -60.4, -61.6, -63.5, -63.9, -63.9, -63.9];
  var Tdascent = [5.3, 5.5, 5.1, 5.0, 4.3, -1.6, -4.4, -13.8, -23.6, -28.2, -24.4, -17.4, -11.4, -9.8, -18.0, -13.0, -14.2, -11.4, -1.8, 0.6, 1.4, 0.6, -3.8, -8.2, -8.2, -8.4, -14.4, -15.4, -12.6, -12.0, -11.7, -11.4, -11.2, -11.2, -16.9, -18.4, -21.0, -25.4, -23.8, -19.4, -16.6, -14.9, -16.1, -15.5, -13.9, -14.9, -16.3, -18.3, -22.3, -22.8, -22.9, -28.5, -30.3, -30.3, -31.1, -29.1, -27.9, -15.9, -16.8, -17.7, -19.0, -20.1, -20.3, -19.4, -20.3, -20.4, -20.7, -21.3, -23.5, -24.0, -25.0, -24.9, -24.8, -27.0, -27.3, -29.1, -29.1, -28.7, -30.5, -30.4, -30.4, -32.9, -33.9, -34.0, -34.8, -35.0, -36.2, -36.3, -37.8, -39.4, -41.2, -42.3, -42.6, -43.1, -44.0, -44.1, -44.2, -46.1, -47.8, -48.7, -48.7, -49.6, -49.8, -50.1, -50.8, -50.8, -51.4, -53.3, -53.9, -54.6, -55.0, -55.1, -55.8, -58.1, -58.5, -57.1, -58.2, -57.3, -57.6, -58.3, -59.7, -60.8, -61.2, -62.3, -66.5, -69.7, -68.9, -68.1, -71.0, -71.3, -81.5, -79.3, -79.5, -79.8, -79.9, -80.2, -80.7, -80.1, -80.2, -82.7, -82.8, -82.9, -83.1, -83.5, -84.1, -84.5, -85.3, -85.3, -85.4, -85.5, -85.7, -85.9, -85.9, -86.3, -86.9];
  var U = [2.00000000000000000004, 2.06015229964021684036, 7.66044443118978035200, 8.42648887430875838720, 6.42787609686539326330, 5.00000000000000000010, 4.38371146789077417460, 3.90731128489273755070, 2.32937140592268686124, -2.50857564681710191422, -2.53570957044419661696, -2.81682937671534465564, -3.09022844946032526036, -3.44145861810627657648, -3.77354790111385998960, -3.94005376803360978340, -3.31615029022016676796, -3.46410161513775458700, -2.26412874066831599376, -1.14715287270209219216, -1.93923848098534811620, -2.26995249869773395770, -2.44041985845480124638, -2.47213595499957939264, -2.33897363778189382456, -2.24951054343864998030, -1.13302465571955625602, -1.13302465571955625602, -2.43107448733702488362, -2.67132593527162737346, -2.58819045102520762320, -5.29919264233204954030, -7.07106781186547524380, -6.58218331457253434943, -4.91491226573395073802, -4.85410196624968454454, -5.44002173019879615972, -7.19339800338651139330, -7.07106781186547524380, -9.82982453146790147604, -9.19253331742773642216, -7.07066370655193258930, -4.53990499739546791540, -3.42020143325668733020, -4.64880087914769379776, -6.88291723621255315296, -7.71345131623847191560, -8.77624441943004579924, -8.54860557602667967956, -9.01067248717890968637, -9.45612904328066348016, -8.91773790572873081988, -9.18482640586710198664, -8.99902653561155056820, -6.91452293228860353141, -5.55506238973199783333, -4.91756185694789448408, -5.17638090205041524640, -5.69401899225545677104, -9.29760175829538759552, -11.41069306699888477632, -11.73678906964726939850, -11.73678906964726939850, -12.12024050615842572625, -11.99999999999999999952, -11.99999999999999999952, -14.33941090877615240200, -16.71247785185002248380, -15.48656378147824459416, -15.48656378147824459416, -16.06014021782929069024, -16.06014021782929069024, -16.06014021782929069024, -15.79453201543578538409, -15.49999999999999999938, -15.49999999999999999938, -15.49999999999999999938, -14.54428860739011087150, -11.83602096330509027061, -10.98807480525818534016, -10.57515271997080540098, -8.46477201588607338594, -6.98811421776806058264, -5.61361565207950210116, -5.15184287516670993453, -4.68850079700711941841, -4.34120444167325872075, -4.34120444167325872075, -4.51485261934018906958, -4.86214897467404976724, -7.50575230797310210728, -7.24693326287058134496, -7.24693326287058134496, -10.03430258726840765688, -11.38862600612240581644, -11.83331132873958421248, -11.38862600612240581644, -9.57656401311872452456, -13.52378437570238195712, -11.98741098930918513280, -10.94464458642139945664, -10.09261278817185672939, -8.54475803032697475453, -8.02339039817814363192, -8.26912067450997556890, -9.44147647925754339201, -9.57656401311872452456, -8.54102848838318515656, -9.09603274196097312579, -12.73662417614100920360, -14.79163916092448026560, -16.99625647203178893198, -18.35444596323347507456, -17.89417291106389856416, -17.48733571969576348299, -16.99999999999999999932, -16.48352708837545898770, -16.43150469750617715790, -16.43150469750617715790, -15.88966749088413770390, -15.34299013761770961005, -15.21425742266517970176, -15.21425742266517970176, -14.79163916092448026560, -13.94640263744308139328, -12.25592959048028364864, -8.89252372646738705852, -12.27439211009416768804, -21.85477872934233709420, -20.99388892769623311232, -15.76021507213443913360, -13.10643270862386863472, -12.72792206135785543884, -15.03508193257453414464, -15.14711091120225365978, -15.32088886237956070360, -22.51666049839540481550, -19.97259069509147747560, -19.00000000000000000000, -11.78200123147644952225, -10.39230484541326376124, -12.36373471183699643756, -12.95053107519269191977, -19.00000000000000000000, -24.43200814043361798556, -23.93312618976344851266, -21.55119993884443281587, -20.50609665440987820818, -23.33452377915606830586, -14.50000000000000000087, -17.99805307122310113752, -10.98807480525818534146, -10.56545654351748590525, -9.29760175829538759662, -16.26345596729059306166];
  var V = [-3.46410161513775458700, -3.42866920280844914980, -6.42787609686539326310, -7.07066370655193258941, -7.66044443118978035190, -8.66025403784438646750, -8.98794046299166992770, -9.20504853452440327390, -8.69333243660161458066, -6.53506298548041224293, -5.43784672221989977950, -5.29768555715356165224, -5.14300380421267372482, -4.91491226573395073814, -3.28029514495253642400, -3.07830737662829139840, -2.23677161388298732068, -2.00000000000000000008, -1.96817708697152185440, -1.63830408857798357938, -3.49847882855758320116, -4.45503262094183931180, -5.48127274585560537306, -7.60845213036122857696, -7.65043804770428385072, -9.74370064785235228540, -12.95053107519269191977, -12.95053107519269191977, -13.78730854217091283104, -13.74278056826729534886, -9.65925826289068286750, -8.48048096156425970390, -7.07106781186547524410, -6.13798524056248650414, -3.44145861810627657672, -3.52671151375483877508, -4.40524273734886216904, -6.94658370458997286670, -7.07106781186547524410, -6.88291723621255315344, -7.71345131623847191608, -8.42648887430875838731, -8.91006524188367862360, -9.39692620785908384050, -9.96938565740314959575, -9.82982453146790147628, -9.19253331742773642252, -8.18398032074998200552, -6.92252430154821197992, -6.30934079986150705732, -7.38793770390789935616, -8.02956727630629856608, -10.56593412311880797130, -10.72462220366569249294, -15.53027277992421522367, -18.16979036329767414546, -18.35259069949229744825, -19.31851652578136573500, -21.25036817835950230850, -19.93877131480629919150, -24.47031024998954900775, -22.07368982147317355100, -22.07368982147317355100, -21.86549267848489500725, -20.78460969082652752248, -20.78460969082652752248, -20.47880110722479474225, -19.91715552109342891546, -22.11710519580277832163, -22.11710519580277832163, -22.93625724009177011132, -22.93625724009177011132, -22.93625724009177011132, -24.32144647041729685956, -26.84678751731759804987, -26.84678751731759804987, -26.84678751731759804987, -26.23859121418187400870, -24.26743925007750880533, -23.56400246295289904450, -23.75218189870762328326, -24.58348296558223706910, -26.07999730980484374225, -26.40998521981275222411, -26.50393395308692674423, -26.58980933132961760272, -24.62019382530520148400, -24.62019382530520148400, -25.60500157831740954336, -27.57461708434182566208, -28.01184896238298031575, -27.04592313609391202900, -27.04592313609391202900, -26.14025194192164897172, -25.57927281399282507428, -25.37661803702619897100, -25.57927281399282507428, -26.31139338200543475340, -29.00184918517279882400, -29.66988334613719682592, -30.07016386514906828960, -29.31107584357882112085, -29.79911257408788471952, -29.94370061496111688925, -28.83785087814956585760, -27.42003869238018750015, -26.31139338200543475340, -31.87555226753925346275, -31.72163596596452244336, -31.52425105527077162754, -31.72077254628274871375, -28.28652092316970548651, -26.21286541724773727008, -26.52920232176133414464, -27.98558717316205702287, -29.44486372867091399018, -29.73707004273945720986, -30.90316575006244297140, -30.90316575006244297140, -31.18522834659287518260, -31.45779162047084474765, -32.62708033331939867700, -32.62708033331939867700, -31.72077254628274871375, -29.90815697220944878725, -26.28292582406284893425, -24.43200814043361798530, -25.16623329637667579812, -26.04551106604525319714, -24.15070656712870393440, -12.31322950651316559360, -9.17722298161673753792, -12.72792206135785543938, -5.47232229321069972912, -7.71783849557229545686, -12.85575219373078652680, -13.00000000000000000052, -1.04671912485887665480, -.00000000000000000038, 5.49403740262909266995, 5.99999999999999999964, 4.01722092687431651291, 1.13302465571955625576, -.00000000000000000038, 8.89252372646738705826, 10.15900934072111763052, 19.40478758440688820020, 20.50609665440987820702, 23.33452377915606830454, 25.11473670974872075546, 21.44924440733138498504, 23.56400246295289904372, 22.65769467591624908050, 19.93877131480629919084, 16.26345596729059306074];
  var DateTime = "Thu 27 Dec 00:00:00 UTC 2018";
  window.w = 0.8 * window.innerHeight;
  window.h = 0.7 * window.innerHeight;
  window.barbsw = 0.08 * w;
  window.barbsh = h;

  var activate_SkewT = function activate_SkewT(latLon) {
    var _picker$getParams = picker.getParams(),
        lat = _picker$getParams.lat,
        lon = _picker$getParams.lon;

    draw_skewT();
    draw_windbarb();
    console.log('Picker is at', lat, lon);
  };

  picker.on('pickerOpened', activate_SkewT);
  picker.on('pickerMoved', activate_SkewT);

  var ondrag = function ondrag() {
    translate_obj('skewTd3');
  };

  map.on('drag', ondrag);

  function draw_skewT() {
    d3.select("#skewTbox").remove();
    window.svg = d3.select(".leaflet-popup-pane").append("svg").attr("height", h).attr("width", w + barbsw).attr('id', 'skewTbox');
    svg.append("rect").attr("height", h).attr("width", w).attr("fill", "white").attr("opacity", 0.7).attr('id', 'skewTd3');
    cskewT(Pascent, Tascent, Tdascent, DateTime);
    translate_obj();
  }

  ;

  function translate_obj() {
    var GetTransform = document.getElementsByClassName("leaflet-map-pane")[0];
    var Attrtxt = GetTransform.getAttribute("style");
    var NUMERIC_REGEXP = /[-]{0,1}[\d]*[\.]{0,1}[\d]+/g;
    var Xpx = -1 * Number(Attrtxt.match(NUMERIC_REGEXP)[1]) + 50;
    var Ypx = -1 * Number(Attrtxt.match(NUMERIC_REGEXP)[2]) + 90;
    var Zpx = Number(Attrtxt.match(NUMERIC_REGEXP)[3]);
    var translation = "translate3d(" + Xpx + "px, " + Ypx + "px,  " + Zpx + "px)";
    var S = document.getElementById('skewTbox');
    S.setAttribute("style", "transform: " + translation);
  }

  ;

  function draw_windbarb() {
    window.svgbarbs = svg.append("rect").attr('x', w).attr("height", barbsh).attr("width", barbsw).attr("fill", "#1A1A1A").attr("opacity", 0.8).attr('id', 'barbsd3');
    cbarbs(Pascent, U, V);
  }

  ;
});