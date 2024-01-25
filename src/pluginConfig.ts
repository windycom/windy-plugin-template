const config: ExternalPluginConfig = {
    // This must be lowercase and SEO friendly string, that can be used
    // in URL to open plugin from URL https://www.windy.com/plugins/name-of-plugin
    name: 'hello-world',
    version: '0.1.0',
    title: 'Hello World plugin',
    description: 'This plugin demonstrates capabilities of Windy Plugin System',
    author: 'John Doe (optional company name)',
    repository: 'git+https://github.com/windycom/windy-plugins.git',
    desktopUI: 'rhpane',
    mobileUI: 'fullscreen',

    // Default width of rhpane plugins is 400px, but you can change it
    // desktopWidth: 400,
};

export default config;
