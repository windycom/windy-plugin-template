import store from '@windy/store';
import { emitter as picker } from '@windy/picker';

const readLocation = params => {
    if (!params) {
        return;
    }

    const { lat, lon } = params;
    console.log('Picker is at', lat, lon);
};
const onClose = () => {
    console.log('Picker was closed');
};

export const onmount = () => {
    // picker has been opened at latLon coords
    picker.on('pickerOpened', readLocation);

    // picker was closed
    picker.on('pickerClosed', onClose);

    // picker was dragged by user to latLon coords
    store.on('pickerLocation', readLocation);
};

export const ondestroy = () => {
    picker.off('pickerOpened', readLocation);
    picker.off('pickerClosed', onClose);
    store.off('pickerLocation', readLocation);
};
