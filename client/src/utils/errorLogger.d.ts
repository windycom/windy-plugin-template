/**
 * catches all runtimes exceptions and sends them to kibana on backend.
 * Defines global `logError( moduleName, msg, errObj )` for custom err loggin.
 * Licences go here since this is the first minified file
 */
import type { ErrorPayload } from '@windy/errorLogger.d';
/**
 * Array of all errors reported to kibana, to show them in debug mode
 * plugin
 */
export declare const sentErrors: ErrorPayload[];
