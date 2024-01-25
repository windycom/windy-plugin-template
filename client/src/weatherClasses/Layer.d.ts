import type { Color } from '@windy/Color';
import type { FullRenderParameters, Layers, RenderParams, TransformFunction } from '@windy/Layer.d';
import type { Metric } from '@windy/Metric';
import type { Legend } from '@windy/Metric.d';
import type { NumberedMetric } from '@windy/MetricClasses';
import type { Product } from '@windy/Product';
import type { DataQuality, FileSuffix } from '@windy/Product.d';
import type { Renderers } from '@windy/Renderer.d';
import type { WeatherParameters } from '@windy/interfaces.d';
import type { Levels, Products } from '@windy/rootScope.d';
import type { Timestamp } from '@windy/types';
type LayerInitParams = Pick<Layer, 'ident'> & Partial<Layer>;
export declare class Layer<M extends Metric | undefined = Metric | undefined> {
    /**
     * Colors instance(s) used for this overlay
     */
    c: Color;
    /**
     * Metric instances used for this overlay
     */
    m: M extends Metric ? M : undefined;
    /**
     * Alternative legend
     */
    l?: Legend;
    /**
     * Layer identifier (used for metric settings) since some overlays are just pointers to
     * other overlays, identifier can be same for more overlays.
     */
    ident: Layers;
    /**
     * Standard renderer ident
     */
    renderer: Renderers;
    /**
     * If set replaces overlay as filename for particular file path
     */
    filename?: string;
    /**
     * If true applies "sea" class to body tag which influencess way, the globe is displayed
     */
    sea: boolean;
    /**
     * If defined overwrites data precision quality of product
     */
    dataQuality: DataQuality;
    /**
     * If set overrides file suffix of product
     */
    fileSuffix: FileSuffix;
    /**
     * Blue channel defines transparency
     */
    JPGtransparency: boolean;
    /**
     * PNG file with defined transparency
     */
    PNGtransparency?: boolean;
    /**
     * Overrides product's maxTileZoom
     */
    maxTileZoom?: {
        free: number;
        premium: number;
    };
    /**
     * These properties are passed directlly to renderer
     */
    renderParams: RenderParams;
    /**
     * Overrides param's product
     */
    product?: Products;
    /**
     * Overrides products or params levels
     */
    levels: Levels[];
    /**
     * Optional quary string that enhances query string
     */
    query?: string;
    /**
     * webGL transformation
     */
    wTransformR?: number | 'rainLog';
    /**
     * What is this? webGL or Globe hasParticles?
     */
    hasParticles?: boolean;
    /**
     * Metrics to use in color settings
     * If users opts to change colors of this layer, use this metrics
     */
    cm?: Metric;
    /**
     * Overwrite's products pathgenerator
     */
    pathGenerator?: string;
    /**
     * Method to transfrom value in R channel
     */
    transformR?: TransformFunction;
    /**
     * Method to transfrom value in G channel
     */
    transformG?: TransformFunction;
    /**
     * Method to transfrom value in B channel
     */
    transformB?: TransformFunction;
    constructor(params: LayerInitParams);
    /**
     * Just calls Color's getColor() method
     */
    getColor(): ReturnType<Color['getColor']>;
    /**
     * getColor for layers, with mutliple colors (like rainClouds)
     */
    getColor2?(): ReturnType<Color['getColor']>;
    /**
     * Just call Product's open and return its Calendar
     */
    getCalendar(prodIdent: Products): ReturnType<Product['open']>;
    /**
     * Creates RenderingParameters
     */
    getParams(weatherParams: WeatherParameters, productIdent: Products, timestamp?: Timestamp, refTime?: string): Promise<FullRenderParameters>;
    /**
     * Return amounts of dots, based on rain
     */
    getAmountByColor?(Rf: number, Gf: number): 0 | 1 | 2 | 3 | 4;
    protected initProperties(): void;
}
export declare class WaveLayer extends Layer<NumberedMetric> {
    initProperties(): void;
}
export {};
