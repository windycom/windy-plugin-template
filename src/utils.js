
function getSurfacePressure(elevation, SLP) {
    const surfacePressure = SLP * Math.exp(-elevation/10000);
    return surfacePressure
}

/*
  Convert Wind speed and direction to U, V
*/
function winds2UV(wdir, wspd) {
    wdir = 270 - wdir;
    var rad = 4.0*Math.atan(1)/180.
    var v = wspd*Math.sin(rad*wdir)
    var u = wspd*Math.cos(rad*wdir)
    return [u, v]
}

/*
  Set global variables for window size.
*/
function set_dimensions() {
    const forecastTable = document.getElementsByClassName('table-wrapper')[0];
    let wHeight = window.innerHeight;
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