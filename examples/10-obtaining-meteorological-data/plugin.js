import pluginDataLoader from '@plugins/plugin-data-loader';
import { map } from '@windy/map';

const options = {
    key: 'RxcwkWO2XWsfEbdidcsskbyWqhToAwLx',
    plugin: 'windy-plugin-examples',
};

// Create new dataLoder instance
const load = pluginDataLoader(options);

let refs;

export const onmount = (node_, refs_) => {
    refs = refs_;
};

export const onopen = () => {
    map.setView([50, 14]);

    // dataLoader accepts object with all required parameters
    const dataOptions = {
        model: 'gfs',
        lat: 50,
        lon: 14,
    };

    // Loads point forecast for lat, lon
    load('forecast', dataOptions).then(({ data }) => {
        refs.forecast.innerHTML = JSON.stringify(data, null, 4);

        console.log(data);
    });

    // Loads air data for lat, lon
    load('airData', dataOptions).then(({ data }) => {
        refs.airData.innerHTML = JSON.stringify(data, null, 4);
        console.log(data);
    });
};
