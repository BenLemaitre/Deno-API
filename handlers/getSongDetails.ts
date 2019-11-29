import { getSong } from "../services/songs.ts";

export default async ({ params, response }) => {
  const songId = params.id;

  if (!songId) {
    response.status = 400;
    response.body = { msg: "Invalid song id" };
    return;
  }

  const foundSong = await getSong(songId);
  if (!foundSong) {
    response.status = 404;
    response.body = { msg: `Song with ID ${songId} not found` };
    return;
  }

  response.body = foundSong;
};