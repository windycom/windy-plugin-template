import type { Broadcast } from './broadcast.d';
declare const bcast: Broadcast;
/**
 * @module broadcast Major Windyty broadcasting vehicle, which is in fact just instance of `W.Evented` object.
 * Contains `emit`, `on`, `off` and `once` methods.
 * Overall broadcast(ing) systems used on Windy (and initialized at startup so other modules can hook them as soon as possible).
 * @example
 * ```
 * W.brodcast.on('redrawFinished',function(params) {
 *     // Whoa Windyty map was redrawn with @params
 * });
 *
 * // Now let's open settings package
 * W.broadcast.emit('rqstOpen','settings');
 *```
 */
export default bcast;
