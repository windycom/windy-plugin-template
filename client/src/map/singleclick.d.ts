import { Evented } from '@windy/Evented';
import type { Plugins } from '@windy/plugins.d';
import type { SingleClickParams, SingleclickTypes } from '@windy/singleclick.d';
import type { Timestamp } from '@windy/types';
declare class Singleclick extends Evented<SingleclickTypes> {
    hpJustClosed: boolean;
    priorities: (keyof Plugins)[];
    /**
     * On touch device, when users play with picker, or try to position
     * map exactlly, they sometimes activate singleclick on label or POI
     *
     * This mechanism, should prevent opening unwanted detsail or POI detail
     */
    lastTimeMapWasMoved: Timestamp;
    constructor();
    /**
     * Prevents openning picker for few secs
     */
    hpShown(wasOpen: boolean): void;
    /**
     * Prses Leaflet's event into more readable object
     */
    parseEvent(ev: L.LeafletMouseEvent): SingleClickParams;
    /**
     * Handles all singleclick events
     *
     * @param Leflet singleclick event
     */
    opener(ev: L.LeafletMouseEvent): void;
}
export declare const singleclick: Singleclick;
export {};
