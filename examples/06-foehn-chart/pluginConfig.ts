import type { ExternalPluginConfig } from '@windy/interfaces';

const config: ExternalPluginConfig = {
    name: 'windy-plugin-foehn-chart',
    version: '1.0.0',
    title: 'Foehn and Bise Chart',
    icon: '⛰️',
    description: 'Displays Foehn and Bise diagram for Switzerland.',
    author: 'IL (Windyty S.E.)',
    repository: 'https://github.com/windycom/windy-plugin-template',
    desktopUI: 'rhpane',
    mobileUI: 'fullscreen',
    routerPath: '/foehn-chart',
    desktopWidth: 800,
};

export default config;
