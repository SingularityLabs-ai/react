import { BingConversationStyle } from '~services/user-config';
export interface ConversationResponse {
    conversationId: string;
    clientId: string;
    conversationSignature: string;
    result: {
        value: string;
        message: null;
    };
}
export declare enum InvocationEventType {
    Invocation = 1,
    StreamItem = 2,
    Completion = 3,
    StreamInvocation = 4,
    CancelInvocation = 5,
    Ping = 6,
    Close = 7
}
export interface ConversationInfo {
    conversationId: string;
    clientId: string;
    conversationSignature: string;
    invocationId: number;
    conversationStyle: BingConversationStyle;
}
export interface BingChatResponse {
    conversationSignature: string;
    conversationId: string;
    clientId: string;
    invocationId: number;
    conversationExpiryTime: Date;
    response: string;
    details: ChatResponseMessage;
}
export interface ChatResponseMessage {
    text: string;
    author: string;
    createdAt: Date;
    timestamp: Date;
    messageId: string;
    messageType?: string;
    requestId: string;
    offense: string;
    adaptiveCards: AdaptiveCard[];
    sourceAttributions: SourceAttribution[];
    feedback: Feedback;
    contentOrigin: string;
    privacy: null;
    suggestedResponses: SuggestedResponse[];
}
export interface AdaptiveCard {
    type: string;
    version: string;
    body: Body[];
}
export interface Body {
    type: string;
    text: string;
    wrap: boolean;
    size?: string;
}
export interface Feedback {
    tag: null;
    updatedOn: null;
    type: string;
}
export interface SourceAttribution {
    providerDisplayName: string;
    seeMoreUrl: string;
    searchQuery: string;
}
export interface SuggestedResponse {
    text: string;
    author: string;
    createdAt: Date;
    timestamp: Date;
    messageId: string;
    messageType: string;
    offense: string;
    feedback: Feedback;
    contentOrigin: string;
    privacy: null;
}
export declare function generateMarkdown(response: BingChatResponse): Promise<string>;
