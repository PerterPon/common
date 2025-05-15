"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
if (typeof Blob === 'undefined') {
    global.Blob = require('buffer').Blob;
}
const path = require("path");
const Koa = require("koa");
const Router = require("koa-router");
const Static = require('koa-static');
const bodyParser = require("koa-bodyparser");
// import * as log from '../log';
const config = require("../src/core/config");
const mysql = require("../src/core/mysql");
const utils = require("../utils");
const house = require("./biz/house");
async function start() {
    await init();
    const configInfo = config.getConfig();
    const { htmlPort } = configInfo.htmlServer;
    const app = new Koa();
    const router = new Router();
    const staticMiddleware = Static(path.join(__dirname, '../../../../html/build/'));
    app.use(async (ctx, next) => {
        ctx.set('Access-Control-Allow-Origin', '*');
        ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        if (ctx.method == 'OPTIONS') {
            ctx.body = 200;
        }
        else {
            await next();
        }
    });
    app.use(staticMiddleware);
    app.use(bodyParser({
        jsonLimit: '1000mb'
    }));
    app.use(async (ctx, next) => {
        const startTime = new Date();
        console.log(`[${utils.displayTime()}] new request [${ctx.url}], query: [${ctx.querystring}], headers: [${JSON.stringify(ctx.headers)}], method: [${ctx.method}], body: [${JSON.stringify(ctx.request.body)}]`);
        await next();
        const costTime = Date.now() - startTime.getTime();
        console.log(`[${utils.displayTime()}] request: [${ctx.url}] cost time: [${costTime}ms]`);
    });
    router.post('/api', onMethod.bind(undefined, Object.assign({}, house)));
    app.use(router.routes());
    app.use(router.allowedMethods());
    app.listen(htmlPort, async () => {
        console.log(`listing port: [${htmlPort}]`);
    });
}
async function init() {
    await config.init();
    await mysql.init();
}
async function onMethod(targetMethods, ctx) {
    const { method, data } = ctx.request.body;
    const tarMethod = targetMethods[method];
    if (undefined === tarMethod) {
        ctx.body = {
            success: false,
            message: `method: [${method}] did not found!`
        };
        ctx.status = 404;
    }
    else {
        try {
            const resData = await tarMethod(data);
            ctx.body = {
                success: true,
                message: 'ok',
                data: resData,
                method,
            };
        }
        catch (e) {
            console.log(e);
            ctx.body = {
                success: false,
                message: e.message,
                method
            };
        }
    }
}
start();
