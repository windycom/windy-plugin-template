declare interface HTMLCanvasElement extends HTMLElement {
    getContext(
        contextId: 'experimental-webgl',
        options?: WebGLContextAttributes,
    ): WebGLRenderingContext | null;
}

// We use <const> typed arrays (rootScope), but we want to allow `includes` check for all similar types.
// eg. for <const>['rain', 'thunder'] we want to allow `includes('abc'), but still disallow `includes(true)`
// this does the job and retype property if result is true (type guards)
declare interface ReadonlyArray<T> {
    includes<U>(
        x: U & (T & U extends never ? never : unknown),
    ): x is U & (T & U extends never ? never : T);
}

// And same for Array
declare interface Array<T> {
    includes<U>(
        x: U & (T & U extends never ? never : unknown),
    ): x is U & (T & U extends never ? never : T);
}

// Make Object.keys generic and do not return the stupid string[] everytime!
/* eslint-disable */
declare interface ObjectConstructor {
    keys<T extends object>(o: T): (keyof T)[];
}
/* eslint-enable */

declare interface Element {
    webkitRequestFullscreen(options?: FullscreenOptions): Promise<void> | undefined;
    mozRequestFullScreen(options?: FullscreenOptions): Promise<void>;
    msRequestFullscreen(options?: FullscreenOptions): Promise<void>;
}

declare interface Document {
    webkitExitFullscreen(): Promise<void> | undefined;
    mozCancelFullScreen(): Promise<void>;
    msExitFullscreen(): Promise<void>;
}

declare interface DocumentOrShadowRoot {
    readonly webkitFullscreenElement: Element | null;
    readonly mozFullScreenElement: Element | null;
    readonly msFullscreenElement: Element | null;
}

// parseInt & parseFloat work great even for number
declare function parseInt(string: string | number, radix?: number): number;
declare function parseFloat(string: string | number): number;

// isNaN works great even for undefined
declare function isNaN(number?: number): boolean;

// TS thinks we have nodejs application for some reason... retype timers to the DOM variant
/* eslint-disable */
declare module 'timers' {
    global {
        function clearInterval(handle?: number): void;
        function clearTimeout(handle?: number): void;
        function setTimeout(handler: TimerHandler, timeout?: number, ...arguments: any[]): number;
        function setInterval(handler: TimerHandler, timeout?: number, ...arguments: any[]): number;
    }
}
/* eslint-enable */
