"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
exports.init = init;
exports.getByQuery = getByQuery;
exports.getByQueryWithLimit = getByQueryWithLimit;
exports.updateByQuery = updateByQuery;
const mysql = require("mysql2/promise");
const config = require("../config");
exports.pool = null;
async function init() {
    if (null !== exports.pool) {
        return;
    }
    const configInfo = config.getConfig();
    const { host, user, port, password, database, waitForConnections, connectionLimit, queueLimit } = configInfo.mysql;
    exports.pool = mysql.createPool({
        host, user, password, port, database, waitForConnections, connectionLimit,
        connectTimeout: 20000,
        timezone: '+08:00',
        charset: 'utf8mb4'
    });
    const _query = exports.pool.query.bind(exports.pool);
    exports.pool.query = async function (sql, where) {
        try {
            const finalSql = mysql.format(sql, where);
            console.log(finalSql);
            const res = await _query(sql, where);
            return res;
        }
        catch (e) {
            const finalSql = mysql.format(sql, where);
            console.log(`[Mysql] [Error] query failed with sql: [${finalSql}], message: [${e.message}]`);
            console.log(e.stack);
            throw e;
        }
    };
}
async function getByQuery(tableName, query) {
    console.log(`getByQuery, tableName: [${tableName}], query: [${JSON.stringify(query)}]`);
    let queryString = '1 = 1';
    const queryParams = [];
    for (const key in query) {
        const value = query[key];
        queryString += ` AND \`${key}\`=?`;
        queryParams.push(value);
    }
    const [res] = await exports.pool.query(`
  SELECT
    *
  FROM
    \`${tableName}\`
  WHERE
    ${queryString}
  `, [...queryParams]);
    return res;
}
async function getByQueryWithLimit(tableName, query, limit) {
    console.log(`getByQueryWithLimit, tableName: [${tableName}], query: [${JSON.stringify(query)}], limit: [${limit}]`);
    let queryString = '1 = 1';
    const queryParams = [];
    for (const key in query) {
        const value = query[key];
        queryString += ` AND \`${key}\`=?`;
        queryParams.push(value);
    }
    const [res] = await exports.pool.query(`
  SELECT
    *
  FROM
    \`${tableName}\`
  WHERE
    ${queryString}
  ORDER BY ID DESC
  LIMIT ?, ?
  `, [...queryParams, limit?.[0] || 0, limit?.[1] || 1000]);
    return res;
}
async function updateByQuery(tableName, params, query) {
    console.log(`updateByQuery, tableName: [${tableName}], params: [${JSON.stringify(params)}], query: [${JSON.stringify(query)}]`);
    const queryParams = [];
    let setString = '';
    for (const key in params) {
        const value = params[key];
        setString += `\`${key}\`=?, `;
        queryParams.push(value);
    }
    setString = setString.slice(0, -2);
    let queryString = '1 = 1';
    for (const key in query) {
        const value = query[key];
        queryString += ` AND \`${key}\`=?`;
        queryParams.push(value);
    }
    await exports.pool.query(`
  UPDATE
    \`${tableName}\`
  SET
    ${setString}
  WHERE
    ${queryString}
  `, [...queryParams]);
}
