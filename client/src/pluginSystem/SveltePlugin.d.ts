import { WindowPlugin } from '@windy/WindowPlugin';
import type { WindowPluginInitParams } from '@windy/WindowPlugin';
import type { PluginsOpenParams } from '@windy/plugin-params.d';
import type { SveltePanePlugins, SveltePlugins } from '@windy/plugins.d';
export declare class SvelteApp<P extends keyof SveltePlugins | keyof SveltePanePlugins> {
    constructor(_args: {
        target: HTMLElement;
        anchor: HTMLElement;
    });
    onopen(params?: PluginsOpenParams[P]): void;
    onclose(): void;
    $destroy(): void;
}
export declare class ExternalSvelteApp {
    constructor(_args: {
        target: HTMLElement;
        anchor: HTMLElement;
    });
    onopen(params?: unknown): void;
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
    onopen(): void | boolean;
    ondestroy(): void;
    protected mount(): void;
    protected unmount(): void;
}
