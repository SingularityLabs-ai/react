import { AbstractBot, SendMessageParams } from '../abstract-bot';
export declare class PoeWebBot extends AbstractBot {
    botId: string;
    private conversationContext?;
    constructor(botId: string);
    doSendMessage(params: SendMessageParams): Promise<void>;
    resetConversation(): void;
    private getChatInfo;
    private sendMessageRequest;
    private sendChatBreak;
    private subscribe;
    private getWebsocketUrl;
    private connectWebsocket;
    get name(): "ChatGPT (poe/gpt-3.5)" | "ChatGPT (poe/gpt-4)" | "Claude (poe/claude-instant)" | "Claude (poe/claude+)" | "Claude (poe/claude-100k)" | undefined;
}
