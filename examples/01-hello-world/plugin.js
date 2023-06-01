// Windy API modules are imported via '@windy/nameOfModule'

import { map } from '@windy/map';

let popup = null;

// This part of code will be executed just once
export const onmount = () => {
    console.log('I am being mounted');
};

// onopen method is called when your plugin is being opened
export const onopen = () => {
    console.log('I am being opened');
    const center = map.getCenter();

    // this.ononpen method can be called repeatedly (without your plugin
    // being closed before), so make sure, that you will not to subscribe
    // to any listener twice
    if (popup) {
        popup.setLatLng(center);
    } else {
        popup = L.popup().setLatLng(center).setContent('Hello World').openOn(map);
    }
};

// onclose method is called when your plugin is being closed
// Unsubscribe from all your listeners, and remove all your
// stuff from a map
export const ondestroy = () => {
    console.log('I am being closed');
    if (popup) {
        map.removeLayer(popup);
        popup = null;
    }
};
