import { ErrorWithStatus } from "../../types/errors";

export const customError = (message: string, status = 500): ErrorWithStatus => {
  const error: ErrorWithStatus = new Error(message);
  error.status = status;

  return error;
};
