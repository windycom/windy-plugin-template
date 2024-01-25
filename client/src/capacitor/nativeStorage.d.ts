interface CloudKitObject {
    key: string;
    value: string;
}
export interface WindyCloudKitPlugin {
    set: (arg: CloudKitObject) => Promise<unknown>;
    get: (arg: {
        key: string;
    }) => Promise<CloudKitObject>;
}
export interface WindyWidgetPlugin {
    refresh: () => Promise<unknown>;
    isWidgetInstalled: () => Promise<string | {
        value: boolean;
    }>;
}
export {};
