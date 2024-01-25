import { Weekday } from '@windy/Calendar.d';
import { ExtendedTileParams } from '@windy/DataTiler.d';
import { FullRenderParameters } from '@windy/Layer.d';
import { Particles } from '@windy/Particles';
import { PluginsOpenParams } from '@windy/plugin-params.d';
import { Plugins } from '@windy/plugins.d';
import {
    AcTimes,
    Isolines,
    Levels,
    Overlays,
    PointProducts,
    Products,
    SupportedLanguages,
} from '@windy/rootScope.d';
import {
    BatteryPreferences,
    CapAlertInfo,
    CapAlertSeverity,
    CapAlertType,
    DetailDisplayType,
    DetailRows,
    Directions,
    FavType,
    GoogleServicesPreferences,
    GpsPreferences,
    HTMLString,
    ISODateString,
    LocationPrefecernces,
    MeteogramLayers,
    MeteogramLevels,
    NoticicationPrefecernces,
    NumOrNull,
    NumValue,
    Path,
    Pixel,
    Platform,
    SearchType,
    StationOrPoiType,
    Timestamp,
    WidgetNotificationPreferences,
    YearMonthDay,
} from '@windy/types.d';
import { ClientMessage } from '@plugins/offline/offline';

export interface ExportedObj {
    default?: unknown;
}

/**
 * Major LatLon object
 *
 * WARNING & TODO: Although lat, lons should be numbers we use them in
 * client as string. It is probablly result of URL parmaeters parsing
 * or result of @method normalizeLatLon in @module utils.
 *
 * NOTE: Leaflet uses { lat, lng }, what about unification?
 */
export interface LatLon {
    /**
     * Suprisinlly in client we use it as a string sometimes
     */
    lat: number;

    /**
     * Suprisinlly in client we use it as a string sometimes
     */
    lon: number;
}

export interface Coords extends LatLon {
    zoom: number;
}

export interface PickerCoords extends LatLon {
    zoom?: number;
    noEmit?: boolean;
}

export interface BcastHistory {
    ts: Timestamp;
    txt: string;
}

export interface GeolocationInfo extends LatLon {
    source: 'fallback' | 'gps' | 'ip' | 'meta' | 'api' | 'last';
    zoom?: number;
    cc?: string;
    name?: string;

    /**
     * Time of last update
     */
    ts: Timestamp;
}

/**
 * TODO: This is basically copied favourite
 */
export interface HomeLocation extends LatLon {
    title: string;
    updated?: string;
}

export interface Alert {
    /**
     * Is alert temporarily disabled (true) or not (false)
     */
    suspended: boolean;

    /**
     * If email alerts are active, address where to send an alert
     */
    email?: string;

    /**
     * Since client v29 we moved to Capacitor and new backend notification pusher had to be used.
     * This is filled by client to recognize which pusher should be used.
     */
    version?: number;

    /**
     * Wind conditions for the alert
     */
    wind: {
        active: boolean;
        min: number;
        max: number;
        directions: Directions[];
    };

    /**
     * Swell conditions for the alert
     */
    swell: Alert['wind']; // same as wind

    /**
     * Snow conditions for the alert
     */
    snow: {
        active: boolean;
        min: number;
    };

    /**
     * Rain conditions for the alert.
     * WARNING: This is the only option which is missing for some items in DB
     */
    rain: {
        active: boolean;
        min: number;
        hours: 3 | 6 | 12 | 24 | 48;
    };

    /**
     * Temperature conditions for the alert
     */
    temp: {
        active: boolean;
        min: number;
        max: number;
        weather: ('OVC' | 'BKN' | 'FEW' | 'SKC')[];
    };

    /**
     * Time and terms conditions for the alert
     */
    time: {
        active: boolean;
        occurence: number;
        days: ('mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun')[];
        hours: ('00' | '03' | '06' | '09' | '12' | '15' | '18' | '21')[];
    };

    /**
     * Model conditions for the alert
     * WARNING: This had been disabled in favor of ECMWF, but some old alerts still use GFS. Backend needs this value so it is presented in all alerts.
     */
    model: {
        active: boolean;
        model: 'ecmwf' | 'gfs';
    };

    /**
     * Which lang shoud be used for the alert (en is default)
     */
    lang?: string;

    /**
     * Time zone offset of the user. It is used to send the alert in the midday
     */
    userTZoffset?: number;

    /**
     * Which metrics shoud be used for the alert
     */
    metrics?: {
        wind: string; // TODO - improve with correct types after metrics refactor
        temp: string; // TODO - improve with correct types after metrics refactor
        waves: string; // TODO - improve with correct types after metrics refactor
        rain: string; // TODO - improve with correct types after metrics refactor
        snow: string; // TODO - improve with correct types after metrics refactor
    };

