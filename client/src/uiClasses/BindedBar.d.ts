import { Bar } from '@windy/Bar';
import type { BarInitParams } from '@windy/Bar';
import type { Calendar } from '@windy/Calendar';
import type { PickDataSpecificationPropsByType } from '@windy/dataSpecifications.d';
import type { TimeFormatFunction } from '@windy/format.d';
import type { Timestamp } from '@windy/types.d';
export type BindedBarInitParams = {
    UIident: string;
    bindTimestamp: keyof PickDataSpecificationPropsByType<Timestamp>;
    bindCalendar: keyof PickDataSpecificationPropsByType<Calendar, false>;
    bindAnimation: keyof PickDataSpecificationPropsByType<boolean>;
} & BarInitParams;
export declare class BindedBar extends Bar {
    /**
     * To prevent cycling
     */
    protected UIident: string;
    /**
     * Value to be binded as timetamp
     */
    protected bindTimestamp: keyof PickDataSpecificationPropsByType<Timestamp>;
    /**
     * Value to be binded as calendar
     */
    private bindCalendar;
    /**
     * Value binded with animation true/false
     */
    private bindAnimation;
    protected displayHour: TimeFormatFunction;
    protected zuluMode: boolean;
    protected numberOfHours: number;
    constructor(params: BindedBarInitParams);
    unmount(): void;
    protected onbcast(): void;
    protected stopAnim(): void;
    protected ondragstart(_startXY: [number, number]): void;
    /**
     * Click on progress bar -> stop animation
     * @param event
     */
    protected click(event: MouseEvent): void;
    /**
     * Initialization of progressBar after changing of product etc.
     * @param calendar
     * @returns
     */
    protected setCal(calendar: Calendar | null): void;
    private render;
    private ontstamp;
}
