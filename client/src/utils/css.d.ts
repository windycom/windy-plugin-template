/** Adjust CSS var, optionaly a condition if current value is in selected range */
export declare const adjustCssValue: (ident: string, adjustPx: number, minValue?: number, maxValue?: number) => void;
/**
 * Toglles CSS on element if trigger is truish
 *
 * @param el DOM element
 * @param condition if truish adds class otherwire romeves it
 * @param cssClass CSS class
 */
export declare const toggleClass: <T extends HTMLElement>(el: T, condition: boolean, cssClass: string) => void;
/**
 * Finds a particular class in classlist of document body or any DOM el
 * and replaces it. For example replaces class zoom-6 with zoom-5 in body
 * if new newClass is zoom-5
 * Usage: _.replaceClass(/pois-\S+/,'pois-' + requiredPoi)
 *
 * @param regExp RegExp
 * @param newClass New class
 * @param el HTML element
 */
export declare const replaceClass: (regExp: RegExp, newClass: string, el?: HTMLElement) => void;
/**
 * The attach point for default plugins.
 */
export declare const defaultPluginsAttachPoint = "[data-plugin=\"plugins\"]";
