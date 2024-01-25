import { Evented } from '@windy/Evented';
import type { OnHoverPOIData } from '@plugins/poi-libs/poi-libs.d';
import type { LatLon } from '@windy/interfaces.d';
import type { PluginsOpenParams } from '@windy/plugin-params.d';
import type { Pixel, PickerOpener } from '@windy/types';
interface Events {
    pickerOpened: [PluginsOpenParams['picker'] & {
        source?: 'picker';
    }];
    pickerMoved: [PluginsOpenParams['picker']];
    pickerClosed: [];
    dataChanged: [];
    getPOIsAtXY: [Pixel, Pixel];
    POIloaded: [OnHoverPOIData];
    POIclose: [];
    rqstOpenPOIdetail: [PickerOpener];
}
/**
 * Main emitter for purpose of picker actions, must be pard of core, so it is here.
 */
export declare const emitter: Evented<Events>;
/**
 * Major handling of mobile/tablet picker dot on the screen
 */
export declare class PickerDot {
    pickerDotEl: HTMLDivElement;
    mapContainerEl: HTMLDivElement;
    lat: number | null;
    lon: number | null;
    constructor();
    /**
     * Locks picker in position, so any change in picker location
     * will sync its position  to desired lat,lons
     */
    lockPosition(): void;
    unlockPosition(): void;
    /**
     * Sets & lock the position of picker dot
     */
    setPosition(lat: number, lon: number): void;
    /**
     * Offsets position of picker to top by moving whole map container
     * moves map only to top
     */
    offsetPosition(y: Pixel): void;
    /** Resets previously offset picker position */
    resetOffset(): void;
    /** Returns picker dot position as Leaflet coords */
    getLatLng(): L.LatLng;
    /** Returns lat and lon of the actual picker dot position */
    getLatLon(): LatLon;
    /** Returns position of pickerDot on Leaflet map */
    getDotPosition(): {
        x: Pixel;
        y: Pixel;
    };
    private positionChanged;
}
/**
 * Instance of blinking dot on map (used in picker-mobile, detail & distance plugins so far)
 * Handles resizing of map and rotation changes
 *
 * Unfortunately is initialized even for desktop, where is not used
 */
export declare const pickerDot: PickerDot;
export {};
