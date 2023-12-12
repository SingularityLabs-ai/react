"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBotInstance = void 0;
var bard_1 = require("./bard");
var bing_1 = require("./bing");
var chatgpt_1 = require("./chatgpt");
var claude_1 = require("./claude");
var lmsys_1 = require("./lmsys");
var xunfei_1 = require("./xunfei");
function createBotInstance(botId) {
    switch (botId) {
        case 'chatgpt':
            return new chatgpt_1.ChatGPTBot();
        case 'bing':
            return new bing_1.BingWebBot();
        case 'bard':
            return new bard_1.BardBot();
        case 'claude':
            return new claude_1.ClaudeBot();
        case 'xunfei':
            return new xunfei_1.XunfeiBot();
        case 'vicuna':
            return new lmsys_1.LMSYSBot('vicuna-13b');
        case 'alpaca':
            return new lmsys_1.LMSYSBot('alpaca-13b');
        case 'chatglm':
            return new lmsys_1.LMSYSBot('chatglm-6b');
        case 'koala':
            return new lmsys_1.LMSYSBot('koala-13b');
        case 'dolly':
            return new lmsys_1.LMSYSBot('dolly-v2-12b');
        case 'llama':
            return new lmsys_1.LMSYSBot('llama-13b');
        case 'stablelm':
            return new lmsys_1.LMSYSBot('stablelm-tuned-alpha-7b');
        case 'oasst':
            return new lmsys_1.LMSYSBot('oasst-pythia-12b');
        case 'rwkv':
            return new lmsys_1.LMSYSBot('RWKV-4-Raven-14B');
    }
}
exports.createBotInstance = createBotInstance;
