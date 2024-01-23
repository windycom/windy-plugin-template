# CHANGELOG

# [ivo/esm]

-   **System of external plugins removed (removed oue internal plugins `plugins` and `dev`) and all associated codes**
-   **Implemented handling of browser BACK button (with limited functionality)**
-   **[DEV] Introduced treeshaking & code splitting for plugins**
-   **[DEV] Simplified plugin system, now based on ESM. Abandoned legacy `W.require`, `W.define` DI methods, abandoned `dependencies` in Plugin class**
-   Slightlly modernized `colors` plugin (used new color picker)
-   [DEV] Leaflet and core JS file are now ESM modules
-   [DEV] `@windy/router` simplified and modernized. Plugins now support simplified express style routes
-   [DEV] Fixed long standing bug in `@windy/location` when one plugin reset URL of other plugin
-   [DEV] Removed `seo` plugin (that should be loaded when Windy is visited by crawler and enhanced HTML). It never worked.
-   [DEV] Removed library only plugins `fastpring-builder`, `geodesic`, `subscription-services`, `weather-renderers`, `detail-render`, `gl-lib`, `lightnings`, `radar-sat`, `hurricane-services`, `gestures`, `plugins-data-loader`, `graticule` that served as deps to to other plugins (some moved to `plugins/_shared` some remained in `js`)
-   [DEV] Removed `d3.custom`, `colorpicker`, `nouislider` library (and plugin) in favor of standard node_module that is treeshaked into code

# [ivo/desktop-ui2]

-   **Removed plugin `animate` (compicated, nobody used, produced shitty videos)**
-   **Removed overlay/product/layer `map` and plugin `map-layers`, their function is triggered automatically upon zooming in**
-   **Removed following plugins: `user-menu`, `overlays`, `tools` and `pois` (their functionality is handled by `menu` and `favs`)**
-   **Removed `widgets` plugin from client (should be replace by dedicated microsite)**
-   Removed plugin `tides` (was used for URL redirection only an not used at all)
-   Refactor of UI in detail mobile box (added share icon btw)
-   `upload` plugin simplified and fixed
-   Abandoned usage of Windy URL shortener used for URL sharing (slow & unreliable, and our URLs are small and nice anyway)
-   New mobile only plugin `map-selector` for changing map background when zoomed in
-   Unified all share icons, removed `share-mobile`, simplified `share` plugin and introduced `@windy/share` module to share URL in a unified way
-   Separated `sounding` plugin to `sounding` and `radiosonde` plugins, and overhauled their mobile UI (TODO: Bug closing radiosonde)
-   [DEV] Reintroduced `rqstToggle` bcast (used only twide on desktop)
-   [DEV] Removed plugin class `.plugin-tablet-rhpane`, use `.plugin-rhpane` instead
-   [DEV] Plugin `rhpane` containing desktop RH pane controlls simplified, refactored and splitted to `rhpane-top` and `rhbottom` plugins
-   [DEV] All plugin mounting points unified to `span[data-plugin=".."]` to improve readability of HTML
-   [DEV] Completelly removed our custom `Resizable` class in favor of `ResizeObserver` API
-   [DEV] Simplified rhbottom providers massages (`@windy/rhMessage`)
-   [DEV] All the plugin related classes `.plugin-content`, `.mobile-title`, etc... prefixed as `.plugin_name-of-class`
-   [DEV] Modernized some classes inside `#search` and `#logo-wrapper` elements
-   [DEV] Removed `.noCssVar()` mixin from `.less` files. Only 0.8% browsers w/o CSS var support.
-   **[DEV] Removed `/cypress` folder (not used more than 2+ years)**
-   **[DEV] On desktop all LH and RH pane plugins are now `.plugin-rhpane`and opens to right side with same CSS and GUI**

# [TBD]

# [41.1.0]

-   Added Arome 2.5km for Antiles and Reunion
-   Removed Google places logic (it is now handled by BE)
-   Revision of available isoline for all models
-   Fixed offline mode for iOS
-   Fixed HTTP error messages with body
-   Made fires download tiled data
-   **[DEV] Upgraded to svelte 4 and all capacitor packages**
-   [DEV] Upgraded dev packages

# [41.0.4]

-   Changed analytics handling to include implicit consent
-   Reverted citytile logic to use better-cacheable endpoint

# [41.0.3]

-   Fixed `screenshot` plugin

# [41.0.2]

-   (version **41.0.1** was accidentally skipped)
-   Fixed analytics for countries where consent is not required

# [41.0.0]

-   **Completelly overhauled `station` plugin**
-   **Added new `precip` POI layer showing recent rain**
-   **Added cookie `consent` plugin**
-   Implemented filtering by type of the station in `wind`, `temp` POI layers (skipped `precip` due to low number of precip stations)
-   Added 10hpa (30km) flight altitude forecast
-   Added new overlays for icing and turbulence
-   Added logging error events of EventSource
-   Allowed beta offline mode for target index only
-   Replaced nasa-chem with cams-global
-   Improvements in GL tile renderer
-   Made the notification service close its EventSource on the beforeunload event
-   Made POI tiles unload correctly
-   Refactored rplanner to svelte and improved mobile GUI
-   Removed `airq` and `radiation` plugin (has been merged into `station` including lang files)
-   Removed Vkontakte social network link
-   Fires POI layer now shows the value in a popup instead in picker on desktop, and clicking on a fire will open detail. Mobile version now shows it in a picker like other POIs
-   Fixed cut subscription window on small notebooks
-   Fixed no-data for `cloudtop` picker
-   Fixed gradient select in `colors` plugin on open
-   Fixed infinity `favsChanged` loop in favs plugin
-   Fixed #109 (Full webcams image size is loaded even for mobile devices)
-   Fixed #891 (Change Twitter to X)
-   Fixed #912 (Time code in detail wasn't refreshing on open/click)
-   Fixed #919 (Radar is not restoring isolines)
-   Fixed #921 (Cannot click through invisible nearby icons text)
-   Fixed #924 (Airport plugin - properly save airport as fav)
-   Fixed #925 (Daylight saving time causing wrong date in satellite archive)
-   Fixed #934 (Mobile route planner share is not working)
-   **[DEV] Use `fetch` API instead of old `XMLHttpRequest`**
-   **[DEV] `windy/urls` renamed to `@windy/fetch`. Also, `*Url` and `*Data` suffixes for its method are used**
-   [DEV] `@windy/users` slightly simplified
-   [DEV] Implemented new CSS class `.horizontal-scroll` for horizontal scrolling elements
-   [DEV] Used new endpoints for hurricanes to simplify client-side post-processing
-   [DEV] Add support for tailwind
-   [DEV] Created `@windy/css` module with CSS related utils
-   [DEV] Removed `store-settings` plugin
-   [DEV] User state (`startUpLastPosition`, `startUpOverlay`, `startUpLastProduct`) is set on `beforeunload` and `visibilitychange`
-   [DEV] Simplification of `@windy/log` module (any logging must be handled via `logPage` method)
-   [DEV] Load citytile data for specific dsttimes only when needed
-   [DEV] Split `directory` to `category` and `modelIdent` in `Product` class logic
-   [DEV] `CITYTILE_HOST` env variable is now actually used instead of `IMAGE_SERVER_WCL_HOST`
-   [DEV] Made linting faster by using tsconfig.eslint.json for Svelte files
-   [DEV] Made version in Accept header uniquely decodable

# [40.1.2]

-   Made subscription info more descriptive

# [40.1.1]

-   Added some more info about subscription (it violated Google terms)

# [40.1.0]

-   Added Black Friday 2023 promo
-   Fixed #927 (No error message when user is logged out from store and products cannot be fetched)
-   [DEV] Removed depracated methods from Android billing library

# [40.0.7]

-   Fixed #918 (Jumping map when changeDetailOnMapDrag is false on mobile)

# [40.0.6]

-   Do not throw error for target mobile when minifest meta tag is missing
-   Fixed missing exported baseMap for target mobile
-   Fixed always shown button to fix user issue on Android

# [40.0.5]

-   Add logging and better error messages when handling WebGL lost context
-   Fixed interpolator for latLon
-   Fixed legacy particles
-   Fixed radar gl failed
-   Radar restart on gl context lost

# [40.0.4]

-   Fixed missing row in detail when zulu mode is active

# [40.0.3]

-   Fixed reseting detail view when new locality is searched
-   Fixed `dev`, `airq` and other routes (`airport` plugin router has been reverted to the old one)
-   Fixed (ugly hotfix) race condition when `checkNewMinifest` is called
-   Return empty minifest meta tag when metadata server is down

# [40.0.2]

-   Fixed null pointer exceptions in detail
-   Fixed missing attach point for premium permanent promo

# [40.0.1]

-   Fixed picker null pointer exception

# [40.0.0]

-   **Offline mode: completelly new functionality utilizing `serviceWorker` API. For inital testing avail only on `index` targed and `desktop` devices.**
-   **NASA FIRMS POI layer**
-   **Updated embed**
-   Lightning improvements (added corona effect, circles, fixed timing and accumulation pattern, other small updates and optimalisations)
-   Added POI checkbox to filter out heliports (w/o METARs)
-   Added tide forecast do detail plugin thx to worldtides.info API
-   Search functionality refactored as plugin
-   Obsolete tide plugin now works only as redirect to detail
-   Added nearby Air Quality Monitoring Stations plugin `nearest-airq` to detail
-   Added surfer logo in search results for surf spots
-   Hide mobile picker when Find my location is triggered
-   Updated what's new for version 40
-   Attempt to fix a case where a password autofill could send the login form without a password
-   Fixed GL render for currentsTide
-   Fixed fetching minifest on visibility change
-   Fixed getting picker location on tablet
-   Fixed #644 (Altitude switcher is active for Arome)
-   Fixed #895 (Wind forecast on map is not up-to-date when timeline is changed)
-   Fixed #899 (`day-switcher` shows historical days when received from backend)
-   Fixed #900 (`day-switcher` does not respect set language)
-   Fixed #901 (POI name is not shown when is clicked with open detail)
-   Fixed #902 (Opening picker stops timeline animation)
-   Fixed #905 (Cannot search for menu item in overlays filter when `menuTrans` is set)
-   Fixed #907 (Pinned menu overflows on iOS)
-   Updated translations
-   [DEV] **Simplification and unification of all messages displayed to user** (No connection message, subscription message, etc.)
-   [DEV] **Modernized all icons and logos in `header.inc.html`**
-   [DEV] **All the used images in the client are referenced by `IMG_GALLERY_PATH`, `IMG_ABSOLUTE_PATH` and `IMG_RELATIVE_PATH`, so we can search for them and include them in Apps/offline mode**
-   [DEV] **Plugin `detail` and `airport` refactored to `Svelte`, simplified and modernized**
-   [DEV] Cleaned nginx config
-   [DEV] Moved `beforeOpen` from SveltePlugin to WindowPlugin, renamed to `beforeLoad`
-   [DEV] Use svelte store unsubscribers (may affect webcam previews, (pending) subscription and sounding)
-   [DEV] Use `@windy/baseMap` instead of windytiles.mapy.cz
-   [DEV] Send `refTime` query parameter with all `node-forecast` and `node-citytile` requests
-   [DEV] Upgraded TS to 5
-   [DEV] Refactored `nearest-stations` plugin to Svelte.
-   [DEV] First usage of `webP` format for images w/o any fallbacks (in `menu`, `fav-layers` plugins)
-   [DEV] Removed 100vh, 100vh inlines styles from `index.html` that could lead
-   [DEV] Added missing DNS prefetch tags in `index.html`
-   [DEV] Amounts of fixes in `detail` making the code more readable and stable
-   [DEV] Fixed `WindowPlugin` multiple mounting of some plugins
-   [DEV] `search` plugin not displaying keyboard fixed
-   [DEV] Simplification of `@windy/user` module

# [39.3.3]

-   Fixed tooltip animation for Chromium based browsers
-   Fixed Android notification error showing on iOS

# [39.3.2]

-   Added checkboxes to confirm before submitting a new webcam
-   Fixed #894 (Inconsistency between minimap icon and type of a hurricane)
-   Fixed #884 (Back button is hiding timeline on Android)
-   Fixed map watermark for Chromium
-   Lightnings: fixed time limits for loading frames and hot data
-   Lightnings: fixed satellite recent lightnings active
-   Lightnings: fixed loading hot data (only after broadcast start)
-   Hide "export as GPX" from native apps as capacitor does not support blob download

# [39.3.1]

-   Added `uh` parameter to sedlina requests

# [39.3.0]

-   **New LINET lightnings (shown on radar & satellite)**
-   Lightning sound start improvements and other radar fixes and optimizations
-   Custom colors plugin is sorted alphabetically, active layer is selected by default
-   Fixed double rendering of rplanner graph
-   Fixed opening external plugins without qs parameters
-   Updated translations
-   [DEV] `webp` file format support for radar (fallback to PNG if not supported)

# [39.2.1]

-   Fixed when pinned overlay does not exist
-   Fixed screenshot plugin

# [39.2.0]

-   **New fire danger layers** (all drought layers were merged and renamed together)
-   **Added meteo cams POI layer**
-   Changed default detail zoom on mobile back to 6 (9 was too much for users)
-   Returned interactive map for sounding on mobile and tablet
-   Fixed missing "More options" in mobile rplanner
-   Fixed webcams fullscreen for old Safari
-   Fixed hovering over POIs with mobile picker (DOM element was sometimes hidden, so coords were nullish)
-   Fixed compare forecast Safari overlays bug on iPhone
-   Updated Facebook app id in the share plugin
-   Updated translations
-   Reset timeout that hides mobile picker on timestamp change (i.e. running timeline animation)
-   [DEV] `day-switcher` supports multi-level navigation
-   [DEV] Replaced `trans2` workaround with universal `fullname`, `shortname` and new `menuTrans` + `menuIcon` logic
-   [DEV] Use new POI v2 endpoints
-   [DEV] Use new metadata server
-   [DEV] Remove `Product1h` in a favor of universal `Product` (all models can be premium now)
-   [DEV] Update `node-servises` URLs and typos in its requests

# [39.1.2]

-   Added logging to mobile intro plugin
-   Unify Go Premium buttons on mobile and desktop
-   Detail haptic feedback only when user change location by dragging the map
-   Fixed 2x detail render on map zoom in
-   Fixed missing selected map labels

# [39.1.1]

-   What's new plugin can be open with deeplink

# [39.1.0]

-   Detail on mobile/tablet zooms in, always adds plusating marker and have haptic feedback when finally rendered
-   LongTap on home icon opens small window with loader while GPS coords are loading
-   Fixed bad duration of start up time in debug plugin

# [39.0.10]

-   [DEV] Send `W.startTs` as `dt` to Google Analytics

# [39.0.9]

-   Fixed HP weather showed over picker line
-   Fixed changing detail timestamp on non-calendar layers
-   Fixed missing Instagram and Community icons in mobile menu
-   Added possibility to remove distance waypoint on touch devices
-   Added 'What's new' opener to debug plugin

# [39.0.8]

-   Added start timestamp to the debug plugin
-   Fixed missing cities POI from mobile menu
-   Fixed sea temperatures in the inland
-   Fixed sea temperature bad trasparency
-   Return second row of hours and clouds to airgram
-   Updated translations
-   Updated what's new plugin to version 39
-   [DEV] Nginx uses passed scheme from balancer

# [39.0.7]

-   Fixed category in hurricane tracker menu item
-   Fixed cursor for mobile calendar (it is `grab` now)
-   Use jpg instead of webp in layer preview images

# [39.0.6]

-   Fixed inputs in older version of Safari
-   Fixed styles of isoline menu on mobile

# [39.0.5]

-   Fixed disapearing bottom elements when info plugin is open

# [39.0.4]

-   Improved device detection
-   Improved GA sedlina reporting
-   Fixed scrolling on small notebooks
-   Fixed missing picker coords when external plugin is open from mobile picker

# [39.0.3]

-   Reverted device detection to old one

# [39.0.2]

-   Changed plugin-content overflow-y to `auto` (from `scroll`)
-   Isolines on mobile devices are in dropdown
-   Added external plugins to mobile picker
-   Fixed nouislider plugin id
-   Fixed desktop picker (it behaves same as in old version)
-   Hotfixed imperial units bug
-   Better touch device detection
-   [DEV] Pass called bcast data into error message

