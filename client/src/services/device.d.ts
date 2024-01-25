import type { DeviceInfo } from '@capacitor/device';
/**
 * Returns platform unique persistent id for Android and iOS, or semi-persistent generated random id for desktop
 *
 * @returns Platform unique persistent deviceId (iOS, Android) or generated id for desktop (stored in localstorage, so it is semi-persistent)
 */
export declare const getDeviceID: () => string;
/**
 * Returns generated semi-persistent random id
 *
 * @returns Generated random id (stored in localstorage, so it is semi-persistent)
 */
export declare const getVirtualDeviceID: () => string;
/**
 * Returns device info if any exist
 *
 * @returns Device info returned by Capacitor, null for desktop or if anything failed
 */
export declare const getDeviceInfo: () => DeviceInfo | null;
