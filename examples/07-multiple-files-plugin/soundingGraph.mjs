import overlays from '@windy/overlays';
import rs from '@windy/rootScope';
import store from '@windy/store';
import $ from '@windy/$';
import _ from '@windy/utils';
import map from '@windy/map';

import sUtils from './soundingUtils.mjs';

let svg = null;

const el = $('#sounding-chart');

const chartWidth = el.clientWidth - 30,
    chartHeight = el.clientHeight - 40;

// Scale for chart
let xScale, yScale;

let xAxisScale, yAxisScale;

let xAxis;

let yAxis;

let tempLine;

let dewPointLine;

const pointData = {
    lat: 0,
    lon: 0,
    elevation: 0,
    modelElevation: 0,
    data: {},
};

const pressureLines = [850, 500, 200];

let currentData = [],
    currentMouseY = chartHeight,
    currentInfo = {},
    currentProduct = 'gfs',
    zoomIn = false,
    refs = null; // will contain this.refs elements from mytag.html

const convertTemp = overlays.temp.convertNumber,
    convertWind = overlays.wind.convertNumber,
    convertPressure = overlays.pressure.convertNumber;

// Custom conversion of altitude
// Can not use convertNumber, because it rounds altitude to 100m
const convertAlt = value => Math.round(overlays.cloudtop.metric === 'ft' ? value * 3.28084 : value);

