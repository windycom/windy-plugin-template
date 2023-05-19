import { map } from '@windy/map';

let geoJSON = null;

const removeFpl = () => {
    if (geoJSON) {
        map.removeLayer(geoJSON);
        geoJSON = null;
    }
};

const loadFpl = file => {
    removeFpl();

    fetch(`https://www.windy.com/img/windy-plugins/${file}.json`)
        .then(response => response.json())
        .then(result => {
            geoJSON = L.geoJson(result).addTo(map);

            const bounds = geoJSON.getBounds();

            map.fitBounds(bounds);
        });
};

export const onmount = (node, refs) => {
    // Whenever your plugin is mounted, all elements with 'data-ref'
    // attributes are exposed in this.refs object
    refs.fpl1.onclick = () => loadFpl('fpl1');
    refs.fpl2.onclick = () => loadFpl('fpl2');
    refs.fpl3.onclick = () => loadFpl('fpl3');
};

export const ondestroy = () => removeFpl();
