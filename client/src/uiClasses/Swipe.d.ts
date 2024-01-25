export type SwipeDirection = null | 'left' | 'right' | 'up' | 'down';
export type SwipeInitParams = {
    el: HTMLElement;
    onswipe(_dir: SwipeDirection, _distance: number, _evt: TouchEvent): void;
    threshold?: number;
    onswipestart?(_evt: TouchEvent): void;
};
export declare class Swipe {
    /**
     * Element to be swiped
     */
    private el;
    /**
     * Treshold in pixels to consider element to be "swiped"
     */
    private threshold;
    private direction;
    private isSwipeValid;
    private x;
    private y;
    private xStart;
    private yStart;
    private xThrottled;
    private yThrottled;
    constructor(params: SwipeInitParams);
    private touchStart;
    private touchMove;
    private touchEnd;
    private onswipestart;
    /**
     * This method will be called during the swipe
     */
    private onswipe;
}
