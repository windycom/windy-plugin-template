import { BindedSwitch } from '@windy/BindedSwitch';
import type { BindedSwitchInitParams } from '@windy/BindedSwitch';
export type ProductSwitchInitParams = {
    showResolution?: boolean;
} & Omit<BindedSwitchInitParams<'product'>, 'bindStore'>;
export declare class ProductSwitch extends BindedSwitch<'product'> {
    showResolution: boolean;
    constructor(params: ProductSwitchInitParams);
    printHTML(prods?: ("satellite" | "radar" | "cams" | "capAlerts" | "icon" | "gfs" | "ecmwf" | "ecmwfAnalysis" | "ecmwfWaves" | "gfsWaves" | "iconWaves" | "efi" | "cmems" | "drought" | "fireDanger" | "activeFires" | "nems" | "namConus" | "namHawaii" | "namAlaska" | "iconEu" | "iconD2" | "arome" | "aromeAntilles" | "aromeReunion" | "camsEu" | "iconEuWaves" | "hrrrAlaska" | "hrrrConus" | "bomAccess" | "ukv" | "mblue")[]): void;
    /**
     * The menu is already in a DOM since we do not modify products so often
     */
    protected redraw(): void;
}
