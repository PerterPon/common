"use strict";
/*
 * house.ts
 * Author: auto-generated
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByQuery = getByQuery;
exports.addHouse = addHouse;
exports.updateByQuery = updateByQuery;
const mysql = require("./index");
const tableName = 'house';
async function getByQuery(query) {
    const items = await mysql.getByQuery(tableName, query);
    return items.map(assemblyHouse);
}
function assemblyHouse(item) {
    const { id, gmt_create, gmt_modify, name, datetime, total_size, width, height, location, price, privacy, house_type, parking, comment } = item;
    return {
        id,
        gmt_create,
        gmt_modify,
        name,
        datetime,
        total_size,
        width,
        height,
        location,
        price,
        privacy,
        house_type,
        parking,
        comment
    };
}
async function addHouse(house) {
    const { name, datetime, total_size, width, height, location, price, privacy, house_type, parking, comment } = house;
    await mysql.pool.query(`
    INSERT INTO house(name, datetime, total_size, width, height, location, price, privacy, house_type, parking, comment)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [name, datetime, total_size, width, height, location, price, privacy, house_type, parking, comment]);
}
async function updateByQuery(params, query) {
    await mysql.updateByQuery(tableName, params, query);
}