    // TODO - check if these properties really exist in DB or are added in client
    tzName?: string;
    utcOffset?: number;
}

export interface AlertProps {
    /**
     * Timestamps when the alert is active
     */
    timestamps: Timestamp[];

    /**
     * Timestamp where the state of the alert has been chacked on server last time
     */
    checked: Timestamp;

    // TODO - it seems it is not use anywhere, remove?
    seen: number;

    /** Whether alert is active (true) or not (false) */
    triggered: boolean;

    /** Wheter alert is temporarily disabled (true) or not (false) */
    suspended?: boolean;
}

export interface Fav extends LatLon {
    /** Unique ID of item */
    id: string;

    /* How many times was this item hit/used */
    counter?: number;

    /** Title of item */
    title: string;

    /** OBSOLETE DEPRACATED. Name was used till 2019, all should be refactored to `title` if it is safe */
    name?: string;

    /** Unique invented key, for access */
    key?: string;

    /** Type of item */
    type: FavType | SearchType;

    /** Airport ICAO code in case of airport */
    icao?: string;

    /** Weather station ID (if WX station) */
    stationId?: string;

    /** Webcam ID in case of webcam */
    webcamId?: number;

    /** For saved routes */
    route?: string;
}

/** Search result payload as received from backend */
export interface SearchResult extends Fav {
    /** Localized Search result */
    title: string;

    /** Type of item */
    type: SearchType;

    /** Localized, human readable country name */
    country?: string | null;

    /** Lowercase ISO-2 CC */
    cc?: string;

    /** Localized, human readable region */
    region?: string | null;

    /** Localized, human readable state */
    state?: string;

    /** Stringified bounds of found item for case of island, country etc */
    bounds?: string;

    /**
     * Added properties for purpose of recent searches
     */

    /** Creation date */
    timestamp?: Timestamp;

    /** Search query under which was item stored to recents */
    query?: string;
}

export interface HttpSearchPayload {
    header: {
        type: 'search' | 'coordinates' | 'query-error' | '2airports';
    };
    data: SearchResult[];
}

export interface SavedFav extends Fav {
    /** Title of item */
    title: string;

    /** Unique invented key, for access */
    key: string;

    /** Type of item */
    type: FavType;

    /** Alert settings (conditions, properties, ...) if any */
    alert?: Alert;

    /** Basic info about alert if any */
    alertProps?: AlertProps;

    /**
     * Query params of the route needed for creating the route again
     *
     * @example car/50.43,21.49;48.14,20.61;49.18,21.41
     */
    route?: string;

    /**
     * Timestamp when the item has been updated for the last time. It is used for updating items on all devices (the most up-to-date wins)
     */
    updated?: Timestamp;

    overflowed?: boolean;

    /** DEPRACATED !!! Use `title` instead. This property is presented only because of in localstorage saved old favs compatibility. */
    name?: string;
    /** Used for alerts to open slider on active timestamp */
    moveToTimestamp?: boolean;
}

export interface UpcomingFav extends Fav {
    // TODO - is it necessary? Isn't just some migration deprecated stuff?
    name?: string;

    /** Type of item */
    type: FavType;

    // TODO - is it necessary? Can unsaved fav has a route property?
    route?: string;

    // TODO - is it necessary? Can unsaved fav has an alert property?
    alert?: Alert;

    // TODO - is it necessary? Can unsaved fav has an updated property?
    updated?: Timestamp;
}

export interface SavedAlertFav extends UpcomingFav {
    _id?: string;
    alert: Alert;
}

export interface WeatherParameters {
    overlay: Overlays;
    acTime: AcTimes;
    level: Levels;
    isolines: Isolines;
    path: Path;
    product: Products;
}

export interface InputTarget extends EventTarget {
    value: string;
}

export interface HTMLInputElementKeyEvent extends KeyboardEvent {
    target: InputTarget;
}

/**
 * Last device info sent to backend for purpose of pushNotifications
 */
export interface LastSentDevice {
    deviceID: string;
    platform: string;
    target: string;
    version: string;
    deactivated?: boolean;
    updated?: number;
    screen?: {
        width: number;
        height: number;
        devicePixelRatio: number;
    };
    registrationHash?: string;
    notifPluginVersion?: 1 | 2;
}

export interface Bounds {
    west: number;
    east: number;
    north: number;
    south: number;
}

/**
 * Leflet's tilePoint
 */
export interface TilePoint {
    x: number;
    y: number;
    z: number;
}

/**
 * Celestial object as received from backend
 */
export interface Celestial {
    /**
     * Time zone abbreviation (for instance CEST)
     */
    TZabbrev: string;

