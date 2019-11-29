import { createSong } from "../services/songs.ts";

export default async ({ request, response }) => {
  if (!request.hasBody) {
    response.status = 400;
    response.body = { msg: "Invalid song data" };
    return;
  }

  const { value: { title, artist, genre, year } } = await request.body();

  if (!title || !artist || !genre) {
    response.status = 422;
    response.body = { msg: `Missing data` };
    return;
  }

  const songTitle = await createSong({ title, artist, genre, year});
  
  response.body = { msg: "Song created", songTitle };
};