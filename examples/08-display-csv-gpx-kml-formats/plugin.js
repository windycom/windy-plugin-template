/* global omnivore */

import { map } from '@windy/map';

let layer = null;

const removeFile = () => {
    if (layer) {
        map.removeLayer(layer);
        layer = null;
    }
};

function loadFile(f) {
    removeFile();

    const url = `https://www.windy.com/img/windy-plugins/a.${f}`;

    console.log('Loading:', url);

    layer = omnivore[f](url).addTo(map);

    switch (f) {
        case 'wkt':
            map.setView([26, 26], 4);
            break;
        case 'csv':
            map.setView([50, 14], 4);
            break;
        case 'gpx':
            map.setView([44.9, 6.05], 11);
            break;
        case 'kml':
            map.setView([37, -120], 8);
            break;
        case 'polyline':
            map.setView([40, -121], 6);
            break;
        case 'topojson':
            map.setView([51, 52], 3);
            break;
    }
}

export const onmount = (node, refs) => {
    const formats = ['csv', 'gpx', 'kml', 'polyline', 'topojson', 'wkt'];
    formats.forEach(f => {
        const el = document.createElement('li');
        el.className = 'clickable-size';
        el.onclick = () => loadFile(f);
        el.textContent = `Display ${f.toUpperCase()}`;
        refs.links.appendChild(el);
    });
};

export const ondestroy = () => removeFile();
