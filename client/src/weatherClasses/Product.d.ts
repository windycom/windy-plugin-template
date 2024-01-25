import { Calendar } from '@windy/Calendar';
import type { MinifestObject } from '@windy/Calendar.d';
import type { Layers } from '@windy/Layer.d';
import type { DataQuality, FileSuffix } from '@windy/Product.d';
import type { HttpPayload } from '@windy/http.d';
import type { LatLon } from '@windy/interfaces';
import type { AcTimes, Isolines, Levels, Overlays, Products } from '@windy/rootScope.d';
import type { ProductCategory, ProductIdent } from '@windy/types';
export type ProductInitParams = Pick<Product, 'modelName' | 'provider' | 'interval'> & Partial<Pick<Product, 'provider' | 'ident' | 'maxTileZoom' | 'animationSpeed' | 'animationSpeed1h' | 'fileSuffix' | 'fileSuffixFallback' | 'JPGtransparency' | 'PNGtransparency' | 'dataQuality' | 'betterDataQuality' | 'animation' | 'labelsTemp' | 'overlays' | 'prefferedProduct' | 'pathGenerator' | 'isolines' | 'directory' | 'category' | 'modelIdent' | 'intervalPremium' | 'server' | 'modelResolution' | 'levels' | 'logo' | 'acTimes'>> & {
    requiresInfoJson?: boolean;
    forecastSize?: number;
    bounds?: [number, number][][];
};
export declare class Product {
    /**
     * Minifest loading promise
     */
    protected loadingPromise?: null | Promise<Calendar | undefined | void>;
    /**
     * Version of minifest used
     */
    protected infoVersion?: string;
    /**
     * minifest loading timer
     */
    private refreshInterval?;
    /**
     *  Timestamp of last minifest check
     */
    private minifestTimestamp;
    /**
     * Boundaries of the product in a format [[north, west], [north, east], [south, east], [south, west]] or any more accurate polygon
     */
    private bounds?;
    /**
     * Has binded listeners
     */
    private hasListeners;
    private bindedCheckNewMinifest;
    /**
     * When the product will expire (in ms)
     */
    private productExpires;
    /**
     * Unefective, but simple refTime solutions for data that are updated once a day
     */
    protected dailyCache?: string;
    /**
     * Must contain ident of self
     */
    ident: Products;
    /**
     * Maximum data tile resolution
     */
    maxTileZoom?: {
        free: number;
        premium: number;
    };
    /**
     * Speed of animation in timestamp seconds per normal second
     *
     * for example 3600 = 1h per 1 second
     */
    animationSpeed: number;
    animationSpeed1h: number;
    /**
     * Default fileSuffix. Can be overwriten by overlay
     */
    fileSuffix: FileSuffix;
    /**
     * Backup fileSuffix if fileSuffix not supported (used if webp not supported)
     */
    fileSuffixFallback?: FileSuffix;
    /**
     * Overlay uses transparency defined in B channel in JPG
     */
    JPGtransparency: boolean;
    /**
     * Overlay uses transparency defined in A channel in PNG
     */
    PNGtransparency: boolean;
    /**
     * Quality of downloaded data for this
     * product. Can be overwritten by overlay
     */
    dataQuality: DataQuality;
    /**
     * Array of layers, where data quaility is one step
     * better than 'dataQuality'. For instance ['rain','clouds']
     */
    betterDataQuality: Layers[];
    /**
     * Play/pause animation of this products is possible
     */
    animation: boolean;
    /**
     * Calendar used for this product
     * (created during initialization)
     */
    calendar?: Calendar;
    /**
     * Description of product for purpose of UI
     */
    modelName: string;
    modelResolution?: number;
    provider?: string;
    /**
     * Update interval (in minutes)
     */
    interval: number;
    intervalPremium?: number;
    /**
     * Usual length of forecast in hours (used upon creation of backup minifest)
     */
    forecastSize: number;
    /** Directory (path in URL) on image server, if not provided, `category/modelIdent` is used */
    directory: string;
    /**
     * Category of the model
     */
    category?: ProductCategory;
    /**
     * Server side model ident, used by DS and other BE services
     * This should replace `ident` at some point, becasue `ident` is used only on client and BE needs to convert it to `modelIdent`
     */
    modelIdent?: ProductIdent;
    /**
     * Model can be used for temeperature in labels
     */
    labelsTemp: boolean;
    /**
     * Logo of provider in rh-bottom
     */
    logo?: string;
    /**
     * List of avail overlays
     */
    overlays: Overlays[];
    /**
     * List of avail levels
     */
    levels?: Levels[];
    /**
     * List of avail isolines
     */
    isolines: Isolines[];
    requiresInfoJson: boolean;
    /**
     * If we drag out of bounds, which product we should use (must be global air product)
     */
    prefferedProduct: 'ecmwf' | 'gfs' | 'icon' | 'iconEu';
    /**
     * Holder of the latest minifest
     */
    minifest?: MinifestObject | null;
    /**
     * How the data image path should be constructed
     */
    pathGenerator: string;
    /**
     * List of available accumulationTime
     */
    acTimes?: AcTimes[];
    /**
     * Alternative server, where the data are loaded from
     */
    server?: string;
    /**
     * Some product (f.ex. StaticProduct) doesn't have meaningful
     * information about the model and time of the next update.
     * Set this to false to hide the info where not relevant (f.ex. Info plugin)
     */
    hasRefTime: boolean;
    constructor(params: ProductInitParams);
    refTime(): string;
    getUpdateTimes(): {
        refTime: string;
        minUpdate: number;
    } | {
        refTime?: undefined;
        minUpdate?: undefined;
    };
    moveTs(moveRight: boolean, isAccu?: boolean): boolean | void;
    getMinifestUrl(): string;
    loadMinifest(): Promise<HttpPayload<MinifestObject>>;
    open(): Promise<void | Calendar | undefined>;
    close(): void;
    /**
     * Checks if lat,lon is within bounds
     */
    pointIsInBounds<T extends LatLon>(this: this, paramsMap: T): boolean;
    printLogo(): void;
    getInfoFileUrl(): string;
    getCalendar(): Promise<Calendar>;
    protected expire(): void;
    protected getStoreKey(): `lastMinifest/${string}`;
    protected setMinifest(minifest: MinifestObject): void;
    protected setExpireTime(): void;
    /**
     * Major reason for this error is user's bad connection, which is handled
     * by standard no connetion red message
     *
     * We delay 0.3 sec to test properlly connection
     */
    protected showErrorMessage(err: string): void;
    protected loadAndProcessMinifest(forced?: boolean): Promise<void>;
    protected loadAndProcessInfo(): Promise<void>;
    private loadInfo;
    private checkNewMinifest;
    private removeLogo;
}