# [39.0.1]

-   Added isolines to mobile menu
-   Fixed reporting WebGL errors id
-   Fixed null exceptions in picker and detail
-   Fixed `app-review-dialog` plugin

# [39.0.0]

-   **Brand new mobile/tablet design (with rplanner)**
-   Added new rating app plugin from mobile devices (disabled at this moment, used only for collecting metrics before production run)
-   Added `colors` plugin for mobile devices
-   Added possibility to zoom globe at any level
-   All pane plugins are open from RH side on tablet (except of `airpot`)
-   Removed "Tools, Favourites, Settings" switch on desktop LH menu
-   Globe fixes and improvements: random picker issue, removed many debug throws, added static GL context (minor optimisations) & some other small updates
-   Fixes and improvements in hurricane tracker (near to pole glitches, merging history with forecast)
-   Fixed #780 (Timestamp on progress bar does not correspond to detail forecast)
-   Fixed #782 (Metars can now do 1h forecast. Made legend sticky)
-   Fixed #785 (Refresh minifest when tab becomes visible)
-   Fixed #827 (Plugin `hp-weather` duplicates events)
-   Fixed #838 (Use last location as startup location does not work for free users)
-   Fixed #851 (Close picker when switching to globe and user is not premium)
-   Fixed #853 (Check if element has child nodes)
-   Fixed #858 (Fixed scrolling in multimodel)
-   Fixed prevention of first click in application
-   Fixed tile rendering for bigger delta zoom (9+), e.g. tile zoom 2 and map zoom 11
-   [DEV] **Complete refactor of plugins lifecycle**
-   [DEV] **Router refactored**
-   [DEV] Removed `W.tag` backward compatibility
-   [DEV] Integrated `gl-tile-render` into core, moved old one (with `patternator`) to `@plugins/legacy-tile-render` as fallback
-   [DEV] Old `@plugins/particles` plugin is used as fallback for `gl-particles`
-   [DEV] Fixed static WebGLRenderingContext
-   [DEV] Removed `testWebGl` logic in favor of auto-fallback to old renderers
-   [DEV] Added support for GLSL language
-   [DEV] Removed `this` keyword from plugins
-   [DEV] Centralize setting URL to `onurl` method
-   [DEV] Refactor `exclusive` plugin logic to `pane` & `neverClose`
-   [DEV] Removed `AutoOpenPlugin` in favor of `TagPlugin`
-   [DEV] Used proper TS classes everywhere, removed our custom `Class` class
-   [DEV] Detected device is evaluated inline in `index.html` for better CSS rendering
-   [DEV] Partial overhaul of tablet UI, using more mobile features. Most affected plugins/components attached to `#bottom` and `detail`, `station` plugins
-   [DEV] CSS and HTML codes of LH, RH pane plugins were standartized, using handy classes and LESS mixins. Most affected plugins: `airq`, `alerts`, `articles`, `cap-alert`, `colors`, `debug`, `delete-info`, `favs`, `hurrcnes`, `info`, `login`, `plugins`, `radiation`, `settings`, `tides`, `tools`, `upoader`, `webcams`, `webcams-detail|add|remove|edit`
-   [DEV] Added `watchSync` property to sync data to watches
-   [DEV] Upgrade Node.js to 16
-   [DEV] Enable autoscaling
-   [DEV] Allow to configure citytile and blitz host
-   [DEV] Fixed target lib build
-   [DEV] Use `babel` instead of `buble`

# [38.1.8]

-   Extend beta test cookie expiration

# [38.1.7]

-   Fix beta test URL

# [38.1.6]

-   Open beta test

# [38.1.5]

-   Do not prefill "hide my email" Apple addresses to FastSpring popup window.

# [38.1.4]

-   Fixed lightnings on mobile devices

# [38.1.3]

-   Serve HERE Maps via proxy
-   Serve Mapy.cz via CDN

# [38.1.2]

-   Fixed Met Office provider name

# [38.1.1]

-   Added MetOffice logo for UKV model
-   Changed ProductSwitch UKV position

# [38.1.0]

-   Do not popup subscription on map for 10-day forecast
-   Moved detail extend button off the forecast table

# [38.0.0]

-   **Brand new subscription (promo, features & communication)**
-   Added UKV model
-   Added satellite archive
-   Fixed number of available days in detail
-   Update tranlsations

# [37.2.5]

-   Improve password validator
-   Add registration checkboxes for Koreans
-   Update Crowdin translations

# [37.2.4]

-   Fixed airgram background in rplanner

# [37.2.3]

-   Add solarpower to Icon products

# [37.2.2]

-   Fixed #828 (Fixed possible "not defined" WebGLRenderingContext)

# [37.2.1]

-   Fixed #822 (Select closest hurricane based on map center)

# [37.2.0]

-   Allowed negative precision for metrics (eg. for 123.456: 1 => 123.4, 0 => 123, -1 => 120)
-   Cleaned up in `altitude` and `elevation` metrics - altitude is flight level, elevation is elevation
-   Update translations
-   [DEV] Allowed dev pods for all IPs

# [37.1.12]

-   Fixed sounding skewT units when `ft` is default
-   Allowed changing units with clicking in sounding

# [37.1.11]

-   Use GeoIP data from High Scale Filestore

# [37.1.10]

-   Use forecast data from new High Scale Filestore

# [37.1.9]

-   Storm name is set as a page title for hurricane detail

# [37.1.8]

-   Fixed UI glitch in hurricane tracker

# [37.1.7]

-   Hurricane tracker is open on the nearest hurricane to user location
-   Fixed temp lables

# [37.1.6]

-   Added possibility to open windy with specified POIs layer
-   Fixed hurricane tracker when no tooltips were shown

# [37.1.5]

-   Fixed sounding map centering on iOS
-   Fixed handling of hurricanes without tooltips
-   Fixed ordering of hurricane models

# [37.1.4]

-   Fixed blured labels on globe
-   Fixed huge conus for hurricanes without history
-   Fixed gallery overview width on tablets
-   Fixed switching model from sounding, when current overlay is not supported
-   Fixed #770 (Sublayers cause menu unselection)
-   Removed AROME from sounding (ECMWF was displayed instead)

# [37.1.3]

-   Improved sounding for mobile devices
-   Fixed ICON-D2 sounding temp ranges
-   Fixed sounding altitudes
-   Hide city temp labels for wet-bulb overlay

# [37.1.2]

-   Hotfix hurricane tracker with empty hours

# [37.1.1]

-   [DEV] Fixed memory limit
-   [DEV] Disabled Code Quality job

# [37.1.0]

-   [DEV] Switched to Helm deploy

# [37.0.1]

-   Fixed elevation units for radiosonde
-   Fixed POIs order in menu
-   Fixed hurricane tracker bottom margin for iPhones
-   [DEV] Refactor metrics logic

# [37.0.0]

-   **New hurricane tracker**
-   **New sounding/radiosonde plugin**
-   **Added wet-bulb temp, uv index & solar power layers**
-   **Added radiosonde POIs**
-   Added custom GA code for Huawei
-   Added Google Services availability check for Google login
-   Fixed #254 (AQ stations no popup for mobile)
-   Fixed #329 (Fix HP weather icon)
-   Fixed #628 (Removed "Your settings are saved to the cloud" text from layers/poi menu)
-   Fixed #637 (Fix color picker reopening issue)
-   Fixed #643 (Webcam detail now opens fully on interaction)
-   Fixed #712 (Show CAP alert icons in correct zoom levels)
-   Fixed #715 (Show small rain and snow values in meteogram)
-   Fixed #719 (Intersucho detail shows waves)
-   Fixed #756 (Forecasted weather shows different temperatures than Favs)
-   Fixed #766 (Fix sea temperature minifest path)
-   Fixed WebGL particles at high zoom near tile edge
-   Fixed black screen tiles on iOS
-   Fixed WebGL particles race condition with nullish error
-   Fixed passing `detailProduct` in URL for detail point forecast
-   Updated translations

# [36.0.1]

-   Fix bad POI rendering for some combinations of browsers, HW, system

# [36.0.0]

-   **Added 3D hurricanes** (therefore refactored 2D)
-   **Added daily notifications (Android only)**
-   **New satellite sun filter** and radar/satellite metrics improvements
-   **Updated TARGET_LIB build**
-   Added batery usage check for better widget update (mobile apps only)
-   Fixed #235 (Picker does not work for low zoom levels)
-   Fixed #513 (Lightnings vibration does not work on some mobile devices)
-   Fixed #571 (Picker is disapearing)
-   Fixed #688 (3D mode is available for tablets in browser)
-   Fixed #701 (AMSL info is shown several times when switching products)
-   Fixed #753 (Save startup model even if location is not saving)
-   Fixed #757 (Empty picker is shown when click near to display edges)
-   Fixed #769 (Links in articles are almost same as text and are open to current window)
-   Fixed #773 (Lightnings are without sound and vibrations)
-   Fixed #775 (Unable to edit color scale for info.json product which is not loaded yet)
-   Fixed #709 (Get new city temperatures every 1h step in timeline)
-   Fixed #784 (Fix getting temperatures for cities for days with less hours)
-   Fixed #879 (Radar is missing provider - fixed by hiding model and refTime in info plugin for StaticProducts)
-   Fixed changing metric units in hurricane tracker menu
-   Fixed satellite picker sampling
-   Fixed BoM ACCESS resolution
-   Fixed native errors notifications (all errors are checked immediately after adding)
-   Fixed isolines on widescreen
-   Removed `moment` library dependency from notifications
-   Update translations
-   **[DEV] Removed `shimport` & complete build refactor**
-   [DEV] All `Evented` instances are now type-checked
-   [DEV] Replaced `weatherTableRenderer` and `weatherRender` singletons to proper `TS` classes `FragmentRenderer` and `WeatherTableRenderer`
-   [DEV] Replaced custom Classes with propper `TS` classes in `ImageMaker`, `ImageGraph`, `iMaker`, `detail-render/Row`, `Window`, `Calendar`, `Layer`, `Metric`, `Overlay`, `Product`, `picker`, all `plugins/poi-libs/*` and all `src/pluginSystem/*`
-   [DEV] Renamed `@windy/iMaker` to `@windy/ImageRenderers` and `iMakerExtended` to `DetailImageRenderers` in `@plugins/detail-renderer`
-   [DEV] Split logic around image makers and renders. `@windy/ImageMaker` and `@windy/ImageGraph` does not render anything, there are only basic classes for derivated renderers. All these derivated renderers implements `ImageRenderer` interface from `@windy/ImageRenderers` and contains rendering logic
-   [DEV] Plugins `poi-libs`, `menu`, `rhpane`, `picker`, `globe` refactored from custom Classes to proper `TS` classes
-   [DEV] Deeply refactored all `src/pluginSystem/*` and `@windy/Window` classes. Created abstract `WindowPlugin` which extends `Plugin` with composed `Window` instance. Created `ExternalPlugin` for 3rd-party plugins. Renamed `TagAutoOpen` to `AutoOpenPlugin`. `Window` is completely cleaned from plugins logic, it is strictly UI element now.
-   [DEV] Fixed possible deadlock when any plugin with circular dependency is loaded
-   [DEV] Plugin `dev` is allowed only for target index
-   [DEV] Cleaned package.json
-   [DEV] Removed .well-known

# [35.3.5]

-   Open beta test

# [35.3.4]

-   Added alternative Google login for Huawei devices

# [35.3.3]

-   Fixed #761 (Removing all custom colors breaks Windy)
-   Fixed #767 (Copying coordinates from picker shows origin location after moving)

# [35.3.2]

-   Fixed realtime lightning and sound

# [35.3.1]

-   Fixed relative images URL
-   Fixed hurricane UI glitches on mobile devices
-   Fixed AWP legend gap on mobile devices
-   Fixed promoting Apple Watch Faces on devices without paired watches
-   [DEV] Update all `@capacitor/*` packages
-   [DEV] Fixed `location` module always shown debug error

# [35.3.0]

-   **Added BoM ACCESS**
-   **Added social login**
-   Fixed #625 (Waves & Wind picker have moved values by one)
-   [DEV] Rewritten following to named exports: `@windy/ogTags`, `@windy/geolocation`, `@windy/device`, `@windy/dataLoader` & `@windy/cloudSync`
-   [DEV] Rewritten following to class: `@windy/dataLoader`
-   [DEV] Use Kubernetes Runner

# [35.2.3]

-   Show minutes in radiation detail (e.g. some SaveEcoBot stations have update every 2m)

# [35.2.2]

-   Add SaveEcoBot stations

# [35.2.1]

-   Fixed glitches for outdated radiation stations

# [35.2.0]

-   **Added radiation detail**
-   Updated languages
-   Fixed missing `plugin-data-loader` for plugin developers

# [35.1.0]

-   **Added radiation POIs**

# [35.0.0]

-   **New hurricane tracker**
-   **Added HRRR models**
-   **Added user interface for native errors (mobile apps only)**
-   Added watchFaces plugin for iWatch propagation (iOS mobile app only)
-   Updated bounds for NAM Alaska, CONUS, Hawaii & iconEuWaves
-   Added webcams duplicity check when adding a webcam
-   Fixed #594 (Mobile Safari/Chrome: cannot click on article)
-   Fixed #702 (Empty space to the right of the route planner detail when devicePixelRatio > 1)
-   Fixed #708 (Arrow left/right keys does not work for radar layer)
-   Fixed #727 (Client crashes when no data from image server are returned)
-   Fixed #729 (Citytile labels are not rendered properly when switching from global to local model)
-   Fixed multiple subscription to store
-   Fixed uploader howBig method call
-   Removed unused `webcams-mobile` plugin
-   Made intersucho icons a little bit smaller (again)
-   New `log-out` icon, renamed old `log-out` icon to `share-arrow` icon
-   [DEV] **Rewrite all plugins to TS** (except of `flatpicker`)
-   [DEV] Removed `product-descriptions` plugin. All strings are moved directly to `info` plugin
-   [DEV] Build all plugins with one rollup config, without copying into `.tmp` folder
-   [DEV] Clean all build caches (rollup, eslint, ts) when `--clean` parameter is passed to `make.ts`
-   [DEV] Removed `less-compile-file` package in favor of `less.render` method
-   [DEV] Better svelte error listing
-   [DEV] Added `SAT_SERVER_HOST` and `IMAKER_HOST` to .env files
-   [DEV] Added support for multiple polygon model bounds
-   [DEV] `detail-render`, `nearest` refactored to named exports
-   [DEV] Renamed `wRender` to `weatherTableRenderer` in detail-render
-   [DEV] Added some new `@windy/utils`: `bicubicFiltering`, `clamp0X`, `lerp`
-   [DEV] Removed monkey patching of `wRender` vs `detail-render` plugin
-   [DEV] Removed monkey patching of `pois` vs `pois-libs` plugin. All POI libs and logic is now part of `pois-libs` logic.
-   [DEV] Removed monkey patching of core `detail` emitter vs `detail` plugin
-   [DEV] Removed monkey patching of core `picker` emitter vs `picker` plugin (`picker` emitter still remains in core)
-   [DEV] Updated Rollup (2.60.0), ESlint (8.3.0) & TS (4.5.2) and all their "co-dependencies"
-   [DEV] Turned off `@typescript-eslint/no-inferrable-types` eslint rule
-   [DEV] Turned on `strictBindCallApply` TS rule
-   [DEV] Updated lang files according to Crowdin changes
-   [DEV] Disabled `no-undef-init` eslint rule for Svelte files (it is used to "init" optional components props)
-   [DEV] Pimped building (speed up building avoiding type checking, fix svelte source maps, non-TS plugin warning, ...)
-   [DEV] Checking for merged model start in detail is now with a timestamp instead of index

# [34.3.3]

-   Open beta test

# [34.3.2]

-   Make intersucho icons a little bit smaller
-   Fix sounding for mobile devices
-   Fix UI error states when redeemimg subscription fails
-   Fix saving password on iOS for login/register
-   [DEV] Move webview browser logic from core to plugins

# [34.3.1]

-   Fix intersucho layers transparency
-   Fix missing `landMask` module for target mobile
-   Add `launchedBy` store object for mobile deeplink purposes
-   [DEV] Increase max build size by 1kB to 276000

