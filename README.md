![](https://www.windy.com/img/windy-plugins/example01.gif)

# Windy Plugins
This repository acts as an documentation, playground and **boilerplate** for your own plugin. Therefore always **fork this repository** before editing it.

Plugins are written in Javascript and published as npm package, so you already know how to create them

# Getting started
Fork this repository and then clone it
```sh
git clone https://github.com/yourGitHubUsername/windy-plugins
cd windy-plugins
npm i
npm start
```
Then open your browser at [www.windy.com/dev](https://www.windy.com/dev/) to test your plugin.

If it fails, make sure that your plugin is correctly built and accessible with your browser at [localhost:9999/plugin.js](http://localhost:9999/plugin.js).

# Tutorials
 - [Hello World](01-hello-world)
 - [Left side window](02-window-on-left-side)
 - [Right side window](03-window-on-right-side)
 - [Boat tracker](04-boat-tracker)
 - [Loading external library](05-use-external-library)
 - [Use weather picker](06-weather-picker)
 - [Working with multiple files](07-multiple-files-plugin)
 - [Display CSV, GPX, KML, WKT and other](08-display-csv-gpx-kml-formats)

# Other resources
 - [How Windy Plugin work](docs/WINDY_PLUGIN.md)
 - [Windy API documentation](docs/WINDY_API.md)
 - [Leaflet 0.7.7 documentation](https://leafletjs.com/reference-0.7.7.html)
 - [List of Leaflet Plugins](https://leafletjs.com/plugins.html)
 - [Windy Plugins technical forum](https://community.windy.com/category/21/windy-plugins)

# Compiling your plugin
Our custom [Windy Plugin Compiler](docs/PLUGIN_COMPILER.md) does all the job for you. Just run `npm start` to launch it or `npm run start-dev` for skipping beginner's prompt.

# Publishing your plugin
 1) Make sure, that your `package.json` is updated, and that:
    a) name, is unique name of your plugin
    b) description, describes what your plugin does
    c) author and repository reflects your name and where the plugin hosted is
 2) Remove this `README.md` and put there few words about your plugin (and maybe some screenshot if you want). The text from README file will be used in our planned plugins gallery.
 3) Publish your plugin as npm package by `npm publish`
 4) Test your published npm package on [Windy's Plugin page](https://www.windy.com/plugins)
 5) Let [us know in our community](https://community.windy.com/category/21/windy-plugins) about your new achievement

# Conditions your plugin MUST fulfill
It is strictly prohibited to use plugin to:
 - Modify user's setting without his consent
 - Download any of user's settings, favorites or location to your server
 - Download any meteorological data from Windy to your own server or use them in any other scope than inside your plugin
 - Do any action that would harm our [privacy policy](https://www.windy.com/privacy)

# Enterprise use
We prepare **Windy Enterprise** project, that will enable to
 1) Use private plugins (not published publicly)
 2) Access your data just to your company's users
 3) Let us know if you want to be informed about this project

# Things to remember
 - While providing coordinates to Leaflet can be done via object `{ lat, lng }` with **lng** property, Windy supports `{ lat, lon }` with **lon** property.
 - Using undocumented functions of Windy API can break your plugin, when we decide to upgrade our codes. If you miss something, rather [let us know here](https://community.windy.com/category/21/windy-plugins) and ask us to document and expose other features.

# Technical support
Drop a line in our [Windy Plugins section](https://community.windy.com/category/21/windy-plugins) of our Community forum.

# ROADMAP
 - Initial release
 - Extend Windy API on a basis users requests
 - Create gallery of the most useful plugins
 - Create system so anyone can publish its own forecast/climatological model on Windy

# CHANGELOG
* 0.1.0
    - Initial version of this repo

-----------

This is default readme - please do not remove this line



