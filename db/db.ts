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
}

export const persistData = async (table: string, data: object): Promise<void> => {
  let query = `insert into ${table} ({0}) values({1})`;
  let values = '?,';
  let fields = Object.keys(data);
  let params = Object.values(data);
  
  values = values.repeat(fields.length);
  // remove last ','
  values = values.substring(0, values.length -1);
  
  query = query.replace('{0}', fields.join(','));
  query = query.replace('{1}', values);

  let result = await client.execute(query, params);
}

export const updateData = async (table: string, id: number, data: object): Promise<void> => {
  let query = `update ${table} set {0} where id = ${id}`
  let fields = `?? = ?,`;
  let params = [];

  for (let key in data) {
    params.push(key, data[key]);
  }

  fields = fields.repeat(Object.keys(data).length);
  fields = fields.substring(0, fields.length -1);
  query = query.replace('{0}', fields);
  let result = await client.execute(query, params);
}

export const deleteData = async (table: string, id: number): Promise<void> => {
  let query = `delete from ${table} where ?? = ?`;
  let params = ["id", id];

  let result = await client.execute(query, params);
}