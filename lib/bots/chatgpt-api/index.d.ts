import { UserConfig } from '~services/user-config';
import { AbstractBot, SendMessageParams } from '../abstract-bot';
import { ChatMessage } from './consts';
export declare abstract class AbstractChatGPTApiBot extends AbstractBot {
    private conversationContext?;
    buildMessages(): ChatMessage[];
    doSendMessage(params: SendMessageParams): Promise<void>;
    resetConversation(): void;
    abstract fetchCompletionApi(signal?: AbortSignal): Promise<Response>;
}
export declare class ChatGPTApiBot extends AbstractChatGPTApiBot {
    private config;
    constructor(config: Pick<UserConfig, 'openaiApiKey' | 'openaiApiHost' | 'chatgptApiModel' | 'chatgptApiTemperature'>);
    fetchCompletionApi(signal?: AbortSignal): Promise<Response>;
    private getModelName;
    get name(): string;
}
