"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = sleep;
exports.displayTime = displayTime;
const moment = require("moment-timezone");
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function displayTime(needMs = false) {
    let format = 'YYYY-MM-DD_HH:mm:ss';
    if (true === needMs) {
        format = `${format}.SSS`;
    }
    return moment().tz('Asia/Shanghai').format(format);
}
