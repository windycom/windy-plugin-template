import { Calendar } from '@windy/Calendar';
import { Product } from '@windy/Product';
import type { ProductInitParams } from '@windy/Product';
/**
 * Common product params for ECMWF products.
 */
export declare const EcmwfProductParams: {
    modelName: string;
    modelResolution: number;
    provider: string;
    interval: number;
    intervalPremium: number;
    maxTileZoom: {
        free: number;
        premium: number;
    };
    dataQuality: "normal";
};
export declare class EcmwfProduct extends Product {
    calendar: Calendar;
    constructor(params: Partial<ProductInitParams>);
    /**
     * Create fake minifest file for ECMWF product to use it during rendering of
     * UI before real minifest is loaded.
     *
     * DO NOT TRY TO USE THIS CALENDAR FOR FETCHING DATA FROM SERVER!!!!
     */
    static createVirtualCalendar(this: EcmwfProduct): Calendar;
}