    /**
     * Time zone name (for instance 'Europe/Luxemburg)
     */
    TZname: string;

    /**
     * TZ offset in hours
     */
    TZoffset: number;

    /**
     * TZ offset nicelly formatter
     */
    TZoffsetFormatted: string;

    /**
     * TZ offset in minutes
     */
    TZoffsetMin: number;

    /**
     * Type of TZ type t..terrestial, n..nautical
     */
    TZtype: 't' | 'n';

    /**
     * Determines propability if the location is at sea or not as number from 1..0
     */
    atSea: number;

    /**
     * Formatted time of dusk
     */
    dusk: `${number}:${number}`;
    duskTs: Timestamp;

    /**
     * Current time is night or not
     */
    isDay: boolean;

    /**
     * When the night starts
     */
    night: ISODateString;

    /**
     * Monet when, the data object was creted (for check of being obsolete)
     */
    nowObserved: ISODateString;

    sunrise: `${number}:${number}`;
    sunriseTs: Timestamp;
    sunset: `${number}:${number}`;
    sunsetTs: Timestamp;
}

/**
 * Summary day as received from backend
 */
export interface SummaryDay {
    /**
     * Identifier of the day
     */
    date: YearMonthDay;

    /**
     * Day of the molnth (starting with 1)
     */
    day: number;

    /**
     * Weather icon identifier (legacy version)
     */
    icon: number;

    /**
     * Weather icon identifier
     */
    icon2: number;

    /**
     * At which index, in the data table, the day starts
     */
    index: number;

    /**
     * How many segments, in the data table, the forecast has
     */
    segments: number;

    /**
     * Max temp in K
     */
    tempMax: NumValue;

    /**
     * Min temp in K
     */
    tempMin: NumValue;

    /**
     * Timestamp of midnight when the segment starts
     */
    timestamp: Timestamp;

    /**
     * Translation string for weekday
     */
    weekday: Weekday;

    /**
     * Mean/Average Wind force
     */
    wind: NumValue;

    /**
     * Prevailing wind direction
     */
    windDir: NumValue;

    /**
     * CAP Alert warning identifier as teo letter designstor
     */
    warning?: string;
}

/**
 * Weather data object as received from backend (compacted version)
 */
export interface SummaryDataHash {
    /**
     * Precip amount
     */
    mm: NumValue[];

    /**
     * Is the preciptitaion in a form fo snow?
     */
    snow: (1 | 0)[];

    /**
     * Temp in K
     */
    temp: NumValue[];

    /**
     * Timestamp of beginning of segment
     */
    ts: Timestamp[];

    /**
     * Wind force
     */
    wind: NumValue[];
}

export interface IsDay {
    /**
     * Is the segment day/night or sunrise/sunset as 0,1 or day/night ratio
     */
    isDay: (0 | 1 | number)[];
}

/**
 * Weather data object as received from backend (full version)
 */

export interface DataHash extends SummaryDataHash, IsDay {
    /**
     * Day identifier
     */
    day: YearMonthDay[];

    /**
     * Feeling temperature
     */
    feelTemp?: NumValue[];

    /**
     * Wind gust
     */
    gust: NumValue[];

    /**
     * Local Time hour for given place in 24h format
     */
    hour: number[];

    /**
     * Weather icon identifier (legacy version)
     */
    icon: number[];

    /**
     * Weather icon identifier
     */
    icon2: number[];

    /**
     * Moon phase icon identifier
     */
    moonPhase: number[];

    /**
     * Date of segment beggining
     */
    origDate: ISODateString[];

    /**
     * TS of segment beggining (seems same as ts)
     */
    origTs: Timestamp[];

    /**
     * ?????
     */
    //precipitation: NumValue[];

    /**
     * Surface air pressure
     */
    pressure: NumValue[];

    /**
     * Relative humidity
     */
    rh: NumValue[];

    /**
     * Is the forecasted precipitation rain?
     */
    rain: (0 | 1)[];

    /**
     * ????
     */
    //snowFraction: NumValue[];

    /**
     * Amount of snow precipitation
     */
    snowPrecip: NumValue[];

    /**
     * Amount of convective precipitation
     */
    convPrecip?: NumValue[];

    /**
     * Weather code, that explains used weather icon
     */
    weathercode: string[];

    /**
     * Wind direction
     */
    windDir: NumValue[];

    /**
     * Dew point
     */
    dewPoint: NumValue[];

    /**
     * CAP warnings as a string /^[MSE][Type]/
     * can be easilly typed later on
     */
    warnings?: string[];

    /**
     * Cloud base
     */
    cbase?: NumValue[];

    /**
     * These properties are prosent, onoy in certail modelsin the sea or nearby of sea
     */
    swell?: NumValue[];
    swellDir?: NumValue[];
    swellPeriod?: NumValue[];

