import { WindowPlugin } from '@windy/WindowPlugin';
import type { WindowPluginInitParams } from '@windy/WindowPlugin';
import type { PluginsOpenParams, PluginsQsParams } from '@windy/plugin-params.d';
import type { SveltePanePlugins, SveltePlugins } from '@windy/plugins.d';
export declare class SvelteApp<P extends keyof SveltePlugins | keyof SveltePanePlugins> {
    constructor(_args: {
        target: HTMLElement;
        anchor: HTMLElement;
    });
    onopen(params?: PluginsOpenParams[P], qs?: PluginsQsParams[P]): void;
    onclose(): void;
    $destroy(): void;
}
/**
 * Same as SvelteApp type, but without any information, about required
 * types for params & qs
 */
export declare class ExternalSvelteApp {
    constructor(_args: {
        target: HTMLElement;
        anchor: HTMLElement;
    });
    onopen(params?: unknown, qs?: unknown): void;
    onclose(): void;
    $destroy(): void;
}
/** Allowed params to SveltePlugin constructor (private and protected props are omited by default) */
export type SveltePluginInitParams<P extends keyof SveltePlugins | keyof SveltePanePlugins> = Omit<WindowPluginInitParams<P>, 'ident'> & Pick<SveltePlugin<P>, 'ident'> & Partial<SveltePlugin<P>>;
export declare class SveltePlugin<P extends keyof SveltePlugins | keyof SveltePanePlugins> extends WindowPlugin<P> {
    /**
     * Holder of SvelteApp
     */
    private svelteApp?;
    ident: P;
    plugin: WPluginModules[`@plugins/${P}`] & AdditionalSvelteAssets;
    onopen(params?: PluginsOpenParams[P], _qs?: PluginsQsParams[P]): void;
    ondestroy(): void;
    protected mount(): void;
    protected unmount(): void;
}
