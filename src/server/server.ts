import express from "express";
import morgan from "morgan";
import { generalError, notFoundError } from "./middlewares/errors";
import bandsRouter from "./routers/bands";
import songsRouter from "./routers/songs";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/bands", bandsRouter);
app.use("/songs", songsRouter);

app.use(notFoundError);
app.use(generalError);

export default app;
