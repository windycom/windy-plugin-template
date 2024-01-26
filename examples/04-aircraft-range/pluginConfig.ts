const config: ExternalPluginConfig = {
    name: 'aircraft-range',
    version: '1.0.0',
    title: 'Aircraft range',
    description: 'This plugin demonstrates capabilities of Windy Plugin System.',
    author: 'John Doe (optional company name)',
    repository: 'https://github.com/windycom/windy-plugins',
    desktopUI: 'rhpane',
    mobileUI: 'small',

    // This plugin requires lat/lon to be set
    // before opening the plugin
    requiresLatLon: true,
};

export default config;