    swell1?: NumValue[];
    swell1Dir?: NumValue[];
    swell1Period?: NumValue[];

    swell2?: NumValue[];
    swell2Dir?: NumValue[];
    swell2Period?: NumValue[];

    waves?: NumValue[];
    wavesDir?: NumValue[];
    wavesPeriod?: NumValue[];

    /**
     * These properties are monkey patched to data table by detail plugin
     * TODO: put in diff type
     */
    [key: `${string}/wind`]: NumValue[];
    [key: `${string}/windDir`]: NumValue[];
    [key: `${string}/gust`]: NumValue[];

    /**
     * TODO This is ugly. Plugin station renames `mm` to `precip` property just to suit its rendering
     */
    precip?: NumValue[];

    turbulence?: NumValue[];
    icing?: NumValue[];
}

/**
 * It picks all properties from DataHash which extends type passed to U parameter.
 * Strict means the extension has to be from both sides.
 *
 * @example
 * PickDataHashPropsByType<string[]> = { date: ..., origDate: ..., weathercode: ... };
 * PickDataHashPropsByType<string, false> even with `warnings`, because the could be undefined and undefined does not extend number[]
 */
export type PickDataHashPropsByType<U, Strict = true> = Pick<
    DataHash,
    {
        [P in keyof Required<DataHash>]: Strict extends true
            ? DataHash[P] extends U
                ? U extends DataHash[P]
                    ? P
                    : never
                : never
            : U extends DataHash[P]
            ? P
            : never;
    }[keyof DataHash]
>;

/**
 * node-forecast header object
 */
export interface NodeForecastHeader {
    /**
     * Quality of served data
     */
    cache: 'nearbyHit' | 'proximitiHit' | 'miss';

    /**
     * Elevation above sea level
     */
    elevation: number;

    /**
     * Height of something (it is possible, that value is monkey patched from weatherTableRender FIXME:)
     */
    height?: number;

    /**
     * Data contain info about waves
     */
    hasWaves?: number;

    /**
     * Number of available days in forecast
     */
    daysAvail?: number;

    /**
     * Served model
     */
    model: Products;

    /**
     * Ref time in format "2021-09-11"
     */
    refTime: YearMonthDay;

    /**
     * Ref time as timestamp
     */
    refTimeOrig: Timestamp;

    /**
     * Hour model step
     */
    step: 1 | 3;

    /**
     * Update time of weather model
     */
    update: ISODateString;

    /**
     * Update time of weather model
     */
    updateTs: Timestamp;

    /**
     * Some basic celestial stuff (why is it here???)
     */
    sunrise: Timestamp;
    sunset: Timestamp;
    tzName: string;

    /**
     * Resulted data table consist of two merged models together
     */
    merged: boolean;

    /**
     * Which model was merged with previous
     */
    mergedModel: Products;

    /**
     * Human readable merged model name
     */
    mergedModelName: string;

    /**
     * Ref time of merged model
     */
    mergedModelRefTime: ISODateString;

    /**
     * [DEPRECATED, use mergedModelStartTs instead] At which table index, merged model starts
     */
    mergedModelStart: number;

    /**
     * Timestamp where the merged model starts
     */
    mergedModelStartTs: number;

    /**
     * Elevation of model grid
     */
    modelElevation: number;

    /**
     * UTC offset in hours
     */
    utcOffset: number;

    /**
     * Surface sea temperature
     */
    sst?: number;
}

/**
 * Weather data or Summary Weather data JSON as received from node-forecast
 */
export interface WeatherDataPayload<T extends DataHash | SummaryDataHash> {
    header: NodeForecastHeader;
    celestial: Celestial;
    summary: Record<YearMonthDay, SummaryDay>;
    data: T;
    now?: T extends SummaryDataHash
        ? {
              icon: number;
              temp: NumValue;
              wind: NumValue;
              windDir: NumValue;
              moonPhase: NumValue;
          }
        : never;
}

/**
 * Minimsl rqrd options for RendererWeatherTable
 */
export interface WeatherTableRenderingOptions {
    /**
     * How to display detail
     */
    display: DetailDisplayType;

    /**
     * Which rows to render
     */
    rows: DetailRows[];

    /**
     * 1h or 3h step
     */
    step: 1 | 3;

    /**
     * Width of each table cell (in pixels)
     */
    tdWidth: Pixel;

    /**
     * How many days to display
     */
    days: number;

    /**
     * Size of weather icons
     */
    iconSize: Pixel;

    /**
     * Array of times, when Alert was triggered
     */
    timestamps?: null | Timestamp[];

    /**
     * Should we display detail with Z times?
     */
    zuluMode?: boolean;

