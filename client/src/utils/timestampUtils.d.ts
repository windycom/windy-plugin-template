import type { Timestamp } from '@windy/types';
/**
 * Finds closest timestamp index
 */
export declare function getClosestTimestampIndex(timestamps: Timestamp[], searchedTimestamp: Timestamp, allowOutOfRange: boolean): number | undefined;
