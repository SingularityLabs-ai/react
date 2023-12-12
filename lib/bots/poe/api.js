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
exports.getChatId = exports.gqlRequest = exports.getPoeSettings = exports.GRAPHQL_QUERIES = void 0;
var ofetch_1 = require("ofetch");
var md5_1 = require("md5");
var ChatViewQuery_graphql_raw_1 = require("./graphql/ChatViewQuery.graphql?raw");
var AddMessageBreakMutation_graphql_raw_1 = require("./graphql/AddMessageBreakMutation.graphql?raw");
var SendMessageMutation_graphql_raw_1 = require("./graphql/SendMessageMutation.graphql?raw");
var SubscriptionsMutation_graphql_raw_1 = require("./graphql/SubscriptionsMutation.graphql?raw");
var MessageAddedSubscription_graphql_raw_1 = require("./graphql/MessageAddedSubscription.graphql?raw");
var ViewerStateUpdatedSubscription_graphql_raw_1 = require("./graphql/ViewerStateUpdatedSubscription.graphql?raw");
var errors_1 = require("~utils/errors");
var i18n_1 = require("~app/i18n");
exports.GRAPHQL_QUERIES = {
    AddMessageBreakMutation: AddMessageBreakMutation_graphql_raw_1.default,
    ChatViewQuery: ChatViewQuery_graphql_raw_1.default,
    SendMessageMutation: SendMessageMutation_graphql_raw_1.default,
    SubscriptionsMutation: SubscriptionsMutation_graphql_raw_1.default,
    MessageAddedSubscription: MessageAddedSubscription_graphql_raw_1.default,
    ViewerStateUpdatedSubscription: ViewerStateUpdatedSubscription_graphql_raw_1.default,
};
function getFormkey() {
    return __awaiter(this, void 0, void 0, function () {
        var html, r, scriptText, key, cipherPairs, result, _i, cipherPairs_1, _a, i, j;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, ofetch_1.ofetch)('https://poe.com', { parseResponse: function (txt) { return txt; } })];
                case 1:
                    html = _b.sent();
                    r = html.match(/<script>if(.+)throw new Error;(.+),window.+<\/script>/);
                    scriptText = r[2];
                    key = scriptText.match(/var .="(\w+)"/)[1];
                    cipherPairs = Array.from(scriptText.matchAll(/\[(\d+)\]=.\[(\d+)\]/g)).map(function (m) { return [Number(m[1]), Number(m[2])]; });
                    result = Array(cipherPairs.length);
                    for (_i = 0, cipherPairs_1 = cipherPairs; _i < cipherPairs_1.length; _i++) {
                        _a = cipherPairs_1[_i], i = _a[0], j = _a[1];
                        result[i] = key[j];
                    }
                    return [2 /*return*/, result.join('')];
            }
        });
    });
}
function getPoeSettings() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, settings, formkey;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Promise.all([(0, ofetch_1.ofetch)('https://poe.com/api/settings'), getFormkey()])];
                case 1:
                    _a = _b.sent(), settings = _a[0], formkey = _a[1];
                    console.debug('poe formkey', formkey);
                    settings.formkey = formkey;
                    return [2 /*return*/, settings];
            }
        });
    });
}
exports.getPoeSettings = getPoeSettings;
function gqlRequest(queryName, variables, poeSettings) {
    return __awaiter(this, void 0, void 0, function () {
        var query, payload, tagId;
        return __generator(this, function (_a) {
            query = exports.GRAPHQL_QUERIES[queryName];
            payload = { query: query, variables: variables };
            tagId = (0, md5_1.default)(JSON.stringify(payload) + poeSettings.formkey + 'WpuLMiXEKKE98j56k');
            return [2 /*return*/, (0, ofetch_1.ofetch)('https://poe.com/api/gql_POST', {
                    method: 'POST',
                    body: payload,
                    headers: {
                        'poe-formkey': poeSettings.formkey,
                        'poe-tag-id': tagId,
                        'poe-tchannel': poeSettings.tchannelData.channel,
                    },
                })];
        });
    });
}
exports.gqlRequest = gqlRequest;
function getChatId(bot, poeSettings) {
    return __awaiter(this, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, gqlRequest('ChatViewQuery', { bot: bot }, poeSettings)];
                case 1:
                    resp = _a.sent();
                    if (!resp.data) {
                        throw new errors_1.ChatError(i18n_1.default.t('You need to login to Poe first'), errors_1.ErrorCode.POE_UNAUTHORIZED);
                    }
                    return [2 /*return*/, resp.data.chatOfBot.chatId];
            }
        });
    });
}
exports.getChatId = getChatId;
