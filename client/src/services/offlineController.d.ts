import type { Timestamp } from '@windy/types';
/**
 * Min zoom used for offline download
 */
export declare const minZoom = 5;
/**
 * Max zoom used for offline download
 */
export declare const maxZoom = 8;
export declare const installServiceWorker: () => void;
export declare const checkOfflinePlugin: () => void;
export declare const uninstallSericeWorker: () => void;
export declare const isServiceWorkerSupported: () => boolean;
export declare const getServiceWorkerError: () => string | null;
export declare const closeTopMessages: () => void;
export declare const showErrorMessage: (message: string) => void;
export declare const showReadyToGoOfflineMessage: (expires: Timestamp) => void;
export declare const showOfflineModeMessage: (lastTimeDownloaded: Timestamp) => void;
export declare const showDownloadingProgressMessage: () => void;
export declare const isProgressMessageOn: () => boolean | null;