    /**
     * Shoud we display 12 or 24h format
     */
    is12hFormat?: boolean;

    /**
     * Content to put in header of legend
     */
    legendHeaderContent?: string;

    /**
     * Surface sea temperature if available
     */
    sst?: number;
}

// TS cannot extend from [] syntax, just create proxy type and use it in the next line
type DetailPluginOpenParams = PluginsOpenParams['detail'];

/**
 * Parametrs used for displaying detail (poinr forecast)
 */
export interface DetailParams extends DetailPluginOpenParams, WeatherTableRenderingOptions {
    display: DetailDisplayType;
    /**
     * Which kind of action led to displaying the detail
     */
    emitter?: 'externalOpen' | 'locationChange';

    /**
     * Should we display extended 10hours forecast?
     */
    extended: boolean;

    /**
     * Height of background canvas
     */
    height?: Pixel;

    /**
     * Required point product
     */
    model: Products;

    /**
     * Required multiple point products
     * TODO - split to more interfaces, for multimodel and others
     */
    models?: Products[];

    //source: PluginOpenEventSource;

    /**
     * Type of POI that was clicked to open detail or was contained in URL on page load
     */
    poiType?: StationOrPoiType;

    /**
     * POI id that was clicked to open detail or was contained in URL on page load
     */
    id?: string;

    /**
     * height of temperature bacground canvas
     */
    tempBgH?: Pixel;

    /**
     * Always incrementing synchornization number, that enables
     * to cancel async tasks, if we will have new version of params
     * available
     */
    syncCounter: number;
}

/**
 * Multimple weather models loaded by multiLoad.ts
 */
export interface MultiLoadPayload {
    model: PointProducts;
    fcst: WeatherDataPayload<DataHash>;
}

export type MeteogramDataHash = {
    [data in `${MeteogramLayers}-${MeteogramLevels}`]: NumValue[];
} & {
    'gh-surface': null[];
    hours: Timestamp[];
};

export interface MeteogramDataPayload {
    header: NodeForecastHeader;
    celestial: Celestial;
    data: MeteogramDataHash;
}

/**
 * Particle animation paramters
 */
export interface ExtendedRenderParams extends ExtendedTileParams, FullRenderParameters {
    canvas: HTMLCanvasElement;

    /**
     * Actual instance of particles
     */
    partObj: Particles;

    /**
     * Pointer to dest table
     */
    vectors: Float32Array;

    speed2pixel: number;
}

/**
 * Info about articles, user has already seen
 */
export interface SeenArticle {
    seen: Timestamp;
    checked: Timestamp;
    count: number;
}

/**
 * How good are observations by this AD or WX station?
 */
export interface ObservationInfo {
    avgDelayMin: number;
    avgFreqMin: number;
    latestObs: ISODateString;
    records: number;
}

export type ArticleImportances =
    | 'extreme'
    | 'severe'
    | 'moderate'
    | 'windyAnnounce'
    | 'forecast'
    | 'windyTutorial'
    | 'educational'
    | 'timeKilling'
    | 'warning';

export interface ArticleAuthor {
    avatar: string;
    profile: string;
    reputation: number;
    username: string;
    userslug: string;
}

/**
 * This format is used backend payload for info on HP
 */
export interface ArticleJson {
    author: ArticleAuthor;
    coverPhoto: {
        desc: '' | string;
        link: '' | string;
        photo: '' | string;
        showArticleCover: boolean;
        src: string;
    };
    id: number;
    importance: ArticleImportances;
    language: SupportedLanguages;
    ranking: number;
    slug: string;
    subtitle: '' | string;
    title: string;
    updated: ISODateString;

    /**
     * Monkey patched props
     */
    count: number;
    checked: Timestamp | 0;
    key: string;
}

/**
 * This format is used backend payload for list of articles
 */
export interface ExtendedArticleJson extends ArticleJson {
    countries: string | string[] | '';
    licence: 'cc-by' | 'proprietary';
    originalAuthor: {
        name: string | '';
        link: string | '';
    };
    perex: string | '';
    platform: 'all' | 'ios' | 'android';
    target: 'all' | 'index' | 'mobile';
    device: 'all' | 'desktop' | 'mobile';
    pid: number;
    published: ISODateString;
    expire: string;
    publishedBy: number;
    tags: string[];
    expiration: ISODateString;
    homepage: boolean;
    type?: 'article' | 'video';
}

/**
 * This format is used backend payload for particular article in article list
 */
