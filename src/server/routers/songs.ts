import { Router } from "express";
import { addSong } from "../controllers/songs";

const songsRouter = Router();

songsRouter.post("/new-song", addSong);

export default songsRouter;
