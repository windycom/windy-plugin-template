import type { ExternalPluginConfig, LoadedExternalPluginConfig } from '@windy/interfaces.d';
export type ExternalPluginError = {
    type: 'network' | 'installation' | 'open';
    msg: string;
};
export declare const openExternalPlugin: (url: string) => Promise<ExternalPluginError | ExternalPluginConfig>;
export declare const installExternalPlugin: (url: string, installedBy: LoadedExternalPluginConfig['installedBy']) => Promise<LoadedExternalPluginConfig | ExternalPluginError>;
