import { BindedSwitch } from '@windy/BindedSwitch';
import type { BindedSwitchInitParams } from '@windy/BindedSwitch';
export type ProductSwitchInitParams = {
    showResolution?: boolean;
} & Omit<BindedSwitchInitParams<'product'>, 'bindStore'>;
export declare class ProductSwitch extends BindedSwitch<'product'> {
    showResolution: boolean;
    constructor(params: ProductSwitchInitParams);
    printHTML(prods?: ("radar" | "satellite" | "capAlerts" | "nems" | "namConus" | "namHawaii" | "namAlaska" | "iconEu" | "iconD2" | "arome" | "aromeAntilles" | "aromeReunion" | "camsEu" | "iconEuWaves" | "hrrrAlaska" | "hrrrConus" | "bomAccess" | "ukv" | "gfs" | "ecmwf" | "ecmwfAnalysis" | "ecmwfWaves" | "gfsWaves" | "icon" | "iconWaves" | "cams" | "efi" | "cmems" | "drought" | "fireDanger" | "activeFires" | "mblue")[]): void;
    /**
     * The menu is already in a DOM since we do not modify products so often
     */
    protected redraw(): void;
}
