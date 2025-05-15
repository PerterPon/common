
import * as mysql from 'mysql2/promise';
import * as config from '../config';
import * as _ from 'lodash';

import * as moment from "moment";
import { log } from 'console';

export let pool: mysql.Pool = null;

export async function init(): Promise<void> {
  if (null !== pool) {
    return;
  }

  const configInfo = config.getConfig();
  const { host, user, port, password, database, waitForConnections, connectionLimit, queueLimit } = configInfo.mysql;
  pool = mysql.createPool({
    host, user, password, port, database, waitForConnections, connectionLimit,
    connectTimeout: 20000,
    timezone: '+08:00',
    charset: 'utf8mb4'
  });
  const _query = pool.query.bind(pool);
  pool.query = async function (sql, where) {
    try {
      const finalSql = mysql.format(sql, where);
      console.log(finalSql);
      const res = await _query(sql, where);
      return res;
    } catch (e) {
      const finalSql = mysql.format(sql, where);
      console.log(`[Mysql] [Error] query failed with sql: [${finalSql}], message: [${e.message}]`);
      console.log(e.stack);
      throw e;
    }
  } as any;
}

export async function getByQuery<T>(tableName: string, query: Record<string, any>): Promise<T[]> {
  console.log(`getByQuery, tableName: [${tableName}], query: [${JSON.stringify(query)}]`);

  let queryString = '1 = 1';
  const queryParams = [];
  for (const key in query) {
    const value = query[key];
    queryString += ` AND \`${key}\`=?`;
    queryParams.push(value);
  }
  const [res]: any = await pool.query(`
  SELECT
    *
  FROM
    \`${tableName}\`
  WHERE
    ${queryString}
  `, [...queryParams]);

  return res;
}

export async function getByQueryWithLimit<T>(tableName: string, query: Record<string, any>, limit: number[]): Promise<T[]> {
  console.log(`getByQueryWithLimit, tableName: [${tableName}], query: [${JSON.stringify(query)}], limit: [${limit}]`);

  let queryString = '1 = 1';
  const queryParams = [];
  for (const key in query) {
    const value = query[key];
    queryString += ` AND \`${key}\`=?`;
    queryParams.push(value);
  }
  const [res]: any = await pool.query(`
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

export async function updateByQuery(tableName: string, params: Record<string, any>, query: Record<string, any>): Promise<void> {
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

  await pool.query(`
  UPDATE
    \`${tableName}\`
  SET
    ${setString}
  WHERE
    ${queryString}
  `, [...queryParams]);
}