export declare const GRAPHQL_QUERIES: {
    AddMessageBreakMutation: any;
    ChatViewQuery: any;
    SendMessageMutation: any;
    SubscriptionsMutation: any;
    MessageAddedSubscription: any;
    ViewerStateUpdatedSubscription: any;
};
export interface PoeSettings {
    formkey: string;
    tchannelData: ChannelData;
}
interface ChannelData {
    minSeq: string;
    channel: string;
    channelHash: string;
    boxName: string;
    baseHost: string;
    targetUrl: string;
    enableWebsocket: boolean;
}
export declare function getPoeSettings(): Promise<PoeSettings>;
export interface GqlHeaders {
    formkey: string;
    tchannel: string;
}
export declare function gqlRequest(queryName: keyof typeof GRAPHQL_QUERIES, variables: any, poeSettings: PoeSettings): Promise<any>;
export declare function getChatId(bot: string, poeSettings: PoeSettings): Promise<number>;
export {};
