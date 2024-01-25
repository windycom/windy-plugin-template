import type { Timestamp } from '@windy/types.d';
import type { DownloadProgress, ServiceWorkerMessage } from '@plugins/offline/offline';
/**
 * The reson why we are using this function to wrap postMessage is that
 * we can use TS to check typings of the message
 */
export declare const sendMessageToClient: (message: ServiceWorkerMessage['data'] | DownloadProgress) => Promise<void>;
export declare const storeData: <T extends Object>(key: string, data: T) => Promise<void>;
export declare const getData: <T extends Object>(key: string) => Promise<void | T>;
export declare const deleteData: (key: string) => Promise<void>;
/**
 * Soteres mainEntryPoint as /index.html so it will be always available on this URL
 * This is basically symlink in serviceWorker cache
 */
export declare const storeMainEntryPoint: (mainEntryPoint: string) => Promise<void>;
export declare const isReadyForOfflineMode: () => Promise<void | Timestamp>;
