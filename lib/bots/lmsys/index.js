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
exports.LMSYSBot = void 0;
var websocket_as_promised_1 = require("websocket-as-promised");
var markdown_1 = require("~app/utils/markdown");
var errors_1 = require("~utils/errors");
var abstract_bot_1 = require("../abstract-bot");
var utils_1 = require("./utils");
var FnIndex;
(function (FnIndex) {
    FnIndex[FnIndex["Send"] = 7] = "Send";
    FnIndex[FnIndex["Receive"] = 8] = "Receive";
})(FnIndex || (FnIndex = {}));
var LMSYSBot = /** @class */ (function (_super) {
    __extends(LMSYSBot, _super);
    function LMSYSBot(model) {
        var _this = _super.call(this) || this;
        _this.model = model;
        return _this;
    }
    LMSYSBot.prototype.doSendMessage = function (params) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var sendWsp, receiveWsp;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.conversationContext) {
                            this.conversationContext = { sessionHash: (0, utils_1.generateSessionHash)() };
                        }
                        return [4 /*yield*/, this.connectWebsocket(FnIndex.Send, this.conversationContext.sessionHash, [null, this.model, params.prompt], params.onEvent)];
                    case 1:
                        sendWsp = _b.sent();
                        return [4 /*yield*/, this.connectWebsocket(FnIndex.Receive, this.conversationContext.sessionHash, [null, 0.7, 1, 512], params.onEvent)];
                    case 2:
                        receiveWsp = _b.sent();
                        (_a = params.signal) === null || _a === void 0 ? void 0 : _a.addEventListener('abort', function () {
                            ;
                            [sendWsp, receiveWsp].forEach(function (wsp) {
                                wsp.removeAllListeners();
                                wsp.close();
                            });
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    LMSYSBot.prototype.connectWebsocket = function (fnIndex, sessionHash, data, onEvent) {
        return __awaiter(this, void 0, void 0, function () {
            var wsp, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wsp = new websocket_as_promised_1.default('wss://chat.lmsys.org/queue/join', {
                            packMessage: function () { return JSON.stringify(data); },
                            unpackMessage: function () { return JSON.parse(data); },
                        });
                        wsp.onUnpackedMessage.addListener(function (event) { return __awaiter(_this, void 0, void 0, function () {
                            var outputData, html, text;
                            return __generator(this, function (_a) {
                                if (event.msg === 'send_hash') {
                                    wsp.sendPacked({ fn_index: fnIndex, session_hash: sessionHash });
                                }
                                else if (event.msg === 'send_data') {
                                    wsp.sendPacked({
                                        fn_index: fnIndex,
                                        data: data,
                                        event_data: null,
                                        session_hash: sessionHash,
                                    });
                                }
                                else if (event.msg === 'process_generating') {
                                    if (event.success && event.output.data) {
                                        if (fnIndex === FnIndex.Receive) {
                                            outputData = event.output.data;
                                            html = outputData[1][outputData[1].length - 1][1];
                                            text = (0, markdown_1.html2md)(html);
                                            onEvent({ type: 'UPDATE_ANSWER', data: { text: text } });
                                        }
                                    }
                                    else {
                                        onEvent({ type: 'ERROR', error: new errors_1.ChatError(event.output.error, errors_1.ErrorCode.UNKOWN_ERROR) });
                                    }
                                }
                                else if (event.msg === 'queue_full') {
                                    onEvent({ type: 'ERROR', error: new errors_1.ChatError('queue_full', errors_1.ErrorCode.UNKOWN_ERROR) });
                                }
                                return [2 /*return*/];
                            });
                        }); });
                        if (fnIndex === FnIndex.Receive) {
                            wsp.onClose.addListener(function () {
                                wsp.removeAllListeners();
                                onEvent({ type: 'DONE' });
                            });
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, wsp.open()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.error('lmsys ws open error', err_1);
                        throw new errors_1.ChatError('Failed to establish websocket connection.', errors_1.ErrorCode.NETWORK_ERROR);
                    case 4: return [2 /*return*/, wsp];
                }
            });
        });
    };
    LMSYSBot.prototype.resetConversation = function () {
        this.conversationContext = undefined;
    };
    return LMSYSBot;
}(abstract_bot_1.AbstractBot));
exports.LMSYSBot = LMSYSBot;
