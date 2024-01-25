import type { GeolocationInfo, HomeLocation } from '@windy/interfaces.d';
/**
 * Show the weather box on HP
 *
 * @param coords At which location show the HP
 */
export declare function show(coords: HomeLocation | GeolocationInfo): void;
/**
 * Hides, the weather DIV
 *
 * @param ev Event that initiated hiding
 */
export declare function hide(ev?: MouseEvent | KeyboardEvent | TouchEvent): void;
export declare const getCancelShow: () => boolean;
export declare const setCancelShow: () => boolean;
