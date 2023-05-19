import bcast from '@windy/broadcast';
import store from '@windy/store';

const overlays = ['rain', 'wind', 'temp', 'clouds'];
const log = params => console.log('Received "redrawFinished" bcast', params);

let hasHooks = false;
let timer = null;
let i = 0;

// onopen method is called when your plugin is being opened
export const onopen = () => {
    if (hasHooks) {
        return;
    }

    // Change overlay programatically
    timer = setInterval(() => {
        i = i === 3 ? 0 : i + 1;
        store.set('overlay', overlays[i]);
    }, 2000);

    // Observe the change
    bcast.on('redrawFinished', log);

    hasHooks = true;
};

export const ondestroy = () => {
    if (hasHooks) {
        clearInterval(timer);

        bcast.off('redrawFinished', log);

        hasHooks = false;
    }
};
