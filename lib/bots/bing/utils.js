"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.websocketUtils = exports.convertMessageToMarkdown = void 0;
function convertMessageToMarkdown(message) {
    if (message.messageType === 'InternalSearchQuery') {
        return message.text;
    }
    for (var _i = 0, _a = message.adaptiveCards; _i < _a.length; _i++) {
        var card = _a[_i];
        for (var _b = 0, _c = card.body; _b < _c.length; _b++) {
            var block = _c[_b];
            if (block.type === 'TextBlock') {
                return block.text;
            }
        }
    }
    return '';
}
exports.convertMessageToMarkdown = convertMessageToMarkdown;
var RecordSeparator = String.fromCharCode(30);
exports.websocketUtils = {
    packMessage: function (data) {
        return "".concat(JSON.stringify(data)).concat(RecordSeparator);
    },
    unpackMessage: function (data) {
        return data
            .toString()
            .split(RecordSeparator)
            .filter(Boolean)
            .map(function (s) { return JSON.parse(s); });
    },
};
