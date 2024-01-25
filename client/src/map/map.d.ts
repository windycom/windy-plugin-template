import type { LatLon } from '@windy/interfaces.d';
import type { Pixel } from '@windy/types';
/**
 * Reusable Leaflet markers
 */
export declare const markers: Record<string, L.DivIcon>;
/**
 * Main instance of Leaflet L.Map
 */
export declare const map: L.Map;
export interface CenterOptions extends LatLon {
    zoom?: number;
    paddingTop?: number;
}
/**
 * Centers/zooms leaflet map with optional offset to the left or top
 */
export declare function centerMap(coords: CenterOptions, animation?: boolean): void;
/**
 * Make sure point is visible from BOTTOM pane
 */
export declare function ensurePointVisibleY(lat: number, lon: number, offset: number): void;
/**
 * Put y on the map to lat, lon coordinated. Useful for mobile picker & such
 */
export declare function panToOffset(y: Pixel, lat: number, lon: number): void;
/**
 * God's hope for someone who uses this, since basemap can be changed
 */
export declare const baseLayer: L.GridLayer;
/**
 * Return just record of different map tilesURLs that we use as basemap
 */
export declare const getMapTiles: (patchType?: string | null | undefined) => Record<import("@windy/baseMap").MapTilesKeys, string>;
