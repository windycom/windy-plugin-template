/**
 * @module singleclick
 * Handles singleclick events on map and determines, which coonsumer should get it.
 * If none is found, it emits 'click' event, which is usuallly catched by @module picker
 * and it opens picker on clicked location
 */
import { Evented } from '@windy/Evented';
import type { PluginIdent } from '@windy/Plugin';
import type { SingleclickTypes, ListeningPriority } from '@windy/singleclick.d';
/**
 * Main singleclick event emitter instance of Evented
 */
export declare const singleclick: Evented<SingleclickTypes>;
/**
 * Register the plugin (identified by its ident) to be on the list to
 * receive singleclick events.
 *
 * There can be only one plugin with high priority (usually plugin),
 * and one with low priority (ususally some map layer).
 */
export declare const register: (ident: PluginIdent, priority: ListeningPriority) => keyof import("../pluginSystem/plugins").Plugins;
/**
 * Release the plugin from the list of singleclick events
 */
export declare const release: (ident: PluginIdent, priority: ListeningPriority) => void;
/**
 * Handles all singleclick events
 * @param Leflet singleclick event
 */
export declare const opener: (ev: L.LeafletMouseEvent) => void;
