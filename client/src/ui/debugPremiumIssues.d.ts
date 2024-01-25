declare const _default: {
    status: number;
    data: {
        auth: boolean;
        token: string;
        userInfo: {
            id: number;
            username: string;
            userslug: string;
        };
        subscriptionInfo: {
            tier: string;
            status: string;
            platform: string;
            state: string;
            expiresAt: number;
            isSubscription: boolean;
            isTrial: boolean;
        };
    };
};
export default _default;