export interface Article extends ExtendedArticleJson {
    status: 'published' | 'unpublished' | 'expired';
    upvotes: number;
    viewcount: number;
    internalUrl: {
        url: string;
        search: string;
        path: string;
        internal: boolean;
    }[];
    containsTwitter: boolean;
    video?: string;
    articleCoverPhoto: {
        src: string;
        photo: string;
        desc: string;
        link: string;
    };
    content: HTMLString;
    version: string;
}
export interface ServiceGeoipResponse {
    country: string;
    region: `${number}`;
    eu: '0' | '1';
    timezone: string;
    city: string;
    ll: [number, number];
    metro: number;
    area: number;
    ip: string;

    /**
     * Deprecated
     */
    hash: 'oiurouoweruouoiuou';
}

export interface BillingPluginMinimalProduct {
    productId: string;
    isSubscription: boolean;
}

export interface BillingPlugin {
    /** Retrieves a list of full product data from Apple/Google. This function must be called before making purchases. */
    getProducts: (opts: { products: BillingPluginMinimalProduct[] }) => Promise<{
        values: import('@plugins/_shared/subscription-services/subscription-services.d').IAPProduct[];
    }>;

    /** Buy the one-time product */
    buy: (opts: {
        productId: string;
    }) => Promise<
        import('@plugins/_shared/subscription-services/subscription-services.d').IAPBuyResponse
    >;

    /** Buy the subscription */
    subscribe: (opts: {
        productId: string;
        offerToken?: string;
    }) => Promise<
        import('@plugins/_shared/subscription-services/subscription-services.d').IAPBuyResponse
    >;

    /**
     * This function is only relevant to Android purchases. On Android, you must consume products that you want to let the user purchase multiple times.
     * All 3 parameters are returned by the buy() or restorePurchases() functions.
     */
    consume: (opts: {
        purchaseToken: string;
        transactionId: string;
        productId: string;
    }) => Promise<void>;

    restorePurchases: () => Promise<{
        values: string;
    }>;

    /**
     * On iOS, you can get the receipt at any moment by calling the getReceipt() function. Note that on iOS the receipt can contain multiple transactions. If successful, the promise returned by this function will resolve to a string with the receipt.
     * On Android this function will always return an empty string since it's not needed for Android purchases.
     */
    getReceipt: () => Promise<string>;
}

export interface TimeLocal {
    weekday: Weekday;
    day: string;
    month: string;
    year: string;
    /** '09' */
    hour: string;
}

export interface CapAlertHeadline {
    start: Timestamp;
    end: Timestamp;
    type: CapAlertType;
    severity: CapAlertSeverity;
    headline: string;
    event: string;
    startLocal: TimeLocal;
    endLocal: TimeLocal;
}

export interface CapAlertData extends CapAlertHeadline {
    id: string;
    ident: string;
    info: CapAlertInfo;
    lat: number;
    lon: number;
    areaDesc: string;
    languages: string[];
    senderName: string;
    updated: Timestamp;
    author: string;
    certainty: string;
}

export interface CapAlertPayload {
    version: number;
    celestial: Celestial;
    data: CapAlertData[];
}

export interface CapAlertTags {
    start: Timestamp;
    end: Timestamp;
    id: string;

    /**
     * '-' is an invalid type.
     * TODO: Client should not get invalid values. Fix it on the server side.
     */
    type: CapAlertType | '-';
    severity: CapAlertSeverity;
    lat: number;
    lon: number;
    info: CapAlertInfo;

    /**
     * monkey patched prop
     */
    x: number;

    /**
     * monkey patched prop
     */
    y: number;
}

type GeometryPoints = [number, number][];
type GeometryPolygons = GeometryPoints[];

export interface CapAlertTile {
    features: {
        /**
         * Array that contains EITHER array of arrays with two elements = GeometryPolygons
         * f.ex.: [
         *          [
         *              [0, 1],
         *              [2, 3],
         *              ...
         *          ],
         *          ...
         *     ]
         * OR it is just array of arrays with two element = GeometryPoints
         *     [
         *          [0, 1],
         *          [2, 3],
         *          ...
         *     ],
         */
        geometry: GeometryPoints | GeometryPolygons;
        tags: CapAlertTags;
        type: number;
    }[];
}

export interface IsAppleWatchPairedResult {
    value: boolean;
}

export interface IsAppleWatchCompanionAppIntalledResult {
    value: boolean;
}

export interface WatchConnectObject {
    key: string;
    value: string;
}

export interface WindyWatchPlugin {
    /**
     * Returns void, because this method only leave message to system
     * for sending and returns void, when message is saved, not delivered to watch
     * @param {WatchConnectObject} arg Object for save
     */
    sendDataToWatch(arg: WatchConnectObject): Promise<void>;
    /**
     * Watch conditions for the alert
     */
    isPaired: () => Promise<IsAppleWatchPairedResult>;
    isWatchAppInstalled: () => Promise<IsAppleWatchCompanionAppIntalledResult>;
    addWatchFace: () => Promise<unknown>;
}

