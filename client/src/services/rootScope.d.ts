import type { Iconfont } from '@windy/iconfont';
import type { Isolines, Pois } from '@windy/rootScope.d';
import type { LoadedTranslations } from '@windy/trans.d';
/**
 * Version of windy package.json
 */
export declare const version: string;
/**
 * Target
 */
export declare const target: "index" | "mobile" | "lib" | "embed2";
/**
 * Platform
 */
export declare const platform: import("../../types/types").Platform;
/**
 * Device
 */
export declare const device: import("../../types/types").Device;
/**
 * List of supported languages (sync manually with Crowdin & @windy/lang config )
 */
export declare const supportedLanguages: readonly ["en", "zh-TW", "zh", "ja", "fr", "ko", "it", "ru", "nl", "cs", "tr", "pl", "sv", "fi", "ro", "el", "hu", "hr", "ca", "da", "ar", "fa", "hi", "ta", "sk", "uk", "bg", "he", "is", "lt", "et", "vi", "sl", "sr", "id", "th", "sq", "pt", "nb", "es", "de", "bn"];
/**
 * Used to download weather data files. DO NOT PUT TRAILING "/" TO THE URL
 */
export declare const server: string;
/**
 * Used to query our APIs. DO NOT PUT TRAILING "/" TO THE URL
 */
export declare let nodeServer: string;
export declare const setNodeServer: (value: string) => void;
/**
 * Map tile server
 */
export declare const tileServer: string;
/**
 * Community forum DO NOT PUT TRAILING "/" TO THE URL
 */
export declare const community = "<!-- @echo NODEBB_HOST -->";
/**
 * Where all the assets (libs,fonts,plugins,lang files) are located
 *
 * if (DEBUG && TARGET_LIB)  assets = 'http://prod.windy.com:8000/v/' + W.assets;
 *
 */
export declare const assets: string;
/**
 * Allowed parameters in URL, and also list of levels, overlay & acTimes used in app
 */
export declare const levels: readonly ["surface", "100m", "975h", "950h", "925h", "900h", "850h", "800h", "700h", "600h", "500h", "400h", "300h", "250h", "200h", "150h", "10h"];
/**
 * point forecast API endpoint prefix
 */
export declare const pointForecast = "v2.7";
/**
 * Directory containing latest weather icons
 */
export declare const iconsDir = "<!-- @echo IMG_RELATIVE_PATH -->/icons6";
/**
 * List of valid overlays
 */
export declare const overlays: readonly ["radar", "satellite", "wind", "gust", "gustAccu", "turbulence", "icing", "rain", "rainAccu", "snowAccu", "snowcover", "ptype", "thunder", "temp", "dewpoint", "rh", "deg0", "wetbulbtemp", "solarpower", "uvindex", "clouds", "hclouds", "mclouds", "lclouds", "fog", "cloudtop", "cbase", "visibility", "cape", "ccl", "waves", "swell1", "swell2", "swell3", "wwaves", "sst", "currents", "currentsTide", "no2", "pm2p5", "aod550", "gtco3", "tcso2", "go3", "cosc", "dustsm", "pressure", "efiTemp", "efiWind", "efiRain", "capAlerts", "soilMoisture40", "soilMoisture100", "moistureAnom40", "moistureAnom100", "drought40", "drought100", "fwi", "dfm10h"];
/**
 * List of valid accumulation times
 */
export declare const acTimes: readonly ["next12h", "next24h", "next2d", "next48h", "next60h", "next3d", "next5d", "next10d"];
/**
 * Products that cover only certain area
 */
export declare const localProducts: readonly ["nems", "namConus", "namHawaii", "namAlaska", "iconEu", "iconD2", "arome", "aromeAntilles", "aromeReunion", "camsEu", "iconEuWaves", "hrrrAlaska", "hrrrConus", "bomAccess", "ukv"];
/**
 * Global products
 */
export declare const globalProducts: readonly ["gfs", "ecmwf", "ecmwfAnalysis", "radar", "ecmwfWaves", "gfsWaves", "icon", "iconWaves", "capAlerts", "cams", "efi", "satellite", "cmems", "drought", "fireDanger", "activeFires"];
/**
 * Sea products
 */
export declare const seaProducts: readonly ["ecmwfWaves", "gfsWaves", "iconWaves", "iconEuWaves", "cmems"];
/**
 * Air quality product
 */
export declare const airQualityProducts: readonly ["cams", "camsEu"];
/**
 * Local products, that have point forecast
 */
export declare const localPointProducts: readonly ["namConus", "namHawaii", "namAlaska", "iconD2", "iconEu", "iconEuWaves", "arome", "aromeAntilles", "aromeReunion", "hrrrAlaska", "hrrrConus", "bomAccess", "ukv"];
/**
 * Global product, that have point forecast
 */
export declare const globalPointProducts: readonly ["gfs", "ecmwf", "icon", "mblue"];
/**
 * All land products
 */
export declare const products: readonly ["gfs", "ecmwf", "ecmwfAnalysis", "radar", "ecmwfWaves", "gfsWaves", "icon", "iconWaves", "capAlerts", "cams", "efi", "satellite", "cmems", "drought", "fireDanger", "activeFires", "nems", "namConus", "namHawaii", "namAlaska", "iconEu", "iconD2", "arome", "aromeAntilles", "aromeReunion", "camsEu", "iconEuWaves", "hrrrAlaska", "hrrrConus", "bomAccess", "ukv", "cams", "camsEu", "mblue"];
/**
 * All point products
 */
export declare const pointProducts: readonly ["gfs", "ecmwf", "icon", "mblue", "namConus", "namHawaii", "namAlaska", "iconD2", "iconEu", "iconEuWaves", "arome", "aromeAntilles", "aromeReunion", "hrrrAlaska", "hrrrConus", "bomAccess", "ukv"];
/**
 * Browsing device is mobile
 */
export declare const isMobile: boolean;
/**
 * Browsing device is tablet
 */
export declare const isTablet: boolean;
/**
 * Browsing device is mobile or tablet
 */
export declare const isMobileOrTablet: boolean;
/**
 * Browsing screen is retina
 */
export declare const isRetina: boolean;
/**
 * Preferred language (not the used one). Can contain language that is not supported by Windyty
 */
export declare const prefLang: string;
/**
 * Valid levels, their identifier and display string
 */
export declare const levelsData: {
    [L in (typeof levels)[number]]: [string, string];
};
/**
 * Valid POIs layers, their name and icon
 */
export declare const pois: Record<Pois, [keyof LoadedTranslations | string, Iconfont]>;
/**
 * List of valid isolines
 */
export declare const isolines: Isolines[];
