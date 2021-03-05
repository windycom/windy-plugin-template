
import picker from '@windy/picker';
// import utils from '@windy/utils';
import store from '@windy/store';
import map from '@windy/map';
import broadcast from '@windy/broadcast';

/************************************************************************
 * SkewT.js
 *
 * A windy plugin written by John C. Kealy.
 *
 * Based on a stripped-down version of the https://www.skewt.org code.
 *
 * Email any queries to me at johnckealy.dev@gmail.com.
 *
 * Dec 2018
 * Updated Aug 2020
 *
 *************************************************************************/
const pluginDataLoader = W.require('@plugins/plugin-data-loader');
var PickerOn = false;
var zoomed = false;
var startpressure = 1050;
var RetryAttemptsSpot = 0;
var RetryAttemptsAir = 0;
const SkewTApiPath = 'https://apiv2.skewt.org';
var sondeMarker;

const options = {
    key: 'psfAt10AZ7JJCoM3kz0U1ytDhTiLNJN3',
    plugin: 'windy-plugin-skewt'
}

const load = pluginDataLoader(options)


// Run the plugin based on invoking the picker
const activate_SkewT = latLon => {

    set_dimensions();

    var btn = document.getElementById('close-tooltips')
        .addEventListener('click', () => {
            map.eachLayer(function (layer) {
                if (layer.options.pane === "tooltipPane") layer.removeFrom(map);
            });
        })

    let { lat, lon } = picker.getParams()
    PickerOn = true;

    if (zoomed) {
        var endpressure = 600;
    } else {
        var endpressure = 150;
    }
    document.getElementById('skewt-control-panel').style.display = "inline-block";

    set_dimensions();
    var introtext = document.getElementById('ft-title')
    introtext.style.display = "none";
    zoom_button();

    const dataOptions = {
        model: store.get('product'),
        lat: lat,
        lon: lon
    }

    const myIcon = L.divIcon({
        className: 'css-icon',
        iconSize: [15, 15]
    });

    const showSondesCB = document.getElementById('show-sondes-checkbox').checked

    if (sondeMarker) map.removeLayer(sondeMarker)
    sondeMarker = L.marker([lat, lon], { icon: map.myMarkers.pulsatingIcon }).addTo(map);

    if (showSondesCB) {
        fetch(`${SkewTApiPath}/api/nearest/?lat=${lat}&lon=${lon}`)
            .then(response => response.json())
            .then((sonde) => {
                const sondeValidtime = new Date(sonde.sonde_validtime)
                let sondeHour = sondeValidtime.getHours().toString()
                if (sondeHour.length === 1) {
                    sondeHour = '0' + sondeHour
                }

                let M = L.marker({ 'lat': sonde.lat, 'lon': sonde.lon }, { icon: myIcon, Id: sonde.wmo_id }).addTo(map);
                M.bindTooltip(`${sonde.station_name} (${sondeHour}Z)`, {
                    permanent: true,
                    direction: 'right',
                    interactive: true,
                    offset: [15, 0],
                    className: 'tooltip'
                })
                M.addEventListener('click', function () {
                    if (sondeMarker) map.removeLayer(sondeMarker)
                    sondeMarker = L.marker([sonde.lat, sonde.lon], { icon: map.myMarkers.pulsatingIcon }).addTo(map);
                    onMarkerClick(sonde.wmo_id, startpressure, endpressure);
                });
            });
    }


    var surfacePressureSpotForecast = [];
    var surfaceTempSpotForecast = [];
    var surfaceDewPointSpotForecast = [];
    var surfaceUWindSpotForecast = [];
    var surfaceVWindSpotForecast = [];

    // load up a an array with a timeseries of the surface
    // pressure using the 'forecast' API call.
    load('forecast', dataOptions).then(({ data }) => {
        Object.keys(data.data).forEach((datetimeKey) => {
            data.data[datetimeKey].forEach((field) => {
                surfacePressureSpotForecast.push(field.pressure / 100)
                surfaceTempSpotForecast.push(field.temp)
                surfaceDewPointSpotForecast.push(field.dewPoint)
                let [u, v] = winds2UV(field.windDir, field.wind)
                u *= 1.94384;
                v *= 1.94384;
                surfaceUWindSpotForecast.push(u)
                surfaceVWindSpotForecast.push(v)
            })
        });
    });

    //Load point forecast for lat, lon.
    load('airData', dataOptions).then(({ data }) => {

        if (isNaN(surfaceTempSpotForecast[0])) {
            if (RetryAttemptsSpot < 3) {
                console.log('There was a problem loading the spot forecast, retrying...')
                setTimeout(function () { activate_SkewT(); }, 500);
                RetryAttemptsSpot += 1
            }
        }

        var current_timestamp = store.get('timestamp');
        var tidx = gettimestamp(current_timestamp, data.data.hours);

        try {
            var surfacePressure = getSurfacePressure(
                data.header.elevation, surfacePressureSpotForecast[tidx]
            )
            var surfaceTemp = surfaceTempSpotForecast[tidx];
            var surfaceDewPoint = surfaceDewPointSpotForecast[tidx];
        }
        catch (err) {
            if (RetryAttemptsAir < 3) {
                console.log("There was a problem with the data loader, retrying...")
                setTimeout(function () { activate_SkewT(); }, 1000);
                RetryAttemptsAir += 1
            }
        }

        const refPressures = [950, 925, 900, 850, 800, 700, 600, 500, 400, 300, 200, 150];
        var Pascent = refPressures.filter((refPressure) => refPressure < surfacePressure);
        var Tdascent = get_data(data, Pascent, 'dewpoint', tidx);
        var Tascent = get_data(data, Pascent, 'temp', tidx);
        var Ums = get_data(data, Pascent, 'wind_u', tidx);
        var Vms = get_data(data, Pascent, 'wind_v', tidx);
        const U = Ums.map((datapoint => datapoint *= 1.94384));
        const V = Vms.map((datapoint => datapoint *= 1.94384));
        Pascent.unshift(surfacePressure);
        Tascent.unshift(surfaceTemp);
        Tdascent.unshift(surfaceDewPoint);
        U.unshift(surfaceUWindSpotForecast[tidx]);
        V.unshift(surfaceVWindSpotForecast[tidx]);

        Tascent = Tascent.map(t => Math.round(10 * (t - 273.15)) / 10);
        Tdascent = Tdascent.map(t => Math.round(10 * (t - 273.15)) / 10);

        // draw the skewT and the windbarbs.
        draw_skewT(Pascent, Tascent, Tdascent, startpressure, endpressure);
        cbarbs(Pascent, Tascent, U, V, current_timestamp, dataOptions, startpressure, endpressure);
    });
}

