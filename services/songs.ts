import { fetchData, persistData, updateData, deleteData } from "../db/db.ts";
import { Song } from "../models/song.ts";

type SongData = Pick<Song, "title" | "artist" | "genre" | "year">;
const table = "songs";

export const getSongs = async (): Promise<Song[]> => {
  const songs = await fetchData(table, []);
  return songs;
};

export const getSongById = async (songId: number): Promise<Song[] | undefined> => {
  let params = ["id", songId];
  const song = await fetchData(table, params);

  return song;
};

export const createSong = async (songData: SongData): Promise<string> => {
  const newSong: Song = {
    id: 0,
    title: String(songData.title),
    artist: String(songData.artist),
    genre: String(songData.genre),
    year: Number(songData.year)
  };

  await persistData(newSong);

  return newSong.title;
};

export const updateSong = async (songId: number, songData: SongData): Promise<void> => {
  const song = {
    title: String(songData.title),
    artist: String(songData.artist),
    genre: String(songData.genre),
    year: Number(songData.year)
  };

  await updateData(table, songId, song);
};

export const deleteSong = async (songId: number): Promise<void> => {
  await deleteData(table, songId);
};