/**
 * Slides plugin from bootm on mobile
 *
 * @example
 *  if( rs.isMobile ) {
 *
 *    new BottomSlide({
 *        el: this.refs.handler, // Sensitive handler
 *        pluginEl: this.node, // El of plugin
 *        pluginName: 'articles',
 *    })
 * }
 */
import { Drag } from '@windy/Drag';
import { Swipe } from '@windy/Swipe';
import type { DragInitParams } from '@windy/Drag';
import type { Plugins } from '@windy/plugins.d';
export type BottomSlideInitParams = {
    pluginEl: HTMLElement;
    pluginName: keyof Plugins;
    scrollEl?: HTMLElement;
    closeOnSwipeDown?: boolean;
} & DragInitParams;
export declare class BottomSlide extends Drag {
    /**
     * DOM element with plugin itself
     */
    private pluginEl;
    /**
     * Ident of plugin
     */
    private pluginName;
    /**
     * Which elemnt should handle the scroll
     */
    private scrollEl?;
    /**
     * Swiping on whole element down cause closing el
     */
    private closeOnSwipeDown?;
    private threshold;
    protected swipeHandler: Swipe;
    private startY;
    private transformedY;
    private throttledY;
    private difference;
    constructor(params: BottomSlideInitParams);
    ondrag(_x: number, y: number, e: Event): void;
    ondragend(): void;
    startDrag(e: TouchEvent): void;
    private initCloseOnSwipeDown;
    private updatePosition;
}
