import { updateSong } from "../services/songs.ts";

export default async ({ params, request, response }) => {
  const songId = params.id;

  if (!songId) {
    response.status = 400;
    response.body = { msg: "Invalid song id" };
    return;
  }

  if (!request.hasBody) {
    response.status = 400;
    response.body = { msg: "Invalid song data" };
    return;
  }

  const {
    value: { title, artist, genre, year }
  } = await request.body();

  await updateSong(songId, { title, artist, genre, year });

  response.body = { msg: "Song updated" };
};