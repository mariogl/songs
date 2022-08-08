import express from "express";
import morgan from "morgan";
import cors from "cors";
import { generalError, notFoundError } from "./middlewares/errors";
import bandsRouter from "./routers/bandsRouter";
import songsRouter from "./routers/songsRouter";

const app = express();

app.disable("x-powered-by");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/bands", bandsRouter);
app.use("/songs", songsRouter);

app.use(notFoundError);
app.use(generalError);

export default app;
