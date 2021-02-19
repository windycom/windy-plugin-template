
import picker from '@windy/picker';
// import utils from '@windy/utils';
import store from '@windy/store';
// import map from '@windy/map';
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


const options = {
    key: 'psfAt10AZ7JJCoM3kz0U1ytDhTiLNJN3',
    plugin: 'windy-plugin-skewt'
}

const load = pluginDataLoader(options)


// Run the plugin based on invoking the picker
const activate_SkewT = latLon => {

    set_dimensions();

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
                setTimeout(function(){ activate_SkewT(); }, 500);
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
        catch(err) {
            if (RetryAttemptsAir < 3) {
                console.log("There was a problem with the data loader, retrying...")
                setTimeout(function(){ activate_SkewT(); }, 1000);
                RetryAttemptsAir += 1
            }
        }

        const refPressures = [950, 925, 900, 850, 800, 700, 600, 500, 400, 300, 200, 150];
        var Pascent = refPressures.filter((refPressure) => refPressure < surfacePressure);
        var Tdascent = get_data(data, Pascent, 'dewpoint', tidx);
        var Tascent = get_data(data, Pascent, 'temp', tidx);
        var U = get_data(data, Pascent, 'wind_u', tidx);
        var V = get_data(data, Pascent, 'wind_v', tidx);
        Pascent.unshift(surfacePressure);
        Tascent.unshift(surfaceTemp);
        Tdascent.unshift(surfaceDewPoint);
        U.unshift(surfaceUWindSpotForecast[tidx]);
        V.unshift(surfaceVWindSpotForecast[tidx]);

        Tascent = Tascent.map(t => Math.round(10 * (t - 273.15)) / 10);
        Tdascent = Tdascent.map(t => Math.round(10 * (t - 273.15)) / 10);

        fetchSondeAllSondes().then((allSondes) => allSondes.json())
            .then(repose =>  console.log(repose));
        


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


 
  function fetchSondeAllSondes() {
    return fetch(`https://api.skewt.org/api/available/`);
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
