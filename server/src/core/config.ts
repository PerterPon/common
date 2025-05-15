
/*
 * config.ts
 * Author: perterpon.wang<perterpon.wang@bytedance.com>
 * Create: Sun Mar 10 2024 21:55:13 GMT+0800 (China Standard Time)
 */

import * as path from 'path';
import * as fs from 'fs';
import { load } from 'js-yaml';
import * as _ from 'lodash';

export interface TTBSConfig {
    [key: string]: any;
}

let config: TTBSConfig = null;

export function getEtcFolderPath(): string {
    const etcPath: string = path.join(__dirname, '../../../etc');
    return etcPath;
}

export async function init(env?: string, force: boolean = false): Promise<TTBSConfig> {
    if (null !== config && false === force) {
        return config;
    }
    const etcPath: string = getEtcFolderPath();
    const defaultFilePath: string = path.join(etcPath, '/default.yaml');
    const defaultFileContent: string = fs.readFileSync(defaultFilePath, 'utf-8');
    const defaultConfig: TTBSConfig = load(defaultFileContent) as TTBSConfig;
    defaultConfig.tempFolder = path.join(__dirname, defaultConfig.tempFolder);
    defaultConfig.assetsFolder = path.join(__dirname, defaultConfig.assetsFolder);
    defaultConfig.logFolder = path.join(__dirname, defaultConfig.logFolder)

    let listenConfig: TTBSConfig = {} as any;
    if (true === _.isString(env)) {
        const envFilePath: string = path.join(etcPath, `/${env}.yaml`);
        const envFileContent: string = fs.readFileSync(envFilePath, 'utf-8');
        const envConfig: TTBSConfig = load(envFileContent) as TTBSConfig;
        listenConfig = _.merge(defaultConfig, envConfig);
    } else {
        listenConfig = defaultConfig;
    }

    config = listenConfig;
    return listenConfig;
}

export function getConfig(): TTBSConfig {
    const unitTest: boolean = process.argv[2] === 'unittest';
    const siteConfig = config;
    siteConfig.unitTest = unitTest;
    return siteConfig;
}

export let tempFolder: string = '';

export function setTempFolder(folderValue): void {
    tempFolder = folderValue || tempFolder;
}

let taskId: string = '';
export function getTaskId(): string {
    return taskId;
}

export function setTaskId(newTaskId: string): void {
    taskId = newTaskId;
}
