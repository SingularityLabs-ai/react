import { ChatResponseMessage } from './types';
export declare function convertMessageToMarkdown(message: ChatResponseMessage): string;
export declare const websocketUtils: {
    packMessage(data: any): string;
    unpackMessage(data: string | ArrayBuffer | Blob): any[];
};
