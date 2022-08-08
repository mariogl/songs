import { Router } from "express";
import { addSong, getSong, getSongs } from "../controllers/songs";

const songsRouter = Router();

songsRouter.get("/", getSongs);
songsRouter.get("/:id", getSong);
songsRouter.post("/new-song", addSong);

export default songsRouter;
