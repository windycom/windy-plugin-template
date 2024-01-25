export type ClickHandlerInitParams<T> = {
    el: HTMLElement;
    stopPropagation?: boolean;
    click?(_command: string, _value?: T, _noEmit?: boolean): void;
};
export declare class ClickHandler<T> {
    protected stopPropagation: boolean;
    el: HTMLElement;
    constructor(params: ClickHandlerInitParams<T>);
    initProperties(): void;
    /**
     * Called after default handlers ale rulled out
     */
    protected click(_command: string, _value?: T, _noEmit?: boolean): void;
    /**
     * Initial click event
     */
    private onevent;
}
