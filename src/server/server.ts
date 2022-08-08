import express from "express";
import morgan from "morgan";
import cors from "cors";
import { generalError, notFoundError } from "./middlewares/errors";
import bandsRouter from "./routers/bands";
import songsRouter from "./routers/songs";

const allowedOrigins = [
  process.env.ALLOWED_ORIGIN_LOCAL,
  process.env.ALLOWED_ORIGIN_PRODUCTION,
];

const app = express();

app.use(morgan("dev"));
app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(express.json());

app.use("/bands", bandsRouter);
app.use("/songs", songsRouter);

app.use(notFoundError);
app.use(generalError);

export default app;
