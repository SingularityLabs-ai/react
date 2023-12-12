"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGPTApiBot = exports.AbstractChatGPTApiBot = void 0;
var errors_1 = require("~utils/errors");
var sse_1 = require("~utils/sse");
var abstract_bot_1 = require("../abstract-bot");
var consts_1 = require("./consts");
var usage_1 = require("./usage");
var SYSTEM_MESSAGE = { role: 'system', content: consts_1.CHATGPT_SYSTEM_MESSAGE };
var CONTEXT_SIZE = 10;
var AbstractChatGPTApiBot = /** @class */ (function (_super) {
    __extends(AbstractChatGPTApiBot, _super);
    function AbstractChatGPTApiBot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AbstractChatGPTApiBot.prototype.buildMessages = function () {
        return __spreadArray([SYSTEM_MESSAGE], this.conversationContext.messages.slice(-(CONTEXT_SIZE + 1)), true);
    };
    AbstractChatGPTApiBot.prototype.doSendMessage = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, done, result, finish;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.conversationContext) {
                            this.conversationContext = { messages: [] };
                        }
                        this.conversationContext.messages.push({ role: 'user', content: params.prompt });
                        return [4 /*yield*/, this.fetchCompletionApi(params.signal)];
                    case 1:
                        resp = _a.sent();
                        done = false;
                        result = { role: 'assistant', content: '' };
                        finish = function () {
                            done = true;
                            params.onEvent({ type: 'DONE' });
                            var messages = _this.conversationContext.messages;
                            messages.push(result);
                            (0, usage_1.updateTokenUsage)(messages).catch(console.error);
                        };
                        return [4 /*yield*/, (0, sse_1.parseSSEResponse)(resp, function (message) {
                                var _a;
                                console.debug('chatgpt sse message', message);
                                if (message === '[DONE]') {
                                    finish();
                                    return;
                                }
                                var data;
                                try {
                                    data = JSON.parse(message);
                                }
                                catch (err) {
                                    console.error(err);
                                    return;
                                }
                                if ((_a = data === null || data === void 0 ? void 0 : data.choices) === null || _a === void 0 ? void 0 : _a.length) {
                                    var delta = data.choices[0].delta;
                                    if (delta === null || delta === void 0 ? void 0 : delta.content) {
                                        result.content += delta.content;
                                        params.onEvent({
                                            type: 'UPDATE_ANSWER',
                                            data: { text: result.content },
                                        });
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        if (!done) {
                            finish();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AbstractChatGPTApiBot.prototype.resetConversation = function () {
        this.conversationContext = undefined;
    };
    return AbstractChatGPTApiBot;
}(abstract_bot_1.AbstractBot));
exports.AbstractChatGPTApiBot = AbstractChatGPTApiBot;
var ChatGPTApiBot = /** @class */ (function (_super) {
    __extends(ChatGPTApiBot, _super);
    function ChatGPTApiBot(config) {
        var _this = _super.call(this) || this;
        _this.config = config;
        return _this;
    }
    ChatGPTApiBot.prototype.fetchCompletionApi = function (signal) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, openaiApiKey, openaiApiHost, chatgptApiModel, resp;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.config, openaiApiKey = _a.openaiApiKey, openaiApiHost = _a.openaiApiHost, chatgptApiModel = _a.chatgptApiModel;
                        return [4 /*yield*/, fetch("".concat(openaiApiHost, "/v1/chat/completions"), {
                                method: 'POST',
                                signal: signal,
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: "Bearer ".concat(openaiApiKey),
                                },
                                body: JSON.stringify({
                                    model: this.getModelName(),
                                    messages: this.buildMessages(),
                                    stream: true,
                                }),
                            })];
                    case 1:
                        resp = _b.sent();
                        if (!resp.ok && resp.status === 404 && chatgptApiModel.includes('gpt-4')) {
                            throw new errors_1.ChatError("You don't have API access to ".concat(chatgptApiModel, " model"), errors_1.ErrorCode.GPT4_MODEL_WAITLIST);
                        }
                        return [2 /*return*/, resp];
                }
            });
        });
    };
    ChatGPTApiBot.prototype.getModelName = function () {
        var chatgptApiModel = this.config.chatgptApiModel;
        if (chatgptApiModel === 'gpt-3.5-turbo') {
            return 'gpt-3.5-turbo-0613';
        }
        if (chatgptApiModel === 'gpt-4') {
            return 'gpt-4-0613';
        }
        if (chatgptApiModel === 'gpt-4-32k') {
            return 'gpt-4-32k-0613';
        }
        return chatgptApiModel;
    };
    Object.defineProperty(ChatGPTApiBot.prototype, "name", {
        get: function () {
            return "ChatGPT (API/".concat(this.config.chatgptApiModel, ")");
        },
        enumerable: false,
        configurable: true
    });
    return ChatGPTApiBot;
}(AbstractChatGPTApiBot));
exports.ChatGPTApiBot = ChatGPTApiBot;
