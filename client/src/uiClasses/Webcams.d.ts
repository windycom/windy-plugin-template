import { ClickHandler } from '@windy/ClickHandler';
import type { ClickHandlerInitParams } from '@windy/ClickHandler';
import type { WebcamDetail, WebcamsLoadingParams, WebcamMetadata } from '@windy/Webcams.d';
import type { Plugins } from '@windy/plugins.d';
import type { LatLon } from '@windy/interfaces';
export type WebcamsInitParams = {
    useHover?: boolean;
    maxAmount?: number;
    singleLine?: boolean;
    imgRatio?: number;
    toOpen?: keyof Plugins;
} & ClickHandlerInitParams<string>;
export declare class Webcams extends ClickHandler<string> {
    protected maxAmount: number;
    protected imgRatio: number;
    private toOpen;
    private currentLocation;
    protected singleLine: boolean;
    private useHover;
    private hasListener;
    protected daylight: boolean;
    private marker;
    data: WebcamDetail[];
    constructor(params: WebcamsInitParams);
    /**
     * Based on webcam item returns additional metadata
     */
    static getMetadata(loc: LatLon, cam: WebcamDetail, daylight?: boolean): WebcamMetadata;
    /**
     * Just adds dayligtListener
     */
    addListeners(): this;
    /**
     * Remove listener, remove marker
     */
    unmount(): void;
    /**
     * Loads a webcams near { lat, lon }
     *
     * @returns promise with loaded json
     */
    load<T extends WebcamsLoadingParams>(params: T): Promise<WebcamDetail[]>;
    /**
     * Pulsating marker
     */
    addMarker(index: number): void;
    removeMarker(): void;
    /**
     * Calls callback for each webcam
     */
    forEach(cb: (el: HTMLDivElement, i: number) => void): void;
    /**
     * Renders HTML into page
     */
    protected render(): void | string;
    /**
     * Sets w,h of image
     */
    protected setWH(w: number, h: number): void;
    /**
     * Load images into it
     */
    protected loadImages(): void;
    protected click(command: string, index: string): void;
    private index2location;
}
