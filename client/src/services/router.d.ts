import { type ParsedQueryString } from '../utils/queryString';
import type { Coords, PickerCoords } from '@windy/interfaces.d';
import type { ExternalPluginIdent } from '@windy/types';
import type { PluginIdent } from '@windy/Plugin';
type StartupCoords = {
    sharedCoords: Coords | null;
    pickerCoords: PickerCoords | null;
};
/**
 * Parse URL to plugin and its parameters (if any)
 *
 * @returns true if some of the plugins was matched, false otherwise
 */
export declare function resolveRoute(purl: string, source: 'url' | 'back-button', parsedQs?: ParsedQueryString): ExternalPluginIdent | PluginIdent | void;
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
 * Parsed coordinates from URL
 */
export declare const sharedCoords: Coords | null | undefined;
export {};
