export {};
export declare const putInCache: (request: Request, response: Response) => Promise<void>;
export declare const getFallbackResponse: () => Promise<Response | undefined>;
export declare const cacheFirst: (request: Request, isConnectedToInternet: boolean) => Promise<Response>;
