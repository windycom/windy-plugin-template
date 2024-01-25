import { Overlay } from '@windy/Overlay';
import type { DirectionFunction } from '@windy/format.d';
import type { Overlays } from '@windy/rootScope.d';
import type { RGBNumValues } from '@windy/tileInterpolator.d';
import type { LoadedTranslations } from '@windy/trans.d';
export declare class CurrentOverlay<I extends Overlays | 'gh' = Overlays | 'gh'> extends Overlay<I> {
    createPickerHTML(values: RGBNumValues, formatDir: DirectionFunction): string;
}
export declare class WaveOverlay<I extends Overlays | 'gh' = Overlays | 'gh'> extends Overlay<I> {
    createPickerHTML(values: RGBNumValues, formatDir: DirectionFunction): string;
}
export declare class AwpOverlay<I extends Overlays | 'gh' = Overlays | 'gh'> extends Overlay<I> {
    labels: {
        [value: number]: keyof LoadedTranslations;
    };
    createPickerHTML(values: RGBNumValues): string;
}
export declare class FwiOverlay<I extends Overlays | 'gh' = Overlays | 'gh'> extends Overlay<I> {
    labels: {
        [value: number]: keyof LoadedTranslations;
    };
    createPickerHTML(values: RGBNumValues): string;
}
export declare class RainPtypeOverlay<I extends Overlays | 'gh' = Overlays | 'gh'> extends Overlay<I> {
    createPickerHTML(values: RGBNumValues): string;
}
export declare class CloudsOverlay<I extends Overlays | 'gh' = Overlays | 'gh'> extends Overlay<I> {
    createPickerHTML(values: RGBNumValues): string;
}
