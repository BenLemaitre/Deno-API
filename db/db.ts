import { Client } from "https://deno.land/x/mysql/mod.ts";
import { DB_PATH, DB_USERNAME, DB_NAME, DB_PASSWORD } from "../config.ts";
import { Song } from "../models/song.ts";

// db connect
const client = await new Client().connect({
  hostname: DB_PATH,
  username: DB_USERNAME,
  db: DB_NAME,
  poolSize: 3, // connection limit
  password: DB_PASSWORD
});

export const fetchData = async (): Promise<Song[]> => {
  return [];
};

export const persistData = async (data): Promise<void> => {
  let result = await client.execute(`INSERT INTO songs (title, artist, genre, year) values(?, ?, ?, ?)`, [
    data.title, data.artist, data.genre, data.year
  ]);
}