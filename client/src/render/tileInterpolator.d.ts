/**
 * Interpolation of single x,y map point (for purpose of picker or POIs) into real
 * metorological values (at that point). Can work ONLY with CanvasTileLayer instance
 *
 * @module tileInterpolator
 */
import { DataTiler } from '@windy/DataTiler';
import type { PixelInterpolationFun, CoordsInterpolationFun } from '@windy/tileInterpolator.d';
import type { DataTile } from './dataLoader';
import type { ExtendedTileParams } from '@windy/DataTiler.d';
import type { FullRenderParameters } from '@windy/Layer.d';
export declare class TileInterpolator extends DataTiler {
    cb<T extends true | false>(f1: CoordsInterpolationFun, // async interpolator does not use fakeFun with null return type
    f2: PixelInterpolationFun | (() => null), isAsync?: T & (true | false)): void;
    /**
     * Request to build interpolate function for purpose of picker & other stuff
     * and since DataTiler is async, returns this function
     * in a callback
     */
    createFun(this: this, cb: this['cb']): void;
    tilesReady(dTiles: DataTile[][], mapParams: ExtendedTileParams, params: FullRenderParameters): void;
}
export declare const tileInterpolator: TileInterpolator;
