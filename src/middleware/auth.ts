import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';

const ensureAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    next(createHttpError(401, 'Unauthorized'));
  }
};

export default ensureAuth;
