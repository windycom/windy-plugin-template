import type { TileInterpolator } from '@windy/tileInterpolator';
export type InterpolatorFactory = {
    createFun: (cb: <T>(...args: unknown[]) => T | void) => void;
};
declare const _default: (cb: TileInterpolator['cb']) => void;
export default _default;
