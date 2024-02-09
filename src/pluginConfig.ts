import type { ExternalPluginConfig } from '@windy/interfaces';

const config: ExternalPluginConfig = {
    name: 'windy-plugin-my-plugin',
    version: '0.1.0',
    icon: '🔌',
    title: 'This is my first plugin',
    description: 'This is my first plugin.',
    author: 'John Doe (optional company name)',
    repository: 'https://github.com/windycom/windy-plugin-template',
    desktopUI: 'rhpane',
    mobileUI: 'fullscreen',
    routerPath: '/my-plugin',
};

export default config;
