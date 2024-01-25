/**
 * Defines openable `Window` containing HTML, CSS
 */
import type { WindowOpeningOptions, WindowClosingOptions } from '@windy/interfaces.d';
import type { HTMLString } from '@windy/types.d';
export type WindowInitParams = Pick<Window, 'ident' | 'html'> & Partial<Omit<Window, 'isOpen' | 'node' | 'refs' | 'close' | 'open' | 'mount'>>;
export declare class Window {
    private static iAm;
    private closingTimer;
    private timeoutTimer;
    /**
     * Binded veriosn of self closing
     */
    private bindedClose;
    /**
     * Identifier of window
     */
    ident: string;
    domEl: null | HTMLElement;
    /**
     * Attachement point, where the window will come if domEl is not specified
     * Use data-plugin="" attribute to in HTML code, se we can distinguish between
     * normal tags and attachement points
     */
    attachPoint: string;
    /**
     * Does the window reguires keyboard input?
     */
    keyboard: boolean;
    /**
     * Should the item be closed on click somewhere else? True for any click, false ignores everything (default), 'outside' closes Window only when clicking outside the window
     */
    closeOnClick: boolean | 'outside';
    /**
     * Uses el.style.display = block to hide/display el on page
     */
    displayBlock: boolean;
    /**
     * How long should closing of the Window last?
     */
    timeout: number;
    /**
     * is window open right now
     */
    isOpen: boolean;
    /**
     * Class applied to body
     */
    bodyClass: string;
    /**
     * HTML element of this Window
     */
    node?: HTMLDivElement;
    /**
     * Class name applied to Window element
     */
    className?: string;
    /**
     * Optional HTML ID identifier
     */
    htmlID?: `${'plugin' | 'window' | 'windy-plugin'}-${string}`;
    /**
     * HTML content of the Window
     */
    html?: string;
    /**
     * Disable opening & closing animation
     */
    noAnimation?: boolean;
    constructor(params: WindowInitParams);
    close(opts?: WindowClosingOptions): void;
    /**
     * Open and show the window
     */
    open(options?: WindowOpeningOptions): Window;
    /**
     * Ready to be overloaded: Will be called after open
     */
    onopen(): void;
    /**
     * Ready to be overloaded: Will be called before close
     */
    onclose(_opts: unknown): void;
    /**
     * Ready to be overloaded: Will be called after close
     */
    onclosed(): void;
    /**
     * Mounting the Window
     */
    mount(optionalHtml?: HTMLString): void;
    /**
     * Unmounting the Window
     */
    unmount(): void;
    protected initProperties(): void;
    /**
     * Creates node with closing X and put inside HTML code
     */
    private createNode;
    private removeHooks;
    private addHooks;
    /**
     * Key catcher should prevent to send commands to body tag, where they work as navigation
     */
    private keyCatcher;
}
