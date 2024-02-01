import { SveltePlugin, type ExternalSvelteApp } from '@windy/SveltePlugin';
import type { WindowPluginInitParams } from '@windy/WindowPlugin';
import type { SveltePanePlugins, SveltePlugins } from '@windy/plugins.d';
import type { CompiledExternalPluginConfig, ExternalPluginConfig, InstalledExternalPluginConfig } from '@windy/interfaces';
import type { PluginPane } from './Plugin';
/** Allowed params to SveltePlugin constructor (private and protected props are omitted by default) */
export type ExternalSveltePluginInitParams<P extends keyof SveltePlugins | keyof SveltePanePlugins> = Omit<WindowPluginInitParams<P>, 'ident'> & Pick<SveltePlugin<P>, 'ident'> & Partial<SveltePlugin<P>>;
export type LoadeExternalSveltePlugin = {
    default: ExternalSvelteApp;
} & AdditionalSvelteAssets & {
    __pluginConfig: CompiledExternalPluginConfig;
};
type Config2config = {
    className: string;
    attachPoint?: string;
    pane?: PluginPane;
};
export declare class ExternalSveltePlugin extends SveltePlugin<'windy-external-plugin'> {
    ident: 'windy-external-plugin';
    plugin: WPluginModules[`@plugins/windy-external-plugin`] & AdditionalSvelteAssets;
    mobileConfig: Record<InstalledExternalPluginConfig['mobileUI'], Config2config>;
    desktopConfig: Record<InstalledExternalPluginConfig['desktopUI'], Config2config>;
    widthOfRhPane: number;
    listenToSingleclick: ExternalPluginConfig['listenToSingleclick'];
    addToContextmenu: ExternalPluginConfig['addToContextmenu'];
    constructor(params: WindowPluginInitParams<'windy-external-plugin'>, { desktopUI, title, mobileUI, desktopWidth, routerPath, listenToSingleclick, addToContextmenu, url, }: InstalledExternalPluginConfig);
    getCss(): string;
}
export {};
