"use strict";
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
exports.chatGPTClient = void 0;
var errors_1 = require("~utils/errors");
var requesters_1 = require("./requesters");
var ChatGPTClient = /** @class */ (function () {
    function ChatGPTClient() {
        var _this = this;
        this.requester = requesters_1.globalFetchRequester;
        requesters_1.proxyFetchRequester.findExistingProxyTab().then(function (tab) {
            if (tab) {
                _this.switchRequester(requesters_1.proxyFetchRequester);
            }
        });
    }
    ChatGPTClient.prototype.switchRequester = function (newRequester) {
        console.debug('client switchRequester', newRequester);
        this.requester = newRequester;
    };
    ChatGPTClient.prototype.fetch = function (url, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requester.fetch(url, options)];
            });
        });
    };
    ChatGPTClient.prototype.getAccessToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resp, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch('https://chat.openai.com/api/auth/session')];
                    case 1:
                        resp = _a.sent();
                        if (resp.status === 403) {
                            throw new errors_1.ChatError('Please pass Cloudflare check', errors_1.ErrorCode.CHATGPT_CLOUDFLARE);
                        }
                        return [4 /*yield*/, resp.json().catch(function () { return ({}); })];
                    case 2:
                        data = _a.sent();
                        if (!data.accessToken) {
                            throw new errors_1.ChatError('UNAUTHORIZED', errors_1.ErrorCode.CHATGPT_UNAUTHORIZED);
                        }
                        return [2 /*return*/, data.accessToken];
                }
            });
        });
    };
    ChatGPTClient.prototype.requestBackendAPIWithToken = function (token, method, path, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetch("https://chat.openai.com/backend-api".concat(path), {
                        method: method,
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: "Bearer ".concat(token),
                        },
                        body: data === undefined ? undefined : JSON.stringify(data),
                    })];
            });
        });
    };
    ChatGPTClient.prototype.getModels = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.requestBackendAPIWithToken(token, 'GET', '/models').then(function (r) { return r.json(); })];
                    case 1:
                        resp = _a.sent();
                        return [2 /*return*/, resp.models];
                }
            });
        });
    };
    // Switch to proxy mode, or refresh the proxy tab
    ChatGPTClient.prototype.fixAuthState = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.requester === requesters_1.proxyFetchRequester)) return [3 /*break*/, 2];
                        return [4 /*yield*/, requesters_1.proxyFetchRequester.refreshProxyTab()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, requesters_1.proxyFetchRequester.getProxyTab()];
                    case 3:
                        _a.sent();
                        this.switchRequester(requesters_1.proxyFetchRequester);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ChatGPTClient;
}());
exports.chatGPTClient = new ChatGPTClient();
