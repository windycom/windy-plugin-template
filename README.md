# Windy Plugin Template

Template for development of Windy Plugins.

**Documentation at: [https://docs.windy-plugins.com/](https://docs.windy-plugins.com/)**

## Quick start

- Install dependencies with `npm i`
- Compile the plugin in watch mode with `npm start`
- Navigate to <https://www.windy.com/developer-mode>
- Load your plugin from the URL <https://localhost:9999/plugin.js>
- Code away!

For running the examples:

- Build the desired example in watch mode with `npm run example01` (or `example02`, etc.)
- Load the example in Windy's developer mode using the URL <https://localhost:9999/example01/plugin.js>

## CHANGELOG

-   5.0.0
    -   Updated example code for the new Leaflet GL map library introduced in client v49.0.0
-   4.2.2
    -   New plugins are marked as private by default
-   4.2.1
    -   Updated `@windycom/plugin-devtools` for client v46.1.0
-   4.2.0
    -   Fixed compiler sourcemap error
-   4.1.0
    -   Updated plugin upload URL
-   4.0.0
    -   Updated `@windycom/plugin-devtools` for client v45.0.0
-   3.0.0
    -   Updated `@windycom/plugin-devtools` for client v42.2.0
-   2.0.0
    -   Completely new version of the plugin system based in Windy client v42+
-   1.0.0
    -   New rollup compiler, no more riot architecture
    -   Updated examples for Windy client v39
-   0.4.0
    -   Added `plugin-data-loader` to the Plugins API
-   0.3.0
    -   Examples moved to examples dir
-   0.2.0
    -   Fixed wrong examples
-   0.1.1
    -   Initial version of this repo
