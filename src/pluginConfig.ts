import type { ExternalPluginConfig } from '@windy/interfaces';

const config: ExternalPluginConfig = {
    name: 'windy-plugin-astronomy-seeing',
    version: '1.0.0',
    icon: '🔭',
    title: 'Astro Seeing & Transparency',
    description: 'Professional astrophotography decision-making engine based on atmospheric and astronomical conditions.',
    author: 'Edgar Lopez',
    repository: 'https://github.com/coderGo93/windy-plugin-astronomy-seeing',
    desktopUI: 'rhpane',
    mobileUI: 'fullscreen',
    routerPath: '/astronomy-seeing',
    private: true,
};

export default config;
