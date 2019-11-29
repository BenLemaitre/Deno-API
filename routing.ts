import { Router } from "https://deno.land/x/oak/mod.ts";

import getSongs from "./handlers/getSongs.ts";
import getSongDetails from "./handlers/getSongDetails.ts";
import createSong from "./handlers/createSong.ts";
import updateSong from "./handlers/updateSong.ts";
import deleteSong from "./handlers/deleteSong.ts";

const router = new Router();

router
  .get("/songs", getSongs)
  .get("/songs/:id", getSongDetails)
  .post("/songs", createSong)
  .put("/songs/:id", updateSong)
  .delete("/songs/:id", deleteSong);

export default router;