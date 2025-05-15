"use strict";
/*
 * config.ts
 * Author: perterpon.wang<perterpon.wang@bytedance.com>
 * Create: Sun Mar 10 2024 21:55:13 GMT+0800 (China Standard Time)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.tempFolder = void 0;
exports.getEtcFolderPath = getEtcFolderPath;
exports.init = init;
exports.getConfig = getConfig;
exports.setTempFolder = setTempFolder;
exports.getTaskId = getTaskId;
exports.setTaskId = setTaskId;
const path = require("path");
const fs = require("fs");
const js_yaml_1 = require("js-yaml");
const _ = require("lodash");
let config = null;
function getEtcFolderPath() {
    const etcPath = path.join(__dirname, '../../../etc');
    return etcPath;
}
async function init(env, force = false) {
    if (null !== config && false === force) {
        return config;
    }
    const etcPath = getEtcFolderPath();
    const defaultFilePath = path.join(etcPath, '/default.yaml');
    const defaultFileContent = fs.readFileSync(defaultFilePath, 'utf-8');
    const defaultConfig = (0, js_yaml_1.load)(defaultFileContent);
    defaultConfig.tempFolder = path.join(__dirname, defaultConfig.tempFolder);
    defaultConfig.assetsFolder = path.join(__dirname, defaultConfig.assetsFolder);
    defaultConfig.logFolder = path.join(__dirname, defaultConfig.logFolder);
    let listenConfig = {};
    if (true === _.isString(env)) {
        const envFilePath = path.join(etcPath, `/${env}.yaml`);
        const envFileContent = fs.readFileSync(envFilePath, 'utf-8');
        const envConfig = (0, js_yaml_1.load)(envFileContent);
        listenConfig = _.merge(defaultConfig, envConfig);
    }
    else {
        listenConfig = defaultConfig;
    }
    config = listenConfig;
    return listenConfig;
}
function getConfig() {
    const unitTest = process.argv[2] === 'unittest';
    const siteConfig = config;
    siteConfig.unitTest = unitTest;
    return siteConfig;
}
exports.tempFolder = '';
function setTempFolder(folderValue) {
    exports.tempFolder = folderValue || exports.tempFolder;
}
let taskId = '';
function getTaskId() {
    return taskId;
}
function setTaskId(newTaskId) {
    taskId = newTaskId;
}
