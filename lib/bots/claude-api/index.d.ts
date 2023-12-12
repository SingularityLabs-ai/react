import { UserConfig } from '~services/user-config';
import { AbstractBot, SendMessageParams } from '../abstract-bot';
export declare class ClaudeApiBot extends AbstractBot {
    private config;
    private conversationContext?;
    constructor(config: Pick<UserConfig, 'claudeApiKey' | 'claudeApiModel'>);
    fetchCompletionApi(prompt: string, signal?: AbortSignal): Promise<Response>;
    doSendMessage(params: SendMessageParams): Promise<void>;
    private getModelName;
    resetConversation(): void;
    get name(): string;
}
