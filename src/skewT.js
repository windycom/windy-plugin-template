

function cskewT(Pascent, Tascent, Tdascent, DateTime) {

	// Crate the P profile for the skewT. Everything will depend on this
	var startpressure = 1050;
	var endpressure = 150;
	var P = [startpressure];
	var dp = -1.5;
	var pressure = startpressure;
	while (pressure > endpressure) {
	    pressure = pressure+dp;
	    P.push(pressure);
	};

	// this sets the limits of the skewT, and therefore its shape
	var minT = -40.0;
	var maxT = 40.0;
	var minP = P[P.length-1];
	var maxP = P[0];
	//////////////////////////////////////

	draw_isopleths();
	skewT_main(Pascent, Tascent, Tdascent, DateTime);

	function draw_isopleths() {
		for (var T=-80; T<=40; T=T+10) {
			draw_isotherm(T);
		};
		for (var p=100; p<=1000; p=p+100) {
			draw_isobar(p);
		};
		for (var a=-30; a<=150; a=a+10) {
			draw_dry_adiabat(a, P);
		};

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
		    var linearInterpolate = function (before, after, atPoint) {
			return before + (after - before) * atPoint;
		    };

		    var newData = new Array();
		    var springFactor = new Number((data.length - 1) / (fitCount - 1));
		    newData[0] = data[0]; // for new allocation
		    for ( var i = 1; i < fitCount - 1; i++) {
			var tmp = i * springFactor;
			var before = new Number(Math.floor(tmp)).toFixed();
			var after = new Number(Math.ceil(tmp)).toFixed();
			var atPoint = tmp - before;
			newData[i] = linearInterpolate(data[before], data[after], atPoint);
		    }
		    newData[fitCount - 1] = data[data.length - 1]; // for new allocation
		    return newData;
		};


		function plot_sounding() {
			var Px=[]; var Pdx=[];

		   //// T
			for (var i = 0; i < Pascent.length; i++) {     
			    var Tnew = Tascent[i] + Math.abs(minT);
			    var Tpx = w*Tnew/(maxT-minT);
			    var Ppx = h*(Math.log(Pascent[i])-Math.log(minP))/(Math.log(maxP)-Math.log(minP));
			    Px.push([Tpx, Ppx]); 
			};
			for (i = 0; i < Px.length; i++) { 
				Px[i][0] = Px[i][0] + h - Px[i][1]
			};
		  /////  Td
			for (i = 0; i < Pascent.length; i++) {     
			    var Tnew = Tdascent[i] + Math.abs(minT);
			    var Tdpx = w*Tnew/(maxT-minT);
			    var Ppx = h*(Math.log(Pascent[i])-Math.log(minP))/(Math.log(maxP)-Math.log(minP));
			    Pdx.push([Tdpx, Ppx]); 
			};
			for (i = 0; i < Px.length; i++) { 
				Pdx[i][0] = Pdx[i][0] + h - Pdx[i][1]
			};

			var lineGenerator = d3.line();
			var pathString = lineGenerator(Px);
			svg.append("path")
			    .attr('d', pathString)
			    .attr('id', 'SdTPath')
			    .style("fill", 'none')
			    .style("stroke-width", 4)
			    .style("stroke", 'black');

			var pathStringTd = lineGenerator(Pdx);
			svg.append("path")
			    .attr('d', pathStringTd)
			    .style("fill", 'none')
			    .attr('id', 'SdTdPath')
			    .style("stroke-width", 4)
			    .style("stroke-dasharray", ("8, 4"))
			    .style("stroke", 'black');
		}; 

	};

	function draw_isobar(Pconst) {
		var Px=[];
		var Pt = [Pconst, Pconst]
		var Temps = [minT, maxT];
		// convert to pixel coordinates
		for (var i = 0; i < Pt.length; i++) {   	    
			var T = Temps[i] + Math.abs(minT);
			var Tpx = w*T/(maxT-minT);
			var Ppx = h*(Math.log(Pt[i])-Math.log(minP))/(Math.log(maxP)-Math.log(minP));

			Px.push([Tpx, Ppx]);
		};
		var lineGenerator = d3.line();
		var isoPathString = lineGenerator(Px);

		var strID = Pt+'textid'
		svg.append("path")
		    .attr('id', strID)
		    .attr('d', isoPathString)
		    .style("fill", 'none')
		    .style("stroke-width", 1.5)
		    .style("stroke", 'green');
		svg.append("g")
			.append("text")append("text")
		    .style("font-size", "50px")
		    .style('fill', "purple")
		    .attr("x",20)
		    .attr("y",-5)
		    .append("textPath")
		    .attr("xlink:href", "#"+strID)
		    .text('\xa0\xa0'+Pconst+' hPa');
	};


	///////////////////////////////////////////////////////////
	function dry_adiabat_gradient(theta, pressure, temperature, dp) {
	    
	    var CONST_CP = 1.03e3
	    var CONST_RD = 287.0
	    var Po = 1000.0


	    var theta = theta + 273.15
	    var Tt = theta * ( Math.pow((Po/pressure),(-CONST_RD/CONST_CP)) )
	    var Tt = Tt - 273.15
	    var dt = Tt - temperature    

	    return [dp, dt]
	};


	function draw_moist_adiabat(Tbase) {
		var Pnew = 1050.0;
		var Tnew = Tbase;
		var Tnew_arr=[];
		var P_arr=[];
		var Px=[];

		for (var i = 0; i < P.length; i++) {           
		    var DPDT = wet_adiabat_gradient(-80.0, Pnew, Tnew, dp) 
	 	    var Tnew = Tnew + DPDT[1];  
		    
		    var T = Tnew + Math.abs(minT);
		    var Tpx = w*T/(maxT-minT);
		    var Ppx = h*(Math.log(P[i])-Math.log(minP))/(Math.log(maxP)-Math.log(minP));
		    Px.push([Tpx, Ppx]);
		    var Pnew = Pnew + DPDT[0];  

		};
		// skew the isotherms
		for (i = 0; i < Px.length; i++) { 
			Px[i][0] = Px[i][0] + h - Px[i][1]
		};
			
		var lineGenerator = d3.line();
		var maPathString = lineGenerator(Px);

		svg.append("path")
		    .attr('d', maPathString)
		    .style("fill", 'none')
		    .style("stroke-width", 1)
		    .style("stroke", 'green');

	};    

	function draw_isotherm(temp) {
		var Px=[];
		// convert to pixel coordinates
		for (var i = 0; i < P.length; i++) {   	    
			var T = temp + Math.abs(minT);
			var Tpx = w*T/(maxT-minT);
			var Ppx = h*(Math.log(P[i])-Math.log(minP))/(Math.log(maxP)-Math.log(minP));
			Px.push([Tpx, Ppx]);
		};
		// skew the isotherms
		for (i = 0; i < Px.length; i++) { 
			Px[i][0] = Px[i][0] + h - Px[i][1]
		};
		var lineGenerator = d3.line();
		var pathString3 = lineGenerator(Px);

		var strID = 'textid'+temp

		svg.append("path")
		    .attr('id', strID)
		    .attr('d', pathString3)
		    .style("fill", 'none')
		    .style("stroke-width", 1)
		    .style("stroke", 'green');

		// color zero degree isotherm in blue
		if (temp == 0) {
			svg.select('#'+strID)
		    	.style("stroke-width", 1.2)
		    	.style("stroke", 'blue');
		};

		svg.append("text")
		    .style("font-size", "17px")
		    .style('fill', "green")
		    .attr("y",-5)
		    .append("textPath")
		    .attr("xlink:href", "#"+strID)
		    .text('\xa0\xa0\xa0\xa0\xa0\xa0'+temp+' C');
	};


	function draw_Isohume(q) {
		var Px=[];
		// convert to pixel coordinates
		for (var i = 0; i < P.length; i++) {         
			var es = (P[i]*q)/(q+622.0)
			var logthing = Math.pow((Math.log(es/6.11)),(-1.0))
			var temp = Math.pow(((17.269/237.3)*(logthing - (1.0/17.269)) ),(-1.0)	)
		    
			var T = temp + Math.abs(minT);
			var Tpx = w*T/(maxT-minT);
			var Ppx = h*(Math.log(P[i])-Math.log(minP))/(Math.log(maxP)-Math.log(minP));

			var TH = ((273.15+T)*Math.pow((1000.0/P[i]),-0.286)) - 273.15; 
			Px.push([Tpx, Ppx]);
		};
		// skew the isotherms
		for (i = 0; i < Px.length; i++) { 
			Px[i][0] = Px[i][0] + h - Px[i][1]
		};
		var lineGenerator = d3.line();
		var pathStringQ = lineGenerator(Px);

		var strID = temp+'textid'

		svg.append("path")
		    .attr('id', strID)
		    .attr('d', pathStringQ)
		    .style("fill", 'none')
		    .style("stroke-width", 1)
		    .style("stroke-dasharray", ("15, 8"))
		    .style("stroke", 'green');

		svg.append("text")
		    .style("font-size", "11px")
		    .style('fill', "green")
		    .attr("y",-5)
		    .append("textPath")
		    .attr("xlink:href", "#"+strID)
		    .text('\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+q+' g/kg');
	};


	function wet_adiabat_gradient(min_temperature, pressure, temperature, dp) {
	    var CONST_CP = 1.03e3
	    var CONST_K = 0.286
	    var CONST_KELVIN = 273.15  
	    var CONST_L = 2.5e6
	    var CONST_MA = 300.0
	    var CONST_RD = 287.0
	    var CONST_RV = 461.0
	    var kelvin = temperature + CONST_KELVIN;
	    var lsbc = (CONST_L / CONST_RV) * ((1.0 / CONST_KELVIN) - (1.0 / kelvin));
	    var rw = 6.11 * Math.exp(lsbc) * (0.622 / pressure);
	    var lrwbt = (CONST_L * rw) / (CONST_RD * kelvin);
	    var nume = ((CONST_RD * kelvin) / (CONST_CP * pressure)) * (1.0 + lrwbt);
	    var deno = 1.0 + (lrwbt * ((0.622 * CONST_L) / (CONST_CP * kelvin)));
	    var gradi = nume / deno;
	    var dt = dp * gradi;

	    return [dp, dt]
	};


	function draw_dry_adiabat(Tbase, P) {
		var Pnew = 1050.0;
		var Tnew = Tbase;
		var Tnew_arr=[];
		var P_arr=[];
		var Px=[];
		for (var i = 0; i < P.length; i++) {           
		    var DPDT = dry_adiabat_gradient(Tbase, Pnew, Tnew, dp)  
	 	    var Tnew = Tnew + DPDT[1];  
		    
		    var T = Tnew + Math.abs(minT);
		    var Tpx = w*T/(maxT-minT);
		    var Ppx = h*(Math.log(P[i])-Math.log(minP))/(Math.log(maxP)-Math.log(minP));
		    Px.push([Tpx, Ppx]);
		    var Pnew = Pnew + DPDT[0];  

		};
		// skew the isotherms
		for (i = 0; i < Px.length; i++) { 
			Px[i][0] = Px[i][0] + h - Px[i][1]
		};
			
		var lineGenerator = d3.line();
		var daPathString = lineGenerator(Px);

		svg.append("path")
		    .attr('d', daPathString)
		    .style("fill", 'none')
		    .style("stroke-width", 1)
		    .style("stroke", 'green');
	}; 

};
