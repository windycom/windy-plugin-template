import { StaticProduct } from './StaticProduct';
import type { HttpPayload } from '@windy/http.d';
import type { SatelliteInfoJson } from '@windy/satellite.d';
import type { ProductInitParams } from './Product';
export type SatelliteProductInitParams = Pick<SatelliteProduct, 'urlSuff' | 'urlSuffFlow'> & ProductInitParams;
export declare class SatelliteProduct extends StaticProduct {
    urlSuff: string;
    urlSuffFlow: string;
    constructor(params: SatelliteProductInitParams);
    open(): Promise<undefined>;
    /**
     * Return info.json loading promise (https://sat.windy.com/satellite/info.json)
     */
    loadInfoJson(noCache?: boolean): Promise<HttpPayload<SatelliteInfoJson>>;
    /**
     * Handling keyboard shortcuts
     */
    moveTs(moveRight: boolean): void;
}
