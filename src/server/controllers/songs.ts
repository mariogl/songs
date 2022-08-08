import { NextFunction, Request, Response } from "express";
import Song from "../../database/models/Song";
import { ErrorWithStatus } from "../../types/errors";
import customError from "../utils/customError";

export const getSongs = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const songs = await Song.find().populate("band");

    res.status(200).json({ songs });
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
      next(customError("Song not found", 404));
      return;
    }

    res.status(200).json({ song });
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

    const song = await Song.create({ title, band });

    res.status(201).json({ song });
  } catch (error) {
    (error as ErrorWithStatus).status = 400;
    next(error);
  }
};
