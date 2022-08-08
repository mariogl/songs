import { NextFunction, Request, Response } from "express";
import Band from "../../database/models/Band";
import { ErrorWithStatus } from "../../types/errors";

export const getBands = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bands = await Band.find();

    res.status(200).send({ bands });
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

    const band = new Band({ name });

    await band.save();

    res.status(201).send({ band });
  } catch (error) {
    (error as ErrorWithStatus).status = 400;
    next(error);
  }
};
