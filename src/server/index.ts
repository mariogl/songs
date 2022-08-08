import "../loadEnvironment";
import Debug from "debug";
import chalk from "chalk";
import app from "./server";
import { ErrorWithCode } from "../types/errors";

const debug = Debug("songs:server:index");

const initializeServer = (port: number) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.yellow(`👍 Server listening on http://localhost:${port}`));
      resolve(true);
    });

    server.on("error", (error: ErrorWithCode) => {
      debug(chalk.red(`💥 Server error`));
      if (error.code === "EADDRINUSE") {
        debug(chalk.red(`Port ${port} already in use`));
      } else {
        debug(chalk.red(error.message));
      }
      reject(error);
    });
  });

export default initializeServer;
