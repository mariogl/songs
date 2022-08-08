import { Request, Response } from "express";
import Song from "../../database/models/Song";
import { addSong, getSong, getSongs } from "./songs";

describe("Given a getSongs controller", () => {
  describe("When it's called with a response", () => {
    test("Then it should call res.status with 200 and res.json with songs", async () => {
      const status = 200;
      const songs = [{ title: "The Beatles" }];

      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Song.find = jest.fn().mockReturnThis();
      Song.populate = jest.fn().mockResolvedValue(songs);

      await getSongs({} as Request, res as Response, () => {});

      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.json).toHaveBeenCalledWith({ songs });
    });
  });

  describe("When it's called with a next function and find throws an error", () => {
    test("Then it should call next function with the error", async () => {
      const error = new Error("Something went wrong");

      const next = jest.fn();

      Song.find = jest.fn().mockReturnThis();
      Song.populate = jest.fn().mockRejectedValue(error);

      await getSongs({} as Request, {} as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given a getSong controller", () => {
  describe("When it's called with a request with id 'the-id' and a response", () => {
    test("Then it should call res.status with 200 and res.json with song", async () => {
      const status = 200;
      const song = { title: "The Beatles" };

      const req: Partial<Request> = {
        params: { id: "the-id" },
      };

      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Song.findById = jest.fn().mockReturnThis();
      Song.populate = jest.fn().mockResolvedValue(song);

      await getSong(req as Request, res as Response, () => {});

      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.json).toHaveBeenCalledWith({ song });
    });

    describe("And the id is not found", () => {
      test("Then it should call next with a 404 'Song not found' error", async () => {
        const error = new Error("Song not found");

        const req: Partial<Request> = {
          params: { id: "the-id" },
        };

        const res: Partial<Response> = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };

        Song.findById = jest.fn().mockReturnThis();
        Song.populate = jest.fn().mockResolvedValue(null);

        const next = jest.fn();

        await getSong(req as Request, res as Response, next);

        expect(next).toHaveBeenCalledWith(error);
      });
    });
  });

  describe("When it's called with a next function and find throws an error", () => {
    test("Then it should call next function with the error", async () => {
      const error = new Error("Something went wrong");

      const req: Partial<Request> = {
        params: { id: "the-id" },
      };

      const next = jest.fn();

      Song.findById = jest.fn().mockReturnThis();
      Song.populate = jest.fn().mockRejectedValue(error);

      await getSong(req as Request, {} as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given an addSong controller", () => {
  describe("When it's called with a request with a song and a response", () => {
    test("Then it should call res.status with 201 and res.json with the song", async () => {
      const status = 201;
      const song = { title: "The Beatles" };

      const req: Partial<Request> = {
        body: song,
      };

      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Song.create = jest.fn().mockResolvedValue(song);

      await addSong(req as Request, res as Response, () => {});

      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.json).toHaveBeenCalledWith({ song });
    });
  });

  describe("When it's called with a next function and create throws an error", () => {
    test("Then it should call next function with the error", async () => {
      const error = new Error("Something went wrong");

      const req: Partial<Request> = {
        body: { title: "The Beatles" },
      };

      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Song.create = jest.fn().mockRejectedValue(error);

      const next = jest.fn();

      await addSong(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
