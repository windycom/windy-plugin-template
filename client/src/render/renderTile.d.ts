import type { DataTile } from '@windy/dataLoader';
import type { TileParams } from '@windy/Renderer.d';
import type { TileLayerCanvas } from '@windy/TileLayerCanvas.d';
declare const renderNoDataTile: (canvas: HTMLCanvasElement, url?: string) => void;
declare const renderTile: (this: TileLayerCanvas, step: 1 | 2, canvas: HTMLCanvasElement, rqrdSyncNum: number, tInfo: TileParams, dTile: DataTile) => void;
export { renderTile, renderNoDataTile };
