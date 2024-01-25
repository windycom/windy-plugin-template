import type { Drag } from './Drag';
export type GhostBoxInitParams = {
    drag: Drag;
    progressLine: HTMLElement;
    ghost: HTMLElement | null;
    updateGhost?(event: MouseEvent | TouchEvent): void;
};
export declare class GhostBox {
    private drag;
    progressLine: HTMLElement;
    ghost: HTMLElement | null;
    constructor(params: GhostBoxInitParams);
    private updateGhost;
    private onGhostMouseEnter;
    private onGhostMouseLeave;
    private onGhostMouseMove;
}
