import type { ExternalPluginConfig } from '@windy/interfaces';

const config: ExternalPluginConfig = {
    name: 'windy-plugin-using-vanilla-js',
    version: '1.0.1',
    title: 'Using Vanilla JS',
    icon: '🍦',
    description: 'Plugin written in vanilla JS',
    author: 'John Doe (optional company name)',
    repository: 'https://github.com/windycom/windy-plugin-template.git',
    desktopUI: 'rhpane',
    mobileUI: 'fullscreen',

    // This plugin does not have optional routerPath, thus it
    // will not modify browser's URL
};

export default config;