# [34.3.0]

-   Better UI for restore purchases error states
-   Fix #89 (Bad precip type in detail forecast when temperature is below zero)
-   Fix `@windy/user` imports (some defaults remain)
-   Update `langs` and `register` translations
-   [DEV] Update `@windy/lang` to 3.2.2

# [34.2.0]

-   **Add InterSucho layers** (Soil moisture, Moisture anomaly, Drought intensity)
-   Convert old `extreme-forecast` plugin to new universal `day-switcher` renderer
-   Better outlined text shadowing for labels

# [34.1.3]

-   Remove temporary http user info logger

# [34.1.2]

-   Fix #707 (Custom colors does not work for ptype)
-   Fix clouds rendering when custom colors were set
-   Do not fallback on `node-users` for getting user info when `account` failed
-   Better temporary HTTP logging when getting user info failed

# [34.1.1]

-   Fix WebGL rendering issue
-   Fix particles around antimeridian in compatibility mode

# [34.1.0]

-   Enabled accelerated tiles for all layers, "Compatibility mode" was added to settings to force using old renderers
-   Optimized `gl-tile-renderer` for low-end HW and some `patternator` tweaking
-   Add `.well-known` to be mobile keychain friendly
-   Fix #83 (Citytile cached values mismatched on different zooms)
-   Fix #696 (Forecast vs reality shows only 128 hours archive instead of 168)
-   Fix #699 (App freezes on rain & thunder, precip type or thermals layer) - needs "Compatibility mode" turned on

# [34.0.5]

-   Fix showing fires empty progress bar

# [34.0.4]

-   Fix rplanner saving issue

# [34.0.3]

-   Fix `length of undefined` in `results` module

# [34.0.2]

-   Remove `Array.from` in PoisOverlay to keep old browser compatibility

# [34.0.1]

-   Replace `finally` with `then` in getting user info to keep old browser compatibility

# [34.0.0]

-   **Add ICON-D2 model**
-   **Add account login/registration logic**
-   **Allow "save last position" as default location**
-   **(premium only) Allow "save last overlay" as default overlay & save "detail1h" for next startup**
-   Add webview support for mobile apps (used for managing user profile)
-   Prefill name, surname and email in Fastspring form when user is logged in
-   Add support for general polygons in local model borders (not just rectangle)
-   Fix compass heading for myLocation.mjs on iOS
-   Fix cloud height rendering in rplanner
-   Fix tilePoint wrapping in DataTiler (+ remove baseLayer dependency)
-   Fix isoline labels
-   Fix radar animation on browser tab focus
-   Fix greek radar logo
-   Fix labels wrapping in circular wind picker
-   Fix displaying fire intensity legend on mobile devices
-   Fix #604 (No blitz sound even after user interaction)
-   Fix #614 (`stopPropagation` ClickHandler property has been applied even for `a` tags with `href` property)
-   Optimalize old patternator for better iOS 15 stability
-   Add server-side email validation when adding webcams
-   Add support for 3rd-party plugins to load specific plugin version for specific Windy version
-   Change clouds color limits
-   [DEV] **Refactored the entire core into TypeScript**
-   [DEV] **Refactored `map`, `imaker`, `format`, `http`, `urls`, `location`, `user`, `hp`, `rhMessage` and `models` to named exports.**
-   [DEV] **Changed push notifications logic! It may afect both background or foreground iOS/Android notifications**
-   [DEV] **Renamed `@windy/location` exported methods (`titleWithLang -> getTitleWithLang`, `url -> setUrl`, `title -> setTitle`), and removed `deleteSearch`**
-   [DEV] **Removed `@windy/render` in favor of `@windy/renderUtils`. Emitter is exteported as `emitter` variable**
-   [DEV] Rewrite `@plugins/gl-tile-render` and `@plugins/petternator` to TS
-   [DEV] Add optional `DEVELOPMENT_CLIENT_HTTPS_PORT` env variable
-   [DEV] Merge `favs-extends` and `favs` together
-   [DEV] Merge `@plugins/user` and `@windy/user` together
-   [DEV] Add custom rollup plugin cache, make TS incremental and use eslint cache
-   [DEV] Radar & satellite have been removed from the core logic
-   [DEV] Upgrade TS version to `4.4.3`, upgrade eslint & add svelte-check to TS-svelte validation
-   [DEV] Abandoned `mapChanged` and `globe-mapChanged` bcast events
-   [DEV] Abandoned `rs.map` object in favor of `store.get('mapCoords')`
-   [DEV] Add `AIRPORTS_HOST`, `RADAR_HOST` and `OBSERVATIONS_HOST` to .env files
-   [DEV] Upgrade to Debian Bullseye
-   [DEV] Upgrade to Node.js 14

# [33.1.1]

-   Change location high accuracy to false for non-Android devices

# [33.1.0]

-   Add public beta plugin & nginx support

# [33.0.7]

-   Fix `@windy/seo` supportedLanguages dependency for bots

# [33.0.6]

-   [DEV] Update embeded EMCWF minifest path

# [33.0.5]

-   Upgrade all `capacitor` plugins
-   Use GPS high accuracy for mobile appliactions

# [33.0.4]

-   Fix iOS patternator issue

# [33.0.3]

-   Redirect user profile actions to account

# [33.0.2]

-   Fix SST layer (fetch analysis, not forecast)

# [33.0.1]

-   Fix errorLogger

# [33.0.0]

-   **Use new billing library for Android devices.** It may also affect iOS.
-   Remove "unsupported browser" warning
-   Only image-server v3 addresses are used for all models
-   Remove unused NESDIS model
-   Fix satellite crashes on iOS devices
-   GLOBE: Added hurricane tracker
-   GLOBE: Added cap alerts layer
-   GLOBE: fixed patterns scale issue, new location issue, close before opening windy plugin and some other small improvements and fixes
-   [DEV] **`@windy/store` does not return null value anymore.** It throws an exception when invalid property is requested.
-   [DEV] Refactored `src/utils` and `src/services` to TS
-   [DEV] Add proper typings for `@capacitor/*` packages
-   [DEV] **`$` method moved to `@windy/utils`**
-   [DEV] **Remove `rs.sessionCounter` in a favor of `store.get('sessionCounter')`**
-   [DEV] **Refactored `@windy/trans` to named exports.** All translation strings are now under `t` exported property
-   [DEV] Typings with JSdoc are automatically generated for lang files in build time
-   [DEV] Allow eslint warnings in CI/CD pipeline
-   [DEV] Allow credentials for staging `/users/` requests

# [32.0.2]

-   Use account.windy.com for login and registration

# [32.0.1]

-   Use account.windy.com logout URL

# [32.0.0]

-   Fix null pointer exception for `parentNode` in Window `_unmount` method
-   CRITICAL XSS FIX: Escape HTML in `alert` plugin
-   [DEV] **Replace all icon codes with their names, also change vertical align behaviour**
-   [DEV] **make.js refactored to typescript** and simplified. Current built target is not saved any more. **Always use `make.ts --target <target>` when working on different target than default `index`**
-   [DEV] **Our build/bundle system now supports named exports** (Combination of default and named exports in one module is NOT supported yet). `W.require` and `W.define` returns either default export or all exports as object.
-   [DEV] **Abandoned `target/target.conf`. CI/CD pipelines MUST be refactored now**
-   [DEV] Updated `shimport` for converstim `ESM` to `W.define`. Now both, core files and plugin files are transpiled with shimport.
-   [DEV] All internal modules are now prefixed with `@windy/`
-   [DEV] Abandoned `filelist.js` and `src/main.*.js` files. **Bundle entry point is `src/{TARGET}.js` now**
-   [DEV] `rs.glParticlesOn` moved to `store`
-   [DEV] `rs.picker` moved to `store` as `pickerLocation`, (can be breaking for 3rd party plugins that used rs.picker)
-   [DEV] Abandoned `supportedLanguages` and simplified generating of `langEn` module
-   [DEV] Refactored `rootScope`, `utils` and `detectDevice` to TS and changed to named exports
-   [DEV] Refactored `promo`, `tinyrequire`, `http`, `store`, `storage`, `Class` and `Evented` to TS

# [31.1.1]

-   CRITICAL XSS FIX: Escape all HTML in `upload` plugin

# [31.1.0]

-   Add NAM CCL layer
-   Improve click handling on HP elements (articles, weather, ...)
-   Improve hiding HP weather when clicking elsewhere
-   Add WebGL renderer for CCL tiles
-   Fix #407 (Unlocalized strings in Settings > Particles)
-   Fix #492 (iPhone: Bad map position on app startup)
-   Fix #591 (Rplanner fav routes are renamed on their own)
-   Fix #593 (Bad closing X position in route planner)
-   Fix #597 (Set calendar mismatch the current product)
-   Fix #603 (POIs are moved to bad location when rendered during zoom)
-   Fix geolocation for Huawei mobile devices
-   Handle 401 status code when editing alert
-   [DEV] Max bundle size increased to 270kB

# [31.0.0]

-   **Add 3D globe**
-   Fix #583 (Fav POIs have nonsense values when zooming map)
-   [DEV] Support TS for core modules
-   [DEV] Rewrite `seoParser` and `router` to TS

# [30.2.2]

-   Fix getting deviceID for `@capacitor/device` plugin `v1.0.0` (it causes login issue)

# [30.2.1]

-   Change versioning of prev release (from 30.1.2 to 30.2.0)
-   Add support for `iconfont.woff2` font to CSS
-   Remove `woff2` font references to satisfy iOS AppStore requirements
-   Fix #594 (Cannot click HP article on iOS)

# [30.2.0]

-   Render CCL patterns asynchronously
-   Decrease CCL patterns size by 96%
-   Change CCL colors
-   Style CCL info window for tablet and mobile

# [30.1.1]

-   Fix & update translations

# [30.1.0]

-   Loading hpArticles is initiated from client-patch (to have full control over user experience)
-   hpArticles can be swipe to delete them on mobile device
-   Improve detail/station closing-x clickable area on mobile
-   Open HP article on mobile device just half-screened

# [30.0.0]

-   **Add Thermals layer**
-   Add haptics when detail location is changed on mobile
-   Add location search box when adding a webcam
-   Overlay instance now supports `onopen`, `onclose` methods
-   Fix "map-only bug" by improving CSS vars support detection
-   Fix #202 (Messed mixed snow and rain precip in forecast detail)
-   Fix #327 (Alerts' temperature supremum is too low)
-   Fix #334 (Wrong calculation of detail height in zuluMode)
-   Fix #379 ("Find my location" does not center map on tablet)
-   Fix #408 (Some layers have an active particles toggler even if not available)
-   Fix #442 (Color settings input boxes should not be editable)
-   Fix #448 (Picker hangs on the previous model value when model is changed)
-   Fix #453 (Last uploaded file is not removed from UI)
-   Fix #528 (Small closing 'X' symbol on desktop)
-   Fix #549 (Airport plugin has an extra red bottom bar on iOS)
-   Fix #564 (Overlays gallery is overlayed with user avatar)
-   Fix #566 (Find my location button is not active on mobile)
-   Fix #568 (Detail & station plugins have no bottom margin on iPad Pro)
-   Fix #570 (ICON GWAM and EWAM have their resolutions viceversa)
-   Fix #575 (Model resolutions for AROME and ICON-EU mismatch in info and multimodel)
-   Fix #576 (Forecast multimodel is not aligned correctly when 1h diplay is active)
-   Fix #586 (Raw TAF has no newlines)
-   [DEV] Switching from Fontastic to IcoMoon
-   [DEV] Report iCloud errors only when user has an iWatch application
-   [DEV] Update @windy/lang version to 3.0.5
-   [DEV] Add support for TypeScript
-   [DEV] Add support for PWA (not used at all)

# [29.2.4]

-   Store favs `id` to nativeStorage for mobile applications

# [29.2.3]

-   Use newly patched `leaflet140_patched_tileLayer.v17.js` to solve Android `Cannot read property 'add' of undefined` error

# [29.2.2]

-   Fix gray screen critical bug for mobile apps when user is logged in
-   Handle possible null exceptions for native plugins

# [29.2.1]

-   METAR notifications check their current state
-   [DEV] `.notap` style is now default, only `.clickable` remains unchanged

# [29.2.0]

-   Replace NOAA WW3 with GFS WAVE

# [29.1.1]

-   Fix loading lang files for mobiles

# [29.1.0]

-   **iOS, Android adHoc push notification when METAR is updated**
-   Fix #240 (POI popup remains open after zooming map)
-   Fix #307 (A day is selected from progress bar after clicking a detail on mobile)
-   Fix #553 (Some search results are duplicated when presented also in recents)
-   Fix mobile push notifications for Capacitor
-   Reset notifications from favs list as well
-   [DEV] New CLI `--debug` in `make.js` leaving env var `DEBUG` true even in prod minified build. Necessary for xcode console debbuging of prod apps.

# [29.0.2]

-   Fix current's picker direction label (not "from", but "where it blows")

# [29.0.1]

-   Fix `daysAvail` in forecast detail after `node-forecast` summary response fix

# [29.0.0]

-   **[DEV] Complete refactoring from `cordova` to `capacitor.js`**
-   **[DEV] Refactoring of some obsolete/unused parts**
-   **[DEV] Login/logout/registration refactored/simplified**
-   After logout JS app is cleaned & reloaded
-   Fix #508 (The info box disappears when you click inside, e.g. scroll bar)
-   Fix #537 (Sounding graph does not fire touchend event)
-   Fix #540 (Fog layer switches into ICON-EU, regardless on the location)
-   Change twitter username from `windyforecast` to `windycom`
-   [DEV] `rs.user` object, `isLoggedIn/Out` events are deprecated
-   [DEV] User, login, registration uses `v2` of backend API
-   [DEV] Simplified `subscription` plugin
-   [DEV] `Metric` instances or `dataSpecifications` objects can have bool property `nativeSync` to save these values to iOS/Android native apps
-   [DEV] Removed `notifications` && `notifications-service` plugins
-   [DEV] `data=do="url"` event for `ClickHandler` is deprecated
-   [DEV] `store` module slightly simplified
-   [DEV] `storage.getFile` method moved to `trans`
-   [DEV] Use `/dev/lessWindyPlugin.js` when compiling LESS

# [28.1.1]

-   Fix `subscription` plugin loading when user has already premium status

# [28.1.0]

-   New plugin `subscription-services` allowing purchases outside `subscription` plugin

# [28.0.3]

-   Saves users gps location to iOS group for use in widget
-   Removed/renamed all `.woff` fonts from mobile app in order to satisfy Apple requirement not to have this font as a part of iOS app

# [28.0.2]

-   Remove `maps` (Windy Maps promo) plugin
-   Fix #500 (The picker disapears when crossing antimeridian)
-   Fix #507 (It is not possible to drag the map after clicking inside the sounding graph)
-   `deviceLogging` now logs ONLY devices from mobile apps that want to get notifications
-   Fixes and small improvements in `debug` plugin regarding native apps
-   iOS app now store widget settings to iCloud

# [28.0.1]

-   Use `acc=maxip` only for wind gusts
-   Update translations

# [28.0.0]

-   **Implement ICON GLOBAL model**
-   **Implement CMEMS model**
-   **Complete refactoring of CSS for plugins (mostly mobile)**
-   Plugin debug contains manual tests for cordova builds (unprotected)
-   Plugin multimodel contains location name on mobile
-   Plugin station now loads compare forecast model as option
-   Graphical tweaks of detail & station plugins
-   Small fixes of airport, station and alerts plugins
-   Remove `convert-alerts` plugin (it has never been used)
-   Webcams support different types (no history at all, last 24h, classic)
-   Open any webcam does not change zoom level unless it is open from search results
-   Show PurpleAir logo for PA aqi stations
-   At most 4 models can be displayed at map, others are now under dropdown menu
-   Fix long time issues in isolines
-   Fix notifications list styles
-   Fix #410 (GFS 975h isoline is not displayed even if it is available)
-   Fix #478 (Rplanner routes are displayed at search results)
-   Fix: Rendering legend upon start-up, with lazy loaded color gradient in `info.json` caused exception
-   **[DEV] Abandon `.has-statusbar` and `.iphonex` classes in favour of CSS env variables**
-   **[DEV] Removed svelte_plugin_wrapper & onclosed call, calling Svelte destroy method externally**
-   **[DEV] Method `Layer.getParams` is async now**
-   [DEV] Webcams selected time period is not stored into store
-   [DEV] Body tag contains `style="width: 100vw; height: 100vh;"` to ensure fullscreen mode in cordova
-   [DEV] Slight refactoring of Product classes
-   [DEV] All Svelte Plugins now unmountOnClose by default
-   [DEV] Removing `.switch` elements from UI of airport, station and alerts plugins
-   [DEV] Simplification of user, userShared, subscription and pendingSubscription plugins
-   [DEV] Elements `.premum-flag, .premium-logo` are now SVG
-   [DEV] Introduce new major class `.plugin-mobile-bottom-slide` & abandoned `.plugin-mobile-fullscreen*`

