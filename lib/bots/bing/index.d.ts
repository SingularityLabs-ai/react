import { AbstractBot, SendMessageParams } from '../abstract-bot';
export declare class BingWebBot extends AbstractBot {
    private conversationContext?;
    private buildChatRequest;
    doSendMessage(params: SendMessageParams): Promise<void>;
    resetConversation(): void;
}
