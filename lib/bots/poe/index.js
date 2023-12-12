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
exports.PoeWebBot = void 0;
var i18next_1 = require("i18next");
var websocket_as_promised_1 = require("websocket-as-promised");
var permissions_1 = require("~app/utils/permissions");
var user_config_1 = require("~services/user-config");
var errors_1 = require("~utils/errors");
var abstract_bot_1 = require("../abstract-bot");
var api_1 = require("./api");
var PoeWebBot = /** @class */ (function (_super) {
    __extends(PoeWebBot, _super);
    function PoeWebBot(botId) {
        var _this = _super.call(this) || this;
        _this.botId = botId;
        return _this;
    }
    PoeWebBot.prototype.doSendMessage = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, poeSettings, chatId, wsp0, wsp, onUnpackedMessageListener, e_1, err_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, permissions_1.requestHostPermission)('https://*.poe.com/')];
                    case 1:
                        if (!(_b.sent())) {
                            throw new errors_1.ChatError('Missing poe.com permission', errors_1.ErrorCode.MISSING_POE_HOST_PERMISSION);
                        }
                        if (!!this.conversationContext) return [3 /*break*/, 6];
                        console.log('Using poe model', this.botId);
                        return [4 /*yield*/, this.getChatInfo()];
                    case 2:
                        _a = _b.sent(), poeSettings = _a.poeSettings, chatId = _a.chatId;
                        return [4 /*yield*/, this.connectWebsocket(poeSettings)];
                    case 3:
                        wsp0 = _b.sent();
                        return [4 /*yield*/, this.subscribe(poeSettings)];
                    case 4:
                        _b.sent();
                        this.conversationContext = { chatId: chatId, poeSettings: poeSettings, wsp0: wsp0 };
                        return [4 /*yield*/, this.sendChatBreak().catch(console.error)];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6:
                        wsp = this.conversationContext.wsp;
                        onUnpackedMessageListener = function (data) {
                            var _a;
                            var messages = data.messages.map(function (s) { return JSON.parse(s); });
                            for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
                                var m = messages_1[_i];
                                if (m.message_type === 'subscriptionUpdate' && m.payload.subscription_name === 'messageAdded') {
                                    var chatMessage = m.payload.data.messageAdded;
                                    console.debug('poe ws chat message', chatMessage);
                                    if (chatMessage.author !== _this.botId) {
                                        continue;
                                    }
                                    if (((_a = _this.conversationContext) === null || _a === void 0 ? void 0 : _a.minMessageId) &&
                                        chatMessage.messageId <= _this.conversationContext.minMessageId) {
                                        continue;
                                    }
                                    params.onEvent({
                                        type: 'UPDATE_ANSWER',
                                        data: { text: chatMessage.text.trimStart() },
                                    });
                                    if (chatMessage.state === 'complete') {
                                        _this.conversationContext.minMessageId = chatMessage.messageId;
                                        params.onEvent({ type: 'DONE' });
                                        wsp.removeAllListeners();
                                    }
                                }
                            }
                        };
                        wsp.onUnpackedMessage.addListener(onUnpackedMessageListener);
                        wsp.onError.addListener(console.error);
                        _b.label = 7;
                    case 7:
                        _b.trys.push([7, 9, , 10]);
                        return [4 /*yield*/, wsp.open()];
                    case 8:
                        _b.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        e_1 = _b.sent();
                        console.error('poe ws open error', e_1);
                        throw new errors_1.ChatError('Failed to establish websocket connection.', errors_1.ErrorCode.NETWORK_ERROR);
                    case 10:
                        _b.trys.push([10, 12, , 13]);
                        return [4 /*yield*/, this.sendMessageRequest(params.prompt)];
                    case 11:
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 12:
                        err_1 = _b.sent();
                        wsp.removeAllListeners();
                        wsp.close();
                        throw err_1;
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    PoeWebBot.prototype.resetConversation = function () {
        if (!this.conversationContext) {
            return;
        }
        var wsp = this.conversationContext.wsp;
        wsp.removeAllListeners();
        wsp.close();
        this.sendChatBreak();
        this.conversationContext = undefined;
    };
    PoeWebBot.prototype.getChatInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var poeSettings, chatId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, api_1.getPoeSettings)()];
                    case 1:
                        poeSettings = _a.sent();
                        return [4 /*yield*/, (0, api_1.getChatId)(this.botId, poeSettings)];
                    case 2:
                        chatId = _a.sent();
                        return [2 /*return*/, { poeSettings: poeSettings, chatId: chatId }];
                }
            });
        });
    };
    PoeWebBot.prototype.sendMessageRequest = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, poeSettings, chatId, resp;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.conversationContext, poeSettings = _a.poeSettings, chatId = _a.chatId;
                        return [4 /*yield*/, (0, api_1.gqlRequest)('SendMessageMutation', {
                                bot: this.botId,
                                chatId: chatId,
                                query: message,
                                source: null,
                                withChatBreak: false,
                            }, poeSettings)];
                    case 1:
                        resp = _b.sent();
                        if (!resp.data) {
                            throw new Error(JSON.stringify(resp.errors));
                        }
                        if (!resp.data.messageEdgeCreate.message) {
                            throw new errors_1.ChatError((0, i18next_1.t)('You’ve reached the daily free message limit for this model'), errors_1.ErrorCode.POE_MESSAGE_LIMIT);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    PoeWebBot.prototype.sendChatBreak = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, chatId, poeSettings;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.conversationContext, chatId = _a.chatId, poeSettings = _a.poeSettings;
                        return [4 /*yield*/, (0, api_1.gqlRequest)('AddMessageBreakMutation', { chatId: chatId }, poeSettings)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PoeWebBot.prototype.subscribe = function (poeSettings) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, api_1.gqlRequest)('SubscriptionsMutation', {
                            subscriptions: [
                                {
                                    subscriptionName: 'messageAdded',
                                    query: api_1.GRAPHQL_QUERIES.MessageAddedSubscription,
                                },
                            ],
                        }, poeSettings)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PoeWebBot.prototype.getWebsocketUrl = function (poeSettings) {
        return __awaiter(this, void 0, void 0, function () {
            var domain, channel;
            return __generator(this, function (_a) {
                domain = "tch".concat(Math.floor(Math.random() * 1000000) + 1);
                channel = poeSettings.tchannelData;
                return [2 /*return*/, "wss://".concat(domain, ".tch.").concat(channel.baseHost, "/up/").concat(channel.boxName, "/updates?min_seq=").concat(channel.minSeq, "&channel=").concat(channel.channel, "&hash=").concat(channel.channelHash)];
            });
        });
    };
    PoeWebBot.prototype.connectWebsocket = function (poeSettings) {
        return __awaiter(this, void 0, void 0, function () {
            var wsUrl, wsp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getWebsocketUrl(poeSettings)];
                    case 1:
                        wsUrl = _a.sent();
                        console.debug('ws url', wsUrl);
                        wsp = new websocket_as_promised_1.default(wsUrl, {
                            packMessage: function (data) { return JSON.stringify(data); },
                            unpackMessage: function (data) { return JSON.parse(data); },
                        });
                        return [2 /*return*/, wsp];
                }
            });
        });
    };
    Object.defineProperty(PoeWebBot.prototype, "name", {
        get: function () {
            if (this.botId === user_config_1.PoeGPTModel['GPT-3.5']) {
                return 'ChatGPT (poe/gpt-3.5)';
            }
            if (this.botId === user_config_1.PoeGPTModel['GPT-4']) {
                return 'ChatGPT (poe/gpt-4)';
            }
            if (this.botId === user_config_1.PoeClaudeModel['claude-instant']) {
                return 'Claude (poe/claude-instant)';
            }
            if (this.botId === user_config_1.PoeClaudeModel['claude+']) {
                return 'Claude (poe/claude+)';
            }
            if (this.botId === user_config_1.PoeClaudeModel['claude-instant-100k']) {
                return 'Claude (poe/claude-100k)';
            }
        },
        enumerable: false,
        configurable: true
    });
    return PoeWebBot;
}(abstract_bot_1.AbstractBot));
exports.PoeWebBot = PoeWebBot;