// As the picker appears or moves, draw the SkewT at the new latlon point
picker.on('pickerOpened', activate_SkewT)
picker.on('pickerMoved', activate_SkewT)
store.on('timestamp', function () {
    if (PickerOn) {
        activate_SkewT();
    }
})

// close the skewT when the picker is closed
const close_skewT = () => {
    d3.select("#skewTbox").remove();
    PickerOn = false;
    const controls = document.getElementById('skewt-control-panel')
    controls.style.display = "none";
    const ftTitle = document.getElementById('ft-title')
    ftTitle.style.display = "display-block";
}
picker.on('pickerClosed', close_skewT)


function draw_skewT(Pascent, Tascent, Tdascent, startpressure, endpressure) {
    // When invoked, draw the skewT and also update the position if necessary
    cskewT(Pascent, Tascent, Tdascent, startpressure, endpressure)
};

const onMarkerClick = (wmo_id, startpressure, endpressure) => {
    d3.selectAll('path').interrupt();
    const sonde = fetchSonde(wmo_id, startpressure, endpressure);
}

function fetchSonde(wmo_id, startpressure, endpressure) {
    fetch(`${SkewTApiPath}/api/sondes/?wmo_id=${wmo_id}`)
        .then(response => response.json())
        .then((sonde) => {
            const Pascent = sonde.pressurehPA;
            const Tascent = sonde.temperatureK.map((datapoint => datapoint -= 273.15));
            const Tdascent = sonde.dewpointK.map((datapoint => datapoint -= 273.15));
            const U = sonde.u_windMS.map((datapoint => datapoint *= 1.94384));
            const V = sonde.v_windMS.map((datapoint => datapoint *= 1.94384));
            const sonde_timestamp = sonde.sonde_validtime;
            const dataOptions = { model: 'sonde' }

            draw_skewT(sonde.pressurehPA, Tascent, Tdascent, startpressure, endpressure)
            cbarbs(Pascent, Tascent, U, V, sonde_timestamp, dataOptions, startpressure, endpressure);
        })
}



function zoom_button() {
    var zoomOut = document.getElementById('zoom-out')
    var zoomIn = document.getElementById('zoom-in')
    var closeButton = document.getElementById('closebutton')
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
        var m = Math.abs(current_timestamp - h[i])
        if (m < minDiff) {
            minDiff = m
            tidx = i
        };
    };
    return tidx;
};


function get_data(data, Pascent, field, tidx) {
    const ascent = Pascent.map((pLevel) => {
        return data.data[`${field}-${pLevel}h`][tidx];
    })
    return ascent
}

W.map.on("click", e => {
    broadcast.fire('rqstOpen', 'picker', { lat: e.latlng.lat, lon: e.latlng.lng })
    picker.on('pickerOpened', () => {
        document.getElementById('windy-plugin-skewt').style.display = 'block';
    });
})

