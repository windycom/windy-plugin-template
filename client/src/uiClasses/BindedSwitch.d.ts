import { Switch } from '@windy/Switch';
import type { DataSpecifications } from '@windy/dataSpecifications.d';
import type { SwitchInitParams } from '@windy/Switch';
export type BindedSwitchInitParams<T extends keyof DataSpecifications> = {
    bindStore: T;
} & SwitchInitParams<DataSpecifications[T]['def']>;
/**
 * BindedSwitch is a switch that is bound to a store item.
 * When the store item changes, the switch is updated.
 * When the switch is clicked, the store item is updated.
 */
export declare class BindedSwitch<T extends keyof DataSpecifications> extends Switch<DataSpecifications[T]['def']> {
    /**
     * Ident of store item to bind switch with
     */
    bindStore: T;
    constructor(params: BindedSwitchInitParams<T>);
    unmount(): void;
    set(value: DataSpecifications[T]['def'], _uiIdent?: string | void): void;
    /**
     * Handles the click event for the BindedSwitch component.
     * @param command - The command to execute.
     * @param value - The value to pass to the command.
     */
    click(command: string, value: string | DataSpecifications[T]['def']): void;
    /**
     * Optional method to re-render itself
     */
    render?(): void;
    /**
     * Optional redraw used in some instances
     */
    protected redraw?(): void;
    protected getEl(value: DataSpecifications[T]['def']): HTMLElement | null;
}
