/**
 * Represents a key-value store with methods for getting, setting, and observing values.
 * The store maintains the integrity of the parameters and checks the validity of the input.
 * It also supports observing changes to the values and retrieving allowed values for each key.
 *
 * @module store
 */
import { Evented } from '@windy/Evented';
import type { DataSpecifications, DataSpecificationsObject } from '@windy/dataSpecifications.d';
import type { SetReturnType, StoreOptions, StoreTypes } from '@windy/store.d';
/**
 * All major parametrs and settings are stored inside `store`, instance of `Evented`. It is sophisticated key, value store that checks your input for validity and maintains integrity of all the parameters.
 *
 * Use methods `get` to read value from store, `set` to change value in the store and `on` to observe change of the value. Some of the items respond to method `getAllowed` to return array of allowed values.
 *
 * Method `set` returns `true` if provided value was valid and was actually changed.
 *
 * @module store
 * @example
 * var overlay = store.get('overlay')
 * // 'wind' ... actually used overlay
 *
 * allowedOverlays = store.getAllowed('overlay')
 * // ['wind', 'rain', ... ] ... list of allowed values
 *
 * store.set('overlay','rain')
 * // true ... Metric was changed to rain
 *
 * store.on('overlay', ovr => {
 *   // Message will be emited only if value wa valid and actually changed
 *   console.log('Wow, overlay has been chnaged to', ovr)
 * })
 */
declare class Store extends Evented<StoreTypes> {
    /**
     * Set default value for given key
     *
     * @param name Name
     * @param value Value
     */
    setDefault<T extends keyof DataSpecifications, Item extends DataSpecifications[T]>(name: T, value: Item['def']): void;
    /**
     * Defines property in dataSpecification list. Used for example for
     * definition of `syncSet` or `asyncSet`
     *
     * @param name identifier of property in dataSpecification
     * @param prop property
     * @param value Value
     */
    defineProperty: <T extends keyof DataSpecifications, Prop extends keyof DataSpecifications[T], Value extends DataSpecifications[T][Prop]>(name: T, prop: Prop, value: Value) => void;
    /**
     * Retrieves property from dataSpecifications
     *
     * @param name identifier of property in dataSpecification
     * @returns Stored value
     */
    getProperty: <T extends keyof DataSpecifications>(name: T) => DataSpecifications[T];
    /**
     * Checks existence of property
     *
     * @param name Name
     * @returns True if property exists
     */
    hasProperty: <T extends keyof DataSpecifications>(name: T) => boolean;
    _set<T extends keyof DataSpecifications, Item extends DataSpecifications[T]>(name: T, item: Item, opts: StoreOptions, value: Item['def'] | null): void;
    /**
     * Sets a value in key, value store. If succesfull,a nd value has been changed, store will brodcast message with name and value.
     * Limitation:** Our store is quite primitive so it can not compare Arrays and Objects. Always create new one or use `forceChange` * option.
     *
     * @param name Name
     * @param value Value
     * @param opts Options
     * @returns optional, returns true if value was changed, undefined if change failed, Promise obj if change was asynchronous
     */
    set<T extends keyof DataSpecifications, Item extends DataSpecifications[T]>(name: T, value: Item['def'] | null, opts?: StoreOptions): SetReturnType<T>;
    /**
     * Set it to null leading to defaults values
     *
     * @param name Name
     * @param opts Options
     */
    remove: <T extends keyof DataSpecifications>(name: T, opts?: StoreOptions) => void;
    /**
     * Outputs all allowed properties for give key into console.log
     */
    getAll: () => void;
    /**
     * Return list of permited values for given key
     *
     * @param name Name
     * @returns List of allowed values for the name; or string with info it is checked by function
     */
    getAllowed: <T extends keyof DataSpecifications, Item extends DataSpecifications[T]>(name: T) => string | Item["allowed"];
    /**
     * Returns default value for given key
     *
     * @param name Name
     * @returns Data specification type
     */
    getDefault<T extends keyof DataSpecifications, Item extends DataSpecifications[T]>(name: T): Item['def'];
    isAsyncStore<T>(item: DataSpecificationsObject<T>): item is DataSpecificationsObject<T> & Required<Pick<DataSpecificationsObject<T>, 'asyncSet'>>;
    /**
     * Check if value was changed
     * !!!! WARNING: for perfomance reasons check only against hot cache, so can
     * lead to faulty results around default || never used values
     *
     * @param name Name
     * @param item Item
     * @param value Value
     * @returns True if value was changed
     */
    wasChanged<T extends keyof DataSpecifications, Item extends DataSpecifications[T]>(name: T, item: Item, value: Item['def']): boolean;
    /**
     * Insert dataSpecifications key (if not present)
     *
     * @param name Name
     * @param obj Data speicifications object
     */
    insert: <T extends keyof DataSpecifications, Item extends DataSpecifications[T]>(name: T, obj: Item) => void;
    /**
     * Retrieves value stored in store
     *
     * @param {string} name Name
     * @param {boolean} options.forceGet Skip cache and return even nullish value with no default polyfill
     * @returns stored value
     */
    get<T extends keyof DataSpecifications, Item extends DataSpecifications[T]>(name: T, options?: {
        forceGet: boolean;
    }): Item['def'];
    isValid<T>(item: DataSpecificationsObject<T>, value: T): boolean;
}
declare const store: Store;
export default store;
