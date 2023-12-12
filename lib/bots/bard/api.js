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
exports.parseBardResponse = exports.fetchRequestParams = void 0;
var ofetch_1 = require("ofetch");
var errors_1 = require("~utils/errors");
function extractFromHTML(variableName, html) {
    var regex = new RegExp("\"".concat(variableName, "\":\"([^\"]+)\""));
    var match = regex.exec(html);
    return match === null || match === void 0 ? void 0 : match[1];
}
function fetchRequestParams() {
    return __awaiter(this, void 0, void 0, function () {
        var html, atValue, blValue;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, ofetch_1.ofetch)('https://bard.google.com/faq')];
                case 1:
                    html = _a.sent();
                    atValue = extractFromHTML('SNlM0e', html);
                    blValue = extractFromHTML('cfb2h', html);
                    return [2 /*return*/, { atValue: atValue, blValue: blValue }];
            }
        });
    });
}
exports.fetchRequestParams = fetchRequestParams;
function parseBardResponse(resp) {
    var data = JSON.parse(resp.split('\n')[3]);
    var payload = JSON.parse(data[0][2]);
    if (!payload) {
        throw new errors_1.ChatError('Failed to access Bard', errors_1.ErrorCode.BARD_EMPTY_RESPONSE);
    }
    console.debug('bard response payload', payload);
    var text = payload[4][0][1][0];
    var images = payload[4][0][4] || [];
    for (var _i = 0, images_1 = images; _i < images_1.length; _i++) {
        var image = images_1[_i];
        var media = image[0], source = image[1], placeholder = image[2];
        text = text.replace(placeholder, "[![".concat(media[4], "](").concat(media[0][0], ")](").concat(source[0][0], ")"));
    }
    return {
        text: text,
        ids: __spreadArray(__spreadArray([], payload[1], true), [payload[4][0][0]], false),
    };
}
exports.parseBardResponse = parseBardResponse;
