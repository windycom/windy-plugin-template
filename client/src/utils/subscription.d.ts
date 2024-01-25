import type { SubTier } from '@windy/types.d';
import type { SubscriptionInfo } from '@plugins/_shared/subscription-services/subscription-services.d';
export type SubscriptionIssue = {
    type: 'graced' | 'paused' | 'onhold';
} | {
    type: 'expiring';
    expiresInHours: number;
};
/**
 * Get the current tier of the user.
 *
 * @returns "premium" for premium user, null otherwise
 */
export declare const getTier: () => SubTier;
/**
 * When any user changes his/her premium status (redeem, restore, ...), we need to refresh token2 to
 * reflect premium status for our backends
 */
declare const reloadUserToken: () => void;
/**
 * Clear pending subscription (i.e. unclaimed, not-redeemed subscription) from store.
 */
export declare const clearPendingSubscription: () => void;
/**
 * Set pending subscription to store.
 *
 * @param {string} redeemCode Code to store
 */
export declare const setPendingSubscription: (redeemCode: string) => void;
/**
 * Disable all premium features for the user. It does not deactivate subscription, it is just client GUI reset.
 */
export declare const deactivateAllFeatures: () => void;
/**
 * Set a tier for the user. It also clears pending and failed subscriptions if tier is passed.
 *
 * @param value Tier to set for the user, "null" for the subscription deactivation
 * @param options Optionally `reloadUserToken: true` if client should reload JWT token after setting the tier
 * @returns Same value which has been set
 */
export declare const setTier: (value: SubTier, options?: {
    reloadUserToken?: boolean;
    subscriptionInfo?: SubscriptionInfo;
}) => SubTier;
/**
 * Returns boolean value if user has any valid premium subscription.
 *
 * @returns True if user has a valid premium subscription, false otherwise
 */
export declare const hasAny: () => boolean;
/**
 * Returns null if everything is ok, object with issue otherwise.
 */
export declare const getIssue: () => SubscriptionIssue | null;
/**
 * Check if any pending subscription (i.e. unclaimed, not-redeemed subscription) is stored.
 * Open `pending-subscription` plugin if yes, void otherwise
 */
export declare const checkPendingSubscription: () => void;
/**
 * Returns short text for buttons which inform user about any subscription issue.
 * It is used only as a gateway to solving the whole issue. It must be short and clear.
 */
export declare const getBaitTitle: (issue: SubscriptionIssue | null) => string;
export {};
