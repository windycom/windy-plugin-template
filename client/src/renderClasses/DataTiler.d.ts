import { dataLoader } from '@windy/dataLoader';
import type { FullRenderParameters } from '@windy/Layer.d';
import type { DataTile } from '@windy/dataLoader';
import type { ExtendedTileParams } from './DataTiler.d';
export interface TilePoint {
    x: number;
    y: number;
    z: number;
}
export type DataTilerInitParams = Partial<Pick<DataTiler, 'loader'>>;
export declare class DataTiler {
    /**
     * Incrementing counter, that keeps getTiles and tilesReady in sync
     */
    protected syncCounter: number;
    /**
     * Major coeficients (defined after tilesReady)
     */
    protected trans: number;
    protected shift: number;
    protected lShift: number;
    protected offsetX: number;
    protected offsetY: number;
    protected offset: number;
    protected width: number;
    protected height: number;
    protected w: Uint16Array | null;
    /**
     * Just shortcut do datLoader
     */
    loader: typeof dataLoader;
    constructor(params?: DataTilerInitParams);
    /**
     * This method will be called when tiles are loaded and ready to be processed
     */
    protected tilesReady(_dataTiles: DataTile[][], _mapParams: ExtendedTileParams, _params: FullRenderParameters): void;
    protected getTiles(params: FullRenderParameters): void;
    private processTile;
    private postProcess;
    private sortTiles;
}
