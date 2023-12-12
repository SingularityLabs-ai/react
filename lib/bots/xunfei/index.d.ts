import { AbstractBot, SendMessageParams } from '../abstract-bot';
export declare class XunfeiBot extends AbstractBot {
    private conversationContext?;
    doSendMessage(params: SendMessageParams): Promise<void>;
    resetConversation(): void;
}
