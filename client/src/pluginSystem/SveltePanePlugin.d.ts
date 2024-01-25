import { SveltePlugin } from '@windy/SveltePlugin';
import type { WindowPluginInitParams } from '@windy/WindowPlugin';
import type { SveltePanePlugins } from '@windy/plugins.d';
export type SveltePanePluginInitParams<P extends keyof SveltePanePlugins> = Omit<WindowPluginInitParams<P>, 'ident'> & Pick<SveltePanePlugin<P>, 'ident' | 'additionalClassName'> & Partial<SveltePanePlugin<P>>;
/**
 * Common pane plugin, that appear in LH Pane on desktop, RH pane in tablet
 * and appears from bottom on mobile devices
 *
 * Please note, that `hasKeyboard` nad `weDisplayURL` property is set true by default
 */
export declare class SveltePanePlugin<P extends keyof SveltePanePlugins> extends SveltePlugin<P> {
    ident: P;
    /**
     * Additional class name to add to custom Pane Plugin
     */
    additionalClassName?: string;
    constructor(params: SveltePanePluginInitParams<P>);
}
