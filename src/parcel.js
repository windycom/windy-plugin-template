const parcelAsc = (pressurehPa, temperatureC, surfaceTempC, surfacePresshPA, surfaceTdC, maxP, minP, maxT, minT, svg, Dp, P) => {
  

  const Cp = 1.03e3;
  const Rd = 287.0;

  const lambert = (xx, nb) => {
    const init = 1;
    const em = - Math.exp( -1.0 );
    const em9 = - Math.exp( -9.0 );
    const c13 = 1.0 / 3.0;
    const em2 = 2.0 / em;
    const s2 = Math.sqrt( 2.0 );
    let crude;

    if ( xx <= em9 ) {
      const zl = Math.log( -xx );
      const t = -1.0 - zl;
      const ts = Math.sqrt( t );
      crude = zl - ( 2.0 * ts ) / ( s2 + ( c13 - t / ( 2.7 + ts * 127.0471381349219 ) ) * ts );
    }
    else {
      const zl = Math.log( -xx );
      const eta = 2.0 - em2 * xx;
      crude = Math.log( xx / Math.log( - xx / ( ( 1.0 - 0.5043921323068457 * ( zl + 1.0 ) ) * ( Math.sqrt( eta ) + eta / 3.0 ) + 1.0 ) ) );
    }
    return crude;
  }

  const findLCL = (TC, TdC, pHP) => {
    const T = TC+273.15;
    const p = pHP*100.0;
    const es = 6.1078*Math.exp((17.269*TC)/(237.3+TC));
    const ee= 6.1078*Math.exp((17.269*TdC)/(237.3+TdC)) ;
    const RH = ee/es;
    const qv = 0.622*ee/(pHP-ee);

    // Parameters
    const Ttrip = 273.16;     // K
    const E0v   = 2.3740e6;   // J/kg
    const rgasa = 287.04;     // J/kg/K
    const rgasv = 461.0;        // J/kg/K
    const cva   = 719.0;      // J/kg/K
    const cvv   = 1418.0;       // J/kg/K
    const cvl   = 4119.0;       // J/kg/K
    const cpa   = cva + rgasa;
    const cpv   = cvv + rgasv;
    const cpm = (1-qv)*cpa + qv*cpv;
    const Rm = (1-qv)*rgasa + qv*rgasv;

    const a = (cpm/Rm) + (cvl-cpv)/rgasv;
    const b = -(E0v - Ttrip*(cvv-cvl))/(rgasv*T);
    const c = b/a;

    const L = lambert(Math.pow(RH,(1.0/a))*c*Math.exp(c), -1 );
    const Tlcl = T * c * ( Math.pow(L,-1.0 )  )  - 1.0  // The extra 1.0 is tuning
    const LCL = p*(Math.pow((Tlcl/T),(cpm/Rm)))
    const LCLHP = LCL/100.0;

    return LCLHP;
  }

  const wetAdiabatGradient = (pressure, temp) => {

    const L = 2.5e6;
    const RV = 461.0;
  
    temp += 273.15;
    let lsbc = (L / RV) * ((1.0 / 273.15) - (1.0 / temp));
    let rw = 6.11 * Math.exp(lsbc) * (0.622 / pressure);
    let lrwbt = (L * rw) / (Rd * temp);
    let nume = ((Rd * temp) / (Cp * pressure)) * (1.0 + lrwbt);
    let deno = 1.0 + (lrwbt * ((0.622 * L) / (Cp * temp)));
    let gradi = nume / deno;
  
    return Dp * gradi;
  }


  const closest = (list, x) => {
    let miin;
    let chosen = 0;
    for (var i in list) {
      miin = Math.abs(list[chosen] - x);
      if (Math.abs(list[i] - x) < miin) {
        chosen = i;
      };
    };
    return parseInt(chosen, 10);
  }


  const parcelAscent = temp => {
    const LCL = findLCL(temp, surfaceTdC, surfacePresshPA);
    let Px=[];
    let Tt;
    let dry = true;

    let isLiSet = false;
    P.forEach((p) => {
      const closestPidx = closest(pressurehPa, p)
      if ((p > LCL) && (p <= surfacePresshPA) ) {
        Tt = (temp+273.15)* ( (surfacePresshPA/p)**(-Rd/Cp) ) - 273.15
        let Tpx = window.w*(Tt - minT)/(maxT-minT);
        let Ppx = window.h*(Math.log(p)-Math.log(minP))/(Math.log(maxP)-Math.log(minP));
        if (temperatureC[closestPidx] > Tt) {
          Px.push([NaN, NaN]);
        } else {
          Px.push([Tpx, Ppx]);
        }
      } else if (p <= LCL) {
        if (dry) {
          temp = Tt
          dry = false;
        }
        let dt = wetAdiabatGradient(p, temp)
        temp+=dt;
        let Tpx = window.w*(temp-minT)/(maxT-minT);
        let Ppx = window.h*(Math.log(p)-Math.log(minP))/(Math.log(maxP)-Math.log(minP));
        if (temperatureC[closestPidx] > temp) {
          Px.push([NaN, NaN]);
        } else {
          Px.push([Tpx, Ppx]);
        }
      }
      if ((p<500) && (!isLiSet)) {
        let LI = temperatureC[closestPidx] - temp;
        LI = Math.round(LI * 10) / 10
        isLiSet = true;
        
        d3.select('#LIlevelid').remove()
        if (LI<0) {
          svg.append("g")
          .append("text")
          .style("font-size", "17px")
          .style('fill', "red")
          .attr("x", window.w - 80)
          .attr("transform", "translate(0,-4)")
          .attr('id', 'LIlevelid')
          .append("textPath")
          .attr("xlink:href", "#500,500textid")
          .text("LI: "+LI)
          .style("font-weight", "bold")
        }
      } 
      
    });

    // skew the isotherms
    Px.forEach((px) => {
      px[0] = px[0] + window.h - px[1];
    });

    let lineGenerator = d3.line();
    let daPathString = lineGenerator(Px);

    d3.selectAll("path#parcelcurve").remove();

    svg.append("path")
      .attr("d", daPathString)
      .attr("id", "parcelcurve")
      .style("fill", 'none')
      .style("stroke-width", 4.0)
      .style("stroke", 'red');
  }

  parcelAscent(surfaceTempC);






  const drawSlider = () => {
    
    let tt = surfaceTempC - minT;
    let markerTpx = window.w*tt/(maxT-minT);
    let markerPpx = window.h*(Math.log(surfacePresshPA)-Math.log(minP))/(Math.log(maxP)-Math.log(minP));
    let markerTx = markerTpx + window.h - markerPpx;
    
    let valueLine = svg.append("line")
    .attr("x1", 0)
    .attr("x2", markerTx)
    .attr("y1", window.h)
    .attr("y2", window.h)
    .attr("id", "filledLineID")
    .style("stroke", 'red')
    .style("stroke-linecap", "round")
    .style("stroke-width", 5);
    
    //Line to show the remaining value
    let emptyLine = svg.append("line")
    .attr("x1", window.w)
    .attr("x2", window.w)
    .attr("y1", window.h)
    .attr("y2", window.h)
    .attr("id", "emptyLineID")
    .style("stroke", 'black')
    .style("stroke-width", 5);
    
    let valueRect = svg.append("circle")
    .attr("cx", markerTx)
    .attr("cy", markerPpx)
    .attr("id", "circleID")
    .attr("r", 7)
    .style("fill", 'purple')
    .call( d3.drag().on("drag", dragEnded));
    
  };
  
  
  const dragEnded = (surfaceTemp) => {
    let Tbase = surfaceTemp;
    
    let selectedValue = d3.event.x;
    
    if (selectedValue < 0)
    selectedValue = 0;
    else if (selectedValue > window.w)
    selectedValue = window.w;
    
    let markerPpx = window.h*(Math.log(surfacePresshPA)-Math.log(minP))/(Math.log(maxP)-Math.log(minP));
    let markerTx = selectedValue + window.h - markerPpx
    
    markerTx = markerTx - (window.h - markerPpx)
    
    const valueRect = d3.selectAll("circle#circleID")
    const valueLine = d3.selectAll("line#filledLineID")
    const emptyLine = d3.selectAll("path#emptyLineID")
    
    valueRect.attr("cx", markerTx);
    valueRect.attr("cy", markerPpx);
    valueLine.attr("x2", markerTx);
    emptyLine.attr("x1", markerTx);
    
    d3.event.sourceEvent.stopPropagation();
    
    let NormValue = (selectedValue-(window.h - markerPpx)) / window.w;
    Tbase = minT + NormValue*(maxT-minT);

    parcelAscent(Tbase)
    
    valueRect.raise();
  }

  drawSlider();
}