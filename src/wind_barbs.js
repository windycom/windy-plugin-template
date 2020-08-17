function cbarbs(Pascent, Tascent, U, V, current_timestamp, dataOptions, cmaxP, cminP) {
	/* cbarbs creates the windbarbs in the skewT. It takes the Pressure profile,
	and horizontal winds in the U (east) and V (north) directions as inputs. Included
	is a tooltip that populates a bar showing the atitude , pressure, windspeed,
	and wind direction at the mouse pointer location. */

	dataOptions.model = store.get('product').toUpperCase();
	const CONTROLS_OFFSET = document.getElementById('skewt-control-panel').offsetHeight

	// set up the pressure scale and process the wind arrays
	// var cminP = 500.0;
	// var cmaxP = 1050.0;

	// Draw the containing box for the tooltip stats
	svg.append("rect")
		.attr("x", w-0.65*w)
		.attr("height", 0.05*h)
		.attr("width", 0.65*w)
		.attr("fill", "#424040")
		.attr("opacity", "1.0")


    // Add the datetime
    var date = new Date(current_timestamp);
    var options = { weekday: 'long', month: 'short', day: 'numeric' , hour: 'numeric', timeZoneName:'short'};
    date = date.toLocaleDateString("en-US", options);
	svg.append("g")
		.append("text")
		.html(dataOptions.model.toUpperCase()+'\xa0\xa0\xa0'+date)
		.attr("x", w-0.64*w)
		.attr("y", 0.035*h)
		.attr("font-family", "sans-serif")
		.attr("font-family", "Arial")
		.attr("font-size", 0.03*h+"px")
		.attr("fill", "#cccccc")
		.attr("id", "statsID");

    // This is actions the tooltip for the stats at the top
    // of the skewT window
    // d3.select("#skewTd3")
	//     .on("mousemove", wind_tooltip);
    onmousemove = function(e){wind_tooltip(e.clientX, e.clientY)}


	function wind_tooltip(x,y) {
        svg.select("#statsID").remove();
		// Creates the stats at the top of the plugin window.
		//var y = d3.mouse(this)[1] - y_offset;
        y = y - y_offset - CONTROLS_OFFSET;
		var logP = (y/barbsh)*(Math.log(cmaxP)-Math.log(cminP)) + Math.log(cminP);

		var P = Math.exp(logP);

		var widx = closest(Pascent, P);
        var wdir = get_winddir(U[widx], V[widx]);
		var WSpeed = 1.943*Math.sqrt(Math.pow(U[widx],2) + Math.pow(V[widx],2));
		if (P >= 1050) {
			P = Pascent[0];
		} else if (P <= 170) {
			P = 170;
		}
		var z = -10.0*Math.log(P/Pascent[0]);
		
        // Fill the text in using another g layer
		svg.append("g")
			.append("text")
			.html(dataOptions.model+'\xa0\xa0\xa0'+Math.round(z)+" km \xa0\xa0  "+Math.round(P)+" hPa \xa0\xa0  "+Math.round(WSpeed)+" kt \xa0/\xa0"+Math.round(wdir)+"&#176\xa0\xa0\xa0\xa0 "+Tascent[widx]+"&#176C")
			.attr("x", w-0.64*w)
			.attr("y", 0.035*h)
			.attr("font-family", "sans-serif")
			.attr("font-family", "Arial")
			.attr("font-size", 0.03*h+"px")
			.attr("fill", "#cccccc")
			.attr("id", "statsID");
	}


	// Wrapping function to run the draw_windbarbs() function
	// for each pressure level. Set to draw one every 50hPa.
    window.svgbarbs = svg.append("rect")
        .attr('x', w)
        .attr("height", barbsh)
        .attr("width", barbsw)
        .attr("fill", "#424040")
        .attr("opacity", 1.0)
        .attr('id', 'barbsd3');

	for (var pp = 200; pp <= 1000; pp=pp+50) {
		var widx = closest(Pascent, pp);
		draw_windbarbs(Pascent[widx], U[widx], V[widx]);
	};


	function draw_windbarbs(P, U, V)  {
        // Function to draw the wind barbs. Each barb has its own predefined vector path.
		// You can scale the windbarb size with "scale". Paths for each barb windspeed here.
	    var scale = 0.1;
	    var barb05 = "m 0,0 200,0 m -20,0 25,35";
		var barb10 = "m 0,0 200,0 m 0,0 50,70";
		var barb15 = "m 0,0 200,0 m 0,0 50,70 m -35,0 m -50,-70 m 0,0 25,35";
		var barb20 = "m 0,0 200,0 m 0,0 50,70 m -35,0 -50,-70";
		var barb25 = "m 0,0 200,0 m 0,0 50,70 m -35,0 -50,-70 m -35,0 25,35";
		var barb30 = "m 0,0 200,0 m 0,0 50,70 m -35,0 -50,-70 m -35,0 50,70";
		var barb35 = "m 0,0 200,0 m 0,0 50,70 m -35,0 -50,-70 m -35,0 50,70 m -35,0 m -50,-70 m 0,0 25,35";
		var barb40 = "m 0,0 200,0 m 0,0 50,70 m -35,0 -50,-70 m -35,0 50,70 m -35,0 -50,-70" ;
		var barb45 = "m 0,0 200,0 m 0,0 50,70 m -35,0 -50,-70 m -35,0 50,70 m -35,0 -50,-70 m -35,0 m 0,0 25,35";
		var barb50 = "m 0,0 200,0 0,70 -50,-70";
		var barb60 = "m 0,0 200,0 0,70 -50,-70 m -35,0 50,70";
		var barb70 = "m 0,0 200,0 0,70 -50,-70 m -35,0 50,70 m -35,0 m -50,-70 m 0,0 50,70";
		var barb80 = "m 0,0 200,0 0,70 -50,-70 m -35,0 50,70 m -35,0 m -50,-70 m 0,0 50,70 m -35,0 m -50,-70 m 0,0 50,70";
		var barb90 = "m 0,0 200,0 0,70 -50,-70 m -35,0 50,70 m -35,0 m -50,-70 m 0,0 50,70 m -35,0 m -50,-70 m 0,0 50,70 m -35,0 m -50,-70 m 0,0 50,70";
		var barb100 = "m 0,0 200,0 0,70 -50,-70 m -10,0 m 0,0 0,70 -50,-70";
		var Nobarb = "";

		// Now calculate the stats based on the pixel location of the mouse pointer
		var VPpx = barbsh*(Math.log(P)-Math.log(cminP))/(Math.log(cmaxP)-Math.log(cminP));
        var wdir = get_winddir(U, V);
		var WSpeed = 1.943*Math.sqrt(Math.pow(U,2) + Math.pow(V,2));

		// Choose the appropriate barb for each pressure level
		if (WSpeed < 7.5) {
			var barbie = barb05;
		} else if ((WSpeed >= 7.5) && (WSpeed < 12.5)) {
			var barbie = barb10;
		} else if ((WSpeed >= 12.5) && (WSpeed < 17.5)) {
			var barbie = barb15;
		} else if ((WSpeed >= 17.5) && (WSpeed < 22.5)) {
			var barbie = barb20;
		} else if ((WSpeed >= 22.5) && (WSpeed < 27.5)) {
			var barbie = barb25;
		} else if ((WSpeed >= 27.5) && (WSpeed < 32.5)) {
			var barbie = barb30;
		} else if ((WSpeed >= 32.5) && (WSpeed < 37.5)) {
			var barbie = barb35;
		} else if ((WSpeed >= 37.5) && (WSpeed < 42.5)) {
			var barbie = barb40;
		} else if ((WSpeed >= 42.5) && (WSpeed < 47.5)) {
			var barbie = barb45;
		} else if ((WSpeed >= 47.5) && (WSpeed < 55.0)) {
			var barbie = barb50;
		} else if ((WSpeed >= 55.0) && (WSpeed < 65.0)) {
			var barbie = barb60;
		} else if ((WSpeed >= 65.0) && (WSpeed < 75.0)) {
			var barbie = barb70;
		} else if ((WSpeed >= 75.0) && (WSpeed < 85.0)) {
			var barbie = barb80;
		} else if ((WSpeed >= 85.0) && (WSpeed < 95.0)) {
			var barbie = barb90;
		} else {
			var barbie = Nobarb;
		}

		if (wdir >=0 && wdir <=360) {
			// draw the barb
	 	    svg.append("path")
			    .attr("stroke", "#cccccc")
			    .style("stroke-width", "17px")
			    .attr("fill", "#cccccc")
			    .attr("d", barbie)
			    .attr("transform", "translate("+(w+barbsw/2)+","+VPpx+") rotate("+(wdir-90)+",0,0) scale("+scale+")  ");
	    };
	};


	// Function for matching the ascent pressures with pressures dervied from the mouse pointer location
	function closest(list, x) {
		var chosen = 0;
	    for (var i in list) {
		var miin = Math.abs(list[chosen] - x);
		if (Math.abs(list[i] - x) < miin) {
		    chosen = i;}
		}
	    return chosen;
	};

	function get_winddir(u, v) {
	    var wdir;
	    if(v > 0)      {
	        wdir = ((180 / Math.PI) * Math.atan(u/v) + 180);
	    }
	    else if(u < 0 && v < 0) {
	        wdir = ((180 / Math.PI) * Math.atan(u/v) + 0);
	    }
	    else if(u > 0 && v < 0) {
	  	    wdir = ((180 / Math.PI) * Math.atan(u/v) + 360);
	    }
	    return wdir;
	};

};
