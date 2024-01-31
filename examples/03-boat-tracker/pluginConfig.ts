import type { ExternalPluginConfig } from '@windy/interfaces';

const config: ExternalPluginConfig = {
    name: 'windy-plugin-boat-tracker',
    version: '1.0.0',
    title: 'Boat Tracker',
    description: 'This plugin demonstrates how to create simple race tracker.',
    author: 'John Doe (optional company name)',
    repository: 'https://github.com/windycom/windy-plugins',
    desktopUI: 'rhpane',
    mobileUI: 'small',
    desktopWidth: 200,
    routerPath: '/boat-tracker',
};

export default config;
