import * as mysqlHouse from "../core/mysql/house";
import { House } from "../../../types";

function calculateTotal(house: House): number {
  // 假设每个字段的分数已归一化到 0-100，否则需归一化处理
  // 权重：price 50, location 20, privacy 10, house_type 5, parking 15
  const weights = {
    price: 50,
    location: 20,
    privacy: 10,
    house_type: 5,
    parking: 15,
  };
  let total = 0;
  let weightSum = 0;
  for (const key in weights) {
    const value = house[key] ?? 0;
    total += Number(value) * weights[key] / 100;
    weightSum += weights[key];
  }
  // 保证总分不超过 100
  return Math.round(Math.min(total, 100));
}

export async function addHouse(house: House): Promise<void> {
  await mysqlHouse.addHouse(house);
}

export async function getHouseList(): Promise<House[]> {
  const houses = await mysqlHouse.getByQuery({});
  return houses
    .map(house => ({ ...house, total: calculateTotal(house) }))
    .sort((a, b) => (b.total ?? 0) - (a.total ?? 0));
}
