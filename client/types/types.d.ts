import weatherTable from '@plugins/_shared/detail-render/weatherTable';
import { WeatherParameters, LatLon } from './interfaces';

/**
 * ISO date string representation of the Date
 */
export type ISODateString = string;

/**
 * Timestamp or any time duration in ms
 */
export type Timestamp = number;

/**
 * Path in a form of YYYY/MM/DD/HH or YYYYMMDDHH based on minifest/calendar version
 */
export type Path = string;

/**
 * Valid subscription tiers
 */
export type SubTier = 'premium' | null;

export type Platform = 'android' | 'ios' | 'desktop';

export type Device = 'mobile' | 'tablet' | 'desktop';

export type FavType = 'alert' | 'airport' | 'station' | 'fav' | 'webcam' | 'route';

/**
 * Search item types as recived from backend
 * There is more search types as received from backend (basically all OSM types)
 */
export type SearchType =
    | FavType
    | 'natural'
    | 'tourism'
    | 'amenity'
    | 'admin'
    | 'highway'
    | 'railway';

export type DetailDisplayType = 'table' | 'meteogram' | 'airgram' | 'waves' | 'wind';

export type Directions = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';

export type AlertConditionProps = 'wind' | 'swell' | 'snow' | 'rain' | 'temp' | 'time' | 'model';

export type HTMLElementWithSlider = HTMLElement & { noUiSlider?: noUiSlider.noUiSlider };

/**
 * Meteorologigal numerial value (usually in default metric as delivered from backend)
 */
export type NumValue = number;

export type NumOrNull = NumValue | null;

/**
 * Format for writing a date as "YYYY-MM-DD"
 */
export type YearMonthDay = string;

export type StationType = 'ad' | 'wmo' | 'madis' | 'buoy' | 'dbuoy' | 'pws' | 'ship';
export type PoiType = 'airq' | 'pgspots' | 'surfspots' | 'radiation' | 'tide';
export type ExtendedStationType = StationType | 'radiation' | 'airq';

export type StationId = `${ExtendedStationType}-${string}`;

/**
 * Type of POI that detail can be open with
 */
export type StationOrPoiType = StationType | PoiType;

export type FlightCategory = 'I' | 'V' | 'L' | 'M' | 'U';

/**
 * Allowed type of tides
 */
export type TideIdent = 'HT' | 'LT' | 'ME' | 'MF' | 'NE' | 'NF' | 'SE' | 'SF' | 'FT' | 'ET';

export type AqiPollutant =
    | 'bc'
    | 'co'
    | 'co2'
    | 'no'
    | 'no2'
    | 'nox'
    | 'o3'
    | 'pm10'
    | 'pm25'
    | 'so2';

/**
 * Fully enclosed and valid HTML string, that can be inserted as innerHTML to DOM
 * NEVER use for partial HTML codes
 */
export type HTMLString = string;

/**
 * Supported types or table rows as used by @plugin/detail-render and @plugin/detail
 */
export type DetailRows = keyof typeof weatherTable;

/**
 * Width/Height or screenposition in Pixels
 */
export type Pixel = number;

export type SveltePluginIdent = `@plugins/${keyof import('@windy/plugins.d').SveltePlugins}`;

export type SveltePanePluginIdent =
    `@plugins/${keyof import('@windy/plugins.d').SveltePanePlugins}`;

export type TagPluginIdent = `@plugins/${keyof import('@windy/plugins.d').TagPlugins}`;

export type BottomTagPluginIdent = `@plugins/${keyof import('@windy/plugins.d').BottomTagPlugins}`;

export type PlainPluginIdent = `@plugins/${keyof import('@windy/plugins.d').PlainPlugins}`;

export type AllPluginIdent = `@plugins/${keyof import('@windy/plugins.d').Plugins}`;

export type MeteogramLayers = 'dewpoint' | 'gh' | 'rh' | 'temp' | 'wind_u' | 'wind_v';

export type MeteogramLevels =
    | '950h'
    | '925h'
    | '900h'
    | '850h'
    | '800h'
    | '700h'
    | '600h'
    | '500h'
    | '400h'
    | '300h'
    | '200h'
    | '150h'
    | '1000h'
    | 'surface';

export type CapAlertSeverity /** moderate **/ =
    | 'M'
    /** severe **/
    | 'S'
    | /** extreme **/ 'E'
    | /** unknown **/ 'A';

