import { Request, Response } from "express";
import Band from "../../database/models/Band";
import { addBand, getBands } from "./bands";

describe("Given a getBands controller", () => {
  describe("When it's called with a response", () => {
    test("Then it should call res.status with 200 and res.json with bands", async () => {
      const status = 200;
      const bands = [{ name: "The Beatles" }];

      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Band.find = jest.fn().mockResolvedValue(bands);

      await getBands({} as Request, res as Response, () => {});

      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.json).toHaveBeenCalledWith({ bands });
    });
  });

  describe("When it's called with a next function and find throws an error", () => {
    test("Then it should call next function with the error", async () => {
      const error = new Error("Something went wrong");

      const next = jest.fn();

      Band.find = jest.fn().mockRejectedValue(error);

      await getBands({} as Request, {} as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given a addBand controller", () => {
  describe("When it's called with a request with name 'The Beatles' and a response", () => {
    test("Then it should call res.status with 201 and res.send with band", async () => {
      const status = 201;
      const name = "The Beatles";
      const band = { name };

      const req: Partial<Request> = {
        body: { name },
      };

      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      Band.create = jest.fn().mockResolvedValue(band);

      await addBand(req as Request, res as Response, () => {});

      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.send).toHaveBeenCalledWith({ band });
    });
  });

  describe("When it's called with a next function and create throws an error", () => {
    test("Then it should call next function with the error", async () => {
      const error = new Error("Something went wrong");

      const req: Partial<Request> = {
        body: { name: "The Beatles" },
      };

      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      Band.create = jest.fn().mockRejectedValue(error);

      const next = jest.fn();

      await addBand(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
