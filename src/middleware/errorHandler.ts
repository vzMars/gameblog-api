import { NextFunction, Request, Response } from 'express';

const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = res.statusCode ? res.statusCode : 500;
  let errorMessage = 'An unknown error as occurred.';

  if (err instanceof Error) {
    errorMessage = err.message;
  }

  res.status(status).json({ message: errorMessage });
};

export default errorHandler;
