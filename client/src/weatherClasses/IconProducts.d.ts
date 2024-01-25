import { Product } from '@windy/Product';
import type { ProductInitParams } from './Product';
export declare class IconProducts extends Product {
    constructor(params: Pick<ProductInitParams, 'modelName'> & Partial<ProductInitParams>);
}
