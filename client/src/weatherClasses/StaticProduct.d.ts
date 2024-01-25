import { Product } from '@windy/Product';
import type { ProductInitParams } from '@windy/Product';
export declare class StaticProduct extends Product {
    constructor(params: ProductInitParams);
    refTime(): string;
    open(): Promise<undefined>;
}
