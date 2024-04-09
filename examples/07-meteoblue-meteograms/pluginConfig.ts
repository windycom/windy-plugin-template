import type { ExternalPluginConfig } from '@windy/interfaces';

const config: ExternalPluginConfig = {
    name: 'windy-plugin-meteoblue-meteograms',
    version: '1.0.0',
    title: 'Meteoblue Meteograms',
    icon: '🌤️',
    description: 'Displays Meteoblue Meteogram for any location on a map.',
    author: 'IL (Windyty S.E.)',
    repository: 'https://github.com/windycom/windy-plugin-template',
    desktopUI: 'rhpane',
    mobileUI: 'fullscreen',
    desktopWidth: 600,

    // Link to this plugin will be additional add to RH button context menu
    // which will enable to open plugin from context menu, with lat, lon
    // parameters passed to onopen method
    addToContextmenu: true,

    // This plugin can be opened from URL
    // https://www.windy.com/plugin/route-path/:lat/:lon
    routerPath: '/mb-meteogram/:lat?/:lon?',

    // Whenever user clicks on map and plugin i opened,
    // singleclick events is emitted with name of this plugin
    listenToSingleclick: true,
};

export default config;
