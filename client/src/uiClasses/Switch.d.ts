import { ClickHandler } from '@windy/ClickHandler';
import type { ClickHandlerInitParams } from '@windy/ClickHandler';
export type SwitchInitParams<T> = ClickHandlerInitParams<T> & {
    initValue?: T | null;
    onset?(_value: T): void;
};
export declare class Switch<T> extends ClickHandler<T> {
    /**
     * Init value
     */
    protected initValue: T | null;
    protected selected: T | null;
    constructor(params: SwitchInitParams<T>);
    set(value: T, noEmit?: boolean): void;
    /**
     * Returns first element with particular value
     */
    protected getEl(value: T): HTMLElement | null;
    protected click(command: string, value: T, noEmit?: boolean): void;
    /**
     * Will be called upon click on something
     */
    protected onset(_value: T): void;
}