# [27.3.1]

-   Fix user avatar & menu at settings for mobile devices

# [27.3.0]

-   Improve displaying premium badge
-   Hide exporting GPX/KML from route planner for mobile devices
-   Fix favs loading after relogging on mobile devices
-   Fix logging out issue on mobile devices
-   Fix missing subscription products in some cases for mobile devices
-   Fix some minor subscription/login/register UI glitches for mobile devices
-   Fix iPad top padding/margin when iPad "wants" to be a desktop
-   [DEV] Improve PushNotification cordova plugin initialization
-   [DEV] Small refactoring of `subscription` plugin (code splitting into more files)

# [27.2.1]

-   Improve satellite type switcher
-   Show conversion to the month for subscription prices
-   [DEV] Remove `pluginScope` in a favor of `this` (as it is supported since 27.0.0)

# [27.2.0]

-   **Support one-time payment premium**
-   Better premium propagation (small UI changes)
-   Premium users can change their default startup layer
-   Satellite fixes and improvements (custom "INFRA+" color palette; tweaking "BLUE"; added 12h interval to mobiles)
-   Rplanner supports uploading GPX file (select or drag&drop); could be open from uploader as well
-   Fix remaining elements in DOM after logging out
-   Fix #415 (Webcams do not show pictures, just plain div)
-   Fix #419 (Embed propagates non-existing free API)
-   Fix #420 (Plugins' cards overflowed box, then scroll bar appears) & fix cards width on tablet devices
-   Fix #421 (Sounding plugin moves whole map when dragging)
-   Fix #422 (Ambiguity in favourite/favorite, now american form "favorite" is prefered)
-   Fix #433 (Products' translations are not shown)
-   Fix #437 (On opening webcam, map is not centered)
-   Fix #440 (Weather stations without temp fall into endless loading)
-   If notifications are disabled for some device, its default value is "off" in a settings
-   Add `token2` to `/sedlina/ga/*` requests
-   Update translations
-   [DEV] Images subrepository is defined as a relative path

# [27.1.3]

-   Increase labels version to `1.4`

# [27.1.2]

-   Fix ClickHandler in notifications settings
-   Fix fav/alert title in searchbar after opening detail

# [27.1.1]

-   Hide subscription satellite info

# [27.1.0]

-   **New notification plugin and service** (support for push notifications, notification preferences, notification history)
-   Add support for Google's on-hold subscription state (required since Nov 2020)
-   Change subscription propagation in a detail
-   Show conflict error message when restoring already assigned subscription (FS only)
-   Adjust map animation speed for 1h forecasts
-   Fix #285 (Particle range sliders in settings are not styled)
-   Fix #348 (Favorites and Alerts are duplicated in a start-up location)
-   Fix #369 (Units cannot be changed for mobile satellite picker)
-   Do not allow adding webcams from windy.com domain
-   Add polyfills for all `Math` methods
-   Collect deviceId
-   Improve app reloading and mobile intents
-   Update translations
-   [DEV] Plugins can load more lang files
-   [DEV] Move `webcams-add` and `webcams-edit` shared input component to `webcamsShared`
-   [DEV] Add community and articles backend URL into `.env.*` files

# [27.0.5]

-   Fix, wrong fav POI for logged-in user

# [27.0.4]

-   Fix `convert-alerts`

# [27.0.3]

-   Fix displaying wx stations in search results

# [27.0.2]

-   Hotfix: highp error in satellite

# [27.0.1]

-   Hotfix: substr of undefined in pois.mjs

# [27.0.0]

-   **New version of `satellite` renderer featuring BLUE version of view**
-   Satellite optical flow works on mobile devices
-   Fix route planner duplicity info window two times in DOM
-   Favourites support new type of item: `route`
-   Route planner enables to store any route as favourite (logged-in users only)
-   Add prefetching for webcam detail from nearest webcams
-   Add button for adding new webcam into nearest webcams
-   Handle adding duplicated webcam
-   Improve styles for nearest webcams
-   Fix plugin's exclusivity
-   Reduce amount of sending statistics
-   Partly fix #91 (Keep arrow keys navigation within detail bar)
-   Fix #228 (Wind and waves map roses still multiplied time, by 1.5)
-   Fix #315 (Alert slider: number value does not reflect the value from the slider for rain & snow)
-   Fix #351 (Isolines blinking between switching)
-   Fix all `wError` calls
-   Change webcams canonical URL
-   Add `Math.hypot`, `Number.MAX_SAFE_INTEGER` and `Number.MIN_SAFE_INTEGER` polyfills (v13)
-   Closing `menu` and `overlays` on mobile devices by swiping right
-   Change client's HTTP cache behaviour to 5m TTL
-   Update translations
-   [DEV] **Plugin built system simplified, based solely on `rollup`. Each plugin is now single `W.define(...)` module.**
-   [DEV] **Simplified built of `svelte` plugins, introducing `SvelteTag` class**
-   [DEV] **Build system use web-workers to compile plugins faster**
-   [DEV] Updated `PLUGINS.md`
-   [DEV] `rollup.config.js` in no more required for plugins
-   [DEV] `W.require` now acceps context of `this`
-   [DEV] `W.define` now accepts optional `css, html` code. `W.tag` is supported only for backward compatibility
-   [DEV] Added `no-use-before-define` and ingonrePatterns to `.eslintrc`
-   [DEV] `make.js` now supports `--verbose` mode
-   [DEV] Fix vscode ESlint runtime

# [26.1.6]

-   Fix faulty animation plugin

# [26.1.5]

-   Fix missing default leaflet icons in uploaded `kml` files

# [26.1.4]

-   Fix missing KML, GPX leaflet libs in `upload` plugin

# [26.1.3]

-   Fix UI glitches in `info` plugin for mobiles

# [26.1.2]

-   Fix Huawei "Restore purchases" button

# [26.1.1]

-   Hotfix: Badly rewritten `wError` calling in login, register and isolines

# [26.1.0]

-   **Add support for 6h ECMWF update**
-   **Show different map for India and hindi language**
-   Complete refactor of `login` and `register` plugins for mobile apps
-   Add minifest auto-refreshing (30 minutes interval)
-   Limit maxTileZoom for ECMWF Waves to maximum 3 (waves, swell (1, 2, 3), wind waves)
-   Fix satellite picker bug and IR collor tweaks
-   Fix the most common errors from Kibana
-   Fix some minor UI issues
-   Fix sharing webcam's timespan in a text link
-   Fix #142 (meteoblue and arome buttons are disabled on wind tab in detail)
-   Fix #262 (Tide station title not centered)
-   Fix #308 (Unavailable timespans for newly added webcams)
-   Fix #316 (Multimodel doesn't reload when location changes)
-   Fix #319 (Timestamp bar shows sometime missmatched UTC and local time)
-   Fix #326 (Fog and cap alerts should not allow toggling particles)
-   Fix #349 (Empty nearest webcams on mobile screen is not visible)

# [26.0.5]

-   Fix mobile app login when password manager is used

# [26.0.4]

-   Fix unhandled URI malformed exception (eg for: `/ja/-%E7%B4%AF%E7%A9%8D%E9%9B%A8%E9%8F-rainAccu`)

# [26.0.3]

-   Add user avatar and name to tablet's fav list
-   Fix immediate deletion of alert after adding (mongo race condition)
-   Fix getting user info after login/registration (mongo race condition)
-   Reset notifications of active alerts on favs open

# [26.0.2]

-   Hotfix: Bad reftime when switching different products & isolines

# [26.0.1]

-   Hotfix: Missing favs in settings dropdown list
-   Hotfix: Use `isNaN` instead of `Number.isNaN` (IE11)

# [26.0.0]

-   **New favs & alerts plugins** (complete fullstack refactor, add unsynced favs logic, better syncing, ...)
-   **New users & user-menu plugin** (centralizes logic of user avatar into one place)
-   Add `notification` plugin (handles avatar notification icon and user-menu texts)
-   Add plugin to assigning anonymous alerts
-   Add an option to delete personal data into settings
-   Fix browser JS compatibility issues (it affects plugins: `animate`, `radar` sound, `rplanner` ifr, `webcams-embed`, downloading files in `distance`, `rplanner`, `upload` and `animate`)
-   Fix picker tile interpolation
-   Fix plugin dragging & plugins autoload URL
-   Fix webcam detail when server fetch failed (eg. 404)
-   Fix sharing links on target mobile (eg. `webcams`)
-   Fix some minor style issues for phones and tablets
-   Fix #66 (Invalid articles url opens a blank window)
-   Fix #117 (Meaningless label values for sea overlays)
-   Fix #256 (Errors when selecting deg0 isolines in GFS model)
-   Fix #261 (Tiles are downloaded from a higher zoom level)
-   Fix #266 (Leftover webcam markers on the map after closing airport)
-   Fix #276 (Webcams dalylight switch hitbox too large)
-   Update translations
-   [DEV] Remove `riot` completely
-   [DEV] Remove `mytags` completely
-   [DEV] Add `curly`, `no-var` and `no-tab` eslint rule and `compat` plugin

# [25.4.7]

-   Fix incorrect values in hurricane tracker
-   [DEV] Do not add EMCWF WAM and GFS into `index.html`

# [25.4.6]

-   Revert webcams detail switching because of Safari mobile bug

# [25.4.5]

-   Fix #267 (Could not finish subscribing on tablet because of a thrown exception)

# [25.4.4]

-   Plugin `plugins` is allowed only for target `index`
-   Fix AirQ logo on mobile devices
-   Fix styles for `.plugin-mobile-bottom-slide` on statusbar phones
-   Fix #233 (fixed in `25.2.0`) for mobile devices

# [25.4.3]

-   Hotfix: Disable plugins for mobile

# [25.4.2]

-   Hotfix: Fix Safari scroll issue in `settings` plugin

# [25.4.1]

-   Hotfix: Remove findIndex from detailBar.js

# [25.4.0]

-   **New plugins plugin** (complete refactor, custom sorting, protected autoloading, posibility to open more plugins, ...)
-   Fix #75 (Overflowing PWS name)
-   Fix #198 (Webcam preview in webcams-detail should show a thumbnail when loading)
-   Fix #210 (PWS detail overflowing if reporting only a few metrics)
-   Fix #224 (Disable clicks on avatar on mobile when dragging the calendar)
-   Fix #238 (Glitching webcam rounded corners on iOS)
-   Fix #242 (Wrong hour values on detail progressbar)
-   Fix #244 (Search loader not going away)
-   Fix #247 (Color settings not showing currently selected unit)
-   Fix #242 (Wrong hour values on detail progressbar)
-   Split `promos` module to `promos` and `permanentPromos`
-   Refactor of `permanentPromos`
-   Plugin `patch` is now launched from `main.js`
-   Add promo for 1h forecast when user moves timestamp progress bar
-   Fix possible ANR on mobile by not detecting `deveciready` event
-   Revert plugin system loading mechanism to previous version
-   Fix `tools`, `settings` and `favs` plugin opening on desktop

# [25.3.0]

-   **Add air quality POI layer and AQI (air quality) station detail** - so far only for desktop
-   **Add new CAMS layers (go3 & tcso2)**
-   Add support for getting layer colors from info.json
-   Fix left & right arrow navigation for rplanner
-   Display speed option even for elevation tab in rplanner
-   Change pressure colors, CAMS colors step size & CAMS global data quality
-   Do not throw error for `node/umisteni` when `undefined` is returned
-   Fix missing top margin in `contextmenu` in iPhone, iPhone X+
-   Fix displaying webcams elevation when its value is 0

# [25.2.1]

-   Hotfix: hide old hurricanes in hurricane tracker

# [25.2.0]

-   **Plugins `animate`, `cap-alert`, `colors`, `debug`, `distance`, `hurricanes`, `info`, `login`, `multimodel`, `register`, `tides`, `widgets` refactored to `svelte`**
-   Refactor detail (it affects plugins: airport, meteogram, detail, multimodel, station)
-   Fix #114 (detail, station mobile scrolling)
-   Fix #232 (METAR displayed "remark: null")
-   Fix #233 (opened aiport plugin did not closed webcam detail plugin)
-   [DEV] Remove `.editorconfig`
-   [DEV] Remove `detail-webcams`, `globe`, `hiring`, `licence` and `privacy` obsolete plugins

# [25.1.0]

-   **Use v2.7 forecast endpoint (no hours shifting)**
-   **Add speed option for route planner (rplanner)**
-   **Rewrite `user` plugin into svelte**
-   Add 250hPa flight level for IFR rplanner view
-   Fix smooth satellite animation for video recording
-   Fix #205 (wrong comparison of similar wind directions at station detail)
-   Fix #217 (subscription UI polishing)
-   Add GFAS description
-   Update translations
-   [DEV] Shell scripts moved from `.` to `./dev`

# [25.0.0]

-   **Satellite optical flow**
-   Minor subscription improvements and fixes (1h switching is not permanent, custom error message for invalid payments, closing buying window on iOS, retry failed communication with backend servers, PayPal payments, switching 1h/3h forecast is not permanent, ...)
-   Fetch user info from `/users/info` after registration
-   Add support for custom query parameters in URL (PayPal payments needs that)
-   Fix closing nearest-webcams-mobile plugin with back button on android
-   Fix #93 (rhBottom message is too cluttered for satellite and radar)
-   Fix #94 (nearest webcams loader holds its height)
-   Fix #97 (article titles overflow their box)
-   Fix #118 (empty label popup in detail)
-   Fix #133 (closing video plugin)
-   Fix #144 (rendering detail lazy parts if the plugin is closed)
-   Fix #190 & #191 (ToU links)
-   Fix #200 (expert menu overflows the view)
-   [DEV] Improve error logging and reporting
-   [DEV] Add onurl support for svelte plugins
-   [DEV] Upgrade prettier to version 2
-   [DEV] Fix tests & update cypress
-   [DEV] Fix proxy minifests
-   [DEV] Fix clickjacking in iframe
-   [DEV] Remove `_donate` and `_lookr` plugins

# [24.0.5]

-   Add "Restore purchases" for FastSpring payments

# [24.0.4]

-   Hotfix: Add "Restore purchases" button to failed state screen in subscriptions

# [24.0.3]

-   Hotfix: Automatically retry failed subscription payments

# [24.0.2]

-   Hotfix: Improved error reporting for subscriptions

# [24.0.1]

-   Hotfixed missing Windy plugins list

# [24.0.0]

-   **Subscription** (1h forecast)
-   Use new search `v3.1` endpoint which supports searching webcams
-   Group air quality products and display NASA logo
-   Add everything for lazy reftime: forecast (point, meteogram, citytiles) ! NOT APPLIED YET !
-   Fix #96 (mobile app deeplink)
-   Fix #112 (fix missing forecast after `back2home` event)
-   Fix #137 (fix favs rendering after removing some)
-   Little improvement of #114 (unwanted detail scroll on mobile), but still not fixed
-   Fix webcams player when slider is dragged or timeline is clicked while playing
-   Decrease size and clean up all icons
-   Replace privacy plugin with Privacy Policy document at account.windy.com
-   [DEV] Use FileStore
-   [DEV] Fix TagPlugin open and init method
-   [DEV] Windy store can be implemented in svelte plugins as a svelte store (`plugins/common/utils/svelteStoreAdapter.mjs`)
-   [DEV] Add script for pushing client with custom `.env` files to test.windy.com

# [23.3.0]

