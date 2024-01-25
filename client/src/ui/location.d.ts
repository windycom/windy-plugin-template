import type { PluginIdent } from '@windy/Plugin';
export declare const description: (desc: string) => void;
/**
 * gets url of self
 */
export declare const getURL: () => string;
/**
 * Resets title to initial value -- or name of used overlay
 */
export declare function resetTitle(): void;
/**
 * Set URL of page. PluginId makes sure, that only plugin that changed URL can
 * reset it later on.
 *
 * @param pluginId Plugin ident (or null if called not from plugin)
 * @param newURL New URL (with leading "/"")
 * @param newVisibleURL Optional visible URL for SEO purposes
 * @param newSearch Optional associated search string
 */
export declare const setUrl: (pluginId: PluginIdent | null, newURL: string, newVisibleURL?: string) => void;
/**
 * set title of a page
 */
export declare const setTitle: (newTitle: string) => void;
/**
 * Sets seaerch string (ndebounced)
 *
 * TODO: Only subscription plugin uses this method
 * There is potentional BUG that debounced change in some parameters
 * will overwrite this change
 */
export declare const setSearch: (newSearch?: string) => void;
/**
 * reset title & URL to def values. PluginId makes sure, that
 * only plugin that changed URL can reset it
 *
 * @param pluginId Plugin ident (or null if called not from plugin)
 */
export declare const reset: (pluginId: PluginIdent | null) => void;
