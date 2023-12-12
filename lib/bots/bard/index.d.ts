import { AbstractBot, SendMessageParams } from '../abstract-bot';
export declare class BardBot extends AbstractBot {
    private conversationContext?;
    doSendMessage(params: SendMessageParams): Promise<void>;
    resetConversation(): void;
}