-   **Add webcams timespans player**
-   Add webcams agreement link
-   Refactor webcams fullscreen logic
-   Improve startup location for Android app (use backup if GPS is not available)
-   Fix issue #62 (sync of favourites and settings)
-   Fix unwanted scrolling of detail/station on iOS
-   Fix rendering stations without temperature
-   Fix update interval info for CAMS global
-   Rewrite all `r?em` CSS values to `px` for all `webcams*` plugins
-   [DEV] Add host URLs config file using .dotenv

# [23.2.2]

-   Revert issue #82, client do not respect minifest anymore

# [23.2.1]

-   Add tile scaling while server maxZoom is not enough

# [23.2.0]

-   Fix issue #63 (it is possible to link metrics and its values together)
-   Fix issue #65 (share link has a priority over startup location)
-   Fix issue #67 (original author link opens target page in a new tab)
-   Fix issue #82 (client respects zoom property from minifest)
-   Fix issue #84 (better handling min size of device resolution)
-   Fix issue #86 (nearest webcams plugin overflows out of the viewport)
-   Fix issue #87 (og:image is now at `full` size)
-   Fix issue #88 (detail progress bar did not follow model)
-   Fix issue #90 (progress bar is no more linear)
-   Fix issue #95 (fix convert units to _sm_)
-   Update translations
-   Remove `fullscreen` as dependency from `rhpane` (load the plugin on demand)
-   [DEV] Limit size of final, minified output `index.js` file to 240.000 bytes (can be changed in `dev/minify.js`)

# [23.1.1]

-   Release new API lib

# [23.1.0]

-   **Add webcams-fullscreen plugin**
-   Refactor fullscreen handler
-   [DEV] Allow onclose method async

# [23.0.7]

-   Fix "Change pwd" and "Change img" user links
-   [DEV] CICD fixes

# [23.0.2]

-   [DEV] CICD redesigned

# [23.0.0]

-   **Add webcams embed configurator**
-   **Refactor nearest icons at detail**
-   **Refactor `data-do=url,*` links** (it may affect all links and also their color)
-   **Remove donations**
-   Refactor ClickHandler
-   Add button for adding new webcam when webcams pois are active
-   Add blinking webcam icon to the map when some webcam detail is open
-   Rewrite `share` plugin into svelte
-   Improve bottom slider behavior
-   Improve webcams image preloading
-   Fix webcams preview loading (do not show undefined texts and empty elements)
-   Fix href links (rewrite to `data-do`)
-   Fix webcams SEO URLs when georeverse has no data for the location
-   Fix nearest webcams mobile styles
-   Fix favourite location initialization
-   Fix article upvoters popup window styles
-   Show pulsing webcam icon when webcams-detail is open
-   Allow forcing metrics precision
-   Remove beta info from satellite and route planner
-   Make core service from articles ogTags
-   Change og:tags for webcam details
-   **[DEV] Add HOC to all svelte components to correctly propagate close & open events**
-   [DEV] Unify formatting!
-   [DEV] Solve all build warnings and ESLint issues
-   [DEV] Check ESLint during build
-   [DEV] Add less autoprefixer for plugins
-   [DEV] Fix files watching (CPU usage issue on MacOS)

# [22.3.3]

-   Improve selection of webcams quality on `/webcams` landing page

# [22.3.2]

-   Fixes `location` SEO related BUG
-   Fixes Safari/Chrome bug incorectlly handling positions inside transformed element
-   Fix Edge `nearest-webcams` popup window position BUG

# [22.3.1]

-   Fix empty webcams list on mobile devices

# [22.3.0]

-   **Add plugin for webcams removing request**
-   **Further refactor and another improvements of all webcams plugins**
-   Rewrite `nearest-webcams` plugin to svelte
-   Add `nearest-webcams-mobile` plugin
-   Remove `webcams-preview` plugin (the logic is contained in `nearest-webcams`)
-   Remove `webcam` plugin (the logic is contained in `nearest-webcams-mobile`)
-   Change Google Places API key
-   Remove all references to webcams.travel and lookr.com
-   Fix pois icons on zoom levels 16 - 18
-   Fix meteogram double rendering error in airport metar plugin
-   Fix detail mobile scroller
-   Fix station mobile slider
-   Fix OSM attribution
-   [DEV] Add contribution guide

# [22.2.1]

-   Fix satellite empty store bind event

# [22.2.0]

-   **`satellite` plugin replaced with completelly new version**
-   New uiClass `BottomSlider` and css styles for mobile plugins that slide from bottom
-   `articles`, `webcams-detail` slides just to half of a screen when launched from URL
-   Added satellite picker metric (K, °C, °F) and fixed conversion bug
-   Satellite colors set to Turbo Rainbow
-   Fixed aspect ratio any many other fixes for `webcams` and `webcams-dsetail` mainly for mobile
-   Possibilioty for plugin system to have igored directories or to have shared code [See docs](docs/PLUGINS.md)
-   Active fires POI layer is now selectable on mobile devices
-   Each instance of `Metric` class can have defined NA value

# [22.1.3]

-   Fixed `router` that mistakinglly preferred qs over route params

# [22.1.2]

-   Proofread webcams

# [22.1.1]

-   `articles` plugin refactored to rollup
-   Articles on mobile are now slided from bottom
-   Important fix on `detail`, `station` for mobile. Legen is hidden onscrolllend preventic erratic behaviour on iOS 13
-   Reverted to `webcam` plugin on mobile phone

# [22.0.0] webcams-satellite2

-   **Complete refactor of webcams (remove `lookr.com` and `webcams.travel` dependency)**
-   **Add new version of satellite layer (faster, higher resolution and less data downloads)**
-   Add picker for the new satellite layer
-   Change satelitte colors (based on human color perception)
-   Add form for adding new webcam
-   Add form for editing an existing webcam
-   Add list of all webcams
-   Add webcam detail
-   Add webcam preview
-   Allow mark any webcam as favourite and show them in favourite list
-   Refactor the nearest webcams
-   Remove lookr plugin
-   Remove old webcam plugin
-   Remove calling old `/node/webcams2` endpoint and use new `/webcams` microservise instead
-   Add `distance` metric to settings
-   Unify CSS styles for `input[type="text"]` and `input[type="password"]`
-   Add `pulsatingWebcamIcon` to `MapClasses`
-   Allow custom friendly SEO URLs not based on title
-   Add `timeout` option for http module
-   Use `format.animateViews` in article renderer
-   Add dev mode for compiling svelte plugins
-   Add prettier settings

---

# [21.5.5]

-   Fix Windy Maps promo images after redirecting windymaps.com domain

# [21.5.4]

-   Reduced no click area around mobile menu

# [21.5.3]

-   Fix CSS z-index for WindyMaps promo

# [21.5.2]

-   Fixed URLs for WindyMaps apps

# [21.5.1]

-   Mobile menu has better clickable area and `hp-weather` sets class faster

# [21.5.0]

-   **`detail` plugin was refactored to rollup**
-   **New format of query strings `www.windy.com/plugin_name?param=value`**
-   **Active `fires` as new `poi` and also as new `overlay` and `product`**
-   `cloudSync` now synchronizes only settings that were changed
-   Ortophoto zoom 3 - 13 now served from our own tile server
-   `pois` plugin renamed to `poi-libs` and refactored to rollup
-   `map` plugin renamed to `pois` in order to avoid conflict with Windy Maps
-   New `maps` plugin as propagation of Windy Maps
-   Fixed click on WX station from favs

# [21.4.2]

-   Fix favorites keyboard issue

# [21.4.1]

-   Add satellite layer for the API

# [21.4.0]

-   **URL can now contain query string in a form `www.windy.com/plugin_name/qs:escapedQueryString?lat,lon,zoom`**
-   Small improvement of `alerts` plugin, than now can save alert only for registered user

# [21.3.2]

-   **Uses newly patched `leaflet140_patched_tileLayer.v16.js` to solve iOS 13 issues**
-   Mobile app opens links into external browser rather in inappbrowser

# [21.2.2]

-   Universal Link on iOS finally implemented
-   Ugly iOS 13 fix emulating `contextmenu`

# [21.1.0]

-   Code splitting and slight refactoring of `stations` plugin (now built by rollup)
-   `wmo,madis,pws` weather stations display precipitation

# [21.0.1]

-   Fixed pasive listener on `Drag`

# [21.0.0] - refactoring-discontinued-lhpnae

-   **Discontinued `lhpane` plugin in favour of huuuuge simplification**
-   **`airport` plugin refactored to mytag and made more robus including some offline usage support and better swipe gestures**
-   **`favs` plugin refactored to SVELTE and touch gestures improved**
-   `favs` and `favsExtended` now check incoming type on cloud sync so favs type `stations` can be finally synchrnozied
-   `settings` refactored to SVELTE
-   `tools` plugin refactored to mytag
-   `commons` plugin (reusable RIOT tags) discontinued
-   New plugin `gestures` so far containing `Pull2Refresh` class
-   A lot of cypress tests fixed
-   Class `RiotPlugin` supports `unmoutOnClose` property
-   Added unmountOnClose to a lot of riot plugins
-   New LESS mixin for better creation of LHpane plugins
-   Fixed combination of offline message an `.plugin-fullscreen-mobile` together
-   `alerts` <--> `favs` relation decoupled and simplified
-   Tweaked all former lhpane plugins: `debug,hurricanes,alerts,favs,settings,tools,colors,privacy,uploader,plugins` mostly just CSS
-   Simplified `commons` plugin
-   Removed unused `map-paint` plugin
-   Removed `greta-thunberg` plugin
-   `aod550` layer is now log2 encoded

---

# [20.11.0]

-   Suspended settings box in rh mobile menu (replaced with settings link)
-   Donate & other small CSS fixes

# [20.10.0] nearest-stations

-   **Better nearest Stations**
-   `TagPlugin` can be unmounted on closing
-   Complete refactoring of `nearest` plugin, showing circles with nearest webcmas a and nearest stations, that also lead to slight simplification of `detail` plugin
-   Complete new `nearest-stations` plugin
-   Mobile radar/sat minimenu extended as switch
-   Slight refactoring of `waves`, `donate` plugins
-   Fix #59: Do not show "last update" box if data is missing
-   Fix adblock issue: Use `umisteni` and `connection` URLs instead of `geoip` to rip adblocks off

# [20.9.2]

-   Publish new API lib to reflect new `patch` plugin name

# [20.9.1]

-   Fix publishing articles for all countries

# [20.9.0]

-   **Discontinued support for `react` in client plugins**
-   `article-publisher` refactored to svelte from react
-   Better fix of #29
-   Nearest stations fix onmouse over
-   Fix radar & satellite overlaying over article on mobile

# [20.8.0] annotations-discontinued

-   **`annotations` feature discontinued**
-   Articles can position map to specified location and even open `upload` (KML, GPX, geoJSON) specified as "internalURL". After closing an article upload and map stays at the position.
-   `patch` vs `ptch-lib` plugin simplified
-   `p:off` property is no more supported in search string of URL (people complained that tehy lost particles when they clicked on some URL)
-   `upload` plugin called as a method accepts more params (not to move bounday or not to show URL)
-   Small CSS fixes for iPhone X (radar/sat bottom)
-   Removed all links to `webcams.travel`
-   Add bengali language
-   Update all translations
-   Add IFR and Airgram for rplanner
-   Add more wind marks for VFR rplanner
-   Underline clickable units in detail and rplanner
-   Fix freezing altitude for rplanner
-   Fix #17 - NEMS does not have `ptype` forecast
-   Fix #29 - the picker up to 12 zoom level does not show values
-   Fix #58 - lightning text (it is uncountable)

# [20.7.2]

-   Publish new API lib which supports patching using `client-patch` for lib target

# [20.7.1]

-   Better loading in `overlays` galerry view

# [20.7.0]

-   Refactoring of `plugins` [lugin now with gallery of avail plugins]

# [20.6.5]

-   Fixed `greta-thunberg` title typo

# [20.6.4]

-   Fix rplanner `view` URL for mobile devices

# [20.6.3]

-   Fix rplanner clouds issue
-   Add rplanner `view` to URL

# [20.6.2]

-   Adjustmens of gthunberg tracker

# [20.6.0]

-   `greta-thunberg` tracker

# [20.5.2]

-   `overlays` plugin contains list/gallery view (desktop only)
-   `screenshot` css fixes
-   `router` has possiibility to take item from URL and modify item in a store

# [20.4.3]

-   Fix: rplanner, switching to ECMWF now waits for overlay change
-   `lib` deploy is now versioned

# [20.4.2]

-   Fix: `isNear` bug
-   Fix: `colors` again supports pre rendering of `wind` and `temp`
-   Desktop menu now contains Articles, but removed Annotation
-   External language files for plugins are fully loaded as depedency making whole system simple and transparent
-   `langUtils` moved to `@windy/lang`
-   Route planner has been improved (switch to change direction of movement, reverse route, uncountable ammount of minor fixes)

# [20.3.0] - route-planner

-   **Completelly new functionality and plugin `rplanner` as a replacement of `distance` tag on desktop**
-   `dev/pluginCompiler` now supports individuall rollup cfg for any plugin
-   new uiClass `TimespampBar`
-   `colorsExtended` abandoned, integrated into the `colors`

# [20.2.1]

-   Fixed `docker:dind` in `.gitlab-ci.yml`

# [20.2.0] - refactoring

-   **Refactoring in favour of native ES6 methods**
-   **`uglufy-js` minifier replaced by `terser`**
-   Discontinued `_.include, _.contains, _.isArray` in favour of `Object.assign`, `Array.includes` and `Array.isArray`
-   New js lib `polyffils.v10.js`
-   Discontinued pollyfils for `requestAnimationFrame`
-   Main js bundle is loaded `async`
-   Small promo for new mobile Radar/Sat icon
-   `./make.js` is ready for es7 builds

# [20.1.1]

-   Add nginx imaker cache

# [20.1.0]

-   Satellite improvements, better loading, sppedSwitch, goatJoke
-   Fixes #11, #25, #44

# [20.0.2]

-   Fix typo

# [20.0.1] - satellite-mangling

-   **Completelly new functionality `satellite`**
-   **Implemented data & url mangling for `point`, `archive` and `meteogram` forecast**
-   New plugin `radar-sat` containing join CSS rof radar & satellite plugins
-   Another hundreds of client side tests
-   `animate` contains special animation type for radar & satellite
-   `extreme-forecast` supports keyb. shortcuts
-   Isolines, picker, settings fixes
-   New handling of keyboars shorcuts LEFT & RIGHT. Product is responsible for it via `moveTs` method
-   `radar` now supports keyboard shortcuts
-   New overlays menu containing "virtual categories", so far `airQ`, `eadarSat`
-   Overlays can have a property `alwaysOn` to be always in menu despite user settings
-   Mobile UI has new radar sat icon with micromenu
-   `Color` instances now uses `Math.round` when preparing color tables
-   `Layer` do not contain circular rependency any more

---

# [19.18.2]

-   Fixes #41, #43
-   Simplification of mobile app launch. `lastCordovaHash` and time is no more used
-   Removed iOS keyboard and resize hacks
-   Simplification of `mobileIntent` (UNTESTED)

# [19.17.0]

-   `article-publisher` now enables to set `version` and `target` (in order to server articles ONLY to mobile apps or vice vers)

# [19.16.0]

-   Favs pagination

# [19.15.0] - extreme-forecast

-   **Completelly new overlays `efiRain`, `efiWind`, `efiTemp` and plugin `extreme-forecast`**
-   Hundreds of new automated tests
-   Better SSL support for development
-   CICD `-test` tags removed

# [19.14.5]

-   `detail` bug making slider icons small on mobile fixed
-   `donate` on mobile has 5EUR amount again and 2019 goal was increased to 500.000
-   `settings_map` no more syncable

# [19.14.4]

-   CICD changes, added new version of `embed2`, `lib` and `mobile`, docs updated

# [19.14.3]

-   Various small bugfixes in `stations`, `articles`, `uploader`
-   Radar overlay is ALWAYS in overlays menu (can not be switched off)

# [19.14.2]

-   **New production branch, CICD change**
-   Various bugfixes

# [19.14.0] - map-layers

