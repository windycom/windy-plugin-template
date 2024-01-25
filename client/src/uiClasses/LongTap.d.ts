import type { HapticsPlugin } from '@capacitor/haptics';
export type LongTapInitParams = Pick<LongTap, 'el'> & {
    useHaptics?: boolean;
    onClick?(e: MouseEvent | TouchEvent): void;
    onLongTap?(ev: MouseEvent | TouchEvent): void;
};
export declare class LongTap {
    el: HTMLElement;
    useHaptics: boolean;
    haptics: HapticsPlugin | null;
    timer: ReturnType<typeof setTimeout> | null;
    longPressed: boolean;
    constructor(params: LongTapInitParams);
    onClick(_e: MouseEvent | TouchEvent): void;
    onLongTap(_e: MouseEvent | TouchEvent): void;
    onCLickPressed(e: MouseEvent | TouchEvent): void;
    longTapPressed(e: TouchEvent): void;
    touchStart(e: TouchEvent): void;
    touchEnd(): void;
    clearLongPressTimer(): void;
}
