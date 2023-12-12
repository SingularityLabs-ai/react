import { AsyncAbstractBot } from '../abstract-bot';
import { ChatGPTApiBot } from '../chatgpt-api';
import { ChatGPTAzureApiBot } from '../chatgpt-azure';
import { ChatGPTWebBot } from '../chatgpt-webapp';
import { PoeWebBot } from '../poe';
export declare class ChatGPTBot extends AsyncAbstractBot {
    initializeBot(): Promise<ChatGPTApiBot | ChatGPTAzureApiBot | ChatGPTWebBot | PoeWebBot>;
}
