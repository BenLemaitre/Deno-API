import { getSongs } from "../services/songs.ts";

export default async ({ response }) => {
  response.body = await getSongs();
};