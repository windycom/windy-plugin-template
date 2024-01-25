import type { BcastHistory } from '@windy/interfaces.d';
import type { Timestamp } from '@windy/types.d';
/**
 * Array of 5 latest broadcasts, to add them in bug report
 */
export declare const latestBcasts: BcastHistory[];
/**
 * Logs latest bcasts
 * @param ident
 * @param msg
 * @param data
 */
export declare const addLatestBcast: (ident: string, msg: string, data?: unknown) => void;
export declare const getLatestBcasts: (now: Timestamp) => string | undefined;
