import type { DownloadPayload, DownloadedInfo } from '../../plugins/offline/offline';
export declare const cacheUrl: (cache: Cache, url: string, testIfUrlIsInCache?: boolean, tryTwice2DownloadFiles?: boolean) => Promise<boolean>;
export declare const cancelOngoingDownloads: () => boolean;
/**
 * Download all files in parallel
 * @param cache instance of Cache
 * @param urls list of rqrd URLs
 * @param checkIfUrlIsInCache Should we check if URKL is in cache before attempting to doqnload it?
 * @param calledOnDownlodedOneFile callback that is called each time one file is downloaded
 * @returns all Erorred urls or null if task was cenceled
 */
export declare const downloadFilesInParallel: (cache: Cache, urls: string[], checkIfUrlIsInCache: boolean, tryTwice2DownloadFiles: boolean, calledOnDownlodedOneFile: () => void) => Promise<{
    result: 'downloadingCanceled' | 'ok';
    errors?: string[] | undefined;
}>;
export declare function download({ numberOfFiles, batches, mapBoundaries, overlays, products, daysToLoad, lastTimestamp, assets, mainEntryPoint, }: DownloadPayload): Promise<DownloadedInfo | void>;
