import type { Layer } from '@windy/Layer';
import type { LayerMetricType, Layers } from '@windy/Layer.d';
import type { Metric } from '@windy/Metric';
import type { DirectionFunction } from '@windy/format.d';
import type { Iconfont } from '@windy/iconfont.d';
import type { Overlays } from '@windy/rootScope.d';
import type { RGBNumValues } from '@windy/tileInterpolator.d';
import type { LoadedTranslations } from '@windy/trans.d';
import type { HTMLString } from '@windy/types';
export type UsedOverlays = Overlays | 'gh' | 'swell' | 'satelliteIRBT';
export type OverlayInitParams = Pick<Overlay, 'ident'> & Partial<Overlay>;
type LayerProperty<L extends Layer | undefined, P extends keyof Layer> = L extends Layer ? L[P] : undefined;
type MetricProperty<M extends Metric | undefined, P extends keyof Metric> = M extends Metric ? M[P] : undefined;
export declare class Overlay<I extends Overlays | 'gh' = Overlays | 'gh', M extends I extends Layers ? LayerMetricType[I] : undefined = I extends Layers ? LayerMetricType[I] : undefined, L extends Layer<M> | undefined = I extends Layers ? Layer<M> : undefined> {
    /**
     * Main ident
     */
    ident: I;
    /**
     * Translation string
     */
    trans: keyof LoadedTranslations;
    /**
     * Shortened version of translation string
     *
     * Used only on fav overlays in desktop. It is worth to
     * fill only for overlays with long names, that are used
     * as a default fav overlay in desktop.
     */
    transShort?: keyof LoadedTranslations;
    /**
     * Overlay has more levels
     */
    hasMoreLevels?: boolean;
    /**
     * Icon used in menus and such
     */
    icon: Iconfont;
    /**
     * Layers used
     */
    layers: I extends Layers ? [...Layers[], I] | [I, ...Layers[]] : undefined;
    /**
     * Is the overlay supported in globe mode. Default: false
     */
    globeNotSupported: boolean;
    /**
     * Show interpolated weather value over cities, when user switches to POI cities
     * TODO: Unify property with hideWxLabels
     */
    poiInCities: boolean;
    /**
     * Hide interpolated weather value over cities, when user switches to POI cities
     */
    hideWxLabels?: boolean;
    /**
     * Eg. in day-switcher we need as short name as possible
     */
    shortname?: string;
    /**
     * Eg. in overlays gallery it is needed to have more specific name of the layer
     */
    fullname?: string;
    /**
     * When overlay represents group of other layers, this can be used to get the whole group menu icon independently from the layer
     */
    menuIcon?: Iconfont;
    /**
     * When overlay represents group of other layers, this can be used to name the whole group in menu independently from the layer
     */
    menuTrans?: keyof LoadedTranslations;
    /**
     * Hide overlay from listing in all the menus
     */
    partOf?: Overlays;
    /**
     * Applies class 'hide-particles' to the body
     */
    hideParticles?: boolean;
    /**
     * Given overlay display accumulation
     */
    isAccu?: boolean;
    /**
     * allwaysOn
     */
    allwaysOn?: boolean;
    /**
     * Programatically injected properties from particulat Metric instance
     */
    m: M;
    convertValue: MetricProperty<M, 'convertValue'>;
    convertNumber: MetricProperty<M, 'convertNumber'>;
    setMetric: MetricProperty<M, 'setMetric'>;
    cycleMetric: MetricProperty<M, 'cycleMetric'>;
    listMetrics: MetricProperty<M, 'listMetrics'>;
    /**
     * Programatically injected properties from particulat Layer instance
     */
    c: LayerProperty<L, 'c'>;
    l: LayerProperty<L, 'l'>;
    cm: LayerProperty<L, 'cm'>;
    constructor(params: OverlayInitParams);
    /**
     * Render's overlay's legend inside  el
     */
    paintLegend(el: HTMLDivElement): void;
    /**
     * Return translated description of overlay
     *
     * @param short If true, return shortened version of description if avail
     */
    getName(short?: boolean): string;
    /**
     * Get menu title
     *
     * @param short If true, return shortened version of description if avail
     */
    getMenuName(short?: boolean): string;
    /**
     * Return ident of menu item (usualy `ident` but some inner overlays has `partOf` and are not directly in menu)
     */
    getMenuIdent(): Overlays;
    /**
     * Custom onopen methods, currently unused
     */
    onopen?(): void;
    onclose?(): void;
    /**
     * Create part of inner text of picker
     * @param values Interpolated values
     */
    createPickerHTML(values: RGBNumValues, _directionFormattingFunction: DirectionFunction): HTMLString;
    /**
     * In case of picker interpolator returns null value, this method is called
     * (is consumed by PickerMobile only so far)
     */
    createPickerInvalidHTML(): HTMLString;
    /**
     * Create title for picker content
     * @param alternativeContent Alternative text inside title
     */
    createPickerTitle(alternativeContent?: string): HTMLString;
    /**
     * Just proxy to the Metric's metric property
     */
    get metric(): "" | import("./Metric").MetricItem;
    protected initProperties(): void;
}
export {};
