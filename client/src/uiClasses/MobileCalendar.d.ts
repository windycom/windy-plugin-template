import { Scrollable } from '@windy/Scrollable';
import type { Calendar } from '@windy/Calendar';
import type { ScrollableInitParams } from '@windy/Scrollable';
import type { TimeFormatFunction } from '@windy/format.d';
import type { Timestamp } from '@windy/types.d';
export type MobileCalendarInitParams = {
    boxEl: HTMLDivElement;
    wrapperEl: HTMLDivElement;
    scrolling: boolean;
    noAnimation: boolean;
    tsPx: number;
    calExpandedTimeout: ReturnType<typeof setTimeout> | null;
    UIident: string;
    bindedStore?: 'timestamp';
} & ScrollableInitParams;
export declare class MobileCalendar extends Scrollable {
    private scrolling;
    private noAnimation;
    private wrapperEl;
    /**
     * timestamp per pixel ratio - must be in sync with CSS
     * 3 hour = 20px
     */
    private tsPx;
    /**
     * Handle of a timeout that controls the `mobile-calendar-expanded` class
     */
    private calExpandedTimeout;
    private bindedStore;
    localeHours: TimeFormatFunction;
    zuluMode: boolean;
    boxEl: HTMLDivElement;
    UIident: string;
    timestamp: Timestamp;
    calendar: Calendar | null;
    constructor(params: MobileCalendarInitParams);
    unmount(): void;
    onscroll(ev: Event): void;
    render(): void;
    renderBox(): void;
    /**
     * Scrolls to selected ts
     */
    set(ts: Timestamp, UIident?: string): void;
    protected onscrollend(): void;
    private slideUp;
}
