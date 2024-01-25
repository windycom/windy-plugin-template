import type { DataSpecifications } from '@windy/dataSpecifications.d';
type BindedCheckboxInitParams<T extends keyof DataSpecifications> = {
    el: HTMLElement;
    bindStore: T;
    onValue?: DataSpecifications[T]['def'];
    offValue?: DataSpecifications[T]['def'];
};
export declare class BindedCheckbox<T extends keyof DataSpecifications> {
    /**
     * Element in DOM
     */
    private el;
    /**
     * Store item binded to this DOM el
     */
    private bindStore;
    /**
     * What kind of value is considered ON in the store
     */
    private onValue;
    /**
     * What kind of value is considered OFF in the store
     */
    private offValue;
    constructor(params: BindedCheckboxInitParams<T>);
    unmount(): void;
    toggle(): void;
    private set;
}
export {};
