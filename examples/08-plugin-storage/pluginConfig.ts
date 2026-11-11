import type { ExternalPluginConfig } from '@windy/interfaces';

const config: ExternalPluginConfig = {
    name: 'windy-plugin-storage-example',
    version: '1.0.0',
    title: 'Plugin storage example',
    icon: '📝',
    description: 'Keeps notes in Windy plugin storage, so they follow the user to every device.',
    author: 'Windyty, S.E.',
    repository: 'git+https://github.com/windycom/windy-plugins.git',
    desktopUI: 'rhpane',
    mobileUI: 'fullscreen',
    routerPath: '/storage-example',
};

export default config;
