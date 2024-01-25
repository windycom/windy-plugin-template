declare const _default: {
    /**
     * Language parsed from startupUrl, null if cannot be parsed
     */
    lang: string | null;
    /**
     * Path part of the startup URL without SEO parts
     */
    purl: string;
    /**
     * Path part of the initial URL when client was open
     */
    startupUrl: string;
    /**
     * Overlay parsed from startupUrl, null if cannot be parsed
     */
    overlay: string | null;
};
export default _default;
