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
exports.proxyFetchRequester = exports.globalFetchRequester = void 0;
/* tslint:disable:max-classes-per-file */
var webextension_polyfill_1 = require("webextension-polyfill");
var consts_1 = require("~app/consts");
var proxy_fetch_1 = require("~services/proxy-fetch");
var GlobalFetchRequester = /** @class */ (function () {
    function GlobalFetchRequester() {
    }
    GlobalFetchRequester.prototype.fetch = function (url, options) {
        return fetch(url, options);
    };
    return GlobalFetchRequester;
}());
var ProxyFetchRequester = /** @class */ (function () {
    function ProxyFetchRequester() {
    }
    ProxyFetchRequester.prototype.findExistingProxyTab = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var tabs, results, i;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, webextension_polyfill_1.default.tabs.query({ pinned: true })];
                    case 1:
                        tabs = _b.sent();
                        return [4 /*yield*/, Promise.all(tabs.map(function (tab) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    if (tab.url) {
                                        return [2 /*return*/, tab.url];
                                    }
                                    return [2 /*return*/, webextension_polyfill_1.default.tabs.sendMessage(tab.id, 'url').catch(function () { return undefined; })];
                                });
                            }); }))];
                    case 2:
                        results = _b.sent();
                        for (i = 0; i < results.length; i++) {
                            if ((_a = results[i]) === null || _a === void 0 ? void 0 : _a.startsWith('https://chat.openai.com')) {
                                return [2 /*return*/, tabs[i]];
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ProxyFetchRequester.prototype.waitForProxyTabReady = function (onReady) {
        webextension_polyfill_1.default.runtime.onMessage.addListener(function listener(message, sender) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (message.event === 'PROXY_TAB_READY') {
                        console.debug('new proxy tab ready');
                        webextension_polyfill_1.default.runtime.onMessage.removeListener(listener);
                        onReady(sender.tab);
                    }
                    return [2 /*return*/];
                });
            });
        });
    };
    ProxyFetchRequester.prototype.createProxyTab = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        _this.waitForProxyTabReady(resolve);
                        webextension_polyfill_1.default.tabs.create({ url: consts_1.CHATGPT_HOME_URL, pinned: true });
                    })];
            });
        });
    };
    ProxyFetchRequester.prototype.getProxyTab = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tab;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findExistingProxyTab()];
                    case 1:
                        tab = _a.sent();
                        if (!!tab) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.createProxyTab()];
                    case 2:
                        tab = _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, tab];
                }
            });
        });
    };
    ProxyFetchRequester.prototype.refreshProxyTab = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tab;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findExistingProxyTab()];
                    case 1:
                        tab = _a.sent();
                        if (!!tab) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.createProxyTab()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                    case 3: return [2 /*return*/, new Promise(function (resolve) {
                            _this.waitForProxyTabReady(resolve);
                            webextension_polyfill_1.default.tabs.reload(tab.id);
                        })];
                }
            });
        });
    };
    ProxyFetchRequester.prototype.fetch = function (url, options) {
        return __awaiter(this, void 0, void 0, function () {
            var tab, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getProxyTab()];
                    case 1:
                        tab = _a.sent();
                        return [4 /*yield*/, (0, proxy_fetch_1.proxyFetch)(tab.id, url, options)];
                    case 2:
                        resp = _a.sent();
                        if (!(resp.status === 403)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.refreshProxyTab()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, (0, proxy_fetch_1.proxyFetch)(tab.id, url, options)];
                    case 4: return [2 /*return*/, resp];
                }
            });
        });
    };
    return ProxyFetchRequester;
}());
exports.globalFetchRequester = new GlobalFetchRequester();
exports.proxyFetchRequester = new ProxyFetchRequester();
