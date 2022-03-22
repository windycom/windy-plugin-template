import * as _ from '@windy/utils';

// Remove data points with some null values
function validateData(data) {
    for (let i = 0; i < data.length; ) {
        const keys = Object.keys(data[i]);
        if (keys.find(key => data[i][key] == null)) {
            data.splice(i, 1);
        } else {
            ++i;
        }
    }
}

// Use when float inaccuracy may occur
const almostEqual = (a, b) => Math.abs(a - b) < 0.000001;

// Bilinear interpolation between two data arrays
function interpolateArray(data1, data2, w) {
    if (almostEqual(w, 0)) {
        return _.clone(data1);
    }
    if (almostEqual(w, 1)) {
        return _.clone(data2);
    }

    const data = [];
    for (let lev = 0; lev < data1.length; ++lev) {
        // Some levels may be missing (corrupted data) except ground level
        let d2 = lev == 0 ? data2[0] : data2.find(d => d.level == data1[lev].level);
        if (!d2) {
            continue;
        }
        data.push(interpolatePoint(data1[lev], d2, w));
    }

    return data;
}

// Bilinear interpolation between two data points
function interpolatePoint(point1, point2, w) {
    if (almostEqual(w, 0)) {
        return _.clone(point1);
    }
    if (almostEqual(w, 1)) {
        return _.clone(point2);
    }

    const interp = {};
    const keys = Object.keys(point1);
    keys.forEach(key => {
        interp[key] = (1 - w) * point1[key] + w * point2[key];
    });

    return interp;
}

// Returns intersection of two line segments
function intersection(line1, line2) {
    const [[x1, y1], [x2, y2]] = line1;
    const [[x3, y3], [x4, y4]] = line2;

    if ((x2 - x1 == 0 && y2 - y1 == 0) || (x4 - x3 == 0 && y4 - y3 == 0)) {
        return null; // One of the lines has zero length
    }

    var d = (y2 - y1) * (x4 - x3) - (x2 - x1) * (y4 - y3);
    if (!d) {
        return null;
    } // Lines are parallel

    var t = ((x2 - x1) * (y3 - y1) + (y2 - y1) * (x1 - x3)) / d;
    if (t < 0 || t > 1) {
        return null;
    } // Intersection is out of line1

    var px = x3 + t * (x4 - x3);
    var py = y3 + t * (y4 - y3);

    var s = x2 - x1 ? (px - x1) / (x2 - x1) : (py - y1) / (y2 - y1);
    if (s < 0 || s > 1) {
        return null;
    } // Intersetion is out of line2

    return [px, py];
}

// Returns first intersection of polyline straight line
function dataIntersection(line, polyline, getPoint) {
    for (let i = 0; i < polyline.length - 1; ++i) {
        const pt = intersection(line, [getPoint(polyline[i]), getPoint(polyline[i + 1])]);
        if (pt) {
            return pt;
        }
    }

    return null;
}

// Inspired by airgram.mjs:windMark()
function addWindBarb(g, x, y, dir, speed) {
    const scale = 20;
    const windBarb = g
        .append('g')
        .attr('class', 'windbarb')
        .attr('transform', `translate(${x}, ${y})rotate(${dir})`);

    // Convert to 5-knots multimple
    let knots5 = Math.round(speed * 0.388768);

    if (knots5 > 0) {
        windBarb
            .append('line')
            .attr('stroke', 'black')
            .attr('x1', 0)
            .attr('x2', 0)
            .attr('y1', 0)
            .attr('y2', -scale);

        const d = 0.15 * scale;
        var dy = -scale;

        // Shift 5 kn barb
        if (knots5 == 1) {
            dy += d;
        }

        // Flags
        if (knots5 >= 10) {
            while (knots5 >= 10) {
                windBarb
                    .append('polygon')
                    .attr('points', `0 ${dy}, ${2.5 * d} ${dy + d / 2}, 0 ${dy + d}`)
                    .style('stroke', 'black');
                knots5 -= 10;
                dy += d;
            }
            dy += d;
        }

        // Small barbs
        while (knots5 > 0) {
            windBarb
                .append('line')
                .attr('x1', 0)
                .attr('x2', knots5 > 1 ? 2.5 * d : 1.25 * d) // Short or normal barb
                .attr('y1', dy)
                .attr('y2', dy - 0.25 * d)
                .style('stroke', 'black');
            knots5 -= 2;
            dy += d;
        }
    } else {
        // No wind
        // Outline circle
        windBarb
            .append('circle')
            .style('stroke', 'black')
            .style('fill', 'none')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', 0.25 * scale);

        // Central dot
        windBarb
            .append('circle')
            .style('stroke', 'black')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', 0.05 * scale);
    }
}

export default {
    validateData,
    almostEqual,
    interpolateArray,
    interpolatePoint,
    intersection,
    dataIntersection,
    addWindBarb,
};
