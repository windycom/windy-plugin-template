import type { RegistrationError } from '@capacitor/push-notifications';
import type { ClientMessage } from '@plugins/offline/offline';
import type { RGBA } from '@windy/Color.d';
import type { HttpError } from '@windy/http';
import type { QueryStringSource } from '@windy/http.d';
import type { LatLon, LinearScale, TilePoint } from '@windy/interfaces.d';
import type { RGBNumValues } from '@windy/tileInterpolator.d';
import type { HTMLString, Timestamp, ExtendedStationType } from '@windy/types.d';
/**
 * One minute in ms.
 *
 * @type {Timestamp}
 */
export declare const tsMinute: Timestamp;
/**
 * One hour in ms.
 *
 * @type {Timestamp}
 */
export declare const tsHour: Timestamp;
/**
 * Long press time in ms. to be used everywhere
 */
export declare const longPressTime: Timestamp;
/**
 * Converts number to char
 *
 * @param  {number} num Number to convert
 * @returns Char
 */
export declare const num2char: (num: number) => string;
/**
 * Convert string to number
 *
 * @param str Input
 * @returns Number
 */
export declare const char2num: (str: string) => number;
/**
 * Takes {lat,lon} and returns nice string out of it (rounds coords to two decimals)
 *
 * @param latLon { lat, lon }
 * @returns Stringified lat lon
 */
export declare const latLon2str: <T extends LatLon>(latLon: T) => string;
/**
 * Converts simple string, like `e0kagi` into latLon object
 *
 * @param str String
 * @returns Object { lat, lon }
 */
export declare const str2latLon: (str: string) => LatLon;
/**
 * Reusable empty function
 */
export declare const emptyFun: () => void;
/**
 * Empty GIF
 *
 * @type {string}
 */
export declare const emptyGIF = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
/**
 * Check if obj is a valid obj contaning lat,lon
 * TODO - it returns true also for string coords, but guarding LatLon with only numbered coords!
 *
 * @param item Object to check
 * @returns True if it is a valid object, false otherwise
 */
export declare const isValidLatLonObj: <T>(item: LatLon | T | null | undefined) => item is T & LatLon;
/**
 * Normalizes lat,lon to 3decimal points (as we use in in URL and XHR)
 *
 * @param str String with coordinate
 * @returns Normalized coordinate
 */
export declare const normalizeLatLon: (str: string | number) => string;
/**
 * Just iterates dictionary
 *
 * @param items Object to iterate
 * @param cb Callback called every single iteration
 */
export declare const each: <K extends string | number | symbol, V>(items: { [P in K]?: V | undefined; }, cb: (item: V, key: K) => unknown) => void;
/**
 * Makes a deep clone of an Object. Optional @propertis
 * can contain  list of @properties {Array} that will be copied.
 * Returns new object.
 * Usage: params = clone(rootScope,[ 'overlay','level','maps' ])
 *
 * @param source Source to clone
 * @param properties Properties to clone
 * @returns Deep copy of the source
 */
export declare const clone: <T>(source: T, properties?: (keyof T)[] | undefined) => T;
/**
 * Degrees2radians
 *
 * @param deg Degrees
 * @returns radians
 */
export declare const deg2rad: (deg: number) => number;
export declare const degToRad = 0.017453292;
export declare const radToDeg = 57.2957795;
/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 *
 * @param func Function to debounce
 * @param wait Time limit of debouncing
 * @param immediate Should be function trigger on the leading edge or on the trailing
 * @returns Debounced function
 */
export declare const debounce: <Args extends unknown[], F extends (...args: Args) => void>(func: (this: ThisParameterType<F>, ...args: Args & Parameters<F>) => void, wait: number, immediate?: boolean) => (this: ThisParameterType<F>, ...args: Args & Parameters<F>) => void;
/**
 * Retun throttling function
 *
 * @param this NOT USED, it is only TS explicit this annotation build-time parameter. Consider it as the first parameter would not exist.
 * @param fn Function to throttle
 * @param time Throttle time in ms.
 * @returns Throttled function
 */
export declare const throttle: <Args extends unknown[], F extends (...argmtns: Args) => void>(this: ThisParameterType<F>, fn: (this: ThisParameterType<F>, ...argmtns: Args & Parameters<F>) => void, time: number) => (this: ThisParameterType<F>, ...argmtns: Args & Parameters<F>) => void;
/**
 * Pad leading zeroes to the number
 *
 * @param  {number} num Number to pad
 * @param  {number} size Digits (default 2)
 * @returns Padded number
 */
export declare const pad: (num: number, size?: number) => string;
/**
 * Replaces {keys} in a string by properties in @data structure
 * Usage: "confirm {num}".template({num: 5})
 *
 * @param str String with placeholders
 * @param data Values for placeholders
 * @returns String with replaced placeholders
 */
