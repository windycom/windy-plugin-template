// Windy's core modules
import * as rs from '@windy/rootScope';
import { map, markers } from '@windy/map';
import pluginDataLoader from '@plugins/plugin-data-loader';

// Our own modules
import * as graph from './sounding/graph.js';

const options = {
    key: 'RxcwkWO2XWsfEbdidcsskbyWqhToAwLx',
    plugin: 'windy-plugin-examples',
};

const load = pluginDataLoader(options);

let marker = null;
let node, refs;

const initAndLoad = (lat, lon) => {
    const dataOptions = {
        model: 'gfs',
        lat,
        lon,
    };

    setTimeout(() => {
        graph.init(refs);

        load('airData', dataOptions).then(airData => {
            graph.load(lat, lon, airData.data);
        });
    }, 500);
};

export const onmount = (node_, refs_) => {
    node = node_;
    refs = refs_;
};

// Called when opened
export const onopen = latLonObject => {
    let lat, lon;

    // Opening from other location than contextmenu
    if (!latLonObject) {
        const c = map.getCenter();
        lat = c.lat;
        lon = c.lng;
    } else {
        lat = latLonObject.lat;
        lon = latLonObject.lon;
    }

    const leafletCoords = { lng: lon, lat };
    const { x, y } = map.latLngToLayerPoint(leafletCoords);

    if (!rs.isMobile) {
        node.style.position = 'absolute';
        node.style.left = `${x - 15}px`;
        node.style.top = `${y + 15}px`;
    } else {
        const height = node.clientHeight;

        map.center({ lat, lon }, false).panBy([0, -0.5 * height + 50]);
    }

    if (marker) {
        marker.setLatLng(leafletCoords);
    } else {
        marker = L.marker(leafletCoords, {
            icon: markers.pulsatingIcon,
            zIndexOffset: -300,
        }).addTo(map);
    }

    initAndLoad(lat, lon);

    node.oncontextmenu = node.ondblclick = node.onclick = ev => ev.stopPropagation();
};

// Called when closed
export const ondestroy = () => {
    if (marker) {
        map.removeLayer(marker);
        marker = null;
    }
};
