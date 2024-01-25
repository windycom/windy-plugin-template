import { Plugin } from '@windy/Plugin';
import { Window } from '@windy/Window';
import type { PluginInitParams } from '@windy/Plugin';
import type { WindowInitParams } from '@windy/Window';
import type { PluginOpeningOptions, WindowClosingOptions } from '@windy/interfaces.d';
import type { InterpolatorFactory } from '@windy/interpolator';
import type { PluginsOpenParams } from '@windy/plugin-params.d';
import type { BottomTagPlugins, SveltePanePlugins, SveltePlugins, TagPlugins } from '@windy/plugins.d';
import type { LoadedTranslations } from '@windy/trans.d';
import type { ParsedQueryString } from '@windy/queryString';
export interface WindowPlugins extends TagPlugins, SveltePlugins, SveltePanePlugins, BottomTagPlugins {
}
/** Allowed params to WindowPlugin constructor (private and protected props are omited by default) */
export type WindowPluginInitParams<P extends keyof WindowPlugins> = PluginInitParams<P> & Omit<WindowInitParams, 'ident' | 'html'> & Partial<Omit<WindowPlugin<P>, 'open' | 'load' | 'refs' | 'node' | 'domEl'>>;
export declare abstract class WindowPlugin<P extends keyof WindowPlugins> extends Plugin<P> {
    /**
     * Instance of Window, that handles closing button, mounting etc
     */
    window?: Window;
    /**
     * Is plugin mounted
     */
    protected isMounted: boolean;
    /**
     * ID of CSS style
     */
    protected cssID: `plugin-css-${string}`;
    /**
     * Was CSS inserted into the DOM
     */
    protected cssInserted: boolean;
    ident: P;
    plugin: WPluginModules[`@plugins/${P}`] & AdditionalPluginAssets;
    /**
     * URL title to be associated with plugin
     */
    title?: keyof LoadedTranslations | string;
    /**
     * Attaches mobile bottom slider to the tag
     */
    addMobileSlider: boolean;
    /**
     * Simple router, that matches URL and opens plugin
     *
     * Use either simple express style string or RegExp for more complex matching
     * with named groups (e.g. /distance/(?<tab>\S+))
     */
    router?: RegExp | string;
    /**
     * Sets page tile and URL location automatically to /${ident} and ${title}
     */
    defaultLocationAndTitle: boolean;
    /**
     * Prepends URL with SEO friendly string (e.g. /-Nastveni) in local language
     * works only with defaultLocationAndTitle
     */
    useSEOurl: boolean;
    /**
     * Closes plugin when swiping down (works only on mobile
     * in plugins with BottomSlide)
     */
    closeOnSwipeDown: boolean;
    /**
     * Closes plugin when swiping to the right
     */
    closesOnSwipeRight: boolean;
    /**
     * Android stuff: does not close plugin on back button tap
     */
    noCloseOnBackButton?: boolean;
    /**
     * Used for loading of externel 3d party plugins to Windy
     */
    hook?: 'contextmenu' | 'menu' | null;
    interpolator?: InterpolatorFactory;
    /**
     * Does the window reguires keyboard input?
     */
    keyboard: boolean;
    /**
     * Should the item be closed on click somewhere else? True for any click, false ignores everything (default), 'outside' closes Window only when clicking outside the window
     */
    closeOnClick: boolean | 'outside';
    /**
     * Uses el.style.display = block to hide/display el on page
     */
    displayBlock: boolean;
    /**
     * Opening of this plugin logs analytical data to GA (if allowed by user)
     * By default is set to true
     */
    logUsage: boolean;
    /**
     * Disable opening & closing animation
     */
    noAnimation?: boolean;
    /**
     * Class name applied to Window element
     */
    className?: string;
    /**
     * Attachement point, where the window will come if domEl is not specified
     * Use data-plugin="" attribute to in HTML code, se we can distinguish between
     * normal tags and attachement points
     */
    attachPoint: string;
    constructor(params: WindowPluginInitParams<P>);
    /**
     * Check if plugin is loaded and decides if load or open. Params are passed to onopen fun
     */
    open({ params, disableOpeningAnimation }?: PluginOpeningOptions<P>): Promise<void | boolean>;
    close(opts?: WindowClosingOptions): void;
    /**
     * Ready to be overloaded: Will be called after open
     */
    onopen(params?: PluginsOpenParams[P]): void | boolean;
    /**
     * Ready to be overloaded: Will be called before unmounting
     */
    ondestroy(opts?: WindowClosingOptions): void;
    /**
     * Ready to be overloaded: Will be called after close
     */
    onclosed(..._args: unknown[]): void;
    /**
     * Ready to be overloaded: Will be called before plugin is loaded, sync action called immediatelly after rqstOpen is fired
     */
    beforeLoad(..._args: unknown[]): void;
    /**
     * Displays URL & tile
     */
    displayURLAndTitle(): void;
    /**
     * Called by router when URL matches plugin's router (feel free to overload it)
     */
    onRouteMatch({ groups }: string[] & {
        groups?: Record<string, string>;
    }, _qs?: ParsedQueryString): PluginsOpenParams[P] | null;
    get node(): HTMLDivElement | undefined;
    createWindow(): Window;
    getCss(): string | undefined;
    protected initProperties(): void;
    protected unmount(): void;
    /**
     * Append CSS styles
     */
    protected mountCss(): void;
    /**
     * Mounting the module
     */
    protected mount(): void;
    /**
     * After module is being mounted and fully in HTML DOM
     */
    protected onmounted(): void;
    private onWindowOpen;
    private onWindowClose;
    private onWindowClosed;
}
