import { Router } from "express";
import { addBand, getBands } from "../controllers/bands";

const bandsRouter = Router();

bandsRouter.get("/", getBands);
bandsRouter.post("/new-band", addBand);

export default bandsRouter;
