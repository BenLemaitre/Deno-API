import { fetchData, persistData } from "../db/db.ts";
import { Song } from "../models/song.ts";

type SongData = Pick<Song, "title" | "artist" | "genre" | "year">;

export const getSongs = async (): Promise<Song[]> => {

  return [];
};

export const getSong = async (songId: number): Promise<Song | undefined> => {
  let song = {
    id: 1,
    title: "test",
    artist: "artist",
    genre: "Russian Doomer",
    year: 2019
  };

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

export const updateSong = async (songId: number, songData: SongData
): Promise<void> => {

};

export const deleteSong = async (songId: number): Promise<void> => {
  
};