export declare const template: (str: string, data?: Record<string, unknown>) => string;
export interface DirObject {
    /** Direction of wind. Backend for POI detail can return VAR here, but it should never pass into this type */
    dir: number;
}
export interface WindObject extends DirObject {
    wind: number;
    gust?: number | null;
}
/**
 * Return magnitude and angle from U,V vectors for wind
 *
 * @param v Vector [u,v]
 * @returns Object { wind, dir }
 */
export declare const wind2obj: (v: [number, number] | RGBNumValues) => WindObject;
export interface WaveObject extends DirObject {
    period: number;
    size: number;
}
/**
 * Return magnitude, period and angle from U,V vectors for waves
 *
 * @param v Vector [u,v,size]
 * @returns Object { wind, dir, period }
 */
export declare const wave2obj: (v: RGBNumValues) => WaveObject;
/**
 * Trush if wx object has valid direction
 *
 * @param wx Wind object
 * @returns True if object has a valid direction, false otherwise
 */
export declare const hasDirection: <T extends Partial<WindObject>>(wx: T) => wx is {
    dir: number;
    wind: number;
} & T;
/**
 * Ruturn piece of html with rotated wind arrow
 *
 * @param wx Wind object
 * @returns HTML with oriented wind arrow
 */
export declare const windDir2html: (wx: WindObject) => HTMLString;
/**
 * Cheap function to determine that two points are near
 *
 * @param a { lat, lon }
 * @param b { lat, lon }
 * @returns True if points are near to each other, false otherwise
 */
export declare const isNear: <T extends LatLon, F extends LatLon>(a: T, b: F) => boolean;
/**
 * Bounds a number to a limits
 *
 * @param num Number to bound
 * @param min Minimum
 * @param max Maximum
 * @returns Bounded number
 */
export declare const bound: (num: number, min: number, max: number) => number;
/**
 * Smoothstep https://en.wikipedia.org/wiki/Smoothstep
 *
 * @param min Minimum
 * @param max Maximum
 * @param value Value
 * @returns Smoothed value
 */
export declare const smoothstep: (min: number, max: number, value: number) => number;
/**
 * longitude <-180.0; 180.0> to mercator <0.0, 1.0>
 *
 * @param lon Lon value
 * @returns Mercator value of lon
 */
export declare const lonDegToXUnit: (lon: number) => number;
/**
 * Latitude <-85.05; 85.05> to mercator <1.0; 0.0>
 *
 * @param lat01 Lat value
 * @returns Mercator value of lat
 */
export declare const lat01ToYUnit: (lat01: number) => number;
/**
 * Lattitude <85.05; -85.05> to mercator <0.0; 1.0>
 *
 * @param lat Lat value
 * @returns Mercator value of lat
 */
export declare const latDegToYUnit: (lat: number) => number;
/**
 * Mercator lon to deg
 *
 * @param ux Mercator lon value
 * @returns Deg value
 */
export declare const unitXToLonDeg: (ux: number) => number;
/**
 * Mercator lat to deg
 *
 * @param uy Mercator lat value
 * @returns Deg value
 */
export declare const unitYToLatDeg: (uy: number) => number;
/**
 * Mercator lon to rad <0;1> => <-PI;PI>
 *
 * @param ux Mercator lon value
 * @returns Rad value
 */
export declare const unitXToLonRad: (ux: number) => number;
/**
 * Mercator lat to rad <0;1> => <-PI;PI>
 *
 * @param uy Mercator lat value
 * @returns Rad value
 */
export declare const unitYToLatRad: (uy: number) => number;
/**
 * Returns adjusted Date.now()
 *
 * @param syncTime Synchronization value (ts from server)
 * @returns Current time
 */
export declare const getAdjustedNow: (syncTime?: number) => number;
/**
 * Is valid lang ISO string (the one we have translated?)
 *
 * @param lang Language code
 * @returns True if language is supported, false otherwise
 */
export declare const isValidLang: (lang: string) => lang is "en" | "zh-TW" | "zh" | "ja" | "fr" | "ko" | "it" | "ru" | "nl" | "cs" | "tr" | "pl" | "sv" | "fi" | "ro" | "el" | "hu" | "hr" | "ca" | "da" | "ar" | "fa" | "hi" | "ta" | "sk" | "uk" | "bg" | "he" | "is" | "lt" | "et" | "vi" | "sl" | "sr" | "id" | "th" | "sq" | "pt" | "nb" | "es" | "de" | "bn";
/**
 * Safely joins server name (without trailing / ) and path
 *
 * @param url1 URL to join
 * @param url2 URL to join
 * @returns Joined URL
 */
