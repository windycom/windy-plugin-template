import '@windy/geolocation';
export interface PromoInfoObject {
    displayed: number;
    ts: number;
}
/**
 * TODO: Keep this as default export due to backward compatibility with client-patch
 */
declare const _default: {
    /**
     * Get basic info about promo
     *
     * @param ident Identificator
     * @returns Promo info object
     */
    getCounter2: (ident: string) => PromoInfoObject;
    /**
     * Increases 'seen' counter for particular promo
     *
     * @param ident Ident
     */
    hitCounter: (ident: string) => void;
    /**
     * Flag the promo to be never seen again (by setting
     * its number to 1000)
     *
     * @param ident Ident
     */
    neverSee: (ident: string) => void;
    /**
     * Get raw promo object from localStorage
     *
     * @returns Local promos
     */
    getAll: () => Record<string, number> | undefined;
};
export default _default;
