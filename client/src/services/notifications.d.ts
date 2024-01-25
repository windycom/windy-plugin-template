import { Evented } from '@windy/Evented';
import type { HttpPayload } from '@windy/http.d';
import type { NotificationInfo } from '@windy/notifications.d';
declare class Notification extends Evented<Notification> {
    data: Record<string, unknown>;
    eventSource: null | EventSource;
    canReceiveNotif: boolean;
    hasUnloadListener: boolean;
    constructor();
    /**
     * Close SSE event stream
     */
    clean(): void;
    /**
     * Connect to SSE event stream and hook all event listeners
     */
    watchChanges(): void;
    /**
     * Get notifications list (paging is applied)
     *
     * @param currentPage Page number to get
     * @param pageSize Page size to include into list
     * @returns Page is updated with received data or error is shown if anything failed
     */
    loadNotificationList(currentPage: number, pageSize: number): Promise<void | NotificationInfo>;
    /**
     * Mark alert as seen by its id. This may affect more notifications if the alert has some.
     *
     * @param id Alert id
     * @returns
     */
    markAlertAsSeen(id: string): Promise<HttpPayload<void>>;
    /**
     * Mark notification as seen by its id. It affects just and only one specific notification.
     *
     * @param id Notification id
     * @returns
     */
    markNotificationAsSeen(id: string): Promise<HttpPayload<void>>;
    /**
     * Mark all notifications ad received (= not seen yet, but already delivered)
     *
     * @returns
     */
    markNotificationsAsReceived(): Promise<void | HttpPayload<void>>;
    /**
     * Delete all users notifications
     *
     * @returns
     */
    deleteAllNotifications(): Promise<HttpPayload<void>>;
    /**
     * Mark all users notifications as seen
     */
    markAllAsSeen(): void;
    /**
     * Update notification state. It updates store value so all necessary events are triggered.
     *
     * @param vals `totalCount` and `newCount` values to set
     * @param vals.totalCount Total count of all notifications (already seen is included)
     * @param vals.newCount Count of new unseen notifications
     */
    updateInfo({ totalCount, newCount }: NotificationInfo): void;
}
declare const _default: Notification;
export default _default;
