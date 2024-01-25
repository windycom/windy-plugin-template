import type { ReverseResult } from '@windy/dataSpecifications.d';
import type { LatLon } from '@windy/interfaces.d';
/**
 * Returns reverse data for given lat,lon
 *
 * @param latLon `lat` and `lon` of the place to geo reverse
 * @param forcedZoom Optionally zoom to force
 * @returns Reverse data, fallback object if anything failed
 */
export declare const get: <T extends LatLon>({ lat, lon }: T, forcedZoom?: number) => Promise<ReverseResult>;
