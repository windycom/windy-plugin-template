/**
 * Complie options
 */
declare const TARGET: 'index' | 'mobile' | 'lib' | 'embed2';
declare const TARGET_MOBILE: boolean;
declare const TARGET_EMBED2: boolean;
declare const TARGET_LIB: boolean;
declare const TARGET_INDEX: boolean;
declare const DEBUG: boolean;
declare const BETA: boolean;
declare const IS_HUAWEI: boolean;
declare const PRODUCTION: boolean;
declare const DEVELOPMENT: boolean;

declare interface AdditionalPluginAssets {
    __css?: string;
    __html?: string;
}

declare interface AdditionalSvelteAssets {
    __css?: string;
    default: typeof import('svelte').SvelteComponent;
}

// we do not want to wrap into multiple-lines
// prettier-ignore
declare type WPluginModules = {
    // svelte plugins (they all have wrapper, so same interface)
    [I in (import('../types').SveltePluginIdent | import('../types').SveltePanePluginIdent)]: typeof import('@windy/SveltePlugin').SvelteApp;
} & {
    // Plain, Tag and BottomTag plugins
    '@plugins/patch': import('@windy/Plugin').Plugin<'patch'>;

    // These plugins have stnadard export
    '@plugins/browser': typeof import('../../plugins/browser/browser');
    '@plugins/cap-alerts': typeof import('../../plugins/cap-alerts/cap-alerts');
    '@plugins/contextmenu': typeof import('../../plugins/contextmenu/contextmenu');
    '@plugins/day-switcher': typeof import('../../plugins/day-switcher/day-switcher');
    '@plugins/fav-alert-menu': typeof import('../../plugins/fav-alert-menu/fav-alert-menu');
    '@plugins/gl-particles': typeof import('../../plugins/gl-particles/gl-particles');
    '@plugins/globe': typeof import('../../plugins/globe/globe');
    '@plugins/hp-weather': typeof import('../../plugins/hp-weather/hp-weather');
    '@plugins/isolines': typeof import('../../plugins/isolines/isolines');
    '@plugins/legacy-tile-render': typeof import('../../plugins/legacy-tile-render/legacy-tile-render');
    '@plugins/particles': typeof import('../../plugins/particles/particles');
    '@plugins/picker': typeof import('../../plugins/picker/picker');
    '@plugins/poi-libs': typeof import('../../plugins/poi-libs/poi-libs');
    '@plugins/profile': typeof import('../../plugins/profile/profile');
    '@plugins/promo-mobile-intro': typeof import('../../plugins/promo-mobile-intro/promo-mobile-intro');
    '@plugins/radar': typeof import('../../plugins/radar/radar');
    '@plugins/satellite': typeof import('../../plugins/satellite/satellite');
    '@plugins/save-password': typeof import('../../plugins/save-password/save-password');
    '@plugins/screenshot': typeof import('../../plugins/screenshot/screenshot');
    '@plugins/upload': typeof import('../../plugins/upload/upload');
    '@plugins/picker-mobile': typeof import('../../plugins/picker-mobile/picker-mobile');
    '@plugins/accumulations': typeof import('../../plugins/accumulations/accumulations');
    '@plugins/mobile-calendar': typeof import('../../plugins/mobile-calendar/mobile-calendar');
    '@plugins/progress-bar': typeof import('../../plugins/progress-bar/progress-bar');
    '@plugins/rhpane-top': typeof import('../../plugins/rhpane-top/rhpane-top');
    '@plugins/rhbottom': typeof import('../../plugins/rhbottom/rhbottom');
    '@plugins/search': typeof import('../../plugins/search/search');
    '@plugins/map-selector': typeof import('../../plugins/map-selector/map-selector');
};

/**
 * Main W object
 */
declare const W: {
    /**
     * Declared during compile time in index.html
     */
    version: string;
    assets: string;
    target: typeof TARGET;
    build: string;
    startTs: number;
    detectedDevice: import('../types').Device;

    /**
     * TARGET_LIB only
     */
    lib?: {
        verbose: boolean;
        initAuth: string;
        initialized: boolean;
    };

    /**
     * TARGET_EMBED only
     */
    embed?: {
        queryString: Record<string, string>;
    };

    /**
     * All other modules go here
     */
    [key: string]: unknown;
};

