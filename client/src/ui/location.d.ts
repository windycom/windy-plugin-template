import type { ExternalPluginIdent } from '@windy/types.d';
import type { PluginIdent } from '@windy/Plugin';
import type { WindowPlugins } from '@windy/WindowPlugin';
import type { PluginsOpenParams } from '@windy/plugin-params';
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
 * TODO: After refactor of WindyPlugin class, this method can recieve
 * plugin opening source and not update history, when `back-button` was used
 */
export declare const setUrl: <P extends keyof WindowPlugins>(pluginId: `windy-plugin-${string}` | P, pluginParams?: PluginsOpenParams[P] | undefined, seoPrefix?: string) => void;
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
export declare const reset: (pluginId?: PluginIdent | ExternalPluginIdent) => void;
