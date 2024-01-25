/**
 * @module format Various formatting utils based on user language and settings
 */
import type { DirectionFunction, HowOldOptions, TimeFormatFunction } from '@windy/format.d';
import type { Timestamp } from '@windy/types';
/**
 * Returns function for displaying hours (either 12,24h format) on a basis of locale store of a browser
 * US, UK, PH, CA, AU, NZ, IN, EG, SA, CO, PK, MY - AM,PM format
 *
 * @returns Time format function
 */
export declare const getHoursFunction: () => TimeFormatFunction;
/**
 * Returns UTC formated hours, e.g. '09:00Z' or '18:00Z'
 *
 * @param ts Timestamp
 * @returns Formated UTC hours in a format '09:00Z' or '18:00Z'
 */
export declare const hourUTC: (ts: number) => string;
/**
 * Returns UTC formated hours and minutes, e.g. '09:22Z' or '18:57Z'
 *
 * @param ts Timestamp
 * @returns Formated UTC hours and minutes in a format '09:22Z' or '18:57Z'
 */
export declare const hourMinuteUTC: (ts: number) => string;
/**
 * => Format numbers with thousands delimiters, e.g. '10 000'
 *
 * @param amount Number to format
 * @returns Formated number with thousands delimiter, e.g. '10 000'. Empty string if nothing is passed.
 */
export declare const thousands: (amount?: string | number | null) => string;
/**
 * Returns direction formatting function based on user's settings. E.g. 'N', 'NE', ... or '123°'
 *
 * @returns Format function to convert number into 'N', 'NE', ... strings or '123°' strings
 */
export declare const getDirFunction: () => DirectionFunction;
/**
 * Returns CSS class name based on how obsolete data are
 *
 * @param updatedSecAgo Last update in seconds ago
 * @param limitInMins Limit in minutes to consider update obsolete (default: 30)
 * @returns fresh, normal (30% - 100% of limit) or obsolete for > limit
 */
export declare const obsoleteClass: (updatedSecAgo: number, limitInMins?: number) => 'fresh' | 'normal' | 'obsolete';
/**
 * Returns string declaring when some event happened in the past, e.g. '5 days', '5 days ago', '4 hours 15 minutes' etc...
 *
 * @param options Options for output
 * @returns '5 days', '5 days ago', '4 hours 15 minutes' etc... Empty string if any error occurs
 */
export declare const howOld: (options: HowOldOptions) => string;
export declare const countdown: (ts: Timestamp, options?: {
    showSeconds?: boolean;
}) => string;
/**
 * Converts lat,lon numbers to human friendly Degrees, Minutes and Seconds format, e.g. N49°9'21", E14°7'30"
 *
 * @param lat Latitude
 * @param lon Longitude
 * @returns DMS format of lat,lon, e.g. N49°9'21", E14°7'30"
 */
export declare const DD2DMS: (lat: number, lon: number) => string;
/**
 * Get standard UTC offset string from number, e.g. -02:00, +08:00 etc.
 *
 * @param offsetInHours Offset of hours (could be negative as well)
 * @returns UTC offset string, e.g. "-02:00", "+08:00" etc.
 */
export declare const utcOffsetStr: (offsetInHours: number) => string;
/**
 * Format URL for purpose of SEO (slashes / are preserved)
 *
 * @param str String to format
 * @returns Cleaned-up string from whitespaces and special chars (slashes / are preserved)
 */
export declare const seoUrlString: (str: string) => string;
/**
 * Format string for purpose of SEO
 *
 * @param str String to format
 * @returns Cleaned-up string from whitespaces and special chars
 */
export declare const seoString: (str: string) => string;
/**
 * Get lang prefix for URL SEO purposes. English is default without any prefix
 *
 * @param lang Language
 * @returns URL prefix with lang, e.g. `cs/` or `es/`. Empty string is returned for default lang (English)
 */
export declare const seoLang: (lang: string) => string;
/**
 * Animates increasing numbers into HTML element
 *
 * @param viewcount Number to show at animation end
 * @param el HTML element where animate counting and show the final number
 */
export declare const animateViews: (viewcount: number, el: HTMLElement) => void;
