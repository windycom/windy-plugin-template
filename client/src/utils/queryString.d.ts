export type ParsedQueryString = Record<string, string>;
export declare function parseQueryString(searchQuery: string | undefined): ParsedQueryString | undefined;
