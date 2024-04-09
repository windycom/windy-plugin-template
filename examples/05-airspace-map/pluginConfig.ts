import type { ExternalPluginConfig } from '@windy/interfaces.d';

const config: ExternalPluginConfig = {
    name: 'windy-plugin-airspace-example',
    version: '1.0.1',
    title: 'Airspaces example',
    icon: '🚁',
    description: 'This plugin demonstrates capabilities of Windy Plugin System.',
    author: 'IL (Windy.com)',
    repository: 'https://github.com/windycom/windy-plugin-template',
    desktopUI: 'embedded',
    mobileUI: 'small',
};

export default config;
