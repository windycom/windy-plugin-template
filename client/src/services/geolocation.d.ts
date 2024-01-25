import '@windy/router';
import type { GeolocationInfo, HomeLocation } from '@windy/interfaces.d';
import type { PositionOptions } from '@capacitor/geolocation';
/**
 * Returns either GPS or IP location whichever is newer
 *
 * @returns Location got from GPS or IP, the newer is prefered
 */
export declare const getMyLatestPos: () => GeolocationInfo;
/**
 * Returns promise on GPS based location with GeoIP location as a fallback
 *
 * @param options Optionally custom options passed to Capacitor geolocation plugin
 * @returns Geolocation info from GPS, GeoIP as a fallback
 */
export declare const getGPSlocation: (options?: PositionOptions) => Promise<GeolocationInfo>;
/**
 * Returns fallback name created from lat,lon if nothing else can be used
 *
 * @param lat Latitude
 * @param lon Longitude
 * @returns Fallback location name in a format "49.15, 14.18"
 */
export declare const getFallbackName: (lat: number | string, lon: number | string) => string;
/**
 * Gets accurate home location. Cannot be used in map initialization beacause it is async.
 *
 * @param cb Callback function to call when location is get. Location info object is passed as a callback argument
 */
export declare const getHomeLocation: (cb: (loc: GeolocationInfo | HomeLocation) => void) => void;
