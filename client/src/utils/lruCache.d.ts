type Key = string | number;
interface Entry<T> {
    key: Key;
    value: T;
    older: undefined | Entry<T>;
    newer?: Entry<T>;
}
declare class LRUCache<T = unknown> {
    private size;
    private limit;
    private _keymap;
    private tail;
    private head;
    constructor(limit: number);
    /**
     * Put <value> into the cache associated with <key>.
     *
     * @param key Key of the cache item
     * @param value Value of the cache item
     * @returns The entry which was removed to make room for the new entry. Otherwise undefined is returned (i.e. if there was enough room already).
     */
    put(key: Key, value: T): Entry<T> | void;
    /**
     * Returns a JSON (array) representation of the cache
     *
     * @returns Array of key-value pairs
     */
    toJSON(): {
        key: Key;
        value: T;
    }[];
    /**
     * Purge the least recently used (oldest) entry from the cache.
     *
     * If you need to perform any form of finalization of purged items, this is a
     * good place to do it. Simply override/replace this function:
     *
     * ```
     *   var c = new LRUCache(123);
     *   c.shift = function() {
     *     var entry = LRUCache.prototype.shift.call(this);
     *     doSomethingWith(entry);
     *     return entry;
     *   }
     * ```
     *
     * @returns The removed entry or undefined if the cache was empty.
     */
    shift(): Entry<T> | undefined;
    /**
     * Get and register recent use of <key>.
     *
     * @param key Key of cache item
     * @returns The value associated with <key> or undefined if not in cache.
     */
    get(key: Key): T | undefined;
    /**
     * Remove entry <key> from cache and return its value.
     *
     * @param key Key of cache item
     * @returns Value of removed item, undefined if not found
     */
    remove(key: Key): T | undefined;
    /**
     * Removes all entries
     */
    removeAll(): void;
}
export default LRUCache;
