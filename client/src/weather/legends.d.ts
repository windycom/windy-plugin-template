import type { Layers } from '@windy/Layer.d';
import type { Legend } from '@windy/Metric.d';
declare const customLegends: {
    [P in Layers]?: Legend;
};
export default customLegends;
