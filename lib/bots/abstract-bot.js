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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AsyncAbstractBot_bot;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncAbstractBot = exports.AbstractBot = void 0;
/* tslint:disable:max-classes-per-file */
var sentry_1 = require("~services/sentry");
var errors_1 = require("~utils/errors");
var AbstractBot = /** @class */ (function () {
    function AbstractBot() {
    }
    AbstractBot.prototype.sendMessage = function (params) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.doSendMessage(params)];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _b.sent();
                        if (err_1 instanceof errors_1.ChatError) {
                            params.onEvent({ type: 'ERROR', error: err_1 });
                        }
                        else if (!((_a = params.signal) === null || _a === void 0 ? void 0 : _a.aborted)) {
                            // ignore user abort exception
                            params.onEvent({ type: 'ERROR', error: new errors_1.ChatError(err_1.message, errors_1.ErrorCode.UNKOWN_ERROR) });
                        }
                        sentry_1.Sentry.captureException(err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(AbstractBot.prototype, "name", {
        get: function () {
            return undefined;
        },
        enumerable: false,
        configurable: true
    });
    return AbstractBot;
}());
exports.AbstractBot = AbstractBot;
var DummyBot = /** @class */ (function (_super) {
    __extends(DummyBot, _super);
    function DummyBot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DummyBot.prototype.doSendMessage = function (_params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    DummyBot.prototype.resetConversation = function () {
        // dummy
    };
    Object.defineProperty(DummyBot.prototype, "name", {
        get: function () {
            return '';
        },
        enumerable: false,
        configurable: true
    });
    return DummyBot;
}(AbstractBot));
var AsyncAbstractBot = /** @class */ (function (_super) {
    __extends(AsyncAbstractBot, _super);
    function AsyncAbstractBot() {
        var _this = _super.call(this) || this;
        _AsyncAbstractBot_bot.set(_this, void 0);
        __classPrivateFieldSet(_this, _AsyncAbstractBot_bot, new DummyBot(), "f");
        _this.initializeBot().then(function (bot) {
            __classPrivateFieldSet(_this, _AsyncAbstractBot_bot, bot, "f");
        });
        return _this;
    }
    AsyncAbstractBot.prototype.doSendMessage = function (params) {
        return __classPrivateFieldGet(this, _AsyncAbstractBot_bot, "f").doSendMessage(params);
    };
    AsyncAbstractBot.prototype.resetConversation = function () {
        return __classPrivateFieldGet(this, _AsyncAbstractBot_bot, "f").resetConversation();
    };
    Object.defineProperty(AsyncAbstractBot.prototype, "name", {
        get: function () {
            return __classPrivateFieldGet(this, _AsyncAbstractBot_bot, "f").name;
        },
        enumerable: false,
        configurable: true
    });
    return AsyncAbstractBot;
}(AbstractBot));
exports.AsyncAbstractBot = AsyncAbstractBot;
_AsyncAbstractBot_bot = new WeakMap();
