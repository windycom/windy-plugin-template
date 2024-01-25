export type MapTilesKeys = 'graymap' | 'landmaskmap' | 'simplemap' | 'graymapPatch5' | 'graymapPatch11' | 'simplemapPatch5' | 'simplemapPatch9' | 'sznmap' | 'winter' | 'satLocal' | 'sat';
/**
 * Leaflet instance of actually used base layer
 */
export declare let baseLayer: L.GridLayer;
/**
 * Is the user from probramtic country, that complains about territorial disputes
 */
export declare const disableDetailMap: boolean;
/**
 * Return just record of different map tilesURLs that we use as basemap
 */
export declare const mapTilesRecord: (patchType?: string | null) => Record<MapTilesKeys, string>;
export declare function updateBasemap(map: L.Map): L.GridLayer;
