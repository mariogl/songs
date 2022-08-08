export interface ErrorWithCode extends Error {
  code?: string;
}

export interface ErrorWithStatus extends Error {
  status?: number;
}