const init = _refs => {
    if (svg) {
        return;
    }

    svg = d3.select('#sounding-chart').append('svg');

    refs = _refs;

    // Scale for chart
    xScale = d3.scaleLinear().range([0, chartWidth]);
    yScale = d3.scaleLinear().range([chartHeight, 0]);

    // Scale for axis is different, because it can display custom units
    xAxisScale = d3.scaleLinear().range([0, chartWidth]);
    yAxisScale = d3.scaleLinear().range([chartHeight, 0]);

    xAxis = d3.axisBottom(xAxisScale).ticks(5);

    yAxis = d3
        .axisRight(yAxisScale)
        .ticks(10)
        .tickFormat(val => val);

    tempLine = d3
        .line()
        .x(d => xScale(d.temp))
        .y(d => yScale(d.gh));

    dewPointLine = d3
        .line()
        .x(d => xScale(d.dewpoint))
        .y(d => yScale(d.gh));

    const chartArea = svg
        .append('g')
        .attr('class', 'chartArea')
        .attr('transform', `translate(10,15)`)
        .style('display', 'none'); // Everything is hidden until data is loaded

    if (rs.isMobile || rs.isTablet) {
        chartArea
            .on('touchstart', dragStarted)
            .on('touchmove', dragged)
            .on('touchend', dragEnded);
    } else {
        chartArea.call(
            d3
                .drag()
                .on('start', dragStarted)
                .on('drag', dragged)
                .on('end', dragEnded),
        );
    }

    svg.append('text')
        .attr('class', 'noDataLabel')
        .text('No Data')
        .attr('x', '50%')
        .attr('y', '50%')
        .attr('text-anchor', 'middle')
        .style('display', 'none');

    chartArea
        .append('g')
        .attr('class', 'windProfile')
        .attr('opacity', 0.5)
        .attr('transform', `translate(${chartWidth - 10}, 0)`);

    const pressureGrid = chartArea.append('g').attr('class', 'pressureGrid');

    pressureLines.forEach(level => {
        var g = pressureGrid.append('g').attr('class', `l${level}`);

        g.append('line')
            .style('stroke', 'black')
            .attr('opacity', 0.25)
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', 35)
            .attr('y2', 0);

        g.append('text')
            .attr('opacity', 0.3)
            .attr('x', 40)
            .attr('y', 2)
            .text(`${level}hPa`)
            .style('font-size', '8px');
    });

    chartArea
        .append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0,${chartHeight})`);

    chartArea
        .append('g')
        .attr('class', 'y axis')
        .attr('y', chartHeight + 16);

    chartArea
        .append('text')
        .attr('class', 'x label')
        .attr('opacity', 0.75)
        .attr('x', chartWidth + 5)
        .attr('y', chartHeight + 16);

    chartArea
        .append('text')
        .attr('class', 'y label')
        .attr('opacity', 0.75)
        .attr('x', 0)
        .attr('y', -4);

    const auxLines = chartArea
        .append('g')
        .attr('class', 'auxLines')
        .attr('opacity', 0.3);

    auxLines
        .append('line')
        .attr('class', 'humidityLine')
        .attr('stroke', 'black')
        .attr('stroke-width', 1);

    auxLines
        .append('line')
        .attr('class', 'cclDryAdiabat')
        .attr('stroke', 'black')
        .attr('stroke-width', 1);

    auxLines
        .append('line')
        .attr('class', 'cclWetAdiabat')
        .attr('stroke', 'black')
        .attr('stroke-width', 1);

    auxLines
        .append('line')
        .attr('class', 'lclDryAdiabat')
        .attr('stroke', 'black')
        .attr('stroke-width', 1);

    chartArea
        .append('path')
        .attr('class', 'temperature chart')
        .attr('fill', 'none')
        .attr('stroke', 'red')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('stroke-width', 1.5);

    chartArea
        .append('path')
        .attr('class', 'dewpoint chart')
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('stroke-width', 1.5);

    // There must be rectangle covering whole chartArea
    chartArea
        .append('rect')
        .attr('class', 'overlay')
        .attr('width', chartWidth)
        .attr('height', chartHeight)
        .attr('opacity', 0);

    // Mouseinfo widget, displays info for cursor position
    const infoLine = chartArea
        .append('g')
        .attr('class', 'infoLine')
        .attr('transform', `translate(0,${currentMouseY})`);

    infoLine
        .append('line')
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
        .attr('x1', 0)
        .attr('y1', 0.5)
        .attr('x2', chartWidth)
        .attr('y2', 0.5);

    // Semi-transparent white background under text
    infoLine
        .append('rect')
        .attr('fill', 'white')
        .attr('x', 0)
        .attr('y', -20)
        .attr('width', chartWidth)
        .attr('height', 20)
        .attr('opacity', 0.7);

    const labels = infoLine.append('g').attr('transform', `translate(0,-5)`);

    labels
        .append('text')
        .attr('class', 'alt')
        .attr('x', 10);

    const tempLabels = labels
        .append('g')
        .attr('transform', `translate(${chartWidth / 2},0)`)
        .attr('text-anchor', 'end');

    tempLabels
        .append('text')
        .attr('class', 'dewpoint')
        .attr('x', 20)
        .attr('text-anchor', 'end');

    tempLabels
        .append('text')
        .attr('class', 'temp')
        .attr('x', 23)
        .attr('text-anchor', 'start');

    labels
        .append('text')
        .attr('class', 'windSpeed')
        .attr('x', chartWidth - 18)
        .attr('text-anchor', 'end');

    labels
        .append('text')
        .attr('class', 'windDir')
        .attr('x', chartWidth - 15)
        .attr('text-anchor', 'start');

    refs.zoom.onclick = switchZoom;

    updateZoomButton();
};

function updateZoomButton() {
    refs.zoom.textContent = zoomIn ? '\uE03D' : '\uE03B';
}

function switchZoom(ev) {
    zoomIn = !zoomIn;
    updateZoomButton();
    updateSettings();
    ev.stopPropagation();
}

function updatePressureGrid() {
    pressureLines.forEach(level => {
        const pt = currentData.find(pt => pt.level == level);
        if (!pt) {
            svg.select(`.pressureGrid .l${level}`).style('display', 'none');
            return;
        }

        var y = Math.round(yScale(pt.gh)) + 0.5;

        svg.select(`.pressureGrid .l${level}`)
            .style('display', null)
            .attr('transform', `translate(0,${y})`);
    });
}

function calcCurrentInfo() {
    const p1 = currentData[0]; // Ground point
    const p2 = currentData[currentData.length - 1]; // Highest point

    const humidityLine = [
        [p1.dewpoint, p1.gh],
        [p1.dewpoint - 0.002 * (p2.gh - p1.gh), p2.gh],
    ]; // 0.2°C / 100m

    // Convective condensation level intersection
    currentInfo.ccl = sUtils.dataIntersection(humidityLine, currentData, d => [d.temp, d.gh]);

    if (currentInfo.ccl) {
        currentInfo.tcon = currentInfo.ccl[0] + 0.01 * (currentInfo.ccl[1] - p1.gh);
    } else {
        currentInfo.tcon = null;
    }

    // Lifted condensation level intersection
    currentInfo.lcl = sUtils.intersection(humidityLine, [
        [p1.temp, p1.gh],
        [p1.temp - 0.01 * (p2.gh - p1.gh), p2.gh],
    ]); // 1°C / 100m
}

function updateAuxLines() {
    const p1 = currentData[0]; // Ground point
    const p2 = currentData[currentData.length - 1]; // Highest point

    // Line of the same specific humidity
    const humidityLine = [
        [p1.dewpoint, p1.gh],
        [p1.dewpoint - 0.002 * (p2.gh - p1.gh), p2.gh],
    ]; // 0.2°C / 100m

    svg.select(`.auxLines .humidityLine`)
        .attr('x1', xScale(humidityLine[0][0]))
        .attr('y1', yScale(humidityLine[0][1]))
        .attr('x2', xScale(humidityLine[1][0]))
        .attr('y2', yScale(humidityLine[1][1]));

    const ccl = currentInfo.ccl;

    if (ccl) {
        svg.select(`.auxLines .cclDryAdiabat`)
            .style('display', null)
            .attr('x1', xScale(ccl[0]))
            .attr('y1', yScale(ccl[1]))
            .attr('x2', xScale(ccl[0] + 0.01 * (ccl[1] - p1.gh))) // 1°C / 100m
            .attr('y2', yScale(p1.gh));

        svg.select(`.auxLines .cclWetAdiabat`)
            .style('display', null)
            .attr('x1', xScale(ccl[0]))
            .attr('y1', yScale(ccl[1]))
            .attr('x2', xScale(ccl[0] - 0.006 * (p2.gh - ccl[1]))) // 0.6°C / 100m
            .attr('y2', yScale(p2.gh));
    } else {
        svg.select(`.auxLines .cclDryAdiabat`).style('display', 'none');

        svg.select(`.auxLines .cclWetAdiabat`).style('display', 'none');
    }
}

function updateWindBarbs() {
    svg.selectAll('.windbarb').remove();

    const windProfile = svg.select('.windProfile');

    let lastY = 0;
    for (let i = 0; i < currentData.length; ++i) {
        const wind = _.wind2obj([currentData[i].wind_u, currentData[i].wind_v]);
        const y = yScale(currentData[i].gh);
        if (!i || Math.abs(y - lastY) > 15) {
            // Min distance to reduce barbs overlapping
            sUtils.addWindBarb(windProfile, 0, y, wind.dir, wind.wind);
            lastY = y;
        }
    }
}

function updateInfoLine() {
    if (currentData.length == 0) {
        return;
    }

    const gh = yScale.invert(currentMouseY);

    const infoLine = svg.select('.infoLine');
    let idx = currentData.findIndex(pt => pt.gh > gh);

    if (idx == -1) {
        idx = currentData.length - 1;
    }

    let pt = null;
    if (idx == 0) {
        pt = currentData[idx];
    } else {
        let p1 = currentData[idx - 1];
        let p2 = currentData[idx];
        pt = sUtils.interpolatePoint(p1, p2, (gh - p1.gh) / (p2.gh - p1.gh));
    }

    const wind = _.wind2obj([pt.wind_u, pt.wind_v]);

    infoLine
        .select('.alt')
        .text(
            `${convertAlt(Math.round(pt.gh))}${overlays.cloudtop.metric}` +
                (pt.level
                    ? ` ${convertPressure(Math.round(pt.level) * 100)}${overlays.pressure.metric}`
                    : ''),
        );
    infoLine.select('.temp').text(`${convertTemp(pt.temp.toFixed(1))}${overlays.temp.metric}`);
    infoLine
        .select('.dewpoint')
        .text(`${convertTemp(pt.dewpoint.toFixed(1))}${overlays.temp.metric}`);
    infoLine
        .select('.windSpeed')
        .text(`${convertWind(wind.wind.toFixed(1))}${overlays.wind.metric}`);
    infoLine.select('.windDir').text(`${Math.round(wind.dir)}°`);
}

function updateInfoBox() {
    refs.model.textContent = `model: ${currentProduct}`;
    refs.tcon.textContent = `TCON: ${convertTemp(currentInfo.tcon)}${overlays.temp.metric}`;
    refs.ccl.textContent = `CCL: ${convertAlt(currentInfo.ccl[1])}${overlays.cloudtop.metric}`;
    refs.lcl.textContent = `LCL: ${convertAlt(currentInfo.lcl[1])}${overlays.cloudtop.metric}`;
    refs.alt.textContent = `altitude: ${convertAlt(pointData.elevation)}${
        overlays.cloudtop.metric
    }`;
    refs.modelAlt.textContent = `model altitude: ${convertAlt(pointData.modelElevation)}${
        overlays.cloudtop.metric
    }`;
    refs.modelAlt.className =
        Math.abs(pointData.modelElevation - pointData.elevation) > 200 ? 'red' : 'ok';
}

function dragStarted() {
    map.dragging.disable();
    moveInfoLine(d3.mouse(this));

    if (rs.isMobile || rs.isTablet) {
        d3.event.stopPropagation();
    }
}

function dragEnded() {
    map.dragging.enable();
}

function dragged() {
    const margin = 20;
    const coords = d3.mouse(this);

    if (
        coords[0] >= -margin &&
        coords[0] < chartWidth + margin &&
        coords[1] >= -margin &&
        coords[1] < chartHeight + margin
    ) {
        moveInfoLine(d3.mouse(this));
    } else {
        // Hide infoline when it is dragged out
        svg.select('.infoLine').style('display', 'none');
    }

    if (rs.isMobile || rs.isTablet) {
        d3.event.stopPropagation();
    }
}

function moveInfoLine(coords) {
    currentMouseY = Math.max(0, Math.min(chartHeight, coords[1]));

    svg.select('.infoLine')
        .attr('transform', `translate(0,${currentMouseY})`)
        .style('display', null);

    updateInfoLine();
}

const setXScale = () => {
    if (!pointData.data) {
        return;
    }

    let range = [Number.MAX_VALUE, Number.MIN_VALUE];

    // Create range from all timestamps
    // pt.dewpoint <= pt.temp by definition
    for (let hour in pointData.data) {
        const minMax = pointData.data[hour].reduce(
            (acc, pt) => [Math.min(acc[0], pt.dewpoint), Math.max(acc[1], pt.temp)],
            range,
        );

        range[0] = Math.min(range[0], minMax[0]);
        range[1] = Math.max(range[1], minMax[1]);
    }

    // Apply graph zoom
    if (zoomIn) {
        range[0] = 0.5 * (range[0] + range[1]);
    }

    xScale.domain(range);

    // Update axis scale, apply metrics
    xAxisScale.domain([convertTemp(range[0]), convertTemp(range[1])]);
    svg.select('.x.axis')
        .transition()
        .call(xAxis);
};

const setYScale = () => {
    if (!pointData.data) {
        return;
    }

    let range = [Number.MAX_VALUE, Number.MIN_VALUE];
    for (let hour in pointData.data) {
        let minMax = pointData.data[hour].reduce((acc, pt) => {
            return [Math.min(acc[0], pt.gh), Math.max(acc[1], pt.gh)];
        }, range);

        range[0] = Math.min(range[0], minMax[0]);
        range[1] = Math.max(range[1], minMax[1]);
    }

    // Apply graph zoom
    if (zoomIn) {
        range[1] = 0.5 * (range[0] + range[1]);
    }

    yScale.domain(range);

    // Update axis scale, apply metrics
    yAxisScale.domain([convertAlt(range[0]), convertAlt(range[1])]);
    svg.select('.y.axis')
        .transition()
        .call(yAxis);
};

// Handler for data request
const load = (lat, lon, airData) => {
    pointData.lat = lat;
    pointData.lon = lon;

    const map = {};
    const surface = {};
    for (let param in airData.data) {
        let m = param.match(/(.+)-(?:(.+)h|surface)/); // param-level
        if (!m) {
            continue;
        }

        // Surface layer
        if (!m[2]) {
            airData.data[param].forEach((value, i) => {
                const hour = airData.data.hours[i];
                if (!surface[hour]) {
                    surface[hour] = {};
                }
                surface[hour][m[1]] = value;
            });
            continue;
        }

        // Pressure layers
        airData.data[param].forEach((value, i) => {
            const hour = airData.data.hours[i];
            if (!map[hour]) {
                map[hour] = {};
            }
            if (!map[hour][m[2]]) {
                map[hour][m[2]] = {};
            }
            map[hour][m[2]][m[1]] = value;
        });
    }

    // Set geopotential height of the surface to model elevation
    for (let hour in surface) {
        surface[hour].gh = airData.header.modelElevation;
    }

    // Transform level objects to sorted arrays, convert values
    const res = {};
    for (let hour in map) {
        for (let level in map[hour]) {
            let levelData = map[hour][level];

            levelData.level = +level;

            if (!res[hour]) {
                res[hour] = [];
            }
            res[hour].push(levelData);
        }
        res[hour].sort((a, b) => a.gh - b.gh);
    }

    // Skip data under the ground, add the ground point
    for (let hour in res) {
        let hourData = res[hour];
        const idx = hourData.findIndex(pt => pt.gh > airData.header.modelElevation);

        // All levels are under the ground or last level is at the ground
        if (idx == -1) {
            hourData = [surface[hour]];
            continue;
        }

        hourData.splice(0, idx, surface[hour]);

        sUtils.validateData(hourData);
    }

    pointData.data = res;
    pointData.elevation = airData.header.elevation;
    pointData.modelElevation = airData.header.modelElevation;

    updateSettings();

    store.on('timestamp', redraw);
};

// Shows/hides nodata label
function showNoData(show) {
    svg.select('.noDataLabel').style('display', show ? null : 'none');
    svg.select('.chartArea').style('display', show ? 'none' : null);
}

// Handler for settings change
const updateSettings = () => {
    setXScale();
    setYScale();

    svg.select('.x.label').text(overlays.temp.metric);

    svg.select('.y.label').text(`${overlays.cloudtop.metric}/amsl`);

    redraw();
};

// Handler for data or settings change
const redraw = () => {
    if (!pointData.data) {
        showNoData(true);
        return;
    }

    const ts = store.get('timestamp');

    // Find nearest hour
    const hours = Object.keys(pointData.data).sort((a, b) => a - b);
    let ts1, ts2;
    const idx = hours.findIndex(x => x >= ts);

    if (idx == 0) {
        ts1 = ts2 = hours[0];
    } else if (idx == -1) {
        // There is no data for current timestamp - show nodata label
        showNoData(true);
        return;
    } else {
        ts1 = hours[idx - 1];
        ts2 = hours[idx];
    }

    showNoData(false);

    // Interpolate between two nearest hours
    currentData = sUtils.interpolateArray(
        pointData.data[ts1],
        pointData.data[ts2],
        ts2 != ts1 ? (ts - ts1) / (ts2 - ts1) : 0,
    );

    // Calculate derived values from current data
    calcCurrentInfo();

    updatePressureGrid();

    updateAuxLines();

    updateWindBarbs();

    updateInfoLine();

    updateInfoBox();

    svg.select('.temperature.chart')
        .datum(currentData)
        .attr('d', tempLine);

    svg.select('.dewpoint.chart')
        .datum(currentData)
        .attr('d', dewPointLine);
};

export default { load, init };
