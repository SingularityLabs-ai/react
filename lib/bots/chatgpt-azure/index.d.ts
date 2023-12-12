import { UserConfig } from '~services/user-config';
import { AbstractChatGPTApiBot } from '../chatgpt-api';
export declare class ChatGPTAzureApiBot extends AbstractChatGPTApiBot {
    private config;
    constructor(config: Pick<UserConfig, 'azureOpenAIApiKey' | 'azureOpenAIApiDeploymentName' | 'azureOpenAIApiInstanceName'>);
    fetchCompletionApi(signal?: AbortSignal): Promise<Response>;
    get name(): string;
}
