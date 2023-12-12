import './geeguard';
export declare function getGeeToken(): Promise<string>;
export declare function createConversation(): Promise<{
    chatId: number;
}>;
