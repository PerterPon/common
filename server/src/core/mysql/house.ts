/*
 * house.ts
 * Author: auto-generated
 */

import * as mysql from './index';

const tableName = 'house';

export type House = {
  id?: number;
  gmt_create?: string;
  gmt_modify?: string;
  name?: string;
  datetime?: string;
  total_size?: number;
  width?: number;
  height?: number;
  location?: number;
  price?: number;
  privacy?: number;
  house_type?: number;
  parking?: number;
  comment?: string;
};

export async function getByQuery(query: Record<string, any>): Promise<House[]> {
  const items = await mysql.getByQuery(tableName, query);
  return items.map(assemblyHouse);
}

function assemblyHouse(item: any): House {
  const {
    id, gmt_create, gmt_modify, name, datetime, total_size, width, height, location, price, privacy, house_type, parking, comment
  } = item;
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

export async function addHouse(house: House): Promise<void> {
  const {
    name, datetime, total_size, width, height, location, price, privacy, house_type, parking, comment
  } = house;
  await mysql.pool.query(`
    INSERT INTO house(name, datetime, total_size, width, height, location, price, privacy, house_type, parking, comment)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [name, datetime, total_size, width, height, location, price, privacy, house_type, parking, comment]);
}

export async function updateByQuery(params: Record<string, any>, query: Record<string, any>): Promise<void> {
  await mysql.updateByQuery(tableName, params, query);
}