export type CapAlertType =
    | 'T' /** thunderstorm **/
    | 'R' /** rain **/
    | 'H' /** heat **/
    | 'W' /** wind **/
    | 'F' /** flood **/
    | 'L' /** low temp **/
    | 'C' /** coastal warning **/
    | 'I' /** fires **/
    | 'G' /** fog **/
    | 'N' /** tornado **/
    | 'Q' /** air quality  */
    /** these two are new not implemented in client **/
    | 'S' /** snow ice **/
    | 'A' /** avalanche **/
    | '-' /** invalid */;

export type CapAlertInfo = Record<
    string,
    {
        event: string;
        description: string;
        instruction: string;
        senderName: string;
        headline: string;
    }
>;

export type RouteType = 'car' | 'vfr' | 'ifr' | 'elevation' | 'boat' | 'airgram';

export type RouteMotionSpeed = {
    [key in RouteType]: number;
};

export type LocationPrefecernces = {
    status: 'notDetermined' | 'restricted' | 'denied' | 'authorized' | 'unknownState';
};

export type NoticicationPrefecernces = {
    status: 'notDetermined' | 'denied' | 'authorized' | 'provisional' | 'unknownState';
};

export type GpsPreferences = {
    status: 'denied' | 'authorized';
};

export type BatteryPreferences = {
    status: 'denied' | 'authorized';
};

export type WidgetNotificationPreferences = {
    status: 'denied' | 'authorized';
};

export type GoogleServicesPreferences = {
    status: 'denied' | 'authorized';
};

export type ErrorCategory = 'location' | 'notification' | 'iCloud' | 'battery';

export type ShowableError = {
    errorId:
        | 'ICLOUD_9' /** iCloud denied by user settings **/
        | 'ICLOUD_25' /** Users iCloud has full storage **/
        | 'LOC_1' /** Location services disabled in devide (for device Android) **/
        | 'LOC_2' /** Location services disabled for application */
        | 'NOTIF_1' /** Notification services disabled **/
        | 'BATTERY_1' /** Battery usage restricted */
        | 'BACKGROUND_LOCATION_1' /** Background location usage disabled */
        | 'WIDGET_NOTIFICATION_1' /** Notifications disabled for widgets */;
    category: ErrorCategory;
};

export type ShowableErrors = {
    unresolved: Map<string, ShowableError>;
    closed: Set<string>;
};

/**
 * Overlay categories used for better UI navigation
 */
export type MenuCategory =
    | 'wind'
    | 'rain'
    | 'sea'
    | 'airQ'
    | 'drought'
    | 'temp'
    | 'warnings'
    | 'clouds';

/**
 * Overlay categories used for better UI navigation
 */
export type MenuItems = MenuCategory | 'all' | 'search';

/**
 * How long should picker-mobile stay open after user interaction
 * It is string because of UI component dropdown returns string
 */
export type PickerMobileTimeout = '3' | '6' | '9' | '12' | 'always';

/**
 * Only these first level paths are allowe to be used in log
 */
export type LogPaths =
    | keyof WeatherParameters
    | 'version'
    | 'plugin'
    | 'pois'
    | 'startup'
    | 'subscription'
    | '404'
    | 'promo'
    | 'airport'
    | 'appRating'
    | 'articles'
    | 'detail2'
    | 'onboarding'
    | 'station'
    | 'weather'
    | 'events';

/**
 * Type of user consent
 */
export type ConsentType = 'pending' | 'rejected' | 'analytics';

export type ProductCategory = 'analysis' | 'forecast';

export type ProductIdent =
    | 'nam-conus'
    | 'nam-hawaii'
    | 'nam-alaska'
    | 'icon-eu'
    | 'icon-d2'
    | 'arome'
    | 'arome-antilles'
    | 'arome-reunion'
    | 'cams-global'
    | 'cams-eu'
    | 'icon-global'
    | 'icon-gwam'
    | 'icon-ewam'
    | 'hrrr-alaska'
    | 'hrrr-conus'
    | 'bom-access'
    | 'ukv'
    | 'gfs'
    | 'gfs-wave'
    | 'ecmwf-hres'
    | 'ecmwf-wam'
    | 'ecmwf-efi'
    | 'mbeurope'
    | 'cmems'
    | 'intersucho'
    | 'intersucho-firerisk'
    | 'nasa-firms';

export type PickerOpener = LatLon & { id: string };

export type ExternalPluginIdent = `windy-plugin-${string}`;
