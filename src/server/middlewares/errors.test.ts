import { Request, Response } from "express";
import { notFoundError } from "./errors";

describe("Given a notFoundError function", () => {
  describe("When it's called with a response", () => {
    test("Then it should call res.status with 404 and res.json with 'Endpoint not found'", () => {
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const statusCode = 404;
      const expectedResponse = { error: "Endpoint not found" };

      notFoundError({} as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(statusCode);
      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });
});
