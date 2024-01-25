/**
 * Drag: Basic draggable Class
 *
 * @module Drag
 */
export type DragInitParams = Pick<Drag, 'el'> & {
    supportTouch?: boolean;
    preventDefault?: boolean;
    passiveListener?: boolean;
    ondrag?(x: number, y: number, e: MouseEvent | TouchEvent): void;
    ondragstart?(startXY: [number, number]): void;
    ondragend?(e: MouseEvent | TouchEvent): void;
    bindedDrag?: (e: MouseEvent | TouchEvent) => void;
    bindedEndDrag?: (ev: MouseEvent | TouchEvent) => void;
    bindedStart?: (e: MouseEvent | TouchEvent) => void;
    startDrag?(e: MouseEvent | TouchEvent): void;
    endDrag?(ev: MouseEvent | TouchEvent): void;
};
export declare class Drag {
    protected supportTouch: boolean;
    protected preventDefault: boolean;
    /**
     * Use false to disable passive listener for 'touchmove'
     */
    protected passiveListener: boolean;
    private startXY;
    private bindedDrag;
    private bindedEndDrag;
    private bindedStart;
    offsetX: number;
    offsetY: number;
    dragging: boolean;
    el: HTMLElement;
    constructor(params: DragInitParams);
    ondragend?(e: MouseEvent | TouchEvent): void;
    destroy(): void;
    ondragstart?(startXY: [number, number]): void;
    ondrag?(x: number, y: number, e: MouseEvent | TouchEvent): void;
    startDrag(e: MouseEvent | TouchEvent): void;
    protected endDrag(ev: MouseEvent | TouchEvent): void;
    private getXY;
    private _drag;
}
