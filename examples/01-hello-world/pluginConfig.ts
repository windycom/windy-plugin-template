import type { ExternalPluginConfig } from '@windy/interfaces';

const config: ExternalPluginConfig = {
    name: 'windy-plugin-hello-world',
    version: '1.0.1',
    title: 'Hello World plugin',
    icon: '👋',
    description: 'This plugin demonstrates capabilities of Windy Plugin System',
    author: 'John Doe (optional company name)',
    repository: 'git+https://github.com/windycom/windy-plugins.git',
    desktopUI: 'rhpane',
    mobileUI: 'fullscreen',
    routerPath: '/hello-world',

    // Default width of rhpane plugins is 400px, but you can change it
    // desktopWidth: 400,
};

export default config;
