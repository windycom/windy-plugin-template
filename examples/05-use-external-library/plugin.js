import { map, markers } from '@windy/map';
import * as rs from '@windy/rootScope';

let marker = null;
let node, refs;

// You do NOT NEED jQuery!!!

export const onmount = (node_, refs_) => {
    console.log('mount');

    node = node_;
    refs = refs_;

    console.log(node); // -> el containing this plugin
    console.log(refs.graph); // -> el with data-ref="graph"
};

const renderGraph = () => {
    refs.graph.innerHTML = '';

    // Make an SVG Container, d3 library injected d3 global variable, it is defined for sure, silent eslint
    // eslint-disable-next-line no-undef
    const svg = d3.select('#my-graph').append('svg').attr('width', '100%').attr('height', 80);

    //Draw the Circle
    svg.append('circle').attr('cx', '50%').attr('cy', '50%').attr('r', 20);

    svg.append('text')
        .text('This circle was drawn with d3')
        .attr('fill', 'white')
        .attr('x', 0)
        .attr('y', '95%');
};

// Whenever your plugin is opened from context menu
// it recieves { lat, lon } object with required coordinates
export const onopen = latLonObject => {
    console.log('plugin opened');

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

    // d3 library was loaded from external source SWEET!
    renderGraph();

    const leafletCoords = { lng: lon, lat };
    const { x, y } = map.latLngToLayerPoint(leafletCoords);

    // Desktop version
    if (!rs.isMobile) {
        // node contains el of your mounted plugin
        node.style.left = `${x - 15}px`;
        node.style.top = `${y + 15}px`;

        // Mobile version
    } else {
        const height = node.clientHeight;
        map.center(latLonObject, false).panBy([0, -0.5 * height + 50]);
    }

    if (marker) {
        marker.setLatLng([lat, lon]);
    } else {
        marker = L.marker([lat, lon], {
            icon: markers.pulsatingIcon,
            zIndexOffset: -300,
        }).addTo(map);
    }

    refs.coords.textContent = `${lat.toFixed(3)}, ${lon.toFixed(3)}`;

    // Catch all unhandled clicks not to fall into Leaflet map
    node.oncontextmenu = node.ondblclick = node.onclick = ev => ev.stopPropagation();
};

export const ondestroy = () => {
    console.log('plugin closed');

    if (marker) {
        map.removeLayer(marker);
        marker = null;
    }
};
