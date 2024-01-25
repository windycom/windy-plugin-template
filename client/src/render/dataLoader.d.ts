/**
 * Loader service for new rendering engine
 */
import type { TransformFunction } from '@windy/Layer.d';
import type { TileParams } from '@windy/Renderer.d';
export declare class DataTile {
    url: string;
    status: 'undefined' | 'loaded' | 'loading' | 'failed';
    data: ImageData['data'] | null;
    promise?: Promise<this>;
    headerPars?: number[];
    x: number;
    y: number;
    z: number;
    decodeR: TransformFunction;
    decodeG: TransformFunction;
    decodeB: TransformFunction;
    transformR: TransformFunction | null;
    transformG: TransformFunction | null;
    transformB: TransformFunction | null;
    constructor(url: string, tile: TileParams);
    load(): Promise<this>;
}
export declare const dataLoader: {
    loadTile: (tileParams: TileParams) => Promise<DataTile>;
};