-   **Completely new plugin `map-layers` for changing Outdoor map layers and containing map scale**
-   `renderTile` back to its original version
-   Outdoor map now contains also picker with elevation
-   Handling of `#rh-bottom-messages` now handled by new module `rhMessages`
-   Finally, instances of `Product` are also closed
-   Added `elevation` and `distance` metrics
-   `picker` can now display values load async
-   Tweaks and bug fixes

# [19.13.0] - CAMS

-   **Added CAMS (Copernicus Air Monitoring Service) air quality layers**
-   `renderTile.ts` contains ugly hact to be able colorize tiles with big differenc in between dataZoom and mapZoom. **refactor!!**
-   `Calendar`, `Product` are now ready for version 3.0 of minifest
-   A lot of small tweaks and sometimes nasty hacks in favour of CAMS in a lot of modules including `ProductSwitch`, `format`, `models`, `Layer`
-   Uploader now lists editor selected files
-   POIs selector still visible with Hiking map
-   Changed locality/suburb precedence in georeverse
-   Plugins `leaflet-kml` and `leflet-gpx` discontinued and compiled together with `upload`

# [19.12.0] - uploader

-   **Completely new functionality `uploader` and `upload` enabling to upload GPX, KML or GeoJSONs**
-   **`pluginCompiler` is able to compile `svelte` plugins**
-   New `utils` stuff for forcing file download or copy 2 clipboard
-   New plugins `leafle-kml` and `leflet-gpx`
-   Small refactoring of several files in favor to central download/copy utils

# [19.11.1]

-   Vietnam, India blocked from using detailed Seznam map

# [19.11.0] - hiking-map

-   **Completelly new overlay `map` with Seznam hiking map**
-   `animate` introduces blended intermediate frames
-   `annotate` has message to prevent save of tests

# [19.10.3]

-   Fixed embed metric bug

# [19.10.2]

-   Fixed detail when celestial returns permanent day

# [19.10.1]

-   `TiledPois` and `distance` CSS and styles fixes

# [19.10.0]

-   `articles` now support our own videos hosted on `i.windy.com`

# [19.9.0] - automatic-translate

-   **`langUtils` can automatically translate missing phrases**
-   `donate` plugin simplified. No more subs.
-   `multimodel` small fixes
-   `token2` can be delivered from localStorage from prev session as provisionary
-   Fixed wrong window detection in `animate`

# [19.8.0]

-   Completelly new animate plugin based on ffmpeg worker and producing mp4 videos

# [19.7.2]

-   Fix article publisher

# [19.7.1]

-   Change JWT secret

# [19.7.0] - extended-forecast

-   **`extended forecast` Detail forecast now supports 10 days forecast**
-   **Simplified `mobile-menu`**
-   `nearest` webcams simplification. Mobile version now displays changing webcams as in desktop.
-   A lot of small fixes in detail
-   Completelly new product `mblue` serving as replacement for onld `nems` in point forecast
-   Products are now separated into point products and map products. It simplifies `detail` and related plugins. Both are defined in `rootScope`
-   Observation obsolete note when `station` is opened that has latest obs older than
-   Stations now contain logo & link to provider of PWS, plus promo for Windy Stations
-   Small fixes in article publisher and nginxtoken
-   New plugin `promo-mobile-intro` for mobile apps

# [19.6.0]

-   `animate` plugin now generates `webm` videos by default

# [19.5.4]

-   Fixed embed nginx config (serving meta tags)
-   JWT - configure k8s secrets instead of file from repo token.txt

# [19.5.3]

-   Finally some promo on API4 apps
-   Fixed API4 Leaflet marker locations

# [19.5.2]

-   New translation strings
-   Crowdin API - removed untranslated keys in export

# [19.5.1]

-   Fixed article with annotation
-   Reduced amount of articles on Desktop to 2
-   Link to animate plugin from menu
-   More restrictive API4 usage

# [19.5.0]

-   Article comments discontinued (just link to community)
-   ATOM, RSS links for article feeds
-   `radarProviders` are not part client and served client side
-   **Updated `embed2` target**
-   embed2 enhancements: ga loggin via sedlina, cleaner CSS (using body id="target..."), new type `station`
-   Target `electron` discontinued
-   **Updated `API4` codes**

# [19.4.0] - animation

-   **Completelly new functionality and plugin `animate`**

# [19.3.0]

-   `overlay` plugin enables to filter layers by keayword
-   `hpArticles` important fix
-   Inreasing detail level in reverse geocoding in detail
-   Leaflet 1.4 CSS important fix

# [19.2.0]

-   Using new search API endpoint (id is returned)
-   Center map even for stations search results
-   Map thumbnails are generated from mapy.cz tiles

# [19.1.0]

-   If there is more annotations in one Article they are played like a presentation
-   Article importance renamed to `extreme,severe,moderate` to reflet CAP Alerts
-   Article headers have nice warning badge
-   CAP alerts time filter fixed

# [19.0.0] - leaflet-1.4.0

-   **Huge refactoring of map stuff and upgrade to `Leaflet 1.4`**
-   **`distance` plugin improvements**
-   Fixed PNG transparency BUG
-   We use highly patched version of Leaflet here https://github.com/windycom/Leaflet
-   Distance plugin: Export to XML, KML, fixed timeline bug, nice shareable URL
-   Reintroduced possibility to launch weather picker upon startup in URL `d:picker`
-   Some perf opts in `pois`
-   New README for `assets` directory
-   Updated version of Leaflet.Geodesic is now just ES6
-   `maps` module (shortcut to `map`) discontinued
-   Simplification of `cap-alerts` icons

---

# [18.10.0]

-   **Our `http` lib now supports `qs` in options for easy query string construction**
-   Loading of `patch.js` is back (now as auto openable plugin)
-   Slight improvements in `promo`, `ga`
-   Completelly new mechanism of selection articles on HP (using local storage)
-   New features in article-publisher (new plugiun `flatpickr`)
-   Articles impovements: Mobile version, OGtags, Schema.org, related articles pagination

# [18.9.0]

-   **All facebook and twitter bots should be redirected to `node-imaker`**
-   Whenever possible reverse name is selected from zoom 7

# [18.8.0] - articles

-   **Completelly new functionality `articles` and `article-publisher`**
-   **Temporarily disabled `patch.js`**
-   NOTE: Articles are considered BETA and dispalyed only on Desktop
-   Some other bugfixes

# [18.7.0]

-   Support for `react` plugins
-   Radar bugfix
-   Bugfix favs

# [18.6.0] - cypress-tests

-   **Completelly new UI tests written in `cypress`**
-   `radar` plugin loads only the latest frame on launch
-   New translations

# [18.5.0]

-   Fixed AM/PM formatting function
-   `EventCatcher` simplified (supports only clicks now) and renamed to `ClickHandler`
-   Instance of `Window` uiClass can be attached also to element (not only to selector)
-   Another dev of articles
-   Slghtly bigger AROME model boundary

# [18.4.2]

-   Small article fixes
-   Experimental: `article-publisher` is distributed and loaded from npm

# [18.4.1]

-   Updated radar providers

# [18.4.0]

-   **Completelly new functionality `articles`**
-   New class, auto openable TagPlugin
-   `nouislider`, `mapPaint` moved to assets

# [18.3.0] - annotations-screenshot

-   **New plugin `annotation` and `annotate`**
-   **New plugin `screenshot`**
-   Desktop Dontation aligned to center

# [18.2.3]

-   Fixed wrong CSS on iPad

# [18.2.1]

-   Fixed donation on mobile

# [18.2.0] - new-device-detection

-   **Compelte new device detection based on JS.**
-   Slight refactor of LESS
-   New `detectDevice` module
-   Some `donate` fixes and refacorings
-   Fixed missing logout icon od iPad
-   Added radar providers

# [18.1.0] - tiled-pois

-   **Complete refactoring of `pois` plugin**
-   Stations check for update
-   Fixes in `favs, Favs, favsExtended`
-   Donations fixes

# [18.0.3]

-   Fixes BUG gradient render fail introduced in `17.11.0` by fixing `wind` view
-   Bug fixes
-   Better sedlina loggin of stations

# [18.0.1] - new-stations

-   **Complete refactoring of `station` plugin. Now as mytag and w/o d3 dependency**
-   **AROME model implemented, both on map and in detail**
-   Major fix in `store`. `compareArrays` now does not modify original array
-   New `nearest` plugin serving as dependency for detail, station
-   Slight refactoring/tweaking of `search` and `favs` in rder to accomodate stations
-   Removed obsolete code from `favsExtended`
-   Airport info now contains mag declination
-   Some minor detail performace ops
-   Slight changes in web-GL particles
-   Link to donations commented out in LHmenu due to the BUG
-   Major fix in `isolines`, when product is fallbacked to ecmwf
-   New `darkmap` version 9.0 not displaying disputed borders

---

# [17.12.0]

-   Donate plugin on desktop

# [17.11.0]

-   Slight refactoring of `multiLoad`
-   Fixes `detail` display `wind` bug shifing first line
-   NEMS model now contains `gust`

# [17.10.0]

-   Additional params added to http requests
-   New translations

# [17.9.0]

-   `http` module now sends `key1, key2` tokens to each backend API on `node.windy.com`

# [17.8.0]

-   `index.html` contains JWT hash
-   New plugin `pluginDataLoader` so external plugins can access our backend data

# [17.7.0]

-   When fetching cityTiles, refTime is abandoned

# [17.6.0]

-   Plugin `plugins` fix and slight improvements. Once loaded plugins are now stored to store
-   Fixed ZULU click bug
-   Removed exported language files from repository
-   Forecast cityTiles are now server from WCL to improve hit rate

# [17.5.3]

-   translation api download grouping

# [17.5.2]

-   More alert translations
-   Fixed webcams bug

# [17.5.1] - crowdin-api

-   Translation API partner change to `crowdin`

# [17.5.0]

-   `zuluMode` simplified, refactored

# [17.4.0] - zulu-mode

-   `zuluMode` as settings, displays all major times in UTC
-   Donation fixes & improvements
-   Hack: Max map zoom for Vietnam is 11 due to the territorial disputes

# [17.3.1]

-   Unlegal embeing of Windy.com as an iframe is no more tolerated

# [17.3.0]

-   Plugin `donations-mobile` renamed to `donations`
-   Added donors list
-   Dontions prepared for translation
-   Distance plugin important fix
-   Simplified detail webcmas, separated to new plugin `detail-webcams`
-   Donation fixes

# [17.2.0]

-   Polishing CSS for tablet/mobile device
-   Discontinued `notInSync` detail display
-   Fixing long time detail bug (wrong combination of product/model)
-   Fixing webcam/pois, station bugs
-   Fixes for iOS build
-   Mobile app is restarted if resumed after 3 hrs from firt start

# [17.1.0]

-   Bugfix
-   New version of label layers `1.3`
-   `register` and `login` plugins fixes
-   New client tests `register`, `login`
-   Finally new API endpoints implemen ted `/obs`, `/airports`

# [17.0.0] - tilified-city-forecast

-   Although no significant client innovation, `v17` uses tilified city forecast thus reducing number of XHR rqsts approx 5x
-   Mobile donation finished

---

# [16.17.0]

-   Refactoring of CSS styles, buttons, uiLoader, forms
-   CSS refactoring of Alert plugins

# [16.16.0]

-   New module and new way of handling `singleclicks`
-   A lot of work done on CSS refactoring
-   Added href atributes to overlays menu in case of visited by `googlebot`
-   New plugin `seo` initializet only with `googlebot` UA string for handling nice meta tags etc
-   `.loader` class has been depreciated in favour of `.loading`

# [16.15.2]

-   Reverted action "`L.PoiOverly` does not animate zoom anymore for performace reasons"

# [16.15.1]

-   `#map_container` id renamed to `#map-container` potentionaly breaking change for API4
-   LabelsLayer in diff map pane
-   First documentation of CSS styles
-   CSS check and refacotring of some parts (colors, fonts)
-   `L.PoiOverly` does not animate zoom anymore for performace reasons
-   Hurricanes box on HP discontinued
-   New CAP Alerts box on HP
-   CAP Alerts feature finished and published
-   `pilotgram` riot tag now part of commons
-   `isolines` are now TagPlugin to support css also
-   `interpolator` simplified, accepts now { lat, lon }

# [16.14.2]

-   Bugfix MSIE 11

# [16.14.1]

-   Change reverse geocoding URL version

# [16.14.0]

-   New reverse geocoding backend API

# [16.13.1]

-   Fixed not opening of patch
-   lib mode repots just 10% of traffic for radar.tohapp.com app
-   embed2 mode reports just 10% of traffic

# [16.13.0] - external-plugins

-   Some modules were documented with JSDoc
-   New `plugin-dev` and `plugins`
-   Fixes in `Plugin` to enable external plugins loading

# [16.12.0] - sounding

-   New plugin **sounding**
-   **`globe` plugin discontinued**
-   **embed2 uses new CacheLayer instead of Amazon CDN**
-   Improved ability to load plugins from external URL
-   **External 3rd party libs were removed from `plugins/` directory to `assets/js/`** specifically `riot, d3, colorpicker, graticule, geodesic`
-   New custom built d3 v5.7.0
-   `LabelsLayer` refactored, simplified etc...
-   Fixed bug regarding exclusivity of opening of lhpane, rhpane introduced earlier
-   Updated/changed GA reporting sampleRate on `embed2` to 25%
-   New URL of webSocket proxy

# [16.11.1]

-   **Surfing spots published**
-   Hurr tracker has smoother lines
-   Important fix in `http`, missing sha in `Accept` header
-   Fixed altitude selctor bug introduced in `16.9.0`, therefore this bug remains. Exception in `ghIsolines` regarding `surface` altitude

# [16.10.0]

-   Fixed & improved hurr tracker
-   Serious bug fixes regarding Plugin opening and in EventCatcher

# [16.9.0]

-   Some initial refactoring/code splitting of `less` codes
-   New ui classes `DropDown` & `BindedDropDown`
-   Upgraded `hurricanes` plugin with GeoJSON on a mp and some animation
-   Compelte refactoring of `settings` plugin
-   Fixed bugs in `trans` (switching to `en` by user did not work)
-   New module `legends` and possibility to separate legend/metric, thus removing `cbase` and `sst` metrics
-   Fixed bug causing exception in `ghIsolines`
-   New language file `langSettings`
-   New version of vector labels `1.2`
-   Fixed bug regarding `#rhpane` and expert mode

# [16.8.0]

-   Changed assets directory to more readable `16.7.3.mob.8811`
-   Assets dir is now hardwired to client, use new `public/assets.cfg`
-   Small fixes

# [16.7.1]

-   Updated `embed2`
-   Updated `libs` and so on

# [16.7.0]

-   Refactoring of `geolocation` module. Better handling of gps,geoIP, georeverse
-   Fixed bug gps/ip/location startup
-   Less ga logging in embed2.html

# [16.6.2] - build-system-vector-labels

-   **Completelly new build system** + Googbyle `grunt` all is controlled by `make.js`, `langUtils.js` + More robus plugin build system + Better handlig of plugin lang files + Introducing `.editorconfig`
-   **Simpified & localized vector labels**
-   New `interpolator` handling `radarInterpolator` and `tileInterpolator` and fixing a lot of picker bugs
-   **Abandoned `cancel` method of `http` loading Promise.** Moneky patching stopped to work.
-   Cloud base/tops metrics now changable on mobile
-   ptype/rain `patternator` is external plugin
-   New renderer instance `tileLayerPatternator` and ugly hacks not to change layer in Leaflet
-   New plugin `hurricanes` so fr for desktop only

# [16.5.0] - hurricanes-on-hp

-   3 biggest hurricanes are displayed on HP

# [16.4.0] - wind-display

-   Methods for loading multimodels moved to `multiLoad` in `detail-render` plugin
-   Completelly new detail display `wind` using new plug-in `wind`
-   Blitz vibrate/sound fixes
-   New overlay `gustAccumulation` including metrics `strongWind`
-   Pre rendering the legend simplified

# [16.3.0]

-   New user settings `dispalyLocatio` & `vibrate` so far supported only on mobile
-   radar plugin vibrates on flash (only in iOS)

# [16.2.0]

-   Donations, surf spots updated (still commnted out)
-   A lot og small fixes in radar/blitz
-   Radar overlay renamed to "Radar, lightning"

