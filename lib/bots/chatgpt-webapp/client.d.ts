import { RequestInitSubset } from '~types/messaging';
import { Requester } from './requesters';
declare class ChatGPTClient {
    requester: Requester;
    constructor();
    switchRequester(newRequester: Requester): void;
    fetch(url: string, options?: RequestInitSubset): Promise<Response>;
    getAccessToken(): Promise<string>;
    private requestBackendAPIWithToken;
    getModels(token: string): Promise<{
        slug: string;
        title: string;
        description: string;
        max_tokens: number;
    }[]>;
    fixAuthState(): Promise<void>;
}
export declare const chatGPTClient: ChatGPTClient;
export {};
