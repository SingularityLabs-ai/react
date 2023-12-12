import { ChatGPTWebModel } from '~services/user-config';
import { AbstractBot, SendMessageParams } from '../abstract-bot';
export declare class ChatGPTWebBot extends AbstractBot {
    model: ChatGPTWebModel;
    private accessToken?;
    private conversationContext?;
    constructor(model: ChatGPTWebModel);
    private getModelName;
    doSendMessage(params: SendMessageParams): Promise<void>;
    resetConversation(): void;
    get name(): string;
}
