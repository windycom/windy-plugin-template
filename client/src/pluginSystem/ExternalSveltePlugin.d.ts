import { SveltePlugin, type ExternalSvelteApp } from '@windy/SveltePlugin';
import type { WindowPluginInitParams } from '@windy/WindowPlugin';
import type { SveltePanePlugins, SveltePlugins } from '@windy/plugins.d';
import type { LoadedExternalPluginConfig } from '@windy/interfaces';
/** Allowed params to SveltePlugin constructor (private and protected props are omited by default) */
export type ExternalSveltePluginInitParams<P extends keyof SveltePlugins | keyof SveltePanePlugins> = Omit<WindowPluginInitParams<P>, 'ident'> & Pick<SveltePlugin<P>, 'ident'> & Partial<SveltePlugin<P>>;
export type LoadeExternalSveltePlugin = {
    default: ExternalSvelteApp;
} & AdditionalSvelteAssets & {
    __pluginConfig: LoadedExternalPluginConfig;
};
export declare class ExternalSveltePlugin extends SveltePlugin<'external-plugin'> {
    ident: 'external-plugin';
    plugin: WPluginModules[`@plugins/external-plugin`] & AdditionalSvelteAssets;
    mobileClasses: Record<LoadedExternalPluginConfig['mobileUI'], string>;
    desktopClasses: Record<LoadedExternalPluginConfig['desktopUI'], string>;
    widthOfRhPane: number;
    constructor(params: WindowPluginInitParams<'external-plugin'>, loadedPlugin: LoadeExternalSveltePlugin);
    getCss(): string;
}
