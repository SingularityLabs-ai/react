import { ChatError } from '~utils/errors';
export type Event = {
    type: 'UPDATE_ANSWER';
    data: {
        text: string;
    };
} | {
    type: 'DONE';
} | {
    type: 'ERROR';
    error: ChatError;
};
export interface SendMessageParams {
    prompt: string;
    onEvent: (event: Event) => void;
    signal?: AbortSignal;
}
export declare abstract class AbstractBot {
    sendMessage(params: SendMessageParams): Promise<void>;
    get name(): string | undefined;
    abstract doSendMessage(params: SendMessageParams): Promise<void>;
    abstract resetConversation(): void;
}
export declare abstract class AsyncAbstractBot extends AbstractBot {
    #private;
    constructor();
    abstract initializeBot(): Promise<AbstractBot>;
    doSendMessage(params: SendMessageParams): Promise<void>;
    resetConversation(): void;
    get name(): string | undefined;
}
