import { WindowPlugin } from '@windy/WindowPlugin';
import type { TagPlugins } from '@windy/plugins.d';
export declare class TagPlugin<P extends keyof TagPlugins> extends WindowPlugin<P> {
    ident: P;
    plugin: WPluginModules[`@plugins/${P}`] & AdditionalPluginAssets;
}