export interface WindyServicePlugin {
    openSettings: () => Promise<void | string>;
    getLocationPermnissions: () => Promise<LocationPrefecernces>;
    getNotificationPermnissions: () => Promise<NoticicationPrefecernces>;
    openApplicationSettings: () => Promise<void | string>;
    isGpsEnabled: () => Promise<GpsPreferences>;
    getBatteryUsagePermissions: () => Promise<BatteryPreferences>;
    openBatterySettings: () => Promise<void>;
    getGoogleServicesAvailability: () => Promise<GoogleServicesPreferences>;
    getWidgetNotificationPermissions: () => Promise<WidgetNotificationPreferences>;
    openWidgetNotificationSettings: () => Promise<void>;
    getBackgroundLocationPermission: () => Promise<GpsPreferences>;
    openBackgroundLocationSettings: () => Promise<void>;
}
/**
 * A migration tool for transferring old Web View local storage to a new location.
 * This migration is necessary when the hostname is changed in the native Capacitor configuration.
 *
 * "Old" configuration:
 * - Host: localhost
 * - Scheme: capacitor (for iOS)
 *
 * "New" configuration:
 * - Host: windy.com
 * - Scheme: capacitor (for iOS)
 */
export interface WindyMigrationPlugin {
    /**
     * Returns the paths to old local storage based on the system. The iOS16 version is preferred if available.
     */
    findPathOldLocalStorages(): Promise<{ ios14: string | null; ios16: string | null }>;
    /**
     * Checks if at least one old local storage was found.
     */
    findOldLocalStorage: () => Promise<{ result: boolean }>;
    /**
     * Returns the file and directory structure from '/Libraries/WebKit' on iOS.
     */
    getWebKitHierarchy: () => Promise<{ result: [string] }>;
    /**
     * Initiates the migration process and natively restarts the app upon successful completion.
     * Note: This method does not control if the migration was previously done.
     */
    migrate: () => Promise<void>;
    /**
     * Will return [String:String?]? dictionary from old database
     */
    getOldLocalStorageData: () => Promise<[string: string | null] | null>;
    /**
     * Returns the timestamp of the latest migration or null if the migration hasn't been executed yet.
     */
    lastMigration: () => Promise<{ result: number | null }>;
    /**
     * Marks migration as completed and restart WebView from origin
     */
    markMigrationCompleted: () => Promise<void>;
}

export interface SocialLoginParams {
    purpose: string;
    deviceId: string;
    clientLang: string;
    targetMobile: boolean;
    platform: Platform;
    redirectUrl: string;
}

/**
 * Observation Weather Summary used in station plugin
 */
export interface ObservationSummaryRecord {
    date: YearMonthDay;
    day: number;
    end: Timestamp;
    index: number;
    segments: number;
    tempMax: NumOrNull;
    tempMaxTs: Timestamp;
    tempMin: NumOrNull;
    tempMinTs: Timestamp;
    timestamp: Timestamp;
    weekday: Weekday;
}

export type ObservationSummaryHash = Record<YearMonthDay, ObservationSummaryRecord>;

/**
 * Observation Weather data used in station plugin (so far IMHO used only to render mobile fragment)
 */
export interface ObservationFragmentHash {
    summary: ObservationSummaryHash;
    data: {
        temp: NumOrNull[];
        wind: NumOrNull[];
        mm: NumOrNull[];
        snow: NumOrNull[];
    };
}

/**
 * Opening options for Window class
 */
export interface WindowOpeningOptions {
    /**
     * Should we open the widnow without animation?
     */
    disableOpeningAnimation?: boolean;
}

/**
 * Closing options for Window class
 */
export interface WindowClosingOptions {
    /**
     * Should we close the window without animation?
     */
    disableClosingAnimation?: boolean;

    /**
     * Event that led to closing
     */
    ev?: MouseEvent | KeyboardEvent | TouchEvent;
}

/**
 * Opening parameters for WindowPlugin opening
 */
export interface PluginOpeningOptions<P extends keyof Plugins> extends WindowOpeningOptions {
    /**
     * Opening parameters
     */
    params?: PluginsOpenParams[P];
}

/**
 * Point used in rplanner
 */
export interface RplannerPoint {
    ident: number;
    marker: L.Marker;
    position: L.LatLng;
}

/**
 * Waypoint used in rplanner
 */
export interface RplannerWaypoint {
    distance?: number;
    ident?: number;
    initialBearing?: number;
    point: L.LatLng;
    rads?: {
        cosInitialBearing: number;
        cosLat: number;
        lng: number;
        sinInitialBearing: number;
        sinLat: number;
    };
}

