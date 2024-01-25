import type { ColorGradient, ColorIdent, PluginColorIdent, RGBA, RGBString } from '@windy/Color.d';
import type { StoreOptions } from '@windy/store.d';
import type { NumValue } from '@windy/types.d';
export type ColorInitParams = Pick<Color, 'ident'> & Partial<Pick<Color, 'qualitative' | 'save'>> & {
    steps: number;
    default?: ColorGradient | null;
    opaque?: boolean;
    defaultKey?: string;
    sync?: boolean;
    prepare?: boolean;
};
export declare class Color {
    /**
     * Should be color table prepared in advance without calling getColor()
     * DO NOT MISUSE THIS PROPERTY. Use only for few colors that are used
     * for initial rendering and overall app
     */
    private prepare?;
    /**
     * Sync color to the cloud.  By default is set true
     */
    private sync?;
    /**
     * set all alpha values to 255.  By default is set true
     */
    private opaque?;
    private maxIndex;
    private step;
    /**
     * Index of neutral gray color
     */
    private neutralGrayIndex;
    /**
     * Initial gradient
     */
    private default?;
    /**
     * Ident of color
     */
    ident: ColorIdent | PluginColorIdent | 'pressureIsolines' | 'temporary' | 'direction';
    /**
     * Store key
     */
    key: `color2_${string}`;
    /**
     * For color loaded from info,json
     */
    defaultKey?: string;
    /**
     * globe: use discrete palette (not blending between colors)
     */
    qualitative?: boolean;
    /**
     * Numebr of steps for colors table
     */
    steps: number;
    /**
     * Actually used gradient (can be sifferent than default)
     */
    gradient: ColorGradient;
    /**
     * Big interpolated RGBA Type array color table
     * If defined mean someone already used the color
     */
    colors?: Uint8Array | null;
    /**
     * Save color to lcal storage. By default is set true
     */
    save?: boolean;
    /**
     * Min value
     */
    min: NumValue;
    /**
     * Max value
     */
    max: NumValue;
    constructor(params: ColorInitParams);
    /**
     * Inserts the color to the store & prepares it
     *
     * @param defaultColors Default color
     */
    defineColor(defaultColors: ColorGradient): void;
    /**
     * Saves new color gradient to data store
     */
    changeColor(gradient: ColorGradient, storeOpts?: StoreOptions): void;
    /**
     * Back to default settings
     */
    toDefault(): void;
    /**
     * Same as getColor, but forces to generate new col tables
     */
    forceGetColor(): this | null;
    /**
     * Returns a color based 'rgb()' string on provided value
     */
    color(value: NumValue): RGBString;
    /**
     * Returns darkened or lightened cersion of original color. Uses the
     * most primitive method of darkening/lightening by substracting or
     * adding vale to RGB components
     *
     * @param value Original numerical value
     * @param amount Amount of darkening or lightening in a range -255 to 255
     */
    colorDark(value: NumValue, amount: number): RGBString;
    /**
     * Returns RGB array based on value
     */
    RGBA(value: NumValue): RGBA;
    /**
     * create gradient array usable for both WebGL texture and getColor() function
     * bOpaque .. set alpha to 255
     * bPremultiply .. mul RGB by A
     * valueScale .. optional scale used for WebGL texture data (coef 0.5 means half step - gradient size is doubled)
     * return .. output Uint8Array with color data
     */
    createGradientArray(bOpaque?: boolean, bPremultiply?: boolean, valueScale?: number): Uint8Array;
    createSteppedArray(sourceSmoothArray: Uint8Array, step: number, firstStep?: number): Uint8Array;
    /**
     * Returns color instance and creates color table (if not yet created)
     */
    getColor(): this | null;
    /**
     * Returns index to the color table based on value
     */
    value2index(value: NumValue): number;
    getColorTable(): ColorGradient | null | undefined;
    /**
     * Checks validity of a gradient that it adheres to type ColorGradient
     */
    private checkValidity;
    /**
     * Forces to generate new color table
     */
    private colorChanged;
    /**
     * Sets max, min values
     */
    private setMinMax;
    /**
     * return array multiplied by mul coef
     */
    private getMulArray;
    /**
     * linear interpolation between array components, factor = <0.0,1.0>;
     */
    private lerpArray;
    /**
     * color = [ r01, g01, b01, ? ]; components in interval <0.0; 1.0>
     */
    private rgba2yuva;
    /**
     * color = [ y, u, v, ? ]; y = <0.0; 1.0>, u, v = <-0.5; 0.5>
     */
    private yuva2rgba;
    /**
     * preserveSaturation .. (maintain |UV| size)
     */
    private gradYuva;
    private vec2size;
    /**
     * interpolation between 2 colors in selected space (type)
     * type .. color space / interpolation type: 'RGB' - linear in RGB space (default)
     * col1, col2 .. [r, g, b, a]; factor = <0.0,1.0>;
     */
    private getGradientColorYUVA;
    /**
     * rgbaArray .. [r, g, b, a]; componnents in interval <0;255>
     */
    private makePremultiplied;
}
