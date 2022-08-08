import { Request, Response } from "express";
import { notFoundError, generalError } from "./errors";

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe("Given a notFoundError function", () => {
  describe("When it's called with a response", () => {
    test("Then it should call res.status with 404 and res.json with 'Endpoint not found'", () => {
      const statusCode = 404;
      const expectedResponse = { error: "Endpoint not found" };

      notFoundError({} as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(statusCode);
      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });
});

describe("Given a generalError function", () => {
  describe("When it's called with a response", () => {
    test("Then it should call res.status with 500 and res.json with 'General pete'", () => {
      const error = new Error("Pete");
      const statusCode = 500;
      const expectedResponse = { error: "General pete" };

      generalError(error, {} as Request, res as Response, () => {});

      expect(res.status).toHaveBeenCalledWith(statusCode);
      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });
});
