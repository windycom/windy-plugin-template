import type { ExtendedWebGLTexture, WebGLProgramObject } from '@windy/GlObj.d';
import type { TileParams } from '@windy/Renderer.d';
import type { TileLayerCanvas } from '@windy/TileLayerCanvas.d';
import type { DataTile } from '@windy/dataLoader';
export type Gradient = {
    texture: ExtendedWebGLTexture | null;
    mul: number;
    add: number;
} | null;
export type ShaderMap = Record<string, WebGLProgramObject | null>;
declare class TileRenderer {
    /**
     * Is tile renderer ready?
     */
    private isReady;
    /**
     * Size of tile - 256 or 512
     */
    private edgeSize;
    /**
     * Last drawn layer
     */
    private lastIdent;
    /**
     * Time sum for computing debug avg. time
     */
    private testSumTime;
    /**
     * Count of rendered tiles for computing debug avg. time
     */
    private testCount;
    /**
     * Is initialized?
     */
    private initialized;
    /**
     * Test if WebGL rendering is available was performed
     */
    private testPerformed;
    /**
     * Test for WebGL was successful
     */
    private testOk;
    /**
     * Number of WebGL initialization error
     */
    private errorCount;
    /**
     * WebGL init promise resolving if this renderer is ready
     */
    private initPromise;
    /**
     * Canvas for creating tiles
     */
    private canvas;
    /**
     * GLObject for this canvas
     */
    private glo;
    /**
     * Standard gradient
     */
    private gradient;
    /**
     * Secondary gradient for special layers (Eg. Clouds)
     */
    private gradient2;
    /**
     * Colors for types of snow
     */
    private ptypeColors?;
    /**
     * Shaders storage object
     */
    private specShader;
    /**
     * All generic shaders accessed by index via bit mask of needed GLSL defines
     */
    private shMulti;
    /**
     * Source texture
     */
    private srcTexture;
    /**
     * Vertex buffer
     */
    private vertexBufferRect;
    private uVPars0;
    private uVPars1;
    private uVPars2;
    private texCCL;
    private texPType1;
    private texPType2;
    private texCRain;
    constructor();
    /**
     * Reset renderer on lost focus
     * @param hasFocus
     */
    visibilityChanged(hasFocus: boolean): void;
    /**
     * Init this object and its webgl data, loads all textures from URL
     * @returns Promise resolving with this.isReady after everything is loaded or failed loading.
     */
    init(): Promise<boolean>;
    /**
     * Processes tile, render it and then writes it to given canvas
     * @param tileLayerCanvas TileLayerCanvas
     * @param canvas Canvas to be writen into
     * @param tInfo tile info for rendering
     * @param dTile data tile - source data
     * @returns Promise.resolve( done ) ...true - tile rendered, false - tile NOT rendered (no support or some issue)
     */
    processTile(tileLayerCanvas: TileLayerCanvas, canvas: HTMLCanvasElement, tInfo: TileParams, dTile: DataTile): Promise<boolean>;
    /**
     * Reset renderer props
     */
    private reset;
    /**
     * Hook for 'redrawLayers' - Reset lastIdent to recreate geadient (reaction on user color edit)
     */
    private onRedrawLayers;
    /**
     * Init WebGL data after context created
     * @param glo Gl object
     * @returns Promise<boolean> rets true if ready
     */
    private onWebGlInit;
    /**
     * Creates rain pattern texture for 'clouds' layer
     */
    private prepareRainPattern;
    /**
     * Creates color gradient texture
     * @param colorObj Color instance
     * @returns texture with additional params
     */
    private createGradientObject;
    /**
     * Predefined alpha values are set to gradient and then color array is generated
     * (solution for user gradient colors with bad alpha)
     * @param colorObj
     */
    private augmentRainCoverColorsWithAlpha;
    /**
     * Prepare color gradient(s) for layer
     * @param layer
     */
    private prepareGradients;
    /**
     * Compiles vertex & fragment sources and returns WebGL program object.
     */
    private compileShader;
    /**
     * Checks if we can read pixels from gl
     * @returns bool ..true means pixels readable
     */
    private usabilityTest;
    /**
     * Renders tile through graphics hardware and reads pixels back to canvas
     * @param tileLayerCanvas tile layer canvas
     * @param canvas destination canvas for prepared tile data
     * @param dTileInfo tile info
     * @param src tile source
     * @returns if render is succesful
     */
    private renderTile;
    /**
     * Sets common shader params
     */
    private setBaseShStuff;
    /**
     * Set everything ready to render and render tile
     */
    private renderGlTile;
}
declare const tileRenderer: TileRenderer;
export default tileRenderer;
