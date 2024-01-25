import { type ParsedQueryString } from '../utils/queryString';
import type { WindowPlugins } from '@windy/WindowPlugin';
import type { Coords, PickerCoords } from '@windy/interfaces.d';
import type { RouterResult } from '@windy/router.d';
type StartupCoords = {
    sharedCoords: Coords | null;
    pickerCoords: PickerCoords | null;
};
/**
 * Parse URL to plugin and its parameters (if any)
 *
 * @param purl Pure URL
 * @returns Parsed parameters from the URL, or undefined if cannot be parsed
 */
export declare function resolveRoute(purl: string, parsedQs?: ParsedQueryString): RouterResult<keyof WindowPlugins> | void;
/**
 * Parse search part of the URL
 * eg: https://www.windy.com/?overlay,level,acTime,lat,lon,zoom,marker
 * lat,lon,zoom are obligatory and must go always together
 * All other params are optional and can be in any order
 * WARNING: This method has thousands of side effects!!
 *
 * @param searchQuery Search part of the URL, eg: lat,lon,zoom,marker
 * @returns Coordinates from the URL (if any) and coordinates of the picker (if any)
 */
export declare function parseSearch(searchQuery: string | undefined, parsedQs?: ParsedQueryString): StartupCoords | undefined;
/**
 * Path part of the startup url (if could be parsed, empty string otherwise)
 */
export declare const url: string;
/**
 * Parsed coordinates from URL
 */
export declare const sharedCoords: Coords | null | undefined;
/**
 * Windy.com was launched with detail or plugin in URL
 */
export declare const startupDetail: boolean;
export {};
