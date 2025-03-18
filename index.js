/* global windyPlugin */

/**
 * Example Windy Plugin: 'Feels Like' temperature
 * ----------------------------------------------
 * This demonstrates a two-part formula for Feels Like temperature:
 *  1) Wind chill for T ≤ 10 °C
 *  2) Heat index (humidity-based) for T ≥ 20 °C
 *  3) Return actual temp for 10 < T < 20 °C
 *
 * Updated to align with Windy’s recommended plugin structure.
 */

windyPlugin({
  // Mandatory in newer plugin specs
  displayName: 'Feels Like Temperature',
  author: 'Your Name',
  version: '1.1.0',
  description: 'A Windy.com plugin that calculates a Met Office–style Feels Like layer',

  // The main plugin logic
  hooks: {
    // 1) init() is called when the plugin is first loaded
    init: function (windyAPI) {
      const { store, overlays } = windyAPI;

      // --- Cold: Wind Chill Function ---
      function windChillCelsius(airTempC, windSpeedMs) {
        // Convert m/s -> km/h
        const windSpeedKmh = windSpeedMs * 3.6;
        const v16 = Math.pow(windSpeedKmh, 0.16);

        return (
          13.12 +
          0.6215 * airTempC -
          11.37 * v16 +
          0.3965 * airTempC * v16
        );
      }

      // --- Hot: Heat Index Function ---
      function heatIndexCelsius(airTempC, relHumidityPct) {
        if (typeof relHumidityPct !== 'number') return airTempC;

        // Convert °C -> °F
        const T_F = airTempC * 1.8 + 32;
        const RH = relHumidityPct;

        // Simplified Rothfusz regression
        const HI_F =
          -42.379 +
          2.04901523 * T_F +
          10.14333127 * RH -
          0.22475541 * T_F * RH -
          6.83783e-3 * T_F ** 2 -
          5.481717e-2 * RH ** 2 +
          1.22874e-3 * (T_F ** 2) * RH +
          8.5282e-4 * T_F * (RH ** 2) -
          1.99e-6 * (T_F ** 2) * (RH ** 2);

        // Convert back to °C
        return (HI_F - 32) / 1.8;
      }

      // --- Combined: Met Office–like Feels Like ---
      function feelsLike(airTempC, windSpeedMs, relHumidityPct) {
        if (airTempC <= 10) {
          // Wind chill
          return windChillCelsius(airTempC, windSpeedMs);
        } else if (airTempC >= 20) {
          // Heat index
          return heatIndexCelsius(airTempC, relHumidityPct);
        } else {
          // Mild range: just return actual temp
          return airTempC;
        }
      }

      // --- Define a Custom Overlay ---
      const feelsLikeOverlay = {
        name: 'feelslike',
        // Tells Windy this overlay produces numeric values (like temperature),
        // so we can piggyback on the default temperature colour scale.
        type: 'values',
        // Tells Windy to label units in °C
        units: 'temp',
        // Called for each grid point to get the Feels Like value
        getValue: function (gridPoint) {
          const T = gridPoint.temp;     // °C
          const v = gridPoint.wind;     // m/s
          const rh = gridPoint.rh;      // %, 0–100

          if (typeof T !== 'number' || typeof v !== 'number') {
            return null; // Missing data
          }
          return feelsLike(T, v, rh);
        },
        label: 'Feels Like (°C)'
      };

      // Register the overlay
      // If your docs say "overlays.add()" is valid, you can use that;
      // otherwise "overlays.addOverlay()" is the more recent method name
      overlays.addOverlay(feelsLikeOverlay);

      // Optionally set this overlay active now:
      // store.set('overlay', 'feelslike');

      // If you want to track when the overlay changes:
      store.on('overlay', (ovName) => {
        if (ovName === 'feelslike') {
          console.log('Feels Like overlay is active');
        }
      });
    },

    // 2) render() is called when the plugin UI should be drawn or updated
    render: function (windyAPI) {
      // If you want custom UI elements, popups, or custom controls, do it here.
    }
  }
});
