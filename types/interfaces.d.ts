declare interface ExternalPluginConfig {
    /**
     * SEO friendly name of the plugin, that will be displayed in URL
     * if plugin is opened from URL (for example `name-of-plugin`)
     *
     * Installed plugins can  user access via URL
     * https://www.windy.com/plugins/name-of-plugin so choose your name
     * wisely.
     *
     * For example: 'hello-world'
     *
     */
    name: string;

    /**
     * Version of the plugin. Use semver format.
     */
    version: string;

    /**
     * Official title of the plugin, that will be displayed alse as browser title,
     * when plugin will be opened
     *
     * For example: 'Hello World plugin'
     */
    title: string;

    /**
     * Optional plugin description that will be displayed in plugins gallery
     *
     * For example: 'This plugin demonstrates capabilities of Windy Plugin System'
     */
    description?: string;

    /**
     * Plugin author name
     *
     * For example: 'John Doe (optional company name)'
     */
    author: string;

    /**
     * Location of repository, with source code of the plugin
     */
    repository?: string;

    /**
     * Optional homepage, where plugin is described in more details
     */
    homepage?: string;

    /**
     * Most of the plugins, provide information for some specific location
     * (sounding, sun tracker, etc). Therefore these plugins require lat, lon
     * information on their startup. Without location, they are useless.
     *
     * If plugin requires lat, lon, then it should be set to true, and plugin
     * can be launched from context menu on map (RH button mouse click),
     * or from menu on mobile picker.
     *
     * These types of plugin can be opened (after user installs them) from URL
     * https://www.windy.com/plugins/name-of-plugin/:lat/:lon
     *
     * When plugin is already opened, you can listen to changes of lat, lon
     * via `singleclick` event, that is fired on map or via change of
     * weather picker.
     *
     * Remember, launching plugin first, and then asking user to position
     * picker on map is not good UI practice.
     */
    requiresLatLon?: boolean;

    /**
     * Plugin behavior on desktop and tablet devices
     *
     * `rhpane` plugins occupy RH pane on desktop, which provides
     * enormous amount of space, and enables to scroll down, but
     * results in automatic closing or the plugin, when any other
     * UI element opens from right side (menu, settings etc...)
     *
     * You can use `embeded` position, whose space is limited, buui plugin
     * is embeded into main menu and stays open.
     *
     * Plugins with `none` have no UI on Windy.com and its purpose is
     * to display data on a map.
     */
    desktopUI: 'rhpane' | 'embeded' | 'none';

    /**
     * Width of `rhpane` plugin in pixels (default is 400).
     */
    desktopWidth?: number;

    /**
     * Plugin behavior on mobile devices
     *
     * `fullscreen` plugin occupies whole screen, while `small` takes only minimum
     * space on the bottom of the screen.
     *
     * Plugins with `none` have no UI on Windy.com and its purpose is (for example)
     * to display data on map.
     */
    mobileUI: 'fullscreen' | 'small' | 'none';
}
