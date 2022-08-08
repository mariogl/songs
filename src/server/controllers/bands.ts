import { NextFunction, Request, Response } from "express";
import Band from "../../database/models/Band";
import { ErrorWithStatus } from "../../types/errors";

export const getBands = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bands = await Band.find();

    res.status(200).json({ bands });
  } catch (error) {
    next(error);
  }
};

export const addBand = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;

    const band = await Band.create({ name });

    res.status(201).send({ band });
  } catch (error) {
    (error as ErrorWithStatus).status = 400;
    next(error);
  }
};
