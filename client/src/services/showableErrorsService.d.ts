import type { ErrorCategory, ShowableError } from '@windy/types.d';
/**
 * Add showableError to local storage
 * @param error
 */
export declare const add: (error: ShowableError) => void;
/**
 * Sets showableError to not be displayed anymore
 * @param errorId
 */
export declare const close: (errorId: string) => void;
/**
 * It return array unresolvedErrors with removed showableError
 * @param errorId
 */
export declare const resolve: (errorId: string) => void;
/**
 * It resolve whole category of errors from unresolvedErrors
 * @param category
 */
export declare const resolveCategory: (category: ErrorCategory) => void;
/**
 * Returns unresolved errors
 * @returns ShowableError[]
 */
export declare const getUnresolvedErrors: () => ShowableError[];
/**
 * Control if error was resolved, based on category of the error
 * @param error
 */
export declare function checkError(error: ShowableError): void;
