"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSessionHash = void 0;
function generateSessionHash() {
    // https://stackoverflow.com/a/12502559/325241
    return Math.random().toString(36).substring(2);
}
exports.generateSessionHash = generateSessionHash;
