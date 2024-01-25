/**
 * Enables Scrollable DIV to be dragged left/right with mouse on non touch devices
 */
export type DraggableDivInitParams = {
    scrollEl: HTMLElement;
};
export declare class DraggableDiv {
    /**
     * Major element
     */
    private scrollEl;
    private inertiaAnim;
    constructor(params: DraggableDivInitParams);
    private getX;
    /**
     * Scrolling the table on a basis of dragging with a mouse (non-touch devices)
     * -- touch should be supported naturally by scrolling the DIV
     * https://ariya.io/2013/11/javascript-kinetic-scrolling-part-2
     */
    private startDrag;
}