/**
 * Handy utility to calculate scales (inspired by D3 library)
 */
export interface LinearScale {
    get: (val: NumValue) => Pixel;
    invert: (val: NumValue) => Pixel;
}

/**
 * Main GDPR, privacy or cookie consent object
 */
export interface Consent {
    /**
     * Version of the consent user agreed on. Use form 'YYYY/MM'
     *
     *  If the text on consent window will have to evolve and we will HAVE to show
     *  new version to the user.
     */
    version: string;

    /**
     * Last time when user clicked on YES or NO button
     */
    timestamp: Timestamp;

    /**
     * User agreed on anonymous analytics
     */
    analytics: boolean;

    /**
     * Was the consent explicit or just not required
     */
    explicit: boolean;
}

export interface LocationState {
    url: string;
    search: string;
}

export interface WindyOfflinePlugin {
    // startOfflineMode: () => Promise<unknown>;
    // stopOfflineMode: () => Promise<unknown>;
    controlReadiness: () => Promise<{ value: boolean }>;
    // fetchOfflineData: (payload: DownloadPayload) => Promise<unknown>;
    postMessage: (message: ClientMessage) => Promise<unknown>;
    addListener: (
        eventName: 'offlineMessage',
        callback: (message: { data: string }) => void,
    ) => void;
}

// TODO: This must be in sync with windy-plugins repository
export interface ExternalPluginConfig {
    /**
     * SEO friendly name of the plugin, that will be displayed in URL
     * if plugin is opened from URL (for example `name-of-plugin`)
     *
     * Installed plugins can  user access via URL
     * https://www.windy.com/plugins/name-of-plugin so choose your name
     * wisely.
     *
     * For example: 'hello-world'
     *
     */
    name: string;

    /**
     * Version of the plugin. Use semver format.
     */
    version: string;

    /**
     * Official title of the plugin, that will be displayed alse as browser title,
     * when plugin will be opened
     *
     * For example: 'Hello World plugin'
     */
    title: string;

    /**
     * Optional plugin description that will be displayed in plugins gallery
     *
     * For example: 'This plugin demonstrates capabilities of Windy Plugin System'
     */
    description?: string;

    /**
     * Plugin author name
     *
     * For example: 'John Doe (optional company name)'
     */
    author: string;

    /**
     * Location of repository, with source code of the plugin
     */
    repository?: string;

    /**
     * Optional homepage, where plugin is described in more details
     */
    homepage?: string;

    /**
     * Most of the plugins, provide information for some specific location
     * (sounding, sun tracker, etc). Therefore these plugins require lat, lon
     * information on their startup. Without location, they are useless.
     *
     * If plugin requires lat, lon, then it should be set to true, and plugin
     * can be launched from context menu on map (RH button mouse click),
     * or from menu on mobile picker.
     *
     * These types of plugin can be opened (after user installs them) from URL
     * https://www.windy.com/plugins/name-of-plugin/:lat/:lon
     *
     * When plugin is already opened, you can listen to changes of lat, lon
     * via `singleclick` event, that is fired on map or via change of
     * weather picker.
     *
     * Remember, launching plugin first, and then asking user to position
     * picker on map is not good UI practice.
     */
    requiresLatLon?: boolean;

    /**
     * Plugin behavior on desktop and tablet devices
     *
     * `rhpane` plugins occupy RH pane on desktop, which provides
     * enormous amount of space, and enables to scroll down, but
     * results in automatic closing or the plugin, when any other
     * UI element opens from right side (menu, settings etc...)
     *
     * You can use `embeded` position, whose space is limited, buui plugin
     * is embeded into main menu and stays open.
     *
     * Plugins with `none` have no UI on Windy.com and its purpose is
     * to display data on a map.
     */
    desktopUI: 'rhpane' | 'embeded' | 'none';

    /**
     * Width of `rhpane` plugin in pixels (default is 400).
     */
    desktopWidth?: number;

    /**
     * Plugin behavior on mobile devices
     *
     * `fullscreen` plugin occupies whole screen, while `small` takes only minimum
     * space on the bottom of the screen.
     *
     * Plugins with `none` have no UI on Windy.com and its purpose is (for example)
     * to display data on map.
     */
    mobileUI: 'fullscreen' | 'small' | 'none';

    /**
     * When was this plugin built
     */
    built: Timestamp;
}

/**
 * Already installed external plugin
 */
export interface LoadedExternalPluginConfig extends ExternalPluginConfig {
    /**
     * URL of the plguin is used as unique identifier
     */
    url: string;

    /**
     * From which process was plugin installed
     */
    installedBy: 'dev' | 'gallery' | 'url';

    /**
     * When was this plugin installed by specific user
     */
    installed: Timestamp;
}
