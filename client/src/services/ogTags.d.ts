/**
 * @module ogTags Tools to change og:tags & twitter:tags in header
 */
type AllowedTags = 'title' | 'type' | 'url' | 'description' | 'published' | 'image' | 'imageWidth' | 'imageHeight';
type OGTags = {
    [K in AllowedTags]?: string | number;
};
/**
 * Set og:tags values content. Empty string is used if no value is presented for passed key
 *
 * @param params Tags to set
 */
export declare const save: () => void;
/**
 * Saves current OG tags values in HEAD to be restored later
 */
export declare const set: (params: OGTags) => void;
/**
 * Restore OG tags to previous values
 */
export declare const restore: () => void;
export {};
