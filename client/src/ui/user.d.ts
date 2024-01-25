/**
 * @module user
 *
 * 1) Wrapper for the user store object.
 * 2) Loads user info from the server.
 * 3) Handles user authentication.
 * 4) Renders user avatar.
 *
 * data-user='logged-in' or 'logged-out' attr is added to the body tag when we know the state of the user (a CSS way of isUserLoggedIn function).
 * it's to avoid unnecessary render of "login" button when the user is logged in, but we still wait for the server response
 */
/**
 * We use ./filename to motivate rollup treeshaking
 */
import type { User } from '@windy/dataSpecifications.d';
import type { HttpPayload } from '@windy/http.d';
import type { AccountLoginResponse, UserInfo } from '@windy/user.d';
export declare const isLoggedIn: () => boolean;
export declare const isPublisher: () => boolean;
export declare const getInfo: () => User | null;
/**
 * Safe way how to retrieve use avatar
 * @returns link to user avatar or default avatar
 */
export declare const getAvatar: () => string;
export declare const getEmail: () => string;
export declare const getUsername: () => string;
export declare const getUserId: () => number;
/**
 * Open login plugin so that user can log in
 */
export declare const login: () => void;
export declare const register: () => void;
/**
 * Log out the user - remove credentials and reload all things that depends on logged-in user
 */
export declare const logout: () => void;
export declare const setExplicitConsent: (analytics: boolean) => void;
export declare const setImplicitConsent: () => void;
/**
 * Check if we have received valid auth object and if yes, save it and open user plugin
 *
 * @param userInfo user info from account or node users
 * @returns true if user is authenticated
 */
export declare const checkAuth: (userInfo: UserInfo) => boolean;
/**
 * Get info about current user from account
 *
 * @returns Pending HttpPayload with UserInfo or null if not authenticated
 * @throws An exception when HTTP request fails
 */
export declare const reloadInfo: () => Promise<HttpPayload<UserInfo> | null>;
export declare const handleLoginResponse: (response: HttpPayload<AccountLoginResponse>) => void;
