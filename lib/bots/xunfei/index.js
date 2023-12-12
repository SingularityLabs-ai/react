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
exports.XunfeiBot = void 0;
var permissions_1 = require("~app/utils/permissions");
var js_base64_1 = require("js-base64");
var abstract_bot_1 = require("../abstract-bot");
var api_1 = require("./api");
var errors_1 = require("~utils/errors");
var sse_1 = require("~utils/sse");
function generateFD() {
    var ms = String(+new Date());
    return ms.substring(ms.length - 6);
}
var XunfeiBot = /** @class */ (function (_super) {
    __extends(XunfeiBot, _super);
    function XunfeiBot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    XunfeiBot.prototype.doSendMessage = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, geeToken, chatId, form, resp, answer, done;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, permissions_1.requestHostPermission)('https://*.xfyun.cn/')];
                    case 1:
                        if (!(_b.sent())) {
                            throw new errors_1.ChatError('Missing xfyun.cn permission', errors_1.ErrorCode.MISSING_HOST_PERMISSION);
                        }
                        if (!!this.conversationContext) return [3 /*break*/, 3];
                        return [4 /*yield*/, Promise.all([(0, api_1.getGeeToken)(), (0, api_1.createConversation)()])];
                    case 2:
                        _a = _b.sent(), geeToken = _a[0], chatId = _a[1].chatId;
                        this.conversationContext = { geeToken: geeToken, chatId: chatId };
                        _b.label = 3;
                    case 3:
                        form = new FormData();
                        form.append('chatId', this.conversationContext.chatId.toString());
                        form.append('text', params.prompt);
                        form.append('clientType', '1');
                        form.append('GtToken', this.conversationContext.geeToken);
                        form.append('fd', generateFD());
                        form.append('isBot', '0');
                        return [4 /*yield*/, fetch('https://xinghuo.xfyun.cn/iflygpt/u/chat_message/chat', {
                                method: 'POST',
                                signal: params.signal,
                                body: form,
                            })];
                    case 4:
                        resp = _b.sent();
                        answer = '';
                        done = false;
                        return [4 /*yield*/, (0, sse_1.parseSSEResponse)(resp, function (message) {
                                console.debug('xunfei sse', message);
                                if (message === '<end>') {
                                    done = true;
                                    params.onEvent({ type: 'DONE' });
                                }
                                else if (message === '<kx>') {
                                    throw new errors_1.ChatError('讯飞无法继续这个话题，请重启会话', errors_1.ErrorCode.CONVERSATION_LIMIT);
                                }
                                else if (/\[.*\]/.test(message)) {
                                    return;
                                }
                                else if (message.includes('descr')) {
                                    var payload = JSON.parse(message);
                                    throw new Error(payload.descr);
                                }
                                else if (!done) {
                                    var decoded = void 0;
                                    try {
                                        decoded = js_base64_1.Base64.decode(message);
                                    }
                                    catch (err) {
                                        throw new errors_1.ChatError('讯飞无法回答该问题', errors_1.ErrorCode.CONVERSATION_LIMIT);
                                    }
                                    answer += decoded;
                                    params.onEvent({ type: 'UPDATE_ANSWER', data: { text: answer } });
                                }
                            })];
                    case 5:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    XunfeiBot.prototype.resetConversation = function () {
        this.conversationContext = undefined;
    };
    return XunfeiBot;
}(abstract_bot_1.AbstractBot));
exports.XunfeiBot = XunfeiBot;
