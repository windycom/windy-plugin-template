import type { Fav, UpcomingFav } from '@windy/interfaces.d';
export type FavKey = string;
export type FavsInitParams = {
    ident: `favs${number}` | `recents${number}`;
};
export declare class Favs<T extends Fav> {
    /** Local storage key (under which are data stored) */
    protected ident: `favs${number}` | `recents${number}`;
    private lastModified?;
    /** Major data holder */
    data: Record<FavKey, T>;
    constructor(params: FavsInitParams);
    /**
     * Returning key for item key is either ICAO code or lat/lon stripped to 3 decimals or alertID
     */
    key(item: Partial<Fav> | string): string;
    /**
     * Add airport or location to local storage
     */
    prepareAdd(item: UpcomingFav): FavKey;
    /**
     * Add airport or location to local storage and sync with cloud
     * query parameter is only for inherited classes, it is not used in this class
     */
    add(item: Fav, _query?: string): boolean | Promise<string> | void;
    findFavByProperties(item: Partial<Fav> | FavKey): Fav | undefined;
    /**
     * Deduplicates two collections for example favs, recents, search results
     * returns deduplicated and mergedcollection, whereas collection2 has higher proprity
     */
    dedupeAndConcat(collection1: Fav[], collection2: Fav[]): Fav[];
    /**
     * Dedupe
     */
    dedupeFav(item: Partial<Fav> | FavKey, findingFun: (cmp: (i: Fav) => boolean) => Fav | undefined): Fav | undefined;
    /**
     * Check if this is favorite or not
     */
    isFav(item: FavKey | Partial<Fav>): boolean;
    /**
     * Save all in localStorage
     */
    save(): void;
    /**
     * Update timestamp in localStorage
     */
    updateTimestamp(): void;
    /**
     * Load from localStorage
     */
    load(): void;
    /**
     * Called upon add/removal
     */
    onchange(): void;
    /**
     * Remove fav item from local storage - key or object
     */
    prepareRename(fav: Fav, name: string): boolean;
    rename(fav: Fav, name: string): void;
    /**
     * Remove fav item from local storage - key or object
     */
    prepareRemove(item: Fav | FavKey): void;
    /**
     * Remove fav item. Second parameter and promise return type is to stay consistent with child types inheriting from this
     */
    remove(item: Fav | FavKey, _isAlert?: boolean): Promise<void>;
    getAll(): Record<string, T>;
    /**
     * increase counter of item
     */
    hit(item: Fav): void;
    /**
     * Filters && sorts items and rtrns a list of keys
     */
    sortFavs(query: string | undefined | null, sortProperty: 'timestamp' | 'counter', excludeItems?: FavKey[] | null): FavKey[];
    /**
     * Returns array of up to @num most popular items filtered by @query and sorted by @sortProperty. @exclude is list
     * of items containing keys that should be excluded from result
     */
    get(num: number, query: string | undefined | null, sortProperty: 'timestamp' | 'counter', exclude?: Fav[]): Fav[];
}
