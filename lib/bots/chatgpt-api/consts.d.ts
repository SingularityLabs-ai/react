export interface ChatMessage {
    role: 'system' | 'assistant' | 'user';
    content: string;
}
export declare const CHATGPT_SYSTEM_MESSAGE: string;
