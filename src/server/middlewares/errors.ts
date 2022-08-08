import "../../loadEnvironment";
import { NextFunction, Request, Response } from "express";
import Debug from "debug";
import chalk from "chalk";

const debug = Debug("songs:middlewares:errors");

export const notFoundError = (_req: Request, res: Response) => {
  res.status(404).json({ error: "Endpoint not found" });
};

export const generalError = (
  error: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  debug(chalk.red(`💥 Error: ${error.message}`));
  res.status(500).json({ error: "General pete" });
};
