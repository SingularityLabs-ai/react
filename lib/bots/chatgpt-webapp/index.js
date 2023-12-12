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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGPTWebBot = void 0;
var uuid_1 = require("uuid");
var user_config_1 = require("~services/user-config");
var errors_1 = require("~utils/errors");
var sse_1 = require("~utils/sse");
var abstract_bot_1 = require("../abstract-bot");
var arkose_1 = require("./arkose");
var client_1 = require("./client");
function removeCitations(text) {
    return text.replaceAll(/\u3010\d+\u2020source\u3011/g, '');
}
var ChatGPTWebBot = /** @class */ (function (_super) {
    __extends(ChatGPTWebBot, _super);
    function ChatGPTWebBot(model) {
        var _this = _super.call(this) || this;
        _this.model = model;
        return _this;
    }
    ChatGPTWebBot.prototype.getModelName = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.model === user_config_1.ChatGPTWebModel['GPT-4']) {
                    return [2 /*return*/, 'gpt-4'];
                }
                if (this.model === user_config_1.ChatGPTWebModel['GPT-4 Browsing']) {
                    return [2 /*return*/, 'gpt-4-browsing'];
                }
                if (this.model === user_config_1.ChatGPTWebModel['GPT-3.5 (Mobile)']) {
                    return [2 /*return*/, 'text-davinci-002-render-sha-mobile'];
                }
                if (this.model === user_config_1.ChatGPTWebModel['GPT-4 (Mobile)']) {
                    return [2 /*return*/, 'gpt-4-mobile'];
                }
                return [2 /*return*/, 'text-davinci-002-render-sha'];
            });
        });
    };
    ChatGPTWebBot.prototype.doSendMessage = function (params) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, modelName, arkoseToken, resp;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!!this.accessToken) return [3 /*break*/, 2];
                        _c = this;
                        return [4 /*yield*/, client_1.chatGPTClient.getAccessToken()];
                    case 1:
                        _c.accessToken = _d.sent();
                        _d.label = 2;
                    case 2: return [4 /*yield*/, this.getModelName()];
                    case 3:
                        modelName = _d.sent();
                        console.debug('Using model:', modelName);
                        if (!modelName.startsWith('gpt-4')) return [3 /*break*/, 5];
                        return [4 /*yield*/, (0, arkose_1.fetchArkoseToken)()];
                    case 4:
                        arkoseToken = _d.sent();
                        _d.label = 5;
                    case 5: return [4 /*yield*/, client_1.chatGPTClient.fetch('https://chat.openai.com/backend-api/conversation', {
                            method: 'POST',
                            signal: params.signal,
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: "Bearer ".concat(this.accessToken),
                            },
                            body: JSON.stringify({
                                action: 'next',
                                messages: [
                                    {
                                        id: (0, uuid_1.v4)(),
                                        author: { role: 'user' },
                                        content: {
                                            content_type: 'text',
                                            parts: [params.prompt],
                                        },
                                    },
                                ],
                                model: modelName,
                                conversation_id: ((_a = this.conversationContext) === null || _a === void 0 ? void 0 : _a.conversationId) || undefined,
                                parent_message_id: ((_b = this.conversationContext) === null || _b === void 0 ? void 0 : _b.lastMessageId) || (0, uuid_1.v4)(),
                                arkose_token: arkoseToken,
                            }),
                        })];
                    case 6:
                        resp = _d.sent();
                        return [4 /*yield*/, (0, sse_1.parseSSEResponse)(resp, function (message) {
                                var _a;
                                console.debug('chatgpt sse message', message);
                                if (message === '[DONE]') {
                                    params.onEvent({ type: 'DONE' });
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
                                var content = (_a = data.message) === null || _a === void 0 ? void 0 : _a.content;
                                if (!content) {
                                    return;
                                }
                                var text;
                                if (content.content_type === 'text') {
                                    text = content.parts[0];
                                    text = removeCitations(text);
                                }
                                else if (content.content_type === 'code') {
                                    text = '_' + content.text + '_';
                                }
                                else {
                                    return;
                                }
                                if (text) {
                                    _this.conversationContext = {
                                        conversationId: data.conversation_id,
                                        lastMessageId: data.message.id,
                                    };
                                    params.onEvent({
                                        type: 'UPDATE_ANSWER',
                                        data: { text: text },
                                    });
                                }
                            }).catch(function (err) {
                                if (err.message.includes('token_expired')) {
                                    throw new errors_1.ChatError(err.message, errors_1.ErrorCode.CHATGPT_AUTH);
                                }
                                throw err;
                            })];
                    case 7:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ChatGPTWebBot.prototype.resetConversation = function () {
        this.conversationContext = undefined;
    };
    Object.defineProperty(ChatGPTWebBot.prototype, "name", {
        get: function () {
            return "ChatGPT (webapp/".concat(this.model, ")");
        },
        enumerable: false,
        configurable: true
    });
    return ChatGPTWebBot;
}(abstract_bot_1.AbstractBot));
exports.ChatGPTWebBot = ChatGPTWebBot;
