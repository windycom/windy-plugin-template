export type EventedInitParams = {
    ident: string;
};
/**
 * Basic class for evented object.
 *
 * @module Evented
 * @example
 *
 * // Holla myObject is now evented object
 * const myObject = W.Evented.instance({
 *     ident: identifier
 *     // additional methods and stuff
 * });
 *
 * myObject.emit('downloadFinished',a,b,c);
 *
 * const handle = myObject.on('downloadFinished',function(a,b,c) {
 *     // do the stuff
 * });
 *
 * myObject.off(handle);
 */
export declare class Evented<T> {
    /**
     * Unique ID of each event subscription (incremental)
     */
    private latestId;
    /**
     * Store of all active subscriptions. It holds all needed data for trigger listeners for any event.
     */
    private _eventedCache;
    /**
     * Only for DEBUG purposes. Color for console.log printing
     */
    private terminalColor?;
    /**
     * Identificator of event instance
     */
    private ident;
    /**
     * Same as `emit` method, just for leaflet compatibility.
     */
    trigger?: (typeof this)['emit'];
    /**
     * Same as `emit` method, just for leaflet compatibility.
     */
    fire?: (typeof this)['emit'];
    constructor(params: EventedInitParams);
    /**
     * Emits a message accompanied from one to four arguments.
     *
     * @param topic Topic to emit
     * @param data Optional data
     */
    emit<K extends keyof T, Q extends T[K]>(topic: keyof T, ...data: TrimUndefinedFromRight<Arrayify<Q>>): void;
    /**
     * Hooks a callback, that will be triggerd on specified message.
     *
     * @param topic Topic to subscribe
     * @param callback Callback called when topic is emitted
     * @param context Optional context to change this binding
     * @param once Optional if callback should be fired only once or at every time
     * @returns Unsubscribe id
     */
    on<K extends keyof T, Q extends T[K]>(topic: K, callback: (...data: TrimUndefinedFromRight<Arrayify<Q>>) => void, context?: ThisType<unknown>, once?: boolean): number;
    /**
     * Hooks a callback, that will be triggerd just once on specified message.
     *
     * @param topic Topic to subscribe
     * @param callback Callback called when topic is emitted
     * @param context Optional context to change this binding
     * @returns Unsubscribe id
     */
    once<K extends keyof T, Q extends T[K]>(topic: K, callback: (...data: TrimUndefinedFromRight<Arrayify<Q>>) => void, context?: ThisType<unknown>): number;
    off(id: number): void;
    off<K extends keyof T, Q extends T[K]>(topic: K, callback: (...data: TrimUndefinedFromRight<Arrayify<Q>>) => void, context?: ThisType<unknown>): void;
}
