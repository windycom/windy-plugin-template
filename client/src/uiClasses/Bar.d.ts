/**
 * @class Bar
 * Horizontal ProgressBar Class binded to stores's `timestamp`
 * @example
 *
 *    new Bar({
 *        progressLine: _.$(...)    // el to catch mouseevents
 *    })
 */
import { Drag } from '@windy/Drag';
import { GhostBox } from '@windy/GhostBox';
import type { Calendar } from '@windy/Calendar';
import type { Timestamp } from '@windy/types';
export type BarInitParams = {
    progressBar: HTMLDivElement;
    offset?: number;
    borderOffset?: number;
    jumpingGhost?: boolean;
    bcastLimit?: number;
    jumpingWidth?: number;
    resizableEl?: HTMLElement;
};
export declare class Bar {
    protected drag: Drag;
    protected ghostBox?: GhostBox;
    /**
     * EL of wrapping element,
     */
    private progressBar;
    /**
     * A progress line to be used in GhostBox. We need to make a copy here for mobile where
     * the GhostBox is not present.
     */
    private progressLine;
    /**
     * Offset from left side of begginging of pb
     */
    private offset;
    /**
     * offset of pb from border of a screen
     */
    private borderOffset;
    /**
     * How often bcast dragging
     */
    private bcastLimit;
    /**
     * Width of main box fo ghost jumping
     */
    protected jumpingWidth: number;
    private maxWidth;
    private pxRatio;
    private timecode;
    private b?;
    private played?;
    private ghostTxt?;
    private throttledBcast;
    protected progressWidth: number;
    protected calendar: Calendar | null;
    protected left: number;
    protected calendarHours: number;
    protected timestamp: Timestamp;
    protected text: HTMLDivElement;
    protected resizableEl: HTMLElement;
    /**
     * Should ghost box jump over timebox?
     */
    jumpingGhost: boolean;
    constructor(params: BarInitParams);
    /**
     * creates text in the timeBox on a basis of
     * relative position on a progressBar
     */
    protected createText(_el: HTMLDivElement): string;
    protected pos2ts(pos: number): number;
    protected createGhostText(_left: number): string;
    protected setTimestamp(ts: number): void;
    /**
     * Time box change its position
     */
    protected update(newPos: number): number;
    /**
     * Call recalculate && setIndex
     */
    protected onresize(): void;
    /**
     * Click on progress bar
     */
    protected click(event: MouseEvent): void;
    /**
     * Sets timestamp
     * noAnimation ... do not do CSS animation
     */
    protected set(timestamp: Timestamp): void;
    protected onbcast(): void;
    protected ondragstart(_startXY: [number, number]): void;
    protected ondragend(_e: MouseEvent | TouchEvent): void;
    /**
     * Main timebox
     */
    private ondrag;
    /**
     * Updates timestamp and broadcasts it out
     */
    private bcast;
    private addAnimation;
    private removeAnimation;
    /**
     * Position based on ts
     */
    private ts2pos;
    private updateBarFreeRange;
    private updateGhost;
}