# [16.1.1]

-   blitzSocket proxy, isolines, trans fixes

# [16.1.0] - New-assets-paths

-   Completely new location of client assets at `v/16.1.0-k9ib7n` combining package version and short commit sha.
-   CI/CD simplifiex and fixed
-   New module `myLocation` in radar showind direction of users device

# [16.0.0] - CI-CD-SEO-URL-blitz

-   **Client runs in Docker and is deployed via CI/CD**
-   **New feature: Online blitz**
-   **New SEO optimized URLs** and canonical link
-   New module & store property `visibility` that detects visibility of a window.
-   radarAnimation, timeAnimation, glParticles and blitzWebSocket listen to `visibility` and suspend their tasks
-   RadarBackupManifest decommisioned
-   Deleted all the codes that refer to `app` target aka API v3 (mywindy.com aps)
-   Possibility to choose and save favorite POIs
-   New plugin `map` (desktop only) that let you select fav POIs
-   New POIs overlay `surf` - unfinished and commnted out
-   Code splitting of `pois` plugin
-   Deployed on Docker image
-   Started to use bariol-numbers-v2 font to save bandwidth

---

## [15.17.3] - embed2 CICD + apple-touch-icon

-   new version of deployment scripts for `embed2`
-   `apple-touch-icon` redirect to `ims.` in `nginx` conf

## [15.17.2] - last-version-on-origins

-   First client version deployed as Docker image
-   Last client version on origins servers

## [15.17.3] - CI/CD last version

-   new version of deployment scripts

## [15.17.1] - removed sstanom

-   Removed SST anomaly layer

## [15.16.4] - leaflet-fix

-   One of the first version sending `accept/hash` to determine client version
-   Uses new versionof leaflet lib (that has fixed forgottent console.log output)
-   SEO fixes. First URL after visiting the page www.windy.com remains the same
-   User favourites are backuped each 7 days

## [15.16.1] - lib-target

-   New target `lib` generating API4 codes

## [15.15.0] - SEO fixes

-   Fixed wrong radar server
-   Better SEO support, prepared for sitemaps version 5

## [15.14.0] - lightning-forecast

-   New lightning forecast implemented via `Patternator` that uses Canvas ImagePatterns

## [15.13.1]

-   gl-particles, Android app fixes

## [15.13.0] - better-SEO

-   Dropped `canonical` META tag
-   Better SEO support for URL of a type `https://www.windy.com/sl/-Rosišče-dewpoint` including translated overlay description.

## [15.12.0] - new-mobile-menu

-   `layers` plugin abandoned in favour of a single mobile `menu`

## [15.11.0] - new-mobile-menu

-   `layers` plugin abandoned in favour of a single mobile `menu`

## [15.10.0] - data-quality-fixed

-   A lot of big modules split into smaller ones mainly arount `ImageMaker` a `detail-render`
-   Fixed serious bug at `renderUtils` regarding tile data quality

## [15.9.0] - privacy-protection

-   `promise` polyfill loaded only when needed
-   New `privacy` plugin at www.windy.com/privacy
-   Simplified `debug` plugin
-   `embed2.html` back to external GA script

## [15.8.0]

-   Internal ga logger now parses utm params
-   `embed2.html` now uses inernal GA logger
-   `log, promo` modules have richer API

## [15.7.1] - new-stat-logger

-   No more `google-analytics.js` we have custom logger
-   `bowserDetect` module now server side
-   New statistics, error kibana logger endpoints

## [15.6.0]

-   New uiClass `Window`, `TagPlugin` inherits from Window
-   `messages` module abandoned in favor of Window
-   New layer `thundestroms` using lightDensity
-   `connection` module now used on `index` target also (prev only on mobile)

## [15.5.0]

-   Bugfixes: Remaining loader in radar, less automatic radar animation
-   GDRP protection stuff
-   Error logger does not report these issues as a bugs anymore: network, localStorage, geolocation

## [15.4.0]

-   Better radar in mobile tweaks (mostly CSS)
-   Fixed embed2 via CSS
-   New `picker` module handling picker opening
-   A lot of radar fixes

## [15.3.1]

-   Fix GA script in embed
-   New module `clientLogger` for client side statistics

## [15.2.0]

-   Embed version updated

## [15.1.0]

-   Better radar resolution

## [15.0.0] - radar-20

**- Completely new Weather Radar overlay**

-   PlayPause btn now handled by `BindedCheckbox`
-   New uiClass `BindedBar`

---

## [14.17.0] - external-patch

-   Promos, patches, hot fixes are now loaded from external `client-patch` repository
-   `hp.es6.js` now announces its own status via `store`

## [14.15.0 - 14.16.0] - new-backend-servers

-   BREAKING CHANGE: imageServer data are now loaded from `ims.windy.com`
-   Tiles are loaded from `tiles.windy.com`
-   Radar beta promo cookie injection

## [14.14.0]

-   hiring promo

## [14.13.0]

-   expertMode settings that prevents to fold quick menu

## [14.12.0]

-   New URLs supporting recommented SEO for languages and titles. See `router.es6.js` and `trans.es6.js` for details.

## [14.11.1]

-   Disabled 3d transformations in CSS

## [14.10.2]

-   Airgram changed do es6
-   Fixed bug, Airgram has now loader for whole rendering time

## [14.10.1] - SEO-URLs

-   Fixed bug with yellow POIs artifacts
-   Support for new SEO URLs
-   Due to the iOS bug airgram,meteogram IS NOT part of URL

## [14.9.0] - jwt-auth

-   Whenever JWT auth string is present in `index.html` if appends JWT to all `node.windy.com` calls

## [14.8.0] - webcams2

-   Completelly new UI class `Webcams` for easy webcams rendering
-   `webcam` plugin refactored from `riot` to native JS
-   Refactored `detailWebcams`, `station`, `airport` to implement new `Webcams` class
-   webcam pois now opens looks on desktop
-   `lookr` plugin refacotred

## [14.7.0] - detial-render

-   Not so much synchronizations. A lot of settings do not sync with cloud
-   `capAlerts` layer lamost finished (but commneted out not ready to deplay - untested, buggy do not use)
-   Extended API of `Evented`. Now supports context same as Leaflet API does.
-   `detail` split into two separate plugins `detail-render` and `airport` and `multimodel` plugins respect that
-   New version of map tiles `8.1`

## [14.6.1]

-   `favs` separated into its own pugin

## [14.5.0] - thunder-for-fcst

-   New icon set `icons3` and new API endpoint `v2.2` for thunder,fog enhanced fcst
-   By default `lhpane` menu opens `tools` plugin

## [14.4.0] - tides-as-pois

-   **New tide forecast** as POIs on a map
-   Back to old Google Analytics logging

## [14.3.0]

-   Lang bugfix
-   New plugin to backup user's settings into elasticsearch

## [14.2.0]

-   Complete new refactoring of mobile apps GA logging

## [14.1.6]

-   Fixed globe
-   Simplified `product,layer,pathGenerator`

## [14.1.5]

-   Adjusted for cordova build
-   Finally iPhone X app supported

## [14.1.0]

-   Small fixes for mobile ver
-   New `diagnostics` module

# [14.0] - new-basemap

-   **Complete new map:** `border-layer` abandoned in favour of single tile layer that is above `overlay-layer` accompanied by grey mask layer for sea overlays.
-   Completelly new loging strategy for GA using custom metrics/dimensions
-   New overlays: `ptype`, `sst` overlay handled by `ecmwf`
-   Compelte refactoring of detail UI controls. Now more logical, backed by `store`
-   `colors` plugin for editing color paletes lost ability to edit alpha and `Color` class simplifications
-   A lot of old modules refactored to `es6` or split to more modules
-   New color paletes by @milan with crisp colors
-   `renderTile` lost ability to use alpha channel in destination tiles
-   Discontinued use of storing avatar in localStorage

---

## [13.15] - dynamic-labels

-   Client version is now inside `package.json` not `Gruntfile.js`. Since we use only two digits, minor version number must be always `.0`
-   **City labels are overlayed with divs containing fcstd temp**
-   Refactoring of obsolete `maps.js` module (spliting into 3 files)
-   New plugin `graticule` based on leaflet plugin
-   Layer `ptype` has discreet interpolation on map in `renderTile` and in `interpolator.js`. Implementation is hacky.
-   `Poi` class important fix. Distinguishing drag & click.
-   Poi classes separated in many files

## [13.14]

-   Bugfixes
-   Introduction of `rootScope.authToken` JWT authorization
-   New directory structure with `uiClasses` and all UI classes are in separate files
-   Better development system to generate list of files
-   Some dev documentationn: Automaticaly generated list of files with first lines of comments

## [13.10] - embed2-update

-   `embed2.html` updated to the latest client codes
-   Backward compatible with types `radar` and `forecast` bud widgetmaker was simplified and supports only `type=map`. New option to combine map with detail.

## [13.10] - debug-plugin

-   **Completelly new plugin `debug` enabling to diagnostic Windy errors at www.windy.com/debug**
-   Better onresume event handling on mobile
-   Better diagnostics of unlegal use (iframe, app)
-   `ozone` product merged `ecmwf`
-   Minifest of each product is now checked each 5 minutes whenever switching to product
-   Isolines of local forecast models clipped to boundaries
-   New iOS, Android builds

## [13.07]

-   New class `PrductSwitch`. No more CSS to display avlb products
-   Rain/snow accumulations supported by more models (gfs, icon, nam) and acTime UI switch generated dynamically
-   Some desktop UI elements moved to external `rhpane` plugin making loading even faster on mobile devices
-   New icons on desktop: fullctreen toggle and update time
-   On mobile, model switch was moved to layers plugin
-   Completely new sexy info about expected model update time as a `info` plugin in desktop and directly in layers menu on mobile.

## [13.05] - icon-eu

-   Implemented **icon-eu** model to map && to detail
-   `store` improved (made it faster)
-   Product `ecmwfAccu` abandoned in a favor diplaying accumulations in current product

# [13.03] - store

-   **Completelly new module `store` replacing `settings` and keeping state of the app. Store is central data store (imagine simplified super fast Redux store).**
-   UI redesign of desktop view
-   Settigns lowBandwidthMOde discontinued
-   Simplification of `rhpane` controls
-   `store` (formerlly settings) split into new modules `dataSpecifications` and `cloudSync`
-   Overhauled and simplified `cloudSync`
-   `W.Metric` now uses underlying `store`
-   `W.Color` now uses underlying `store`
-   `timeAnimation` uses variable speed
-   Completelly new progressBar UI loder for `radar`
-   New module `detail` as internal `W.Evented` emmiter nad detailWide data holder
-   Huge improvements in `detail` splitting into mode modules, making modules independent.
-   Completely new `params` module using heavily new `store` and item dependencies
-   **Almost all UI contorls has been redesigned, simplified to use new `store`**
-   Overlay `sstAvg` (average monthly sst) discontinued
-   `bottom` plugin has been abandoned
-   Completelly new classes `BindedCheckbox` and `BindedSwitch`
-   Possibility of `product` lo have lazy loaded dependencies has been abandoned
-   `Colors` class change to `W.Class` to avoid `new`.
-   Picker fixes (implements `EventCatcher`).
-   `MyTag` plugins now recognizes `data-ref="ident"` making nice object `this.refs` (inspired by RIOT)
-   Completelly new isolines plugin using 2D canvas (faster, less memory footprint)

---

## [12.36] - patched-leaflet

