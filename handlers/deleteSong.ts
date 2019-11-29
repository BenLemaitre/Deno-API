import { deleteSong, getSongById } from "../services/songs.ts";

export default async ({ params, response }) => {
  const songId = params.id;

  if (!songId) {
    response.status = 400;
    response.body = { msg: "Invalid song id" };
    return;
  }

  const foundSong = await getSongById(songId);
  if (foundSong.length < 0) {
    response.status = 404;
    response.body = { msg: `Song with ID ${songId} not found` };
    return;
  }

  await deleteSong(songId);
  response.body = { msg: "Song deleted" };
};