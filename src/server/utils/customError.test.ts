import customError from "./customError";

describe("Given a customError function", () => {
  describe("When it's called with a message 'tot petat' and status 403", () => {
    test("Then it should return an error with status 403 and message 'tot petat'", () => {
      const errorMessage = "tot petat";
      const errorStatus = 403;

      const error = customError(errorMessage, errorStatus);

      expect(error.status).toBe(errorStatus);
      expect(error.message).toBe(errorMessage);
    });
  });
});
