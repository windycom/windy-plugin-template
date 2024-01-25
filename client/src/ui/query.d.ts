/**
 * @module query
 *
 * Handles operations with query input box
 */
/** HTML input element */
export declare const element: HTMLInputElement;
/** Set content of search input box */
export declare const set: (text: string) => string;
/**
 * Get value of search input box
 *
 * @returns Search input box value
 */
export declare const get: () => string;
/** Show loader in search input */
export declare const showLoader: () => void;
/** Hide loader in search input */
export declare const hideLoader: () => void;
