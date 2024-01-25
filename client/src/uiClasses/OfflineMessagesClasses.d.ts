import { Window } from '@windy/Window';
import type { DownloadProgress } from '@plugins/offline/offline.d';
import type { Timestamp } from '@windy/types';
export declare class OfflineModeTopMessage extends Window {
    lastTimeDownloaded: Timestamp;
    timer: ReturnType<typeof setInterval> | null;
    constructor(lastTimeDownloaded: Timestamp);
    onclose(): void;
    onopen(): void;
}
export declare class DownloadingProgressTopMessage extends Window {
    bindedOnProgress: ({ data }: {
        data: DownloadProgress;
    }) => void;
    progressEl: HTMLDivElement;
    progressBarEl: HTMLDivElement;
    constructor();
    onProgress({ data }: {
        data: DownloadProgress;
    }): void;
    onclose(): void;
    onopen(): void;
}
export declare class GoOfflineModeTopMessage extends Window {
    expires: Timestamp;
    timer: ReturnType<typeof setInterval> | null;
    constructor(expires: Timestamp);
    onclose(): void;
    onopen(): void;
}
