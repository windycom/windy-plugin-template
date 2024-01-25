import { BindedBar } from '@windy/BindedBar';
import type { BindedBarInitParams } from '@windy/BindedBar';
export type TimestampBarInitParams = Omit<BindedBarInitParams, 'bindTimestamp' | 'bindCalendar' | 'bindAnimation'>;
export declare class TimestampBar extends BindedBar {
    constructor(params: TimestampBarInitParams);
    protected createText(el: HTMLElement): string;
    protected createGhostText(ghostLeft: number): string;
}
