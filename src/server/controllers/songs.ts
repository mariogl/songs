import { NextFunction, Request, Response } from "express";
import Song from "../../database/models/Song";
import { ErrorWithStatus } from "../../types/errors";
import { customError } from "../utils/errors";

export const getSongs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const songs = await Song.find().populate("band");

    res.status(200).send({ songs });
  } catch (error) {
    next(error);
  }
};

export const getSong = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const song = await Song.findById(id).populate("band");

    if (!song) {
      return next(customError("Song not found", 404));
    }

    res.status(200).send({ song });
  } catch (error) {
    next(error);
  }
};

export const addSong = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, band } = req.body;

    const song = new Song({ title, band });

    await song.save();

    res.status(201).send({ song });
  } catch (error) {
    (error as ErrorWithStatus).status = 400;
    next(error);
  }
};
