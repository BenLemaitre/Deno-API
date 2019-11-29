import { Client } from "https://deno.land/x/mysql/mod.ts";
import { DB_PATH, DB_USERNAME, DB_NAME, DB_PASSWORD } from "../config.ts";

// db connect
const client = await new Client().connect({
  hostname: DB_PATH,
  username: DB_USERNAME,
  db: DB_NAME,
  poolSize: 3, // connection limit
  password: DB_PASSWORD
});

export const fetchData = async (table: string, params:any): Promise<[]> => {
  let query = `select * from ${table}`;

  if (params.length > 0) {
    query += ` where ?? = ?`;
  }

  const data = await client.query(query, params);
  return data;
};

export const persistData = async (data: any): Promise<void> => {
  let result = await client.execute(`INSERT INTO songs (title, artist, genre, year) values(?, ?, ?, ?)`, [
    data.title, data.artist, data.genre, data.year
  ]);
};

export const updateData = async (table: string, id: number, data: object): Promise<void> => {
  let query = `update ${table} set `
  let params = [];

  for (let key in data) {
    query += ` ?? = ?,`;
    params.push(key, data[key]);
  }

  // remove last ','
  query = query.substring(0, query.length -1);
  query += ` where id = ${id}`;

  let result = await client.execute(query, params);
}

export const deleteData = async (table: string, id: number): Promise<void> => {
  let query = `delete from ${table} where ?? = ?`;
  let params = ["id", id];

  let result = await client.execute(query, params);
}