import { AbstractBot, SendMessageParams } from '../abstract-bot';
export declare class LMSYSBot extends AbstractBot {
    model: string;
    private conversationContext?;
    constructor(model: string);
    doSendMessage(params: SendMessageParams): Promise<void>;
    connectWebsocket(fnIndex: number, sessionHash: string, data: unknown[], onEvent: SendMessageParams['onEvent']): Promise<any>;
    resetConversation(): void;
}
