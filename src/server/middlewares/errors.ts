import "../../loadEnvironment";
import { NextFunction, Request, Response } from "express";
import Debug from "debug";
import chalk from "chalk";

const debug = Debug("songs:middlewares:errors");

export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).send({ error: "Endpoint not found" });
};

export const generalError = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  debug(chalk.red(`💥 Error: ${error.message}`));
  res.status(500).send({ error: "General pete" });
};