-   **Important, Windy now uses patched version of Leaflet 0.7.7** (https://github.com/windyty/Leaflet)
-   When mobile picker is on double tap zoom and pinch zoom keep picker on the same location
-   Better "my location" support

## [12.35]

-   `swellperiod` layers discontiunued (remains in picker or wave detail)
-   Meteogram now contains also dewPoint in temp graph
-   As requested by many users all wind/wave direction can be displayed as `NW` or `270deg`
-   **Important fixes in meteogram that caused wrong rendering during long rain**
-   Rain layer now shows areas with snow
-   picker has its own emmiter `W.picker`
-   `ozone` layer is back

## [12.33] - waves-tides-isolines

-   **`W.Swipe` important bugfix that cause unexpected swipe events**
-   Slight pois plugin refactoring
-   New `detail-tides` and `tides` plugins. Tides is stand alone tide forecast and Detail-tides combines detail with tide forecast and implementation of both plugins is far from being perfect.
-   New `router` module (taking part of a code from `location`)
-   Support for new isolines `gs`,`temp`,`deg0` some of which are multilevel
-   Slight changes to `detail` plugin
-   On mobile, better webcamsDetail thumbnail preview
-   New `waves` plugin containing `waves` radar
-   Riot.js upgraded to **3.7.4**

## [12.32] - external-picker

-   Picker was moved to external plugin
-   Weather picker on single tap is back on mobile + some graph improvements

## [12.30] - new-mobile-ui

-   **Completely new mobile/tablet UI**

## [12.29 - mobile]

-   New `mobileIntent` module and fix of opening with intent

## [12.28]

-   Significant performance optimalization during scroll of detailed forececast.
-   On mobile, clicking on forecast column now sync maps to the same hour
-   Swipe up on detail opens webcams on mobile, or down to close detail
-   Adds the code for displaying user-defined apps.
-   New `lang/langUtils.js` utility for handling translations

## [12.24] - new-pois-webcams

-   **Complete refactoring of map POIS** using new Leaflet L.PoiOverlay class and featuring 100 - 1000x performance improvement!!!
-   Bugfix L.CanvalOverlay
-   On mobile apps logo was moved down to UIcalendar DIV
-   Completely new webcams plugin for mobile use
-   Completely new context menu preventing user to open weathe picker by accident on mobile
-   Distance & planning optimized for mobile use also
-   New build of shared JS libs including patched Leaflet .77

## [12.21]

-   As rqstd "OpenInApp" promo is visible only on iOS & Android platforms
-   minor perf opts in calendarUI
-   Click on home icon in mobile apps does not change overlay/model/level (just zooms the map & goes to current time)
-   **On mobile, scrolling of the spot forecast changes time of the map**

## [12.20] - isolines

-   particles animation on/off state is now part of the URL
-   Completelly new **`isolines` overlay & plugin** so far featuring only pressure. Contains webWorker for bezier curves computation.
-   Unfinished new `capAlerts` overlay & plugin (commented out)
-   `alerts` plugin now supports rainAccumulation (computed from rain)

## [12.19]

-   Radar now contains nicer loader in UI
-   Completelly new `widget` maker enabling to embed weather radar
-   `embed2` now supports Weather radar

## [12.15]

-   New meta tag for launching in emergency mode
-   Weather stations on HP discontinued

## [12.13]

-   Updated `embed2.html`

## [12.12]

-   Bug fixes

## [12.08]

-   Back to `riot 3.5.1` due to bugs in `v3.6.2`

## [12.02 - 12.04]

-   Better err diagnostics
-   Bug fixes
-   Upgrade of `riot js` plugin (from `3.5.1` to `3.6.2`)
-   New URL parameter that lead to change of `<meta description>` for purpose of better search indexing

## [12.01] - localized-labels

-   New localized or english map labels, rendered with nicer fonts. Retina label map tiles with 512x512px.
-   Added english/localized labels switch to settings (localized labels by default)
-   Fixed bug. When picker is dragget out of map bounds it is closed
-   Radar now get tiles from www.windy.com + has correct refTimes
-   `wg-particles` fixes

# [12.00] - view-layer-renderer

-   Completelly new `overlay-layer-renderer` data model (better name would be wiev-layer-renderer). New classes `W.Layer` and `W.Renderer`
-   Almost finished **radar plugin** and radar renderer
-   Monster bug found in `picker` causeing problem when interpolating accumuluations layers
-   Start-up optimalizations (border and labels are loaded after `redrawFinished` is called)
-   Refactoring of many components including of `L.CanvasLayer`
-   Retina support for old non-webGl particles has been abandoned
-   `picker` family slightly optimized for performance
-   `pois` are lazy loaded as an plugin and its rendering yields not to block main thread
-   `wgUtils` now test redar capabilities
-   Dev utility `proxy.js` supports SSL server (generate your own certs)

---

## [11.23]

-   New "Windy.com" and unhideable "Download app" message
-   Initialization of borders and labels is delayed 2 sec
-   Smaller touch areas for mobile version on `#rhpane`

## [11.22]

-   Serious bugfixes in `geolocation.js`, `maps.js` initialization
-   Mobile version (11.20) w/o offline tiles
-   New follow-me promo

## [11.19] - map-labels-and-borders

-   `wg Utils` part of the core
-   New borders and labels Laeflet tiles
-   A lot of bugfixes
-   RHpane moved to `lhpane`
-   Design overhaul of overlay menu
-   First prototype to `radar` (still commented out)
-   New `Color` class and new color model (by milan)

## [11.00 - 11.18] -

-   A lot of bug fixes
-   NAM model in detailed forecast
-   Implementation of CAP alerts in detailTable and weatherFragment
-   Product synchronization of map & detail
-   Simplification of `model - product` relation

# [11.00] - webGL-particles

-   Completely new plugins `rhpane, tools, particles, bottom, etc..`
-   New UI for desktop (rhpane plugin) and mobile (mobile-menu)
-   On desktop we test webGL capabilities and decide if to load old or new particles renderer
-   A lot of small improvements and fixes

---

## [10.78] - 2017-05-29

-   Fixed bug preventing saving/editing of Alerts

## [10.74] - 2017-05-25

-   Temep graph is now part of mobile version of detail slider including marked alert times
-   `tocca`, `pulltorefresh` external libs abandoned
-   `airport` plugin optimizations
-   Better detection when to close startup weather based on events

## [10.73] - 2017-05-23

-   Upgrade from `v2.6.8` to `v3.5.1` of **RIOT JS** DOM library
-   Slight improvement of some plugins (airport,alerts,...)
-   New plug-ins `tocca`, `pulltorefresh` used now in airport plug-in
-   Slightly improved Grunt build system

## [10.72] - 2017-05-20

-   **WebGL particles animation:** New `wg-utils`, and `wg-particles` plugins. Possibility to set up webGL particles layer. Always uses retina up to maximum devicePixelRatio = 2.
-   Testing of webGL capability for each user

## [10.69] - 2017-05-19

-   Alerts are now visible in client as a number in avatar, in spot detail and in user `favs` plugin.
-   Bugfixes and more translations for `alerts` plug-in
-   New plug-ins `user`, `favs-extended`, `fav-alert-menu` making `index.js` again a little bit smaller
-   User: user avatar and checking of new alerts, favsExtended: Extends fav instance and _repairs_ bad favs/alerts/airports in localStorage (only for logged in user)

## [10.66-10.68] - 2017-05-12

-   `alerts` plugin polished (ready for i18n) and linked from `detail`
-   New translation phrases
-   Bugfix in `widgets` plugin where lat,lon was not written into iframe src
-   `embed2.html` improved, supporting alert screenshot and languages
-   Now API endpoint for POIs `/pois`
-   New langfiles for alerts

## [10.65] - 2017-05-03 - Website, Android, iOS

-   Air quality layers: **CO, SO2, Dust concentration**
-   We hope to have found & fixed bug when particles are displayed only in the first third of the page
-   `http` module now caches JSONs in received (stringified form) preventing for later modifications in App
-   Fixed bug introduced in `10.60`: Switching table, meteogram destroys weather data received from http cache
-   NOTAMs now can be displayed in RAW mode

## [10.64] - 2017-05-01

-   Fixed bug introduced in v10.60: Weather in cites displays erratically
-   Added temporary `pollution, dust` overlays to client (although still not on the server)

## [10.63] - 2017-04-30 - Website, Android, iOS

-   Fixed bug introduced in v10.60: Compare forecast shows the same models

## [10.61] - 2017-04-29

-   New plugin **Windy Alerts** for adding, editing, deleting the Alerts
-   New `embed2.html` with new Windy logo and supporting `lang` parameter

## [10.60] - 2017-04-28

-   Performance improvements in weather JSON. Instead of array of objects are used object of arrays
-   Performance improvements in POIs. Data are transported in arrays. Extended info onmouseover are lazy loaded from server.
-   Airports on a map now contain **full METAR** displayed on hover
-   NodeBB authentication cookie is transferred form `windtv.com` domain to `windy.com` domain
-   _Note: Both improvements mean that JSON data files are 3x smaller, and their rendering and display is faster_

## [10.59] - 2017-04-27

-   New logo, new name windy.com (XHR server still served by node.windytv.com)

## [10.56] - 2017-04-10

-   **Kiting and windsurfing spots** now on windy.tv
-   Tweaking of favourites POIs on a map. They are displayed always, but become active only when "Favourites" is selected in a menu
-   A little bit improved search backend, taking in account location of user and searching in paragliding and kiting databases.
-   New menu for changing POIs and models
-   Fixed bug: The satellite map was not displayed
-   Fixed bug: Strange colours when displaying local models

## [10.55] - 2017-04-02 - Website, Android, iOS

-   New graphs for pilots and paragliders: **Airgram**
-   We have abandoned plans for **pilotgrams** since forecasted visibility is not good. Instead of that you will find **cloud base** part of meteogram.
-   Performance improvement in display of spot forecast. Graphs are now rendered directly to `<canvas>` making whole process faster with less memory rqrd
-   Fixed bug: Click on a webcam opens lookr.com player. Player is now accessible even in mobile version
-   Better UI in spot forecast. Bootm controls stick to the same position
-   As we have promised, meteogram is now part of airport detail
-   Login and user registration from iOS, Android App has been improved

## [10.54] - 2017-03-25 - Website, Android, iOS

-   All the innovation from `v10.50` plus...
-   Performance improvement, main JS codes are ~20% smaller, so it should lead to **faster loading** and start-up
-   Meteogram performance optimization (should not slow down mobile App any more)
-   New weather layers for pilots: **Freezing levels, cloud tops**
-   Polished meteogram a little bit (bigger clouds)
-   Favourites now display metars in RAW mode (if used on airport page before)
-   Beautifull temperature graph is now used on HP and favs and basic spot forecast
-   Fixed bug: Favs are sorted alphabetically
-   Fixed bug, when meteogram clouds were not exactly aligned with timeline
-   **NAM model upgraded to 3km resolution**
-   Our URL shortener uses new URL: `https://on.windy.tv/xxx`

## [10.50] - 2017-03-22 - Website, Android, iOS

-   Completely new iOS app based on `Apache Cordova` was approved by Apple. Contains 100% functionality of the website and supports also iPad
-   A little bit better responsive CSS for tablets, mainly `#bottom`.
-   Better display of detail in mobile landscape mode

## [10.49] - 2017-03-20 - Website, Android

-   Fixed bug: Clicking on a logo in mobile version does not move bottom calendar
-   Fixed bug: Find my location sometimes did not worked (on desktop)
-   Fixed bug when favourites were not synchronized with Android App
-   Display mode for detail and its model is now part of URL so meteograms are fully **shareable** and URL looks like this `www.windytv.com/48.922/8.218?49.967,14.378,5,m:e0HagoQ,d:mg`, while `d:mg` means that meteogram is displayed with GFS model.
-   Meteograms now display rain/snow fractions (ECMWF only)
-   New **wave detail** based on NOAA Wavewatch 3 + GFS models. Note: NOAA wave model does NOT cover Mediaterran sea.
-   Added promo to propagate meteograms
-   After 2 hours of inactivity Android App is restarted to save resources

## [10.48] - 2017-03-17

-   Ola, new **meteograms** are here!! Based on ECMWF or GFS and fully rendered on client side, so only 5kb of data is transferred.

## [10.47] - 2017-03-12 - Website, Android

-   Colour scale added back to homepage
-   Important: fixed bug causing erratic map movement after some time
-   Log-in / register to save all your settings to the cloud
-   "Find my location" opens weather picker, rather than weather detail.
-   Fixed bug, where favourite locations were not in exact position

## [10.40] - 2017-03-07 - Android

-   First version of Android App based on `Apache Cordova`. Full of bugs and issues.

## [10.40] - 2017-03-07

-   Responsive CSS for tablets
-   New mobile-fullscreen-plugin classes and modes
-   New languages added

## [10.36] - 2017-02-28

-   Completely new responsive CSS version for mobile use.
-   New mobile picker
-   Picker position now part of URL
-   Low bandwidth mode settings

## [10.8] - 2017-01-24

-   Bug fixes

## [10.4] - 2017-01-20

-   New pois menu, bug fixes

# [10.2] - 2017-01-18

-   **Completely new version refactoring everything inside the client.**
-   Weather rendering is 2 - 50x times faster and uses only one CPU core (prev used 2 threads)
-   Requires much less of computer memory
-   Faster start up

---

## [8.7.0] - 2016-10-31

-   Prepared for http auth. Client now sends W-Windytv hash with every rqst

## [8.6.4] - 2016-10-12

-   Improved promo module
-   animationSetting promo
-   W.EventCatcher, W.Menu, W.Switch classes moved to UIcomponents

## [8.6.0] - 2016-10-11

-   New settings plugin enabling to set up animation particles and language
-   Major bug fixes for retina display and 'resize' Leaflet event

## [8.5.0] - 2016-10-06

-   Client and Embed can choose 'gfs','ecmwf' as their default model, by changing meta tag in index.html, embed.html
-   Client is able to resolve geoIP from old 'node/geoip' API if geoIP meta tag is empty

## [8.4.0] - 2016-10-02

-   New version of `Leaflet library (v 0.7.7 )` containing important bugfix

## [8.3.5] - 2016-10-02

-   Bugfix, size of data store on mobile devices

## [8.3.0] - 2016-09-30

-   Windytv rebranding ( windyty.com is now windytv.com )

## [8.2.7] - 2016-09-21

-   Detect version of iOS
-   Disable globe mode for iOS10 due to the Safari bug (http://stackoverflow.com/questions/37808180/disable-viewport-zooming-ios-10-safari)

## [8.2.4] - 2016-09-12

-   Better API protection (hash key)

## [8.2.1]

-   Hiring promo stopped just for CZ
-   new W.EventCatcher class catching clicks in part of a DOM
-   Created "riot" like plugin option, in pure JS (without riot)
-   tools, hiring implemented in my new native tag system
-   Improved tans.js module (with options afterbegin, beforeend etc...)

## [8.1.5] - 2016-08-28

-   ECMWF promo stopped
-   Added hiring promo

## [8.1.2] - 2016-08-19

-   Fixed bug: historical calendar does not work properly
-   Fixed bug: 2Mb promo animated gif is loaded even when not displayed

## [8.1.1] - 2016-08-18

-   Added 100m AGL altitude
-   Returned 975hPa
-   All overlay colors are now in TypedArrays
-   Performace improvements inrepolationField
-   New class and module W.Canvas for handling overlay, particle canvases

## [8.0.5] - 2016-08-16

-   Bug fixes, small opts

# [8.0.0] - 2016-08-15

-   RIOT.JS updated to v2.5.0
-   **Added new global model: ecmwf**
-   Added new products: ecmwf-hres, esmwf-wam, ozone
-   Added new overlays: ozone, cbh, CAPE
-   rain, snow overlays renamed to rainAccu, snowAccu!!!
-   Switched to jpg data files from png in NAM, NEMS models
-   Fixed and enhanced imgLoader to support JPG with transparent B channel
-   New model changing component
-   Hiring promo finished x
-   Some CSS components rewrote to 'em' metric
-   **Completely new mobile version**
-   Decreased requirements for allocated typed arrays (dataStore.js)

---

## [7.4.4] - 2016-07-31

-   New detailed map (seznam topo)
-   Some anti-cache in airport.tag.html
-   Hiring promo

## [7.4.2] - 2016-07-25

-   Windyty can start with low zoom level and launched in globe map mode as before
-   Added "Add Chrome extension" promo
-   Fixed display of Windyty in mobile webview (Twitter, Facebook)
-   Better "model" propagation messages (displayed only once for each model)
-   Slight changes in UI
-   Updated embed version (fixed marker issue)

## [7.3.0] - 2016-07-18

-   Promo in separate module
-   Prepared promo "Add Windyty for homescreen"
-   New translations, added pt-BR language

## [7.2.0] - 2016-07-XX

-   Updated detailOnly build

## [7.1.0] - 2016-07-02

-   Added promo for stations feature
-   Windyty 70 promo stopped

## [7.0.0]

-   **26.000 weather stations (including history and graphs) is now on Windyty**
-   D3 lib are now included in full version (not tweaked one as previously).
-   D3 and topojson are downloaded as Windyty plugin whenever globe is requested. As a startin zoom we use zoom 6 to go to map mode and ensure faster map startup.
-   Complete refactoring of airport data in detail plugin. Using new backend API and including RWYs and NOTAMS.
-   Complete refactoring of poi.js module intrducing new W.Poi class and using new backend API
-   Simplification of URL parsing in location.js

---

## [6.1.3] - 2016-04-26

-   Complete refacotring of progressBar/calendar including UI. Everything now wokrs on basis of timestamps (ms)
-   Refactoring of products-overlays relation. Now products contain allowed oerlays and levels
-   Improved Product class and new ProductLocal class (all in separate module)
-   Refacotring of model switches and mechanism of displaying and hiding the model
-   Local models are now part of URL
-   **Added NAM CONUS, ALASKA, HAWAII high resolution models**

## [6.0.3] - 2016-04-08

-   Daily summaries (in detail.js) are part of 3hours API

## [6.0.2] - 2016-04-07

-   Simplification of CSS in index.html
-   Complete overhaul of search, weather and query modules. Whole system was simplified in favor of new location detail
-   New location detail on a left side, with 6 days forecast using new MEteoblue 3h API. New wind and waves forecast.
-   New philosophy of paning and zooming when opening location detail
-   New menu UI Class, that can be styled either as a menu, or iOS like switch
-   Complete overhaul of windytyUI design in favor of independent components
-   New philosophy of mobile version, using the same UI controls (except for progressBar)
-   Legend rendering now part of Overlay class
-   New components module containing UI components and including legend and product info
-   Introduced new way of handling clicks on various links on a page through central windytyUI dispatcher
-   New switches for selction of a time on mobile version
-   New starting zoom is now globe
-   Keyboard controls in independent module
-   Updated detailOnly build with new location detail
-   Topo json source files for globe ( world*.json ) files now moved to `tiles/globev1/world*.json` location, and new storage.getFile options to load and store this file.
-   New sea option, that hides overlays behind tiles now intoduces even in Leaflet
-   Wind plugin abandoned. "wind location" keyword now points to detail with wind and waves section open
-   Fix: Bug that caused METARs POIs to be drawn again and again
-   Fix: Bug in windytyCtrl that caused doing non-dirty interpolation after user zoomed a map

---

## [5.4.1, 5.4.2] - 2016-03-09

-   Wind plugin, non working scroll wheel on FF
-   Small bug in weather module

## [5.4.0] - 2016-03-09

-   Some code moved from main code to detail plugin code
-   Simplified plugin system
-   Added geolib plugin
-   Removed getNextItem and cycle Items from Array.prototype
-   Riot JS upgraded to v2.3.16
-   New favs plugin
-   Changed system of versionning:
    -   first number: change of technology, refcatorings
    -   second number: inovations of any kind
    -   third number: bug fixes and minor tweeks
-   settings plugin informs user about unavalibility of localStorage
-   plugin system now handles metricChanged event by updating plugin
-   Simplified location.js module. Plug-ins are responsible for change of URL and tile
-   Abandoned "WE ARE HIRING" promo
-   Fixed: Location module used old "node/search" API
-   Fixed: Pgdn, pgup keyboard shordcut now works even for rh, temp
-   Fixed: Bug in detail plugin asociated with picker movement

## [5.3.12] - 2016-02-24

-   wind plugin refactored
-   Log module refactored. Added single item logging and simplified
-   Promo for android app
-   Updated language file
-   holding SHIFT + click on search hit now goes directlly to the map
-   Fixed: missing interpolation function in snow, snowcover, rain overlays

## [5.3.11] - 2016-02-16

-   New `current` and `sstavg` overlays including navigation at the bottom
-   Improved animation/particle, product/overlay system
-   Simplified windytyUI/bottom-settings (more CSS, less JS)
-   rh and temp overlays now go up to FL450˚
-   We are Hiring focused on CZ, UA, RU, SK
-   Added links for Android Download to tools and index
-   Added CHANGELOG.md to repo
