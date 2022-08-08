import { Router } from "express";
import { addBand } from "../controllers/bands";

const bandsRouter = Router();

bandsRouter.post("/new-band", addBand);

export default bandsRouter;
