import { BardBot } from './bard';
import { BingWebBot } from './bing';
import { ChatGPTBot } from './chatgpt';
import { ClaudeBot } from './claude';
import { LMSYSBot } from './lmsys';
import { XunfeiBot } from './xunfei';
export type BotId = 'chatgpt' | 'bing' | 'bard' | 'claude' | 'xunfei' | 'vicuna' | 'alpaca' | 'chatglm' | 'koala' | 'dolly' | 'llama' | 'stablelm' | 'oasst' | 'rwkv';
export declare function createBotInstance(botId: BotId): BardBot | BingWebBot | ChatGPTBot | ClaudeBot | LMSYSBot | XunfeiBot;
export type BotInstance = ReturnType<typeof createBotInstance>;