declare interface Document {
    webkitFullscreenEnabled?: boolean;
    mozWebkitFullscreenEnabled?: boolean;
    msWebkitFullscreenEnabled?: boolean;
}

/**
 * Global objects
 */
declare interface Window {
    /**
     * Main Windy global object
     */
    W: typeof W;

    /**
     * Google Recaptcha callback. Must be set on Window since it gets overwritten by external script.
     * It is set when the recaptcha script is loaded.
     * It gets nulled out when the registration form is closed.
     */
    recaptchaV2callback: ((response: string) => void) | null;

    /**
     * Google Recaptcha error callback. Must be set on Window since it gets overwritten by external script.
     */
    recaptchaV2error: (() => void) | null;

    noUiSlider: noUiSlider.noUiSlider;

    fastspringPopupWebhookHandler: (
        data: import('@plugins/_shared/subscription-services/subscription-services.d').FSBuyResponse,
    ) => void;
    fastspringPopupClosedHandler: () => void;
    fastspringMarkupDataHandler: (
        data: import('@plugins/_shared/subscription-services/subscription-services.d').FSMarkupData,
    ) => void;

    /**
     * Used in plugin widgets to enable iframe <-> communicaiotn
     */
    updateDetail: (params: import('@windy/interfaces.d').LatLon) => void;
    updateValues: (
        map: import('@windy/interfaces.d').Coords,
        params: {
            overlay: import('@windy/rootScope.d').Overlays;
            level: import('@windy/rootScope.d').Levels;
            product: import('@windy/rootScope.d').Products;
        },
    ) => void;
    updateRange: (range: string) => void;

    /**
     * Color picker
     */
    jsColorPicker: (
        elId: string,
        opts: {
            customBG: string;
            readOnly: boolean;
            size: number;
            init: (elm: HTMLInputElement) => void;
            displayCallback: (
                /** not used anywhere */
                void1: unknown,
                /** not used anywhere */
                void2: unknown,
                arg: { input: HTMLInputElement },
            ) => void;
        },
    ) => unknown;

    windyInit?: (
        options: import('../../src/lib/lib.d').InitOptions,
        cb: import('../../src/lib/lib.d').InitCb,
    ) => void;
    TARGET_LIB?: boolean;
    TARGET_INDEX?: boolean;
    TARGET_EMBED2?: boolean;
    TARGET_MOBILE?: boolean;
    IS_HUAWEI?: boolean;
    DEBUG?: boolean;
    BETA?: boolean;
    PRODUCTION?: boolean;
    DEVELOPMENT?: boolean;
}

declare const fastspring: {
    builder: {
        /** Set user data to popup store front */
        recognize: (
            data: import('@plugins/_shared/subscription-services/subscription-services.d').FSBuilderRecognize,
        ) => void;

        /** Push product into cart */
        push: (
            data: import('@plugins/_shared/subscription-services/subscription-services.d').FSBuilderPush,
        ) => void;
    };
};

declare const inAppPurchase: {
    /** Retrieves a list of full product data from Apple/Google. This function must be called before making purchases. */
    getProducts: (
        products: string[],
    ) => Promise<
        import('@plugins/_shared/subscription-services/subscription-services.d').IAPProduct[]
    >;

    /** Buy the one-time product */
    buy: (
        productId: string,
    ) => Promise<
        import('@plugins/_shared/subscription-services/subscription-services.d').IAPBuyResponse
    >;

    /** Buy the subscription */
    subscribe: (
        productId: string,
    ) => Promise<
        import('@plugins/_shared/subscription-services/subscription-services.d').IAPBuyResponse
    >;

    /**
     * This function is only relevant to Android purchases. On Android, you must consume products that you want to let the user purchase multiple times.
     * All 3 parameters are returned by the buy() or restorePurchases() functions.
     */
    consume: (productType: string, stringifiedReceipt: string, signature: string) => Promise<void>;

    restorePurchases: () => Promise<
        import('@plugins/_shared/subscription-services/subscription-services.d').IAPRestoreResponse
    >;

    /**
     * On iOS, you can get the receipt at any moment by calling the getReceipt() function. Note that on iOS the receipt can contain multiple transactions. If successful, the promise returned by this function will resolve to a string with the receipt.
     * On Android this function will always return an empty string since it's not needed for Android purchases.
     */
    getReceipt: () => Promise<string>;
};
