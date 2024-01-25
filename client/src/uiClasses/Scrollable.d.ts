export type ScrollableInitParams = Pick<Scrollable, 'scrollEl'>;
export declare class Scrollable {
    scrollTicking: boolean;
    protected scrollEndTimer: ReturnType<typeof setTimeout> | null;
    scrollEl: HTMLElement;
    constructor(params: ScrollableInitParams);
    onscroll(_ev: Event): void;
    /**
     * Forces to scroll table to selected @stop position
     */
    scrollTo(stop: number): void;
    protected onscrollend(): void;
    private scrollFired;
}
