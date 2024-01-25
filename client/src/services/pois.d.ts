/**
 * @module pois
 * Single purpose of this module is to load `poi-libs` plugin whenever user selects non-empty poi or has/adds alert/favourite
 */
import type { PoisCheckboxes } from '@windy/pois.d';
/**
 * Config for checkboxes of specified poi
 *
 * - used for dynamic rendering in rhbottom section and mobile menu
 */
export declare const poisCheckboxes: PoisCheckboxes;
/**
 * Is there something to display on map as a POI
 * TODO: Make sure Alerts are included in favs too by creating alert on map
 */
export declare const displayPoiOnMap: () => boolean;
