function cbarbs(Pascent, U, V) {

	// This script draws the wind barbs
	var cminP = 150.0;
	var cmaxP = 1050.0;												
	var degrees = 180*(Math.atan2(U[0], V[0]))/Math.PI; 
	var wdir = (270+Math.round(degrees))%360;
	var WSpeed = Math.sqrt(Math.pow(U[0],2) + Math.pow(V[0],2));		

    d3.select("#skewTd3")	
	    .on("mousemove", wind_tooltip);
	   


	function wind_tooltip() {
		var y = d3.mouse(this)[1] - 90;		
		var logP = (y/barbsh)*(Math.log(1050)-Math.log(150)) + Math.log(150);
		var P = Math.exp(logP);

		console.log(P)

		var widx = closest(Pascent, P);			
		var angle = Math.atan2(U[widx], V[widx]);  																// Get the wind direction in degrees from U, V
	    var degrees = 180*angle/Math.PI; 
	    var wdir = (270+Math.round(degrees))%360;
		var WSpeed = Math.sqrt(Math.pow(U[widx],2) + Math.pow(V[widx],2));										// And the windspeed.	
		var z = -10.0*Math.log(P/Pascent[0]);

		svg.append("rect")
			.attr("x", w-300)
			.attr("height", 30)
			.attr("width", barbsw+300)
			.attr("fill", "#1A1A1A")
			.attr("opacity", "0.7")

		svg.append("g")
			.append("text")
			.text(Math.round(P)+" hPa  "+Math.round(WSpeed)+" kt     "+Math.round(wdir)+' deg')
			.attr("x", w-280)
			.attr("y", 20)
			.attr("font-family", "sans-serif")
			.attr("font-size", "20px")
			.attr("font-family", "Helvetica")
			.attr("fill", "#cccccc");
     
	}


	windbarbs(Pascent, U, V); 
	// Wrapping function to run the draw_windbarbs() function 
	// for each pressure level. Set to draw one every 50hPa	
	function windbarbs(Pascent, U, V) {
		//svgbarbs.selectAll('*').remove();
		for (var pp = 100; pp <= 1000; pp=pp+50) { 
			var widx = closest(Pascent, pp);								// Wind barbs are draw at the nearest point in the
			draw_windbarbs(Pascent[widx], U[widx], V[widx]);			// sounding to the desired pressure. 
		};

	};



	// Main wind barbs function
	function draw_windbarbs(P, U, V)  { 

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

		var cloudPpx = barbsh*(Math.log(P)-Math.log(cminP))/(Math.log(cmaxP)-Math.log(cminP));		// Get the pixel location as a log plot for each barb
		var angle = Math.atan2(U, V);  																// Get the wind direction in degrees from U, V
	    var degrees = 180*angle/Math.PI; 
	    var wdir = (270+Math.round(degrees))%360;
		var WSpeed = Math.sqrt(Math.pow(U,2) + Math.pow(V,2));										// And the windspeed 

        

		// Allocate which barb goes at which pressure level
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
			var barbie = barb100;
		}
		
										
 	    svg.append("path")  						
		    .attr("stroke", "#cccccc")
		    .style("stroke-width", "17px")
		    .attr("fill", "#cccccc")
		    .attr("d", barbie)		
		    .attr("transform", "translate("+(w+barbsw/2)+","+cloudPpx+") rotate("+wdir+",0,0) scale("+scale+")  ");

	};


	// Function for matching the ascent pressures with the desired pressures. 
	function closest(list, x) {
	    var miin,
		chosen = 0;
	    for (var i in list) {
		miin = Math.abs(list[chosen] - x);
		if (Math.abs(list[i] - x) < miin) {
		    chosen = i;}
		}
	    return chosen;
	};

};