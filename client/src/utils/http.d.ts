/**
 * HTTP fetch lib using Promises, authorization and lru caching
 */
import type { HttpOptions, HttpPayload } from '@windy/http.d';
export declare const getURL: (url: string) => string;
export declare class HttpError extends Error {
    status: number;
    message: string;
    responseText?: string | undefined;
    constructor(status: number, message: string, responseText?: string | undefined);
}
/**
 * Create Event Source for SSE with tokens for authentication
 * Do not forget to close the EventSource, otherwise there will be an error event when the page closes.
 *
 * @param url Url
 * @param options Options
 * @returns Event source or null when anything failed
 */
export declare const createEventSource: (url: string, options?: EventSourceInit) => EventSource | null;
type StandardHttpRequestFun = <T>(url: string, options?: HttpOptions) => Promise<HttpPayload<T>>;
/**
 * Make GET http request
 *
 * @param url Url
 * @param options Options
 * @returns HTTP payload or null when anything failed
 */
export declare const get: StandardHttpRequestFun;
/**
 * Make DELETE http request
 *
 * @param url Url
 * @param options Options
 * @returns HTTP payload or null when anything failed
 */
export declare const del: StandardHttpRequestFun;
/**
 * Make POST http request
 *
 * @param url Url
 * @param options Options
 * @returns HTTP payload or null when anything failed
 */
export declare const post: StandardHttpRequestFun;
/**
 * Make PUT http request
 *
 * @param url Url
 * @param options Options
 * @returns HTTP payload or null when anything failed
 */
export declare const put: StandardHttpRequestFun;
/**
 * Make HEAD http request
 *
 * @param url Url
 * @param options Options
 * @returns HTTP payload or null when anything failed
 */
export declare const head: StandardHttpRequestFun;
export {};
