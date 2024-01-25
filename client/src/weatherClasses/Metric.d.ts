import type { MetricIdent, MetricItem, MetricKey, ConvObj, LegendLines, LegendDescription, Legend, MetricInitParams } from '@windy/Metric.d';
import type { Color } from '@windy/Color';
import type { RGBString } from '@windy/Color.d';
import type { LoadedTranslations } from '@windy/trans.d';
import type { HTMLString, NumValue } from '@windy/types.d';
export declare const rtrnSelf: (x: NumValue) => NumValue;
export declare abstract class Metric<T extends string | number = string | number> {
    /**
     * Identifies metric
     */
    ident: MetricIdent;
    /**
     * Store key
     */
    key: MetricKey;
    /**
     * Actually selected metric
     */
    metric: MetricItem;
    /**
     * Conversion functions
     */
    conv: ConvObj;
    /**
     * number ' ' metric separator
     */
    separator: '' | ' ';
    /**
     * Default metric for start-up
     * [ metric, imperial, ??? ]
     */
    defaults: MetricItem[];
    /**
     * Sync the metric to native iOS/Android apps
     */
    nativeSync: boolean;
    /**
     * Legend description
     */
    description: LegendDescription;
    /**
     * Array defining how the legend will look like
     */
    lines: LegendLines;
    /**
     * Keeps cohesion in between multiple metric instances. For example setting `in`
     * in rain will set `in` in snow also
     */
    cohesion?: {
        [ident in MetricIdent]?: {
            [unit in MetricItem]?: MetricItem;
        };
    };
    /**
     * Some metrics have discrete legend.
     * If so, these labels define it, where NumValue is numerical value, to grab color from color table
     */
    discreteLegend?: {
        /**
         * Should all items in legend have same width?
         */
        hasEqualItemsWidth?: boolean;
        /**
         * Array of trans strings and clored string.
         *
         * For simplicity of sloution, the legned colors are hardcoded
         * thus they do not react on 'users' defined color. This will
         * be know bug and we will not handle this case.
         */
        labels: [keyof LoadedTranslations, RGBString][];
    };
    /**
     * Colors used to render discrete legend
     * @param params
     */
    constructor(params: MetricInitParams);
    onMetricChanged(metric: MetricItem): void;
    getDefault(): MetricItem;
    setDefault(): void;
    /**
     * get value + label on a basis of user selected metric
     */
    convertValue(value: NumValue, separator?: string, suffix?: string): string;
    /**
     * Not available
     */
    na(): string | '-';
    /**
     * produces converted number value without label
     */
    abstract convertNumber(value: NumValue, forcedPrecision?: number, metric?: MetricItem): T;
    /**
     * List all avail metrics
     */
    listMetrics(): MetricItem[];
    /**
     * How many metrics we have
     */
    howManyMetrics(): number;
    /**
     * Stores required metric into storage
     */
    setMetric(metric: MetricItem): void;
    /**
     * Cycles throu different metrics (for example after clicking on a legend)
     */
    cycleMetric(): void;
    /** color object is required for classic gradient metrics, discrete ones do not need it as colors are hardcoded for them */
    renderLegend(col: Color | undefined, el: HTMLDivElement, legend: Legend): void;
    /**
     * Renders colorfull legent onto the el
     */
    renderGradientLegend(col: Color | undefined, el: HTMLDivElement, legend: Legend): {
        background: string;
        content: HTMLString;
    } | null;
    renderDiscreteLegend(): {
        background: '';
        content: HTMLString;
    };
    protected initProperties(): void;
    private _createKey;
}
