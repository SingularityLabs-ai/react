"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHATGPT_SYSTEM_MESSAGE = void 0;
var currentDate = new Date().toISOString().split('T')[0];
exports.CHATGPT_SYSTEM_MESSAGE = "You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible.\nKnowledge cutoff: 2021-09-01\nCurrent date: ".concat(currentDate);