export declare const joinPath: (url1: string, url2: string) => string;
/**
 * Safelly adds query string to url
 *
 * @param url URL to which the query should be attached
 * @param query Query to attach
 * @returns Complete URL
 */
export declare const addQs: (url: string, query: string) => string;
/**
 * Creates query string out of an key value pairs
 *
 * @param tokensObj Object from which the query should be created
 * @returns key1=value1&key2=value2&...
 */
export declare const qs: (tokensObj: QueryStringSource) => string;
/**
 * Loads .js file by appendig it as script element appended to the <head> section of the page
 *
 * @param  {string} url URL of script to be loaded
 * @param callback Callback to be called on HTML script element
 * @returns
 */
export declare const loadScript: (url: string, callback?: ((s: HTMLScriptElement) => void) | undefined) => Promise<void>;
/**
 * Copy object to clipboard
 *
 * @param str String to copy into clipboard
 */
export declare const copy2clipboard: (str: string) => void;
/**
 * Force download file
 *
 * @param data Data to be downloaded or blob
 * @param type Content type
 * @param name Filename
 */
export declare const download: (data: BlobPart, type: string, name: string) => void;
/**
 * Capacitor only
 * Standard & safe way how to detect & return capacitor plugin
 *
 * @param ident ID of plugin to load
 * @returns Instance of the Capacitor plugin
 */
export declare const getNativePlugin: <T = unknown>(ident: string) => T | null;
/**
 * JQuery like selector
 *
 * @param sel selector
 * @param ctx Optional context where to find an selector
 * @returns Element by selector, null if not found
 */
export declare const $: <T extends HTMLElement = HTMLElement>(sel: string, ctx?: HTMLElement) => T | null;
/**
 * Basic function check
 */
export declare const isFunction: (p: unknown) => p is (...pr: unknown[]) => unknown;
/**
 * Is event touch event
 */
export declare const isTouchEvent: (ev: TouchEvent | MouseEvent) => ev is TouchEvent;
/**
 * Spline curve
 */
export declare const spline: (p0: number, p1: number, p2: number, p3: number, t: number) => number;
/**
 * Cubic hermite
 * ABCD ..control points, t ..coord <0,1>
 */
export declare const cubicHermite: (A: number, B: number, C: number, D: number, t: number) => number;
/**
 * m ..array of 16 samples; s, t ..relative coords <0,1>
 */
export declare const bicubicFiltering: (m: number[] | Float32Array, s: number, t: number) => number;
/**
 * clamp integer n value to interval <0, x)
 */
export declare const clamp0X: (n: number, x: number) => number;
/**
 * fast lerp
 */
export declare const lerp: (a: number, b: number, f: number) => number;
/**
 * fast lerp 256
 */
export declare const lerpColor256: (a: RGBA, b: RGBA, f: number) => RGBA;
/**
 * Finds all [data-ref] references in DOM and returns standard
 * refs object
 */
export declare const getRefs: <N extends HTMLElement, R extends Record<string, HTMLElement | SVGElement>>(selectorOrNode: string | N) => {
    node: N;
    refs: R;
};
/**
 * Sanitizes HTML code, escape all XSS dangerous characters
 */
export declare const sanitizeHTML: (s: string) => string;
/**
 * Custom error logging function.
 *
 * In order to avoid circ deps we use custom Event to notify about errors
 * errorLogger module.
 *
 * @param moduleName Module name where error occured
 * @param msg Message to report, the main body of the error
 * @param errObj Whole error object to stringification. It is sent to Kibana under 'error' property
 */
export declare function logError(moduleName: string, msg: string, errorObject?: Error | HttpError | Event | ErrorEvent | RegistrationError): void;
export declare const sendMessageToServiceWorker: (message: ClientMessage) => void | undefined;
/**
 * Same as scale linear from d3 library except with different params
 * https://d3js.org/d3-scale/linear
 * @param Object { domain: [  ], range: [] }
 * @returns Object { get, ivert }
 */
export declare const scaleLinear: ({ domain, range, clip, }: {
    domain: [number, number];
    range: [number, number];
    clip?: boolean | undefined;
}) => LinearScale;
/**
 * Unified canvasRatio used in overall Windy. Not bigger then 2
 */
export declare const canvasRatio: number;
/**
 *  Returns items shared between all provided arrays
 */
export declare const intersect: <T>(arrays: T[][]) => T[];
/**
 * Is the weather station professional?
 */
export declare const isProfessionalStation: (type: ExtendedStationType) => boolean;
/**
 * wraps x-coord to appropriate range
 */
export declare const wrapCoords: (tilePoint: TilePoint) => TilePoint;
/**
 * based on target and provided locatio returns URL where to load .js asset
 * @param location
 */
export declare const getLoacationOfJsAssets: (location: string) => string;
