import type { WindowClosingOptions } from '@windy/interfaces.d';
import type { SupportedLangFiles } from '@windy/lang-files.d';
import type { Plugins } from '@windy/plugins.d';
type LangFileKey = keyof SupportedLangFiles;
export type PluginIdent = keyof Plugins;
export type PluginPane = 
/** Right Hand pane */
'rhpane'
/** Small bottom location (like radar controll) that can adjust its size and coexist with LH,RHpane */
 | 'small-bottom'
/** Big bottom location, that cant coexist with LH, RH panes like detail/station/rplanner */
 | 'bottom'
/** Pop up window in the middle of the page like subscription */
 | 'center'
/** Top location on mobile devices like picker-mobile, distance etc */
 | 'top'
/** Plugin is embeded into detail as nearest webcam/station/airq */
 | 'nearest'
/** Bottom plugin that ducks under mobile time controls (use only in exception) */
 | 'small-bottom-bottom';
/** Allowed params to Plugin constructor (private and protected props are omited by default) */
export type PluginInitParams<P extends PluginIdent> = Pick<Plugin<P>, 'ident'> & Partial<Omit<Plugin<P>, 'isLoaded' | 'isOpen' | 'load' | 'open'>>;
export declare class Plugin<P extends PluginIdent> {
    protected static iAm: "plugin";
    /**
     * Status of the plugin (is being loaded right now)
     */
    protected loading: boolean;
    /**
     * Main promise of plugin being loaded
     */
    protected promise?: Promise<void | boolean>;
    /**
     * Plugin ident, witohout any prefix, just id
     */
    ident: P;
    /**
     * FQDN URL of plugin .js file
     */
    location: string;
    /**
     * Required language files
     */
    langFiles?: LangFileKey[];
    /**
     * Status of the plugin (is loaded or not)
     */
    isLoaded: boolean;
    /**
     * Into which pane is plugin opened. This property is used by pluginCtrl only
     * and should prevent opening several overlapping plugins at the same location
     * especially on desktop or tablet devices.
     *
     * On mobile phones, most of the plugins (expecially LH, RH pane) become
     * fullsctreen plugins.
     */
    pane?: PluginPane;
    /**
     * Is the tag currentlly open?
     */
    isOpen?: boolean;
    /**
     * After opening, plugin is not closed automatically by pluginCtrl
     *
     * Other methods of closing are possible
     */
    neverClose?: boolean;
    /**
     * After loading, plugin is automatically resolved with require
     * should replace previous AutoOpenPlugin class.
     *
     * NOTE: autoPen plugins do not use parametr passe to open method
     * Is the plugin resolved by require?
     */
    isResolved?: boolean;
    /**
     * Resolved plugin after calling require
     */
    plugin?: WPluginModules[`@plugins/${P}`] & AdditionalPluginAssets;
    /**
     * Whenever set, this plugin (when opened) disables opening
     * of mobile picker on map interaction. Shoul be used with
     * bottm, top pane plugins and plugins, that can be opened
     * in half
     */
    disableMobilePicker?: boolean;
    constructor(params: PluginInitParams<P>);
    /**
     * Loads the plugin
     */
    load(): Promise<void | boolean>;
    /**
     * Opens the plugin (note, that opening args are ignored)
     */
    open(..._args: unknown[]): Promise<void | boolean>;
    /**
     * Ready to be overloaded
     */
    close(_opts?: WindowClosingOptions): void;
    /**
     * Ready to be overloaded
     */
    redraw(..._args: unknown[]): void;
    /**
     * Ready to be overloaded
     */
    paramsChanged(..._args: unknown[]): void;
    protected initProperties(): void;
}
export {};
