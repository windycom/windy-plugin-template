import { Layer, WaveLayer } from '@windy/Layer';
import type { NumberedMetric, PrecipMetric, PtypeMetric } from '@windy/MetricClasses';
declare const layers: {
    capAlerts: Layer<undefined>;
    pressureIsolines: Layer<undefined>;
    ghIsolines: Layer<undefined>;
    tempIsolines: Layer<undefined>;
    deg0Isolines: Layer<undefined>;
    windParticles: Layer<undefined>;
    ecmwfWindParticles: Layer<undefined>;
    ecmwfWindParticles150h: Layer<undefined>;
    ecmwfWindParticles500h: Layer<undefined>;
    ecmwfWindParticles600h: Layer<undefined>;
    waveParticles: Layer<undefined>;
    currentParticles: Layer<undefined>;
    currentsTideParticles: Layer<undefined>;
    wind: Layer<NumberedMetric>;
    temp: Layer<NumberedMetric>;
    wetbulbtemp: Layer<NumberedMetric>;
    solarpower: Layer<NumberedMetric>;
    uvindex: Layer<NumberedMetric>;
    dewpoint: Layer<NumberedMetric>;
    gust: Layer<NumberedMetric>;
    gustAccu: Layer<NumberedMetric>;
    rh: Layer<NumberedMetric>;
    pressure: Layer<NumberedMetric>;
    ccl: Layer<NumberedMetric>;
    rain: Layer<PrecipMetric>;
    ptype: Layer<PtypeMetric>;
    thunder: Layer<NumberedMetric>;
    clouds: Layer<NumberedMetric>;
    lclouds: Layer<NumberedMetric>;
    mclouds: Layer<NumberedMetric>;
    hclouds: Layer<NumberedMetric>;
    cape: Layer<NumberedMetric>;
    cbase: Layer<NumberedMetric>;
    fog: Layer<NumberedMetric>;
    snowAccu: Layer<NumberedMetric>;
    rainAccu: Layer<NumberedMetric>;
    waves: WaveLayer;
    wwaves: WaveLayer;
    swell1: WaveLayer;
    swell2: WaveLayer;
    swell3: WaveLayer;
    swell: WaveLayer;
    currents: Layer<NumberedMetric>;
    currentsTide: Layer<NumberedMetric>;
    sst: Layer<NumberedMetric>;
    visibility: Layer<NumberedMetric>;
    snowcover: Layer<NumberedMetric>;
    cloudtop: Layer<NumberedMetric>;
    deg0: Layer<NumberedMetric>;
    cosc: Layer<NumberedMetric>;
    dustsm: Layer<NumberedMetric>;
    radar: Layer<NumberedMetric>;
    satellite: Layer<NumberedMetric>;
    gtco3: Layer<NumberedMetric>;
    pm2p5: Layer<NumberedMetric>;
    no2: Layer<NumberedMetric>;
    aod550: Layer<NumberedMetric>;
    tcso2: Layer<NumberedMetric>;
    go3: Layer<NumberedMetric>;
    gh: Layer<NumberedMetric>;
    efiWind: Layer<NumberedMetric>;
    efiTemp: Layer<NumberedMetric>;
    efiRain: Layer<NumberedMetric>;
    moistureAnom40: Layer<PrecipMetric>;
    moistureAnom100: Layer<PrecipMetric>;
    drought40: Layer<NumberedMetric>;
    drought100: Layer<NumberedMetric>;
    soilMoisture40: Layer<NumberedMetric>;
    soilMoisture100: Layer<NumberedMetric>;
    fwi: Layer<PrecipMetric>;
    dfm10h: Layer<NumberedMetric>;
    turbulence: Layer<NumberedMetric>;
    icing: Layer<NumberedMetric>;
};
export default layers;