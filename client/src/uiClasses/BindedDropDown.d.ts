import { BindedSwitch } from '@windy/BindedSwitch';
import { DropDown } from '@windy/DropDown';
import type { BindedSwitchInitParams } from '@windy/BindedSwitch';
import type { DropDownInitParams } from '@windy/DropDown';
import type { DataSpecifications } from '@windy/dataSpecifications.d';
export type BindedDropDownInitParams<T extends keyof DataSpecifications> = DropDownInitParams<DataSpecifications[T]['def']> & BindedSwitchInitParams<T>;
export declare class BindedDropDown<T extends keyof DataSpecifications> extends DropDown<DataSpecifications[T]['def']> {
    protected initValue: DataSpecifications[T]['def'];
    protected selected: DataSpecifications[T]['def'];
    bindedSwitch: BindedSwitch<T>;
    constructor(params: BindedDropDownInitParams<T>);
    set(value: DataSpecifications[T]['def'], _uiIdentOrNoEmit?: string | boolean | void): void;
    unmount(): void;
}
