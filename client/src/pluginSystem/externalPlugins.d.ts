import type { InstalledExternalPluginConfig } from '@windy/interfaces.d';
export type ExternalPluginError = {
    type: 'network' | 'installation' | 'open';
    msg: string;
};
export declare const installExternalPlugin: (url: string, installedBy: InstalledExternalPluginConfig['installedBy']) => Promise<InstalledExternalPluginConfig | ExternalPluginError>;
