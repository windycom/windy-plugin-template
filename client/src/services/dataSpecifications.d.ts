/**
 * Defines allowed values for data store. Do not access these values directly,
 * since format can be changed. Always use method of `store`.
 *
 * @module dataSpecifications
 */
import type { DataSpecifications } from '@windy/dataSpecifications.d';
/**
 * Mother of all settings. All the user setting (except for large data structures) should go here
 */
declare const ds: DataSpecifications;
export default ds;
